"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Circle, GraduationCap, Radio } from "lucide-react";
import { HeroVisualFrame } from "@/components/home/HeroVisualFrame";
import { useHeroVisualLayout } from "@/components/home/HeroVisualLayoutContext";
import { defaultTeacherAvatarUrl } from "@/lib/avatarCatalog";
import {
  fetchLiveDashboard,
  getCachedLiveDashboard,
  type ILiveDashboard,
} from "@/lib/liveDashboard";
import { heroBadge, heroLiveBadge, heroPanel } from "@/lib/heroVisualStyles";
import { cn } from "@/lib/cn";

const REFRESH_MS = 60_000;

const contentFade = {
  initial: { opacity: 0, y: 6 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -4 },
  transition: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] as const },
};

function SessionSkeleton() {
  return (
    <div className={cn(heroPanel("p-3 sm:p-3.5"), "animate-pulse")}>
      <div className="h-4 w-2/3 rounded bg-gray-200" />
      <div className="mt-2 h-3 w-1/2 rounded bg-gray-100" />
      <div className="mt-3 flex justify-between border-t border-gray-100 pt-3">
        <div className="h-3 w-24 rounded bg-gray-100" />
        <div className="h-3 w-16 rounded bg-gray-100" />
      </div>
    </div>
  );
}

