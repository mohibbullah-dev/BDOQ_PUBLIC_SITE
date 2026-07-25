"use client";

import Image from "next/image";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  UserRound,
  type LucideIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { HOW_TO_START_STEPS } from "@/lib/constants";
import type { IHowToStartStep } from "@/lib/types";
import { getHowToStartImagePath } from "@/lib/howToStartImages";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { SiteCta } from "@/components/shared/SiteCta";
import { cn } from "@/lib/cn";

const STEP_ICONS: Record<number, LucideIcon> = {
  1: CalendarDays,
  2: UserRound,
  3: BookOpen,
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

interface IStepCardProps {
  step: IHowToStartStep;
  index: number;
  showConnector: boolean;
}

function StepCard({ step, index, showConnector }: IStepCardProps) {
  const t = useTranslations(`home.howToStart.steps.${step.step}`);
  const stepLabel = String(step.step).padStart(2, "0");
  const Icon = STEP_ICONS[step.step] ?? BookOpen;

  return (
    <ScrollReveal delay={index * 0.06} className="relative h-full">
      {showConnector ? (
        <div
          className="pointer-events-none absolute left-[calc(50%+1.5rem)] top-[7.5rem] z-0 hidden h-px w-[calc(100%-1rem)] border-t-2 border-dashed border-[#D4A853]/55 md:block"
          aria-hidden="true"
        />
      ) : null}

      <article className="site-card relative z-[1] flex h-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-[0_14px_40px_-24px_rgba(15,23,42,0.2)]">
        <div className="relative aspect-[16/10] w-full overflow-hidden">
          <Image
            src={getHowToStartImagePath(step.step)}
            alt={t("title")}
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          <span className="absolute left-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary font-body text-sm font-bold text-white shadow-md">
            {stepLabel}
          </span>
        </div>

        <div className="flex flex-1 flex-col px-5 pb-6 pt-5 text-center">
          <span className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-bg-light text-primary">
            <Icon className="h-5 w-5" aria-hidden="true" />
          </span>
          <h3 className="font-body text-lg font-semibold leading-snug text-primary-dark">
            {t("title")}
          </h3>
          <p className="mt-2 font-body text-sm leading-relaxed text-text-gray">
            {t("description")}
          </p>
        </div>
      </article>
    </ScrollReveal>
  );
}

/** How to start — 3 connected step cards (mockup) */
export function HowToStartSection() {
  const t = useTranslations("home.howToStart");

  return (
    <section
      id="how-to-start"
      className="relative overflow-hidden bg-gradient-to-b from-[#E8FAF2] via-[#F7FCF9] to-white py-16 md:py-24"
    >
      <Image
        src="/brand/footer-mosque.svg"
        alt=""
        width={320}
        height={100}
        className="pointer-events-none absolute -bottom-2 left-0 z-0 w-[min(50vw,320px)] opacity-[0.14]"
        aria-hidden="true"
      />

      <div className="site-container relative z-[1]">
        <ScrollReveal className="mb-10 md:mb-14">
          <div className="mx-auto max-w-3xl text-center">
            <GoldEyebrow label={t("eyebrow")} />
            <h2 className="font-playfair text-3xl font-bold leading-[1.2] tracking-tight text-primary-dark md:text-4xl">
              {t("titleBefore")}{" "}
              <span className="text-primary">{t("titleHighlight")}</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl font-body text-base leading-relaxed text-text-gray">
              {t("subtitle")}
            </p>
          </div>
        </ScrollReveal>

        <div className="grid gap-6 md:grid-cols-3 md:gap-5 lg:gap-8">
          {HOW_TO_START_STEPS.map((step, index) => (
            <StepCard
              key={step.step}
              step={step}
              index={index}
              showConnector={index < HOW_TO_START_STEPS.length - 1}
            />
          ))}
        </div>

        <ScrollReveal delay={0.15} className="mt-10 text-center md:mt-12">
          <SiteCta href="/free-class" className={cn("px-10")}>
            {t("cta")}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </SiteCta>
        </ScrollReveal>
      </div>
    </section>
  );
}
