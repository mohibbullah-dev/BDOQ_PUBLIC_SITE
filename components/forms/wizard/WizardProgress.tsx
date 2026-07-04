"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useStepTitle } from "@/lib/i18n/useFormLocale";
import type { IBilingualStep } from "@/lib/i18n/formLocale";
import { cn } from "@/lib/cn";

export interface IWizardStep extends IBilingualStep {
  id: string;
}

interface IWizardProgressProps {
  steps: IWizardStep[];
  currentStep: number;
}

export function WizardProgress({ steps, currentStep }: IWizardProgressProps) {
  const t = useTranslations("forms.common");
  const stepTitle = useStepTitle();
  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="mb-8">
      <div className="mb-3 flex items-center justify-between gap-3">
        <p className="font-inter text-sm font-medium text-primary-dark">
          {t("stepOf", { current: currentStep + 1, total: steps.length })}
        </p>
        <p className="font-inter text-xs text-text-gray">
          {t("percentComplete", { percent: Math.round(progress) })}
        </p>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-gray-100">
        <motion.div
          className="h-full rounded-full bg-primary"
          initial={false}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      <div
        className="mt-4 hidden gap-2 md:grid"
        style={{
          gridTemplateColumns: `repeat(${steps.length}, minmax(0, 1fr))`,
        }}
      >
        {steps.map((step, index) => {
          const isActive = index === currentStep;
          const isComplete = index < currentStep;

          return (
            <div
              key={step.id}
              className={cn(
                "rounded-xl border px-3 py-2 transition-colors",
                isActive
                  ? "border-primary bg-primary/10"
                  : isComplete
                    ? "border-primary/30 bg-white"
                    : "border-gray-100 bg-white"
              )}
            >
              <p
                className={cn(
                  "font-inter text-[11px] font-semibold uppercase tracking-wide",
                  isActive ? "text-primary" : "text-text-gray"
                )}
              >
                {index + 1}
              </p>
              <p className="mt-0.5 line-clamp-1 font-inter text-xs font-medium text-primary-dark">
                {stepTitle(step)}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
