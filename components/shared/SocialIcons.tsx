"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import type { ISocialLink } from "@/lib/types";
import { getSocialIcon } from "@/lib/social";
import { cn } from "@/lib/cn";

type TooltipPlacement = "top" | "bottom";

interface ISocialIconLinkProps {
  link: ISocialLink;
  size?: "sm" | "md";
  className?: string;
  showTooltip?: boolean;
  tooltipPlacement?: TooltipPlacement;
}

export function SocialIconLink({
  link,
  size = "md",
  className,
  showTooltip = true,
  tooltipPlacement = "top",
}: ISocialIconLinkProps) {
  const Icon = getSocialIcon(link.icon);
  const sizeClass = size === "sm" ? "h-4 w-4" : "h-5 w-5";
  const [hovered, setHovered] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [anchorRect, setAnchorRect] = useState<DOMRect | null>(null);
  const wrapRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const updateRect = () => {
    if (!wrapRef.current) return;
    setAnchorRect(wrapRef.current.getBoundingClientRect());
  };

  useEffect(() => {
    if (!hovered) return;
    updateRect();
    window.addEventListener("scroll", updateRect, true);
    window.addEventListener("resize", updateRect);
    return () => {
      window.removeEventListener("scroll", updateRect, true);
      window.removeEventListener("resize", updateRect);
    };
  }, [hovered]);

  const gap = 8;
  const tooltipTop =
    anchorRect == null
      ? 0
      : tooltipPlacement === "bottom"
        ? anchorRect.bottom + gap
        : anchorRect.top - gap;
  const tooltipLeft =
    anchorRect == null ? 0 : anchorRect.left + anchorRect.width / 2;

  return (
    <span
      ref={wrapRef}
      className="relative inline-flex"
      onMouseEnter={() => {
        updateRect();
        setHovered(true);
      }}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => {
        updateRect();
        setHovered(true);
      }}
      onBlur={() => setHovered(false)}
    >
      {mounted
        ? createPortal(
            <AnimatePresence>
              {showTooltip && hovered && anchorRect ? (
                <motion.span
                  key={`social-tip-${link.icon}`}
                  role="tooltip"
                  className={cn(
                    "pointer-events-none fixed z-[9999] whitespace-nowrap rounded-[8px] px-2.5 py-1",
                    "bg-[var(--text-dark)] font-inter text-[11px] font-medium text-white",
                    "shadow-[0_8px_20px_-10px_rgba(26,26,46,0.55)]"
                  )}
                  style={{ left: tooltipLeft, top: tooltipTop }}
                  initial={{
                    opacity: 0,
                    x: "-50%",
                    y: tooltipPlacement === "bottom" ? -6 : 6,
                    scale: 0.94,
                  }}
                  animate={{
                    opacity: 1,
                    x: "-50%",
                    y: tooltipPlacement === "bottom" ? 0 : "-100%",
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    x: "-50%",
                    y: tooltipPlacement === "bottom" ? -4 : 4,
                    scale: 0.96,
                  }}
                  transition={{ type: "spring", stiffness: 480, damping: 28 }}
                >
                  {link.name}
                  <span
                    className={cn(
                      "absolute left-1/2 size-0 -translate-x-1/2",
                      tooltipPlacement === "bottom"
                        ? "bottom-full border-x-[5px] border-b-[6px] border-x-transparent border-b-[var(--text-dark)]"
                        : "top-full border-x-[5px] border-t-[6px] border-x-transparent border-t-[var(--text-dark)]"
                    )}
                    aria-hidden="true"
                  />
                </motion.span>
              ) : null}
            </AnimatePresence>,
            document.body
          )
        : null}

      <a
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={link.name}
        className={cn(
          "text-white/90 transition-colors duration-200 hover:text-white",
          className
        )}
      >
        <Icon className={sizeClass} aria-hidden="true" />
      </a>
    </span>
  );
}

interface ISocialIconRowProps {
  links: ISocialLink[];
  size?: "sm" | "md";
  className?: string;
  iconClassName?: string;
  showTooltip?: boolean;
  tooltipPlacement?: TooltipPlacement;
}

export function SocialIconRow({
  links,
  size = "md",
  className,
  iconClassName,
  showTooltip = true,
  tooltipPlacement = "top",
}: ISocialIconRowProps) {
  return (
    <div className={cn("relative z-[2] flex items-center gap-3", className)}>
      {links.map((link) => (
        <SocialIconLink
          key={link.icon}
          link={link}
          size={size}
          className={iconClassName}
          showTooltip={showTooltip}
          tooltipPlacement={tooltipPlacement}
        />
      ))}
    </div>
  );
}

interface IFreeTrialButtonProps {
  className?: string;
  size?: "sm" | "md";
  variant?: "solid" | "gradient";
  onClick?: () => void;
  fullLabel?: boolean;
}

export function FreeTrialButton({
  className,
  size = "md",
  variant = "solid",
  onClick,
  fullLabel = false,
}: IFreeTrialButtonProps) {
  const t = useTranslations("cta");
  const sizeClasses =
    size === "sm"
      ? "px-4 py-2 text-sm xl:px-6 xl:py-2.5"
      : "px-6 py-2.5 text-sm";

  const variantClasses =
    variant === "gradient"
      ? "bg-[linear-gradient(135deg,#32C991,#0D9488)] hover:shadow-lg hover:-translate-y-0.5"
      : "bg-primary hover:shadow-lg";

  return (
    <Link
      href="/free-class"
      onClick={onClick}
      className={cn(
        "inline-flex items-center justify-center rounded-[8px] font-semibold text-white transition-all duration-300",
        variantClasses,
        sizeClasses,
        className
      )}
    >
      {fullLabel ? (
        t("freeTrialClass")
      ) : (
        <>
          <span className="xl:hidden">{t("freeTrial")}</span>
          <span className="hidden xl:inline">{t("freeTrialClass")}</span>
        </>
      )}
    </Link>
  );
}
