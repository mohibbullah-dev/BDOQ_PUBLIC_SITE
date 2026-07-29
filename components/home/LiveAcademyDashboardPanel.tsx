"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Activity,
  Circle,
  Clock3,
  GraduationCap,
  Users,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { defaultTeacherAvatarUrl } from "@/lib/avatarCatalog";
import { useLiveDashboardQuery } from "@/lib/hooks/useLiveDashboardQuery";
import type {
  ILiveDashboardSession,
  ILiveDashboardTeacher,
} from "@/lib/liveDashboard";
import { cn } from "@/lib/cn";

const SLIDES = ["queue", "teachers"] as const;
type SlideId = (typeof SLIDES)[number];

function syncLabel(
  updatedAt: string | null,
  t: ReturnType<typeof useTranslations>
): string {
  if (!updatedAt) return t("monitoring");
  const seconds = Math.max(
    0,
    Math.floor((Date.now() - new Date(updatedAt).getTime()) / 1000)
  );
  if (seconds < 5) return t("updatedJustNow");
  return t("updatedSeconds", { seconds });
}

function SessionRow({
  session,
  t,
}: {
  session: ILiveDashboardSession;
  t: ReturnType<typeof useTranslations>;
}) {
  const isLive = session.status === "live";

  return (
    <article className="flex items-start gap-3 border-b border-gray-100 py-3 last:border-b-0">
      <span
        className={cn(
          "mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
          isLive ? "bg-[#32C991]/12 text-[#269B6F]" : "bg-amber-50 text-amber-700"
        )}
      >
        {isLive ? (
          <Circle className="h-2.5 w-2.5 fill-current animate-pulse" />
        ) : (
          <Clock3 className="h-4 w-4" aria-hidden="true" />
        )}
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <p className="font-inter text-sm font-semibold text-[#1A1A2E]">
            {session.courseLabel}
          </p>
          <span
            className={cn(
              "rounded-full px-2 py-0.5 font-inter text-[10px] font-bold uppercase tracking-wide",
              isLive ? "bg-[#32C991]/10 text-[#269B6F]" : "bg-gray-100 text-gray-600"
            )}
          >
            {isLive ? t("live") : t("queued")}
          </span>
        </div>
        <p className="mt-1 font-inter text-xs text-gray-500">
          {session.studentLabel} · {session.teacherLabel} · {t("oneToOne")}
        </p>
      </div>
      <span className="shrink-0 font-inter text-[11px] font-medium text-gray-400">
        {session.timeLabel}
      </span>
    </article>
  );
}

