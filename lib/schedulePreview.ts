import { API_BASE } from "./constants";

export interface IScheduleDayPreview {
  day: string;
  hasSessions: boolean;
  sessionCount: number;
}

interface IApiSchedulePreviewResponse {
  success: boolean;
  data: {
    days: IScheduleDayPreview[];
    hasData: boolean;
  };
}

export async function fetchSchedulePreview(): Promise<{
  days: IScheduleDayPreview[];
  hasData: boolean;
}> {
  try {
    const response = await fetch(`${API_BASE}/public/schedule-preview`, {
      next: { revalidate: 300 },
    });
    if (!response.ok) throw new Error("Failed to fetch schedule preview");
    const json = (await response.json()) as IApiSchedulePreviewResponse;
    return json.data ?? { days: [], hasData: false };
  } catch {
    return { days: [], hasData: false };
  }
}
