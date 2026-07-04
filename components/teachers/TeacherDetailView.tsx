import type { ReactNode } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Calendar,
  ChevronRight,
  Globe,
  GraduationCap,
  Home,
  Languages,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Sparkles,
} from "lucide-react";
import { TeacherAvatar } from "@/components/shared/TeacherAvatar";
import { CourseCard } from "@/components/shared/CourseCard";
import { TeacherCard } from "@/components/shared/TeacherCard";
import type { ICourse, ITeacher } from "@/lib/types";
import {
  getRelatedTeachers,
  getTeacherAbout,
  getTeacherAboutTitle,
  getTeacherContactEmail,
  getTeacherContactPhone,
  getTeacherCourses,
  getTeacherExperience,
  getTeacherHonorific,
  getTeacherLanguages,
  getTeacherLocation,
  getTeacherPersonalInfo,
  getTeacherQualifications,
  getTeacherSkills,
  getTeacherWhatsAppUrl,
} from "@/lib/teachers";
import { cn } from "@/lib/cn";

interface ITeacherDetailViewProps {
  teacher: ITeacher;
  allTeachers: ITeacher[];
  allCourses: ICourse[];
}

function ProfileSection({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: typeof BookOpen;
  children: ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:p-8">
      <div className="mb-5 flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F0FBF6] text-[#1B6B44]">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
        <h2 className="font-inter text-xl font-semibold text-[#0D4A2F]">
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li
          key={item}
          className="flex items-start gap-3 font-inter text-sm leading-relaxed text-[#1A1A2E]/85 md:text-base"
        >
          <span
            className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#1B6B44]"
            aria-hidden="true"
          />
          {item}
        </li>
      ))}
    </ul>
  );
}

