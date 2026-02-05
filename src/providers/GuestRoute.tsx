"use client";

import { useAuth } from "@/store/auth";
import { Route } from "next";
import { useRouter } from "next/navigation";
import { useLayoutEffect } from "react";

interface GuestRouteProps {
  children?: React.ReactNode;
  redirectTo?: Route;
}

export function GuestRoute({
  children,
  redirectTo = "/login",
}: GuestRouteProps) {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useLayoutEffect(() => {
    if (isAuthenticated) {
      router.replace(redirectTo);
    }
  }, [isAuthenticated, redirectTo, router]);

  if (isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
