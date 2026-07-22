"use client";

import { useEffect, useState } from "react";
import { Clock, RefreshCw } from "lucide-react";
import { PRAYER_TIMES_API } from "@/lib/constants";

interface IPrayerTimings {
  Fajr: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
}

interface IAladhanResponse {
  data: {
    timings: IPrayerTimings;
  };
}

const PRAYER_LABELS: { key: keyof IPrayerTimings; label: string }[] = [
  { key: "Fajr", label: "Fajr" },
  { key: "Dhuhr", label: "Dhuhr" },
  { key: "Asr", label: "Asr" },
  { key: "Maghrib", label: "Maghrib" },
  { key: "Isha", label: "Isha" },
];

type PrayerWidgetState = "loading" | "success" | "error";

export function PrayerTimeWidget() {
  const [state, setState] = useState<PrayerWidgetState>("loading");
  const [timings, setTimings] = useState<IPrayerTimings | null>(null);

  const fetchTimings = async (): Promise<void> => {
    setState("loading");
    try {
      const response = await fetch(PRAYER_TIMES_API);

      if (!response.ok) {
        throw new Error("Failed to fetch prayer times");
      }

      const data = (await response.json()) as IAladhanResponse;
      setTimings(data.data.timings);
      setState("success");
    } catch {
      setState("error");
      setTimings(null);
    }
  };

  useEffect(() => {
    void fetchTimings();
  }, []);

  return (
    <div className="rounded-xl border border-gray-200 bg-white px-3 py-2.5 shadow-sm min-w-[180px]">
      <div className="flex items-center justify-between gap-2 mb-2">
        <div className="flex items-center gap-1.5">
          <Clock className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
          <span className="font-body text-xs font-semibold text-primary-dark">
            Dhaka Prayer
          </span>
        </div>
        {state === "error" && (
          <button
            type="button"
            onClick={() => void fetchTimings()}
            className="text-primary hover:text-primary-dark"
            aria-label="Retry loading prayer times"
          >
            <RefreshCw className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {state === "loading" && (
        <div className="space-y-1.5" aria-live="polite">
          {PRAYER_LABELS.map(({ label }) => (
            <div key={label} className="flex justify-between text-xs">
              <span className="text-text-gray">{label}</span>
              <span className="h-3 w-10 rounded bg-gray-100 animate-pulse" />
            </div>
          ))}
        </div>
      )}

      {state === "error" && (
        <p className="font-body text-xs text-red-600" aria-live="polite">
          Unable to load prayer times.
        </p>
      )}

      {state === "success" && timings && (
        <ul
          className="space-y-1"
          aria-label="Prayer times for Dhaka, Bangladesh"
        >
          {PRAYER_LABELS.map(({ key, label }) => (
            <li
              key={key}
              className="flex items-center justify-between font-body text-xs"
            >
              <span className="text-text-gray">{label}</span>
              <span className="font-medium text-primary-dark">
                {timings[key]}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
