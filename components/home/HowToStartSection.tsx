"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ClipboardPen,
  MonitorPlay,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { HOW_TO_START_STEPS } from "@/lib/constants";
import type { IHowToStartStep } from "@/lib/types";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { cn } from "@/lib/cn";

const revealEase = [0.22, 1, 0.36, 1] as const;

const STEP_ICONS: Record<number, LucideIcon> = {
  1: ClipboardPen,
  2: MonitorPlay,
  3: Sparkles,
};

interface IStepCardProps {
  step: IHowToStartStep;
  index: number;
}

function StepCard({ step, index }: IStepCardProps) {
  const t = useTranslations(`home.howToStart.steps.${step.step}`);
  const Icon = STEP_ICONS[step.step] ?? ClipboardPen;
  const stepLabel = String(step.step).padStart(2, "0");

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.12, ease: revealEase }}
      className="group relative flex-1"
    >
      <div
        className={cn(
          "relative h-full overflow-hidden rounded-3xl border border-gray-100 bg-white p-6 md:p-7",
          "shadow-[0_16px_40px_-20px_rgba(27,107,68,0.2)]",
          "transition-all duration-500 hover:-translate-y-2",
          "hover:border-[var(--green-primary)]/20 hover:shadow-[0_28px_56px_-22px_rgba(27,107,68,0.3)]"
        )}
      >
        <span
          className="pointer-events-none absolute inset-x-0 top-0 h-1 scale-x-0 bg-gradient-to-r from-transparent via-[var(--green-primary)] to-transparent transition-transform duration-500 group-hover:scale-x-100"
          aria-hidden="true"
        />

        <span
          className="pointer-events-none absolute -right-2 -top-4 font-playfair text-7xl font-bold text-[var(--green-light)] opacity-80"
          aria-hidden="true"
        >
          {stepLabel}
        </span>

        <div className="relative flex items-center gap-4">
          <div
            className={cn(
              "flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl",
              "bg-gradient-to-br from-[var(--green-primary)] to-[var(--green-dark)] text-white",
              "shadow-[0_10px_24px_-8px_rgba(27,107,68,0.5)]",
              "transition-transform duration-500 group-hover:scale-105"
            )}
          >
            <Icon className="h-6 w-6" strokeWidth={1.75} aria-hidden="true" />
          </div>

          <span
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-full",
              "bg-[var(--green-light)] font-inter text-sm font-bold text-[var(--green-primary)]"
            )}
          >
            {step.step}
          </span>
        </div>

        <h3 className="relative mt-5 font-inter text-lg font-semibold text-[var(--green-dark)]">
          {t("title")}
        </h3>
        <p className="relative mt-2 font-inter text-sm leading-relaxed text-[var(--text-gray)]">
          {t("description")}
        </p>
      </div>
    </motion.div>
  );
}

export function HowToStartSection() {
  const t = useTranslations("home.howToStart");

  return (
    <section className="relative overflow-hidden bg-bg-light py-16 md:py-24">
      <div
        className="pointer-events-none absolute -left-24 top-16 h-64 w-64 rounded-full bg-[var(--green-primary)]/[0.05] blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-20 bottom-10 h-56 w-56 rounded-full bg-[var(--brand-red)]/[0.04] blur-3xl"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="mx-auto mb-12 max-w-2xl text-center md:mb-14">
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

        <div className="relative">
          <div
            className="pointer-events-none absolute left-[10%] right-[10%] top-[4.5rem] hidden h-0.5 md:block"
            aria-hidden="true"
          >
            <div className="h-full w-full bg-gradient-to-r from-transparent via-[var(--green-primary)]/25 to-transparent" />
          </div>

          <div className="relative flex flex-col gap-6 md:flex-row md:gap-5 lg:gap-8">
            {HOW_TO_START_STEPS.map((step, index) => (
              <StepCard key={step.step} step={step} index={index} />
            ))}
          </div>
        </div>

        <ScrollReveal delay={0.25} className="mt-12 text-center">
          <Link
            href="/free-class"
            className={cn(
              "inline-flex items-center justify-center gap-2 rounded-full px-8 py-3.5",
              "bg-[linear-gradient(135deg,#E84B3A,#C62828)] font-inter text-sm font-semibold text-white",
              "transition-all duration-300 hover:scale-[1.02] hover:shadow-brand"
            )}
          >
            {t("cta")}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
