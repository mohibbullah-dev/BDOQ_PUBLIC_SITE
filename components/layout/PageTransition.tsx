import type { ReactNode } from "react";

interface IPageTransitionProps {
  children: ReactNode;
}

/** Passthrough wrapper — page fade animations removed for faster navigation. */
export function PageTransition({ children }: IPageTransitionProps) {
  return <>{children}</>;
}
