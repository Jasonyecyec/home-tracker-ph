"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, type ReactNode } from "react";

// Lazily create a QueryClient with sensible defaults.
const makeQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        /**
         * Keep data fresh for 60s and automatically garbage collect it
         * after 5 minutes of inactivity. This mirrors the default UX
         * expectations for dashboard-style apps.
         */
        staleTime: 60 * 1000,
        gcTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
        retry: 1,
      },
      mutations: {
        retry: 1,
      },
    },
  });

let browserQueryClient: QueryClient | undefined;

const getQueryClient = () => {
  if (typeof window === "undefined") {
    // On the server we create a new client per request to avoid sharing cache.
    return makeQueryClient();
  }

  if (!browserQueryClient) {
    browserQueryClient = makeQueryClient();
  }

  return browserQueryClient;
};

export function QueryProvider({ children }: { children: ReactNode }) {
  const [queryClient] = useState(getQueryClient);

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
