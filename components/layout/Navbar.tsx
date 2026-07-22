"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useTranslations } from "next-intl";
import {
  MAIN_NAV,
  MAIN_NAV_OVERFLOW,
  MAIN_NAV_PRIMARY,
} from "@/lib/navigation";
import type { INavItem } from "@/lib/navigation";
import { useNavLabel } from "@/lib/i18n/useNavLabel";
import { useHeaderTheme } from "@/components/layout/HeaderThemeContext";
import { BdoqLogo } from "@/components/brand/BdoqLogo";
import { LanguageToggle } from "@/components/shared/LanguageToggle";
import { FreeTrialButton } from "@/components/shared/SocialIcons";
import { NavDropdown } from "@/components/layout/NavDropdown";
import { NavLink } from "@/components/layout/NavLink";
import { NavMoreMenu } from "@/components/layout/NavMoreMenu";
import { MobileNav } from "@/components/layout/MobileNav";
import { SiteSearchTrigger } from "@/components/search/SiteSearchTrigger";
import { cn } from "@/lib/cn";

function renderNavItem(item: INavItem, label: (key: string) => string) {
  if (item.children) {
    return <NavDropdown key={item.labelKey} item={item} />;
  }

  return (
    <NavLink key={item.labelKey} href={item.href ?? "/"}>
      {label(item.labelKey)}
    </NavLink>
  );
}

export function Navbar() {
  const { isOverlay, isScrolled } = useHeaderTheme();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const label = useNavLabel();
  const tA11y = useTranslations("a11y");
  const tNav = useTranslations("nav");

  const closeMobile = (): void => {
    setIsMobileOpen(false);
  };

  const toggleMobile = (): void => {
    setIsMobileOpen((current) => !current);
  };

  return (
    <>
      <header
        className={cn(
          "site-navbar w-full transition-all duration-500 ease-out",
          isOverlay ? "site-navbar--overlay" : "site-navbar--solid",
          isScrolled && "site-navbar--scrolled"
        )}
      >
        <div className="site-container">
          <div
            className={cn(
              "grid grid-cols-[auto_1fr_auto] items-center gap-3 transition-all duration-500 lg:gap-5",
              isScrolled ? "h-[62px] lg:h-[68px]" : "h-[68px] lg:h-[76px]"
            )}
          >
            <Link
              href="/"
              className="group flex h-full max-h-full shrink-0 items-center py-1.5 lg:py-2"
              onClick={closeMobile}
            >
              <BdoqLogo
                layout="navbar"
                compact={isScrolled}
                priority
                className="transition-transform duration-300 group-hover:scale-[1.02]"
              />
            </Link>

            <nav
              className="hidden min-w-0 items-center justify-center gap-0.5 lg:flex xl:gap-1"
              aria-label={tA11y("mainNav")}
            >
              {MAIN_NAV_PRIMARY.map((item) => renderNavItem(item, label))}
              <NavMoreMenu items={MAIN_NAV_OVERFLOW} />
            </nav>

            <div className="hidden shrink-0 items-center justify-end gap-2 lg:flex xl:gap-2.5">
              <SiteSearchTrigger variant={isOverlay ? "overlay" : "desktop"} />
              <LanguageToggle
                className="shrink-0"
                variant={isOverlay ? "dark" : "light"}
              />
              <Link
                href="/login"
                className={cn(
                  "inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-[8px]",
                  "border px-3 py-1.5 text-sm font-semibold transition-all duration-300",
                  "xl:px-4 xl:py-2",
                  isOverlay
                    ? "border-white/35 text-white hover:border-white hover:bg-white/10"
                    : "border-[var(--green-primary)] bg-white text-[var(--green-primary)] hover:bg-[var(--green-primary)] hover:text-white"
                )}
              >
                {tNav("login")}
              </Link>
              <FreeTrialButton
                variant="gradient"
                size="sm"
                className={cn(
                  "shrink-0",
                  isOverlay && "ring-1 ring-white/20"
                )}
              />
            </div>

            <div className="col-start-3 flex items-center justify-end gap-1 justify-self-end lg:hidden">
              <SiteSearchTrigger variant={isOverlay ? "overlay" : "desktop"} />
              <button
                type="button"
                onClick={toggleMobile}
                className={cn(
                  "inline-flex h-11 w-11 items-center justify-center rounded-[8px] transition-colors",
                  isOverlay
                    ? "text-white hover:bg-white/10 active:bg-white/15"
                    : "text-[#374151] hover:bg-[var(--green-light)] hover:text-[var(--green-primary)]"
                )}
                aria-expanded={isMobileOpen}
                aria-label={
                  isMobileOpen ? tA11y("closeMenu") : tA11y("openMenu")
                }
              >
                {isMobileOpen ? (
                  <X className="h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileNav items={MAIN_NAV} isOpen={isMobileOpen} onClose={closeMobile} />
    </>
  );
}
