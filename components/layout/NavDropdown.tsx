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
import { cn } from "@/lib/cn";

interface INavDropdownProps {
  item: INavItem;
}

export function NavDropdown({ item }: INavDropdownProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const label = useNavLabel();
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
          navLinkBase(),
          "gap-1",
          (isActive || isOpen) && "is-active"
        )}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {label(item.labelKey)}
        <ChevronDown
          className={cn(
            "h-3.5 w-3.5 transition-transform duration-200",
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
            <div className="overflow-hidden rounded-[8px] border border-[var(--nav-hover)]/15 bg-white py-2 shadow-[0_18px_40px_-12px_rgba(189,68,64,0.28)] ring-1 ring-black/5">
              {item.children.map((child) => {
                const childActive = isNavLinkActive(child.href, pathname);

                return (
                  <Link
                    key={child.href}
                    href={child.href}
                    className={cn(
                      "mx-1.5 block rounded-[8px] border-l-2 border-transparent px-3.5 py-2.5 text-sm font-medium text-[#374151] transition-all duration-200",
                      "hover:border-[var(--nav-hover)] hover:bg-[var(--nav-hover-soft)] hover:text-[var(--nav-hover)]",
                      childActive &&
                        "border-[var(--nav-hover)] bg-[var(--nav-hover-soft)] font-semibold text-[var(--nav-hover)]"
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
