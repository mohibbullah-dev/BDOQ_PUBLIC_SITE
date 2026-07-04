"use client";

import { useTranslations } from "next-intl";
import { ACADEMY_INFO } from "@/lib/constants";
import { AboutVideoPlayer } from "@/components/home/AboutVideoPlayer";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { SectionHeader } from "@/components/shared/SectionHeader";

export function AboutPageVideoSection() {
  const t = useTranslations("pages.about");
  const tContent = useTranslations("content.about");
  const tAcademy = useTranslations("academy");

  return (
    <section className="page-hero-bg relative overflow-hidden border-b border-primary/10 py-14 md:py-20">
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <SectionHeader
            eyebrow={t("videoEyebrow")}
            title={t("videoTitle", { name: ACADEMY_INFO.name })}
            subtitle={tAcademy("mission")}
            centered
            titleAs="h1"
            variant="page"
          />
        </ScrollReveal>

        <ScrollReveal delay={0.1} className="mt-10 md:mt-12">
          <AboutVideoPlayer />
          <p className="mt-6 text-center font-inter text-sm text-[var(--text-gray)]">
            {tContent("featuredVideoTitle")} — {tContent("featuredVideoDesc")}
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
