import type { INavItem } from "@/lib/navigation";

export function isNavLinkActive(href: string, pathname: string): boolean {
  const [path] = href.split("#");
  const [basePath] = path.split("?");

  if (basePath === "/") {
    return pathname === "/";
  }

  return pathname === basePath || pathname.startsWith(`${basePath}/`);
}

export function isNavItemActive(item: INavItem, pathname: string): boolean {
  if (item.href) {
    return isNavLinkActive(item.href, pathname);
  }

  if (item.children) {
    return item.children.some((child) => isNavLinkActive(child.href, pathname));
  }

  return false;
}
