"use client";

import { useEffect, useState } from "react";

interface IUseScrollPositionOptions {
  threshold?: number;
}

export function useScrollPosition(options: IUseScrollPositionOptions = {}): {
  scrollY: number;
  isScrolled: boolean;
} {
  const { threshold = 10 } = options;
  const [scrollY, setScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = (): void => {
      const currentY = window.scrollY;
      setScrollY(currentY);
      setIsScrolled(currentY > threshold);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [threshold]);

  return { scrollY, isScrolled };
}
