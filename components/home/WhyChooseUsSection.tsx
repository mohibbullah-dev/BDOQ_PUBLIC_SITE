"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { WHY_CHOOSE_US } from "@/lib/constants";
import type { IWhyChooseItem } from "@/lib/types";
import { WHY_CHOOSE_I18N_KEYS } from "@/lib/i18n/quickNavKeys";
import { getWhyChooseIcon } from "@/lib/utils";
import { getWhyChooseImagePath } from "@/lib/whyChooseImages";
import { IslamicShapeBackdrop } from "@/components/shared/IslamicShapeBackdrop";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { cn } from "@/lib/cn";

const LEARN_MORE_HREFS: Record<string, string> = {
  "one-to-one": "/courses?type=private",
  batch: "/courses?type=live",
  flexible: "/free-class",
  separate: "/teachers",
  teachers: "/teachers",
  multilingual: "/courses",
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

interface IFeatureCardProps {
  item: IWhyChooseItem;
  index: number;
}

function FeatureCard({ item, index }: IFeatureCardProps) {
  const key = WHY_CHOOSE_I18N_KEYS[item.id] ?? item.id;
  const t = useTranslations(`home.whyChoose.items.${key}`);
  const tSection = useTranslations("home.whyChoose");
  const Icon = getWhyChooseIcon(item.icon);
  const href = LEARN_MORE_HREFS[item.id] ?? "/about";
  const isSubjectsCard = item.id === "multilingual";
  const subjects = isSubjectsCard
    ? (t.raw("subjects") as string[] | undefined)
    : undefined;

  return (
    <ScrollReveal delay={index * 0.05} className="h-full">
      <article
        className={cn(
          "site-card flex h-full overflow-hidden rounded-2xl border border-gray-100 bg-white",
          "shadow-[0_12px_36px_-22px_rgba(15,23,42,0.16)]",
          "transition-shadow duration-300 hover:shadow-[0_18px_44px_-24px_rgba(38,155,111,0.28)]"
        )}
      >
        <div className="flex min-w-0 flex-1 flex-col justify-center p-4 sm:p-5">
          <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-bg-light text-primary">
            <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
          </span>
          <h3 className="font-body text-base font-semibold leading-snug text-primary-dark sm:text-[17px]">
            {t("title")}
          </h3>
          <p className="mt-2 font-body text-sm leading-relaxed text-text-gray">
            {t("description")}
          </p>
          <Link
            href={href}
            className="mt-3 inline-flex items-center gap-1 font-body text-sm font-semibold text-primary transition-colors hover:text-primary-dark"
          >
            {tSection("learnMore")}
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>

        <div className="relative w-[42%] shrink-0 self-stretch sm:w-[46%] min-h-[9.5rem]">
          <Image
            src={getWhyChooseImagePath(item.id)}
            alt={t("title")}
            fill
            className="object-cover object-center"
            sizes="(max-width: 640px) 40vw, (max-width: 1024px) 22vw, 180px"
          />
          {isSubjectsCard && subjects && subjects.length > 0 ? (
            <div className="absolute inset-0 flex flex-col justify-end gap-1 bg-gradient-to-t from-primary-dark/75 via-primary-dark/25 to-transparent p-2.5 sm:p-3">
              {subjects.map((subject) => (
                <span
                  key={subject}
                  className="rounded-full border border-white/30 bg-white/95 px-2 py-0.5 text-center font-body text-[9px] font-semibold text-primary-dark sm:text-[10px]"
                >
                  {subject}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      </article>
    </ScrollReveal>
  );
}

/** Why choose us — horizontal feature cards (mockup) */
export function WhyChooseUsSection() {
  const t = useTranslations("home.whyChoose");

  return (
    <section className="relative overflow-hidden bg-[#F7FCF9] py-16 md:py-24">
      <IslamicShapeBackdrop overlay="home" />
      <Image
        src="/brand/footer-lantern.svg"
        alt=""
        width={52}
        height={72}
        className="pointer-events-none absolute left-4 top-16 z-[1] hidden opacity-90 lg:left-8 lg:block"
        aria-hidden="true"
      />

      <div className="site-container relative z-[1]">
        <ScrollReveal className="mb-10 md:mb-12">
          <div className="mx-auto max-w-3xl text-center">
            <GoldEyebrow label={t("eyebrow")} />
            <h2 className="font-playfair text-3xl font-bold tracking-tight text-primary-dark md:text-4xl">
              {t("title")}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl font-body text-base leading-relaxed text-text-gray">
              {t("subtitle")}
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {WHY_CHOOSE_US.map((item, index) => (
            <FeatureCard key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
