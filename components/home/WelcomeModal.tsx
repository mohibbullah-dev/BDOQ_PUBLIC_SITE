"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { BdoqLogo } from "@/components/brand/BdoqLogo";
import { dismissWelcome, shouldShowWelcomeModal } from "@/lib/welcomeStorage";
import { cn } from "@/lib/cn";

const SCROLL_TRIGGER_RATIO = 0.8;

const benefitKeys = ["oneToOne", "global", "freeTrial"] as const;

const SOFT_BORDER = "border-[rgb(220_235_228/0.75)]";
const SOFT_SHADOW =
  "shadow-[0_0_0_1px_rgb(210_232_220/0.28),0_8px_28px_rgb(180_220_200/0.22),0_2px_8px_rgb(15_40_30/0.06)]";

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
          className="fixed inset-0 z-[110] flex items-end justify-center p-0 sm:items-center sm:p-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          role="presentation"
        >
          <motion.button
            type="button"
            className="absolute inset-0 bg-[#04140f]/50 backdrop-blur-[6px]"
            aria-label={t("dismiss")}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => close(false)}
          />

          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="welcome-modal-title"
            aria-describedby="welcome-modal-desc"
            initial={{ opacity: 0, y: 36, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{
              type: "spring",
              stiffness: 380,
              damping: 32,
              mass: 0.85,
            }}
            className={cn(
              "relative z-10 flex w-full flex-col overflow-hidden",
              "max-h-[min(78dvh,34rem)] max-w-[min(100%,22rem)]",
              "rounded-t-[8px] border bg-[linear-gradient(160deg,#fcfefd_0%,#ffffff_45%,#f0fbf6_100%)]",
              "sm:max-h-[min(82vh,36rem)] sm:max-w-sm sm:rounded-[8px]",
              SOFT_BORDER,
              SOFT_SHADOW
            )}
          >
            {/* Mobile drag hint */}
            <div
              className="flex justify-center pt-2 sm:hidden"
              aria-hidden="true"
            >
              <span className="h-1 w-10 rounded-full bg-primary/25" />
            </div>

            <div
              className="h-1 w-full bg-gradient-to-r from-[#32C991] to-[#CD443F]"
              aria-hidden="true"
            />

            <div className="relative overflow-y-auto overscroll-contain px-3.5 pb-[max(0.875rem,env(safe-area-inset-bottom))] pt-3 sm:px-5 sm:pb-5 sm:pt-4">
              <button
                type="button"
                onClick={() => close(false)}
                className="absolute right-2.5 top-2.5 inline-flex size-8 items-center justify-center rounded border border-[rgb(220_235_228/0.9)] bg-white/90 text-text-gray transition hover:border-primary/30 hover:text-primary sm:right-3 sm:top-3 sm:size-9"
                aria-label={t("close")}
              >
                <X className="size-4" aria-hidden="true" />
              </button>

              <div className="mb-3 pr-9 text-center sm:mb-4 sm:pr-10">
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08, duration: 0.35 }}
                  className="mb-2 flex justify-center sm:mb-3"
                >
                  <BdoqLogo size="sm" className="sm:hidden" />
                  <BdoqLogo size="md" className="hidden sm:block" />
                </motion.div>
                <motion.h2
                  id="welcome-modal-title"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.12, duration: 0.35 }}
                  className="font-amiri text-lg font-bold leading-snug text-primary-dark sm:text-xl"
                >
                  {t("title")}
                </motion.h2>
                <motion.p
                  id="welcome-modal-desc"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.16, duration: 0.35 }}
                  className="mx-auto mt-1.5 max-w-[20rem] font-body text-xs leading-relaxed text-text-gray sm:mt-2 sm:text-sm"
                >
                  {t("subtitle")}
                </motion.p>
              </div>

              <ul className="mb-3.5 space-y-1.5 sm:mb-4 sm:space-y-2">
                {benefitKeys.map((key, i) => (
                  <motion.li
                    key={key}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 0.2 + i * 0.06,
                      duration: 0.35,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="flex items-start gap-2.5 rounded border border-[rgb(220_235_228/0.65)] bg-white/80 px-2.5 py-2 sm:gap-3 sm:px-3 sm:py-2.5"
                  >
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded bg-[linear-gradient(135deg,rgb(50_201_145/0.14)_0%,rgb(13_148_136/0.1)_100%)] text-primary ring-1 ring-primary/20 sm:size-6">
                      <Check
                        className="size-3 sm:size-3.5"
                        strokeWidth={2.5}
                        aria-hidden
                      />
                    </span>
                    <span className="font-body text-[11px] leading-snug text-text-dark sm:text-sm">
                      {t(`benefits.${key}`)}
                    </span>
                  </motion.li>
                ))}
              </ul>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.35 }}
                className="space-y-2"
              >
                <Link
                  href="/free-class"
                  onClick={() => close(true)}
                  className={cn(
                    "flex min-h-[42px] w-full items-center justify-center rounded sm:min-h-[44px]",
                    "bg-[linear-gradient(145deg,#32C991_0%,#269B6F_55%,#0D9488_100%)]",
                    "font-body text-xs font-semibold text-white sm:text-sm",
                    "shadow-[0_6px_16px_-6px_rgb(38_155_111/0.45)]",
                    "transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_22px_-8px_rgb(38_155_111/0.5)]",
                    "active:translate-y-0 active:scale-[0.99]"
                  )}
                >
                  {t("primaryCta")}
                </Link>
                <Link
                  href="/courses"
                  onClick={() => close(false)}
                  className={cn(
                    "flex min-h-[40px] w-full items-center justify-center rounded sm:min-h-[42px]",
                    "border border-primary/80 bg-white/90 font-body text-xs font-semibold text-primary sm:text-sm",
                    "transition-all duration-300 hover:border-primary hover:bg-primary hover:text-white",
                    "active:scale-[0.99]"
                  )}
                >
                  {t("secondaryCta")}
                </Link>
                <button
                  type="button"
                  onClick={() => close(false)}
                  className="w-full py-1.5 font-body text-xs font-medium text-text-gray transition-colors hover:text-primary sm:text-sm"
                >
                  {t("dismiss")}
                </button>
              </motion.div>

              <label className="mt-3 flex cursor-pointer items-center gap-2 border-t border-[rgb(220_235_228/0.65)] pt-3 sm:mt-4 sm:gap-2.5 sm:pt-3.5">
                <input
                  type="checkbox"
                  checked={dontShowAgain}
                  onChange={(event) => setDontShowAgain(event.target.checked)}
                  className="size-3.5 rounded border-gray-300 text-primary focus:ring-primary/30 sm:size-4"
                />
                <span className="font-body text-[10px] text-text-gray sm:text-xs">
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
