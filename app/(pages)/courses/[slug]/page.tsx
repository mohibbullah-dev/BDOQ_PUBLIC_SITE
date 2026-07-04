import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SITE_URL } from "@/lib/constants";
import { buildFreeClassSubjects } from "@/lib/formOptions";
import {
  getCourseBySlug,
  getCourseSlugs,
  getCourseDetailFromCourse,
  getCourses,
  getTeachersForCourse,
} from "@/lib/courses";
import { CourseDetailView } from "@/components/courses/CourseDetailView";

interface ICourseDetailPageProps {
  params: { slug: string };
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const slugs = await getCourseSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ICourseDetailPageProps): Promise<Metadata> {
  const course = await getCourseBySlug(params.slug);
  if (!course) return { title: "Course Not Found" };

  return {
    title: `${course.title} | Courses`,
    description: course.description,
    openGraph: {
      title: `${course.title} | BD Online Quran Academy`,
      description: course.description,
      url: `${SITE_URL}/courses/${course.slug}`,
    },
    alternates: {
      canonical: `${SITE_URL}/courses/${course.slug}`,
    },
  };
}

export default async function CourseDetailPage({
  params,
}: ICourseDetailPageProps) {
  const course = await getCourseBySlug(params.slug);
  if (!course) notFound();

  const [teachers, allCourses] = await Promise.all([
    getTeachersForCourse(course),
    getCourses(),
  ]);
  const subjectOptions = buildFreeClassSubjects(allCourses);

  return (
    <CourseDetailView
      course={course}
      detail={getCourseDetailFromCourse(course)}
      teachers={teachers}
      subjectOptions={subjectOptions}
    />
  );
}
