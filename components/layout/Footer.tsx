import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { BdoqLogo } from "@/components/brand/BdoqLogo";
import { getCourses } from "@/lib/courses";
import { ACADEMY_INFO, SOCIAL_LINKS } from "@/lib/constants";
import { FOOTER_OTHER_LINKS, FOOTER_SOCIAL_ORDER } from "@/lib/navigation";
import { orderSocialLinks } from "@/lib/social";
import { SocialIconRow } from "@/components/shared/SocialIcons";

export async function Footer() {
  const tFooter = await getTranslations("footer");
  const tNav = await getTranslations("nav");
  const tAcademy = await getTranslations("academy");
  const tCourses = await getTranslations("courses");

  const allCourses = await getCourses();
  const popularCourses = allCourses.slice(0, 6);
  const socialLinks = orderSocialLinks(SOCIAL_LINKS, FOOTER_SOCIAL_ORDER);
  const missionLines = tAcademy("mission")
    .split(". ")
    .slice(0, 2)
    .map((line) => (line.endsWith(".") ? line : `${line}.`))
    .join(" ");

  return (
    <footer className="bg-primary-mint text-primary-dark">
      <div className="site-container py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <Link href="/" className="inline-block mb-5 group">
              <BdoqLogo
                size="xl"
                className="drop-shadow-[0_2px_8px_rgba(13,74,47,0.12)] transition-opacity duration-300 group-hover:opacity-90"
              />
            </Link>
            <p className="text-sm text-primary-dark/90 font-medium mb-3">
              {tAcademy("tagline")}
            </p>
            <p className="text-sm text-primary-dark/75 leading-relaxed line-clamp-3">
              {missionLines}
            </p>
          </div>

          <div>
            <h3 className="font-inter text-base font-semibold text-primary-dark mb-4">
              {tFooter("popularCourses")}
            </h3>
            <ul className="space-y-2.5">
              {popularCourses.map((course) => (
                <li key={course.slug}>
                  <Link
                    href={`/courses/${course.slug}`}
                    className="text-sm text-primary-dark/80 hover:text-primary transition-colors"
                  >
                    {tCourses(course.slug)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-inter text-base font-semibold text-primary-dark mb-4">
              {tFooter("otherLinks")}
            </h3>
            <ul className="space-y-2.5">
              {FOOTER_OTHER_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-primary-dark/80 hover:text-primary transition-colors"
                  >
                    {tNav(link.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-inter text-base font-semibold text-primary-dark mb-4">
              {tFooter("contactUs")}
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5 text-sm text-primary-dark/80">
                <MapPin
                  className="h-4 w-4 mt-0.5 shrink-0 text-primary"
                  aria-hidden="true"
                />
                <span>{ACADEMY_INFO.address}</span>
              </li>
              <li>
                <a
                  href={`mailto:${ACADEMY_INFO.email}`}
                  className="flex items-center gap-2.5 text-sm text-primary-dark/80 hover:text-primary transition-colors"
                >
                  <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>{ACADEMY_INFO.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${ACADEMY_INFO.footerMobile.replace(/\s/g, "")}`}
                  className="flex items-center gap-2.5 text-sm text-primary-dark/80 hover:text-primary transition-colors"
                >
                  <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>{ACADEMY_INFO.footerMobile}</span>
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/8801923947460`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-sm text-primary-dark/80 hover:text-primary transition-colors"
                >
                  <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>
                    {tFooter("whatsapp")} {ACADEMY_INFO.whatsapp}
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-primary-dark/15 flex flex-col sm:flex-row items-center justify-between gap-4">
          <SocialIconRow
            links={socialLinks}
            className="gap-4"
            iconClassName="text-primary-dark/75 hover:text-primary"
          />
          <p className="text-sm text-primary-dark/65 text-center sm:text-right">
            {tFooter("copyright")}
          </p>
        </div>
      </div>
    </footer>
  );
}
