"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { SubmitButton } from "@/components/forms/shared/SubmitButton";
import { cn } from "@/lib/cn";

interface IWizardNavigationProps {
  isFirstStep: boolean;
  isLastStep: boolean;
  isSubmitting?: boolean;
  onBack: () => void;
  onNext: () => void;
  nextLabel?: string;
  submitLabel?: string;
}

export function WizardNavigation({
  isFirstStep,
  isLastStep,
  isSubmitting = false,
  onBack,
  onNext,
  nextLabel,
  submitLabel,
}: IWizardNavigationProps) {
  const t = useTranslations("forms.common");

  return (
    <div className="mt-10 flex flex-col-reverse gap-3 border-t border-gray-100 pt-6 sm:flex-row sm:items-center sm:justify-between">
      <button
        type="button"
        onClick={onBack}
        disabled={isFirstStep || isSubmitting}
        className={cn(
          "inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border-2 px-6 font-inter text-sm font-semibold transition-all",
          isFirstStep
            ? "cursor-not-allowed border-gray-100 text-text-gray/40"
            : "border-gray-200 bg-white text-text-dark hover:border-primary/40 hover:text-primary"
        )}
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        {t("back")}
      </button>

      {isLastStep ? (
        <SubmitButton
          isLoading={isSubmitting}
          label={submitLabel ?? t("continue")}
        />
      ) : (
        <button
          type="button"
          onClick={onNext}
          disabled={isSubmitting}
          className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-primary px-8 font-inter text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-all hover:shadow-xl disabled:opacity-60"
        >
          {nextLabel ?? t("continue")}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
