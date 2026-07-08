"use client";

import { motion } from "framer-motion";
import { BookOpen, Mic, Video } from "lucide-react";
import { GLOBAL_COUNTRIES } from "@/lib/constants";
import {
  GoogleMeetIcon,
  WhatsappIcon,
  ZoomIcon,
} from "@/components/shared/SocialBrandIcons";
import { HeroVisualFrame } from "@/components/home/HeroVisualFrame";
import { heroPanel, heroStatBox } from "@/lib/heroVisualStyles";
import { cn } from "@/lib/cn";

const FEATURED_COUNTRIES = GLOBAL_COUNTRIES.slice(0, 6);

const fadeIn = (delay: number) => ({
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, delay, ease: [0.22, 1, 0.36, 1] as const },
});

function ParticipantTile({
  initials,
  name,
  role,
  badge,
  accent,
}: {
  initials: string;
  name: string;
  role: string;
  badge?: string;
  accent: "teacher" | "student";
}) {
  return (
    <div
      className={cn(
        "relative flex flex-1 flex-col items-center rounded-xl border bg-white pb-3 pt-8 shadow-sm",
        accent === "teacher"
          ? "border-[var(--gold)]/40 ring-2 ring-[var(--gold)]/20"
          : "border-gray-200"
      )}
    >
      <div
        className={cn(
          "mb-2 flex h-14 w-14 items-center justify-center rounded-full text-sm font-bold text-white shadow-md",
          accent === "teacher"
            ? "bg-[linear-gradient(135deg,#32C991,#269B6F)]"
            : "bg-[linear-gradient(135deg,#0D9488,#269B6F)]"
        )}
      >
        {initials}
      </div>
      <p className="font-inter text-sm font-bold text-[#269B6F]">{name}</p>
      <p className="text-xs text-[#6B7280]">{role}</p>
      {badge && (
        <span className="mt-1.5 rounded-full bg-[var(--gold)]/15 px-2 py-0.5 text-[9px] font-bold uppercase text-[var(--gold)]">
          {badge}
        </span>
      )}
      {accent === "teacher" && (
        <span className="absolute left-2 top-2 flex items-center gap-1 rounded-full bg-emerald-500 px-1.5 py-0.5 text-[9px] font-bold text-white">
          <Mic className="h-2.5 w-2.5" aria-hidden="true" />
          On
        </span>
      )}
    </div>
  );
}

export function HeroVideoClassroomVisual() {
  return (
    <HeroVisualFrame accent="teal" label="Live 1-to-1 Video Classroom">
      <div className="p-5 sm:p-6">
        <motion.div
          {...fadeIn(0)}
          className="mb-3 flex items-center justify-between gap-2"
        >
          <div className="flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500" />
            </span>
            <span className="font-inter text-sm font-bold uppercase tracking-wide text-[#269B6F]">
              Live Session
            </span>
          </div>
          <span className="rounded-full bg-emerald-500 px-2.5 py-1 text-[10px] font-bold uppercase text-white">
            Live
          </span>
        </motion.div>

        <motion.div
          {...fadeIn(0.08)}
          className={heroPanel("mb-3 overflow-hidden p-0")}
        >
          <div className="flex items-center justify-between border-b border-gray-100 bg-[#E8FAF2] px-3 py-2">
            <span className="flex items-center gap-1.5 text-xs font-semibold text-[#269B6F]">
              <Video className="h-3.5 w-3.5" aria-hidden="true" />
              Tajweed Â· Sisters Class
            </span>
            <span className="text-xs font-bold text-[#6B7280]">42:18</span>
          </div>
          <div className="grid grid-cols-2 gap-2 p-3">
            <ParticipantTile
              initials="UF"
              name="Ust. Fatima"
              role="Certified Hafiz"
              badge="Teacher"
              accent="teacher"
            />
            <ParticipantTile
              initials="AK"
              name="Ayesha K."
              role="London, UK"
              accent="student"
            />
          </div>
        </motion.div>

        <motion.div {...fadeIn(0.16)} className={heroPanel("mb-3")}>
          <div className="mb-2 flex items-center gap-2">
            <BookOpen
              className="h-4 w-4 text-[var(--gold)]"
              aria-hidden="true"
            />
            <span className="text-xs font-bold text-[#269B6F]">
              Shared Lesson Â· Surah Al-Fatiha
            </span>
          </div>
          <div className="rounded-lg bg-[#E8FAF2] px-3 py-2">
            <p className="font-arabic text-right text-lg leading-relaxed text-[#269B6F]">
              Ø¨ÙØ³Ù’Ù…Ù Ø§Ù„Ù„ÙŽÙ‘Ù‡Ù Ø§Ù„Ø±ÙŽÙ‘Ø­Ù’Ù…ÙŽÙ°Ù†Ù
              Ø§Ù„Ø±ÙŽÙ‘Ø­ÙÙŠÙ…Ù
            </p>
          </div>
          <p className="mt-2 text-xs font-medium text-[var(--gold)]">
            Tajweed note: elongate Madd Â· 2 counts
          </p>
        </motion.div>

        <motion.div
          {...fadeIn(0.24)}
          className={cn(
            heroPanel("mb-3"),
            "flex items-center justify-between gap-2 py-3"
          )}
        >
          <div className="flex items-center gap-1">
            {FEATURED_COUNTRIES.map((country) => (
              <span key={country.name} className="text-lg" title={country.name}>
                {country.flag}
              </span>
            ))}
            <span className="ml-1 text-xs text-[#6B7280]">+4 more</span>
          </div>
          <div className="text-right">
            <p className="font-inter text-lg font-bold text-[#269B6F]">300+</p>
            <p className="text-[10px] text-[#6B7280]">Students</p>
          </div>
        </motion.div>

        <motion.div
          {...fadeIn(0.32)}
          className="flex items-center justify-between gap-2"
        >
          <p className="text-xs font-bold uppercase tracking-wide text-[#6B7280]">
            Join via
          </p>
          <div className="flex items-center gap-2">
            {[
              { Icon: ZoomIcon, label: "Zoom", color: "text-[#2D8CFF]" },
              { Icon: GoogleMeetIcon, label: "Meet", color: "text-[#00AC47]" },
              {
                Icon: WhatsappIcon,
                label: "WhatsApp",
                color: "text-[#25D366]",
              },
            ].map(({ Icon, label, color }) => (
              <span
                key={label}
                className={heroStatBox(
                  "flex h-10 w-10 items-center justify-center p-0"
                )}
                title={label}
              >
                <Icon className={cn("h-5 w-5", color)} aria-hidden="true" />
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </HeroVisualFrame>
  );
}
