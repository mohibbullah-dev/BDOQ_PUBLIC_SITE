"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import type { IBilingualStep } from "@/lib/i18n/formLocale";
import { cn } from "@/lib/cn";

export interface IWizardStep extends IBilingualStep {
  id: string;
}

interface IWizardProgressProps {
  steps: IWizardStep[];
  currentStep: number;
  /** Hides desktop step pills — sidebar shows them on lg+ */
  compact?: boolean;
}

export function WizardProgress({
  steps,
  currentStep,
  compact = false,
}: IWizardProgressProps) {
  const t = useTranslations("forms.common");
  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="mb-8">
      <div className="mb-3 flex items-center justify-between gap-3">
        <p className="font-inter text-sm font-semibold text-primary-dark">
          {t("stepOf", { current: currentStep + 1, total: steps.length })}
        </p>
        <p className="rounded-full bg-primary/10 px-2.5 py-0.5 font-inter text-xs font-semibold text-primary">
          {t("percentComplete", { percent: Math.round(progress) })}
        </p>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-gray-100/90">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-primary to-teal"
          initial={false}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      {!compact && (
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
                  "rounded-xl border px-3 py-2 transition-all",
                  isActive
                    ? "border-primary/40 bg-primary/10 shadow-sm"
                    : isComplete
                      ? "border-primary/20 bg-white"
                      : "border-gray-100 bg-white/60"
                )}
              >
                <p
                  className={cn(
                    "font-inter text-[10px] font-bold uppercase tracking-wider",
                    isActive ? "text-primary" : "text-text-gray"
                  )}
                >
                  {index + 1}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
