"use client";

import { useMemo } from "react";
import { useTranslations } from "next-intl";
import { useFormContext, useWatch } from "react-hook-form";
import { FormReviewPanel } from "@/components/forms/wizard/FormReviewPanel";
import { formErrorClass } from "@/components/forms/shared/formStyles";
import { useLocalizedOptionLookup } from "@/lib/i18n/useFormLocale";
import {
  CLASS_TYPE_OPTIONS,
  DEVICE_MULTI_OPTIONS,
  INTERNET_CONNECTION_TYPES,
  REFERRAL_SOURCES,
  TEACHING_LANGUAGE_OPTIONS,
  TOPIC_INTEREST_OPTIONS,
  QURAN_READING_LEVELS,
} from "@/lib/formOptions";
import type { StudentAdmissionFormValues } from "@/lib/validators/studentAdmission";
import { cn } from "@/lib/cn";

export function StudentStepReview() {
  const t = useTranslations("forms.studentAdmission");
  const tGender = useTranslations("forms.options.gender");
  const tNat = useTranslations("forms.options.nationality");
  const tPkg = useTranslations("forms.options.package");
  const tPay = useTranslations("forms.options.payment");
  const lookupLabel = useLocalizedOptionLookup();
  const {
    register,
    formState: { errors },
  } = useFormContext<StudentAdmissionFormValues>();

  const values = useWatch();

  const genderOptions = useMemo(
    () => [
      {
        value: "male",
        labelBn: tGender("maleBoy"),
        labelEn: tGender("maleBoy"),
      },
      {
        value: "female",
        labelBn: tGender("femaleGirl"),
        labelEn: tGender("femaleGirl"),
      },
    ],
    [tGender]
  );

  const reviewItems = useMemo(() => {
    const topics = (values.topicsOfInterest ?? [])
      .map((topic: string) => lookupLabel(TOPIC_INTEREST_OPTIONS, topic))
      .join(", ");

    const nationality =
      values.nationality &&
      NATIONALITY_KEYS.includes(
        values.nationality as (typeof NATIONALITY_KEYS)[number]
      )
        ? tNat(values.nationality as (typeof NATIONALITY_KEYS)[number])
        : (values.nationality ?? "");

    return [
      { label: t("review.fullName"), value: values.fullName ?? "" },
      { label: t("review.dateOfBirth"), value: values.dateOfBirth ?? "" },
      { label: t("review.nationality"), value: nationality },
      {
        label: t("review.gender"),
        value: values.gender ? lookupLabel(genderOptions, values.gender) : "",
      },
      { label: t("review.email"), value: values.email ?? "" },
      { label: t("review.whatsapp"), value: values.whatsapp ?? "" },
      {
        label: t("review.currentAddress"),
        value: [
          values.currentAddressLine1,
          values.currentCity,
          values.currentDistrict,
          values.currentCountry,
        ]
          .filter(Boolean)
          .join(", "),
      },
      {
        label: t("review.permanentAddress"),
        value: [
          values.permanentAddressLine1,
          values.permanentCity,
          values.permanentDistrict,
          values.permanentCountry,
        ]
          .filter(Boolean)
          .join(", "),
      },
      {
        label: t("review.quranLevel"),
        value: lookupLabel(
          QURAN_READING_LEVELS,
          values.quranReadingLevel ?? ""
        ),
      },
      {
        label: t("review.teachingLanguage"),
        value: lookupLabel(
          TEACHING_LANGUAGE_OPTIONS,
          values.teachingLanguage ?? ""
        ),
      },
      { label: t("review.topics"), value: topics },
      {
        label: t("review.classType"),
        value: lookupLabel(CLASS_TYPE_OPTIONS, values.classType ?? ""),
      },
      {
        label: t("review.preferredTime"),
        value: `${values.preferredHour ?? ""}:${values.preferredMinute ?? ""} ${values.preferredPeriod ?? ""} (${values.timezone ?? ""})`,
      },
      {
        label: t("review.devices"),
        value: (values.devices ?? [])
          .map((device: string) => lookupLabel(DEVICE_MULTI_OPTIONS, device))
          .join(", "),
      },
      {
        label: t("review.internet"),
        value: values.internetType
          ? lookupLabel(INTERNET_CONNECTION_TYPES, values.internetType)
          : "",
      },
      {
        label: t("review.package"),
        value: values.packagePlan
          ? tPkg(
              values.packagePlan as "basic" | "standard" | "advance" | "premium"
            )
          : "",
      },
      {
        label: t("review.payment"),
        value: values.paymentMethod
          ? tPay(
              values.paymentMethod as
                | "bkash"
                | "nagad"
                | "bank"
                | "paypal"
                | "cash"
            )
          : "",
      },
      { label: t("review.parentName"), value: values.parentName ?? "" },
      {
        label: t("review.parentRelationship"),
        value: values.parentRelationship ?? "",
      },
      {
        label: t("review.referral"),
        value: (values.referralSources ?? [])
          .map((source: string) => lookupLabel(REFERRAL_SOURCES, source))
          .join(", "),
      },
      { label: t("review.goals"), value: values.goals ?? "" },
    ];
  }, [values, t, tNat, tPkg, tPay, genderOptions, lookupLabel]);

  return (
    <div className="space-y-5">
      <p className="font-inter text-sm leading-relaxed text-text-gray">
        {t("review.intro")}
      </p>

      <FormReviewPanel items={reviewItems} />

      <label
        className={cn("flex min-h-[44px] cursor-pointer items-start gap-3")}
      >
        <input
          type="checkbox"
          className="mt-1"
          {...register("termsAccepted")}
        />
        <span className="font-inter text-sm leading-relaxed text-text-dark">
          {t("terms")}
        </span>
      </label>
      {errors.termsAccepted && (
        <p className={formErrorClass}>{errors.termsAccepted.message}</p>
      )}
    </div>
  );
}

const NATIONALITY_KEYS = [
  "Bangladeshi",
  "Indian",
  "Pakistani",
  "Saudi",
  "Emirati",
  "British",
  "American",
  "Canadian",
  "Malaysian",
  "Other",
] as const;
