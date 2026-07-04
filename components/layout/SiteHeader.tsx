import type { ReactNode } from "react";
import { HeaderSpacer } from "@/components/layout/HeaderSpacer";

interface ISiteHeaderProps {
  children: ReactNode;
}

/**
 * Fixed site header with CSS spacer — no ResizeObserver / client JS.
 * Home page omits spacer so the hero can sit under the glass header.
 */
export function SiteHeader({ children }: ISiteHeaderProps) {
  return (
    <>
      <div className="fixed inset-x-0 top-0 z-50 w-full">{children}</div>
      <HeaderSpacer />
    </>
  );
}
