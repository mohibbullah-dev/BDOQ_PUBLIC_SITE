"use client";

import { useQuery } from "@tanstack/react-query";
import {
  fetchLiveDashboard,
  type ILiveDashboard,
} from "@/lib/liveDashboard";

const LIVE_DASHBOARD_KEY = ["public", "live-dashboard"] as const;

export function useLiveDashboardQuery() {
  return useQuery<ILiveDashboard | null>({
    queryKey: LIVE_DASHBOARD_KEY,
    queryFn: fetchLiveDashboard,
    refetchInterval: 60_000,
  });
}