function TeacherRow({ teacher }: { teacher: ILiveDashboardTeacher }) {
  const avatar =
    teacher.avatarUrl?.trim() ||
    defaultTeacherAvatarUrl(teacher.gender, 96);

  return (
    <article className="flex items-center gap-3 border-b border-gray-100 py-3 last:border-b-0">
      <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full bg-gray-100">
        <Image
          src={avatar}
          alt={teacher.shortName}
          fill
          className="object-cover"
          sizes="36px"
        />
        {teacher.isLive ? (
          <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full border border-white bg-[#32C991]" />
        ) : null}
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate font-inter text-sm font-medium text-[#1A1A2E]">
          Ust. {teacher.shortName}
        </p>
        <p className="font-inter text-[11px] text-gray-500">
          {teacher.isLive ? "In live session" : "Available online"}
        </p>
      </div>
      {teacher.isLive ? (
        <span className="rounded-full bg-[#32C991]/10 px-2 py-0.5 font-inter text-[10px] font-semibold uppercase tracking-wide text-[#269B6F]">
          Live
        </span>
      ) : null}
    </article>
  );
}

function StatTile({
  label,
  value,
  accent,
}: {
  label: string;
  value: number | string;
  accent?: "live" | "queue" | "online";
}) {
  const accentClass =
    accent === "live"
      ? "text-[#269B6F]"
      : accent === "queue"
        ? "text-amber-700"
        : accent === "online"
          ? "text-teal-700"
          : "text-primary-dark";

  return (
    <div className="rounded-xl border border-gray-100 bg-[#FAFCFB] px-3 py-3">
      <p className="font-inter text-[10px] font-semibold uppercase tracking-[0.12em] text-gray-400">
        {label}
      </p>
      <p className={cn("mt-1 font-inter text-2xl font-bold tabular-nums leading-none", accentClass)}>
        {value}
      </p>
    </div>
  );
}

export function LiveAcademyDashboardPanel() {
  const t = useTranslations("home.liveAcademy");
  const { data: dashboard } = useLiveDashboardQuery();
  const [slide, setSlide] = useState<SlideId>("queue");
  const [syncText, setSyncText] = useState(() => syncLabel(null, t));

  useEffect(() => {
    const tick = () => setSyncText(syncLabel(dashboard?.updatedAt ?? null, t));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [dashboard?.updatedAt, t]);

  const liveCount = useMemo(
    () => dashboard?.sessions.filter((s) => s.status === "live").length ?? 0,
    [dashboard?.sessions]
  );
  const queueCount = useMemo(
    () => dashboard?.sessions.filter((s) => s.status === "queued").length ?? 0,
    [dashboard?.sessions]
  );
  const onlineCount = dashboard?.teachersOnline.length ?? 0;
  const activeDisplay = dashboard?.activeTeacherDisplay ?? "—";

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200/90 bg-white shadow-[0_8px_30px_-12px_rgba(15,23,42,0.12)]">
      <div className="flex items-start justify-between gap-3 border-b border-gray-100 px-5 py-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#32C991] opacity-40" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#32C991]" />
            </span>
            <p className="font-inter text-[11px] font-bold uppercase tracking-[0.14em] text-gray-500">
              {t("panelLabel")}
            </p>
          </div>
          <p className="mt-1 font-inter text-xs text-gray-500">{t("syncLabel")}</p>
        </div>
        <div className="rounded-lg border border-gray-100 bg-[#FAFCFB] px-2.5 py-1.5 text-right">
          <p className="font-inter text-[10px] font-medium uppercase tracking-wide text-gray-400">
            {t("realtime")}
          </p>
          <p className="font-inter text-[11px] font-semibold text-[#269B6F]">{syncText}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 px-5 py-4">
        <StatTile label={t("liveNow")} value={liveCount} accent="live" />
        <StatTile label={t("inQueue")} value={queueCount} accent="queue" />
        <StatTile label={t("onlineNow")} value={onlineCount} accent="online" />
      </div>

      <div className="border-b border-gray-100 px-5">
        <div className="flex gap-6">
          {SLIDES.map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => setSlide(id)}
              className={cn(
                "border-b-2 pb-3 font-inter text-sm font-semibold transition-colors",
                slide === id
                  ? "border-[#32C991] text-[#269B6F]"
                  : "border-transparent text-gray-400 hover:text-gray-600"
              )}
            >
              {id === "queue" ? t("slideQueue") : t("slideTeachers")}
            </button>
          ))}
        </div>
      </div>

      <div className="min-h-[240px] flex-1 px-5 py-2">
        <AnimatePresence mode="wait">
          {slide === "queue" ? (
            <motion.div
              key="queue"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {dashboard?.sessions.length ? (
                dashboard.sessions.map((session, i) => (
                  <SessionRow
                    key={`${session.teacherLabel}-${i}`}
                    session={session}
                    t={t}
                  />
                ))
              ) : (
                <div className="flex min-h-[220px] flex-col items-center justify-center px-4 text-center">
                  <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-[#F0FBF6] text-[#32C991]">
                    <GraduationCap className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <p className="font-inter text-sm font-semibold text-[#1A1A2E]">
                    {t("emptySessions")}
                  </p>
                  <p className="mt-1 max-w-xs font-inter text-xs leading-relaxed text-gray-500">
                    {t("emptyHint")}
                  </p>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="teachers"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="mb-2 flex items-center justify-between rounded-xl border border-gray-100 bg-[#FAFCFB] px-3 py-2.5">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-[#32C991]" aria-hidden="true" />
                  <p className="font-inter text-xs font-medium text-gray-600">
                    {t("activeTeachers")}
                  </p>
                </div>
                <p className="font-inter text-sm font-bold tabular-nums text-[#269B6F]">
                  {activeDisplay}
                </p>
              </div>
              {dashboard?.teachersOnline.length ? (
                dashboard.teachersOnline.map((teacher) => (
                  <TeacherRow key={teacher.id} teacher={teacher} />
                ))
              ) : (
                <div className="flex min-h-[160px] flex-col items-center justify-center px-4 text-center">
                  <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-[#F0FBF6] text-[#32C991]">
                    <Activity className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <p className="font-inter text-sm font-semibold text-[#1A1A2E]">
                    {t("emptyTeachers")}
                  </p>
                  <p className="mt-1 max-w-xs font-inter text-xs leading-relaxed text-gray-500">
                    {t("emptyTeachersHint")}
                  </p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="border-t border-gray-100 bg-[#FAFCFB] px-5 py-2.5">
        <p className="text-center font-inter text-[10px] font-medium uppercase tracking-[0.14em] text-gray-400">
          {t("autoRefresh")}
        </p>
      </div>
    </div>
  );
}
