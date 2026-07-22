"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { WHY_CHOOSE_US } from "@/lib/constants";
import type { IWhyChooseItem } from "@/lib/types";
import { WHY_CHOOSE_I18N_KEYS } from "@/lib/i18n/quickNavKeys";
import { getWhyChooseIcon } from "@/lib/utils";
import { getWhyChooseImagePath } from "@/lib/whyChooseImages";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { SectionHeader } from "@/components/shared/SectionHeader";

interface IFeatureCardProps {
  item: IWhyChooseItem;
  index: number;
}

function FeatureCard({ item, index }: IFeatureCardProps) {
  const key = WHY_CHOOSE_I18N_KEYS[item.id] ?? item.id;
  const t = useTranslations(`home.whyChoose.items.${key}`);
  const Icon = getWhyChooseIcon(item.icon);

  return (
    <ScrollReveal delay={index * 0.05}>
      <article className="site-card flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white">
        <div className="relative aspect-[16/10] w-full overflow-hidden">
          <Image
            src={getWhyChooseImagePath(item.id)}
            alt={t("title")}
            fill
            className="object-cover object-center"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <span className="absolute left-3 top-3 flex h-9 w-9 items-center justify-center rounded-xl bg-white text-primary shadow-sm">
            <Icon className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
          </span>
        </div>

        <div className="flex flex-1 flex-col p-5">
          <h3 className="font-playfair text-base font-semibold leading-snug tracking-tight text-primary-dark sm:text-lg">
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

export function WhyChooseUsSection() {
  const t = useTranslations("home.whyChoose");

  return (
    <section className="bg-bg-light py-16 md:py-20">
      <div className="site-container">
        <ScrollReveal className="mb-10 md:mb-12">
          <SectionHeader
            eyebrow={t("eyebrow")}
            title={t("title")}
            subtitle={t("subtitle")}
            centered
          />
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {WHY_CHOOSE_US.map((item, index) => (
            <FeatureCard key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
