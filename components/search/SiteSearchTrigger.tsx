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
          "inline-flex items-center justify-center rounded-[8px] transition-colors duration-200",
          variant === "mobile" || variant === "overlay"
            ? "h-9 w-9 border border-white/20 text-white hover:border-[var(--gold)] hover:bg-white/10 hover:text-[var(--gold)] xl:h-10 xl:w-10"
            : "h-9 w-9 text-[#374151] hover:bg-[var(--green-light)] hover:text-[var(--green-primary)] xl:h-10 xl:w-10",
          className
        )}
        aria-label={t("open")}
      >
        <Search className="h-5 w-5" aria-hidden="true" />
      </button>

      {isOpen && <SiteSearchDialog isOpen={isOpen} onClose={closeSearch} />}
    </>
  );
}
