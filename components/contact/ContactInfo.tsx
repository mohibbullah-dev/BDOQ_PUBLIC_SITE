"use client";

import Link from "next/link";
import { Clock3, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import type { ReactNode } from "react";
import {
  ACADEMY_INFO,
  SOCIAL_LINKS,
  WHATSAPP_PHONE,
  WHATSAPP_URL,
} from "@/lib/constants";
import { FOOTER_SOCIAL_ORDER } from "@/lib/navigation";
import { getSocialIcon } from "@/lib/social";
import { cn } from "@/lib/cn";

const socialLinks = FOOTER_SOCIAL_ORDER.map((icon) =>
  SOCIAL_LINKS.find((link) => link.icon === icon)
).filter((link): link is (typeof SOCIAL_LINKS)[number] => Boolean(link));

function ContactRow({
  icon: Icon,
  label,
  children,
}: {
  icon: typeof Mail;
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="flex items-start gap-4 rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </div>
      <div className="min-w-0">
        <p className="mb-1 font-inter text-xs font-semibold uppercase tracking-wide text-text-gray">
          {label}
        </p>
        <div className="font-inter text-sm leading-relaxed text-text-dark">
          {children}
        </div>
      </div>
    </div>
  );
}

export function ContactInfo() {
  const t = useTranslations("pages.contact");
  const tCta = useTranslations("cta");

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
        <h2 className="font-amiri text-2xl font-bold text-primary-dark">
          {t("getInTouch")}
        </h2>
        <p className="mt-2 font-inter text-sm leading-relaxed text-text-gray">
          {t("getInTouchDesc")}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          <Link
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "inline-flex min-h-[40px] items-center gap-2 rounded-full bg-primary px-4 py-2",
              "font-inter text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
            )}
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            {tCta("chatWhatsapp")}
          </Link>
          <Link
            href={`mailto:${ACADEMY_INFO.email}`}
            className={cn(
              "inline-flex min-h-[40px] items-center gap-2 rounded-full border-2 border-primary/20 px-4 py-2",
              "font-inter text-sm font-semibold text-primary transition-colors hover:border-primary hover:bg-primary/5"
            )}
          >
            <Mail className="h-4 w-4" aria-hidden="true" />
            {tCta("emailUs")}
          </Link>
        </div>

        <p className="mt-4 inline-flex items-center gap-2 font-inter text-xs text-text-gray">
          <Clock3 className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
          {t("flexibleTimes")}
        </p>
      </div>

      <div className="space-y-3">
        <ContactRow icon={MapPin} label={t("address")}>
          {ACADEMY_INFO.address}
        </ContactRow>
        <ContactRow icon={Mail} label={t("email")}>
          <a
            href={`mailto:${ACADEMY_INFO.email}`}
            className="text-primary transition-colors hover:text-primary-dark"
          >
            {ACADEMY_INFO.email}
          </a>
        </ContactRow>
        <ContactRow icon={Phone} label={t("phone")}>
          <div className="space-y-1">
            <p>
              BD:{" "}
              <a
                href={`tel:${ACADEMY_INFO.contactBD.replace(/\s/g, "")}`}
                className="text-primary transition-colors hover:text-primary-dark"
              >
                {ACADEMY_INFO.contactBD}
              </a>
            </p>
            <p>
              EG:{" "}
              <a
                href={`tel:${ACADEMY_INFO.contactEG.replace(/\s/g, "")}`}
                className="text-primary transition-colors hover:text-primary-dark"
              >
                {ACADEMY_INFO.contactEG}
              </a>
            </p>
          </div>
        </ContactRow>
        <ContactRow icon={MessageCircle} label={t("whatsapp")}>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary transition-colors hover:text-primary-dark"
          >
            {WHATSAPP_PHONE}
          </a>
        </ContactRow>
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
        <p className="mb-3 font-inter text-xs font-semibold uppercase tracking-wide text-text-gray">
          {t("followUs")}
        </p>
        <div className="flex flex-wrap items-center gap-3">
          {socialLinks.map((link) => {
            const Icon = getSocialIcon(link.icon);
            return (
              <a
                key={link.icon}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.name}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-primary transition-all hover:border-primary hover:bg-primary hover:text-white"
              >
                <Icon className="h-5 w-5" aria-hidden="true" />
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
