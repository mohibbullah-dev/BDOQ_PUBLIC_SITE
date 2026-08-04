"use client";

import { useMemo } from "react";
import { useTranslations } from "next-intl";
import { SearchableListbox } from "@/components/forms/shared/SearchableListbox";
import { CountryFlagImg } from "@/components/forms/shared/CountryFlagImg";
import {
  TIMEZONE_OPTIONS,
  type ITimezoneOption,
} from "@/lib/timezoneCatalog";
import { formInputClass } from "@/components/forms/shared/formStyles";
import { cn } from "@/lib/cn";

interface ITimezonePickerProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  className?: string;
}

function renderTimezoneValue(option: ITimezoneOption | undefined) {
  if (!option) return null;
  return (
    <>
      <CountryFlagImg iso={option.iso} alt={option.country} size={18} />
      <span className="truncate">{option.label}</span>
    </>
  );
}

export function TimezonePicker({
  id,
  value,
  onChange,
  onBlur,
  error,
  className,
}: ITimezonePickerProps) {
  const t = useTranslations("forms.fileDropzone");

  const options = useMemo(
    () =>
      TIMEZONE_OPTIONS.map((tz) => ({
        value: tz.value,
        label: tz.label,
        searchText: `${tz.country} ${tz.iso}`,
        leading: (
          <CountryFlagImg iso={tz.iso} alt={tz.country} size={18} />
        ),
      })),
    []
  );

  return (
    <div className={cn("relative", className)}>
      <SearchableListbox
        id={id}
        value={value}
        onChange={(next) => {
          onChange(next);
          onBlur?.();
        }}
        options={options}
        placeholder={t("selectTimezone")}
        searchPlaceholder={t("searchTimezone")}
        ariaLabel={t("selectTimezone")}
        buttonClassName={formInputClass}
        dropdownMinWidth={360}
        renderValue={(option) =>
          option
            ? renderTimezoneValue(
                TIMEZONE_OPTIONS.find((tz) => tz.value === option.value)
              )
            : null
        }
      />
      {error ? <p className="mt-1.5 text-sm text-red-600">{error}</p> : null}
    </div>
  );
}
