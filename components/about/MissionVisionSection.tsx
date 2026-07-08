"use client";

import { motion } from "framer-motion";
import { Eye, Target, type LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import {
  MISSION_POINT_ICONS,
  VISION_POINT_ICONS,
} from "@/lib/missionVisionIcons";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { cn } from "@/lib/cn";

const revealEase = [0.22, 1, 0.36, 1] as const;

interface IPointCardProps {
  point: string;
  index: number;
  Icon: LucideIcon;
  accent: "mission" | "vision";
}

function PointCard({ point, index, Icon, accent }: IPointCardProps) {
  const stepLabel = String(index + 1).padStart(2, "0");
  const isMission = accent === "mission";

  return (
    <motion.li
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.45, delay: index * 0.05, ease: revealEase }}
      className="group relative list-none"
    >
      <div
        className={cn(
          "relative flex h-full items-start gap-3 overflow-hidden rounded-xl border bg-white p-4",
          "transition-all duration-500 ease-out",
          "hover:-translate-y-0.5 hover:shadow-[0_16px_36px_-18px_rgba(50,201,145,0.28)]",
          isMission
            ? "border-[var(--green-primary)]/10 hover:border-[var(--green-primary)]/22"
            : "border-[var(--green-primary)]/12 hover:border-[var(--green-primary)]/25"
        )}
      >
        <span className="site-card-hover-overlay z-0" aria-hidden="true" />

        <span
          className={cn(
            "relative z-[2] flex h-11 w-11 shrink-0 items-center justify-center rounded-xl",
            "shadow-sm ring-1 transition-transform duration-500 group-hover:scale-105",
            isMission
              ? "bg-[var(--green-light)] text-[var(--green-primary)] ring-[var(--green-primary)]/15"
              : "bg-[#E8FAF2] text-[var(--green-dark)] ring-[var(--green-primary)]/20"
          )}
        >
          <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
        </span>

        <div className="relative z-[2] min-w-0 flex-1 pt-0.5">
          <p className="font-inter text-sm leading-relaxed text-[var(--text-gray)]">
            {point}
          </p>
          <span
            className="mt-2 block h-0.5 w-0 rounded-full bg-[var(--green-primary)] transition-all duration-500 group-hover:w-8"
            aria-hidden="true"
          />
        </div>

        <span
          className="pointer-events-none absolute bottom-2 right-3 font-playfair text-2xl font-bold text-[var(--green-primary)]/10"
          aria-hidden="true"
        >
          {stepLabel}
        </span>
      </div>
    </motion.li>
  );
}

interface IPillarPanelProps {
  variant: "mission" | "vision";
  title: string;
  subtitle: string;
  points: string[];
  icons: LucideIcon[];
  index: number;
}

function PillarPanel({
  variant,
  title,
  subtitle,
  points,
  icons,
  index,
}: IPillarPanelProps) {
  const isMission = variant === "mission";
  const HeaderIcon = isMission ? Target : Eye;

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, delay: index * 0.12, ease: revealEase }}
      className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-[var(--green-primary)]/12 bg-white shadow-[0_24px_56px_-28px_rgba(50,201,145,0.25)]"
    >
      <div
        className={cn(
          "relative z-[2] overflow-hidden px-6 pb-5 pt-6 md:px-7 md:pt-7",
          isMission
            ? "bg-gradient-to-br from-[var(--green-dark)] via-[#32C991] to-[var(--green-primary)]"
            : "bg-gradient-to-br from-[#0D9488] via-[#32C991] to-[var(--green-primary)]"
        )}
      >
        <div
          className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage: "var(--islamic-pattern-light)",
            backgroundSize: "48px 48px",
          }}
          aria-hidden="true"
        />

        <div className="relative flex items-start gap-4">
          <span
            className={cn(
              "flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl",
              "bg-white/15 text-white shadow-lg ring-1 ring-white/25 backdrop-blur-sm",
              "transition-transform duration-500 hover:scale-105"
            )}
          >
            <HeaderIcon
              className="h-7 w-7"
              strokeWidth={1.5}
              aria-hidden="true"
            />
          </span>
          <div className="min-w-0">
            <h2 className="font-playfair text-2xl font-bold text-white md:text-[1.65rem]">
              {title}
            </h2>
            <p className="mt-2 font-inter text-sm leading-relaxed text-white/85">
              {subtitle}
            </p>
          </div>
        </div>

        <div
          className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent"
          aria-hidden="true"
        />
      </div>

      <ul className="relative z-[2] grid flex-1 gap-3 p-5 sm:grid-cols-2 sm:gap-3.5 sm:p-6">
        {points.map((point, pointIndex) => (
          <PointCard
            key={point}
            point={point}
            index={pointIndex}
            Icon={icons[pointIndex] ?? HeaderIcon}
            accent={variant}
          />
        ))}
      </ul>
    </motion.article>
  );
}

export function MissionVisionSection() {
  const t = useTranslations("content.about");
  const missionPoints = t.raw("missionPoints") as string[];
  const visionPoints = t.raw("visionPoints") as string[];

  return (
    <section className="relative overflow-hidden bg-white py-16 md:py-24">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.28]"
        style={{
          backgroundImage: "var(--islamic-pattern-light)",
          backgroundSize: "60px 60px",
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -left-24 top-20 h-72 w-72 rounded-full bg-[var(--green-primary)]/[0.05] blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-16 bottom-10 h-64 w-64 rounded-full bg-[#0D9488]/[0.06] blur-3xl"
        aria-hidden="true"
      />

      <div className="site-container relative z-[1]">
        <ScrollReveal className="mx-auto mb-10 max-w-2xl text-center md:mb-12">
          <p className="font-inter text-xs font-semibold uppercase tracking-widest text-[var(--green-primary)]">
            {t("purposeEyebrow")}
          </p>
          <h2 className="mt-3 font-playfair text-2xl font-bold text-[var(--green-dark)] md:text-3xl lg:text-4xl">
            {t("purposeTitle")}
          </h2>
          <p className="mt-4 font-inter text-base leading-relaxed text-[var(--text-gray)]">
            {t("purposeSubtitle")}
          </p>
        </ScrollReveal>

        <div className="grid items-stretch gap-6 lg:grid-cols-2 lg:gap-8">
          <PillarPanel
            variant="mission"
            title={t("mission")}
            subtitle={t("missionSubtitle")}
            points={missionPoints}
            icons={MISSION_POINT_ICONS}
            index={0}
          />
          <PillarPanel
            variant="vision"
            title={t("vision")}
            subtitle={t("visionSubtitle")}
            points={visionPoints}
            icons={VISION_POINT_ICONS}
            index={1}
          />
        </div>
      </div>
    </section>
  );
}
