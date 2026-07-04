"use client";

import { createContext, useContext, type ReactNode } from "react";
import {
  useSiteHeaderTheme,
  type SiteHeaderTheme,
} from "@/lib/hooks/useSiteHeaderTheme";

interface IHeaderThemeContextValue {
  theme: SiteHeaderTheme;
  isOverlay: boolean;
  isScrolled: boolean;
  isHome: boolean;
}

const HeaderThemeContext = createContext<IHeaderThemeContextValue | null>(null);

export function HeaderThemeProvider({ children }: { children: ReactNode }) {
  const value = useSiteHeaderTheme();

  return (
    <HeaderThemeContext.Provider value={value}>
      {children}
    </HeaderThemeContext.Provider>
  );
}

export function useHeaderTheme(): IHeaderThemeContextValue {
  const ctx = useContext(HeaderThemeContext);
  if (!ctx) {
    throw new Error("useHeaderTheme must be used within HeaderThemeProvider");
  }
  return ctx;
}
