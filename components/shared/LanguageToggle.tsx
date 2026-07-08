"use client";

import { useEffect, useTransition } from "react";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import type { LocaleType } from "@/i18n/routing";
import { getStoredLocale, setLocalePreference } from "@/lib/locale";
import { cn } from "@/lib/cn";

interface ILanguageToggleProps {
  className?: string;
  variant?: "light" | "dark";
}

export function LanguageToggle({
  className,
  variant = "light",
}: ILanguageToggleProps) {
  const locale = useLocale() as LocaleType;
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const stored = getStoredLocale();
    if (stored && stored !== locale) {
      setLocalePreference(stored);
      startTransition(() => {
        router.refresh();
      });
    }
    // Sync stored preference once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSelect = (nextLocale: LocaleType): void => {
    if (nextLocale === locale || isPending) return;

    setLocalePreference(nextLocale);
    startTransition(() => {
      router.refresh();
    });
  };

  const isDark = variant === "dark";

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-[8px] p-0.5 text-xs font-semibold",
        isDark ? "bg-white/10" : "bg-gray-100",
        isPending && "opacity-70",
        className
      )}
      role="group"
      aria-label="Language toggle"
    >
      <button
        type="button"
        onClick={() => handleSelect("en")}
        aria-pressed={locale === "en"}
        className={cn(
          "rounded-[8px] px-3 py-1.5 transition-all duration-200",
          locale === "en"
            ? "bg-[var(--green-primary)] text-white shadow-sm"
            : isDark
              ? "text-white/70 hover:text-white"
              : "text-[#374151] hover:text-[var(--green-primary)]"
        )}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => handleSelect("bn")}
        aria-pressed={locale === "bn"}
        className={cn(
          "rounded-[8px] px-3 py-1.5 transition-all duration-200",
          locale === "bn"
            ? "bg-[var(--green-primary)] text-white shadow-sm"
            : isDark
              ? "text-white/70 hover:text-white"
              : "text-[#374151] hover:text-[var(--green-primary)]"
        )}
      >
        BN
      </button>
    </div>
  );
}
