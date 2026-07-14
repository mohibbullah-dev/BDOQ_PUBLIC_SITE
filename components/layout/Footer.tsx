import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import {
  Award,
  BookOpen,
  Clock3,
  GraduationCap,
  Headset,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { getTranslations } from "next-intl/server";
import { BdoqLogo } from "@/components/brand/BdoqLogo";
import { SocialIconRow } from "@/components/shared/SocialIcons";
import { FooterDarkBand } from "@/components/layout/footer/FooterDarkBand";
import { FooterFeatureBar } from "@/components/layout/footer/FooterFeatureBar";
import { FooterNavColumns } from "@/components/layout/footer/FooterNavColumns";
import {
  ACADEMY_INFO,
  COURSES,
  SOCIAL_LINKS,
} from "@/lib/constants";
import { getCourses } from "@/lib/courses";
import { FOOTER_SOCIAL_ORDER } from "@/lib/navigation";
import { orderSocialLinks } from "@/lib/social";
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
    <h3 className="mb-4 flex items-center gap-2.5 font-inter text-sm font-bold uppercase tracking-wide text-[var(--green-dark)] md:text-base">
      <span
        className={cn(
          "flex size-8 shrink-0 items-center justify-center rounded-[8px]",
          "bg-[linear-gradient(135deg,#E8FAF2_0%,#ffffff_55%,#F0FBF6_100%)]",
          "text-[var(--green-primary)] ring-1 ring-[var(--green-primary)]/15"
        )}
      >
        <Icon className="size-4" strokeWidth={2} aria-hidden="true" />
      </span>
      {children}
    </h3>
  );
}

export async function Footer() {
  const tFooter = await getTranslations("footer");
  const tNav = await getTranslations("nav");
  const tCta = await getTranslations("cta");
  const tCourses = await getTranslations("courses");

  const apiCourses = await getCourses();
  const popularCourses =
    apiCourses.length > 0 ? apiCourses.slice(0, 5) : COURSES.slice(0, 5);
  const socialLinks = orderSocialLinks(SOCIAL_LINKS, FOOTER_SOCIAL_ORDER);

  const navColumns = [
    {
      id: "explore",
      label: tFooter("explore"),
      icon: "compass" as const,
      links: [
        { href: "/about", label: tNav("about") },
        { href: "/free-class", label: tCta("freeTrialClass") },
        { href: "/teachers", label: tNav("teachers") },
        { href: "/pricing", label: tNav("pricing") },
        { href: "/contact", label: tNav("contact") },
      ],
    },
    {
      id: "courses",
      label: tFooter("courses"),
      icon: "bookOpen" as const,
      links: popularCourses.map((course) => ({
        href: `/courses/${course.slug}`,
        label: tCourses(course.slug),
      })),
    },
    {
      id: "resources",
      label: tFooter("resources"),
      icon: "fileText" as const,
      links: [
        { href: "/blog", label: tNav("blog") },
        { href: "/resources/ebooks", label: tNav("ebooks") },
        { href: "/resources/audio", label: tNav("audio") },
        { href: "/resources/videos", label: tNav("videos") },
        { href: "/gallery", label: tNav("gallery") },
      ],
    },
  ];

  const features = [
    {
      icon: GraduationCap,
      title: tFooter("trustTeachers"),
      desc: tFooter("trustTeachersDesc"),
    },
    {
      icon: BookOpen,
      title: tFooter("trustFlexible"),
      desc: tFooter("trustFlexibleDesc"),
    },
    {
      icon: Award,
      title: tFooter("trustCertified"),
      desc: tFooter("trustCertifiedDesc"),
    },
    {
      icon: Headset,
      title: tFooter("trustSupport"),
      desc: tFooter("trustSupportDesc"),
    },
  ];

  return (
    <footer className="relative overflow-hidden bg-[#F7F9F6] text-[var(--text-dark)]">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[min(72%,520px)]"
        aria-hidden="true"
      >
        <Image
          src={FOOTER_BG}
          alt=""
          fill
          className="object-cover object-[center_bottom] opacity-[0.35] sm:opacity-40"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#F7F9F6_0%,rgb(247_249_246/0.75)_42%,#F7F9F6_100%)]" />
        <Image
          src="/brand/footer-arch.svg"
          alt=""
          width={320}
          height={180}
          className="absolute -left-6 bottom-8 w-[min(42vw,280px)] opacity-90"
        />
        <div
          className="absolute inset-y-0 right-0 w-[min(46vw,360px)] opacity-[0.07]"
          style={{
            backgroundImage: 'url("/brand/islamic-geo-pattern.svg")',
            backgroundSize: "72px 72px",
          }}
        />
        <Image
          src="/brand/footer-lantern.svg"
          alt=""
          width={40}
          height={100}
          className="absolute right-10 top-6 hidden w-9 opacity-80 lg:block"
        />
        <Image
          src="/brand/footer-lantern.svg"
          alt=""
          width={48}
          height={120}
          className="absolute right-24 top-2 hidden w-11 opacity-70 lg:block"
        />
        <Image
          src="/brand/footer-lantern.svg"
          alt=""
          width={36}
          height={90}
          className="absolute right-40 top-10 hidden w-8 opacity-55 xl:block"
        />
      </div>

      <div className="site-container relative z-[1] pb-8 pt-12 md:pb-10 md:pt-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="sm:col-span-2 lg:col-span-3">
            <Link href="/" className="footer-brand group mb-4 inline-block">
              <BdoqLogo
                size="xl"
                className="transition-transform duration-300 group-hover:scale-[1.02]"
              />
            </Link>
            <p className="mb-5 max-w-sm font-inter text-sm leading-relaxed text-[var(--text-gray)]">
              {tFooter("aboutBlurb")}
            </p>
            <SocialIconRow
              links={socialLinks}
              className="flex-wrap gap-2.5"
              iconClassName={cn(
                "footer-social-icon flex size-9 items-center justify-center rounded-[8px]",
                "border border-[var(--green-primary)]/20 bg-white/95 text-[var(--green-dark)] shadow-sm"
              )}
            />
          </div>

          <FooterNavColumns columns={navColumns} />

          <div className="lg:col-span-3">
            <ColumnHeading icon={Phone}>{tFooter("contactUs")}</ColumnHeading>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5 font-inter text-sm text-[var(--text-gray)]">
                <span className="footer-contact-icon">
                  <MapPin className="size-3.5" aria-hidden="true" />
                </span>
                <span className="pt-0.5">{ACADEMY_INFO.address}</span>
              </li>
              <li>
                <a
                  href={`mailto:${ACADEMY_INFO.email}`}
                  className="footer-contact-link"
                >
                  <span className="footer-contact-icon">
                    <Mail className="size-3.5" aria-hidden="true" />
                  </span>
                  <span>{ACADEMY_INFO.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${ACADEMY_INFO.footerMobile.replace(/\s/g, "")}`}
                  className="footer-contact-link"
                >
                  <span className="footer-contact-icon">
                    <Phone className="size-3.5" aria-hidden="true" />
                  </span>
                  <span>{ACADEMY_INFO.footerMobile}</span>
                </a>
              </li>
              <li className="flex items-start gap-2.5 font-inter text-sm text-[var(--text-gray)]">
                <span className="footer-contact-icon">
                  <Clock3 className="size-3.5" aria-hidden="true" />
                </span>
                <span className="pt-0.5">{tFooter("officeHours")}</span>
              </li>
            </ul>
          </div>
        </div>

        <FooterFeatureBar features={features} />
      </div>

      <FooterDarkBand />
    </footer>
  );
}
