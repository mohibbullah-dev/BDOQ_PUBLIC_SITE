import { API_BASE } from "./constants";

export interface ILiveDashboardSession {
  studentLabel: string;
  courseLabel: string;
  teacherLabel: string;
  status: "live" | "queued";
  timeLabel: string;
}

export interface ILiveDashboardTeacher {
  id: string;
  shortName: string;
  isLive: boolean;
  gender: "male" | "female";
  avatarUrl?: string;
}

export interface ILiveDashboard {
  sessions: ILiveDashboardSession[];
  teachersOnline: ILiveDashboardTeacher[];
  activeTeacherCount: number;
  activeTeacherDisplay: string;
  updatedAt: string;
}

interface IApiLiveDashboardResponse {
  success: boolean;
  data: ILiveDashboard;
}

const CACHE_MS = 45_000;

let cachedDashboard: ILiveDashboard | null = null;
let cachedAt = 0;
let inflight: Promise<ILiveDashboard | null> | null = null;

export function getCachedLiveDashboard(): ILiveDashboard | null {
  if (!cachedDashboard) return null;
  if (Date.now() - cachedAt > CACHE_MS) return null;
  return cachedDashboard;
}

export async function fetchLiveDashboard(): Promise<ILiveDashboard | null> {
  const cached = getCachedLiveDashboard();
  if (cached) return cached;

  if (inflight) return inflight;

  inflight = (async () => {
    try {
      const response = await fetch(`${API_BASE}/public/live-dashboard`, {
        cache: "no-store",
      });
      if (!response.ok) return cachedDashboard;
      const json = (await response.json()) as IApiLiveDashboardResponse;
      if (json.success && json.data) {
        cachedDashboard = json.data;
        cachedAt = Date.now();
        return json.data;
      }
      return cachedDashboard;
    } catch {
      return cachedDashboard;
    } finally {
      inflight = null;
    }
  })();

  return inflight;
}
