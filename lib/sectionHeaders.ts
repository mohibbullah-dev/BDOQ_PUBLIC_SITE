import { apiFetch } from "./api";
import type { ISectionHeaderContent } from "./types";
import type { SectionHeaderKey, SectionHeadersMap } from "./sectionHeaderKeys";

const SECTION_HEADERS_REVALIDATE = 3600;

interface IApiSectionHeadersResponse {
  success: boolean;
  data: {
    headers: Array<ISectionHeaderContent & { sectionKey: string }>;
  };
}

export async function getSectionHeaders(
  locale: string,
  keys?: SectionHeaderKey[]
): Promise<SectionHeadersMap> {
  try {
    const params = new URLSearchParams({ locale });
    if (keys && keys.length > 0) {
      params.set("keys", keys.join(","));
    }
    const response = await apiFetch<IApiSectionHeadersResponse>(
      `/public/section-headers?${params.toString()}`,
      { next: { revalidate: SECTION_HEADERS_REVALIDATE } }
    );

    const headers = response.data?.headers ?? [];
    if (headers.length === 0) return {};

    return Object.fromEntries(
      headers.map((header) => [
        header.sectionKey as SectionHeaderKey,
        {
          eyebrow: header.eyebrow,
          title: header.title,
          subtitle: header.subtitle,
          titleHighlight: header.titleHighlight,
          titleAccent: header.titleAccent,
          intro: header.intro,
        },
      ])
    ) as SectionHeadersMap;
  } catch {
    return {};
  }
}

export function pickSectionHeader(
  map: SectionHeadersMap,
  key: SectionHeaderKey
): ISectionHeaderContent | undefined {
  return map[key];
}
