"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { HOW_TO_START_STEPS } from "@/lib/constants";
import type { IHowToStartStep } from "@/lib/types";
import { getHowToStartImagePath } from "@/lib/howToStartImages";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { SiteCta } from "@/components/shared/SiteCta";

interface IStepCardProps {
  step: IHowToStartStep;
  index: number;
}

function StepCard({ step, index }: IStepCardProps) {
  const t = useTranslations(`home.howToStart.steps.${step.step}`);
  const stepLabel = String(step.step).padStart(2, "0");

  return (
    <ScrollReveal delay={index * 0.05}>
      <article className="site-card flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white">
        <div className="relative aspect-[16/10] w-full overflow-hidden">
          <Image
            src={getHowToStartImagePath(step.step)}
            alt={t("title")}
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          <span className="absolute left-3 top-3 rounded-full bg-white px-3 py-1 font-body text-[11px] font-bold uppercase tracking-wider text-primary">
            Step {stepLabel}
          </span>
        </div>

        <div className="flex flex-1 flex-col p-5">
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

export function HowToStartSection() {
  const t = useTranslations("home.howToStart");

  return (
    <section id="how-to-start" className="bg-bg-light py-16 md:py-20">
      <div className="site-container">
        <ScrollReveal className="mb-10 md:mb-12">
          <SectionHeader
            eyebrow={t("eyebrow")}
            title={t("title")}
            subtitle={t("subtitle")}
            centered
          />
        </ScrollReveal>

        <div className="grid gap-5 md:grid-cols-3 lg:gap-6">
          {HOW_TO_START_STEPS.map((step, index) => (
            <StepCard key={step.step} step={step} index={index} />
          ))}
        </div>

        <ScrollReveal delay={0.15} className="mt-10 text-center">
          <SiteCta href="/free-class">
            {t("cta")}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </SiteCta>
        </ScrollReveal>
      </div>
    </section>
  );
}
