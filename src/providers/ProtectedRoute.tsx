"use client";

import { useAuth } from "@/store/auth";
import { Route } from "next";
import { useRouter } from "next/navigation";
import { useLayoutEffect } from "react";

interface ProtectedRouteProps {
  children?: React.ReactNode;
  redirectTo?: Route;
}

export function ProtectedRoute({
  children,
  redirectTo = "/login",
}: ProtectedRouteProps) {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useLayoutEffect(() => {
    if (!isAuthenticated) {
      router.replace(redirectTo);
      return;
    }
  }, [isAuthenticated, router, redirectTo]);

  if (!isAuthenticated ) {
    return null;
  }
  return <>{children}</>;
}
