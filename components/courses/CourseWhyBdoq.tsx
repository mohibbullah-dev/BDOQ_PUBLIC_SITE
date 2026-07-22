"use client";

import { CheckCircle2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useWhyBdoqItems } from "@/lib/i18n/useLocalizedCourseDetail";
import { SectionHeader } from "@/components/shared/SectionHeader";

export function CourseWhyBdoq() {
  const t = useTranslations("courseDetails.ui.whyChoose");
  const items = useWhyBdoqItems();

  return (
    <section className="py-16 md:py-24 bg-bg-light">
      <div className="site-container">
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <SectionHeader title={t("title")} subtitle={t("subtitle")} />
          <ul className="space-y-4">
            {items.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckCircle2
                  className="h-5 w-5 text-primary shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <span className="font-body text-sm text-text-dark leading-relaxed">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
