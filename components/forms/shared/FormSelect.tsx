"use client";

import type { SelectHTMLAttributes } from "react";
import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import { useOptionLabel } from "@/lib/i18n/useFormLocale";
import {
  formErrorClass,
  formSelectChevronClass,
  formSelectClass,
  formSelectWrapperClass,
} from "@/components/forms/shared/formStyles";
import { cn } from "@/lib/cn";

export interface IFormSelectOption<T extends string = string> {
  value: T;
  labelBn: string;
  labelEn: string;
}

interface IFormSelectProps<T extends string>
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "onChange" | "value"> {
  options: readonly IFormSelectOption<T>[];
  value: T | "";
  onChange: (value: T) => void;
  error?: string;
  placeholder?: string;
}

export function FormSelect<T extends string>({
  options,
  value,
  onChange,
  error,
  placeholder,
  className,
  id,
  disabled,
  ...rest
}: IFormSelectProps<T>) {
  const tCommon = useTranslations("forms.common");
  const labelFor = useOptionLabel();
  const selectPlaceholder = placeholder ?? tCommon("selectPlaceholder");

  return (
    <div>
      <div className={formSelectWrapperClass}>
        <select
          id={id}
          value={value}
          disabled={disabled}
          aria-invalid={error ? true : undefined}
          onChange={(event) => onChange(event.target.value as T)}
          className={cn(formSelectClass, className)}
          {...rest}
        >
          <option value="">{selectPlaceholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {labelFor(option)}
            </option>
          ))}
        </select>
        <ChevronDown className={formSelectChevronClass} aria-hidden="true" />
      </div>
      {error ? <p className={formErrorClass}>{error}</p> : null}
    </div>
  );
}
