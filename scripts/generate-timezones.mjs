/**
 * Generates public-site/lib/data/worldTimezones.json (no network).
 * Run: node public-site/scripts/generate-timezones.mjs
 */
import { writeFileSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const dialCodes = JSON.parse(
  readFileSync(join(__dirname, "../lib/data/worldDialCodes.json"), "utf8")
);

const TZ_ISO_OVERRIDES = {
  "Asia/Dhaka": "bd",
  "Asia/Kolkata": "in",
  "Asia/Riyadh": "sa",
  "Asia/Dubai": "ae",
  "Asia/Kuala_Lumpur": "my",
  "Asia/Tokyo": "jp",
  "Europe/London": "gb",
  "America/New_York": "us",
  "America/Los_Angeles": "us",
  "America/Chicago": "us",
  "Australia/Sydney": "au",
  "Africa/Cairo": "eg",
  "Asia/Karachi": "pk",
  "Asia/Jakarta": "id",
  "Europe/Istanbul": "tr",
  "Asia/Singapore": "sg",
  "Pacific/Auckland": "nz",
};

function offsetMinutes(timeZone, date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    timeZoneName: "shortOffset",
  }).formatToParts(date);
  const raw = parts.find((p) => p.type === "timeZoneName")?.value ?? "GMT";
  const match = raw.match(/GMT([+-])(\d{1,2})(?::(\d{2}))?/);
  if (!match) return 0;
  const sign = match[1] === "-" ? -1 : 1;
  const hours = Number(match[2]);
  const mins = Number(match[3] ?? 0);
  return sign * (hours * 60 + mins);
}

function formatGmt(minutes) {
  const sign = minutes >= 0 ? "+" : "-";
  const abs = Math.abs(minutes);
  const h = Math.floor(abs / 60);
  const m = abs % 60;
  return m ? `GMT${sign}${h}:${String(m).padStart(2, "0")}` : `GMT${sign}${h}`;
}

function guessIso(timeZone) {
  if (TZ_ISO_OVERRIDES[timeZone]) return TZ_ISO_OVERRIDES[timeZone];
  const city = timeZone.split("/").pop()?.replace(/_/g, " ").toLowerCase() ?? "";
  const byCity = dialCodes.find(
    (d) =>
      d.country.toLowerCase() === city ||
      d.country.toLowerCase().includes(city) ||
      city.includes(d.country.toLowerCase())
  );
  if (byCity) return byCity.iso;
  const region = timeZone.split("/")[0];
  const regionDefaults = {
    America: "us",
    Europe: "de",
    Asia: "cn",
    Africa: "za",
    Australia: "au",
    Pacific: "au",
    Atlantic: "pt",
    Indian: "in",
    Antarctica: "aq",
  };
  return regionDefaults[region] ?? "un";
}

const zones = Intl.supportedValuesOf("timeZone");
const entries = zones
  .map((name) => {
    const offset = offsetMinutes(name);
    const iso = guessIso(name);
    const country =
      dialCodes.find((d) => d.iso === iso)?.country ??
      iso.toUpperCase();
    return {
      value: name,
      label: `${name.replace(/_/g, " ")} (${formatGmt(offset)})`,
      iso,
      country,
      offsetMinutes: offset,
    };
  })
  .sort(
    (a, b) =>
      a.offsetMinutes - b.offsetMinutes || a.value.localeCompare(b.value)
  );

const out = join(__dirname, "../lib/data/worldTimezones.json");
writeFileSync(out, JSON.stringify(entries, null, 2));
console.log(`Wrote ${entries.length} timezones → ${out}`);
