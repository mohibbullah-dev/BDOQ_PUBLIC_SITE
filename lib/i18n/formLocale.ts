import type { LocaleType } from "@/i18n/routing";

export interface IBilingualOption {
  labelBn: string;
  labelEn: string;
}

export interface IBilingualStep {
  titleBn: string;
  titleEn: string;
}

export function pickBilingualLabel(
  option: IBilingualOption,
  locale: LocaleType
): string {
  return locale === "bn" ? option.labelBn : option.labelEn;
}

export function pickStepTitle(
  step: IBilingualStep,
  locale: LocaleType
): string {
  return locale === "bn" ? step.titleBn : step.titleEn;
}
