"use client";

import Link from "next/link";
import { ChevronDown, MoreHorizontal } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useTranslations } from "next-intl";
import type { INavItem } from "@/lib/navigation";
import { useNavLabel } from "@/lib/i18n/useNavLabel";
import {
  useNavItemActive,
  useNavItemsAnyActive,
  useNavLinkActive,
} from "@/lib/useNavMatch";
import { navLinkBase } from "@/components/layout/NavLink";
import { cn } from "@/lib/cn";

interface INavMoreMenuProps {
  items: INavItem[];
}

function NavMoreChildLink({
  href,
  labelKey,
  label,
}: {
  href: string;
  labelKey: string;
  label: (key: string) => string;
}) {
  const childActive = useNavLinkActive(href);

  return (
    <Link
      href={href}
      className={cn(
        "mx-1.5 block rounded-[8px] border-l-2 border-transparent px-3.5 py-2 text-sm font-medium text-[#374151] transition-all duration-200",
        "hover:border-[var(--nav-hover)] hover:bg-[var(--nav-hover-soft)] hover:text-[var(--nav-hover)]",
        childActive &&
          "border-[var(--nav-hover)] bg-[var(--nav-hover-soft)] font-semibold text-[var(--nav-hover)]"
      )}
      aria-current={childActive ? "page" : undefined}
    >
      {label(labelKey)}
    </Link>
  );
}

function NavMoreTopLink({
  href,
  labelKey,
  label,
}: {
  href: string;
  labelKey: string;
  label: (key: string) => string;
}) {
  const linkActive = useNavLinkActive(href);

  return (
    <Link
      href={href}
      className={cn(
        "mx-1.5 block rounded-[8px] border-l-2 border-transparent px-3.5 py-2.5 text-sm font-medium text-[#374151] transition-all duration-200",
        "hover:border-[var(--nav-hover)] hover:bg-[var(--nav-hover-soft)] hover:text-[var(--nav-hover)]",
        linkActive &&
          "border-[var(--nav-hover)] bg-[var(--nav-hover-soft)] font-semibold text-[var(--nav-hover)]"
      )}
      aria-current={linkActive ? "page" : undefined}
    >
      {label(labelKey)}
    </Link>
  );
}

function NavMoreMenuItem({
  item,
  index,
  label,
}: {
  item: INavItem;
  index: number;
  label: (key: string) => string;
}) {
  const itemActive = useNavItemActive(item);

  if (item.children) {
    return (
      <div>
        {index > 0 && (
          <div className="mx-3 my-1.5 border-t border-gray-100" aria-hidden="true" />
        )}
        <p
          className={cn(
            "px-4 pb-1 pt-2 font-body text-[10px] font-bold uppercase tracking-wider",
            itemActive ? "text-[var(--nav-hover)]" : "text-[#9CA3AF]"
          )}
        >
          {label(item.labelKey)}
        </p>
        {item.children.map((child) => (
          <NavMoreChildLink
            key={child.href}
            href={child.href}
            labelKey={child.labelKey}
            label={label}
          />
        ))}
      </div>
    );
  }

  return (
    <div>
      {index > 0 && (
        <div className="mx-3 my-1.5 border-t border-gray-100" aria-hidden="true" />
      )}
      <NavMoreTopLink
        href={item.href ?? "/"}
        labelKey={item.labelKey}
        label={label}
      />
    </div>
  );
}

export function NavMoreMenu({ items }: INavMoreMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const label = useNavLabel();
  const tNav = useTranslations("nav");
  const hasActiveChild = useNavItemsAnyActive(items);

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
          (hasActiveChild || isOpen) && "is-active"
        )}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <MoreHorizontal className="h-4 w-4" aria-hidden="true" />
        {tNav("more")}
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
            className="absolute right-0 top-full z-[100] min-w-[232px] pt-2"
          >
            <div className="overflow-hidden rounded-[8px] border border-[var(--nav-hover)]/15 bg-white py-2 shadow-[0_18px_40px_-12px_rgba(50,201,145,0.28)] ring-1 ring-black/5">
              {items.map((item, index) => (
                <NavMoreMenuItem
                  key={item.labelKey}
                  item={item}
                  index={index}
                  label={label}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
