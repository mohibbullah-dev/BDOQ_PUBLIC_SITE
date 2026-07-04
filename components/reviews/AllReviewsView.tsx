"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import type { ITestimonial } from "@/lib/types";
import { ReviewCard } from "@/components/reviews/ReviewCard";
import { LocalizedPageHeroClient } from "@/components/shared/LocalizedPageHeroClient";
import { cn } from "@/lib/cn";

export function AllReviewsView({
  testimonials,
}: {
  testimonials: ITestimonial[];
}) {
  const t = useTranslations("pages.reviews");

  const reviewStats = [
    { value: "300+", label: t("happyStudents") },
    { value: "5.0", label: t("avgRating") },
    { value: "20+", label: t("countries") },
  ] as const;

  return (
    <>
      <LocalizedPageHeroClient pageKey="reviews" centered>
        <div className="mt-10 grid grid-cols-3 gap-4 md:gap-6">
          {reviewStats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-white bg-white px-4 py-5 text-center shadow-sm"
            >
              <p className="font-inter text-2xl font-bold text-[#0D4A2F] md:text-3xl">
                {stat.value}
              </p>
              <p className="mt-1 font-inter text-xs uppercase tracking-wide text-[#6B7280]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </LocalizedPageHeroClient>

      <section className="py-12 md:py-16 bg-bg-light">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {testimonials.map((testimonial) => (
              <ReviewCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </section>

      <section className="pb-16 md:pb-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
            className={cn(
              "overflow-hidden rounded-3xl px-6 py-10 text-center text-white md:px-12 md:py-14",
              "bg-[linear-gradient(135deg,#0D4A2F,#1B6B44)]"
            )}
          >
            <h2 className="font-playfair text-2xl font-bold md:text-3xl">
              {t("readyTitle")}
            </h2>
            <p className="mx-auto mt-4 max-w-xl font-inter text-base text-white/85">
              {t("readyDesc")}
            </p>
            <Link
              href="/free-class"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-8 py-3 font-inter text-sm font-semibold text-primary-dark transition-all hover:bg-bg-light"
            >
              {t("bookTrial")}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
