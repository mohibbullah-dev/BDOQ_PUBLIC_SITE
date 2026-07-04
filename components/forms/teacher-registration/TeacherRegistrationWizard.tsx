"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocale, useTranslations } from "next-intl";
import { API_BASE } from "@/lib/constants";
import { useFormValidation } from "@/lib/i18n/useFormValidation";
import {
  createTeacherRegistrationSchemas,
  TEACHER_REGISTRATION_STEPS,
  type TeacherRegistrationFormValues,
} from "@/lib/validators/teacherRegistration";
import { FormWizardShell } from "@/components/forms/wizard/FormWizardShell";
import { FormAlert } from "@/components/forms/shared/FormAlert";
import { TeacherStepAcademic } from "@/components/forms/teacher-registration/TeacherStepAcademic";
import { TeacherStepDocuments } from "@/components/forms/teacher-registration/TeacherStepDocuments";
import { TeacherStepPersonal } from "@/components/forms/teacher-registration/TeacherStepPersonal";
import { TeacherStepReview } from "@/components/forms/teacher-registration/TeacherStepReview";
import { TeacherStepTeaching } from "@/components/forms/teacher-registration/TeacherStepTeaching";

const STEP_COMPONENTS = [
  TeacherStepPersonal,
  TeacherStepAcademic,
  TeacherStepTeaching,
  TeacherStepDocuments,
  TeacherStepReview,
] as const;

export function TeacherRegistrationWizard() {
  const locale = useLocale();
  const t = useTranslations("forms.teacherRegistration.wizard");
  const tCommon = useTranslations("forms.common");
  const validate = useFormValidation();
  const schemas = useMemo(
    () => createTeacherRegistrationSchemas(validate),
    [validate, locale]
  );

  const [currentStep, setCurrentStep] = useState(0);
  const [submitState, setSubmitState] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const methods = useForm<TeacherRegistrationFormValues>({
    resolver: zodResolver(schemas.full),
    defaultValues: {
      currentCountry: "Bangladesh",
      permanentCountry: "Bangladesh",
      sameAsCurrentAddress: false,
      subjects: [],
      availableDays: [],
      availableTimeSlots: [],
      languages: [],
      teachingDevices: [],
      isHafiz: "no",
      rulesAccepted: false,
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
        setError(fieldName as keyof TeacherRegistrationFormValues, {
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
      Math.min(step + 1, TEACHER_REGISTRATION_STEPS.length - 1)
    );
  };

  const handleBack = (): void => {
    setCurrentStep((step) => Math.max(step - 1, 0));
  };

  const onSubmit = async (
    data: TeacherRegistrationFormValues
  ): Promise<void> => {
    setSubmitState("loading");
    try {
      const formData = new FormData();
      formData.append("cvFile", data.cvFile);
      formData.append("profilePhotoFile", data.profilePhotoFile);
      if (data.screenshotFile) {
        formData.append("screenshotFile", data.screenshotFile);
      }
      formData.append("certificateFile", data.certificateFile);

      const fileKeys = new Set([
        "cvFile",
        "profilePhotoFile",
        "screenshotFile",
        "certificateFile",
      ]);
      const rest = Object.fromEntries(
        Object.entries(data).filter(([key]) => !fileKeys.has(key))
      );

      formData.append(
        "data",
        JSON.stringify({
          ...rest,
          locale,
        })
      );

      const response = await fetch(`${API_BASE}/public/teacher-applications`, {
        method: "POST",
        body: formData,
        cache: "no-store",
      });
      if (!response.ok) throw new Error("Failed");
      setSubmitState("success");
    } catch {
      setSubmitState("error");
    }
  };

  const handleWizardNext = async (): Promise<void> => {
    if (currentStep === TEACHER_REGISTRATION_STEPS.length - 1) {
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
        <Link
          href="/"
          className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-primary px-8 py-3 font-semibold text-white"
        >
          {tCommon("returnHome")}
        </Link>
      </div>
    );
  }

  const StepComponent = STEP_COMPONENTS[currentStep] ?? TeacherStepPersonal;

  return (
    <FormProvider {...methods}>
      <form onSubmit={(event) => event.preventDefault()} noValidate>
        {submitState === "error" && (
          <FormAlert type="error" message={t("error")} className="mb-6" />
        )}

        <FormWizardShell
          steps={[...TEACHER_REGISTRATION_STEPS]}
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
