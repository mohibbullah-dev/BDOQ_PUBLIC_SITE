"use client";

import { useMemo } from "react";
import { useTranslations } from "next-intl";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import { BilingualLabel } from "@/components/forms/shared/BilingualLabel";
import { FormSelect } from "@/components/forms/shared/FormSelect";
import { FormReviewPanel } from "@/components/forms/wizard/FormReviewPanel";
import {
  formErrorClass,
  formInputClass,
} from "@/components/forms/shared/formStyles";
import { useLocalizedOptionLookup } from "@/lib/i18n/useFormLocale";
import { useFreeClassSubjects } from "@/components/forms/free-class/FreeClassSubjectsContext";
import type { FreeClassFormValues } from "@/lib/validators/freeClass";

export function FreeStepBooking() {
  const t = useTranslations("forms.freeClass");
  const tCommon = useTranslations("forms.common");
  const tGender = useTranslations("forms.options.gender");
  const tCourses = useTranslations("courses");
  const lookupLabel = useLocalizedOptionLookup();
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<FreeClassFormValues>();

  const subjects = useFreeClassSubjects();

  const values = useWatch({ control });

  const selectedSubjectLabel = useMemo(() => {
    const match = subjects.find((subject) => subject.value === values.subject);
    return match ? tCourses(match.value) : (values.subject ?? "");
  }, [subjects, values.subject, tCourses]);

  const genderOptions = useMemo(
    () => [
      { value: "male", labelBn: tGender("male"), labelEn: tGender("male") },
      {
        value: "female",
        labelBn: tGender("female"),
        labelEn: tGender("female"),
      },
      { value: "any", labelBn: tGender("any"), labelEn: tGender("any") },
    ],
    [tGender]
  );

  const minTrialDate = useMemo(() => new Date().toISOString().slice(0, 10), []);

  const reviewItems = useMemo(
    () => [
      { label: t("review.parentName"), value: values.parentName ?? "" },
      { label: t("review.studentName"), value: values.studentName ?? "" },
      { label: t("review.whatsapp"), value: values.whatsapp ?? "" },
      { label: t("review.age"), value: values.age ?? "" },
      {
        label: t("review.gender"),
        value: values.gender ? lookupLabel(genderOptions, values.gender) : "",
      },
      { label: t("review.country"), value: values.country ?? "" },
      { label: t("review.subject"), value: selectedSubjectLabel },
      {
        label: t("review.teacher"),
        value: values.teacherGender
          ? lookupLabel(genderOptions, values.teacherGender)
          : "",
      },
      {
        label: t("review.trialDate"),
        value: values.preferredTrialDate ?? "",
      },
      {
        label: t("review.trialTime"),
        value: values.preferredTrialTime ?? "",
      },
      {
        label: t("review.note"),
        value: values.additionalNote?.trim() || "—",
      },
    ],
    [values, t, genderOptions, lookupLabel, selectedSubjectLabel]
  );

  return (
    <div className="space-y-5">
      <div>
        <BilingualLabel
          htmlFor="subject"
          labelBn="কোন বিষয়ে ক্লাস চান?"
          labelEn="Subject for trial class"
          required
        />
        <select
          id="subject"
          className={formInputClass}
          {...register("subject")}
        >
          <option value="">{t("placeholders.subject")}</option>
          {subjects.map((subject) => (
            <option key={subject.value} value={subject.value}>
              {tCourses(subject.value)}
            </option>
          ))}
        </select>
        {errors.subject && (
          <p className={formErrorClass}>{errors.subject.message}</p>
        )}
      </div>

      <div>
        <BilingualLabel
          labelBn="শিক্ষক পছন্দ"
          labelEn="Teacher preference"
          required
        />
        <Controller
          name="teacherGender"
          control={control}
          render={({ field }) => (
            <FormSelect
              id="teacherGender"
              value={field.value ?? "any"}
              onChange={field.onChange}
              error={errors.teacherGender?.message}
              options={genderOptions}
            />
          )}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <BilingualLabel
            htmlFor="preferredTrialDate"
            labelBn="ট্রায়াল ক্লাসের তারিখ"
            labelEn="Preferred trial date"
            required
          />
          <input
            id="preferredTrialDate"
            type="date"
            min={minTrialDate}
            className={formInputClass}
            {...register("preferredTrialDate")}
          />
          {errors.preferredTrialDate && (
            <p className={formErrorClass}>{errors.preferredTrialDate.message}</p>
          )}
        </div>

        <div>
          <BilingualLabel
            htmlFor="preferredTrialTime"
            labelBn="ট্রায়াল ক্লাসের সময়"
            labelEn="Preferred trial time"
            required
          />
          <input
            id="preferredTrialTime"
            type="time"
            className={formInputClass}
            {...register("preferredTrialTime")}
          />
          {errors.preferredTrialTime && (
            <p className={formErrorClass}>{errors.preferredTrialTime.message}</p>
          )}
        </div>
      </div>

      <p className="font-body text-xs text-text-gray">{t("trialTimeHint")}</p>

      <div>
        <BilingualLabel
          htmlFor="additionalNote"
          labelBn="অতিরিক্ত নোট (ঐচ্ছিক)"
          labelEn="Additional note (optional)"
        />
        <textarea
          id="additionalNote"
          rows={3}
          className={formInputClass}
          placeholder={t("placeholders.additionalNote")}
          {...register("additionalNote")}
        />
      </div>

      <div>
        <p className="mb-3 font-body text-sm font-medium text-primary-dark">
          {tCommon("quickReview")}
        </p>
        <FormReviewPanel items={reviewItems} />
      </div>
    </div>
  );
}
