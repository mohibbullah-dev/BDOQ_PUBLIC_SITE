"use client";

import Link from "next/link";
import { ChevronDown, MoreHorizontal } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useTranslations } from "next-intl";
import type { INavItem } from "@/lib/navigation";
import { useNavLabel } from "@/lib/i18n/useNavLabel";
import { isNavItemActive, isNavLinkActive } from "@/lib/navActive";
import { navLinkBase } from "@/components/layout/NavLink";
import { useHeaderTheme } from "@/components/layout/HeaderThemeContext";
import { cn } from "@/lib/cn";

interface INavMoreMenuProps {
  items: INavItem[];
}

export function NavMoreMenu({ items }: INavMoreMenuProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const label = useNavLabel();
  const tNav = useTranslations("nav");
  const { isOverlay } = useHeaderTheme();
  const hasActiveChild = items.some((item) => isNavItemActive(item, pathname));

  return (
    <div
      className="relative shrink-0"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        type="button"
        className={cn(
          navLinkBase(isOverlay),
          "inline-flex shrink-0 items-center gap-1 whitespace-nowrap",
          hasActiveChild &&
            (isOverlay
              ? "bg-white/15 font-semibold text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.2)]"
              : "bg-white font-semibold text-[var(--green-primary)] shadow-sm ring-1 ring-[var(--green-primary)]/15")
        )}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <MoreHorizontal className="h-4 w-4" aria-hidden="true" />
        {tNav("more")}
        <ChevronDown
          className={cn(
            "h-4 w-4 transition-transform duration-200",
            isOpen && "rotate-180"
          )}
          aria-hidden="true"
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-0 top-full z-[100] min-w-[220px] pt-2"
          >
            <div
              className={cn(
                "overflow-hidden rounded-2xl py-2 shadow-2xl",
                isOverlay
                  ? "border border-white/10 bg-[#269B6F]/95 backdrop-blur-2xl"
                  : "border border-black/5 bg-white/95 backdrop-blur-xl ring-1 ring-black/5"
              )}
            >
              {items.map((item, index) => {
                if (item.children) {
                  return (
                    <div key={item.labelKey}>
                      {index > 0 && (
                        <div
                          className={cn(
                            "mx-3 my-1.5 border-t",
                            isOverlay ? "border-white/10" : "border-gray-100"
                          )}
                          aria-hidden="true"
                        />
                      )}
                      <p
                        className={cn(
                          "px-4 pb-1 pt-2 font-inter text-[10px] font-bold uppercase tracking-wider",
                          isOverlay ? "text-white/45" : "text-[#9CA3AF]"
                        )}
                      >
                        {label(item.labelKey)}
                      </p>
                      {item.children.map((child) => {
                        const childActive = isNavLinkActive(
                          child.href,
                          pathname
                        );

                        return (
                          <Link
                            key={child.href}
                            href={child.href}
                            className={cn(
                              "block border-l-2 border-transparent px-4 py-2 text-sm font-medium transition-all duration-200",
                              isOverlay
                                ? "text-white/85 hover:border-[var(--gold)] hover:bg-white/10 hover:text-white"
                                : "text-[#374151] hover:border-[var(--gold)] hover:bg-[var(--green-light)]/60 hover:text-[var(--green-primary)]",
                              childActive &&
                                (isOverlay
                                  ? "border-[var(--gold)] bg-white/10 text-white"
                                  : "border-[var(--gold)] bg-[var(--green-light)]/40 text-[var(--green-primary)]")
                            )}
                            aria-current={childActive ? "page" : undefined}
                          >
                            {label(child.labelKey)}
                          </Link>
                        );
                      })}
                    </div>
                  );
                }

                const linkActive = item.href
                  ? isNavLinkActive(item.href, pathname)
                  : false;

                return (
                  <div key={item.labelKey}>
                    {index > 0 && (
                      <div
                        className={cn(
                          "mx-3 my-1.5 border-t",
                          isOverlay ? "border-white/10" : "border-gray-100"
                        )}
                        aria-hidden="true"
                      />
                    )}
                    <Link
                      href={item.href ?? "/"}
                      className={cn(
                        "block border-l-2 border-transparent px-4 py-2.5 text-sm font-medium transition-all duration-200",
                        isOverlay
                          ? "text-white/85 hover:border-[var(--gold)] hover:bg-white/10 hover:text-white"
                          : "text-[#374151] hover:border-[var(--gold)] hover:bg-[var(--green-light)]/60 hover:text-[var(--green-primary)]",
                        linkActive &&
                          (isOverlay
                            ? "border-[var(--gold)] bg-white/10 text-white"
                            : "border-[var(--gold)] bg-[var(--green-light)]/40 text-[var(--green-primary)]")
                      )}
                      aria-current={linkActive ? "page" : undefined}
                    >
                      {label(item.labelKey)}
                    </Link>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
