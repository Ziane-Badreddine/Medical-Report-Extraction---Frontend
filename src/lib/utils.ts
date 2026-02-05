/* eslint-disable @typescript-eslint/no-explicit-any */
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import axios from "axios";
import { ErrorContext } from "./axios";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function parseErrorContext(error: unknown): ErrorContext {
  if (axios.isAxiosError(error)) {
    return {
      error: {
        name: error.name,
        message:
          // detail
          (error.response?.data as any)?.detail ??
          error.message ??
          "Erreur inconnue",
        status: error.response?.status ?? 500,
        statusText: error.response?.statusText ?? "Error",
        data: error.response?.data,
        stack: error.stack,
      },
      request: error.config,
      response: error.response,
    };
  }

  return {
    error: {
      name: "UnknownError",
      message: "Erreur inconnue",
      status: 500,
      statusText: "Error",
    },
  };
}

export function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
