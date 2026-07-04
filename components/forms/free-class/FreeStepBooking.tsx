"use client";

import { useMemo } from "react";
import { useTranslations } from "next-intl";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import { BilingualLabel } from "@/components/forms/shared/BilingualLabel";
import { MultiSelectChips } from "@/components/forms/shared/MultiSelectChips";
import { SingleSelectChips } from "@/components/forms/shared/SingleSelectChips";
import { FormReviewPanel } from "@/components/forms/wizard/FormReviewPanel";
import {
  formErrorClass,
  formInputClass,
} from "@/components/forms/shared/formStyles";
import { useLocalizedOptionLookup } from "@/lib/i18n/useFormLocale";
import { CLASS_TIME_SLOTS, TIMEZONE_OPTIONS } from "@/lib/formOptions";
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

  const reviewItems = useMemo(
    () => [
      { label: t("review.name"), value: values.fullName ?? "" },
      { label: t("review.whatsapp"), value: values.whatsapp ?? "" },
      {
        label: t("review.gender"),
        value: values.gender ? lookupLabel(genderOptions, values.gender) : "",
      },
      { label: t("review.subject"), value: selectedSubjectLabel },
      {
        label: t("review.teacher"),
        value: values.teacherGender
          ? lookupLabel(genderOptions, values.teacherGender)
          : "",
      },
      {
        label: t("review.times"),
        value: (values.classTimeSlots ?? [])
          .map((slot) => lookupLabel(CLASS_TIME_SLOTS, slot))
          .join(", "),
      },
      { label: t("review.timezone"), value: values.timezone ?? "" },
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
            <SingleSelectChips
              columns={3}
              value={field.value ?? "any"}
              onChange={field.onChange}
              error={errors.teacherGender?.message}
              options={genderOptions}
            />
          )}
        />
      </div>

      <div>
        <BilingualLabel
          labelBn="কখন ক্লাস নিতে পারবেন?"
          labelEn="When can you take class?"
          required
        />
        <Controller
          name="classTimeSlots"
          control={control}
          render={({ field }) => (
            <MultiSelectChips
              options={CLASS_TIME_SLOTS}
              value={field.value ?? []}
              onChange={field.onChange}
              error={errors.classTimeSlots?.message}
            />
          )}
        />
      </div>

      <div>
        <BilingualLabel
          htmlFor="timezone"
          labelBn="টাইম জোন"
          labelEn="Your timezone"
          required
        />
        <select
          id="timezone"
          className={formInputClass}
          {...register("timezone")}
        >
          {TIMEZONE_OPTIONS.map((timezone) => (
            <option key={timezone} value={timezone}>
              {timezone}
            </option>
          ))}
        </select>
        {errors.timezone && (
          <p className={formErrorClass}>{errors.timezone.message}</p>
        )}
      </div>

      <div>
        <p className="mb-3 font-inter text-sm font-medium text-primary-dark">
          {tCommon("quickReview")}
        </p>
        <FormReviewPanel items={reviewItems} />
      </div>
    </div>
  );
}
