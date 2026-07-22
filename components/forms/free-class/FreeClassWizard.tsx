"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocale, useTranslations } from "next-intl";
import { API_BASE } from "@/lib/constants";
import { mapFreeClassToTrialBooking } from "@/lib/mappers/trialBooking";
import type { IFormSelectOption } from "@/lib/formOptions";
import { TIMEZONE_OPTIONS } from "@/lib/formOptions";
import { useFormValidation } from "@/lib/i18n/useFormValidation";
import {
  createFreeClassSchemas,
  FREE_CLASS_STEPS,
  type FreeClassFormValues,
} from "@/lib/validators/freeClass";
import { FormWizardShell } from "@/components/forms/wizard/FormWizardShell";
import { FormAlert } from "@/components/forms/shared/FormAlert";
import { FormSuccessScreen } from "@/components/forms/shared/FormSuccessScreen";
import { FormPageLayout } from "@/components/forms/shared/FormPageLayout";
import { FreeStepBooking } from "@/components/forms/free-class/FreeStepBooking";
import { FreeStepPersonal } from "@/components/forms/free-class/FreeStepPersonal";
import { FreeClassSubjectsProvider } from "@/components/forms/free-class/FreeClassSubjectsContext";

const STEP_COMPONENTS = [FreeStepPersonal, FreeStepBooking] as const;

interface IFreeClassWizardProps {
  subjects: IFormSelectOption[];
  defaultSubject?: string;
  showTitle?: boolean;
  className?: string;
}

export function FreeClassWizard({
  subjects,
  defaultSubject = "",
  showTitle = false,
  className,
}: IFreeClassWizardProps) {
  const locale = useLocale();
  const t = useTranslations("forms.freeClass.wizard");
  const tPage = useTranslations("pages.freeClass");
  const validate = useFormValidation();
  const schemas = useMemo(
    () => createFreeClassSchemas(validate),
    [validate, locale]
  );

  const [currentStep, setCurrentStep] = useState(0);
  const [submitState, setSubmitState] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const methods = useForm<FreeClassFormValues>({
    resolver: zodResolver(schemas.full),
    defaultValues: {
      subject: defaultSubject || subjects[0]?.value || "",
      teacherGender: "any",
      classTimeSlots: [],
      timezone: TIMEZONE_OPTIONS[0],
    },
    mode: "onTouched",
  });

  const { handleSubmit, getValues, setError, clearErrors, trigger } = methods;

  const validateCurrentStep = async (): Promise<boolean> => {
    const stepSchema = schemas.steps[currentStep];
    if (!stepSchema) return true;

    const result = stepSchema.safeParse(getValues());
    if (result.success) {
      clearErrors();
      return true;
    }

    result.error.issues.forEach((issue) => {
      const fieldName = issue.path[0];
      if (typeof fieldName === "string") {
        setError(fieldName as keyof FreeClassFormValues, {
          type: "manual",
          message: issue.message,
        });
      }
    });
    return false;
  };

  const handleNext = async (): Promise<void> => {
    const isValid = await validateCurrentStep();
    if (!isValid) return;
    setCurrentStep((step) => Math.min(step + 1, FREE_CLASS_STEPS.length - 1));
  };

  const handleBack = (): void => {
    setCurrentStep((step) => Math.max(step - 1, 0));
  };

  const onSubmit = async (data: FreeClassFormValues): Promise<void> => {
    setSubmitState("loading");
    try {
      const response = await fetch(`${API_BASE}/public/trial-bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(mapFreeClassToTrialBooking(data)),
        cache: "no-store",
      });
      if (!response.ok) throw new Error("Failed");
      setSubmitState("success");
    } catch {
      setSubmitState("error");
    }
  };

  const handleWizardNext = async (): Promise<void> => {
    if (currentStep === FREE_CLASS_STEPS.length - 1) {
      const isValid = await trigger();
      if (!isValid) return;
      await handleSubmit(onSubmit)();
      return;
    }
    await handleNext();
  };

  const tCommon = useTranslations("forms.common");

  if (submitState === "success") {
    return (
      <FormPageLayout variant="freeClass" className={className}>
        <FormSuccessScreen title={t("successTitle")} body={t("successBody")}>
          <Link
            href="/"
            className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-primary px-8 py-3 font-semibold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary-dark"
          >
            {tCommon("returnHome")}
          </Link>
        </FormSuccessScreen>
      </FormPageLayout>
    );
  }

  const StepComponent = STEP_COMPONENTS[currentStep] ?? FreeStepPersonal;

  return (
    <FreeClassSubjectsProvider subjects={subjects}>
      <div className={className}>
        {showTitle && (
          <div className="mb-8 text-center">
            <p className="mb-2 font-body text-xs font-semibold uppercase tracking-[0.16em] text-primary">
              {tPage("eyebrow")}
            </p>
            <h1 className="mb-2 font-amiri text-2xl font-bold text-primary-dark md:text-3xl">
              {tPage("title")}
            </h1>
            <p className="font-body text-sm text-text-gray">
              {tPage("subtitle")}
            </p>
          </div>
        )}

        <FormProvider {...methods}>
          <form onSubmit={(event) => event.preventDefault()} noValidate>
            {submitState === "error" && (
              <FormAlert type="error" message={t("error")} className="mb-6" />
            )}

            <FormWizardShell
              layoutVariant="freeClass"
              steps={[...FREE_CLASS_STEPS]}
              currentStep={currentStep}
              onBack={handleBack}
              onNext={handleWizardNext}
              isSubmitting={submitState === "loading"}
              submitLabel={t("submit")}
            >
              <StepComponent />
            </FormWizardShell>
          </form>
        </FormProvider>
      </div>
    </FreeClassSubjectsProvider>
  );
}
