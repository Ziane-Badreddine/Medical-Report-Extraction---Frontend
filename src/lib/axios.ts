/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAuth } from "@/store/auth";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

export const publicApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});

export const privateApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

privateApi.interceptors.request.use(
  (config) => {
    const accessToken = useAuth.getState().accessToken;
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

privateApi.interceptors.response.use(
  (res) => res,
  async (
    error: AxiosError & { config?: AxiosRequestConfig & { _retry?: boolean } }
  ) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        const res = await publicApi.post("/auth/refresh");
        const { accessToken, user } = res.data;

        useAuth.getState().setAuth({
          accessToken: accessToken,
          user: user,
          isAuthenticated: true,
        });

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return privateApi(originalRequest);
      } catch (err: unknown) {
        useAuth.getState().setAuth({
          user: null,
          accessToken: null,
          isAuthenticated: false,
        });

        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export type ErrorContext<T = any> = {
  error: {
    cause?: string;
    message: string;
    name: string;
    stack?: string;
    status: number;
    statusText: string;
    data?: T;
  };
  request?: AxiosRequestConfig;
  response?: AxiosResponse;
};

export type SuccessContext<T = any> = {
  data: T;
  status: number;
  statusText: string;
  request?: AxiosRequestConfig;
  response: AxiosResponse<T>;
};

export interface FetchOptions<TSuccess = any, TError = any> {
  onSuccess?: (ctx: SuccessContext<TSuccess>) => void;
  onError?: (ctx: ErrorContext<TError>) => void;
  callbackURL?: string;
}