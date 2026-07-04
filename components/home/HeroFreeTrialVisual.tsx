"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Calendar,
  Check,
  Clock,
  Gift,
  Sparkles,
  User,
} from "lucide-react";
import { HeroVisualFrame } from "@/components/home/HeroVisualFrame";
import { heroBadge, heroPanel } from "@/lib/heroVisualStyles";
import { cn } from "@/lib/cn";

const STEPS = [
  { label: "Register", done: true },
  { label: "Pick Time", done: true },
  { label: "Start Class", done: false },
] as const;

const fadeIn = (delay: number) => ({
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, delay, ease: [0.22, 1, 0.36, 1] as const },
});

export function HeroFreeTrialVisual() {
  return (
    <HeroVisualFrame accent="gold" label="Free Trial · No Payment Required">
      <div className="p-5 sm:p-6">
        <motion.div
          {...fadeIn(0)}
          className="mb-4 flex items-center justify-between gap-2"
        >
          <span className="flex items-center gap-2 font-inter text-sm font-bold uppercase tracking-wide text-[#0D4A2F]">
            <Gift className="h-5 w-5 text-[var(--gold)]" aria-hidden="true" />
            Free Trial Booking
          </span>
          <span className="rounded-full bg-[linear-gradient(135deg,#E84B3A,#C62828)] px-3 py-1 text-[11px] font-bold text-white">
            100% Free
          </span>
        </motion.div>

        <motion.div
          {...fadeIn(0.08)}
          className="mb-4 flex items-start justify-between"
        >
          {STEPS.map((step, index) => (
            <div
              key={step.label}
              className="relative flex flex-1 flex-col items-center"
            >
              {index > 0 && (
                <span
                  className="absolute right-1/2 top-4 h-0.5 w-full bg-[#E8F5EE]"
                  aria-hidden="true"
                />
              )}
              <span
                className={cn(
                  "relative z-[1] mb-1 flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold",
                  step.done
                    ? "bg-[#1B6B44] text-white"
                    : "border-2 border-[var(--gold)] bg-white text-[var(--gold)]"
                )}
              >
                {step.done ? (
                  <Check className="h-4 w-4" strokeWidth={3} aria-hidden />
                ) : (
                  index + 1
                )}
              </span>
              <span className="text-[10px] font-semibold text-[#6B7280]">
                {step.label}
              </span>
            </div>
          ))}
        </motion.div>

        <motion.div {...fadeIn(0.14)} className={heroPanel("mb-4 space-y-3")}>
          <p className="font-playfair text-xl font-bold text-[#0D4A2F]">
            Your First Class
            <span className="ml-1 text-[var(--gold)]">Is Free</span>
          </p>

          <div className="space-y-2">
            {[
              { icon: User, text: "Your name", highlight: false },
              {
                icon: BookOpen,
                text: "Tajweed · Any course",
                highlight: false,
              },
              {
                icon: Calendar,
                text: "Evening · Your timezone",
                highlight: true,
              },
            ].map(({ icon: Icon, text, highlight }) => (
              <div
                key={text}
                className={cn(
                  "flex items-center gap-2 rounded-xl border px-3 py-2.5",
                  highlight
                    ? "border-[var(--gold)]/40 bg-[var(--gold)]/5"
                    : "border-gray-200 bg-[#F9FAFB]"
                )}
              >
                <Icon
                  className={cn(
                    "h-4 w-4 shrink-0",
                    highlight ? "text-[var(--gold)]" : "text-[#6B7280]"
                  )}
                  aria-hidden="true"
                />
                <span
                  className={cn(
                    "text-sm",
                    highlight
                      ? "font-semibold text-[#0D4A2F]"
                      : "text-[#6B7280]"
                  )}
                >
                  {text}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div {...fadeIn(0.22)}>
          <Link
            href="/free-class"
            className={cn(
              "flex w-full items-center justify-center gap-2 rounded-full py-3.5",
              "bg-[linear-gradient(135deg,#E84B3A,#C62828)] font-inter text-sm font-bold text-white",
              "shadow-lg transition-all duration-300 hover:scale-[1.02]"
            )}
          >
            Book My Free Class
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </motion.div>

        <motion.div
          {...fadeIn(0.28)}
          className="mt-3 flex flex-wrap justify-center gap-2"
        >
          {[
            { icon: Sparkles, text: "No card needed" },
            { icon: Clock, text: "Under 2 min" },
            { icon: BookOpen, text: "Any course" },
          ].map(({ icon: Icon, text }) => (
            <span
              key={text}
              className={heroBadge("gap-1 normal-case tracking-normal")}
            >
              <Icon className="h-3 w-3" aria-hidden="true" />
              {text}
            </span>
          ))}
        </motion.div>
      </div>
    </HeroVisualFrame>
  );
}
