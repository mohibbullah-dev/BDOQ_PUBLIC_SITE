"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import type { IBlogHeading } from "@/lib/blog";
import { cn } from "@/lib/cn";

interface IBlogTableOfContentsProps {
  headings: IBlogHeading[];
}

export function BlogTableOfContents({ headings }: IBlogTableOfContentsProps) {
  const t = useTranslations("content.blog");
  const [activeId, setActiveId] = useState(headings[0]?.id ?? "");

  useEffect(() => {
    if (headings.length === 0) return;

    const elements = headings
      .map((heading) => document.getElementById(heading.id))
      .filter((element): element is HTMLElement => element !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target.id) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: "-80px 0px -65% 0px",
        threshold: [0, 0.25, 0.5, 1],
      }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav aria-label="Table of contents">
      <p className="mb-4 font-playfair text-lg font-bold text-primary-dark">
        {t("onThisPage")}
      </p>
      <ol className="relative space-y-0 border-l border-dashed border-primary/30 pl-0">
        {headings.map((heading, index) => {
          const isActive = activeId === heading.id;

          return (
            <li key={heading.id} className="relative pl-10">
              <span
                className={cn(
                  "absolute left-0 top-1.5 flex h-7 w-7 -translate-x-1/2 items-center justify-center rounded-full font-body text-[11px] font-bold",
                  isActive
                    ? "bg-primary text-white"
                    : "bg-bg-light text-primary ring-1 ring-primary/20"
                )}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <a
                href={`#${heading.id}`}
                className={cn(
                  "block py-2 font-body text-sm leading-snug transition-colors duration-200",
                  isActive
                    ? "font-semibold text-primary"
                    : "text-text-gray hover:text-primary"
                )}
              >
                {heading.text}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
