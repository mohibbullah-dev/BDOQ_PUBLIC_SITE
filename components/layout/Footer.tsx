import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import {
  BookOpen,
  CalendarClock,
  ChevronRight,
  Globe2,
  GraduationCap,
  Headset,
  Link2,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
} from "lucide-react";
import { getTranslations } from "next-intl/server";
import { BdoqLogo } from "@/components/brand/BdoqLogo";
import { WhatsappIcon } from "@/components/shared/SocialBrandIcons";
import { getCourses } from "@/lib/courses";
import {
  ACADEMY_INFO,
  COURSES,
  SOCIAL_LINKS,
  WHATSAPP_URL,
} from "@/lib/constants";
import { FOOTER_OTHER_LINKS, FOOTER_SOCIAL_ORDER } from "@/lib/navigation";
import { orderSocialLinks } from "@/lib/social";
import { SocialIconRow } from "@/components/shared/SocialIcons";
import { cn } from "@/lib/cn";

const FOOTER_BG = "/images/islamic-footer-bg.jpg";

function ColumnHeading({
  icon: Icon,
  children,
}: {
  icon: LucideIcon;
  children: ReactNode;
}) {
  return (
    <h3 className="mb-4 flex items-center gap-2.5 font-inter text-base font-semibold text-[var(--green-dark)]">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[8px] bg-[var(--green-light)] text-[var(--green-primary)]">
        <Icon className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
      </span>
      {children}
    </h3>
  );
}

