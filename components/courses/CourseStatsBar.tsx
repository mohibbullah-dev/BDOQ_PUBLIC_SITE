"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { API_BASE } from "@/lib/constants";
import { formatStatValue } from "@/lib/stats";

interface IApiStatsResponse {
  success: boolean;
  data: {
    yearsExperience: number;
    totalStudents: number;
    totalTeachingHours: number;
  };
}

export function CourseStatsBar() {
  const t = useTranslations("courseDetails.ui.stats");
  const [stats, setStats] = useState([
    { value: "—", label: t("hours") },
    { value: "—", label: t("years") },
    { value: "—", label: t("students") },
  ]);

  useEffect(() => {
    let cancelled = false;

    async function load(): Promise<void> {
      try {
        const response = await fetch(`${API_BASE}/public/stats`);
        if (!response.ok) throw new Error("Failed to load stats");
        const json = (await response.json()) as IApiStatsResponse;
        if (cancelled || !json.data) return;

        setStats([
          {
            value: formatStatValue(json.data.totalTeachingHours),
            label: t("hours"),
          },
          {
            value: formatStatValue(json.data.yearsExperience),
            label: t("years"),
          },
          {
            value: formatStatValue(json.data.totalStudents),
            label: t("students"),
          },
        ]);
      } catch {
        // keep placeholders
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, [t]);

  return (
    <section className="bg-primary text-white py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-3 gap-6 text-center">
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="font-inter text-2xl md:text-4xl font-bold mb-1">
                {stat.value}
              </p>
              <p className="font-inter text-sm text-white/80">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
