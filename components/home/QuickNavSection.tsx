"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { QUICK_NAV_ITEMS } from "@/lib/constants";
import type { IQuickNavItem } from "@/lib/types";
import { QUICK_NAV_I18N_KEYS } from "@/lib/i18n/quickNavKeys";
import { getQuickNavImagePath } from "@/lib/quickNavImages";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/cn";

const revealEase = [0.22, 1, 0.36, 1] as const;

interface IQuickNavItemLinkProps {
  item: IQuickNavItem;
  index: number;
}

function QuickNavItemLink({ item, index }: IQuickNavItemLinkProps) {
  const t = useTranslations("home.quickNav");
  const key = QUICK_NAV_I18N_KEYS[item.id] ?? item.id;
  const label = t(`${key}.label`);

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: revealEase }}
      className="relative overflow-hidden bg-white"
    >
      <Link
        href={item.href}
        className="site-card group relative flex h-full flex-col items-center gap-3.5 overflow-hidden px-3 py-6 text-center sm:px-4 sm:py-7"
      >
        <ArrowUpRight
          className={cn(
            "absolute right-3 top-3 z-[3] h-4 w-4 text-primary",
            "translate-x-1 -translate-y-1 opacity-0",
            "transition-all duration-200 ease-out",
            "group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100"
          )}
          aria-hidden="true"
        />

        <div className="relative z-[1]">
          <span
            className={cn(
              "absolute inset-0 -m-2 rounded-full bg-[var(--green-primary)]/20 opacity-0 blur-xl",
              "transition-all duration-500 group-hover:opacity-100 group-hover:scale-110"
            )}
            aria-hidden="true"
          />
          <div
            className={cn(
              "relative h-[4.5rem] w-[4.5rem] overflow-hidden rounded-full sm:h-20 sm:w-20",
              "ring-2 ring-[var(--green-primary)]/10 ring-offset-2 ring-offset-white",
              "shadow-[0_8px_24px_-6px_rgba(50,201,145,0.35)]",
              "transition-all duration-500 ease-out",
              "group-hover:-translate-y-1 group-hover:scale-105 group-hover:shadow-[0_14px_32px_-8px_rgba(50,201,145,0.45)]"
            )}
          >
            <Image
              src={getQuickNavImagePath(item.id)}
              alt={label}
              fill
              className="object-cover object-center"
              sizes="(max-width: 640px) 72px, 80px"
            />
          </div>
        </div>

        <div className="relative z-[1] transition-transform duration-500 ease-out group-hover:-translate-y-0.5">
          <p
            className={cn(
              "font-body text-sm font-semibold text-[var(--text-dark)]",
              "transition-colors duration-300 group-hover:text-[var(--green-primary)]"
            )}
          >
            {label}
          </p>
          <p
            className={cn(
              "mt-1 font-body text-xs leading-snug text-[var(--text-gray)]",
              "transition-all duration-300 group-hover:text-[var(--text-dark)]/70"
            )}
          >
            {t(`${key}.description`)}
          </p>
          <span
            className={cn(
              "mx-auto mt-2.5 block h-0.5 w-0 rounded-full bg-[var(--green-primary)]",
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
      className="relative z-20 bg-white py-10 md:py-12"
      aria-label="Quick navigation"
    >
      <div className="site-container">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: revealEase }}
          className={cn(
            "relative overflow-hidden rounded-2xl",
            "border border-gray-200/80 bg-white"
          )}
        >
          <div className="relative grid grid-cols-2 gap-px bg-gray-100 sm:grid-cols-4">
            {QUICK_NAV_ITEMS.map((item, index) => (
              <QuickNavItemLink key={item.id} item={item} index={index} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
