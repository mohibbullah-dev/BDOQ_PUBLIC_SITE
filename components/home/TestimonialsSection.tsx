"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import type { ITestimonial } from "@/lib/types";
import { getTestimonialAvatarUrls } from "@/lib/testimonialAvatars";
import { Testimonial3DMarquee } from "@/components/home/Testimonial3DMarquee";
import { AvatarCircles } from "@/components/ui/avatar-circles";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { cn } from "@/lib/cn";

export function TestimonialsSection({
  id,
  testimonials = [],
}: {
  id?: string;
  testimonials?: ITestimonial[];
}) {
  const t = useTranslations("home.testimonials");
  const tCta = useTranslations("cta");

  return (
    <section
      id={id}
      className={cn(
        "relative overflow-hidden py-16 md:py-24 text-white",
        "bg-[linear-gradient(160deg,#0A1628_0%,#0D4A2F_55%,#1B6B44_100%)]"
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-100"
        style={{
          backgroundImage: "var(--islamic-pattern)",
          backgroundRepeat: "repeat",
          backgroundSize: "60px 60px",
        }}
        aria-hidden="true"
      />

      <div className="relative z-[1] mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="mb-8 text-center md:mb-10">
          <span
            className={cn(
              "mb-4 inline-flex items-center rounded-full border border-[var(--gold)]/35",
              "bg-[rgba(232,75,58,0.12)] px-4 py-1.5",
              "font-inter text-xs font-semibold uppercase tracking-widest text-[var(--gold-light)]"
            )}
          >
            {t("eyebrow")}
          </span>
          <h2 className="font-playfair text-3xl font-bold text-white md:text-4xl">
            {t("title")}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl font-inter text-base leading-relaxed text-white/80">
            {t("subtitle")}
          </p>
        </ScrollReveal>

        <div className="relative mb-10 md:mb-12">
          <Testimonial3DMarquee testimonials={testimonials} />
        </div>

        <ScrollReveal delay={0.15} className="text-center">
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/free-class"
              className={cn(
                "inline-flex items-center justify-center gap-2 rounded-full px-8 py-3.5",
                "bg-[linear-gradient(135deg,#E84B3A,#C62828)] font-inter text-sm font-bold text-white",
                "transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_12px_32px_rgba(232,75,58,0.35)]"
              )}
            >
              {tCta("bookFreeClass")}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>

            <Link
              href="/reviews"
              className={cn(
                "inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/50 px-8 py-3.5",
                "bg-white/10 font-inter text-sm font-semibold text-white backdrop-blur-sm",
                "transition-all duration-300 hover:border-white hover:bg-white/20"
              )}
            >
              {tCta("allReviews")}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="mt-8 flex flex-col items-center gap-2">
            <AvatarCircles
              numPeople={300}
              avatarUrls={getTestimonialAvatarUrls()}
              avatarClassName="border-[#1B6B44] bg-[#E8F5EE]"
              countClassName="border-[#1B6B44] bg-[#0D4A2F] text-white"
              className="justify-center"
            />
            <p className="font-inter text-sm text-white/70">
              {t("studentsWorldwide")}
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
