"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import type { ISocialLink } from "@/lib/types";
import { getSocialIcon } from "@/lib/social";
import { cn } from "@/lib/cn";

interface ISocialIconLinkProps {
  link: ISocialLink;
  size?: "sm" | "md";
  className?: string;
}

export function SocialIconLink({
  link,
  size = "md",
  className,
}: ISocialIconLinkProps) {
  const Icon = getSocialIcon(link.icon);
  const sizeClass = size === "sm" ? "h-4 w-4" : "h-5 w-5";

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={link.name}
      className={cn(
        "text-white/90 hover:text-white transition-colors duration-200",
        className
      )}
    >
      <Icon className={sizeClass} aria-hidden="true" />
    </a>
  );
}

interface ISocialIconRowProps {
  links: ISocialLink[];
  size?: "sm" | "md";
  className?: string;
  iconClassName?: string;
}

export function SocialIconRow({
  links,
  size = "md",
  className,
  iconClassName,
}: ISocialIconRowProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      {links.map((link) => (
        <SocialIconLink
          key={link.icon}
          link={link}
          size={size}
          className={iconClassName}
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
      : "bg-primary hover:bg-primary-dark hover:shadow-lg";

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
