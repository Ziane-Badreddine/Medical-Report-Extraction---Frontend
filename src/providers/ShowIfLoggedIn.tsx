"use client";
import { useAuth } from "@/store/auth";
import React from "react";

interface ShowIfLoggedInProps {
  children?: React.ReactNode;
}
export function ShowIfLoggedIn({ children }: ShowIfLoggedInProps) {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <>{children}</> : null;
}
