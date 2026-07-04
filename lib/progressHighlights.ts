import { apiFetch } from "./api";

const PROGRESS_REVALIDATE = 300;

export interface IProgressHighlight {
  label: string;
  percent: number;
}

interface IApiProgressHighlightsResponse {
  success: boolean;
  data: {
    items: IProgressHighlight[];
    hasData: boolean;
  };
}

export async function getProgressHighlights(): Promise<{
  items: IProgressHighlight[];
  hasData: boolean;
}> {
  const response = await apiFetch<IApiProgressHighlightsResponse>(
    "/public/progress-highlights",
    { next: { revalidate: PROGRESS_REVALIDATE } }
  );
  return response.data ?? { items: [], hasData: false };
}
