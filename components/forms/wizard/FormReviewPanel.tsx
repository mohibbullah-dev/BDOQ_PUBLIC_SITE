"use client";

import { useTranslations } from "next-intl";

interface IReviewItem {
  label: string;
  value: string;
}

interface IFormReviewPanelProps {
  items: IReviewItem[];
}

export function FormReviewPanel({ items }: IFormReviewPanelProps) {
  const t = useTranslations("forms.common");

  return (
    <div className="space-y-3 rounded-2xl border border-gray-100 bg-bg-light/50 p-5">
      {items.map((item) => (
        <div
          key={item.label}
          className="grid gap-1 border-b border-gray-100 pb-3 last:border-0 last:pb-0 sm:grid-cols-[180px_1fr]"
        >
          <dt className="font-body text-xs font-semibold uppercase tracking-wide text-text-gray">
            {item.label}
          </dt>
          <dd className="font-body text-sm text-primary-dark">
            {item.value || t("emptyValue")}
          </dd>
        </div>
      ))}
    </div>
  );
}
