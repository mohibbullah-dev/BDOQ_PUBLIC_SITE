"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  CalendarDays,
  Clock3,
  CreditCard,
  GraduationCap,
  Headphones,
  HelpCircle,
  MessageCircle,
  Minus,
  Plus,
  Smile,
  Star,
  Users,
  UserRound,
  type LucideIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { ACADEMY_INFO } from "@/lib/constants";
import type { IFAQItem } from "@/lib/types";
import { IslamicShapeBackdrop } from "@/components/shared/IslamicShapeBackdrop";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { SiteCta } from "@/components/shared/SiteCta";
import { cn } from "@/lib/cn";

const FAQ_ICONS: Record<string, LucideIcon> = {
  "faq-1": CalendarDays,
  "faq-2": Clock3,
  "faq-3": Users,
  "faq-4": UserRound,
  "faq-5": GraduationCap,
  "faq-6": CreditCard,
};

const FAQ_HIGHLIGHTS = [
  { key: "students", value: "300+", icon: Smile },
  { key: "feedback", value: "98%", icon: Star },
  { key: "support", value: "24/7", icon: Users },
] as const;

interface IFAQAccordionItemProps {
  item: IFAQItem;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}

const STATIC_FAQ_IDS = new Set([
  "faq-1",
  "faq-2",
  "faq-3",
  "faq-4",
  "faq-5",
  "faq-6",
]);

