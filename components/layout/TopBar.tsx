"use client";

import { Star } from "lucide-react";
import { useTranslations } from "next-intl";
import { ACADEMY_INFO, SOCIAL_LINKS } from "@/lib/constants";
import { TOPBAR_SOCIAL_ORDER } from "@/lib/navigation";
import { getSocialIcon, orderSocialLinks } from "@/lib/social";
import { cn } from "@/lib/cn";

function TopBarSocialIcons() {
  const links = orderSocialLinks(SOCIAL_LINKS, TOPBAR_SOCIAL_ORDER);

  return (
    <div className="flex items-center gap-1.5">
      {links.map((link) => {
        const Icon = getSocialIcon(link.icon);
        return (
          <a
            key={link.icon}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.name}
            className={cn(
              "flex h-7 w-7 items-center justify-center rounded-full transition-all duration-300",
              "border border-[var(--green-primary)]/25 text-[var(--green-dark)] hover:border-[var(--gold)] hover:bg-[var(--gold)]/10 hover:text-[var(--gold)]"
            )}
          >
            <Icon className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        );
      })}
    </div>
  );
}

export function TopBar() {
  const t = useTranslations("topbar");
  const tA11y = useTranslations("a11y");

  return (
    <div
      className="site-topbar site-topbar--solid hidden md:block"
      role="region"
      aria-label={tA11y("announcement")}
    >
      <div className="site-container flex h-9 items-center justify-between gap-4">
        <p className="flex min-w-0 items-center gap-2 text-[12px] font-medium leading-none tracking-wide text-[var(--green-dark)]">
          <span className="relative flex h-2 w-2 shrink-0" aria-hidden="true">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--gold)] opacity-40" />
            <Star className="relative h-2 w-2 fill-[var(--gold)] text-[var(--gold)]" />
          </span>
          <span className="truncate">{t("announcement")}</span>
        </p>

        <div className="flex shrink-0 items-center gap-3">
          <div className="flex items-center gap-2.5 text-[12px] leading-none text-[var(--text-gray)]">
            <a
              href={`tel:${ACADEMY_INFO.contactBD.replace(/\s/g, "")}`}
              className="inline-flex items-center gap-1 whitespace-nowrap transition-colors hover:text-[var(--gold)]"
            >
              <span aria-hidden="true">🇧🇩</span>
              <span>{ACADEMY_INFO.contactBD}</span>
            </a>
            <span className="text-[var(--green-primary)]/30" aria-hidden="true">
              ·
            </span>
            <a
              href={`tel:${ACADEMY_INFO.contactEG.replace(/\s/g, "")}`}
              className="inline-flex items-center gap-1 whitespace-nowrap transition-colors hover:text-[var(--gold)]"
            >
              <span aria-hidden="true">🇪🇬</span>
              <span>{ACADEMY_INFO.contactEG}</span>
            </a>
          </div>

          <span
            className="h-3.5 w-px bg-[var(--green-primary)]/20"
            aria-hidden="true"
          />

          <TopBarSocialIcons />
        </div>
      </div>
    </div>
  );
}
