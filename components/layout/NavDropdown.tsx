"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useState } from "react";
import type { INavItem } from "@/lib/navigation";
import { useNavLabel } from "@/lib/i18n/useNavLabel";
import { isNavItemActive, isNavLinkActive } from "@/lib/navActive";
import { navLinkBase } from "@/components/layout/NavLink";
import { useHeaderTheme } from "@/components/layout/HeaderThemeContext";
import { cn } from "@/lib/cn";

interface INavDropdownProps {
  item: INavItem;
}

export function NavDropdown({ item }: INavDropdownProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const label = useNavLabel();
  const { isOverlay } = useHeaderTheme();
  const isActive = isNavItemActive(item, pathname);

  if (!item.children) {
    return null;
  }

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
          isActive &&
            (isOverlay
              ? "bg-white/15 font-semibold text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.2)]"
              : "bg-white font-semibold text-[var(--green-primary)] shadow-sm ring-1 ring-[var(--green-primary)]/15")
        )}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {label(item.labelKey)}
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
            className="absolute left-0 top-full z-[100] min-w-[240px] pt-2"
          >
            <div
              className={cn(
                "overflow-hidden rounded-2xl py-2 shadow-2xl",
                isOverlay
                  ? "border border-white/10 bg-[#269B6F]/95 backdrop-blur-2xl"
                  : "border border-black/5 bg-white/95 backdrop-blur-xl ring-1 ring-black/5"
              )}
            >
              {item.children.map((child) => {
                const childActive = isNavLinkActive(child.href, pathname);

                return (
                  <Link
                    key={child.href}
                    href={child.href}
                    className={cn(
                      "block border-l-2 border-transparent px-4 py-2.5 text-sm font-medium transition-all duration-200",
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
