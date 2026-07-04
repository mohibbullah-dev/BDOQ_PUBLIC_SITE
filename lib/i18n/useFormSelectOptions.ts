"use client";

import { useMemo } from "react";
import { useTranslations } from "next-intl";
import {
  NATIONALITY_OPTIONS,
  PACKAGE_OPTIONS,
  PAYMENT_OPTIONS,
} from "@/lib/formOptions";

type PackageKey = "basic" | "standard" | "advance" | "premium";
type PaymentKey = "bkash" | "nagad" | "bank" | "paypal" | "cash";
type NationalityKey = (typeof NATIONALITY_OPTIONS)[number];

export function useNationalitySelectOptions(): {
  value: NationalityKey;
  label: string;
}[] {
  const t = useTranslations("forms.options.nationality");

  return useMemo(
    () =>
      NATIONALITY_OPTIONS.map((value) => ({
        value,
        label: t(value),
      })),
    [t]
  );
}

export function usePackageSelectOptions(): {
  value: PackageKey;
  label: string;
}[] {
  const t = useTranslations("forms.options.package");

  return useMemo(
    () =>
      PACKAGE_OPTIONS.map((option) => ({
        value: option.value as PackageKey,
        label: t(option.value as PackageKey),
      })),
    [t]
  );
}

export function usePaymentSelectOptions(): {
  value: PaymentKey;
  label: string;
}[] {
  const t = useTranslations("forms.options.payment");

  return useMemo(
    () =>
      PAYMENT_OPTIONS.map((option) => ({
        value: option.value as PaymentKey,
        label: t(option.value as PaymentKey),
      })),
    [t]
  );
}
