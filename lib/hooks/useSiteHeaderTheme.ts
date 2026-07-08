"use client";

import { usePathname } from "next/navigation";
import { useScrollPosition } from "@/lib/hooks/useScrollPosition";

export type SiteHeaderTheme = "overlay" | "solid";

export function useSiteHeaderTheme(): {
  theme: SiteHeaderTheme;
  isOverlay: boolean;
  isScrolled: boolean;
  isHome: boolean;
} {
  const pathname = usePathname();
  const { isScrolled } = useScrollPosition({ threshold: 24 });
  const isHome = pathname === "/";
  const isOverlay = false;

  return {
    theme: isOverlay ? "overlay" : "solid",
    isOverlay,
    isScrolled,
    isHome,
  };
}
