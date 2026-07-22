"use client";

import type { FieldErrors, UseFormRegister } from "react-hook-form";
import { useTranslations } from "next-intl";
import {
  formErrorClass,
  formInputClass,
} from "@/components/forms/shared/formStyles";
import { COUNTRY_OPTIONS } from "@/lib/formOptions";
import { pickBilingualLabel } from "@/lib/i18n/formLocale";
import { useFormLocale } from "@/lib/i18n/useFormLocale";

interface IAddressFieldsProps<T extends Record<string, unknown>> {
  prefix: string;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  titleBn?: string;
  titleEn?: string;
}

function fieldName(prefix: string, key: string): string {
  return prefix ? `${prefix}${key}` : key;
}

export function AddressFields<T extends Record<string, unknown>>({
  prefix,
  register,
  errors,
  titleBn,
  titleEn,
}: IAddressFieldsProps<T>) {
  const t = useTranslations("forms.address");
  const locale = useFormLocale();

  const line1 = fieldName(prefix, "AddressLine1");
  const line2 = fieldName(prefix, "AddressLine2");
  const city = fieldName(prefix, "City");
  const district = fieldName(prefix, "District");
  const postalCode = fieldName(prefix, "PostalCode");
  const country = fieldName(prefix, "Country");

  const getError = (key: string): string | undefined => {
    const error = errors[key as keyof typeof errors];
    if (error && typeof error === "object" && "message" in error) {
      return String(error.message);
    }
    return undefined;
  };

  const sectionTitle =
    titleBn && titleEn
      ? pickBilingualLabel({ labelBn: titleBn, labelEn: titleEn }, locale)
      : null;

  return (
    <div className="space-y-4">
      {sectionTitle && (
        <h3 className="font-body text-sm font-semibold text-primary-dark">
          {sectionTitle}
        </h3>
      )}

      <div>
        <input
          placeholder={t("line1")}
          className={formInputClass}
          {...register(line1 as never)}
        />
        {getError(line1) && <p className={formErrorClass}>{getError(line1)}</p>}
      </div>

      <input
        placeholder={t("line2")}
        className={formInputClass}
        {...register(line2 as never)}
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <input
            placeholder={t("city")}
            className={formInputClass}
            {...register(city as never)}
          />
          {getError(city) && <p className={formErrorClass}>{getError(city)}</p>}
        </div>
        <div>
          <input
            placeholder={t("district")}
            className={formInputClass}
            {...register(district as never)}
          />
          {getError(district) && (
            <p className={formErrorClass}>{getError(district)}</p>
          )}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <input
          placeholder={t("postCode")}
          className={formInputClass}
          {...register(postalCode as never)}
        />
        <div>
          <select
            className={formInputClass}
            aria-label={t("country")}
            {...register(country as never)}
          >
            {COUNTRY_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {getError(country) && (
            <p className={formErrorClass}>{getError(country)}</p>
          )}
        </div>
      </div>
    </div>
  );
}
