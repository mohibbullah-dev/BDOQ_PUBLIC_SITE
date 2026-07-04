"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { ReactNode } from "react";
import { useStepTitle } from "@/lib/i18n/useFormLocale";
import type { IWizardStep } from "@/components/forms/wizard/WizardProgress";
import { WizardNavigation } from "@/components/forms/wizard/WizardNavigation";
import { WizardProgress } from "@/components/forms/wizard/WizardProgress";
import { formSectionClass } from "@/components/forms/shared/formStyles";

interface IFormWizardShellProps {
  steps: IWizardStep[];
  currentStep: number;
  onBack: () => void;
  onNext: () => void;
  isSubmitting?: boolean;
  nextLabel?: string;
  submitLabel?: string;
  children: ReactNode;
}

const panelMotion = {
  initial: { opacity: 0, x: 24 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -24 },
  transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const },
};

export function FormWizardShell({
  steps,
  currentStep,
  onBack,
  onNext,
  isSubmitting = false,
  nextLabel,
  submitLabel,
  children,
}: IFormWizardShellProps) {
  const stepTitle = useStepTitle();
  const activeStep = steps[currentStep];
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === steps.length - 1;

  return (
    <div className={formSectionClass}>
      <WizardProgress steps={steps} currentStep={currentStep} />

      <div className="mb-6 border-b border-gray-100 pb-4">
        <h2 className="font-amiri text-xl font-bold text-primary-dark md:text-2xl">
          {activeStep ? stepTitle(activeStep) : ""}
        </h2>
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={activeStep?.id} {...panelMotion}>
          {children}
        </motion.div>
      </AnimatePresence>

      <WizardNavigation
        isFirstStep={isFirstStep}
        isLastStep={isLastStep}
        isSubmitting={isSubmitting}
        onBack={onBack}
        onNext={onNext}
        nextLabel={nextLabel}
        submitLabel={submitLabel}
      />
    </div>
  );
}
