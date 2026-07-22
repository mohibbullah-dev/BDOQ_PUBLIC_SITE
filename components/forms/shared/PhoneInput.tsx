"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type InputHTMLAttributes,
} from "react";
import { forwardRef } from "react";
import { useTranslations } from "next-intl";
import { PHONE_DIAL_CODES } from "@/lib/formOptions";
import { cn } from "@/lib/cn";

interface ISplitPhoneNumber {
  dialCode: string;
  local: string;
}

export function splitPhoneNumber(
  full: string,
  defaultDialCode = "+880"
): ISplitPhoneNumber {
  const normalized = full.trim();
  if (!normalized) {
    return { dialCode: defaultDialCode, local: "" };
  }

  const sortedCodes = [...PHONE_DIAL_CODES].sort(
    (a, b) => b.dialCode.length - a.dialCode.length
  );

  for (const entry of sortedCodes) {
    if (normalized.startsWith(entry.dialCode)) {
      return {
        dialCode: entry.dialCode,
        local: normalized.slice(entry.dialCode.length),
      };
    }
  }

  if (normalized.startsWith("+")) {
    const match = normalized.match(/^(\+\d{1,4})(.*)$/);
    if (match) {
      return { dialCode: match[1], local: match[2] };
    }
  }

  return { dialCode: defaultDialCode, local: normalized };
}

export function combinePhoneNumber(dialCode: string, local: string): string {
  const digits = local.replace(/\D/g, "");
  return digits ? `${dialCode}${digits}` : "";
}

interface IPhoneInputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "value" | "onChange"
> {
  id: string;
  value?: string;
  onChange?: (value: string) => void;
  defaultDialCode?: string;
}

export const PhoneInput = forwardRef<HTMLInputElement, IPhoneInputProps>(
  function PhoneInput(
    {
      className,
      value = "",
      onChange,
      onBlur,
      defaultDialCode = "+880",
      id,
      ...props
    },
    ref
  ) {
    const t = useTranslations("forms.fileDropzone");
    const parsed = useMemo(
      () => splitPhoneNumber(value, defaultDialCode),
      [defaultDialCode, value]
    );
    const [dialCode, setDialCode] = useState(parsed.dialCode);
    const [localNumber, setLocalNumber] = useState(parsed.local);

    useEffect(() => {
      setDialCode(parsed.dialCode);
      setLocalNumber(parsed.local);
    }, [parsed.dialCode, parsed.local]);

    const emitChange = useCallback(
      (nextDialCode: string, nextLocal: string): void => {
        onChange?.(combinePhoneNumber(nextDialCode, nextLocal));
      },
      [onChange]
    );

    const handleDialCodeChange = (nextDialCode: string): void => {
      setDialCode(nextDialCode);
      emitChange(nextDialCode, localNumber);
    };

    const handleLocalChange = (nextLocal: string): void => {
      setLocalNumber(nextLocal);
      emitChange(dialCode, nextLocal);
    };

    const selectedDial =
      PHONE_DIAL_CODES.find((entry) => entry.dialCode === dialCode) ??
      PHONE_DIAL_CODES[0];

    return (
      <div className="flex rounded-xl border border-gray-200 overflow-hidden focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary">
        <div className="relative shrink-0 border-r border-gray-200 bg-bg-light">
          <label htmlFor={`${id}-dial-code`} className="sr-only">
            {t("countryCode")}
          </label>
          <select
            id={`${id}-dial-code`}
            value={dialCode}
            onChange={(event) => handleDialCodeChange(event.target.value)}
            className="h-full min-h-[44px] max-w-[118px] cursor-pointer appearance-none bg-transparent py-2.5 pl-3 pr-7 font-body text-sm text-text-dark focus:outline-none"
            aria-label={t("selectCountryCode")}
          >
            {PHONE_DIAL_CODES.map((entry) => (
              <option
                key={`${entry.iso}-${entry.dialCode}`}
                value={entry.dialCode}
              >
                {entry.flag} {entry.dialCode}
              </option>
            ))}
          </select>
          <span
            className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-text-gray"
            aria-hidden="true"
          >
            ▼
          </span>
          <span className="sr-only">{selectedDial?.country}</span>
        </div>
        <input
          ref={ref}
          id={id}
          type="tel"
          inputMode="tel"
          value={localNumber}
          onChange={(event) => handleLocalChange(event.target.value)}
          onBlur={onBlur}
          className={cn(
            "flex-1 min-h-[44px] border-0 px-4 py-2.5 font-body text-sm focus:outline-none focus:ring-0",
            className
          )}
          {...props}
        />
      </div>
    );
  }
);
