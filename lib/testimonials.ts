import { apiFetch } from "./api";
import { TESTIMONIALS } from "./constants";
import type { ITestimonial } from "./types";

const TESTIMONIALS_REVALIDATE = 3600;
const MIN_HEALTHY_TESTIMONIALS = 3;

interface IApiTestimonialsResponse {
  success: boolean;
  data: { testimonials: ITestimonial[] };
}

function isHealthyTestimonial(item: ITestimonial): boolean {
  return (
    Boolean(item.name?.trim()) &&
    Boolean(item.content?.trim()) &&
    item.content.trim().length >= 40 &&
    typeof item.rating === "number" &&
    item.rating >= 1
  );
}

export async function getTestimonials(): Promise<ITestimonial[]> {
  try {
    const response = await apiFetch<IApiTestimonialsResponse>(
      "/public/testimonials",
      { next: { revalidate: TESTIMONIALS_REVALIDATE } }
    );
    const healthy = (response.data?.testimonials ?? []).filter(
      isHealthyTestimonial
    );
    return healthy.length >= MIN_HEALTHY_TESTIMONIALS ? healthy : TESTIMONIALS;
  } catch {
    return TESTIMONIALS;
  }
}
