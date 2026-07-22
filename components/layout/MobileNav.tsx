"use client";

import Link from "next/link";
import { ChevronDown, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import type { INavItem } from "@/lib/navigation";
import { useNavLabel } from "@/lib/i18n/useNavLabel";
import { BdoqLogo } from "@/components/brand/BdoqLogo";
import { LanguageToggle } from "@/components/shared/LanguageToggle";
import { FreeTrialButton } from "@/components/shared/SocialIcons";
import { SiteSearchTrigger } from "@/components/search/SiteSearchTrigger";
import { cn } from "@/lib/cn";

interface IMobileNavProps {
  items: INavItem[];
  isOpen: boolean;
  onClose: () => void;
}

interface IMobileNavSectionProps {
  item: INavItem;
  onClose: () => void;
  label: (key: string) => string;
}

function MobileNavSection({ item, onClose, label }: IMobileNavSectionProps) {
  const [expanded, setExpanded] = useState(false);

  if (!item.children) {
    return (
      <Link
        href={item.href ?? "/"}
        onClick={onClose}
        className={cn(
          "flex min-h-[48px] items-center rounded-xl px-4 py-3",
          "font-body text-base font-semibold text-white",
          "transition-colors active:bg-white/10"
        )}
      >
        {label(item.labelKey)}
      </Link>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.04]">
      <button
        type="button"
        onClick={() => setExpanded((current) => !current)}
        className={cn(
          "flex min-h-[48px] w-full items-center justify-between gap-3 px-4 py-3",
          "font-body text-left text-base font-semibold text-white",
          "transition-colors active:bg-white/10"
        )}
        aria-expanded={expanded}
      >
        <span>{label(item.labelKey)}</span>
        <ChevronDown
          className={cn(
            "h-5 w-5 shrink-0 text-white/70 transition-transform duration-200",
            expanded && "rotate-180"
          )}
          aria-hidden="true"
        />
      </button>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <ul className="space-y-0.5 border-t border-white/10 px-2 pb-2 pt-1">
              {item.children.map((child) => (
                <li key={child.href}>
                  <Link
                    href={child.href}
                    onClick={onClose}
                    className={cn(
                      "flex min-h-[44px] items-center rounded-lg px-3 py-2.5",
                      "font-body text-sm font-medium text-white/85",
                      "transition-colors active:bg-white/10 active:text-white"
                    )}
                  >
                    {label(child.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function MobileNav({ items, isOpen, onClose }: IMobileNavProps) {
  const label = useNavLabel();
  const tA11y = useTranslations("a11y");
  const tNav = useTranslations("nav");
  const tSearch = useTranslations("search");

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent): void => {
      if (event.key === "Escape") onClose();
    };

    if (isOpen) {
      window.addEventListener("keydown", handleEscape);
    }

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label={tA11y("mobileNav")}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="absolute inset-0 bg-[#32C991]"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative flex h-full min-h-0 flex-col">
              <div className="flex shrink-0 items-center justify-between border-b border-white/10 px-4 py-3.5 pt-[max(0.875rem,env(safe-area-inset-top))]">
                <Link href="/" onClick={onClose} className="shrink-0">
                  <BdoqLogo size="md" />
                </Link>
                <button
                  type="button"
                  onClick={onClose}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white transition-colors active:bg-white/15"
                  aria-label={tA11y("closeMenu")}
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>

              <nav
                className="flex-1 space-y-2 overflow-y-auto overscroll-contain px-4 py-4"
                aria-label={tA11y("mobileNav")}
              >
                {items.map((item) => (
                  <MobileNavSection
                    key={item.labelKey}
                    item={item}
                    onClose={onClose}
                    label={label}
                  />
                ))}
              </nav>

              <div
                className={cn(
                  "shrink-0 space-y-4 border-t border-white/10 bg-[#0A3D28]/90 px-4 py-4",
                  "pb-[max(1rem,env(safe-area-inset-bottom))]"
                )}
              >
                <div className="flex items-center gap-3">
                  <SiteSearchTrigger variant="mobile" onOpen={onClose} />
                  <span className="font-body text-sm text-white/80">
                    {tSearch("mobile")}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <LanguageToggle variant="dark" />
                  <Link
                    href="/login"
                    onClick={onClose}
                    className={cn(
                      "inline-flex min-h-[44px] flex-1 items-center justify-center rounded-full",
                      "border border-white/30 px-5 py-2.5 font-body text-sm font-semibold text-white",
                      "transition-colors active:bg-white/10"
                    )}
                  >
                    {tNav("login")}
                  </Link>
                </div>

                <FreeTrialButton
                  variant="gradient"
                  fullLabel
                  className="w-full min-h-[48px] justify-center"
                  onClick={onClose}
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
