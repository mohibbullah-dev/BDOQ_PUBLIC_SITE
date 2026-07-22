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
          <span
            className="h-px w-8 shrink-0 bg-gradient-to-r from-primary to-brand-red"
            aria-hidden="true"
          />
          <p
            className={cn(
              "section-eyebrow uppercase text-brand-red",
              isPage ? "text-sm" : "text-xs"
            )}
          >
            {eyebrow}
          </p>
          <span
            className="h-px w-8 shrink-0 bg-gradient-to-l from-primary to-brand-red"
            aria-hidden="true"
          />
        </div>
      )}

      <TitleTag
        className={cn(
          "font-playfair font-bold tracking-tight text-primary-dark",
          subtitle ? "mb-4" : "mb-0",
          isPage
            ? "text-4xl leading-[1.12] md:text-5xl lg:text-[3.25rem]"
            : "text-3xl leading-[1.15] md:text-4xl"
        )}
      >
        {title}
      </TitleTag>

      {subtitle && (
        <p
          className={cn(
            "font-body text-text-gray leading-relaxed",
            isPage ? "text-base md:text-lg" : "text-base",
            centered && "mx-auto max-w-2xl"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
