"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  CalendarClock,
  Clock3,
  GraduationCap,
  HelpCircle,
  MessageCircle,
  Minus,
  MonitorPlay,
  Plus,
  ShieldCheck,
  Users,
  type LucideIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { ACADEMY_INFO } from "@/lib/constants";
import type { IFAQItem } from "@/lib/types";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { cn } from "@/lib/cn";

const FAQ_ICONS: Record<string, LucideIcon> = {
  "faq-1": CalendarClock,
  "faq-2": Clock3,
  "faq-3": Users,
  "faq-4": ShieldCheck,
  "faq-5": GraduationCap,
  "faq-6": MonitorPlay,
};

function buildFaqHighlights(count: number) {
  return [
    { labelKey: "common", value: String(count) },
    { labelKey: "yearsExperience", value: "7+" },
    { labelKey: "supportChannels", value: "24/7" },
  ] as const;
}

interface IFAQAccordionItemProps {
  item: IFAQItem;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}

function FAQAccordionItem({
  item,
  index,
  isOpen,
  onToggle,
}: IFAQAccordionItemProps) {
  const Icon = FAQ_ICONS[item.id] ?? HelpCircle;
  const t = useTranslations(`home.faq.items.${item.id}`);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className={cn(
        "overflow-hidden rounded-2xl border transition-all duration-300",
        isOpen
          ? "border-[#32C991]/25 bg-[linear-gradient(135deg,#E8FAF2,#FFFFFF)] shadow-[0_16px_40px_rgba(50,201,145,0.12)]"
          : "border-gray-100 bg-white shadow-sm hover:border-[#32C991]/15 hover:shadow-md"
      )}
    >
      <button
        type="button"
        id={`faq-trigger-${item.id}`}
        aria-controls={`faq-panel-${item.id}`}
        onClick={onToggle}
        className="flex w-full items-start gap-4 p-5 text-left md:p-6"
        aria-expanded={isOpen}
      >
        <span
          className={cn(
            "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors duration-300",
            isOpen
              ? "bg-[#32C991] text-white shadow-md"
              : "bg-[#E8FAF2] text-[#32C991]"
          )}
          aria-hidden="true"
        >
          <Icon className="h-5 w-5" />
        </span>

        <span className="min-w-0 flex-1 pt-0.5">
          <span className="mb-1 block font-inter text-[11px] font-bold uppercase tracking-widest text-[#6B7280]">
            Question {String(index + 1).padStart(2, "0")}
          </span>
          <span className="font-inter text-base font-semibold leading-snug text-[#32C991] md:text-[17px]">
            {t("q")}
          </span>
        </span>

        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className={cn(
            "mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 transition-colors duration-300",
            isOpen
              ? "border-[#32C991] bg-[#32C991] text-white"
              : "border-[#32C991]/30 text-[#32C991]"
          )}
          aria-hidden="true"
        >
          {isOpen ? (
            <Minus className="h-4 w-4" />
          ) : (
            <Plus className="h-4 w-4" />
          )}
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`faq-panel-${item.id}`}
            role="region"
            aria-labelledby={`faq-trigger-${item.id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="border-t border-[#32C991]/10 px-5 pb-5 pt-4 md:px-6 md:pb-6 md:pl-[5.25rem]">
              <p className="font-inter text-sm leading-relaxed text-[#1A1A2E]/80 md:text-[15px]">
                {t("a")}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function FAQSection({ items = [] }: { items?: IFAQItem[] }) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);
  const faqHighlights = buildFaqHighlights(items.length);
  const t = useTranslations("home.faq");
  const tCta = useTranslations("cta");
  const tHighlights = useTranslations("home.faq.highlights");

  const handleToggle = (id: string): void => {
    setOpenId((current) => (current === id ? null : id));
  };

  const whatsappUrl = `https://wa.me/${ACADEMY_INFO.whatsapp.replace(/\D/g, "")}`;

  return (
    <section className="relative overflow-hidden bg-bg-light py-16 md:py-24">
      <div className="site-container relative">
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-14 xl:gap-16">
          <ScrollReveal direction="left">
            <div className="lg:sticky lg:top-28">
              <span
                className={cn(
                  "mb-4 inline-flex items-center gap-2 rounded-full border border-[#32C991]/20",
                  "bg-white px-4 py-1.5 font-inter text-xs font-semibold uppercase tracking-widest text-[#32C991]"
                )}
              >
                <HelpCircle className="h-3.5 w-3.5" aria-hidden="true" />
                {t("eyebrow")}
              </span>

              <h2 className="font-playfair text-3xl font-bold leading-tight text-[#32C991] md:text-4xl lg:text-[2.75rem]">
                {t("title")}
                <span className="mt-1 block text-[#32C991]">
                  {t("titleAccent")}
                </span>
              </h2>

              <p className="mt-5 max-w-md font-inter text-base leading-relaxed text-[#6B7280]">
                {t("intro")}
              </p>

              <div className="mt-8 grid grid-cols-3 gap-3">
                {faqHighlights.map((item) => (
                  <div
                    key={item.labelKey}
                    className="rounded-2xl border border-white/80 bg-white/90 px-3 py-4 text-center shadow-sm"
                  >
                    <p className="font-inter text-xl font-bold text-[#32C991]">
                      {item.value}
                    </p>
                    <p className="mt-1 font-inter text-[10px] uppercase tracking-wide text-[#6B7280]">
                      {tHighlights(item.labelKey)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-8 space-y-3">
                <Link
                  href="/free-class"
                  className={cn(
                    "inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5",
                    "bg-[#32C991] font-inter text-sm font-semibold text-white",
                    "transition-all duration-300 hover:bg-[#32C991] hover:shadow-lg"
                  )}
                >
                  {tCta("bookFreeTrial")}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "inline-flex w-full items-center justify-center gap-2 rounded-full border-2 border-[#32C991]",
                    "bg-white px-6 py-3.5 font-inter text-sm font-semibold text-[#32C991]",
                    "transition-all duration-300 hover:bg-[#32C991] hover:text-white"
                  )}
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  {tCta("askWhatsapp")}
                </a>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={0.1}>
            <div className="space-y-4">
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

            <div
              className={cn(
                "mt-6 flex flex-col gap-4 rounded-2xl border border-[var(--green-primary)]/15 bg-[#E8FAF2] p-6 sm:flex-row sm:items-center sm:justify-between"
              )}
            >
              <div>
                <p className="font-inter text-sm font-semibold uppercase tracking-wider text-[var(--text-gray)]">
                  {t("stillHaveQuestions")}
                </p>
                <p className="mt-1 font-inter text-base font-medium text-[var(--green-dark)]">
                  {t("stillHaveQuestionsDesc")}
                </p>
              </div>
              <Link
                href="/contact"
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-[var(--green-primary)] px-6 py-3 font-inter text-sm font-bold text-white transition-transform duration-300 hover:scale-[1.03]"
              >
                {tCta("contactUs")}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
