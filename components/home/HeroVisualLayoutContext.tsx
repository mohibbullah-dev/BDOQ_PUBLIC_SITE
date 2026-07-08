"use client";

import { createContext, useContext, type ReactNode } from "react";

export type HeroVisualLayoutType = "card" | "section";

const HeroVisualLayoutContext = createContext<HeroVisualLayoutType>("card");

export function HeroVisualLayoutProvider({
  layout,
  children,
}: {
  layout: HeroVisualLayoutType;
  children: ReactNode;
}) {
  return (
    <HeroVisualLayoutContext.Provider value={layout}>
      {children}
    </HeroVisualLayoutContext.Provider>
  );
}

export function useHeroVisualLayout(): HeroVisualLayoutType {
  return useContext(HeroVisualLayoutContext);
}
