import type { ReactNode } from "react";
import { slugifyBlogHeading } from "@/lib/blog";
import { cn } from "@/lib/cn";

function renderHeading(text: string): ReactNode {
  const id = slugifyBlogHeading(text);

  return (
    <h2
      id={id}
      className="scroll-mt-28 font-inter text-xl font-semibold text-primary-dark md:text-2xl"
    >
      <span
        className="mr-2 inline-block h-6 w-1 rounded-full bg-[var(--gold)] align-middle"
        aria-hidden="true"
      />
      {text}
    </h2>
  );
}

function renderContent(content: string): ReactNode {
  const blocks = content.split("\n\n");
  let isFirstParagraph = true;

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
          {rest.length > 0 && (
            <p className="font-inter text-base leading-[1.85] text-[#1A1A2E]/90 md:text-[17px]">
              {rest.join("\n")}
            </p>
          )}
        </div>
      );
    }

    if (block.includes("\n- ")) {
      const [intro, ...items] = block.split("\n");
      return (
        <div key={index} className="space-y-4">
          {intro && (
            <p className="font-inter text-base leading-[1.85] text-[#1A1A2E]/90 md:text-[17px]">
              {intro}
            </p>
          )}
          <ul className="space-y-3 rounded-2xl border border-[#E8F5EE] bg-[#F0FBF6]/60 p-5">
            {items.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 font-inter text-base leading-relaxed text-[#1A1A2E]/90"
              >
                <span
                  className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary"
                  aria-hidden="true"
                />
                {item.replace(/^- /, "")}
              </li>
            ))}
          </ul>
        </div>
      );
    }

    const paragraph = (
      <p
        key={index}
        className={cn(
          "font-inter leading-[1.85] text-[#1A1A2E]/90 md:text-[17px]",
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
