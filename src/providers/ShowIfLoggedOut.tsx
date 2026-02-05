import { useAuth } from "@/store/auth";
import React from "react";

interface ShowIfLoggedOutProps {
  children?: React.ReactNode;
}
export function ShowIfLoggedOut({ children }: ShowIfLoggedOutProps) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? null : <>{children}</>;
}
