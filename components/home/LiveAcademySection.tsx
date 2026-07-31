"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { WhatsappIcon } from "@/components/shared/SocialBrandIcons";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { SiteCta } from "@/components/shared/SiteCta";
import { WHATSAPP_URL } from "@/lib/constants";
import { LiveAcademyDashboardPanel } from "@/components/home/LiveAcademyDashboardPanel";
import type { ISectionHeaderContent } from "@/lib/types";
import { useSectionHeaderText } from "@/lib/i18n/useSectionHeaderText";

const ADMIN_IMAGE = "/images/live-academy-admin.png";

function GoldEyebrow({ label }: { label: string }) {
  return (
    <div className="mb-4 flex items-center justify-center gap-2.5">
      <span className="hidden h-px w-8 bg-[#D4A853]/60 sm:block sm:w-12" aria-hidden="true" />
      <span className="inline-block h-1.5 w-1.5 rotate-45 bg-[#D4A853]" aria-hidden="true" />
      <p className="font-body text-[11px] font-bold uppercase tracking-[0.2em] text-[#D4A853] sm:text-xs">
        {label}
      </p>
      <span className="inline-block h-1.5 w-1.5 rotate-45 bg-[#D4A853]" aria-hidden="true" />
      <span className="hidden h-px w-8 bg-[#D4A853]/60 sm:block sm:w-12" aria-hidden="true" />
    </div>
  );
}

export function LiveAcademySection({
  header,
}: {
  header?: ISectionHeaderContent;
}) {
  const t = useTranslations("home.liveAcademy");
  const copy = useSectionHeaderText("home.liveAcademy", header, [
    "eyebrow",
    "title",
    "subtitle",
  ]);

  return (
    <section className="bg-white py-16 md:py-24" aria-labelledby="live-academy-heading">
      <div className="site-container">
        <ScrollReveal className="mx-auto max-w-3xl text-center">
          <GoldEyebrow label={copy.eyebrow ?? t("eyebrow")} />
          <h2
            id="live-academy-heading"
            className="font-playfair text-3xl font-bold leading-tight text-primary-dark sm:text-4xl"
          >
            {copy.title}
          </h2>
          <p className="mt-4 font-inter text-base leading-relaxed text-gray-600">
            {copy.subtitle}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <SiteCta href="/free-class" className="inline-flex items-center gap-2">
              {t("primaryCta")}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </SiteCta>
            <SiteCta
              href={WHATSAPP_URL}
              variant="secondary"
              external
              className="inline-flex items-center gap-2"
            >
              <WhatsappIcon className="h-4 w-4 text-[#25D366]" />
              {t("secondaryCta")}
            </SiteCta>
          </div>
        </ScrollReveal>

        <div className="mt-12 grid items-stretch gap-6 lg:grid-cols-2 lg:gap-10">
          <ScrollReveal direction="left" delay={0.08} className="h-full">
            <div className="relative flex min-h-[260px] items-center justify-center overflow-hidden rounded-2xl border border-gray-200/90 bg-[#FAFCFB] p-4 shadow-[0_8px_30px_-12px_rgba(15,23,42,0.08)] sm:min-h-[340px] lg:min-h-[460px]">
              <Image
                src={ADMIN_IMAGE}
                alt={t("adminImageAlt")}
                width={1280}
                height={800}
                className="h-auto max-h-[420px] w-full object-contain object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={0.12} className="h-full">
            <LiveAcademyDashboardPanel />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
