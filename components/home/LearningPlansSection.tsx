"use client";

import {
  ArrowRight,
  Check,
  PlayCircle,
  Radio,
  Users,
  type LucideIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { LEARNING_PLANS } from "@/lib/constants";
import type { ILearningPlan } from "@/lib/types";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { SiteCta } from "@/components/shared/SiteCta";
import { cn } from "@/lib/cn";

const PLAN_ICONS: Record<string, LucideIcon> = {
  record: PlayCircle,
  private: Users,
  live: Radio,
};

const PLAN_HREFS: Record<string, string> = {
  record: "/courses?type=record",
  private: "/courses?type=private",
  live: "/courses?type=live",
};

interface ILearningPlanCardProps {
  plan: ILearningPlan;
  index: number;
}

function LearningPlanCard({ plan, index }: ILearningPlanCardProps) {
  const t = useTranslations("home.learningPlans");
  const tPlan = useTranslations(`home.learningPlans.plans.${plan.id}`);
  const features = tPlan.raw("features") as string[];
  const isFeatured = plan.featured === true;
  const Icon = PLAN_ICONS[plan.id] ?? PlayCircle;
  const href = PLAN_HREFS[plan.id] ?? "/courses";

  return (
    <ScrollReveal delay={index * 0.06} className="h-full">
      <article
        className={cn(
          "relative flex h-full flex-col rounded-2xl border p-6 md:p-7",
          isFeatured
            ? "border-transparent bg-[linear-gradient(160deg,#32C991_0%,#269B6F_55%,#CD443F_100%)] text-white"
            : "site-card border-gray-200 bg-white text-text-dark"
        )}
      >
        {isFeatured ? (
          <span className="mb-4 inline-flex w-fit rounded-full bg-white/15 px-3 py-1 font-body text-[11px] font-bold uppercase tracking-wider text-white">
            {t("popularBadge")}
          </span>
        ) : null}

        <div
          className={cn(
            "mb-4 flex h-12 w-12 items-center justify-center rounded-xl",
            isFeatured
              ? "bg-white/15 text-white"
              : "bg-bg-light text-primary"
          )}
        >
          <Icon className="h-6 w-6" strokeWidth={1.75} aria-hidden="true" />
        </div>

        <h3
          className={cn(
            "font-playfair text-2xl font-bold",
            isFeatured ? "text-white" : "text-primary-dark"
          )}
        >
          {tPlan("displayTitle")}
        </h3>

        <p
          className={cn(
            "mt-2 font-body text-sm leading-relaxed",
            isFeatured ? "text-white/80" : "text-text-gray"
          )}
        >
          {tPlan("description")}
        </p>

        <ul className="mt-5 flex-1 space-y-2.5">
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
          variant={isFeatured ? "secondary" : "primary"}
          className={cn(
            "mt-7 w-full",
            isFeatured && "border-white/40 bg-white text-primary hover:bg-white/95"
          )}
        >
          {t("cta")}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </SiteCta>
      </article>
    </ScrollReveal>
  );
}

export function LearningPlansSection() {
  const t = useTranslations("home.learningPlans");

  return (
    <section id="learning-plans" className="bg-white py-16 md:py-20">
      <div className="site-container">
        <ScrollReveal className="mb-10 md:mb-12">
          <SectionHeader
            eyebrow={t("eyebrow")}
            title={t("title")}
            subtitle={t("subtitle")}
            centered
          />
        </ScrollReveal>

        <div className="grid items-stretch gap-5 md:grid-cols-3 lg:gap-6">
          {LEARNING_PLANS.map((plan, index) => (
            <LearningPlanCard key={plan.id} plan={plan} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
