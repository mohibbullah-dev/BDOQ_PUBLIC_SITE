"use client";

import { useEffect, useTransition } from "react";
import Image from "next/image";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import type { LocaleType } from "@/i18n/routing";
import { getStoredLocale, setLocalePreference } from "@/lib/locale";
import { cn } from "@/lib/cn";

interface ILanguageToggleProps {
  className?: string;
  variant?: "light" | "dark";
}

const LOCALES = [
  { id: "en" as const, flag: "us", label: "EN", name: "English" },
  { id: "bn" as const, flag: "bd", label: "BN", name: "বাংলা" },
] as const;

function FlagChip({
  code,
  name,
  active,
}: {
  code: string;
  name: string;
  active: boolean;
}) {
  return (
    <span
      className={cn(
        "relative h-4 w-6 shrink-0 overflow-hidden rounded-[4px] ring-1 transition-all duration-300",
        active
          ? "ring-white/90 shadow-sm"
          : "ring-black/10 group-hover:ring-[var(--green-primary)]/40"
      )}
    >
      <Image
        src={`https://flagcdn.com/w40/${code}.png`}
        alt={`${name} flag`}
        fill
        className="object-cover"
        sizes="24px"
        unoptimized
      />
    </span>
  );
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
  const activeIndex = locale === "bn" ? 1 : 0;

  return (
    <div
      className={cn(
        "relative inline-flex shrink-0 items-center rounded-[8px] p-1",
        isDark
          ? "border border-white/15 bg-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
          : "border border-[var(--green-primary)]/15 bg-white shadow-[0_4px_14px_rgba(15,23,42,0.06)]",
        isPending && "opacity-70",
        className
      )}
      role="group"
      aria-label="Language toggle"
    >
      <span
        className={cn(
          "pointer-events-none absolute bottom-1 top-1 w-[calc(50%-4px)] rounded-[6px] transition-transform duration-300 ease-out",
          "bg-[var(--green-primary)] shadow-[0_6px_16px_-6px_rgba(50,201,145,0.65)]",
          activeIndex === 0 ? "left-1" : "left-[calc(50%+2px)]"
        )}
        aria-hidden="true"
      />

      {LOCALES.map((item) => {
        const active = locale === item.id;

        return (
          <button
            key={item.id}
            type="button"
            onClick={() => handleSelect(item.id)}
            aria-pressed={active}
            aria-label={`Switch to ${item.name}`}
            title={item.name}
            className={cn(
              "group relative z-[1] inline-flex min-w-[3.25rem] items-center justify-center gap-1.5 rounded-[6px] px-2.5 py-1.5 transition-colors duration-300",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--green-primary)] focus-visible:ring-offset-2",
              active
                ? "text-white"
                : isDark
                  ? "text-white/75 hover:text-white"
                  : "text-[var(--text-gray)] hover:text-[var(--green-primary)]"
            )}
          >
            <FlagChip code={item.flag} name={item.name} active={active} />
            <span
              className={cn(
                "font-inter text-[10px] font-bold uppercase tracking-wide",
                active ? "text-white" : undefined
              )}
            >
              {item.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
