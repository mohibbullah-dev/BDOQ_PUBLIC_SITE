import { NAME_TO_ISO, resolveCountryIso } from "@/lib/worldCountries";

const ALIASES: Record<string, string> = {
  usa: "us",
  "u.s.a": "us",
  "u.s.": "us",
  "united states": "us",
  "united states of america": "us",
  uk: "gb",
  "u.k.": "gb",
  "united kingdom": "gb",
  britain: "gb",
  england: "gb",
  bangladesh: "bd",
  australia: "au",
  canada: "ca",
  "saudi arabia": "sa",
  uae: "ae",
  "united arab emirates": "ae",
  qatar: "qa",
  malaysia: "my",
  japan: "jp",
  germany: "de",
  pakistan: "pk",
  indonesia: "id",
  turkey: "tr",
  egypt: "eg",
  india: "in",
  singapore: "sg",
  "new zealand": "nz",
  mexico: "mx",
  france: "fr",
  kuwait: "kw",
  oman: "om",
  bahrain: "bh",
  ireland: "ie",
};

/** Resolve a country name or location string to an ISO flag code */
export function resolveCountryCode(input?: string): string | null {
  if (!input) return null;

  const normalized = input.trim().toLowerCase();
  const byAlias = ALIASES[normalized];
  if (byAlias) return byAlias;

  const directIso = resolveCountryIso(input);
  if (directIso) return directIso.toLowerCase();

  const fromMap = Object.entries(NAME_TO_ISO).find(
    ([name]) => name.toLowerCase() === normalized
  );
  if (fromMap) return fromMap[1].toLowerCase();

  const parts = normalized.split(/[,|/]/).map((part) => part.trim());
  for (const part of parts.reverse()) {
    if (ALIASES[part]) return ALIASES[part];
    const match = Object.entries(NAME_TO_ISO).find(
      ([name]) => name.toLowerCase() === part
    );
    if (match) return match[1].toLowerCase();
  }

  return null;
}

export { countryFlagFromName } from "@/lib/worldCountries";
