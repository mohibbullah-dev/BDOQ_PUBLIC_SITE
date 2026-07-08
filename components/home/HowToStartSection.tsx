"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { HOW_TO_START_STEPS } from "@/lib/constants";
import type { IHowToStartStep } from "@/lib/types";
import { getHowToStartImagePath } from "@/lib/howToStartImages";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { cn } from "@/lib/cn";

const revealEase = [0.22, 1, 0.36, 1] as const;

interface IStepCardProps {
  step: IHowToStartStep;
  index: number;
}

function StepCard({ step, index }: IStepCardProps) {
  const t = useTranslations(`home.howToStart.steps.${step.step}`);
  const stepLabel = String(step.step).padStart(2, "0");
  const isCenter = step.step === 2;

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, delay: index * 0.1, ease: revealEase }}
      className={cn(
        "group relative flex flex-1 flex-col",
        isCenter && "lg:-mt-2"
      )}
    >
      <div
        className={cn(
          "relative flex h-full flex-col overflow-hidden rounded-[8px] border border-[var(--green-primary)]/10 bg-white",
          "shadow-[0_20px_48px_-24px_rgba(50,201,145,0.28)]",
          "transition-all duration-500 ease-out",
          "hover:-translate-y-1.5 hover:border-[var(--green-primary)]/20",
          "hover:shadow-[0_28px_60px_-20px_rgba(50,201,145,0.35)]",
          isCenter && "lg:shadow-[0_24px_56px_-20px_rgba(50,201,145,0.32)]"
        )}
      >
        <span className="site-card-hover-overlay z-[1]" aria-hidden="true" />

        <div className="relative z-[2] p-3 sm:p-4 sm:pb-0">
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[8px]">
            <Image
              src={getHowToStartImagePath(step.step)}
              alt={t("title")}
              fill
              className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#32C991]/50 via-transparent to-transparent opacity-80"
              aria-hidden="true"
            />

            <span
              className={cn(
                "absolute left-3 top-3 rounded-full px-3 py-1",
                "bg-white/95 font-inter text-[11px] font-bold uppercase tracking-wider text-[#32C991]",
                "shadow-sm backdrop-blur-sm sm:text-xs"
              )}
            >
              Step {stepLabel}
            </span>

            <span
              className="pointer-events-none absolute bottom-2 right-3 font-playfair text-5xl font-bold text-white/25 sm:text-6xl"
              aria-hidden="true"
            >
              {stepLabel}
            </span>
          </div>
        </div>

        <div className="relative z-[2] flex flex-1 flex-col p-5 sm:p-6">
          <div className="mb-3 flex items-center justify-between gap-3">
            <span
              className={cn(
                "inline-flex h-9 w-9 items-center justify-center rounded-full",
                "bg-[var(--green-light)] font-inter text-sm font-bold text-[var(--green-primary)]",
                "ring-2 ring-white"
              )}
            >
              {step.step}
            </span>
            <ArrowUpRight
              className={cn(
                "h-4 w-4 shrink-0 text-[var(--green-primary)]",
                "translate-x-1 -translate-y-1 opacity-0 transition-all duration-300",
                "group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100"
              )}
              aria-hidden="true"
            />
          </div>

          <h3 className="font-inter text-lg font-semibold leading-snug text-[var(--green-dark)] sm:text-xl">
            {t("title")}
          </h3>
          <p className="mt-2 flex-1 font-inter text-sm leading-relaxed text-[var(--text-gray)]">
            {t("description")}
          </p>

          <span
            className="mt-4 h-0.5 w-0 rounded-full bg-[var(--green-primary)] transition-all duration-500 group-hover:w-10"
            aria-hidden="true"
          />
        </div>
      </div>
    </motion.article>
  );
}

export function HowToStartSection() {
  const t = useTranslations("home.howToStart");

  return (
    <section className="relative overflow-hidden bg-bg-light py-16 md:py-24">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage: "var(--islamic-pattern-light)",
          backgroundSize: "60px 60px",
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-[var(--green-primary)]/[0.06] blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-[var(--green-primary)]/[0.05] blur-3xl"
        aria-hidden="true"
      />

      <div className="site-container relative">
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

        <div className="grid gap-6 md:grid-cols-3 lg:gap-8">
          {HOW_TO_START_STEPS.map((step, index) => (
            <StepCard key={step.step} step={step} index={index} />
          ))}
        </div>

        <ScrollReveal delay={0.25} className="mt-12 text-center">
          <Link
            href="/free-class"
            className={cn(
              "inline-flex items-center justify-center gap-2 rounded-full px-8 py-3.5",
              "bg-[var(--green-primary)] font-inter text-sm font-semibold text-white",
              "shadow-[0_12px_28px_-8px_rgba(50,201,145,0.45)]",
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
