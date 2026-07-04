"use client";

import { CheckCircle2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { SectionHeader } from "@/components/shared/SectionHeader";

interface ICourseAudienceProps {
  audience: string[];
}

export function CourseAudience({ audience }: ICourseAudienceProps) {
  const t = useTranslations("courseDetails.ui.audience");

  return (
    <section className="py-16 md:py-24 bg-bg-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <SectionHeader title={t("title")} />
          <ul className="space-y-4">
            {audience.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckCircle2
                  className="h-5 w-5 text-primary shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <span className="font-inter text-sm text-text-dark leading-relaxed">
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
