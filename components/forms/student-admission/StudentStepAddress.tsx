"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { useFormContext, useWatch } from "react-hook-form";
import { AddressFields } from "@/components/forms/shared/AddressFields";
import type { StudentAdmissionFormValues } from "@/lib/validators/studentAdmission";
import { cn } from "@/lib/cn";

export function StudentStepAddress() {
  const t = useTranslations("forms.common");
  const {
    register,
    setValue,
    control,
    formState: { errors },
  } = useFormContext<StudentAdmissionFormValues>();

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
    <div className="space-y-8">
      <AddressFields<StudentAdmissionFormValues>
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
          {t("sameAddress")}
        </span>
      </label>

      <AddressFields<StudentAdmissionFormValues>
        prefix="permanent"
        register={register}
        errors={errors}
        titleBn="স্থায়ী ঠিকানা"
        titleEn="Permanent address"
      />
    </div>
  );
}
