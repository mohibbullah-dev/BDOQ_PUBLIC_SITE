import { GLOBAL_COUNTRIES } from "@/lib/constants";

/** IANA timezone per academy country (used when parent selects country). */
export const COUNTRY_TIMEZONE_MAP: Record<string, string> = {
  Bangladesh: "Asia/Dhaka",
  Australia: "Australia/Sydney",
  "United Kingdom": "Europe/London",
  "United States": "America/New_York",
  Canada: "America/Toronto",
  "Saudi Arabia": "Asia/Riyadh",
  UAE: "Asia/Dubai",
  Qatar: "Asia/Qatar",
  Malaysia: "Asia/Kuala_Lumpur",
  Japan: "Asia/Tokyo",
  Germany: "Europe/Berlin",
  Pakistan: "Asia/Karachi",
  Indonesia: "Asia/Jakarta",
  Turkey: "Europe/Istanbul",
  Egypt: "Africa/Cairo",
  India: "Asia/Kolkata",
  Singapore: "Asia/Singapore",
  "New Zealand": "Pacific/Auckland",
  Mexico: "America/Mexico_City",
  France: "Europe/Paris",
};

export const DEFAULT_COUNTRY = "Bangladesh";
export const DEFAULT_TIMEZONE = COUNTRY_TIMEZONE_MAP[DEFAULT_COUNTRY];

export const FREE_CLASS_COUNTRY_OPTIONS = GLOBAL_COUNTRIES.map((country) => ({
  value: country.name,
  label: country.name,
}));

export function resolveTimezoneFromCountry(country: string): string {
  const trimmed = country.trim();
  return COUNTRY_TIMEZONE_MAP[trimmed] ?? DEFAULT_TIMEZONE;
}
