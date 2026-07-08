"use client";

import { useSiteHeaderTheme } from "@/lib/hooks/useSiteHeaderTheme";

/**
 * Pushes main content below the fixed header.
 * Home page uses immersive overlay — hero extends under the header instead.
 */
export function HeaderSpacer() {
  const { isHome } = useSiteHeaderTheme();

  if (isHome) {
    return null;
  }

  return (
    <div
      className="w-full shrink-0 min-h-[68px] md:min-h-[104px] lg:min-h-[172px]"
      aria-hidden="true"
    />
  );
}