export async function Footer() {
  const tFooter = await getTranslations("footer");
  const tNav = await getTranslations("nav");
  const tAcademy = await getTranslations("academy");
  const tCourses = await getTranslations("courses");

  const apiCourses = await getCourses();
  const popularCourses =
    apiCourses.length > 0 ? apiCourses.slice(0, 6) : COURSES.slice(0, 6);
  const socialLinks = orderSocialLinks(SOCIAL_LINKS, FOOTER_SOCIAL_ORDER);
  const missionLines = tAcademy("mission")
    .split(". ")
    .slice(0, 2)
    .map((line) => (line.endsWith(".") ? line : `${line}.`))
    .join(" ");

  const trustItems = [
    { icon: GraduationCap, labelKey: "trustTeachers" as const },
    { icon: ShieldCheck, labelKey: "trustSafe" as const },
    { icon: CalendarClock, labelKey: "trustFlexible" as const },
    { icon: Globe2, labelKey: "trustGlobal" as const },
  ];

  return (
    <footer className="relative overflow-hidden bg-[#F3F8F4] text-[var(--text-dark)]">
      {/* Islamic illustration background — effective but readable */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        aria-hidden="true"
      >
        <Image
          src={FOOTER_BG}
          alt=""
          fill
          className="object-cover object-[center_bottom] opacity-[0.55] sm:object-center sm:opacity-[0.6]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#F7FBF8]/75 via-[#F3F8F4]/55 to-[#F3F8F4]/85" />
      </div>

      {/* Top — brand + link columns */}
      <div className="site-container relative z-[1] py-12 md:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8 xl:gap-10">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="group mb-5 inline-block">
              <BdoqLogo
                size="xl"
                className="transition-opacity duration-300 group-hover:opacity-90"
              />
            </Link>
            <p className="mb-2 font-inter text-sm font-semibold text-[var(--green-dark)]">
              {tAcademy("tagline")}
            </p>
            <p className="mb-5 max-w-sm font-inter text-sm leading-relaxed text-[var(--text-gray)]">
              {missionLines}
            </p>
            <SocialIconRow
              links={socialLinks}
              className="flex-wrap gap-2.5"
              iconClassName={cn(
                "flex h-9 w-9 items-center justify-center rounded-[8px]",
                "border border-[var(--green-primary)]/20 bg-white/95 text-[var(--green-dark)] shadow-sm",
                "transition-all duration-300 hover:border-[var(--green-primary)] hover:bg-[var(--green-primary)] hover:text-white"
              )}
            />
          </div>

          <div>
            <ColumnHeading icon={BookOpen}>
              {tFooter("popularCourses")}
            </ColumnHeading>
            <ul className="space-y-2.5">
              {popularCourses.map((course) => (
                <li key={course.slug}>
                  <Link
                    href={`/courses/${course.slug}`}
                    className="group inline-flex items-start gap-1.5 font-inter text-sm text-[var(--text-gray)] transition-colors hover:text-[var(--green-primary)]"
                  >
                    <ChevronRight
                      className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--green-primary)] opacity-80 transition-transform group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                    <span>{tCourses(course.slug)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <ColumnHeading icon={Link2}>{tFooter("otherLinks")}</ColumnHeading>
            <ul className="space-y-2.5">
              {FOOTER_OTHER_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-1.5 font-inter text-sm text-[var(--text-gray)] transition-colors hover:text-[var(--green-primary)]"
                  >
                    <ChevronRight
                      className="h-3.5 w-3.5 shrink-0 text-[var(--green-primary)] opacity-80 transition-transform group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                    {tNav(link.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <ColumnHeading icon={Phone}>{tFooter("contactUs")}</ColumnHeading>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5 font-inter text-sm text-[var(--text-gray)]">
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-[8px] bg-[var(--green-light)] text-[var(--green-primary)]">
                  <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
                <span className="pt-1">{ACADEMY_INFO.address}</span>
              </li>
              <li>
                <a
                  href={`mailto:${ACADEMY_INFO.email}`}
                  className="flex items-center gap-2.5 font-inter text-sm text-[var(--text-gray)] transition-colors hover:text-[var(--green-primary)]"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[8px] bg-[var(--green-light)] text-[var(--green-primary)]">
                    <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                  <span>{ACADEMY_INFO.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${ACADEMY_INFO.footerMobile.replace(/\s/g, "")}`}
                  className="flex items-center gap-2.5 font-inter text-sm text-[var(--text-gray)] transition-colors hover:text-[var(--green-primary)]"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[8px] bg-[var(--green-light)] text-[var(--green-primary)]">
                    <Phone className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                  <span>{ACADEMY_INFO.footerMobile}</span>
                </a>
              </li>
              <li>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 font-inter text-sm text-[var(--text-gray)] transition-colors hover:text-[var(--green-primary)]"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[8px] bg-[var(--green-light)] text-[#25D366]">
                    <WhatsappIcon className="h-3.5 w-3.5" />
                  </span>
                  <span>
                    {tFooter("whatsapp")} {ACADEMY_INFO.whatsapp}
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Trust ribbon */}
        <div
          className={cn(
            "mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-[8px] border border-[var(--green-primary)]/15 bg-[var(--green-primary)]/10",
            "sm:grid-cols-2 lg:grid-cols-4",
            "shadow-[0_10px_32px_-14px_rgba(50,201,145,0.28)]"
          )}
        >
          {trustItems.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.labelKey}
                className="flex items-center gap-3 bg-white/95 px-5 py-4 backdrop-blur-sm"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[8px] bg-[var(--green-light)] text-[var(--green-primary)]">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <p className="font-inter text-sm font-semibold leading-snug text-[var(--green-dark)]">
                  {tFooter(item.labelKey)}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Dark band — help + office */}
      <div className="relative z-[1] bg-[var(--teal)] text-white">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.1]"
          style={{
            backgroundImage: "var(--islamic-pattern)",
            backgroundSize: "60px 60px",
          }}
          aria-hidden="true"
        />
        <div className="site-container relative z-[1] grid gap-8 py-10 sm:grid-cols-2 lg:gap-12">
          <div className="flex gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[8px] bg-white/15">
              <Headset className="h-6 w-6" aria-hidden="true" />
            </span>
            <div>
              <h3 className="font-inter text-lg font-semibold">
                {tFooter("needHelp")}
              </h3>
              <p className="mt-1 max-w-sm font-inter text-sm text-white/80">
                {tFooter("needHelpDesc")}
              </p>
              <a
                href={`tel:${ACADEMY_INFO.contactBD.replace(/\s/g, "")}`}
                className="mt-3 inline-flex items-center gap-2 font-inter text-xl font-bold tracking-tight transition-colors hover:text-white/90"
              >
                <Phone className="h-5 w-5 opacity-80" aria-hidden="true" />
                {ACADEMY_INFO.contactBD}
              </a>
              <a
                href={`mailto:${ACADEMY_INFO.email}`}
                className="mt-2 flex items-center gap-2 font-inter text-sm text-white/85 transition-colors hover:text-white"
              >
                <Mail className="h-4 w-4 opacity-80" aria-hidden="true" />
                {ACADEMY_INFO.email}
              </a>
            </div>
          </div>

          <div className="flex gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[8px] bg-white/15">
              <MapPin className="h-6 w-6" aria-hidden="true" />
            </span>
            <div>
              <h3 className="font-inter text-lg font-semibold">
                {tFooter("ourOffice")}
              </h3>
              <p className="mt-2 flex items-start gap-2 font-inter text-sm leading-relaxed text-white/85">
                <MapPin
                  className="mt-0.5 h-4 w-4 shrink-0 opacity-80"
                  aria-hidden="true"
                />
                {ACADEMY_INFO.address}
              </p>
              <p className="mt-2 flex items-center gap-2 font-inter text-sm text-white/75">
                <Phone className="h-4 w-4 opacity-80" aria-hidden="true" />
                EG: {ACADEMY_INFO.contactEG}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="relative z-[1] bg-[#0A6B62] text-white/85">
        <div className="site-container flex flex-col items-center justify-between gap-3 py-4 sm:flex-row">
          <p className="text-center font-inter text-xs sm:text-left sm:text-sm">
            {tFooter("copyright")}
          </p>
          <div className="flex items-center gap-3 font-inter text-xs sm:text-sm">
            <Link
              href="/privacy-policy"
              className="transition-colors hover:text-white"
            >
              {tNav("privacyPolicy")}
            </Link>
            <span className="text-white/40" aria-hidden="true">
              |
            </span>
            <Link
              href="/terms-of-use"
              className="transition-colors hover:text-white"
            >
              {tNav("termsOfUse")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
