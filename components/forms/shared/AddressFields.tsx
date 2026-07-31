"use client";

import { useEffect, useMemo, useRef } from "react";
import type { FieldErrors, UseFormRegister } from "react-hook-form";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import { useTranslations } from "next-intl";
import { ChevronDown } from "lucide-react";
import {
  formErrorClass,
  formInputClass,
  formSelectChevronClass,
  formSelectClass,
  formSelectWrapperClass,
} from "@/components/forms/shared/formStyles";
import { COUNTRY_OPTIONS } from "@/lib/formOptions";
import { pickBilingualLabel } from "@/lib/i18n/formLocale";
import { useFormLocale } from "@/lib/i18n/useFormLocale";
import {
  getAddressFieldLabels,
  getCitiesForDistrict,
  getCountryAddressProfile,
  getDistrictsForState,
  getPostalCodesForCity,
  getStatesForCountry,
} from "@/lib/location/addressLocations";

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

function LocationSelect({
  id,
  label,
  placeholder,
  value,
  onChange,
  options,
  error,
  disabled = false,
}: {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  error?: string;
  disabled?: boolean;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block font-body text-sm text-text-gray">
        {label}
      </label>
      <div className={formSelectWrapperClass}>
        <select
          id={id}
          className={formSelectClass}
          value={value}
          disabled={disabled}
          onChange={(event) => onChange(event.target.value)}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <ChevronDown className={formSelectChevronClass} aria-hidden="true" />
      </div>
      {error && <p className={formErrorClass}>{error}</p>}
    </div>
  );
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
  const { control, setValue } = useFormContext<T>();

  const line1 = fieldName(prefix, "AddressLine1");
  const line2 = fieldName(prefix, "AddressLine2");
  const stateField = fieldName(prefix, "State");
  const city = fieldName(prefix, "City");
  const district = fieldName(prefix, "District");
  const postalCode = fieldName(prefix, "PostalCode");
  const country = fieldName(prefix, "Country");

  const watchString = (name: string): string =>
    String(useWatch({ control, name: name as never }) ?? "");

  const countryValue = watchString(country);
  const stateValue = watchString(stateField);
  const districtValue = watchString(district);
  const cityValue = watchString(city);

  const profile = useMemo(
    () => (countryValue ? getCountryAddressProfile(countryValue) : null),
    [countryValue]
  );

  const labels = useMemo(
    () => getAddressFieldLabels(countryValue ?? ""),
    [countryValue]
  );

  const stateOptions = useMemo(
    () => getStatesForCountry(countryValue ?? "").map((s) => s.name),
    [countryValue]
  );

  const districtOptions = useMemo(
    () => getDistrictsForState(countryValue ?? "", stateValue ?? "").map((d) => d.name),
    [countryValue, stateValue]
  );

  const cityOptions = useMemo(
    () =>
      getCitiesForDistrict(countryValue ?? "", stateValue ?? "", districtValue ?? "").map(
        (c) => c.name
      ),
    [countryValue, stateValue, districtValue]
  );

  const postalOptions = useMemo(
    () =>
      getPostalCodesForCity(
        countryValue ?? "",
        stateValue ?? "",
        districtValue ?? "",
        cityValue ?? ""
      ),
    [countryValue, stateValue, districtValue, cityValue]
  );

  const prevCountryRef = useRef<string | undefined>();
  const prevStateRef = useRef<string | undefined>();
  const prevDistrictRef = useRef<string | undefined>();
  const prevCityRef = useRef<string | undefined>();

  useEffect(() => {
    if (
      prevCountryRef.current !== undefined &&
      prevCountryRef.current !== countryValue
    ) {
      setValue(stateField as never, "" as never, { shouldDirty: true });
      setValue(district as never, "" as never, { shouldDirty: true });
      setValue(city as never, "" as never, { shouldDirty: true });
      setValue(postalCode as never, "" as never, { shouldDirty: true });
    }
    prevCountryRef.current = countryValue;
  }, [countryValue, setValue, stateField, district, city, postalCode]);

  useEffect(() => {
    if (prevStateRef.current !== undefined && prevStateRef.current !== stateValue) {
      setValue(district as never, "" as never, { shouldDirty: true });
      setValue(city as never, "" as never, { shouldDirty: true });
      setValue(postalCode as never, "" as never, { shouldDirty: true });
    }
    prevStateRef.current = stateValue;
  }, [stateValue, setValue, district, city, postalCode]);

  useEffect(() => {
    if (
      prevDistrictRef.current !== undefined &&
      prevDistrictRef.current !== districtValue
    ) {
      setValue(city as never, "" as never, { shouldDirty: true });
      setValue(postalCode as never, "" as never, { shouldDirty: true });
    }
    prevDistrictRef.current = districtValue;
  }, [districtValue, setValue, city, postalCode]);

  useEffect(() => {
    if (prevCityRef.current !== undefined && prevCityRef.current !== cityValue) {
      setValue(postalCode as never, "" as never, { shouldDirty: true });
    }
    prevCityRef.current = cityValue;
  }, [cityValue, setValue, postalCode]);

  useEffect(() => {
    if (!cityValue || !profile || postalOptions.length !== 1) return;
    setValue(postalCode as never, postalOptions[0] as never, { shouldDirty: true });
  }, [cityValue, postalOptions, profile, setValue, postalCode]);

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

      <LocationSelect
        id={`${prefix}-country`}
        label={t("country")}
        placeholder={t("selectCountry")}
        value={countryValue ?? ""}
        onChange={(value) => setValue(country as never, value as never, { shouldValidate: true })}
        options={COUNTRY_OPTIONS}
        error={getError(country)}
      />

      {profile ? (
        <>
          <LocationSelect
            id={`${prefix}-state`}
            label={labels.state}
            placeholder={t("selectState")}
            value={stateValue ?? ""}
            onChange={(value) =>
              setValue(stateField as never, value as never, { shouldValidate: true })
            }
            options={stateOptions}
            error={getError(stateField)}
            disabled={!countryValue}
          />

          <LocationSelect
            id={`${prefix}-district`}
            label={labels.district}
            placeholder={t("selectDistrict")}
            value={districtValue ?? ""}
            onChange={(value) =>
              setValue(district as never, value as never, { shouldValidate: true })
            }
            options={districtOptions}
            error={getError(district)}
            disabled={!stateValue}
          />

          <div className="grid gap-4 sm:grid-cols-2">
            <LocationSelect
              id={`${prefix}-city`}
              label={labels.city}
              placeholder={t("selectCity")}
              value={cityValue ?? ""}
              onChange={(value) =>
                setValue(city as never, value as never, { shouldValidate: true })
              }
              options={cityOptions}
              error={getError(city)}
              disabled={!districtValue}
            />

            <Controller
              name={postalCode as never}
              control={control}
              render={({ field }) => (
                <LocationSelect
                  id={`${prefix}-postal`}
                  label={labels.postalCode}
                  placeholder={t("selectPostal")}
                  value={String(field.value ?? "")}
                  onChange={field.onChange}
                  options={postalOptions}
                  error={getError(postalCode)}
                  disabled={!cityValue || postalOptions.length === 0}
                />
              )}
            />
          </div>
        </>
      ) : (
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
    </div>
  );
}