function FAQAccordionItem({
  item,
  index,
  isOpen,
  onToggle,
}: IFAQAccordionItemProps) {
  const Icon = FAQ_ICONS[item.id] ?? HelpCircle;
  const tStatic = useTranslations("home.faq.items");
  const useI18n = STATIC_FAQ_IDS.has(item.id);
  const question = useI18n ? tStatic(`${item.id}.q`) : item.question;
  const answer = useI18n ? tStatic(`${item.id}.a`) : item.answer;
  const questionNo = String(index + 1).padStart(2, "0");

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className={cn(
        "overflow-hidden rounded-2xl border transition-all duration-300",
        "site-card",
        isOpen
          ? "site-card--no-overlay border-primary/25 bg-white shadow-[0_16px_40px_-22px_rgba(38,155,111,0.28)]"
          : "border-gray-100 bg-white shadow-sm hover:border-primary/15 hover:shadow-md"
      )}
    >
      <button
        type="button"
        id={`faq-trigger-${item.id}`}
        aria-controls={`faq-panel-${item.id}`}
        onClick={onToggle}
        className={cn(
          "flex w-full items-center gap-3 p-4 text-left sm:gap-4 sm:p-5",
          isOpen && "bg-primary text-white"
        )}
        aria-expanded={isOpen}
      >
        <span
          className={cn(
            "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors",
            isOpen ? "bg-white/15 text-white" : "bg-bg-light text-primary"
          )}
          aria-hidden="true"
        >
          <Icon className="h-5 w-5" />
        </span>

        <span className="min-w-0 flex-1">
          <span
            className={cn(
              "mb-0.5 block font-body text-[10px] font-bold uppercase tracking-[0.16em]",
              isOpen ? "text-white/75" : "text-primary/70"
            )}
          >
            Question {questionNo}
          </span>
          <span
            className={cn(
              "font-body text-sm font-semibold leading-snug sm:text-base",
              isOpen ? "text-white" : "text-primary-dark"
            )}
          >
            {question}
          </span>
        </span>

        <span
          className={cn(
            "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
            isOpen
              ? "border-white/40 bg-white text-primary"
              : "border-primary/25 text-primary"
          )}
          aria-hidden="true"
        >
          {isOpen ? (
            <Minus className="h-4 w-4" />
          ) : (
            <Plus className="h-4 w-4" />
          )}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen ? (
          <motion.div
            id={`faq-panel-${item.id}`}
            role="region"
            aria-labelledby={`faq-trigger-${item.id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="bg-[#F3FAF6] px-4 py-4 sm:px-5 sm:py-5">
              <p className="font-body text-sm leading-relaxed text-text-gray sm:text-[15px]">
                {answer}
              </p>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.div>
  );
}

/** Home FAQ — help panel + accordion (mockup) */
export function FAQSection({ items = [] }: { items?: IFAQItem[] }) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);
  const t = useTranslations("home.faq");
  const tCta = useTranslations("cta");
  const tHighlights = useTranslations("home.faq.highlights");

  const handleToggle = (id: string): void => {
    setOpenId((current) => (current === id ? null : id));
  };

  const whatsappUrl = `https://wa.me/${ACADEMY_INFO.whatsapp.replace(/\D/g, "")}`;

  return (
    <section className="relative overflow-hidden bg-[#F7FCF9] py-16 md:py-24">
      <IslamicShapeBackdrop overlay="home" />

      <Image
        src="/brand/footer-lantern.svg"
        alt=""
        width={64}
        height={88}
        className="pointer-events-none absolute left-3 top-12 z-[1] hidden opacity-90 sm:left-6 lg:block"
        aria-hidden="true"
      />
      <Image
        src="/brand/footer-lantern.svg"
        alt=""
        width={52}
        height={72}
        className="pointer-events-none absolute left-14 top-20 z-[1] hidden opacity-70 lg:block"
        aria-hidden="true"
      />
      <Image
        src="/brand/footer-lantern.svg"
        alt=""
        width={44}
        height={60}
        className="pointer-events-none absolute left-24 top-14 z-[1] hidden opacity-55 xl:block"
        aria-hidden="true"
      />
      <Image
        src="/brand/footer-mosque.svg"
        alt=""
        width={300}
        height={95}
        className="pointer-events-none absolute -left-2 bottom-4 z-[1] hidden w-64 opacity-[0.12] lg:block"
        aria-hidden="true"
      />

      <div className="site-container relative z-[1]">
        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-10 xl:gap-12">
          <ScrollReveal direction="left">
            <div
              className={cn(
                "site-card rounded-2xl border border-gray-100 bg-white p-6 shadow-[0_18px_48px_-28px_rgba(15,23,42,0.2)]",
                "sm:p-7 lg:sticky lg:top-28"
              )}
            >
              <div className="mb-4 flex flex-col items-start gap-2">
                <span className="inline-flex items-center gap-2 rounded-full bg-bg-light px-3 py-1 font-body text-[11px] font-bold uppercase tracking-[0.16em] text-primary">
                  <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
                  {t("eyebrow")}
                </span>
              </div>

              <h2 className="font-playfair text-3xl font-bold leading-tight tracking-tight text-primary-dark md:text-[2.15rem]">
                {t("title")}{" "}
                <span className="text-primary">{t("titleAccent")}</span>
              </h2>

              <p className="mt-4 font-body text-base leading-relaxed text-text-gray">
                {t("intro")}
              </p>

              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
                {FAQ_HIGHLIGHTS.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.key}
                      className="rounded-xl border border-gray-100 bg-[#F7FCF9] px-3 py-3.5 text-center"
                    >
                      <span className="mx-auto mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-white text-primary shadow-sm">
                        <Icon className="h-4 w-4" aria-hidden="true" />
                      </span>
                      <p className="font-playfair text-lg font-bold text-primary">
                        {item.value}
                      </p>
                      <p className="mt-0.5 font-body text-[10px] font-medium leading-snug text-text-gray">
                        {tHighlights(item.key)}
                      </p>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 space-y-3">
                <SiteCta href="/free-class" className="w-full">
                  <CalendarDays className="h-4 w-4" aria-hidden="true" />
                  {tCta("bookFreeTrial")}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </SiteCta>
                <SiteCta
                  href={whatsappUrl}
                  external
                  variant="secondary"
                  className="w-full"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  {t("whatsappCta")}
                </SiteCta>
              </div>

              <div className="mt-6 flex flex-col gap-3 rounded-xl bg-bg-light p-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-primary shadow-sm">
                    <Headphones className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="font-body text-sm font-semibold text-primary-dark">
                      {t("stillHaveQuestions")}
                    </p>
                    <p className="mt-0.5 font-body text-xs leading-relaxed text-text-gray">
                      {t("stillHaveQuestionsDesc")}
                    </p>
                  </div>
                </div>
                <SiteCta href="/contact" size="sm" variant="secondary" className="shrink-0">
                  {tCta("contactUs")}
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </SiteCta>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={0.08}>
            <div className="space-y-3 sm:space-y-4">
              {items.map((item, index) => (
                <FAQAccordionItem
                  key={item.id}
                  item={item}
                  index={index}
                  isOpen={openId === item.id}
                  onToggle={() => handleToggle(item.id)}
                />
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
