"use client";

import { useTranslations } from "next-intl";
import { getBenefitIcon } from "@/lib/benefitIcons";
import type { ICourseBenefit } from "@/lib/types";
import { SectionHeader } from "@/components/shared/SectionHeader";

interface ICourseBenefitsProps {
  benefits: ICourseBenefit[];
}

export function CourseBenefits({ benefits }: ICourseBenefitsProps) {
  const t = useTranslations("courseDetails.ui.benefits");

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="site-container">
        <div className="mb-12">
          <SectionHeader title={t("title")} subtitle={t("subtitle")} />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit) => {
            const Icon = getBenefitIcon(benefit.icon);
            return (
              <div
                key={benefit.id}
                className="site-card rounded-2xl border border-gray-200 bg-white p-6 transition-shadow duration-200 hover:shadow-md"
              >
                <div className="mb-4 inline-flex rounded-xl bg-bg-light p-3">
                  <Icon className="h-6 w-6 text-primary" aria-hidden="true" />
                </div>
                <h3 className="mb-2 font-playfair text-base font-bold tracking-tight text-primary-dark">
                  {benefit.title}
                </h3>
                <p className="font-body text-sm leading-relaxed text-text-gray">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
