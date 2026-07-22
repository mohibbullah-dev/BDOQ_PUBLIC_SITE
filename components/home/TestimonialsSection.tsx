"use client";

import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import type { ITestimonial } from "@/lib/types";
import { getTestimonialAvatarUrls } from "@/lib/testimonialAvatars";
import { DualRowMarquee } from "@/components/shared/DualRowMarquee";
import { TestimonialMarqueeCard } from "@/components/home/TestimonialMarqueeCard";
import { AvatarCircles } from "@/components/ui/avatar-circles";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { SiteCta } from "@/components/shared/SiteCta";

function padRow(items: ITestimonial[], min = 4): ITestimonial[] {
  if (items.length === 0) return items;
  const out = [...items];
  while (out.length < min) {
    out.push(...items);
  }
  return out;
}

function splitTestimonials(
  items: ITestimonial[]
): [ITestimonial[], ITestimonial[]] {
  if (items.length === 0) return [[], []];
  const rowOne = items.filter((_, index) => index % 2 === 0);
  const rowTwo =
    items.length === 1
      ? items
      : items.filter((_, index) => index % 2 === 1);
  return [padRow(rowOne), padRow(rowTwo.length > 0 ? rowTwo : [...items].reverse())];
}

export function TestimonialsSection({
  id,
  testimonials = [],
}: {
  id?: string;
  testimonials?: ITestimonial[];
}) {
  const t = useTranslations("home.testimonials");
  const tCta = useTranslations("cta");
  const [rowOne, rowTwo] = splitTestimonials(testimonials);

  return (
    <section
      id={id}
      className="relative overflow-hidden bg-bg-light py-16 md:py-20"
    >
      <div className="site-container relative">
        <ScrollReveal className="mb-10 md:mb-12">
          <SectionHeader
            eyebrow={t("eyebrow")}
            title={t("title")}
            subtitle={t("subtitle")}
            centered
          />
        </ScrollReveal>
      </div>

      {testimonials.length > 0 ? (
        <div className="mb-10 md:mb-12">
          <DualRowMarquee
            rowOneDuration={110}
            rowTwoDuration={125}
            gapClassName="gap-4 sm:gap-5"
            rowOne={rowOne.map((item, index) => (
              <TestimonialMarqueeCard
                key={`r1-${item.id}-${index}`}
                testimonial={item}
              />
            ))}
            rowTwo={rowTwo.map((item, index) => (
              <TestimonialMarqueeCard
                key={`r2-${item.id}-${index}`}
                testimonial={item}
              />
            ))}
          />
        </div>
      ) : null}

      <div className="site-container relative">
        <ScrollReveal delay={0.1} className="text-center">
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <SiteCta href="/free-class">
              {tCta("bookFreeClass")}
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
              {t("studentsWorldwide")}
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
