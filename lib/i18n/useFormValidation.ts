"use client";

import { useMemo } from "react";
import { useTranslations } from "next-intl";
import type {
  FormValidationFn,
  FormValidationKey,
} from "@/lib/validators/freeClass";

export function useFormValidation(): FormValidationFn {
  const t = useTranslations("forms.validation");

  return useMemo(() => (key: FormValidationKey) => t(key), [t]);
}
