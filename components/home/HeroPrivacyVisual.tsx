"use client";

import { motion } from "framer-motion";
import { Baby, Lock, ShieldCheck, UserRound, UsersRound } from "lucide-react";
import { HeroVisualFrame } from "@/components/home/HeroVisualFrame";
import { heroBadge, heroPanel, heroStatBox } from "@/lib/heroVisualStyles";
import { cn } from "@/lib/cn";

const fadeIn = (delay: number) => ({
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, delay, ease: [0.22, 1, 0.36, 1] as const },
});

interface IClassPathCardProps {
  title: string;
  subtitle: string;
  teacher: string;
  course: string;
  accent: "brothers" | "sisters";
  delay: number;
}

function ClassPathCard({
  title,
  subtitle,
  teacher,
  course,
  accent,
  delay,
}: IClassPathCardProps) {
  return (
    <motion.div
      {...fadeIn(delay)}
      className={cn(
        heroPanel("flex flex-1 flex-col p-3"),
        accent === "brothers"
          ? "border-l-4 border-l-[#1B6B44]"
          : "border-l-4 border-l-[var(--gold)]"
      )}
    >
      <div className="mb-2 flex items-center justify-between">
        <span
          className={cn(
            "flex h-9 w-9 items-center justify-center rounded-xl",
            accent === "brothers"
              ? "bg-[#F0FBF6] text-[#1B6B44]"
              : "bg-[var(--gold)]/10 text-[var(--gold)]"
          )}
        >
          {accent === "brothers" ? (
            <UserRound className="h-4 w-4" aria-hidden="true" />
          ) : (
            <UsersRound className="h-4 w-4" aria-hidden="true" />
          )}
        </span>
        <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[9px] font-bold uppercase text-emerald-700">
          Private
        </span>
      </div>
      <p className="font-inter text-sm font-bold text-[#0D4A2F]">{title}</p>
      <p className="mb-2 text-xs text-[#6B7280]">{subtitle}</p>
      <div className="mt-auto space-y-1 border-t border-gray-100 pt-2">
        <p className="text-[10px] text-[#6B7280]">{teacher}</p>
        <p className="text-xs font-semibold text-[#1B6B44]">{course}</p>
      </div>
    </motion.div>
  );
}

export function HeroPrivacyVisual() {
  return (
    <HeroVisualFrame accent="green" label="Privacy-First Learning">
      <div className="p-5 sm:p-6">
        <motion.div
          {...fadeIn(0)}
          className="mb-4 flex items-center justify-between gap-2"
        >
          <span className="flex items-center gap-2 font-inter text-sm font-bold uppercase tracking-wide text-[#0D4A2F]">
            <ShieldCheck
              className="h-5 w-5 text-[var(--gold)]"
              aria-hidden="true"
            />
            Safe & Separate
          </span>
          <span className={heroBadge()}>Privacy First</span>
        </motion.div>

        <div className="mb-3 flex gap-2">
          <ClassPathCard
            title="Brothers"
            subtitle="Male students only"
            teacher="Male Hafiz teachers"
            course="Tajweed · Hifz"
            accent="brothers"
            delay={0.08}
          />
          <ClassPathCard
            title="Sisters"
            subtitle="Female students only"
            teacher="Certified female teachers"
            course="Tajweed · Noorani"
            accent="sisters"
            delay={0.14}
          />
        </div>

        <motion.div {...fadeIn(0.2)} className={heroPanel("mb-3")}>
          <div className="flex items-start gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#F0FBF6] text-[#0D9488]">
              <Baby className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <p className="font-inter text-sm font-bold text-[#0D4A2F]">
                Children&apos;s Classes
              </p>
              <p className="mt-1 text-xs leading-relaxed text-[#6B7280]">
                Noorani Qaida & Nazera with patient, child-friendly teachers in
                a calm one-to-one setting.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div {...fadeIn(0.26)} className="mb-3 grid grid-cols-3 gap-2">
          {[
            { label: "Separate", sub: "Classrooms" },
            { label: "Female", sub: "Teachers" },
            { label: "20% Off", sub: "2nd Child" },
          ].map((item) => (
            <div key={item.label} className={heroStatBox()}>
              <p className="font-inter text-xs font-bold text-[#0D4A2F]">
                {item.label}
              </p>
              <p className="text-[10px] text-[#6B7280]">{item.sub}</p>
            </div>
          ))}
        </motion.div>

        <motion.div
          {...fadeIn(0.32)}
          className="flex items-center gap-2 rounded-xl border border-[#1B6B44]/20 bg-[#F0FBF6] px-3 py-3"
        >
          <Lock
            className="h-4 w-4 shrink-0 text-[var(--gold)]"
            aria-hidden="true"
          />
          <p className="text-xs leading-relaxed text-[#0D4A2F]">
            Your family&apos;s dignity is protected — learning stays private,
            respectful, and within Islamic values.
          </p>
        </motion.div>
      </div>
    </HeroVisualFrame>
  );
}
