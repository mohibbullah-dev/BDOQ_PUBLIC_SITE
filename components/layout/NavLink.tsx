"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { isNavLinkActive } from "@/lib/navActive";
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

  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn("site-nav-item", isActive && "is-active", className)}
      aria-current={isActive ? "page" : undefined}
    >
      {children}
    </Link>
  );
}

/** Shared classes for desktop pill triggers (dropdown / more) */
export function navLinkBase(): string {
  return "site-nav-item";
}