export function TeacherDetailView({
  teacher,
  allTeachers,
  allCourses,
}: ITeacherDetailViewProps) {
  const honorific = getTeacherHonorific(teacher.gender);
  const courses = getTeacherCourses(teacher, allCourses);
  const relatedTeachers = getRelatedTeachers(teacher, allTeachers);
  const personalInfo = getTeacherPersonalInfo(teacher);
  const languages = getTeacherLanguages(teacher);

  return (
    <div className="bg-[#F0FBF6]">
      <section className="border-b border-[#1B6B44]/10 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-2 font-inter text-sm text-[#6B7280]">
              <li>
                <Link
                  href="/"
                  className="inline-flex items-center gap-1 transition-colors hover:text-[#1B6B44]"
                >
                  <Home className="h-4 w-4" aria-hidden="true" />
                  Home
                </Link>
              </li>
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
              <li>
                <Link
                  href="/teachers"
                  className="transition-colors hover:text-[#1B6B44]"
                >
                  Teachers
                </Link>
              </li>
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
              <li className="font-medium text-[#0D4A2F]">{teacher.name}</li>
            </ol>
          </nav>
        </div>
      </section>

      <section className="py-10 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[320px_minmax(0,1fr)] xl:grid-cols-[360px_minmax(0,1fr)] xl:gap-10">
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <div className="overflow-hidden rounded-3xl border border-[#1B6B44]/10 bg-white shadow-lg">
                <div className="bg-[linear-gradient(160deg,#F0FBF6,#E6F5EE)] px-6 py-8 text-center">
                  <TeacherAvatar
                    teacher={teacher}
                    context="detail"
                    avatarVariant={
                      teacher.gender === "female" ? "female" : "default"
                    }
                    size={128}
                    className="mx-auto shadow-md"
                  />
                  <h1 className="mt-5 font-inter text-2xl font-bold text-[#0D4A2F]">
                    {teacher.name}
                  </h1>
                  <p className="mt-2 font-inter text-sm font-medium text-[#1B6B44]">
                    {teacher.role}
                  </p>
                  <span className="mt-4 inline-flex items-center rounded-full bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-[#0D4A2F] shadow-sm">
                    {honorific} · BDOQ Academy
                  </span>
                </div>

                <div className="space-y-3 border-t border-gray-100 p-6">
                  <div className="flex items-start gap-3 rounded-2xl border border-[#1B6B44]/10 bg-[#F0FBF6]/70 px-4 py-3">
                    <MapPin
                      className="mt-0.5 h-5 w-5 shrink-0 text-[#1B6B44]"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="font-inter text-xs font-semibold uppercase tracking-wide text-[#6B7280]">
                        Location
                      </p>
                      <p className="font-inter text-sm font-medium text-[#1A1A2E]">
                        {getTeacherLocation(teacher)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 rounded-2xl border border-[#1B6B44]/10 bg-[#F0FBF6]/70 px-4 py-3">
                    <Mail
                      className="mt-0.5 h-5 w-5 shrink-0 text-[#1B6B44]"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="font-inter text-xs font-semibold uppercase tracking-wide text-[#6B7280]">
                        Email
                      </p>
                      <a
                        href={`mailto:${getTeacherContactEmail()}`}
                        className="font-inter text-sm font-medium text-[#1B6B44] hover:underline"
                      >
                        {getTeacherContactEmail()}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 rounded-2xl border border-[#1B6B44]/10 bg-[#F0FBF6]/70 px-4 py-3">
                    <Phone
                      className="mt-0.5 h-5 w-5 shrink-0 text-[#1B6B44]"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="font-inter text-xs font-semibold uppercase tracking-wide text-[#6B7280]">
                        Phone
                      </p>
                      <a
                        href={`tel:${getTeacherContactPhone()}`}
                        className="font-inter text-sm font-medium text-[#1B6B44] hover:underline"
                      >
                        {getTeacherContactPhone()}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 border-t border-gray-100 p-6">
                  <Link
                    href="/free-class"
                    className={cn(
                      "flex w-full items-center justify-center gap-2 rounded-full px-6 py-3",
                      "bg-[#1B6B44] font-inter text-sm font-semibold text-white",
                      "transition-all duration-300 hover:bg-[#0D4A2F] hover:shadow-lg"
                    )}
                  >
                    Book a Free Trial Class
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                  <a
                    href={getTeacherWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "flex w-full items-center justify-center gap-2 rounded-full border-2 border-[#1B6B44]",
                      "px-6 py-3 font-inter text-sm font-semibold text-[#1B6B44]",
                      "transition-all duration-300 hover:bg-[#1B6B44] hover:text-white"
                    )}
                  >
                    <MessageCircle className="h-4 w-4" aria-hidden="true" />
                    WhatsApp Us
                  </a>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3">
                {[
                  {
                    icon: Calendar,
                    label: "Experience",
                    value: getTeacherExperience(teacher).split(" ")[0] ?? "5+",
                  },
                  {
                    icon: Languages,
                    label: "Languages",
                    value: String(languages.length),
                  },
                  {
                    icon: Globe,
                    label: "Country",
                    value: teacher.country?.slice(0, 3) ?? "BD",
                  },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-2xl border border-white bg-white p-3 text-center shadow-sm"
                  >
                    <stat.icon
                      className="mx-auto h-4 w-4 text-[#1B6B44]"
                      aria-hidden="true"
                    />
                    <p className="mt-2 font-inter text-sm font-bold text-[#0D4A2F]">
                      {stat.value}
                    </p>
                    <p className="font-inter text-[10px] uppercase tracking-wide text-[#6B7280]">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </aside>

            <div className="space-y-6">
              <ProfileSection
                title={getTeacherAboutTitle(teacher)}
                icon={Sparkles}
              >
                <p className="font-inter text-base leading-relaxed text-[#1A1A2E]/85">
                  {getTeacherAbout(teacher)}
                </p>
              </ProfileSection>

              {personalInfo.length > 0 && (
                <ProfileSection title="Personal Information" icon={MapPin}>
                  <dl className="grid gap-4 sm:grid-cols-2">
                    {personalInfo.map((item) => (
                      <div
                        key={item.label}
                        className="rounded-2xl bg-[#F0FBF6] px-4 py-4"
                      >
                        <dt className="font-inter text-xs font-semibold uppercase tracking-wide text-[#6B7280]">
                          {item.label}
                        </dt>
                        <dd className="mt-1 font-inter text-sm font-medium text-[#1A1A2E]">
                          {item.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </ProfileSection>
              )}

              <ProfileSection
                title={`${honorific}'s Profile`}
                icon={GraduationCap}
              >
                <div className="space-y-8">
                  <div>
                    <h3 className="mb-3 font-inter text-sm font-semibold uppercase tracking-wide text-[#1B6B44]">
                      Educational Qualification
                    </h3>
                    <BulletList items={getTeacherQualifications(teacher)} />
                  </div>

                  <div>
                    <h3 className="mb-3 font-inter text-sm font-semibold uppercase tracking-wide text-[#1B6B44]">
                      Special Skills
                    </h3>
                    <BulletList items={getTeacherSkills(teacher)} />
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-2xl bg-[#F0FBF6] px-5 py-4">
                      <h3 className="font-inter text-sm font-semibold uppercase tracking-wide text-[#1B6B44]">
                        Experience
                      </h3>
                      <p className="mt-2 font-inter text-sm leading-relaxed text-[#1A1A2E]/85">
                        {getTeacherExperience(teacher)}
                      </p>
                    </div>
                    <div className="rounded-2xl bg-[#F0FBF6] px-5 py-4">
                      <h3 className="font-inter text-sm font-semibold uppercase tracking-wide text-[#1B6B44]">
                        Language Skills
                      </h3>
                      <p className="mt-2 font-inter text-sm leading-relaxed text-[#1A1A2E]/85">
                        {languages.join(", ")}
                      </p>
                    </div>
                  </div>
                </div>
              </ProfileSection>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-[#1B6B44]/10 bg-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="font-inter text-sm font-semibold uppercase tracking-wider text-[#1B6B44]">
                Courses
              </p>
              <h2 className="font-inter text-2xl font-semibold text-[#0D4A2F] md:text-3xl">
                All classes of {honorific}
              </h2>
            </div>
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 font-inter text-sm font-semibold text-[#1B6B44] hover:underline"
            >
              Browse all courses
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {courses.map((course) => (
              <CourseCard key={course.slug} course={course} />
            ))}
          </div>
        </div>
      </section>

      {relatedTeachers.length > 0 && (
        <section className="py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="mb-8 text-center font-inter text-2xl font-semibold text-[#0D4A2F]">
              More {teacher.gender === "female" ? "Female" : "Male"} Teachers
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {relatedTeachers.map((relatedTeacher) => (
                <TeacherCard
                  key={relatedTeacher.id}
                  teacher={relatedTeacher}
                  avatarVariant={
                    teacher.gender === "female" ? "female" : "default"
                  }
                />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="pb-16 md:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-3xl bg-[linear-gradient(135deg,#0D4A2F,#1B6B44)] px-6 py-10 text-center text-white md:px-12 md:py-14">
            <h2 className="font-playfair text-3xl font-bold md:text-4xl">
              Learn with {teacher.name.split(" ").slice(-1)[0]}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl font-inter text-base leading-relaxed text-white/85">
              Book a free trial class and experience one-to-one Quran learning
              with a qualified BDOQ Academy {honorific.toLowerCase()}.
            </p>
            <Link
              href="/free-class"
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-3 font-inter text-sm font-bold text-[#0D4A2F] transition-all duration-300 hover:scale-[1.03] hover:shadow-lg"
            >
              Start Free Trial
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
