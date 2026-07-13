"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Site-wide surface: crisp white page + scroll-linked brand linear washes
 * (same treatment as the home page, applied on every public route).
 */
export function SitePageSurface({ children }: { children: ReactNode }) {
  const surfaceRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.classList.add("site-page-body");
    const surface = surfaceRef.current;
    if (!surface) return;

    let frame = 0;

    const updateScroll = (): void => {
      frame = 0;
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      const progress =
        max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      const eased = progress * progress * (3 - 2 * progress);

      surface.style.setProperty("--site-scroll", eased.toFixed(4));

      const mint = Math.max(0, 1 - eased / 0.32);
      const cream =
        eased < 0.22
          ? Math.max(0, (eased - 0.08) / 0.14)
          : eased < 0.55
            ? Math.max(0, 1 - (eased - 0.22) / 0.33)
            : 0;
      const teal =
        eased < 0.48
          ? Math.max(0, (eased - 0.35) / 0.13)
          : eased < 0.78
            ? Math.max(0, 1 - (eased - 0.48) / 0.3)
            : 0;
      const gold = Math.max(0, (eased - 0.68) / 0.32);

      surface.style.setProperty("--wash-mint", mint.toFixed(3));
      surface.style.setProperty("--wash-cream", cream.toFixed(3));
      surface.style.setProperty("--wash-teal", teal.toFixed(3));
      surface.style.setProperty("--wash-gold", gold.toFixed(3));
    };

    const onScroll = (): void => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateScroll);
    };

    updateScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      document.body.classList.remove("site-page-body");
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={surfaceRef} className="site-page-surface">
      <div className="site-atmosphere" aria-hidden="true">
        <div className="site-atmosphere__base" />
        <div className="site-atmosphere__band site-atmosphere__band--mint" />
        <div className="site-atmosphere__band site-atmosphere__band--cream" />
        <div className="site-atmosphere__band site-atmosphere__band--teal" />
        <div className="site-atmosphere__band site-atmosphere__band--gold" />
        <div className="site-atmosphere__pattern" />
        <div className="site-atmosphere__edge site-atmosphere__edge--top" />
        <div className="site-atmosphere__edge site-atmosphere__edge--bottom" />
      </div>
      <div className="site-page-surface__content">{children}</div>
    </div>
  );
}
