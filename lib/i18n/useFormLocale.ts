"use client";

import { useCallback } from "react";
import { useLocale } from "next-intl";
import type { LocaleType } from "@/i18n/routing";
import {
  pickBilingualLabel,
  pickStepTitle,
  type IBilingualOption,
  type IBilingualStep,
} from "@/lib/i18n/formLocale";

export function useFormLocale(): LocaleType {
  return useLocale() as LocaleType;
}

export function useOptionLabel(): (option: IBilingualOption) => string {
  const locale = useFormLocale();
  return (option) => pickBilingualLabel(option, locale);
}

export function useStepTitle(): (step: IBilingualStep) => string {
  const locale = useFormLocale();
  return (step) => pickStepTitle(step, locale);
}

export function useLocalizedOptionLookup<
  T extends { value: string; labelBn: string; labelEn: string },
>(): (options: readonly T[], value: string) => string {
  const labelFor = useOptionLabel();
  return useCallback(
    (options: readonly T[], value: string) => {
      const option = options.find((item) => item.value === value);
      return option ? labelFor(option) : value;
    },
    [labelFor]
  );
}
