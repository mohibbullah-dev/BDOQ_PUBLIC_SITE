import type { ReactNode } from "react";
import type { FormLayoutVariant } from "@/lib/forms/formLayout";
import type { IWizardStep } from "@/components/forms/wizard/WizardProgress";
import { FormSidebar } from "@/components/forms/shared/FormSidebar";
import { cn } from "@/lib/cn";

interface IFormPageLayoutProps {
  variant: FormLayoutVariant;
  steps?: IWizardStep[];
  currentStep?: number;
  children: ReactNode;
  className?: string;
}

export function FormPageLayout({
  variant,
  steps,
  currentStep,
  children,
  className,
}: IFormPageLayoutProps) {
  return (
    <div
      className={cn(
        "grid items-start gap-8 lg:grid-cols-[minmax(0,300px)_minmax(0,1fr)] lg:gap-10 xl:grid-cols-[minmax(0,320px)_minmax(0,1fr)]",
        className
      )}
    >
      <FormSidebar variant={variant} steps={steps} currentStep={currentStep} />
      <div className="min-w-0">{children}</div>
    </div>
  );
}
