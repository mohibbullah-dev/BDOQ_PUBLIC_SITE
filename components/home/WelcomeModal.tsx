"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { BdoqLogo } from "@/components/brand/BdoqLogo";
import { dismissWelcome, shouldShowWelcomeModal } from "@/lib/welcomeStorage";
import { cn } from "@/lib/cn";

const SCROLL_TRIGGER_RATIO = 0.8;

const benefitKeys = ["oneToOne", "global", "freeTrial"] as const;

function getHomeScrollProgress(): number {
  const doc = document.documentElement;
  const maxScroll = doc.scrollHeight - doc.clientHeight;
  if (maxScroll <= 0) return 0;
  return window.scrollY / maxScroll;
}

export function WelcomeModal() {
  const t = useTranslations("welcome");
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [dontShowAgain, setDontShowAgain] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const hasOpenedRef = useRef(false);
  const isFirstPathEffectRef = useRef(true);
  const previousPathRef = useRef<string | null>(null);

  const tryOpen = useCallback((): void => {
    if (hasOpenedRef.current) return;
    if (!shouldShowWelcomeModal()) return;
    hasOpenedRef.current = true;
    setIsOpen(true);
  }, []);

  useEffect(() => {
    if (pathname !== "/") return;
    if (!shouldShowWelcomeModal()) return;

    const handleScroll = (): void => {
      if (getHomeScrollProgress() >= SCROLL_TRIGGER_RATIO) {
        tryOpen();
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname, tryOpen]);

  useEffect(() => {
    const previousPath = previousPathRef.current;
    previousPathRef.current = pathname;

    if (isFirstPathEffectRef.current) {
      isFirstPathEffectRef.current = false;
      return;
    }

    if (previousPath === "/" && pathname !== "/") {
      tryOpen();
    }
  }, [pathname, tryOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  const close = useCallback(
    (permanent?: boolean): void => {
      dismissWelcome(permanent ?? dontShowAgain);
      setIsOpen(false);
    },
    [dontShowAgain]
  );

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === "Escape") close(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, close]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[110] flex items-end justify-center p-0 sm:items-center sm:p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          role="presentation"
        >
          <motion.button
            type="button"
            className="absolute inset-0 bg-[#0A1628]/55 backdrop-blur-[2px]"
            aria-label={t("dismiss")}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => close(false)}
          />

          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="welcome-modal-title"
            aria-describedby="welcome-modal-desc"
            initial={{ opacity: 0, y: 48 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 32 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              "relative z-10 w-full max-w-md overflow-hidden",
              "rounded-t-3xl border border-gray-100 bg-white shadow-2xl",
              "sm:rounded-2xl"
            )}
          >
            <div
              className="h-1.5 w-full bg-gradient-to-r from-brand-light via-brand to-brand-dark"
              aria-hidden="true"
            />

            <div className="relative px-5 pb-5 pt-4 sm:px-6 sm:pb-6 sm:pt-5">
              <button
                type="button"
                onClick={() => close(false)}
                className="absolute right-3 top-3 inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white/90 text-text-gray transition-colors hover:border-primary/30 hover:text-primary"
                aria-label={t("close")}
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>

              <div className="mb-4 pr-10">
                <BdoqLogo size="lg" className="mb-3" />
                <h2
                  id="welcome-modal-title"
                  className="font-amiri text-2xl font-bold text-primary-dark sm:text-[1.65rem]"
                >
                  {t("title")}
                </h2>
                <p
                  id="welcome-modal-desc"
                  className="mt-2 font-inter text-sm leading-relaxed text-text-gray"
                >
                  {t("subtitle")}
                </p>
              </div>

              <ul className="mb-5 space-y-2.5">
                {benefitKeys.map((key) => (
                  <li
                    key={key}
                    className="flex items-start gap-2.5 font-inter text-sm text-text-dark"
                  >
                    <CheckCircle2
                      className="mt-0.5 h-4 w-4 shrink-0 text-primary"
                      aria-hidden="true"
                    />
                    <span>{t(`benefits.${key}`)}</span>
                  </li>
                ))}
              </ul>

              <div className="space-y-2.5">
                <Link
                  href="/free-class"
                  onClick={() => close(true)}
                  className={cn(
                    "flex min-h-[48px] w-full items-center justify-center rounded-full",
                    "bg-[linear-gradient(135deg,#32C991,#0D9488)] font-inter text-sm font-semibold text-white",
                    "transition-all duration-300 hover:shadow-lg active:scale-[0.99]"
                  )}
                >
                  {t("primaryCta")}
                </Link>
                <Link
                  href="/courses"
                  onClick={() => close(false)}
                  className={cn(
                    "flex min-h-[44px] w-full items-center justify-center rounded-full",
                    "border-2 border-primary font-inter text-sm font-semibold text-primary",
                    "transition-colors hover:bg-primary hover:text-white"
                  )}
                >
                  {t("secondaryCta")}
                </Link>
                <button
                  type="button"
                  onClick={() => close(false)}
                  className="w-full py-2 font-inter text-sm font-medium text-text-gray transition-colors hover:text-primary"
                >
                  {t("dismiss")}
                </button>
              </div>

              <label className="mt-4 flex cursor-pointer items-center gap-2.5 border-t border-gray-100 pt-4">
                <input
                  type="checkbox"
                  checked={dontShowAgain}
                  onChange={(event) => setDontShowAgain(event.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <span className="font-inter text-xs text-text-gray">
                  {t("dontShowAgain")}
                </span>
              </label>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
