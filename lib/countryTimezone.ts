import { WORLD_COUNTRY_NAMES, resolveTimezoneFromCountryName } from "./worldCountries";

/** IANA timezone per country (all world countries). */
export const COUNTRY_TIMEZONE_MAP: Record<string, string> = Object.fromEntries(
  WORLD_COUNTRY_NAMES.map((name) => [name, resolveTimezoneFromCountryName(name)])
);

export const DEFAULT_COUNTRY = "Bangladesh";
export const DEFAULT_TIMEZONE = COUNTRY_TIMEZONE_MAP[DEFAULT_COUNTRY];

export const FREE_CLASS_COUNTRY_OPTIONS = WORLD_COUNTRY_NAMES.map((name) => ({
  value: name,
  label: name,
}));

export function resolveTimezoneFromCountry(country: string): string {
  const trimmed = country.trim();
  return COUNTRY_TIMEZONE_MAP[trimmed] ?? DEFAULT_TIMEZONE;
}
