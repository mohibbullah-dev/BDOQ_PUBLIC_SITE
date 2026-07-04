"use client";

import { useTranslations } from "next-intl";
import { WHY_CHOOSE_US } from "@/lib/constants";
import type { IWhyChooseItem } from "@/lib/types";
import { WHY_CHOOSE_I18N_KEYS } from "@/lib/i18n/quickNavKeys";
import { getWhyChooseIcon } from "@/lib/utils";
import { ScrollReveal } from "@/components/shared/ScrollReveal";

interface IFeatureCardProps {
  item: IWhyChooseItem;
  index: number;
}

function FeatureCard({ item, index }: IFeatureCardProps) {
  const Icon = getWhyChooseIcon(item.icon);
  const key = WHY_CHOOSE_I18N_KEYS[item.id] ?? item.id;
  const t = useTranslations(`home.whyChoose.items.${key}`);

  return (
    <ScrollReveal delay={index * 0.08}>
      <div className="h-full rounded-2xl bg-white p-6 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
        <div className="mb-4 inline-flex rounded-xl bg-bg-light p-3">
          <Icon className="h-6 w-6 text-primary" aria-hidden="true" />
        </div>
        <h3 className="font-inter text-lg font-bold text-primary-dark mb-2">
          {t("title")}
        </h3>
        <p className="font-inter text-sm text-text-gray leading-relaxed">
          {t("description")}
        </p>
      </div>
    </ScrollReveal>
  );
}

export function WhyChooseUsSection() {
  const t = useTranslations("home.whyChoose");

  return (
    <section className="py-16 md:py-24 bg-bg-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-12 md:mb-16">
          <h2 className="font-inter text-2xl md:text-3xl font-semibold text-primary-dark">
            {t("title")}
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {WHY_CHOOSE_US.map((item, index) => (
            <FeatureCard key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
