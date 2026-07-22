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
      <p className="mb-3 font-body text-xs font-bold uppercase tracking-wider text-text-gray">
        {t("onThisPage")}
      </p>
      <ul className="space-y-1 border-l-2 border-[#E8FAF2] pl-3">
        {headings.map((heading) => {
          const isActive = activeId === heading.id;

          return (
            <li key={heading.id}>
              <a
                href={`#${heading.id}`}
                className={cn(
                  "block py-1.5 font-body text-sm leading-snug transition-colors duration-200",
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
      </ul>
    </nav>
  );
}
