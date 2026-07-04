import type { Marker } from "@/components/ui/dotted-map";
import { GLOBAL_COUNTRIES } from "@/lib/constants";

const COUNTRY_COORDINATES: Record<string, { lat: number; lng: number }> = {
  bd: { lat: 23.0052, lng: 89.8261 },
  au: { lat: -33.8688, lng: 151.2093 },
  gb: { lat: 51.5074, lng: -0.1278 },
  us: { lat: 40.7128, lng: -74.006 },
  ca: { lat: 43.6532, lng: -79.3832 },
  sa: { lat: 24.7136, lng: 46.6753 },
  ae: { lat: 25.2048, lng: 55.2708 },
  qa: { lat: 25.2854, lng: 51.531 },
  my: { lat: 3.139, lng: 101.6869 },
  jp: { lat: 35.6762, lng: 139.6503 },
  de: { lat: 52.52, lng: 13.405 },
  pk: { lat: 33.6844, lng: 73.0479 },
  id: { lat: -6.2088, lng: 106.8456 },
  tr: { lat: 41.0082, lng: 28.9784 },
  eg: { lat: 30.0444, lng: 31.2357 },
  in: { lat: 28.6139, lng: 77.209 },
  sg: { lat: 1.3521, lng: 103.8198 },
  nz: { lat: -36.8485, lng: 174.7633 },
  mx: { lat: 19.4326, lng: -99.1332 },
  fr: { lat: 48.8566, lng: 2.3522 },
};

export interface IContactMapMarker extends Marker {
  code: string;
}

export const CONTACT_MAP_MARKERS: IContactMapMarker[] = GLOBAL_COUNTRIES.map(
  (country) => {
    const coords = COUNTRY_COORDINATES[country.code];
    const isHq = country.code === "bd";

    return {
      lat: coords?.lat ?? 0,
      lng: coords?.lng ?? 0,
      code: country.code,
      size: isHq ? 2.6 : 1.6,
      pulse: isHq,
    };
  }
).filter((marker) => marker.lat !== 0 || marker.lng !== 0);

export const GOOGLE_MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=Gopalganj%2C+Dhaka%2C+Bangladesh";

export const MAP_VIEWBOX = {
  width: 150,
  height: 75,
} as const;
