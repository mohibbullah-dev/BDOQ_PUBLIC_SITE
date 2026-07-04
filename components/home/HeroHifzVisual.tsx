"use client";

import { motion } from "framer-motion";
import { BookMarked, Sparkles, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { HeroVisualFrame } from "@/components/home/HeroVisualFrame";
import { API_BASE } from "@/lib/constants";
import { heroPanel } from "@/lib/heroVisualStyles";
import type { IProgressHighlight } from "@/lib/progressHighlights";

interface IProgressHighlightsResponse {
  success: boolean;
  data: {
    items: IProgressHighlight[];
    hasData: boolean;
  };
}

export function HeroHifzVisual() {
  const [items, setItems] = useState<IProgressHighlight[]>([]);
  const [hasData, setHasData] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load(): Promise<void> {
      try {
        const response = await fetch(`${API_BASE}/public/progress-highlights`);
        if (!response.ok) throw new Error("Failed to load progress highlights");
        const json = (await response.json()) as IProgressHighlightsResponse;
        if (cancelled) return;
        setItems(json.data?.items ?? []);
        setHasData(Boolean(json.data?.hasData));
      } catch {
        if (!cancelled) {
          setItems([]);
          setHasData(false);
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <HeroVisualFrame accent="gold" label="Hifz Progress Tracker">
      <div className="p-5 sm:p-6">
        <div className="mb-5 flex items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--gold)]/15 text-[var(--gold)]">
            <BookMarked className="h-6 w-6" aria-hidden="true" />
          </span>
          <div>
            <p className="font-playfair text-xl font-bold text-[#0D4A2F]">
              Your Hifz Journey
            </p>
            <p className="font-inter text-sm text-[#6B7280]">
              {hasData
                ? "Live progress from student records"
                : "Guided ayah by ayah"}
            </p>
          </div>
          <Sparkles
            className="ml-auto h-5 w-5 text-[var(--gold)]"
            aria-hidden="true"
          />
        </div>

        <div className="space-y-3">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className={`${heroPanel()} animate-pulse`}
              >
                <div className="mb-2 h-4 w-1/3 rounded bg-gray-200" />
                <div className="h-2 rounded-full bg-gray-100" />
              </div>
            ))
          ) : hasData ? (
            items.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 + index * 0.1, duration: 0.45 }}
                className={heroPanel()}
              >
                <div className="mb-2 flex items-center justify-between">
                  <span className="font-inter text-sm font-semibold text-[#0D4A2F]">
                    {item.label}
                  </span>
                  <span className="font-inter text-sm font-bold text-[var(--gold)]">
                    {item.percent}%
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-[#E8F5EE]">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-[#1B6B44] to-[var(--gold)]"
                    initial={{ width: 0 }}
                    animate={{ width: `${item.percent}%` }}
                    transition={{
                      delay: 0.3 + index * 0.12,
                      duration: 0.8,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  />
                </div>
              </motion.div>
            ))
          ) : (
            <p className="rounded-xl border border-dashed border-[#E5E7EB] px-4 py-3 text-center font-inter text-sm text-[#6B7280]">
              Student progress will appear here as classes are recorded in the
              portal.
            </p>
          )}
        </div>

        <div className="mt-4 flex items-center gap-3 rounded-2xl border border-[var(--gold)]/25 bg-[var(--gold)]/10 px-4 py-3">
          <Star
            className="h-5 w-5 shrink-0 text-[var(--gold)]"
            fill="currentColor"
            aria-hidden="true"
          />
          <p className="font-inter text-sm leading-relaxed text-[#0D4A2F]">
            A patient teacher beside you — until the Quran lives in your heart.
          </p>
        </div>
      </div>
    </HeroVisualFrame>
  );
}
