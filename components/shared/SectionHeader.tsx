import { cn } from "@/lib/cn";

export interface ISectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  titleAs?: "h1" | "h2";
  variant?: "section" | "page";
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  centered = false,
  titleAs: TitleTag = "h2",
  variant = "section",
}: ISectionHeaderProps) {
  const isPage = variant === "page";

  return (
    <div className={cn(centered && "text-center mx-auto max-w-3xl")}>
      {eyebrow && (
        <div
          className={cn(
            "flex items-center gap-3 mb-4",
            centered && "justify-center"
          )}
        >
          <span className="h-px w-8 bg-primary shrink-0" aria-hidden="true" />
          <p
            className={cn(
              "section-eyebrow font-inter font-bold uppercase tracking-widest text-primary",
              isPage ? "text-sm" : "text-xs"
            )}
          >
            {eyebrow}
          </p>
          <span className="h-px w-8 bg-primary shrink-0" aria-hidden="true" />
        </div>
      )}

      <TitleTag
        className={cn(
          "font-playfair font-bold text-primary-dark mb-4",
          isPage
            ? "text-4xl leading-tight md:text-5xl lg:text-[3.25rem]"
            : "text-3xl md:text-4xl"
        )}
      >
        {title}
      </TitleTag>

      {subtitle && (
        <p
          className={cn(
            "font-inter text-text-gray leading-relaxed",
            isPage ? "text-base md:text-lg" : "text-base"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
