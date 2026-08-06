import { API_BASE } from "@/lib/constants";
import type { StudentAdmissionFormValues } from "@/lib/validators/studentAdmission";

export interface IAdmissionPrefillResponse {
  prefill: Partial<StudentAdmissionFormValues> & Record<string, unknown>;
  prefillToken: string;
}

export async function fetchAdmissionPrefill(
  token: string
): Promise<IAdmissionPrefillResponse | null> {
  const trimmed = token.trim();
  if (!trimmed) return null;

  const response = await fetch(`${API_BASE}/public/admission-prefill/${trimmed}`, {
    cache: "no-store",
  });

  if (!response.ok) return null;

  const payload = (await response.json()) as {
    success?: boolean;
    data?: IAdmissionPrefillResponse;
  };

  return payload.success && payload.data ? payload.data : null;
}
