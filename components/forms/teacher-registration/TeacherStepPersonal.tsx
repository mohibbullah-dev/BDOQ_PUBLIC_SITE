"use client";

import { useEffect, useMemo } from "react";
import { useTranslations } from "next-intl";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import { BilingualLabel } from "@/components/forms/shared/BilingualLabel";
import { AddressFields } from "@/components/forms/shared/AddressFields";
import { PhoneInput } from "@/components/forms/shared/PhoneInput";
import { SingleSelectChips } from "@/components/forms/shared/SingleSelectChips";
import {
  formErrorClass,
  formInputClass,
} from "@/components/forms/shared/formStyles";
import { MARITAL_STATUS_OPTIONS } from "@/lib/formOptions";
import type { TeacherRegistrationFormValues } from "@/lib/validators/teacherRegistration";
import { cn } from "@/lib/cn";

export function TeacherStepPersonal() {
  const tCommon = useTranslations("forms.common");
  const tGender = useTranslations("forms.options.gender");
  const {
    register,
    control,
    setValue,
    formState: { errors },
  } = useFormContext<TeacherRegistrationFormValues>();

  const genderOptions = useMemo(
    () => [
      { value: "male", labelBn: tGender("male"), labelEn: tGender("male") },
      {
        value: "female",
        labelBn: tGender("female"),
        labelEn: tGender("female"),
      },
    ],
    [tGender]
  );

  const sameAsCurrent = useWatch({ control, name: "sameAsCurrentAddress" });
  const currentValues = useWatch({
    control,
    name: [
      "currentAddressLine1",
      "currentAddressLine2",
      "currentCity",
      "currentDistrict",
      "currentPostalCode",
      "currentCountry",
    ],
  });

  useEffect(() => {
    if (!sameAsCurrent) return;
    const [line1, line2, city, district, postalCode, country] = currentValues;
    setValue("permanentAddressLine1", line1 ?? "", { shouldDirty: true });
    setValue("permanentAddressLine2", line2 ?? "", { shouldDirty: true });
    setValue("permanentCity", city ?? "", { shouldDirty: true });
    setValue("permanentDistrict", district ?? "", { shouldDirty: true });
    setValue("permanentPostalCode", postalCode ?? "", { shouldDirty: true });
    setValue("permanentCountry", country ?? "", { shouldDirty: true });
  }, [currentValues, sameAsCurrent, setValue]);

  return (
    <div className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-3">
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
            {...register("fullName")}
          />
          {errors.fullName && (
            <p className={formErrorClass}>{errors.fullName.message}</p>
          )}
        </div>
        <div>
          <BilingualLabel
            htmlFor="fatherName"
            labelBn="পিতার নাম"
            labelEn="Father's Name"
            required
          />
          <input
            id="fatherName"
            className={formInputClass}
            {...register("fatherName")}
          />
          {errors.fatherName && (
            <p className={formErrorClass}>{errors.fatherName.message}</p>
          )}
        </div>
        <div>
          <BilingualLabel htmlFor="surname" labelBn="উপনাম" labelEn="Surname" />
          <input
            id="surname"
            className={formInputClass}
            {...register("surname")}
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        <div>
          <BilingualLabel
            htmlFor="dateOfBirth"
            labelBn="জন্ম তারিখ"
            labelEn="Date of Birth"
            required
          />
          <input
            id="dateOfBirth"
            type="date"
            className={formInputClass}
            {...register("dateOfBirth")}
          />
          {errors.dateOfBirth && (
            <p className={formErrorClass}>{errors.dateOfBirth.message}</p>
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
                options={genderOptions}
              />
            )}
          />
        </div>
        <div>
          <BilingualLabel
            labelBn="বৈবাহিক অবস্থা"
            labelEn="Marital Status"
            required
          />
          <Controller
            name="maritalStatus"
            control={control}
            render={({ field }) => (
              <SingleSelectChips
                columns={2}
                value={field.value ?? ""}
                onChange={field.onChange}
                error={errors.maritalStatus?.message}
                options={MARITAL_STATUS_OPTIONS}
              />
            )}
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        <div>
          <BilingualLabel
            htmlFor="email"
            labelBn="ইমেইল"
            labelEn="Email"
            required
          />
          <input
            id="email"
            type="email"
            className={formInputClass}
            {...register("email")}
          />
          {errors.email && (
            <p className={formErrorClass}>{errors.email.message}</p>
          )}
        </div>
        <div>
          <BilingualLabel
            htmlFor="phone"
            labelBn="ফোন"
            labelEn="Phone"
            required
          />
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <PhoneInput
                id="phone"
                value={field.value ?? ""}
                onChange={field.onChange}
                onBlur={field.onBlur}
              />
            )}
          />
          {errors.phone && (
            <p className={formErrorClass}>{errors.phone.message}</p>
          )}
        </div>
        <div>
          <BilingualLabel
            htmlFor="whatsapp"
            labelBn="WhatsApp"
            labelEn="WhatsApp"
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
              />
            )}
          />
          {errors.whatsapp && (
            <p className={formErrorClass}>{errors.whatsapp.message}</p>
          )}
        </div>
      </div>

      <AddressFields<TeacherRegistrationFormValues>
        prefix="current"
        register={register}
        errors={errors}
        titleBn="বর্তমান ঠিকানা"
        titleEn="Current address"
      />

      <label
        className={cn(
          "flex min-h-[44px] cursor-pointer items-center gap-3 rounded-xl border border-gray-200 bg-bg-light/40 px-4 py-3"
        )}
      >
        <input type="checkbox" {...register("sameAsCurrentAddress")} />
        <span className="font-body text-sm text-text-dark">
          {tCommon("sameAddress")}
        </span>
      </label>

      <AddressFields<TeacherRegistrationFormValues>
        prefix="permanent"
        register={register}
        errors={errors}
        titleBn="স্থায়ী ঠিকানা"
        titleEn="Permanent address"
      />
    </div>
  );
}
