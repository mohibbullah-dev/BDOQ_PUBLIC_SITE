"use client";

import dynamic from "next/dynamic";
import { Search } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/cn";

const SiteSearchDialog = dynamic(
  () =>
    import("@/components/search/SiteSearchDialog").then((m) => ({
      default: m.SiteSearchDialog,
    })),
  { ssr: false }
);

interface ISiteSearchTriggerProps {
  className?: string;
  variant?: "desktop" | "mobile" | "overlay";
  onOpen?: () => void;
}

export function SiteSearchTrigger({
  className,
  variant = "desktop",
  onOpen,
}: ISiteSearchTriggerProps) {
  const t = useTranslations("search");
  const [isOpen, setIsOpen] = useState(false);

  const openSearch = useCallback((): void => {
    onOpen?.();
    setIsOpen(true);
  }, [onOpen]);

  const closeSearch = useCallback((): void => {
    setIsOpen(false);
  }, []);

  useEffect(() => {
    const handleShortcut = (event: KeyboardEvent): void => {
      const isModifier = event.ctrlKey || event.metaKey;
      if (!isModifier || event.key.toLowerCase() !== "k") return;

      const target = event.target;
      if (
        target instanceof HTMLElement &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      ) {
        return;
      }

      event.preventDefault();
      setIsOpen(true);
    };

    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={openSearch}
        className={cn(
          "inline-flex items-center justify-center rounded transition-colors duration-200",
          variant === "mobile" || variant === "overlay"
            ? "h-9 w-9 border border-white/20 text-white hover:border-[#D4A853] hover:bg-white/10 hover:text-[#D4A853] xl:h-10 xl:w-10"
            : "h-9 gap-2 border border-[rgb(220_235_228/0.7)] bg-[#fcfefd] px-3 text-[#374151] shadow-[0_0_0_1px_rgb(210_232_220/0.28),0_2px_8px_rgb(180_220_200/0.1)] hover:text-primary xl:h-10",
          className
        )}
        aria-label={t("open")}
      >
        <Search className="h-5 w-5 shrink-0" aria-hidden="true" />
        {variant === "desktop" ? (
          <>
            <span className="hidden text-sm lg:inline">Search…</span>
            <kbd className="hidden rounded bg-[#f6fcf9] px-1.5 py-0.5 font-mono text-[10px] text-text-gray xl:inline">
              Ctrl K
            </kbd>
          </>
        ) : null}
      </button>

      {isOpen && <SiteSearchDialog isOpen={isOpen} onClose={closeSearch} />}
    </>
  );
}
