import Link from "next/link";
import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { Clock3, Mail, MapPin, Phone } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { BdoqLogo } from "@/components/brand/BdoqLogo";
import { SocialIconRow } from "@/components/shared/SocialIcons";
import { FooterDarkBand } from "@/components/layout/footer/FooterDarkBand";
import { FooterNavColumns } from "@/components/layout/footer/FooterNavColumns";
import { ACADEMY_INFO, COURSES, SOCIAL_LINKS } from "@/lib/constants";
import { getCourses } from "@/lib/courses";
import { FOOTER_SOCIAL_ORDER } from "@/lib/navigation";
import { orderSocialLinks } from "@/lib/social";
import { cn } from "@/lib/cn";

function ColumnHeading({
  icon: Icon,
  children,
}: {
  icon: LucideIcon;
  children: ReactNode;
}) {
  return (
    <h3 className="mb-4 flex items-center gap-2 font-body text-sm font-bold uppercase tracking-wide text-primary-dark md:text-base">
      <span className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-bg-light text-primary">
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

  return (
    <footer className="relative overflow-hidden border-t border-gray-200 bg-white text-text-dark">
      <div className="site-container relative z-[1] pb-12 pt-12 md:pb-14 md:pt-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="sm:col-span-2 lg:col-span-3">
            <Link href="/" className="footer-brand mb-4 inline-block">
              <BdoqLogo size="xl" />
            </Link>
            <p className="mb-5 max-w-sm font-body text-sm leading-relaxed text-text-gray">
              {tFooter("aboutBlurb")}
            </p>
            <SocialIconRow
              links={socialLinks}
              className="flex-wrap gap-2.5"
              iconClassName={cn(
                "footer-social-icon flex size-9 items-center justify-center rounded-xl",
                "border border-primary/20 bg-white text-primary-dark"
              )}
            />
          </div>

          <FooterNavColumns columns={navColumns} />

          <div className="lg:col-span-3">
            <ColumnHeading icon={Phone}>{tFooter("contactUs")}</ColumnHeading>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5 font-body text-sm text-text-gray">
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
              <li className="flex items-start gap-2.5 font-body text-sm text-text-gray">
                <span className="footer-contact-icon">
                  <Clock3 className="size-3.5" aria-hidden="true" />
                </span>
                <span className="pt-0.5">{tFooter("officeHours")}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <FooterDarkBand />
    </footer>
  );
}
