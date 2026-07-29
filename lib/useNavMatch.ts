"use client";

import { usePathname, useSearchParams } from "next/navigation";
import type { INavItem } from "@/lib/navigation";
import { isNavItemActive, isNavLinkActive } from "@/lib/navActive";

export function useNavLinkActive(href: string): boolean {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  return isNavLinkActive(href, pathname, searchParams);
}

export function useNavItemActive(item: INavItem): boolean {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  return isNavItemActive(item, pathname, searchParams);
}

export function useNavItemsAnyActive(items: INavItem[]): boolean {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  return items.some((item) => isNavItemActive(item, pathname, searchParams));
}
