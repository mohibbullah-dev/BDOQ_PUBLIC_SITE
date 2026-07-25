"use client";

import Link from "next/link";
import { Clock3, Mail, MapPin, Phone, Send } from "lucide-react";
import { useTranslations } from "next-intl";
import {
  ACADEMY_INFO,
  WHATSAPP_PHONE,
  WHATSAPP_URL,
} from "@/lib/constants";
import { WhatsappIcon } from "@/components/shared/SocialBrandIcons";
import { SiteCta } from "@/components/shared/SiteCta";
import { cn } from "@/lib/cn";

export function ContactInfo() {
  const t = useTranslations("pages.contact");
  const tCta = useTranslations("cta");

  const details = [
    {
      icon: MapPin,
      label: t("address"),
      content: ACADEMY_INFO.address,
    },
    {
      icon: Mail,
      label: t("email"),
      content: (
        <a
          href={`mailto:${ACADEMY_INFO.email}`}
          className="text-primary hover:text-primary-dark"
        >
          {ACADEMY_INFO.email}
        </a>
      ),
    },
    {
      icon: Phone,
      label: t("phone"),
      content: (
        <div className="space-y-0.5">
          <a
            href={`tel:${ACADEMY_INFO.contactBD.replace(/\s/g, "")}`}
            className="block text-primary hover:text-primary-dark"
          >
            BD: {ACADEMY_INFO.contactBD}
          </a>
          <a
            href={`tel:${ACADEMY_INFO.contactEG.replace(/\s/g, "")}`}
            className="block text-primary hover:text-primary-dark"
          >
            EG: {ACADEMY_INFO.contactEG}
          </a>
        </div>
      ),
    },
    {
      icon: Clock3,
      label: t("officeHours"),
      content: t("officeHoursValue"),
    },
  ] as const;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-playfair text-2xl font-bold text-primary-dark md:text-3xl">
          {t("getInTouch")}
        </h2>
        <p className="mt-3 max-w-md font-body text-sm leading-relaxed text-text-gray md:text-base">
          {t("getInTouchDesc")}
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href="#contact-form"
            className={cn(
              "inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5",
              "font-body text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
            )}
          >
            <Send className="h-4 w-4" aria-hidden="true" />
            {t("sendUsMessage")}
          </a>
          <SiteCta href={WHATSAPP_URL} variant="secondary" size="sm" external>
            <WhatsappIcon className="h-4 w-4" aria-hidden="true" />
            {tCta("chatWhatsapp")}
          </SiteCta>
        </div>
      </div>

      <ul className="space-y-4">
        {details.map((item) => {
          const Icon = item.icon;
          return (
            <li key={item.label} className="flex items-start gap-3.5">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-bg-light text-primary">
                <Icon className="h-4 w-4" aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <p className="font-body text-xs font-semibold uppercase tracking-wide text-text-gray">
                  {item.label}
                </p>
                <div className="mt-0.5 font-body text-sm font-medium text-primary-dark">
                  {item.content}
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      <p className="font-body text-xs text-text-gray">
        WhatsApp:{" "}
        <Link
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-primary hover:text-primary-dark"
        >
          {WHATSAPP_PHONE}
        </Link>
      </p>
    </div>
  );
}
