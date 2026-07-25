"use client";

import { Mail, Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import {
  ACADEMY_INFO,
  WHATSAPP_PHONE,
  WHATSAPP_URL,
} from "@/lib/constants";
import { WhatsappIcon } from "@/components/shared/SocialBrandIcons";

export function ContactQuickCards() {
  const t = useTranslations("pages.contact");

  const cards = [
    {
      id: "call",
      icon: Phone,
      title: t("cardCallTitle"),
      primary: ACADEMY_INFO.contactBD,
      href: `tel:${ACADEMY_INFO.contactBD.replace(/\s/g, "")}`,
      note: t("cardCallNote"),
    },
    {
      id: "email",
      icon: Mail,
      title: t("cardEmailTitle"),
      primary: ACADEMY_INFO.email,
      href: `mailto:${ACADEMY_INFO.email}`,
      note: t("cardEmailNote"),
    },
    {
      id: "whatsapp",
      icon: WhatsappIcon,
      title: t("cardWhatsappTitle"),
      primary: WHATSAPP_PHONE,
      href: WHATSAPP_URL,
      note: t("cardWhatsappNote"),
      external: true,
    },
  ] as const;

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <a
            key={card.id}
            href={card.href}
            target={"external" in card && card.external ? "_blank" : undefined}
            rel={
              "external" in card && card.external
                ? "noopener noreferrer"
                : undefined
            }
            className="site-card group rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md md:p-6"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-bg-light text-primary transition-colors group-hover:bg-primary group-hover:text-white">
              <Icon className="h-5 w-5" aria-hidden="true" />
            </span>
            <h2 className="mt-4 font-playfair text-lg font-bold text-primary-dark">
              {card.title}
            </h2>
            <p className="mt-1.5 font-body text-sm font-semibold text-primary">
              {card.primary}
            </p>
            <p className="mt-1 font-body text-xs text-text-gray">{card.note}</p>
          </a>
        );
      })}
    </div>
  );
}
