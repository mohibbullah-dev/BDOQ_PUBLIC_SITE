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
import {
  DEFAULT_DIAL_CODE,
  findDialCodeEntry,
  PHONE_DIAL_CODES,
} from "@/lib/phoneDialCodes";
import { CountryFlagImg } from "@/components/forms/shared/CountryFlagImg";
import { SearchableListbox } from "@/components/forms/shared/SearchableListbox";
import { cn } from "@/lib/cn";

interface ISplitPhoneNumber {
  dialCode: string;
  local: string;
}

export function splitPhoneNumber(
  full: string,
  defaultDialCode = DEFAULT_DIAL_CODE
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
      defaultDialCode = DEFAULT_DIAL_CODE,
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

    const dialOptions = useMemo(
      () =>
        PHONE_DIAL_CODES.map((entry) => ({
          value: entry.dialCode,
          label: `${entry.dialCode} ${entry.country}`,
          searchText: `${entry.iso} ${entry.country} ${entry.dialCode}`,
          leading: (
            <CountryFlagImg iso={entry.iso} alt={entry.country} size={18} />
          ),
        })),
      []
    );

    const selectedDial = findDialCodeEntry(dialCode) ?? PHONE_DIAL_CODES[0];

    return (
      <div className="flex rounded-xl border border-gray-200 overflow-visible focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary">
        <div className="relative z-[2] w-[132px] shrink-0 border-r border-gray-200 bg-bg-light sm:w-[148px]">
          <SearchableListbox
            id={`${id}-dial-code`}
            value={dialCode}
            onChange={handleDialCodeChange}
            options={dialOptions}
            ariaLabel={t("selectCountryCode")}
            searchPlaceholder={t("searchCountryCode")}
            buttonClassName="min-h-[44px] rounded-none border-0 bg-transparent px-2.5 py-2.5 shadow-none focus:ring-0"
            listClassName="min-w-[280px]"
            renderValue={() => (
              <>
                <CountryFlagImg
                  iso={selectedDial.iso}
                  alt={selectedDial.country}
                  size={18}
                />
                <span className="truncate font-semibold">{selectedDial.dialCode}</span>
              </>
            )}
          />
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
            "relative z-[1] flex-1 min-h-[44px] border-0 px-4 py-2.5 font-body text-sm focus:outline-none focus:ring-0",
            className
          )}
          {...props}
        />
      </div>
    );
  }
);
