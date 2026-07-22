"use client";

import { useTranslations } from "next-intl";
import { ACADEMY_INFO } from "@/lib/constants";
import { AboutVideoPlayer } from "@/components/home/AboutVideoPlayer";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { IslamicShapeBackdrop } from "@/components/shared/IslamicShapeBackdrop";

export function AboutPageVideoSection() {
  const t = useTranslations("pages.about");
  const tContent = useTranslations("content.about");
  const tAcademy = useTranslations("academy");

  return (
    <section className="relative overflow-hidden border-b border-primary/10 bg-bg-light py-14 md:py-20">
      <IslamicShapeBackdrop overlay="page" />

      <div className="site-container relative z-[1]">
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
          <p className="mt-6 text-center font-body text-sm text-[var(--text-gray)]">
            {tContent("featuredVideoTitle")} — {tContent("featuredVideoDesc")}
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
