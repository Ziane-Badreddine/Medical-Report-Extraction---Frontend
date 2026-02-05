import { ErrorContext, FetchOptions, privateApi, publicApi } from "@/lib/axios";
import { parseErrorContext } from "@/lib/utils";
import { User } from "@/types/auth";
import { create } from "zustand";

type AuthStore = {
  user: User | null;
  accessToken: string | null;

  isAuthenticated: boolean;
  isLoading: boolean;
  isInitializing: boolean;
  error: ErrorContext | null;

  setAuth: (auth: {
    user?: User | null;
    accessToken?: string | null;
    isAuthenticated?: boolean;
  }) => void;

  login: (
    credentials: { email: string; password: string },
    options?: FetchOptions
  ) => Promise<void>;

  register: (
    data: { name: string; email: string; password: string },
    options?: FetchOptions
  ) => Promise<void>;

  logout: (options?: FetchOptions) => Promise<void>;
  setUser: (user: User | null, token?: string) => void;
  refreshUser: () => Promise<void>;
};

interface LoginResponse {
  message: string;
  accessToken: string;
  user: User;
}

interface RegisterResponse {
  message: string;
}

export const useAuth = create<AuthStore>((set, get) => ({
  user: null,
  accessToken: null,

  isAuthenticated: false,
  isLoading: false,
  isInitializing: true,
  error: null,

  setAuth: ({ user, accessToken, isAuthenticated }) =>
    set((state) => ({
      user: user ?? state.user,
      accessToken: accessToken ?? state.accessToken,
      isAuthenticated: isAuthenticated ?? state.isAuthenticated,
    })),
  login: async ({ email, password }, options) => {
    const { isLoading, isAuthenticated } = get();
    if (isLoading || isAuthenticated) return;

    set({ isLoading: true, error: null });

    try {
      const res = await publicApi.post<LoginResponse>("/login", {
        email,
        password,
      });

      const { accessToken, user } = res.data;

      set({
        user,
        accessToken,
        isAuthenticated: true,
      });

      options?.onSuccess?.({
        data: res.data,
        status: res.status,
        statusText: res.statusText,
        request: res.config,
        response: res,
      });
    } catch (e) {
      const authError = parseErrorContext(e);
      set({ error: authError });
      options?.onError?.(authError);
    } finally {
      set({ isLoading: false });
    }
  },

  register: async ({ name, email, password }, options) => {
    const { isLoading, isAuthenticated } = get();
    if (isLoading || isAuthenticated) return;

    set({ isLoading: true, error: null });

    try {
      const res = await publicApi.post<RegisterResponse>("/register", {
        name,
        email,
        password,
      });

      options?.onSuccess?.({
        data: res.data,
        status: res.status,
        statusText: res.statusText,
        request: res.config,
        response: res,
      });
    } catch (e) {
      const authError = parseErrorContext(e);
      set({ error: authError });
      options?.onError?.(authError);
    } finally {
      set({ isLoading: false });
    }
  },

  logout: async (options) => {
    set({ isLoading: true, error: null });

    try {
      const res = await publicApi.post("/logout");

      set({
        user: null,
        accessToken: null,
        isAuthenticated: false,
      });

      options?.onSuccess?.({
        data: res.data,
        status: res.status,
        statusText: res.statusText,
        request: res.config,
        response: res,
      });
    } catch (e) {
      const authError = parseErrorContext(e);
      set({ error: authError });
      options?.onError?.(authError);
    } finally {
      set({ isLoading: false });
    }
  },

  setUser: (user, token) =>
    set({
      user,
      accessToken: token ?? null,
      isAuthenticated: !!user,
      isInitializing: false,
    }),

  refreshUser: async () => {
    const { isInitializing } = get();
    if (!isInitializing) return;

    set({ isInitializing: true, error: null });

    try {
      const res = await publicApi.post("/refresh");

      const { accessToken, user } = res.data;

      set({
        accessToken: accessToken,
        user: user,
        isAuthenticated: true,
      });
    } catch {
      set({
        user: null,
        accessToken: null,
        isAuthenticated: false,
      });
    } finally {
      set({ isInitializing: false });
    }
  },
}));