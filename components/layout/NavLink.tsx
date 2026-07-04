"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { isNavLinkActive } from "@/lib/navActive";
import { useHeaderTheme } from "@/components/layout/HeaderThemeContext";
import { cn } from "@/lib/cn";

interface INavLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export function NavLink({ href, children, className, onClick }: INavLinkProps) {
  const pathname = usePathname();
  const isActive = isNavLinkActive(href, pathname);
  const { isOverlay } = useHeaderTheme();

  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "relative shrink-0 whitespace-nowrap rounded-full font-inter text-sm font-medium transition-all duration-200",
        "px-3 py-2 lg:px-2.5 xl:px-3.5",
        isOverlay
          ? "text-white/80 hover:bg-white/10 hover:text-white"
          : "text-[#374151] hover:bg-[var(--green-light)] hover:text-[var(--green-primary)]",
        isActive &&
          (isOverlay
            ? "bg-white/15 font-semibold text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.2)]"
            : "bg-white font-semibold text-[var(--green-primary)] shadow-sm ring-1 ring-[var(--green-primary)]/15"),
        className
      )}
      aria-current={isActive ? "page" : undefined}
    >
      {children}
      {isActive && !isOverlay ? (
        <span
          className="absolute -bottom-0.5 left-1/2 h-0.5 w-4 -translate-x-1/2 rounded-full bg-[var(--gold)]"
          aria-hidden="true"
        />
      ) : null}
    </Link>
  );
}

export function navLinkBase(isOverlay: boolean): string {
  return cn(
    "relative shrink-0 whitespace-nowrap rounded-full font-inter text-sm font-medium transition-all duration-200",
    "px-3 py-2 lg:px-2.5 xl:px-3.5",
    isOverlay
      ? "text-white/80 hover:bg-white/10 hover:text-white"
      : "text-[#374151] hover:bg-[var(--green-light)] hover:text-[var(--green-primary)]"
  );
}
