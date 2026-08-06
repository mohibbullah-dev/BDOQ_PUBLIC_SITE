import worldDialCodes from "@/lib/data/worldDialCodes.json";
import worldTimezones from "@/lib/data/worldTimezones.json";

export interface IWorldCountryEntry {
  iso: string;
  name: string;
  dialCode: string;
  dialCodeDigits: string;
  primaryTimezone: string;
}

type IDialRow = { iso: string; country: string; dialCode: string };
type ITzRow = {
  iso: string;
  value: string;
  country: string;
  offsetMinutes: number;
};

function flagEmoji(iso: string): string {
  const upper = iso.toUpperCase();
  if (upper.length !== 2) return "🌍";
  return String.fromCodePoint(
    ...upper.split("").map((char) => 127397 + char.charCodeAt(0))
  );
}

const timezoneByIso = new Map<string, string>();
for (const tz of worldTimezones as ITzRow[]) {
  if (!timezoneByIso.has(tz.iso)) {
    timezoneByIso.set(tz.iso, tz.value);
  }
}

export const WORLD_COUNTRY_ENTRIES: IWorldCountryEntry[] = (
  worldDialCodes as IDialRow[]
).map((row) => ({
  iso: row.iso,
  name: row.country,
  dialCode: row.dialCode,
  dialCodeDigits: row.dialCode.replace(/\D/g, ""),
  primaryTimezone: timezoneByIso.get(row.iso) ?? "UTC",
}));

/** All world country names — Bangladesh first, then A–Z. */
export const WORLD_COUNTRY_NAMES: string[] = (() => {
  const unique = Array.from(
    new Set(WORLD_COUNTRY_ENTRIES.map((entry) => entry.name))
  ).sort((a, b) => a.localeCompare(b));
  return ["Bangladesh", ...unique.filter((name) => name !== "Bangladesh")];
})();

export const NAME_TO_ISO: Record<string, string> = Object.fromEntries(
  WORLD_COUNTRY_ENTRIES.map((entry) => [entry.name, entry.iso.toUpperCase()])
);
NAME_TO_ISO.UAE = "AE";
NAME_TO_ISO["United Arab Emirates"] = "AE";

export const COUNTRY_TIMEZONE_BY_NAME: Record<string, string> = Object.fromEntries(
  WORLD_COUNTRY_ENTRIES.map((entry) => [entry.name, entry.primaryTimezone])
);
COUNTRY_TIMEZONE_BY_NAME.UAE =
  COUNTRY_TIMEZONE_BY_NAME["United Arab Emirates"] ?? "Asia/Dubai";

export function resolveTimezoneFromCountryName(country: string): string {
  const trimmed = country.trim();
  return COUNTRY_TIMEZONE_BY_NAME[trimmed] ?? "Asia/Dhaka";
}

export function countryFlagFromName(country?: string): string {
  if (!country?.trim()) return "🌍";
  const iso = NAME_TO_ISO[country.trim()];
  return iso ? flagEmoji(iso) : "🌍";
}

export function resolveCountryIso(country?: string): string | undefined {
  if (!country?.trim()) return undefined;
  const trimmed = country.trim();
  if (NAME_TO_ISO[trimmed]) return NAME_TO_ISO[trimmed];
  if (trimmed.length === 2) return trimmed.toUpperCase();
  return undefined;
}
