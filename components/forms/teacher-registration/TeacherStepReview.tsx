"use client";

import { useMemo } from "react";
import { useTranslations } from "next-intl";
import { useFormContext, useWatch } from "react-hook-form";
import { FormReviewPanel } from "@/components/forms/wizard/FormReviewPanel";
import { formErrorClass } from "@/components/forms/shared/formStyles";
import { useLocalizedOptionLookup } from "@/lib/i18n/useFormLocale";
import {
  CLASS_TIME_SLOTS,
  INTERNET_CONNECTION_TYPES,
  REFERRAL_SOURCES,
  TEACHER_LANGUAGE_OPTIONS,
  TEACHER_SUBJECT_OPTIONS,
  TEACHING_DEVICE_OPTIONS,
  WEEKDAY_OPTIONS,
} from "@/lib/formOptions";
import type { TeacherRegistrationFormValues } from "@/lib/validators/teacherRegistration";
import { cn } from "@/lib/cn";

const TEACHER_RULE_KEYS = ["rule1", "rule2", "rule3", "rule4"] as const;

export function TeacherStepReview() {
  const t = useTranslations("forms.teacherRegistration");
  const tRules = useTranslations("forms.teacherRules");
  const lookupLabel = useLocalizedOptionLookup();
  const {
    register,
    formState: { errors },
  } = useFormContext<TeacherRegistrationFormValues>();

  const values = useWatch();

  const reviewItems = useMemo(
    () => [
      { label: t("review.fullName"), value: values.fullName ?? "" },
      { label: t("review.fatherName"), value: values.fatherName ?? "" },
      { label: t("review.email"), value: values.email ?? "" },
      { label: t("review.phone"), value: values.phone ?? "" },
      {
        label: t("review.subjects"),
        value: (values.subjects ?? [])
          .map((subject: string) =>
            lookupLabel(TEACHER_SUBJECT_OPTIONS, subject)
          )
          .join(", "),
      },
      {
        label: t("review.experience"),
        value: values.teachingExperience ?? "",
      },
      {
        label: t("review.availableDays"),
        value: (values.availableDays ?? [])
          .map((day: string) => lookupLabel(WEEKDAY_OPTIONS, day))
          .join(", "),
      },
      {
        label: t("review.availableSlots"),
        value: (values.availableTimeSlots ?? [])
          .map((slot: string) => lookupLabel(CLASS_TIME_SLOTS, slot))
          .join(", "),
      },
      {
        label: t("review.languages"),
        value: (values.languages ?? [])
          .map((language: string) =>
            lookupLabel(TEACHER_LANGUAGE_OPTIONS, language)
          )
          .join(", "),
      },
      { label: t("review.salary"), value: values.expectedSalary ?? "" },
      {
        label: t("review.devices"),
        value: (values.teachingDevices ?? [])
          .map((device: string) => lookupLabel(TEACHING_DEVICE_OPTIONS, device))
          .join(", "),
      },
      {
        label: t("review.internet"),
        value: values.internetType
          ? lookupLabel(INTERNET_CONNECTION_TYPES, values.internetType)
          : "",
      },
      {
        label: t("review.referral"),
        value: lookupLabel(REFERRAL_SOURCES, values.referralSource ?? ""),
      },
      {
        label: t("review.tajweedExperience"),
        value: values.tajweedExperience ?? "",
      },
      {
        label: t("review.hifzExperience"),
        value: values.hifzExperience ?? "",
      },
      { label: t("review.motivation"), value: values.motivation ?? "" },
    ],
    [values, t, lookupLabel]
  );

  return (
    <div className="space-y-5">
      <p className="font-inter text-sm leading-relaxed text-text-gray">
        {t("review.intro")}
      </p>

      <FormReviewPanel items={reviewItems} />

      <section className="rounded-2xl border border-gray-100 bg-bg-light/50 p-5">
        <h3 className="mb-3 font-inter text-sm font-semibold text-primary-dark">
          {t("rulesHeading")}
        </h3>
        <ul className="list-disc space-y-2 pl-5 font-inter text-sm text-text-gray">
          {TEACHER_RULE_KEYS.map((key) => (
            <li key={key}>{tRules(key)}</li>
          ))}
        </ul>
      </section>

      <label
        className={cn("flex min-h-[44px] cursor-pointer items-start gap-3")}
      >
        <input
          type="checkbox"
          className="mt-1"
          {...register("rulesAccepted")}
        />
        <span className="font-inter text-sm leading-relaxed text-text-dark">
          {t("rulesAccept")}
        </span>
      </label>
      {errors.rulesAccepted && (
        <p className={formErrorClass}>{errors.rulesAccepted.message}</p>
      )}
    </div>
  );
}
