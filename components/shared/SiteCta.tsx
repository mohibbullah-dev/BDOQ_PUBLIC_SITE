import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export type SiteCtaVariant = "primary" | "secondary" | "ghost";
export type SiteCtaSize = "sm" | "md";

export interface ISiteCtaProps {
  href: string;
  children: ReactNode;
  variant?: SiteCtaVariant;
  size?: SiteCtaSize;
  className?: string;
  external?: boolean;
  onClick?: () => void;
}

const sizeClasses: Record<SiteCtaSize, string> = {
  sm: "px-6 py-2.5 text-sm",
  md: "px-8 py-3.5 text-sm sm:text-base",
};

const variantClasses: Record<SiteCtaVariant, string> = {
  primary:
    "bg-[linear-gradient(135deg,#32C991_0%,#CD443F_100%)] text-white hover:brightness-95",
  secondary:
    "border-2 border-primary/30 bg-white text-primary hover:border-primary/50 hover:bg-bg-light/60",
  ghost:
    "bg-transparent text-primary hover:text-primary-dark",
};

/** Unified public-site CTA — logo brand pair for primary */
export function SiteCta({
  href,
  children,
  variant = "primary",
  size = "md",
  className,
  external = false,
  onClick,
}: ISiteCtaProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-full font-body font-semibold",
    "transition-all duration-300",
    sizeClasses[size],
    variantClasses[variant],
    className
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClick}
        className={classes}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} onClick={onClick} className={classes}>
      {children}
    </Link>
  );
}
