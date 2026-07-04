"use client";

import { useTranslations } from "next-intl";
import { Controller, useFormContext } from "react-hook-form";
import { BilingualLabel } from "@/components/forms/shared/BilingualLabel";
import { MultiSelectChips } from "@/components/forms/shared/MultiSelectChips";
import { PhoneInput } from "@/components/forms/shared/PhoneInput";
import {
  formErrorClass,
  formInputClass,
  formTextareaClass,
} from "@/components/forms/shared/formStyles";
import { REFERRAL_SOURCES } from "@/lib/formOptions";
import type { StudentAdmissionFormValues } from "@/lib/validators/studentAdmission";

export function StudentStepGuardian() {
  const t = useTranslations("forms.studentAdmission");
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<StudentAdmissionFormValues>();

  return (
    <div className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <BilingualLabel
            htmlFor="parentName"
            labelBn="অভিভাবকের নাম"
            labelEn="Guardian name"
            required
          />
          <input
            id="parentName"
            className={formInputClass}
            {...register("parentName")}
          />
          {errors.parentName && (
            <p className={formErrorClass}>{errors.parentName.message}</p>
          )}
        </div>
        <div>
          <BilingualLabel
            htmlFor="parentRelationship"
            labelBn="সম্পর্ক"
            labelEn="Relationship"
            required
          />
          <input
            id="parentRelationship"
            className={formInputClass}
            placeholder={t("placeholders.relationship")}
            {...register("parentRelationship")}
          />
          {errors.parentRelationship && (
            <p className={formErrorClass}>
              {errors.parentRelationship.message}
            </p>
          )}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <BilingualLabel
            htmlFor="parentWhatsapp"
            labelBn="অভিভাবকের WhatsApp"
            labelEn="Guardian WhatsApp"
            required
          />
          <Controller
            name="parentWhatsapp"
            control={control}
            render={({ field }) => (
              <PhoneInput
                id="parentWhatsapp"
                value={field.value ?? ""}
                onChange={field.onChange}
                onBlur={field.onBlur}
              />
            )}
          />
          {errors.parentWhatsapp && (
            <p className={formErrorClass}>{errors.parentWhatsapp.message}</p>
          )}
        </div>
        <div>
          <BilingualLabel
            htmlFor="parentEmail"
            labelBn="অভিভাবকের ইমেইল"
            labelEn="Guardian email"
          />
          <input
            id="parentEmail"
            type="email"
            className={formInputClass}
            {...register("parentEmail")}
          />
          {errors.parentEmail && (
            <p className={formErrorClass}>{errors.parentEmail.message}</p>
          )}
        </div>
      </div>

      <div>
        <BilingualLabel
          labelBn="আমাদের সম্পর্কে কীভাবে জানলেন?"
          labelEn="How did you find BDOQ Academy?"
          required
        />
        <Controller
          name="referralSources"
          control={control}
          render={({ field }) => (
            <MultiSelectChips
              value={field.value ?? []}
              onChange={field.onChange}
              error={errors.referralSources?.message}
              options={REFERRAL_SOURCES}
            />
          )}
        />
      </div>

      <div>
        <BilingualLabel
          htmlFor="goals"
          labelBn="কেন এই কোর্স নিচ্ছেন?"
          labelEn="Tell us why you are taking this course"
          required
        />
        <textarea
          id="goals"
          rows={5}
          className={formTextareaClass}
          {...register("goals")}
        />
        {errors.goals && (
          <p className={formErrorClass}>{errors.goals.message}</p>
        )}
      </div>
    </div>
  );
}
