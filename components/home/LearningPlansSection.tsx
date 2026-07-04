"use client";

import Link from "next/link";
import { motion } from "framer-motion";
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
import { cn } from "@/lib/cn";

const revealEase = [0.22, 1, 0.36, 1] as const;

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
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.55, delay: index * 0.12, ease: revealEase }}
      className={cn(
        "group relative flex h-full flex-col",
        isFeatured && "lg:-mt-4 lg:mb-4 lg:scale-[1.03]"
      )}
    >
      {isFeatured && (
        <span
          className={cn(
            "absolute -top-3.5 left-1/2 z-10 -translate-x-1/2 rounded-full px-4 py-1",
            "bg-[linear-gradient(135deg,#E84B3A,#C62828)] font-inter text-[11px] font-bold uppercase tracking-wider text-white",
            "shadow-[0_8px_20px_-6px_rgba(232,75,58,0.5)]"
          )}
        >
          {t("popularBadge")}
        </span>
      )}

      <div
        className={cn(
          "relative flex h-full flex-col overflow-hidden rounded-3xl p-6 md:p-8",
          "transition-all duration-500",
          isFeatured
            ? [
                "bg-gradient-to-b from-[var(--green-dark)] via-[#145c38] to-[var(--green-primary)]",
                "text-white shadow-[0_32px_64px_-24px_rgba(13,74,47,0.55)]",
                "ring-1 ring-white/15",
              ]
            : [
                "border border-gray-100 bg-white text-[var(--text-dark)]",
                "shadow-[0_16px_40px_-20px_rgba(27,107,68,0.18)]",
                "hover:-translate-y-2 hover:border-[var(--green-primary)]/25",
                "hover:shadow-[0_28px_56px_-20px_rgba(27,107,68,0.28)]",
              ]
        )}
      >
        {!isFeatured && (
          <span
            className="pointer-events-none absolute inset-x-0 top-0 h-1 scale-x-0 bg-gradient-to-r from-transparent via-[var(--green-primary)] to-transparent transition-transform duration-500 group-hover:scale-x-100"
            aria-hidden="true"
          />
        )}

        {isFeatured && (
          <div
            className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-white/[0.07] blur-2xl"
            aria-hidden="true"
          />
        )}

        <div
          className={cn(
            "relative mb-5 flex h-14 w-14 items-center justify-center rounded-2xl",
            isFeatured
              ? "bg-white/15 text-white ring-1 ring-white/20"
              : "bg-[var(--green-light)] text-[var(--green-primary)] group-hover:bg-[var(--green-primary)] group-hover:text-white"
          )}
        >
          <Icon className="h-7 w-7" strokeWidth={1.75} aria-hidden="true" />
        </div>

        <h3
          className={cn(
            "font-playfair text-2xl font-bold",
            isFeatured ? "text-white" : "text-[var(--green-dark)]"
          )}
        >
          {tPlan("displayTitle")}
        </h3>

        <p
          className={cn(
            "mt-2 font-inter text-sm leading-relaxed",
            isFeatured ? "text-white/75" : "text-[var(--text-gray)]"
          )}
        >
          {tPlan("description")}
        </p>

        <ul className="mt-6 flex-1 space-y-2.5">
          {features.map((feature) => (
            <li key={feature} className="flex items-start gap-2.5">
              <span
                className={cn(
                  "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full",
                  isFeatured
                    ? "bg-white/15 text-[var(--brand-red-light)]"
                    : "bg-[var(--green-primary)]/10 text-[var(--green-primary)]"
                )}
              >
                <Check className="h-3 w-3" strokeWidth={3} aria-hidden="true" />
              </span>
              <span
                className={cn(
                  "font-inter text-sm leading-snug",
                  isFeatured ? "text-white/90" : "text-[var(--text-gray)]"
                )}
              >
                {feature}
              </span>
            </li>
          ))}
        </ul>

        <Link
          href={href}
          className={cn(
            "mt-8 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5",
            "font-inter text-sm font-semibold transition-all duration-300",
            isFeatured
              ? "bg-white text-[var(--green-primary)] hover:bg-[var(--green-light)] hover:shadow-lg"
              : "bg-[var(--green-primary)] text-white hover:bg-[var(--green-dark)] hover:shadow-md"
          )}
        >
          {t("cta")}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </motion.article>
  );
}

export function LearningPlansSection() {
  const t = useTranslations("home.learningPlans");

  return (
    <section className="relative overflow-hidden bg-white py-16 md:py-24">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(27,107,68,0.06),transparent_55%)]"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="mx-auto mb-12 max-w-2xl text-center md:mb-16">
          <p className="font-inter text-xs font-semibold uppercase tracking-widest text-[var(--green-primary)]">
            {t("eyebrow")}
          </p>
          <h2 className="mt-3 font-playfair text-2xl font-bold text-[var(--green-dark)] md:text-3xl lg:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-4 font-inter text-base leading-relaxed text-[var(--text-gray)]">
            {t("subtitle")}
          </p>
        </ScrollReveal>

        <div className="grid items-stretch gap-6 md:grid-cols-3 lg:gap-8">
          {LEARNING_PLANS.map((plan, index) => (
            <LearningPlanCard key={plan.id} plan={plan} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
