"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  BookOpen,
  ChevronRight,
  Compass,
  FileText,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/cn";

export type FooterNavIconKey = "compass" | "bookOpen" | "fileText";

const FOOTER_NAV_ICONS: Record<FooterNavIconKey, LucideIcon> = {
  compass: Compass,
  bookOpen: BookOpen,
  fileText: FileText,
};

export interface IFooterNavItem {
  href: string;
  label: string;
}

export interface IFooterNavColumn {
  id: string;
  label: string;
  icon: FooterNavIconKey;
  links: IFooterNavItem[];
}

interface IFooterNavColumnsProps {
  columns: IFooterNavColumn[];
}

function ColumnHeading({
  icon: Icon,
  children,
}: {
  icon: LucideIcon;
  children: string;
}) {
  return (
    <h3 className="mb-4 flex items-center gap-2.5 font-body text-sm font-bold uppercase tracking-wide text-[var(--green-dark)] md:text-base">
      <span
        className={cn(
          "flex size-8 shrink-0 items-center justify-center rounded-[8px]",
          "bg-[linear-gradient(135deg,#E8FAF2_0%,#ffffff_55%,#F0FBF6_100%)]",
          "text-[var(--green-primary)] ring-1 ring-[var(--green-primary)]/15"
        )}
      >
        <Icon className="size-4" strokeWidth={2} aria-hidden="true" />
      </span>
      {children}
    </h3>
  );
}

function FooterLinkRow({
  link,
  isHovered,
  onHover,
  onLeave,
}: {
  link: IFooterNavItem;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}) {
  return (
    <li
      className="relative"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onFocus={onHover}
      onBlur={onLeave}
    >
      <AnimatePresence>
        {isHovered ? (
          <motion.span
            role="tooltip"
            className={cn(
              "pointer-events-none absolute -top-8 left-2 z-20",
              "whitespace-nowrap rounded-[8px] px-2.5 py-1",
              "bg-[var(--text-dark)] font-body text-[11px] font-medium text-white",
              "shadow-[0_8px_20px_-10px_rgba(26,26,46,0.55)]"
            )}
            initial={{ opacity: 0, y: 6, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.96 }}
            transition={{
              type: "spring",
              stiffness: 480,
              damping: 28,
            }}
          >
            {link.label}
            <span
              className="absolute left-3 top-full size-0 border-x-[5px] border-t-[6px] border-x-transparent border-t-[var(--text-dark)]"
              aria-hidden="true"
            />
          </motion.span>
        ) : null}
      </AnimatePresence>

      <Link href={link.href} className="footer-link group w-full px-0 py-1.5">
        <ChevronRight
          className="footer-link__chevron size-3.5 shrink-0"
          aria-hidden="true"
        />
        <span>{link.label}</span>
      </Link>
    </li>
  );
}

export function FooterNavColumns({ columns }: IFooterNavColumnsProps) {
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);

  return (
    <>
      {columns.map((column) => {
        const Icon = FOOTER_NAV_ICONS[column.icon];
        return (
          <div key={column.id} className="lg:col-span-2">
            <ColumnHeading icon={Icon}>{column.label}</ColumnHeading>
            <ul className="space-y-1">
              {column.links.map((link) => {
                const key = `${column.id}:${link.href}`;
                return (
                  <FooterLinkRow
                    key={key}
                    link={link}
                    isHovered={hoveredKey === key}
                    onHover={() => setHoveredKey(key)}
                    onLeave={() => setHoveredKey(null)}
                  />
                );
              })}
            </ul>
          </div>
        );
      })}
    </>
  );
}
