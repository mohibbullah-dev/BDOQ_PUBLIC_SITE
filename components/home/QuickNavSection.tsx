"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
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
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: index * 0.04, ease: revealEase }}
    >
      <Link
        href={item.href}
        className={cn(
          "site-card group flex items-center gap-3 rounded-xl px-2 py-2.5 sm:gap-3.5 sm:px-3 sm:py-3",
          "transition-colors duration-200 hover:bg-white/80"
        )}
      >
        <span
          className={cn(
            "relative h-12 w-12 shrink-0 overflow-hidden rounded-full sm:h-14 sm:w-14",
            "ring-2 ring-primary/15 ring-offset-2 ring-offset-[#F4F7F5]",
            "transition-transform duration-300 group-hover:scale-105"
          )}
        >
          <Image
            src={getQuickNavImagePath(item.id)}
            alt={label}
            fill
            className="object-cover object-center"
            sizes="56px"
          />
        </span>

        <span className="min-w-0">
          <span className="block font-body text-sm font-semibold text-primary-dark transition-colors group-hover:text-primary">
            {label}
          </span>
          <span className="mt-0.5 block font-body text-xs leading-snug text-text-gray">
            {t(`${key}.description`)}
          </span>
        </span>
      </Link>
    </motion.div>
  );
}

/** Home quick links — 8-item horizontal icon+text grid (mockup) */
export function QuickNavSection() {
  const t = useTranslations("home.quickNav");

  return (
    <section
      className="relative z-20 bg-white py-8 md:py-10"
      aria-label={t("aria")}
    >
      <div className="site-container">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: revealEase }}
          className={cn(
            "rounded-2xl border border-gray-100 bg-[#F4F7F5] p-3 sm:p-4 md:p-5",
            "shadow-[0_10px_40px_-24px_rgba(15,23,42,0.12)]"
          )}
        >
          <div className="grid grid-cols-1 gap-1 sm:grid-cols-2 lg:grid-cols-4 lg:gap-2">
            {QUICK_NAV_ITEMS.map((item, index) => (
              <QuickNavItemLink key={item.id} item={item} index={index} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
