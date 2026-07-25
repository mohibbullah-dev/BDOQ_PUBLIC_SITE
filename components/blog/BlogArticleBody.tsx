"use client";

import type { ReactNode } from "react";
import { CheckCircle2 } from "lucide-react";
import { slugifyBlogHeading } from "@/lib/blog";
import { cn } from "@/lib/cn";

function renderHeading(text: string): ReactNode {
  const id = slugifyBlogHeading(text);

  return (
    <h2
      id={id}
      className="scroll-mt-28 font-playfair text-xl font-bold text-primary-dark md:text-2xl"
    >
      {text}
    </h2>
  );
}

function renderContent(content: string): ReactNode {
  const blocks = content.split("\n\n");
  let isFirstParagraph = true;
  let tipIndex = 0;

  return blocks.map((block, index) => {
    if (block.startsWith("**")) {
      const [headingPart, ...rest] = block.split("**\n");
      const headingText = headingPart
        .replace(/^\*\*|\*\*$/g, "")
        .replace(/\*\*/g, "")
        .trim();

      return (
        <div key={index} className="space-y-4">
          {renderHeading(headingText)}
          {rest.length > 0 ? (
            <p className="font-body text-base leading-[1.85] text-text-dark/90 md:text-[17px]">
              {rest.join("\n")}
            </p>
          ) : null}
        </div>
      );
    }

    if (block.includes("\n- ") || block.startsWith("- ")) {
      const lines = block.split("\n");
      const intro = lines[0]?.startsWith("- ") ? null : lines[0];
      const items = lines.filter((line) => line.startsWith("- "));

      return (
        <div key={index} className="space-y-4">
          {intro ? (
            <p className="font-body text-base leading-[1.85] text-text-dark/90 md:text-[17px]">
              {intro}
            </p>
          ) : null}
          <ul className="space-y-4">
            {items.map((item) => {
              tipIndex += 1;
              const text = item.replace(/^- /, "");
              const [titlePart, ...descParts] = text.split(" — ");
              const hasSplit = descParts.length > 0;

              return (
                <li key={item} className="flex items-start gap-3.5">
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-bg-light text-primary">
                    <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    {hasSplit ? (
                      <>
                        <span className="block font-body text-base font-semibold text-primary-dark">
                          {tipIndex}. {titlePart}
                        </span>
                        <span className="mt-1 block font-body text-sm leading-relaxed text-text-gray md:text-base">
                          {descParts.join(" — ")}
                        </span>
                      </>
                    ) : (
                      <span className="font-body text-base leading-relaxed text-text-dark/90">
                        <span className="font-semibold text-primary">
                          {tipIndex}.{" "}
                        </span>
                        {text}
                      </span>
                    )}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      );
    }

    const paragraph = (
      <p
        key={index}
        className={cn(
          "font-body leading-[1.85] text-text-dark/90 md:text-[17px]",
          isFirstParagraph && "text-lg text-primary-dark/90 md:text-xl"
        )}
      >
        {block}
      </p>
    );

    isFirstParagraph = false;
    return paragraph;
  });
}

interface IBlogArticleBodyProps {
  content: string;
}

export function BlogArticleBody({ content }: IBlogArticleBodyProps) {
  return <div className="space-y-6 md:space-y-8">{renderContent(content)}</div>;
}
