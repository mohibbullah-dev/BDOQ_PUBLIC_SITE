"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Circle,
  Clock3,
  GraduationCap,
  Link2,
  Radio,
  RefreshCw,
  ShieldCheck,
  Signal,
  Users,
  Wifi,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { WhatsappIcon } from "@/components/shared/SocialBrandIcons";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { defaultTeacherAvatarUrl } from "@/lib/avatarCatalog";
import {
  fetchLiveDashboard,
  getCachedLiveDashboard,
  type ILiveDashboard,
  type ILiveDashboardSession,
  type ILiveDashboardTeacher,
} from "@/lib/liveDashboard";
import { WHATSAPP_URL } from "@/lib/constants";
import { cn } from "@/lib/cn";

const ADMIN_IMAGE = "/images/live-academy-admin.jpg";
const REFRESH_MS = 60_000;
const SLIDE_MS = 8000;

type LiveSlideId = "queue" | "teachers";

const SLIDES: LiveSlideId[] = ["queue", "teachers"];

const fade = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const },
};

function initialsFromLabel(label: string): string {
  const parts = label.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0] ?? ""}${parts[1][0] ?? ""}`.toUpperCase();
}

function AvatarChip({
  label,
  tone,
}: {
  label: string;
  tone: "teacher" | "student";
}) {
  return (
    <div
      className={cn(
        "flex h-10 w-10 shrink-0 items-center justify-center rounded-[8px] font-inter text-xs font-bold text-white shadow-sm ring-2 ring-white",
        tone === "teacher" ? "bg-[var(--green-dark)]" : "bg-[var(--nav-hover)]"
      )}
      title={label}
    >
      {initialsFromLabel(label)}
    </div>
  );
}

function MetricPill({
  label,
  value,
  accent,
}: {
  label: string;
  value: string | number;
  accent: "live" | "queue" | "online";
}) {
  return (
    <div
      className={cn(
        "relative flex min-w-0 flex-1 flex-col overflow-hidden rounded-[8px] border px-3 py-2.5",
        accent === "live" && "border-emerald-200/90 bg-emerald-50/90",
        accent === "queue" && "border-amber-200/90 bg-amber-50/90",
        accent === "online" &&
          "border-[var(--green-primary)]/25 bg-[var(--green-light)]/80"
      )}
    >
      <span
        className={cn(
          "absolute inset-y-0 left-0 w-0.5",
          accent === "live" && "bg-emerald-500",
          accent === "queue" && "bg-amber-500",
          accent === "online" && "bg-[var(--green-primary)]"
        )}
        aria-hidden="true"
      />
      <p className="font-inter text-[10px] font-semibold uppercase tracking-wide text-[var(--text-gray)]">
        {label}
      </p>
      <p
        className={cn(
          "mt-0.5 font-inter text-xl font-bold leading-none tabular-nums",
          accent === "live" && "text-emerald-700",
          accent === "queue" && "text-amber-700",
          accent === "online" && "text-[var(--green-dark)]"
        )}
      >
        {value}
      </p>
    </div>
  );
}

function SessionCard({
  session,
  liveLabel,
  queuedLabel,
  teacherLabel,
  studentLabel,
  oneToOneLabel,
  index,
}: {
  session: ILiveDashboardSession;
  liveLabel: string;
  queuedLabel: string;
  teacherLabel: string;
  studentLabel: string;
  oneToOneLabel: string;
  index: number;
}) {
  const isLive = session.status === "live";

  return (
    <motion.article
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      className={cn(
        "group relative overflow-hidden rounded-[8px] border bg-white p-3.5 shadow-[0_8px_24px_-14px_rgba(15,23,42,0.25)] transition-shadow hover:shadow-[0_14px_32px_-16px_rgba(15,23,42,0.35)]",
        isLive
          ? "border-emerald-300/80 ring-1 ring-emerald-400/25"
          : "border-gray-200"
      )}
    >
      {isLive ? (
        <span
          className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-emerald-400 to-emerald-600"
          aria-hidden="true"
        />
      ) : null}

      <div className="mb-3 flex items-center justify-between gap-2">
        {isLive ? (
          <span className="inline-flex items-center gap-1.5 rounded-[8px] bg-emerald-500 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white shadow-[0_0_14px_rgba(16,185,129,0.35)]">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
              <span className="relative inline-flex h-full w-full rounded-full bg-white" />
            </span>
            {liveLabel}
          </span>
        ) : (
          <span className="inline-flex items-center rounded-[8px] bg-amber-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-amber-800">
            {queuedLabel}
          </span>
        )}
        <span className="inline-flex items-center gap-1 font-inter text-xs font-semibold text-[var(--text-gray)]">
          <Clock3 className="h-3.5 w-3.5" aria-hidden="true" />
          {session.timeLabel}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <AvatarChip label={session.teacherLabel} tone="teacher" />
            <div className="min-w-0">
              <p className="truncate font-inter text-sm font-bold text-[var(--green-dark)]">
                {session.teacherLabel}
              </p>
              <p className="font-inter text-[10px] text-[var(--text-gray)]">
                {teacherLabel}
              </p>
            </div>
          </div>
        </div>

        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[var(--green-primary)]/20 bg-[var(--green-light)] text-[var(--green-primary)]">
          <Link2 className="h-3.5 w-3.5" aria-hidden="true" />
        </span>

        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-end gap-2">
            <div className="min-w-0 text-right">
              <p className="truncate font-inter text-sm font-bold text-[var(--green-dark)]">
                {session.studentLabel}
              </p>
              <p className="font-inter text-[10px] text-[var(--text-gray)]">
                {studentLabel}
              </p>
            </div>
            <AvatarChip label={session.studentLabel} tone="student" />
          </div>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between gap-2 border-t border-gray-100 pt-2.5">
        <span className="inline-flex max-w-[70%] items-center gap-1 truncate rounded-[8px] border border-[var(--green-primary)]/20 bg-[var(--green-light)]/50 px-2.5 py-1 font-inter text-[11px] font-semibold text-[var(--green-dark)]">
          <GraduationCap className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          <span className="truncate">{session.courseLabel}</span>
        </span>
        <span className="inline-flex items-center rounded-[8px] bg-gray-100 px-2 py-1 font-inter text-[10px] font-bold uppercase tracking-wide text-[var(--text-gray)]">
          {oneToOneLabel}
        </span>
      </div>
    </motion.article>
  );
}

function EmptyQueueState({
  title,
  hint,
  monitoring,
  systemReady,
  autoRefresh,
  channelLive,
  channelQueue,
  channelStaff,
  liveCount,
  queuedCount,
  onlineCount,
}: {
  title: string;
  hint: string;
  monitoring: string;
  systemReady: string;
  autoRefresh: string;
  channelLive: string;
  channelQueue: string;
  channelStaff: string;
  liveCount: number;
  queuedCount: number;
  onlineCount: number;
}) {
  const channels = [
    {
      label: channelLive,
      value: liveCount,
      tone: "live" as const,
      icon: Radio,
    },
    {
      label: channelQueue,
      value: queuedCount,
      tone: "queue" as const,
      icon: Clock3,
    },
    {
      label: channelStaff,
      value: onlineCount,
      tone: "staff" as const,
      icon: Users,
    },
  ];

  return (
    <div className="relative flex h-full min-h-[280px] flex-col overflow-hidden rounded-[8px] border border-[var(--green-primary)]/20 bg-gradient-to-br from-[#F4FBF8] via-white to-[#F8FAFC]">
      <div
        className="pointer-events-none absolute inset-0 opacity-35"
        style={{
          backgroundImage: "var(--islamic-pattern-light)",
          backgroundSize: "48px 48px",
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-[var(--green-primary)]/10 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-12 -left-8 h-32 w-32 rounded-full bg-[#BD4440]/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative flex items-center justify-between gap-2 border-b border-[var(--green-primary)]/10 bg-white/55 px-3.5 py-2.5 backdrop-blur-sm">
        <span className="inline-flex items-center gap-1.5 font-inter text-[11px] font-semibold text-[var(--green-dark)]">
          <Signal
            className="h-3.5 w-3.5 text-[var(--green-primary)]"
            aria-hidden="true"
          />
          {monitoring}
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-[8px] border border-emerald-200/80 bg-emerald-50 px-2 py-1 font-inter text-[10px] font-bold uppercase tracking-wide text-emerald-700">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
            <span className="relative inline-flex h-full w-full rounded-full bg-emerald-500" />
          </span>
          {systemReady}
        </span>
      </div>

      <div className="relative flex flex-1 flex-col items-center justify-center px-5 py-6 text-center">
        <span className="mb-3 flex h-14 w-14 items-center justify-center rounded-[8px] bg-white text-[var(--green-primary)] shadow-[0_12px_28px_-12px_rgba(50,201,145,0.55)] ring-1 ring-[var(--green-primary)]/15">
          <Wifi className="h-6 w-6" aria-hidden="true" />
        </span>
        <p className="font-inter text-sm font-bold text-[var(--green-dark)]">
          {title}
        </p>
        <p className="mt-1.5 max-w-[300px] font-inter text-xs leading-relaxed text-[var(--text-gray)]">
          {hint}
        </p>
        <p className="mt-3 inline-flex items-center gap-1.5 font-inter text-[11px] font-medium text-[var(--text-gray)]">
          <RefreshCw className="h-3 w-3" aria-hidden="true" />
          {autoRefresh}
        </p>
      </div>

      <div className="relative grid grid-cols-3 gap-2 border-t border-[var(--green-primary)]/10 bg-white/60 p-3 backdrop-blur-sm">
        {channels.map((channel) => {
          const Icon = channel.icon;
          return (
            <div
              key={channel.label}
              className="rounded-[8px] border border-gray-100 bg-white px-2 py-2.5 text-center shadow-sm"
            >
              <Icon
                className={cn(
                  "mx-auto mb-1 h-3.5 w-3.5",
                  channel.tone === "live" && "text-emerald-600",
                  channel.tone === "queue" && "text-amber-600",
                  channel.tone === "staff" && "text-[var(--green-primary)]"
                )}
                aria-hidden="true"
              />
              <p className="font-inter text-sm font-bold tabular-nums text-[var(--green-dark)]">
                {channel.value}
              </p>
              <p className="mt-0.5 truncate font-inter text-[9px] font-semibold uppercase tracking-wide text-[var(--text-gray)]">
                {channel.label}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function TeachersSlide({
  teachers,
  activeDisplay,
  isLoading,
  activeLabel,
  onlineLabel,
  liveLabel,
  emptyTitle,
  emptyHint,
}: {
  teachers: ILiveDashboardTeacher[];
  activeDisplay: string;
  isLoading: boolean;
  activeLabel: string;
  onlineLabel: string;
  liveLabel: string;
  emptyTitle: string;
  emptyHint: string;
}) {
  return (
    <div className="space-y-4">
      <div className="relative overflow-hidden rounded-[8px] border border-[var(--green-primary)]/15 bg-gradient-to-br from-[var(--green-dark)] via-[#0E6B45] to-[#0B5D3B] px-4 py-5 text-white shadow-md">
        <div
          className="pointer-events-none absolute inset-0 opacity-15"
          style={{
            backgroundImage: "var(--islamic-pattern)",
            backgroundSize: "50px 50px",
          }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -right-6 top-0 h-28 w-28 rounded-full bg-white/10 blur-2xl"
          aria-hidden="true"
        />
        <div className="relative flex items-end justify-between gap-3">
          <div>
            <p className="font-inter text-[11px] font-semibold uppercase tracking-wider text-white/75">
              {activeLabel}
            </p>
            <p className="mt-1 font-inter text-4xl font-bold tracking-tight tabular-nums sm:text-5xl">
              {isLoading ? "…" : activeDisplay}
            </p>
          </div>
          <Users className="h-10 w-10 text-white/25" aria-hidden="true" />
        </div>
        <p className="relative mt-2 font-inter text-xs text-white/80">
          {onlineLabel}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
        {isLoading &&
          Array.from({ length: 6 }).map((_, index) => (
            <div
              key={`sk-${index}`}
              className="flex items-center gap-2.5 rounded-[8px] border border-gray-100 bg-white p-3"
            >
              <div className="h-11 w-11 animate-pulse rounded-[8px] bg-gray-200" />
              <div className="flex-1 space-y-2">
                <div className="h-3 w-2/3 animate-pulse rounded bg-gray-100" />
                <div className="h-2.5 w-1/3 animate-pulse rounded bg-gray-50" />
              </div>
            </div>
          ))}

        {!isLoading && teachers.length === 0 ? (
          <div className="col-span-full flex min-h-[160px] flex-col items-center justify-center rounded-[8px] border border-dashed border-[var(--green-primary)]/25 bg-[var(--green-light)]/30 px-4 py-8 text-center">
            <Users
              className="mb-2 h-7 w-7 text-[var(--green-primary)]/70"
              aria-hidden="true"
            />
            <p className="font-inter text-sm font-semibold text-[var(--green-dark)]">
              {emptyTitle}
            </p>
            <p className="mt-1 max-w-[260px] font-inter text-xs text-[var(--text-gray)]">
              {emptyHint}
            </p>
          </div>
        ) : null}

        {!isLoading &&
          teachers.map((teacher, index) => (
            <motion.div
              key={teacher.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.04 }}
              className="flex items-center gap-2.5 rounded-[8px] border border-gray-100 bg-white p-3 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-[8px] ring-1 ring-black/5">
                <Image
                  src={
                    teacher.avatarUrl ??
                    defaultTeacherAvatarUrl(teacher.gender, 88)
                  }
                  alt={teacher.shortName}
                  fill
                  className="object-cover"
                  sizes="44px"
                  unoptimized
                />
                {teacher.isLive ? (
                  <Circle
                    className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 fill-emerald-500 text-white drop-shadow"
                    aria-hidden="true"
                  />
                ) : null}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-inter text-sm font-semibold text-[var(--green-dark)]">
                  {teacher.shortName}
                </p>
                <p
                  className={cn(
                    "mt-0.5 font-inter text-[11px] font-medium",
                    teacher.isLive
                      ? "text-emerald-600"
                      : "text-[var(--text-gray)]"
                  )}
                >
                  {teacher.isLive ? liveLabel : onlineLabel}
                </p>
              </div>
            </motion.div>
          ))}
      </div>
    </div>
  );
}

function LiveTrackingPanel({
  dashboard,
  isLoading,
  lastUpdatedAt,
}: {
  dashboard: ILiveDashboard | null;
  isLoading: boolean;
  lastUpdatedAt: number | null;
}) {
  const t = useTranslations("home.liveAcademy");
  const [slideIndex, setSlideIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [secondsAgo, setSecondsAgo] = useState(0);

  const sessions = dashboard?.sessions ?? [];
  const teachers = dashboard?.teachersOnline ?? [];
  const activeDisplay = dashboard?.activeTeacherDisplay ?? "—";
  const slide = SLIDES[slideIndex] ?? "queue";

  const liveCount = useMemo(
    () => sessions.filter((session) => session.status === "live").length,
    [sessions]
  );
  const queuedCount = useMemo(
    () => sessions.filter((session) => session.status === "queued").length,
    [sessions]
  );

  const goTo = useCallback((index: number) => {
    setSlideIndex(((index % SLIDES.length) + SLIDES.length) % SLIDES.length);
  }, []);

  useEffect(() => {
    if (paused) return undefined;
    const timer = window.setInterval(() => {
      setSlideIndex((current) => (current + 1) % SLIDES.length);
    }, SLIDE_MS);
    return () => window.clearInterval(timer);
  }, [paused]);

  useEffect(() => {
    if (!lastUpdatedAt) return undefined;
    const tick = () => {
      setSecondsAgo(
        Math.max(0, Math.floor((Date.now() - lastUpdatedAt) / 1000))
      );
    };
    tick();
    const timer = window.setInterval(tick, 1000);
    return () => window.clearInterval(timer);
  }, [lastUpdatedAt]);

  const updatedLabel =
    lastUpdatedAt === null
      ? t("realtime")
      : secondsAgo < 3
        ? t("updatedJustNow")
        : t("updatedSeconds", { seconds: secondsAgo });

  return (
    <div
      className="relative flex h-full flex-col overflow-hidden rounded-[8px] border border-[var(--green-primary)]/15 bg-white shadow-[0_24px_56px_-22px_rgba(15,23,42,0.32)]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      role="region"
      aria-roledescription="carousel"
      aria-label={t("panelLabel")}
    >
      <div className="h-1.5 w-full bg-gradient-to-r from-[var(--green-primary)] via-[#269B6F] to-[var(--nav-hover)]" />

      <div className="flex items-center justify-between gap-2 border-b border-gray-100 bg-[#FAFCFA] px-4 py-3 sm:px-5">
        <div className="flex min-w-0 items-center gap-2">
          <span className="relative flex h-2.5 w-2.5 shrink-0">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
            <span className="relative inline-flex h-full w-full rounded-full bg-emerald-500" />
          </span>
          <div className="min-w-0">
            <p className="truncate font-inter text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--green-dark)]">
              {t("panelLabel")}
            </p>
            <p className="mt-0.5 truncate font-inter text-[10px] font-medium text-[var(--text-gray)]">
              {t("syncLabel")}
            </p>
          </div>
        </div>
        <span className="inline-flex shrink-0 items-center gap-1.5 rounded-[8px] border border-[var(--green-primary)]/20 bg-white px-2.5 py-1.5 font-inter text-[10px] font-bold uppercase tracking-wide text-[var(--green-dark)] shadow-sm">
          <RefreshCw
            className={cn("h-3 w-3", isLoading && "animate-spin")}
            aria-hidden="true"
          />
          {updatedLabel}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2 border-b border-gray-50 px-3 py-3 sm:px-4">
        <MetricPill
          label={t("liveNow")}
          value={isLoading ? "…" : liveCount}
          accent="live"
        />
        <MetricPill
          label={t("inQueue")}
          value={isLoading ? "…" : queuedCount}
          accent="queue"
        />
        <MetricPill
          label={t("onlineNow")}
          value={isLoading ? "…" : teachers.length}
          accent="online"
        />
      </div>

      <div className="flex items-center gap-2 border-b border-gray-50 px-3 py-2 sm:px-4">
        {SLIDES.map((id, index) => {
          const active = index === slideIndex;
          const Icon = id === "queue" ? Radio : Users;
          const label = id === "queue" ? t("slideQueue") : t("slideTeachers");

          return (
            <button
              key={id}
              type="button"
              onClick={() => goTo(index)}
              className={cn(
                "inline-flex flex-1 items-center justify-center gap-1.5 rounded-[8px] px-2.5 py-2.5 font-inter text-xs font-semibold transition-all",
                active
                  ? "bg-[#BD4440] text-white shadow-[0_8px_18px_-8px_rgba(189,68,64,0.7)]"
                  : "bg-gray-50 text-[var(--text-gray)] hover:bg-[var(--nav-hover-soft)] hover:text-[var(--nav-hover)]"
              )}
              aria-selected={active}
            >
              <Icon className="h-3.5 w-3.5" aria-hidden="true" />
              <span className="truncate">{label}</span>
            </button>
          );
        })}
      </div>

      <div className="relative min-h-[340px] flex-1 p-4 sm:min-h-[380px] sm:p-5">
        {slide === "queue" && !isLoading && sessions.length > 0 ? (
          <div className="mb-3 flex items-center justify-between gap-2">
            <p className="inline-flex items-center gap-1.5 font-inter text-[11px] font-bold uppercase tracking-wide text-[var(--green-dark)]">
              <ShieldCheck
                className="h-3.5 w-3.5 text-[var(--green-primary)]"
                aria-hidden="true"
              />
              {t("feedLabel")}
            </p>
            <p className="font-inter text-[11px] font-semibold tabular-nums text-[var(--text-gray)]">
              {sessions.length}
            </p>
          </div>
        ) : null}

        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={slide} {...fade} className="h-full">
            {slide === "queue" ? (
              <div className="space-y-2.5">
                {isLoading ? (
                  Array.from({ length: 3 }).map((_, index) => (
                    <div
                      key={`session-sk-${index}`}
                      className="animate-pulse rounded-[8px] border border-gray-100 bg-white p-3.5"
                    >
                      <div className="mb-3 flex justify-between">
                        <div className="h-5 w-16 rounded bg-gray-200" />
                        <div className="h-4 w-14 rounded bg-gray-100" />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="h-10 w-10 rounded-[8px] bg-gray-200" />
                        <div className="h-8 w-8 rounded-full bg-gray-100" />
                        <div className="h-10 w-10 rounded-[8px] bg-gray-200" />
                      </div>
                    </div>
                  ))
                ) : sessions.length === 0 ? (
                  <EmptyQueueState
                    title={t("emptySessions")}
                    hint={t("emptyHint")}
                    monitoring={t("monitoring")}
                    systemReady={t("systemReady")}
                    autoRefresh={t("autoRefresh")}
                    channelLive={t("channelLive")}
                    channelQueue={t("channelQueue")}
                    channelStaff={t("channelStaff")}
                    liveCount={liveCount}
                    queuedCount={queuedCount}
                    onlineCount={teachers.length}
                  />
                ) : (
                  sessions
                    .slice(0, 4)
                    .map((session, index) => (
                      <SessionCard
                        key={`${session.studentLabel}-${session.courseLabel}-${index}`}
                        session={session}
                        liveLabel={t("live")}
                        queuedLabel={t("queued")}
                        teacherLabel={t("teacher")}
                        studentLabel={t("student")}
                        oneToOneLabel={t("oneToOne")}
                        index={index}
                      />
                    ))
                )}
              </div>
            ) : (
              <TeachersSlide
                teachers={teachers}
                activeDisplay={activeDisplay}
                isLoading={isLoading}
                activeLabel={t("activeTeachers")}
                onlineLabel={t("onlineNow")}
                liveLabel={t("live")}
                emptyTitle={t("emptyTeachers")}
                emptyHint={t("emptyTeachersHint")}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-between border-t border-gray-100 bg-[#FAFCFA] px-3 py-2.5">
        <button
          type="button"
          onClick={() => goTo(slideIndex - 1)}
          aria-label="Previous"
          className="inline-flex h-8 w-8 items-center justify-center rounded-[8px] bg-[#BD4440] text-white shadow-sm transition hover:bg-[#a63c39]"
        >
          <ChevronLeft className="h-4 w-4" aria-hidden="true" />
        </button>

        <div className="flex items-center gap-1.5">
          {SLIDES.map((id, index) => (
            <button
              key={id}
              type="button"
              onClick={() => goTo(index)}
              aria-label={id}
              className={cn(
                "rounded-full transition-all",
                index === slideIndex
                  ? "h-2 w-5 bg-[#BD4440]"
                  : "h-2 w-2 bg-gray-300 hover:bg-gray-400"
              )}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => goTo(slideIndex + 1)}
          aria-label="Next"
          className="inline-flex h-8 w-8 items-center justify-center rounded-[8px] bg-[#BD4440] text-white shadow-sm transition hover:bg-[#a63c39]"
        >
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

export function LiveAcademySection() {
  const t = useTranslations("home.liveAcademy");
  const cached = getCachedLiveDashboard();
  const [dashboard, setDashboard] = useState<ILiveDashboard | null>(cached);
  const [isLoading, setIsLoading] = useState(!cached);
  const [lastUpdatedAt, setLastUpdatedAt] = useState<number | null>(
    cached ? Date.now() : null
  );

  const loadDashboard = useCallback(async () => {
    const data = await fetchLiveDashboard();
    setDashboard(data);
    setIsLoading(false);
    if (data) setLastUpdatedAt(Date.now());
  }, []);

  useEffect(() => {
    void loadDashboard();
    const timer = window.setInterval(() => {
      void loadDashboard();
    }, REFRESH_MS);
    return () => window.clearInterval(timer);
  }, [loadDashboard]);

  return (
    <section className="relative overflow-hidden bg-[#F7FBF8] py-16 md:py-24">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.28]"
        style={{
          backgroundImage: "var(--islamic-pattern-light)",
          backgroundSize: "60px 60px",
        }}
        aria-hidden="true"
      />

      <div className="site-container relative z-[1]">
        <ScrollReveal className="mb-10 max-w-3xl md:mb-12">
          <p className="font-inter text-xs font-semibold uppercase tracking-widest text-[var(--green-primary)]">
            {t("eyebrow")}
          </p>
          <h2 className="mt-3 font-playfair text-2xl font-bold text-[var(--green-dark)] md:text-3xl lg:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-4 font-inter text-base leading-relaxed text-[var(--text-gray)]">
            {t("subtitle")}
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/free-class"
              className={cn(
                "inline-flex items-center justify-center gap-2 rounded-[8px] px-6 py-3",
                "bg-[var(--green-dark)] font-inter text-sm font-semibold text-white",
                "transition-all duration-300 hover:bg-[#094A2F]"
              )}
            >
              {t("primaryCta")}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "inline-flex items-center justify-center gap-2 rounded-[8px] border-2 border-[var(--green-primary)]/25",
                "bg-white px-6 py-3 font-inter text-sm font-semibold text-[var(--green-dark)]",
                "transition-all duration-300 hover:border-[var(--green-primary)]/40 hover:bg-[var(--green-light)]"
              )}
            >
              <WhatsappIcon className="h-4 w-4 text-[#25D366]" />
              {t("secondaryCta")}
            </a>
          </div>
        </ScrollReveal>

        <div className="grid items-stretch gap-6 lg:grid-cols-2 lg:gap-8 xl:gap-10">
          <ScrollReveal direction="left" className="min-w-0">
            <div className="relative flex h-full min-h-[300px] items-center justify-center overflow-hidden rounded-[8px] border border-[var(--green-primary)]/12 bg-[var(--green-light)]/60 p-3 shadow-[0_16px_48px_-18px_rgba(11,93,59,0.28)] sm:min-h-[380px] sm:p-4 lg:min-h-full lg:p-5">
              <div className="relative h-full min-h-[260px] w-full overflow-hidden rounded-[8px] bg-white shadow-sm ring-1 ring-black/[0.04] sm:min-h-[340px]">
                <Image
                  src={ADMIN_IMAGE}
                  alt={t("adminImageAlt")}
                  fill
                  className="object-contain object-center"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={0.08} className="min-w-0">
            <LiveTrackingPanel
              dashboard={dashboard}
              isLoading={isLoading}
              lastUpdatedAt={lastUpdatedAt}
            />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
