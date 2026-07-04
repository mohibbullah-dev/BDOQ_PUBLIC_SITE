import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SITE_URL } from "@/lib/constants";
import { getCourses } from "@/lib/courses";
import {
  getAllTeachers,
  getTeacherBySlug,
  getTeacherSlugs,
} from "@/lib/teachers";
import { TeacherDetailView } from "@/components/teachers/TeacherDetailView";

interface ITeacherDetailPageProps {
  params: { slug: string };
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const slugs = await getTeacherSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ITeacherDetailPageProps): Promise<Metadata> {
  const teacher = await getTeacherBySlug(params.slug);

  if (!teacher) {
    return { title: "Teacher Not Found" };
  }

  return {
    title: `${teacher.name} | Teachers`,
    description: `${teacher.role} at BD Online Quran Academy. ${teacher.bio}`,
    keywords: [
      teacher.name,
      teacher.role.toLowerCase(),
      "quran teacher",
      "BDOQ Academy",
      teacher.country?.toLowerCase() ?? "bangladesh",
    ],
    openGraph: {
      title: `${teacher.name} | BD Online Quran Academy`,
      description: teacher.bio,
      url: `${SITE_URL}/teachers/${teacher.slug}`,
      type: "profile",
    },
    alternates: {
      canonical: `${SITE_URL}/teachers/${teacher.slug}`,
    },
  };
}

export default async function TeacherDetailPage({
  params,
}: ITeacherDetailPageProps) {
  const [teacher, allTeachers, allCourses] = await Promise.all([
    getTeacherBySlug(params.slug),
    getAllTeachers(),
    getCourses(),
  ]);

  if (!teacher) {
    notFound();
  }

  return (
    <TeacherDetailView
      teacher={teacher}
      allTeachers={allTeachers}
      allCourses={allCourses}
    />
  );
}
