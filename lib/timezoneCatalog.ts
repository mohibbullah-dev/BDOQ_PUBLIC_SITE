import worldTimezones from "@/lib/data/worldTimezones.json";

export interface ITimezoneOption {
  value: string;
  label: string;
  iso: string;
  country: string;
  offsetMinutes: number;
}

export const TIMEZONE_OPTIONS: ITimezoneOption[] =
  worldTimezones as ITimezoneOption[];

/** Stored value for forms (IANA id). */
export function normalizeTimezoneValue(raw: string): string {
  const trimmed = raw.trim();
  if (!trimmed) return TIMEZONE_OPTIONS[0]?.value ?? "Asia/Dhaka";
  const byExact = TIMEZONE_OPTIONS.find((tz) => tz.value === trimmed);
  if (byExact) return byExact.value;
  const byLabel = TIMEZONE_OPTIONS.find((tz) => tz.label === trimmed);
  if (byLabel) return byLabel.value;
  const legacy = trimmed.match(/^([A-Za-z_]+\/[A-Za-z_]+)/)?.[1];
  if (legacy) {
    const match = TIMEZONE_OPTIONS.find((tz) => tz.value === legacy);
    if (match) return match.value;
  }
  return trimmed;
}

/** Display label for review screens / admin. */
export function formatTimezoneLabel(value: string): string {
  const match = TIMEZONE_OPTIONS.find((tz) => tz.value === value);
  return match?.label ?? value;
}

export const DEFAULT_TIMEZONE = "Asia/Dhaka";
