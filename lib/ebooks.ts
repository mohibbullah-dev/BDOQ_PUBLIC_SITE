import { EBOOKS } from "@/lib/constants";
import type { IEbook } from "@/lib/types";

export { getEbookSlugs, getEbookBySlug } from "@/lib/resources";

export function getRelatedEbooks(
  book: IEbook,
  allEbooks: IEbook[] = EBOOKS,
  limit = 3
): IEbook[] {
  return allEbooks
    .filter(
      (item) => item.category === book.category && item.id !== book.id
    )
    .slice(0, limit);
}

export function getEbookPdfUrl(book: IEbook): string {
  return book.pdfUrl || book.downloadUrl || "";
}

export function triggerEbookDownload(book: IEbook): void {
  const url = getEbookPdfUrl(book);
  if (!url) return;

  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `${book.slug}.pdf`;
  anchor.rel = "noopener noreferrer";
  anchor.target = "_blank";
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
}
