"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocale, useTranslations } from "next-intl";
import { API_BASE } from "@/lib/constants";
import { TIMEZONE_OPTIONS } from "@/lib/formOptions";
import { useFormValidation } from "@/lib/i18n/useFormValidation";
import {
  createStudentAdmissionSchemas,
  STUDENT_ADMISSION_STEPS,
  type StudentAdmissionFormValues,
} from "@/lib/validators/studentAdmission";
import { FormWizardShell } from "@/components/forms/wizard/FormWizardShell";
import { FormAlert } from "@/components/forms/shared/FormAlert";
import { StudentStepAddress } from "@/components/forms/student-admission/StudentStepAddress";
import { StudentStepGuardian } from "@/components/forms/student-admission/StudentStepGuardian";
import { StudentStepLearning } from "@/components/forms/student-admission/StudentStepLearning";
import { StudentStepPersonal } from "@/components/forms/student-admission/StudentStepPersonal";
import { StudentStepReview } from "@/components/forms/student-admission/StudentStepReview";

const STEP_COMPONENTS = [
  StudentStepPersonal,
  StudentStepAddress,
  StudentStepLearning,
  StudentStepGuardian,
  StudentStepReview,
] as const;

export function StudentAdmissionWizard() {
  const locale = useLocale();
  const t = useTranslations("forms.studentAdmission.wizard");
  const tCommon = useTranslations("forms.common");
  const validate = useFormValidation();
  const schemas = useMemo(
    () => createStudentAdmissionSchemas(validate),
    [validate, locale]
  );

  const [currentStep, setCurrentStep] = useState(0);
  const [submitState, setSubmitState] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const methods = useForm<StudentAdmissionFormValues>({
    resolver: zodResolver(schemas.full),
    defaultValues: {
      nationality: "Bangladeshi",
      currentCountry: "Bangladesh",
      permanentCountry: "Bangladesh",
      sameAsCurrentAddress: false,
      topicsOfInterest: [],
      devices: [],
      referralSources: [],
      preferredPeriod: "PM",
      timezone: TIMEZONE_OPTIONS[0],
      termsAccepted: false,
    },
    mode: "onTouched",
  });

  const { handleSubmit, trigger, getValues, setError, clearErrors } = methods;

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
        setError(fieldName as keyof StudentAdmissionFormValues, {
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
    setCurrentStep((step) =>
      Math.min(step + 1, STUDENT_ADMISSION_STEPS.length - 1)
    );
  };

  const handleBack = (): void => {
    setCurrentStep((step) => Math.max(step - 1, 0));
  };

  const onSubmit = async (data: StudentAdmissionFormValues): Promise<void> => {
    setSubmitState("loading");
    try {
      const response = await fetch(`${API_BASE}/public/student-admissions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, locale }),
        cache: "no-store",
      });
      if (!response.ok) throw new Error("Failed");
      setSubmitState("success");
    } catch {
      setSubmitState("error");
    }
  };

  const handleWizardNext = async (): Promise<void> => {
    if (currentStep === STUDENT_ADMISSION_STEPS.length - 1) {
      const isValid = await trigger();
      if (!isValid) return;
      await handleSubmit(onSubmit)();
      return;
    }
    await handleNext();
  };

  if (submitState === "success") {
    return (
      <div className="space-y-4 text-center">
        <FormAlert type="success" message={t("successBody")} />
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/free-class"
            className="inline-flex min-h-[44px] items-center justify-center rounded-full border-2 border-primary px-6 py-3 font-semibold text-primary"
          >
            {t("bookTrial")}
          </Link>
          <Link
            href="/"
            className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-primary px-6 py-3 font-semibold text-white"
          >
            {tCommon("returnHome")}
          </Link>
        </div>
      </div>
    );
  }

  const StepComponent = STEP_COMPONENTS[currentStep] ?? StudentStepPersonal;

  return (
    <FormProvider {...methods}>
      <form onSubmit={(event) => event.preventDefault()} noValidate>
        {submitState === "error" && (
          <FormAlert type="error" message={t("error")} className="mb-6" />
        )}

        <FormWizardShell
          steps={[...STUDENT_ADMISSION_STEPS]}
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
  );
}
