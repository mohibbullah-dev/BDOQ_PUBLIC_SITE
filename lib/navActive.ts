import type { INavItem } from "@/lib/navigation";

function toSearchParams(
  input: URLSearchParams | string | null | undefined
): URLSearchParams {
  if (input instanceof URLSearchParams) return input;
  if (typeof input === "string") return new URLSearchParams(input);
  return new URLSearchParams();
}

function queryParamsMatch(
  hrefQuery: string | undefined,
  current: URLSearchParams
): boolean {
  if (!hrefQuery) return true;

  const expected = new URLSearchParams(hrefQuery);
  const keys = Array.from(expected.keys());
  for (let i = 0; i < keys.length; i += 1) {
    const key = keys[i];
    if (current.get(key) !== expected.get(key)) return false;
  }
  return true;
}

export function isNavLinkActive(
  href: string,
  pathname: string,
  searchParams?: URLSearchParams | string | null
): boolean {
  const [pathPart] = href.split("#");
  const [basePath, hrefQuery] = pathPart.split("?");

  if (basePath === "/") {
    if (pathname !== "/") return false;
    return queryParamsMatch(hrefQuery, toSearchParams(searchParams));
  }

  const pathMatches =
    pathname === basePath || pathname.startsWith(`${basePath}/`);

  if (!pathMatches) return false;

  return queryParamsMatch(hrefQuery, toSearchParams(searchParams));
}

export function isNavItemActive(
  item: INavItem,
  pathname: string,
  searchParams?: URLSearchParams | string | null
): boolean {
  if (item.href) {
    return isNavLinkActive(item.href, pathname, searchParams);
  }

  if (item.children) {
    return item.children.some((child) =>
      isNavLinkActive(child.href, pathname, searchParams)
    );
  }

  return false;
}