export function HeroLiveQueueVisual() {
  const isSection = useHeroVisualLayout() === "section";
  const cached = getCachedLiveDashboard();
  const [dashboard, setDashboard] = useState<ILiveDashboard | null>(cached);
  const [isLoading, setIsLoading] = useState(!cached);
  const hasLoadedOnce = useRef(Boolean(cached));

  const loadDashboard = useCallback(async () => {
    const data = await fetchLiveDashboard();
    setDashboard(data);
    setIsLoading(false);
    hasLoadedOnce.current = true;
  }, []);

  useEffect(() => {
    void loadDashboard();
    const timer = window.setInterval(() => {
      void loadDashboard();
    }, REFRESH_MS);
    return () => window.clearInterval(timer);
  }, [loadDashboard]);

  const sessions = dashboard?.sessions ?? [];
  const teachersOnline = dashboard?.teachersOnline ?? [];
  const activeTeacherDisplay = dashboard?.activeTeacherDisplay ?? "—";

  return (
    <HeroVisualFrame accent="teal" label="BDOQ Portal · Live Dashboard">
      <div
        className={cn(
          "p-3 sm:p-5 md:p-6",
          isSection && "sm:p-6 md:p-8 lg:p-10"
        )}
      >
        <div className="mb-3 flex items-center justify-between gap-2 sm:mb-4 sm:gap-3">
          <div className="flex min-w-0 items-center gap-2">
            <span className="relative flex h-2.5 w-2.5 shrink-0 sm:h-3 sm:w-3">
              <span className="absolute inline-flex h-full w-full animate-hero-live-pulse rounded-full bg-emerald-500" />
              <span className="relative inline-flex h-full w-full rounded-full bg-emerald-500" />
            </span>
            <span className="truncate font-inter text-xs font-bold uppercase tracking-wide text-[#32C991] sm:text-sm">
              Live Class Queue
            </span>
          </div>
          <span
            className={cn(heroBadge(), "shrink-0 text-[10px] sm:text-[11px]")}
          >
            Real-time
          </span>
        </div>

        <div
          className={cn(
            isSection &&
              "lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(280px,340px)] lg:items-start lg:gap-6 xl:gap-8"
          )}
        >
          <div className="relative min-h-[88px] space-y-2 sm:min-h-[96px] sm:space-y-2.5">
            <AnimatePresence mode="wait" initial={false}>
              {isLoading ? (
                <motion.div
                  key="loading"
                  {...contentFade}
                  className="space-y-2 sm:space-y-2.5"
                >
                  {Array.from({ length: 2 }).map((_, index) => (
                    <SessionSkeleton key={`skeleton-${index}`} />
                  ))}
                </motion.div>
              ) : sessions.length === 0 ? (
                <motion.div
                  key="empty"
                  {...contentFade}
                  className={cn(
                    heroPanel("p-4 text-center"),
                    "font-inter text-sm text-[#6B7280]"
                  )}
                >
                  No live classes scheduled right now. Check back soon.
                </motion.div>
              ) : (
                <motion.div
                  key="sessions"
                  {...contentFade}
                  className="space-y-2 sm:space-y-2.5"
                >
                  {sessions.map((session, index) => (
                    <motion.div
                      key={`${session.studentLabel}-${session.courseLabel}-${index}`}
                      initial={
                        hasLoadedOnce.current ? false : { opacity: 0, y: 8 }
                      }
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.4,
                        delay: hasLoadedOnce.current ? 0 : index * 0.06,
                        ease: [0.25, 0.1, 0.25, 1],
                      }}
                      className={cn(
                        heroPanel("p-3 sm:p-3.5"),
                        index === 2 && "hidden xl:block",
                        session.status === "live" &&
                          "ring-2 ring-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.15)]"
                      )}
                    >
                      <div className="flex items-start justify-between gap-2 sm:gap-3">
                        <div className="min-w-0 flex-1">
                          <p className="truncate font-inter text-sm font-bold text-[#32C991] sm:text-base">
                            {session.studentLabel}
                          </p>
                          <p className="truncate font-inter text-xs text-[#6B7280] sm:text-sm">
                            {session.courseLabel}
                          </p>
                        </div>
                        {session.status === "live" ? (
                          <span
                            className={heroLiveBadge(
                              "text-[9px] sm:text-[10px]"
                            )}
                          >
                            <Radio
                              className="h-2.5 w-2.5 sm:h-3 sm:w-3"
                              aria-hidden="true"
                            />
                            Live
                          </span>
                        ) : (
                          <span className="shrink-0 rounded-full bg-amber-100 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-amber-800 sm:px-2.5 sm:py-1 sm:text-[10px]">
                            Queued
                          </span>
                        )}
                      </div>
                      <div className="mt-2 flex items-center justify-between gap-2 border-t border-gray-100 pt-2 font-inter text-[10px] sm:mt-3 sm:pt-3 sm:text-xs">
                        <span className="flex min-w-0 items-center gap-1 font-semibold text-[#32C991]">
                          <GraduationCap
                            className="h-3.5 w-3.5 shrink-0 text-[var(--gold)] sm:h-4 sm:w-4"
                            aria-hidden="true"
                          />
                          <span className="truncate">
                            {session.teacherLabel}
                          </span>
                        </span>
                        <span className="shrink-0 font-bold text-[#6B7280]">
                          {session.timeLabel}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <motion.div
            initial={hasLoadedOnce.current ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.45,
              delay: 0.12,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className={cn(
              heroPanel("p-3 sm:p-3.5"),
              isSection ? "mt-2.5 sm:mt-3 lg:mt-0" : "mt-2.5 sm:mt-3"
            )}
          >
            <p className="mb-2 font-inter text-[10px] font-bold uppercase tracking-wide text-[#6B7280] sm:text-xs">
              Teachers Online
            </p>
            <div className="flex items-center justify-between gap-2 sm:gap-3">
              <div className="flex -space-x-1.5 sm:-space-x-2">
                {isLoading &&
                  Array.from({ length: 4 }).map((_, index) => (
                    <div
                      key={`teacher-skeleton-${index}`}
                      className="h-8 w-8 animate-pulse rounded-full border-2 border-white bg-gray-200 sm:h-10 sm:w-10"
                    />
                  ))}

                {!isLoading &&
                  teachersOnline.map((teacher) => (
                    <div
                      key={teacher.id}
                      className="relative h-8 w-8 overflow-hidden rounded-full border-2 border-white shadow-md sm:h-10 sm:w-10"
                      title={teacher.shortName}
                    >
                      <Image
                        src={
                          teacher.avatarUrl ??
                          defaultTeacherAvatarUrl(teacher.gender, 80)
                        }
                        alt={teacher.shortName}
                        fill
                        className="object-cover"
                        sizes="40px"
                        unoptimized
                      />
                      {teacher.isLive && (
                        <Circle
                          className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 fill-emerald-500 text-white sm:h-3 sm:w-3"
                          aria-hidden="true"
                        />
                      )}
                    </div>
                  ))}
              </div>
              <div className="shrink-0 text-right">
                <p className="font-inter text-lg font-bold text-[#32C991] sm:text-xl">
                  {isLoading ? "…" : activeTeacherDisplay}
                </p>
                <p className="font-inter text-[10px] text-[#6B7280]">
                  Active Teachers
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </HeroVisualFrame>
  );
}
