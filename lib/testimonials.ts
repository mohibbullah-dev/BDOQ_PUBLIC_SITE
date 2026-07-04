import { apiFetch } from "./api";
import { TESTIMONIALS } from "./constants";
import type { ITestimonial } from "./types";

const TESTIMONIALS_REVALIDATE = 3600;

interface IApiTestimonialsResponse {
  success: boolean;
  data: { testimonials: ITestimonial[] };
}

export async function getTestimonials(): Promise<ITestimonial[]> {
  try {
    const response = await apiFetch<IApiTestimonialsResponse>(
      "/public/testimonials",
      { next: { revalidate: TESTIMONIALS_REVALIDATE } }
    );
    const apiItems = response.data?.testimonials ?? [];
    return apiItems.length > 0 ? apiItems : TESTIMONIALS;
  } catch {
    return TESTIMONIALS;
  }
}
