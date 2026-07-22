"use client";

import { useTranslations } from "next-intl";
import { Controller, useFormContext } from "react-hook-form";
import { BilingualLabel } from "@/components/forms/shared/BilingualLabel";
import { PhoneInput } from "@/components/forms/shared/PhoneInput";
import { SingleSelectChips } from "@/components/forms/shared/SingleSelectChips";
import {
  formErrorClass,
  formInputClass,
} from "@/components/forms/shared/formStyles";
import type { FreeClassFormValues } from "@/lib/validators/freeClass";

export function FreeStepPersonal() {
  const t = useTranslations("forms.freeClass");
  const tGender = useTranslations("forms.options.gender");
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
          htmlFor="fullName"
          labelBn="সম্পূর্ণ নাম"
          labelEn="Full Name"
          required
        />
        <input
          id="fullName"
          className={formInputClass}
          placeholder={t("placeholders.fullName")}
          {...register("fullName")}
        />
        {errors.fullName && (
          <p className={formErrorClass}>{errors.fullName.message}</p>
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
        <BilingualLabel labelBn="লিঙ্গ" labelEn="Gender" required />
        <Controller
          name="gender"
          control={control}
          render={({ field }) => (
            <SingleSelectChips
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
    </div>
  );
}
