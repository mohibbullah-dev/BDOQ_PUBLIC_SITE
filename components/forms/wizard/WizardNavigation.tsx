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
    <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
      <button
        type="button"
        onClick={onBack}
        disabled={isFirstStep || isSubmitting}
        className={cn(
          "inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border-2 border-gray-200 px-6 font-inter text-sm font-semibold text-text-dark transition-all",
          isFirstStep
            ? "cursor-not-allowed opacity-40"
            : "hover:border-primary hover:text-primary"
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
          className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-primary px-8 font-inter text-sm font-semibold text-white transition-all hover:bg-primary-dark hover:shadow-lg"
        >
          {nextLabel ?? t("continue")}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
