"use client";

import { useTranslations } from "next-intl";
import { Controller, useFormContext } from "react-hook-form";
import { BilingualLabel } from "@/components/forms/shared/BilingualLabel";
import { MultiSelectChips } from "@/components/forms/shared/MultiSelectChips";
import { SingleSelectChips } from "@/components/forms/shared/SingleSelectChips";
import {
  formErrorClass,
  formInputClass,
} from "@/components/forms/shared/formStyles";
import {
  CLASS_TIME_SLOTS,
  REFERRAL_SOURCES,
  TEACHER_LANGUAGE_OPTIONS,
  TEACHER_SUBJECT_OPTIONS,
  WEEKDAY_OPTIONS,
} from "@/lib/formOptions";
import type { TeacherRegistrationFormValues } from "@/lib/validators/teacherRegistration";

export function TeacherStepTeaching() {
  const t = useTranslations("forms.teacherRegistration");
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<TeacherRegistrationFormValues>();

  return (
    <div className="space-y-5">
      <div>
        <BilingualLabel
          labelBn="কোন বিষয় পড়াতে চান?"
          labelEn="Subjects you can teach"
          required
        />
        <Controller
          name="subjects"
          control={control}
          render={({ field }) => (
            <MultiSelectChips
              value={field.value ?? []}
              onChange={field.onChange}
              error={errors.subjects?.message}
              options={TEACHER_SUBJECT_OPTIONS}
            />
          )}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <BilingualLabel
            htmlFor="teachingExperience"
            labelBn="শিক্ষকতা অভিজ্ঞতা"
            labelEn="Teaching experience"
            required
          />
          <input
            id="teachingExperience"
            className={formInputClass}
            placeholder={t("placeholders.experience")}
            {...register("teachingExperience")}
          />
          {errors.teachingExperience && (
            <p className={formErrorClass}>
              {errors.teachingExperience.message}
            </p>
          )}
        </div>
        <div>
          <BilingualLabel
            htmlFor="expectedSalary"
            labelBn="প্রত্যাশিত বেতন"
            labelEn="Expected salary"
            required
          />
          <input
            id="expectedSalary"
            className={formInputClass}
            placeholder={t("placeholders.salary")}
            {...register("expectedSalary")}
          />
          {errors.expectedSalary && (
            <p className={formErrorClass}>{errors.expectedSalary.message}</p>
          )}
        </div>
      </div>

      <div>
        <BilingualLabel
          labelBn="উপলব্ধ দিন"
          labelEn="Available days"
          required
        />
        <Controller
          name="availableDays"
          control={control}
          render={({ field }) => (
            <MultiSelectChips
              value={field.value ?? []}
              onChange={field.onChange}
              error={errors.availableDays?.message}
              options={WEEKDAY_OPTIONS}
            />
          )}
        />
      </div>

      <div>
        <BilingualLabel
          labelBn="উপলব্ধ সময়"
          labelEn="Available time slots"
          required
        />
        <Controller
          name="availableTimeSlots"
          control={control}
          render={({ field }) => (
            <MultiSelectChips
              value={field.value ?? []}
              onChange={field.onChange}
              error={errors.availableTimeSlots?.message}
              options={CLASS_TIME_SLOTS}
            />
          )}
        />
      </div>

      <div>
        <BilingualLabel
          labelBn="পড়ানোর ভাষা"
          labelEn="Preferred teaching languages"
          required
        />
        <Controller
          name="languages"
          control={control}
          render={({ field }) => (
            <MultiSelectChips
              value={field.value ?? []}
              onChange={field.onChange}
              error={errors.languages?.message}
              options={TEACHER_LANGUAGE_OPTIONS}
            />
          )}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <BilingualLabel
            htmlFor="tajweedExperience"
            labelBn="তাজবিদ অভিজ্ঞতা"
            labelEn="Tajweed experience"
            required
          />
          <input
            id="tajweedExperience"
            className={formInputClass}
            {...register("tajweedExperience")}
          />
          {errors.tajweedExperience && (
            <p className={formErrorClass}>{errors.tajweedExperience.message}</p>
          )}
        </div>
        <div>
          <BilingualLabel
            htmlFor="hifzExperience"
            labelBn="হিফজ অভিজ্ঞতা"
            labelEn="Hifz experience"
          />
          <input
            id="hifzExperience"
            className={formInputClass}
            {...register("hifzExperience")}
          />
        </div>
      </div>

      <div>
        <BilingualLabel
          labelBn="আমাদের সম্পর্কে কীভাবে জানলেন?"
          labelEn="How did you hear about us?"
          required
        />
        <Controller
          name="referralSource"
          control={control}
          render={({ field }) => (
            <SingleSelectChips
              columns={2}
              value={field.value ?? ""}
              onChange={field.onChange}
              error={errors.referralSource?.message}
              options={REFERRAL_SOURCES}
            />
          )}
        />
      </div>
    </div>
  );
}
