"use client";

import { useLayoutEffect } from "react";
import { useAuth } from "@/store/auth";
import { Spinner } from "@/components/ui/spinner";

interface AuthProviderProps {
  children: React.ReactNode;
}


export function AuthProvider({ children }: AuthProviderProps) {
  const { refreshUser, isInitializing } = useAuth();

  useLayoutEffect(() => {
    refreshUser();
  }, [refreshUser]);

  if (isInitializing) {
    return (
      <div className="flex items-center justify-center h-screen w-screen bg-background">
        <Spinner  className="text-primary" />
      </div>
    );
  }

  return <>{children}</>;
}