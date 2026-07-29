"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import type { ITestimonial } from "@/lib/types";
import { getTestimonialAvatarUrls } from "@/lib/testimonialAvatars";
import { AvatarCircles } from "@/components/ui/avatar-circles";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { SiteCta } from "@/components/shared/SiteCta";
import { TestimonialReviewGrid } from "@/components/home/TestimonialReviewGrid";
import type { ISectionHeaderContent } from "@/lib/types";
import { useSectionHeaderText } from "@/lib/i18n/useSectionHeaderText";

/** Student reviews — straight grid with popup media + dual CTAs */
export function TestimonialsSection({
  id,
  testimonials = [],
  header,
}: {
  id?: string;
  testimonials?: ITestimonial[];
  header?: ISectionHeaderContent;
}) {
  const t = useTranslations("home.testimonials");
  const tCta = useTranslations("cta");
  const copy = useSectionHeaderText("home.testimonials", header, [
    "eyebrow",
    "title",
    "subtitle",
  ]);

  return (
    <section
      id={id}
      className="relative overflow-hidden bg-white py-16 md:py-24"
    >
      <Image
        src="/brand/footer-mosque.svg"
        alt=""
        width={280}
        height={90}
        className="pointer-events-none absolute -left-2 bottom-8 z-0 hidden w-56 opacity-[0.1] lg:block"
        aria-hidden="true"
      />

      <div className="site-container relative z-[1]">
        <ScrollReveal className="mb-8 md:mb-10">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-3 font-body text-[11px] font-bold uppercase tracking-[0.18em] text-brand-red sm:text-xs">
              {copy.eyebrow}
            </p>
            <h2 className="font-playfair text-3xl font-bold tracking-tight text-primary-dark md:text-4xl">
              {copy.title}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl font-body text-base leading-relaxed text-text-gray">
              {copy.subtitle}
            </p>
          </div>
        </ScrollReveal>

        {testimonials.length > 0 ? (
          <TestimonialReviewGrid testimonials={testimonials} limit={8} />
        ) : null}

        <ScrollReveal delay={0.12} className="mt-10 text-center md:mt-12">
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <SiteCta href="/free-class">
              {tCta("bookFreeTrial")}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </SiteCta>
            <SiteCta href="/reviews" variant="secondary">
              {tCta("allReviews")}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </SiteCta>
          </div>

          <div className="mt-8 flex flex-col items-center gap-2">
            <AvatarCircles
              numPeople={300}
              avatarUrls={getTestimonialAvatarUrls()}
              avatarClassName="border-[#32C991] bg-[#E8FAF2]"
              countClassName="border-[#32C991] bg-[#32C991] text-white"
              className="justify-center"
            />
            <p className="font-body text-sm text-text-gray">
              {t("trustLine")}
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
