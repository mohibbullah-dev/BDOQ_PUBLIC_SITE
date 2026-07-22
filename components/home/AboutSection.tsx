"use client";

import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { AboutVideoPlayer } from "@/components/home/AboutVideoPlayer";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { SiteCta } from "@/components/shared/SiteCta";

export function AboutSection() {
  const t = useTranslations("home.about");
  const tAcademy = useTranslations("academy");
  const tCta = useTranslations("cta");
  const tags = t.raw("tags") as string[];

  return (
    <section className="bg-white py-16 md:py-20">
      <div className="site-container">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <ScrollReveal direction="left">
            <AboutVideoPlayer compact />
          </ScrollReveal>

          <ScrollReveal direction="right" delay={0.08}>
            <SectionHeader
              eyebrow={t("eyebrow", { shortName: tAcademy("shortName") })}
              title={tAcademy("tagline")}
              subtitle={t("snippet")}
            />

            <div className="mt-5 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-bg-light px-3.5 py-1.5 font-body text-xs font-medium text-primary-dark"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <SiteCta href="/free-class" size="sm">
                {tCta("bookFreeTrial")}
              </SiteCta>
              <SiteCta href="/about" variant="ghost" size="sm">
                {tCta("learnMoreAboutUs")}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </SiteCta>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
