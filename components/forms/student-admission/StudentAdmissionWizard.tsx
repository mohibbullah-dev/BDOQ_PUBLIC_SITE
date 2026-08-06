"use client";

import Link from "next/link";
import { useMemo, useState, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocale, useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { API_BASE } from "@/lib/constants";
import { fetchAdmissionPrefill } from "@/lib/admissionPrefill";
import { DEFAULT_TIMEZONE } from "@/lib/formOptions";
import { useFormValidation } from "@/lib/i18n/useFormValidation";
import {
  createStudentAdmissionSchemas,
  STUDENT_ADMISSION_STEPS,
  type StudentAdmissionFormValues,
} from "@/lib/validators/studentAdmission";
import { FormWizardShell } from "@/components/forms/wizard/FormWizardShell";
import { FormAlert } from "@/components/forms/shared/FormAlert";
import { FormSuccessScreen } from "@/components/forms/shared/FormSuccessScreen";
import { FormPageLayout } from "@/components/forms/shared/FormPageLayout";
import { StudentStepAddress } from "@/components/forms/student-admission/StudentStepAddress";
import { StudentStepGuardian } from "@/components/forms/student-admission/StudentStepGuardian";
import { StudentStepLearning } from "@/components/forms/student-admission/StudentStepLearning";
import { StudentStepPersonal } from "@/components/forms/student-admission/StudentStepPersonal";
import { StudentStepAdmissionFee } from "@/components/forms/student-admission/StudentStepAdmissionFee";
import { StudentStepReview } from "@/components/forms/student-admission/StudentStepReview";
import { ADMISSION_FEE } from "@/lib/constants";

const STEP_COMPONENTS = [
  StudentStepPersonal,
  StudentStepAddress,
  StudentStepLearning,
  StudentStepGuardian,
  StudentStepAdmissionFee,
  StudentStepReview,
] as const;

export function StudentAdmissionWizard() {
  const locale = useLocale();
  const searchParams = useSearchParams();
  const prefillParam = searchParams.get("prefill") ?? "";
  const t = useTranslations("forms.studentAdmission.wizard");
  const tPrefill = useTranslations("forms.studentAdmission.prefill");
  const tCommon = useTranslations("forms.common");
  const validate = useFormValidation();
  const schemas = useMemo(
    () => createStudentAdmissionSchemas(validate),
    [validate, locale]
  );

  const [currentStep, setCurrentStep] = useState(0);
  const [prefillToken, setPrefillToken] = useState("");
  const [prefillLoaded, setPrefillLoaded] = useState(false);
  const [prefillError, setPrefillError] = useState<string | null>(null);
  const [submitState, setSubmitState] = useState<
    "idle" | "loading" | "success" | "error" | "validation"
  >("idle");

  const methods = useForm<StudentAdmissionFormValues>({
    resolver: zodResolver(schemas.full),
    defaultValues: {
      nationality: "Bangladeshi",
      currentCountry: "Bangladesh",
      currentState: "",
      currentDistrict: "",
      currentCity: "",
      currentPostalCode: "",
      permanentCountry: "Bangladesh",
      permanentState: "",
      permanentDistrict: "",
      permanentCity: "",
      permanentPostalCode: "",
      sameAsCurrentAddress: false,
      topicsOfInterest: [],
      devices: [],
      referralSources: [],
      preferredPeriod: "PM",
      timezone: DEFAULT_TIMEZONE,
      admissionFeeCurrency: "bdt",
      admissionFeeAmount: String(ADMISSION_FEE.bdt),
      termsAccepted: false,
    },
    mode: "onTouched",
  });

  const { handleSubmit, getValues, setError, clearErrors, reset } = methods;

  useEffect(() => {
    if (!prefillParam) return;

    let cancelled = false;
    void (async () => {
      const result = await fetchAdmissionPrefill(prefillParam);
      if (cancelled) return;
      if (!result) {
        setPrefillError(tPrefill("loadError"));
        return;
      }

      const prefill = result.prefill as Partial<StudentAdmissionFormValues>;
      reset({
        ...getValues(),
        ...prefill,
        topicsOfInterest: Array.isArray(prefill.topicsOfInterest)
          ? prefill.topicsOfInterest
          : [],
        devices: Array.isArray(prefill.devices) ? prefill.devices : [],
        referralSources: Array.isArray(prefill.referralSources)
          ? prefill.referralSources
          : [],
        termsAccepted: false,
      });
      setPrefillToken(result.prefillToken);
      setPrefillLoaded(true);
    })();

    return () => {
      cancelled = true;
    };
  }, [prefillParam, reset, tPrefill]);

  useEffect(() => {
    if (submitState === "validation") {
      setSubmitState("idle");
    }
  }, [currentStep]);

  const applyStepErrors = (stepIndex: number): void => {
    const stepSchema = schemas.steps[stepIndex];
    if (!stepSchema) return;

    const result = stepSchema.safeParse(getValues());
    if (result.success) {
      clearErrors();
      return;
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
  };

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

  const findFirstInvalidStep = (): number | null => {
    const values = getValues();
    for (let index = 0; index < schemas.steps.length; index += 1) {
      if (!schemas.steps[index]?.safeParse(values).success) {
        return index;
      }
    }
    return null;
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
      const formData = new FormData();
      if (data.admissionPaymentProofFile) {
        formData.append(
          "admissionPaymentProof",
          data.admissionPaymentProofFile
        );
      }

      const fileKeys = new Set(["admissionPaymentProofFile"]);
      const rest = Object.fromEntries(
        Object.entries(data).filter(([key]) => !fileKeys.has(key))
      );

      formData.append(
        "data",
        JSON.stringify({
          ...rest,
          locale,
          ...(prefillToken ? { prefillToken } : {}),
        })
      );

      const response = await fetch(`${API_BASE}/public/student-admissions`, {
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
    if (currentStep === STUDENT_ADMISSION_STEPS.length - 1) {
      const invalidStep = findFirstInvalidStep();
      if (invalidStep !== null) {
        setCurrentStep(invalidStep);
        applyStepErrors(invalidStep);
        setSubmitState("validation");
        return;
      }

      setSubmitState("idle");
      await handleSubmit(onSubmit)();
      return;
    }
    await handleNext();
  };

  if (submitState === "success") {
    return (
      <FormPageLayout variant="studentAdmission">
        <FormSuccessScreen title={t("successTitle")} body={t("successBody")}>
          <Link
            href="/free-class"
            className="inline-flex min-h-[48px] items-center justify-center rounded-full border-2 border-primary px-6 py-3 font-semibold text-primary transition-colors hover:bg-primary/5"
          >
            {t("bookTrial")}
          </Link>
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

  const StepComponent = STEP_COMPONENTS[currentStep] ?? StudentStepPersonal;

  return (
    <FormProvider {...methods}>
      <form onSubmit={(event) => event.preventDefault()} noValidate>
        {prefillError ? (
          <FormAlert type="error" message={prefillError} className="mb-6" />
        ) : null}
        {prefillLoaded ? (
          <FormAlert type="success" message={tPrefill("banner")} className="mb-6" />
        ) : null}
        {submitState === "error" && (
          <FormAlert type="error" message={t("error")} className="mb-6" />
        )}
        {submitState === "validation" && (
          <FormAlert type="error" message={t("validationError")} className="mb-6" />
        )}

        <FormWizardShell
          layoutVariant="studentAdmission"
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
