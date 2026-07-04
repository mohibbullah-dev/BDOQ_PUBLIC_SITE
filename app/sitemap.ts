import { getBlogSlugs } from "@/lib/blog";
import { getCourseSlugs } from "@/lib/courses";
import { getEbookSlugs } from "@/lib/ebooks";
import { SITE_URL } from "@/lib/constants";
import { getTeacherSlugs } from "@/lib/teachers";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages = [
    "",
    "/about",
    "/courses",
    "/teachers",
    "/pricing",
    "/blog",
    "/contact",
    "/login",
    "/privacy-policy",
    "/terms-of-use",
    "/free-class",
    "/student-admission",
    "/teacher-registration",
    "/gallery",
    "/reviews",
    "/resources/ebooks",
    "/resources/audio",
    "/resources/videos",
  ];

  const blogSlugs = await getBlogSlugs();
  const teacherSlugs = await getTeacherSlugs();
  const ebookSlugs = await getEbookSlugs();
  const courseSlugs = await getCourseSlugs();

  const staticEntries: MetadataRoute.Sitemap = staticPages.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" || path === "/blog" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.8,
  }));

  const blogEntries: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: `${SITE_URL}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const teacherEntries: MetadataRoute.Sitemap = teacherSlugs.map((slug) => ({
    url: `${SITE_URL}/teachers/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  const ebookEntries: MetadataRoute.Sitemap = ebookSlugs.map((slug) => ({
    url: `${SITE_URL}/resources/ebooks/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.65,
  }));

  const courseEntries: MetadataRoute.Sitemap = courseSlugs.map((slug) => ({
    url: `${SITE_URL}/courses/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  return [
    ...staticEntries,
    ...blogEntries,
    ...teacherEntries,
    ...ebookEntries,
    ...courseEntries,
  ];
}
