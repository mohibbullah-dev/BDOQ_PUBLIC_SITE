"use client";

import Image from "next/image";
import {
  ArrowRight,
  BookOpen,
  Check,
  Radio,
  Star,
  Users,
  type LucideIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { LEARNING_PLANS } from "@/lib/constants";
import type { ILearningPlan } from "@/lib/types";
import { IslamicShapeBackdrop } from "@/components/shared/IslamicShapeBackdrop";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { SiteCta } from "@/components/shared/SiteCta";
import { cn } from "@/lib/cn";

const PLAN_ICONS: Record<string, LucideIcon> = {
  record: BookOpen,
  private: Users,
  live: Radio,
};

const PLAN_HREFS: Record<string, string> = {
  record: "/courses?type=record",
  private: "/courses?type=private",
  live: "/courses?type=live",
};

function GoldEyebrow({ label }: { label: string }) {
  return (
    <div className="mb-4 flex items-center justify-center gap-2.5">
      <span className="h-px w-8 bg-[#D4A853]/60 sm:w-12" aria-hidden="true" />
      <span
        className="inline-block h-1.5 w-1.5 rotate-45 bg-[#D4A853]"
        aria-hidden="true"
      />
      <p className="font-body text-[11px] font-bold uppercase tracking-[0.2em] text-[#D4A853] sm:text-xs">
        {label}
      </p>
      <span
        className="inline-block h-1.5 w-1.5 rotate-45 bg-[#D4A853]"
        aria-hidden="true"
      />
      <span className="h-px w-8 bg-[#D4A853]/60 sm:w-12" aria-hidden="true" />
    </div>
  );
}

function HighlightedTitle({
  before,
  highlight,
  after,
}: {
  before: string;
  highlight: string;
  after?: string;
}) {
  return (
    <>
      {before}{" "}
      <span className="text-primary">{highlight}</span>
      {after ? ` ${after}` : null}
    </>
  );
}

interface ILearningPlanCardProps {
  plan: ILearningPlan;
  index: number;
}

function LearningPlanCard({ plan, index }: ILearningPlanCardProps) {
  const t = useTranslations("home.learningPlans");
  const tPlan = useTranslations(`home.learningPlans.plans.${plan.id}`);
  const features = tPlan.raw("features") as string[];
  const isFeatured = plan.featured === true;
  const Icon = PLAN_ICONS[plan.id] ?? BookOpen;
  const href = PLAN_HREFS[plan.id] ?? "/courses";

  return (
    <ScrollReveal
      delay={index * 0.06}
      className={cn("h-full", isFeatured && "pt-3")}
    >
      <div className="relative h-full">
        {isFeatured ? (
          <span className="absolute left-1/2 top-0 z-20 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-[#D4A853] px-4 py-1.5 font-body text-[11px] font-bold uppercase tracking-wider text-white shadow-md">
            {t("popularBadge")}
          </span>
        ) : null}

        <article
          className={cn(
            "site-card relative flex h-full flex-col rounded-2xl border p-6 md:p-7",
            isFeatured
              ? "site-card--no-overlay overflow-hidden border-transparent bg-[#0F6B4C] pt-8 text-white shadow-[0_24px_48px_-20px_rgba(15,107,76,0.45)]"
              : "overflow-hidden border-primary/15 bg-white text-text-dark shadow-[0_12px_36px_-22px_rgba(15,23,42,0.18)]"
          )}
        >
          {isFeatured ? (
            <Image
              src="/brand/footer-mosque.svg"
              alt=""
              width={220}
              height={70}
              className="pointer-events-none absolute -bottom-1 right-0 w-[70%] opacity-[0.14] brightness-200"
              aria-hidden="true"
            />
          ) : null}

        <div
          className={cn(
            "relative z-[1] mb-4 flex h-12 w-12 items-center justify-center rounded-xl",
            isFeatured ? "bg-white/15 text-white" : "bg-bg-light text-primary"
          )}
        >
          <Icon className="h-6 w-6" strokeWidth={1.75} aria-hidden="true" />
        </div>

        <h3
          className={cn(
            "relative z-[1] font-playfair text-2xl font-bold",
            isFeatured ? "text-white" : "text-primary-dark"
          )}
        >
          {tPlan("displayTitle")}
        </h3>

        <p
          className={cn(
            "relative z-[1] mt-2 font-body text-sm leading-relaxed",
            isFeatured ? "text-white/80" : "text-text-gray"
          )}
        >
          {tPlan("description")}
        </p>

        <ul className="relative z-[1] mt-5 flex-1 space-y-2.5">
          {features.map((feature) => (
            <li key={feature} className="flex items-start gap-2.5">
              <span
                className={cn(
                  "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full",
                  isFeatured
                    ? "bg-white/15 text-white"
                    : "bg-primary/10 text-primary"
                )}
              >
                <Check className="h-3 w-3" strokeWidth={3} aria-hidden="true" />
              </span>
              <span
                className={cn(
                  "font-body text-sm leading-snug",
                  isFeatured ? "text-white/90" : "text-text-gray"
                )}
              >
                {feature}
              </span>
            </li>
          ))}
        </ul>

        <SiteCta
          href={href}
          size="sm"
          variant={isFeatured ? "secondary" : "secondary"}
          className={cn(
            "relative z-[1] mt-7 w-full no-btn-overlay",
            isFeatured
              ? "border-transparent bg-white text-primary-dark hover:bg-white/95"
              : "border-primary/35 bg-transparent text-primary hover:bg-primary hover:text-white"
          )}
        >
          {t("cta")}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </SiteCta>
        </article>
      </div>
    </ScrollReveal>
  );
}

/** Learning pathways — 3 plan cards with featured private plan (mockup) */
export function LearningPlansSection() {
  const t = useTranslations("home.learningPlans");

  return (
    <section
      id="learning-plans"
      className="relative overflow-hidden bg-[#F7FCF9] py-16 md:py-24"
    >
      <IslamicShapeBackdrop overlay="page" className="opacity-50" />

      <Image
        src="/brand/footer-lantern.svg"
        alt=""
        width={56}
        height={76}
        className="pointer-events-none absolute left-4 top-16 z-[1] hidden opacity-80 lg:left-8 lg:block"
        aria-hidden="true"
      />
      <Image
        src="/brand/footer-lantern.svg"
        alt=""
        width={48}
        height={66}
        className="pointer-events-none absolute right-10 top-12 z-[1] hidden opacity-70 lg:block"
        aria-hidden="true"
      />
      <Image
        src="/brand/footer-mosque.svg"
        alt=""
        width={280}
        height={90}
        className="pointer-events-none absolute -left-4 bottom-8 z-[1] hidden w-56 opacity-[0.12] lg:block"
        aria-hidden="true"
      />

      <div
        className={cn(
          "pointer-events-none absolute right-6 top-28 z-[1] hidden max-w-[13rem]",
          "site-card rounded-2xl border border-[#D4A853]/35 bg-white/90 px-4 py-3 shadow-sm backdrop-blur-sm lg:block"
        )}
        aria-hidden="true"
      >
        <div className="mb-1.5 flex gap-0.5 text-[#D4A853]">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="h-3 w-3 fill-current" />
          ))}
        </div>
        <p className="font-body text-[11px] font-semibold leading-snug text-primary-dark">
          {t("trustBadge")}
        </p>
      </div>

      <div className="site-container relative z-[1]">
        <ScrollReveal className="mb-10 md:mb-14">
          <div className="mx-auto max-w-3xl text-center">
            <GoldEyebrow label={t("eyebrow")} />
            <h2 className="font-playfair text-3xl font-bold leading-[1.2] tracking-tight text-primary-dark md:text-4xl">
              <HighlightedTitle
                before={t("titleBefore")}
                highlight={t("titleHighlight")}
              />
            </h2>
            <p className="mx-auto mt-4 max-w-2xl font-body text-base leading-relaxed text-text-dark">
              {t("subtitle")}
            </p>
          </div>
        </ScrollReveal>

        <div className="grid items-stretch gap-5 md:grid-cols-3 md:gap-6 lg:gap-7">
          {LEARNING_PLANS.map((plan, index) => (
            <LearningPlanCard key={plan.id} plan={plan} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
