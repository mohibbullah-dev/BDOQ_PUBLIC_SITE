"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

function TopProgressBarInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const completeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimers = useCallback((): void => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (completeTimerRef.current) {
      clearTimeout(completeTimerRef.current);
      completeTimerRef.current = null;
    }
  }, []);

  const start = useCallback((): void => {
    clearTimers();
    setVisible(true);
    setProgress(8);
    intervalRef.current = setInterval(() => {
      setProgress((current) => {
        if (current >= 88) return current;
        return current + Math.random() * 10;
      });
    }, 180);
  }, [clearTimers]);

  const complete = useCallback((): void => {
    clearTimers();
    setProgress(100);
    completeTimerRef.current = setTimeout(() => {
      setVisible(false);
      setProgress(0);
    }, 280);
  }, [clearTimers]);

  useEffect(() => {
    start();
    const frame = requestAnimationFrame(() => {
      complete();
    });
    return () => {
      cancelAnimationFrame(frame);
      clearTimers();
    };
  }, [pathname, searchParams, start, complete, clearTimers]);

  useEffect(() => {
    const handleClick = (event: MouseEvent): void => {
      const anchor = (event.target as Element).closest("a");
      if (!anchor?.href) return;

      const targetUrl = new URL(anchor.href, window.location.href);
      if (targetUrl.origin !== window.location.origin) return;
      if (anchor.target === "_blank" || anchor.hasAttribute("download")) return;

      const isSameRoute =
        targetUrl.pathname === window.location.pathname &&
        targetUrl.search === window.location.search;

      if (isSameRoute) return;
      start();
    };

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, [start]);

  if (!visible) return null;

  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-0 z-[200] h-[3px]"
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(progress)}
      aria-label="Page loading"
    >
      <div
        className={cn(
          "h-full bg-gradient-to-r from-brand-light via-brand to-brand-dark",
          "shadow-[0_0_10px_rgba(232,75,58,0.5)]",
          "transition-[width] duration-200 ease-out motion-reduce:transition-none"
        )}
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

export function TopProgressBar() {
  return (
    <Suspense fallback={null}>
      <TopProgressBarInner />
    </Suspense>
  );
}
