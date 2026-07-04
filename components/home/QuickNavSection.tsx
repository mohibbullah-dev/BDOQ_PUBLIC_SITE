"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  BookOpen,
  Gift,
  GraduationCap,
  Library,
  Newspaper,
  Tag,
  UserRound,
  Users,
  type LucideIcon,
} from "lucide-react";
import { QUICK_NAV_ITEMS } from "@/lib/constants";
import type { IQuickNavItem, QuickNavIconType } from "@/lib/types";
import { QUICK_NAV_I18N_KEYS } from "@/lib/i18n/quickNavKeys";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/cn";

const ICON_MAP: Record<QuickNavIconType, LucideIcon> = {
  users: Users,
  "user-round": UserRound,
  "book-open": BookOpen,
  newspaper: Newspaper,
  tag: Tag,
  gift: Gift,
  "graduation-cap": GraduationCap,
  images: BookOpen,
  library: Library,
  phone: BookOpen,
};

const revealEase = [0.22, 1, 0.36, 1] as const;

interface IQuickNavItemLinkProps {
  item: IQuickNavItem;
  index: number;
}

function QuickNavItemLink({ item, index }: IQuickNavItemLinkProps) {
  const Icon = ICON_MAP[item.icon];
  const t = useTranslations("home.quickNav");
  const key = QUICK_NAV_I18N_KEYS[item.id] ?? item.id;

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: revealEase }}
      className="relative bg-white"
    >
      <Link
        href={item.href}
        className="group relative flex h-full flex-col items-center gap-3.5 overflow-hidden px-3 py-6 text-center sm:px-4 sm:py-7"
      >
        <span
          className={cn(
            "pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500",
            "bg-[radial-gradient(circle_at_50%_30%,rgba(27,107,68,0.12),transparent_68%)]",
            "group-hover:opacity-100"
          )}
          aria-hidden="true"
        />

        <span
          className={cn(
            "pointer-events-none absolute inset-x-0 top-0 h-px scale-x-0 bg-gradient-to-r",
            "from-transparent via-[var(--green-primary)] to-transparent",
            "transition-transform duration-500 ease-out group-hover:scale-x-100"
          )}
          aria-hidden="true"
        />

        <ArrowUpRight
          className={cn(
            "absolute right-3 top-3 h-4 w-4 text-[var(--green-primary)]",
            "translate-x-1 -translate-y-1 opacity-0",
            "transition-all duration-300 ease-out",
            "group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100"
          )}
          aria-hidden="true"
        />

        <div className="relative">
          <span
            className={cn(
              "absolute inset-0 -m-1 rounded-2xl bg-[var(--green-primary)]/25 opacity-0 blur-lg",
              "transition-all duration-500 group-hover:opacity-100 group-hover:scale-125"
            )}
            aria-hidden="true"
          />
          <div
            className={cn(
              "relative flex h-14 w-14 items-center justify-center rounded-2xl",
              "bg-gradient-to-br from-[var(--green-primary)] via-[#1a5c3a] to-[var(--green-dark)]",
              "text-white shadow-[0_10px_24px_-8px_rgba(27,107,68,0.55)]",
              "ring-1 ring-white/20",
              "transition-all duration-500 ease-out",
              "group-hover:-translate-y-1 group-hover:scale-110 group-hover:shadow-[0_16px_32px_-10px_rgba(27,107,68,0.6)]"
            )}
          >
            <Icon
              className="h-6 w-6 transition-transform duration-500 group-hover:scale-105"
              strokeWidth={1.75}
              aria-hidden="true"
            />
          </div>
        </div>

        <div className="relative transition-transform duration-500 ease-out group-hover:-translate-y-0.5">
          <p
            className={cn(
              "font-inter text-sm font-semibold text-[var(--text-dark)]",
              "transition-colors duration-300 group-hover:text-[var(--green-primary)]"
            )}
          >
            {t(`${key}.label`)}
          </p>
          <p
            className={cn(
              "mt-1 font-inter text-xs leading-snug text-[var(--text-gray)]",
              "transition-all duration-300 group-hover:text-[var(--text-dark)]/70"
            )}
          >
            {t(`${key}.description`)}
          </p>
          <span
            className={cn(
              "mx-auto mt-2.5 block h-0.5 w-0 rounded-full bg-[var(--brand-red)]",
              "transition-all duration-500 ease-out group-hover:w-8"
            )}
            aria-hidden="true"
          />
        </div>
      </Link>
    </motion.div>
  );
}

export function QuickNavSection() {
  return (
    <section
      className="relative z-20 -mt-10 bg-white pb-10 pt-2 sm:-mt-14 sm:pb-12 md:-mt-16"
      aria-label="Quick navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: revealEase }}
          className={cn(
            "relative overflow-hidden rounded-3xl",
            "border border-[var(--green-primary)]/10",
            "bg-gradient-to-b from-white via-white to-[var(--green-light)]/30",
            "shadow-[0_28px_64px_-24px_rgba(27,107,68,0.28)]",
            "ring-1 ring-black/[0.04]"
          )}
        >
          <div
            className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[var(--green-primary)]/[0.07] blur-3xl"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -bottom-20 -left-20 h-52 w-52 rounded-full bg-[var(--brand-red)]/[0.06] blur-3xl"
            aria-hidden="true"
          />

          <div className="relative grid grid-cols-2 gap-px bg-gray-200/50 sm:grid-cols-4">
            {QUICK_NAV_ITEMS.map((item, index) => (
              <QuickNavItemLink key={item.id} item={item} index={index} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
