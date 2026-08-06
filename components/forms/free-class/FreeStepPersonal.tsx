"use client";

import { useTranslations } from "next-intl";
import { Controller, useFormContext } from "react-hook-form";
import { BilingualLabel } from "@/components/forms/shared/BilingualLabel";
import { PhoneInput } from "@/components/forms/shared/PhoneInput";
import { FormSelect } from "@/components/forms/shared/FormSelect";
import {
  formErrorClass,
  formInputClass,
} from "@/components/forms/shared/formStyles";
import { FREE_CLASS_AGE_OPTIONS } from "@/lib/formOptions";
import { FREE_CLASS_COUNTRY_OPTIONS, DEFAULT_COUNTRY } from "@/lib/countryTimezone";
import type { FreeClassFormValues } from "@/lib/validators/freeClass";

export function FreeStepPersonal() {
  const t = useTranslations("forms.freeClass");
  const tGender = useTranslations("forms.options.gender");
  const tAddress = useTranslations("forms.address");
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<FreeClassFormValues>();

  return (
    <div className="space-y-5">
      <p className="rounded-xl border border-primary/15 bg-bg-light/60 px-4 py-3 font-body text-sm leading-relaxed text-text-gray">
        {t("infoBanner")}
      </p>

      <div>
        <BilingualLabel
          htmlFor="parentName"
          labelBn="অভিভাবকের নাম"
          labelEn="Parent / Guardian Name"
          required
        />
        <input
          id="parentName"
          className={formInputClass}
          placeholder={t("placeholders.parentName")}
          {...register("parentName")}
        />
        {errors.parentName && (
          <p className={formErrorClass}>{errors.parentName.message}</p>
        )}
      </div>

      <div>
        <BilingualLabel
          htmlFor="studentName"
          labelBn="শিক্ষার্থীর নাম"
          labelEn="Student Name"
          required
        />
        <input
          id="studentName"
          className={formInputClass}
          placeholder={t("placeholders.studentName")}
          {...register("studentName")}
        />
        {errors.studentName && (
          <p className={formErrorClass}>{errors.studentName.message}</p>
        )}
      </div>

      <div>
        <BilingualLabel
          htmlFor="whatsapp"
          labelBn="WhatsApp নম্বর"
          labelEn="WhatsApp Number"
          required
        />
        <Controller
          name="whatsapp"
          control={control}
          render={({ field }) => (
            <PhoneInput
              id="whatsapp"
              value={field.value ?? ""}
              onChange={field.onChange}
              onBlur={field.onBlur}
              placeholder={t("placeholders.whatsapp")}
            />
          )}
        />
        {errors.whatsapp && (
          <p className={formErrorClass}>{errors.whatsapp.message}</p>
        )}
      </div>

      <div>
        <BilingualLabel labelBn="বয়স" labelEn="Age" required />
        <Controller
          name="age"
          control={control}
          render={({ field }) => (
            <FormSelect
              id="age"
              value={field.value ?? ""}
              onChange={field.onChange}
              placeholder={t("placeholders.age")}
              error={errors.age?.message}
              options={FREE_CLASS_AGE_OPTIONS.map((option) => ({
                value: option.value,
                labelBn: option.label,
                labelEn: option.label,
              }))}
            />
          )}
        />
      </div>

      <div>
        <BilingualLabel labelBn="লিঙ্গ" labelEn="Gender" required />
        <Controller
          name="gender"
          control={control}
          render={({ field }) => (
            <FormSelect
              id="gender"
              value={field.value ?? ""}
              onChange={field.onChange}
              error={errors.gender?.message}
              options={[
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
              ]}
            />
          )}
        />
      </div>

      <div>
        <BilingualLabel labelBn="দেশ" labelEn="Country" required />
        <Controller
          name="country"
          control={control}
          defaultValue={DEFAULT_COUNTRY}
          render={({ field }) => (
            <FormSelect
              id="country"
              value={field.value ?? DEFAULT_COUNTRY}
              onChange={field.onChange}
              placeholder={tAddress("selectCountry")}
              error={errors.country?.message}
              options={FREE_CLASS_COUNTRY_OPTIONS.map((option) => ({
                value: option.value,
                labelBn: option.label,
                labelEn: option.label,
              }))}
            />
          )}
        />
      </div>
    </div>
  );
}
