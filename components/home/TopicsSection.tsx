"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { TOPICS, TOPICS_SECTION } from "@/lib/constants";
import type { ILocalizedText, ITopic } from "@/lib/types";
import type { LocaleType } from "@/i18n/routing";
import { getTopicImagePath } from "@/lib/topicImages";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { cn } from "@/lib/cn";

const revealEase = [0.22, 1, 0.36, 1] as const;

function pickLocalized(text: ILocalizedText, locale: LocaleType): string {
  return locale === "bn" ? text.bn : text.en;
}

interface ITopicCardProps {
  topic: ITopic;
  locale: LocaleType;
  index: number;
}

function TopicCard({ topic, locale, index }: ITopicCardProps) {
  const label = locale === "bn" ? topic.labelBn : topic.label;

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.45, delay: index * 0.04, ease: revealEase }}
      className="relative overflow-hidden bg-white"
    >
      <Link
        href="/free-class"
        className="group relative flex h-full flex-col items-center gap-3 overflow-hidden px-3 py-5 text-center sm:px-4 sm:py-6"
      >
        <span
          className={cn(
            "pointer-events-none absolute inset-0 z-0 bg-[var(--brand-overlay)]",
            "opacity-0 transition-opacity duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]",
            "group-hover:opacity-100"
          )}
          aria-hidden="true"
        />

        <ArrowUpRight
          className="absolute right-2.5 top-2.5 z-[2] h-3.5 w-3.5 text-[var(--green-primary)] opacity-0 transition-all duration-300 group-hover:opacity-100"
          aria-hidden="true"
        />

        <div className="relative z-[1] w-full max-w-[104px]">
          <div
            className={cn(
              "relative aspect-[4/3] w-full overflow-hidden rounded-[8px]",
              "border border-[var(--green-primary)]/10",
              "shadow-[0_6px_20px_-6px_rgba(50,201,145,0.35)]",
              "transition-all duration-500 ease-out",
              "group-hover:-translate-y-0.5 group-hover:scale-[1.03] group-hover:shadow-[0_10px_28px_-8px_rgba(50,201,145,0.5)]"
            )}
          >
            <Image
              src={getTopicImagePath(topic.id)}
              alt={label}
              fill
              className="object-cover object-center"
              sizes="(max-width: 640px) 92px, 104px"
            />
          </div>
        </div>

        <p className="relative z-[1] font-inter text-sm font-medium leading-snug text-[var(--text-dark)] transition-colors duration-300 group-hover:text-[var(--green-primary)]">
          {label}
        </p>

        <span
          className="relative z-[1] h-0.5 w-0 rounded-full bg-[var(--brand-red)] transition-all duration-500 group-hover:w-6"
          aria-hidden="true"
        />
      </Link>
    </motion.div>
  );
}

export function TopicsSection() {
  const locale = useLocale() as LocaleType;

  return (
    <section className="bg-bg-light py-14 md:py-20">
      <div className="site-container">
        <ScrollReveal className="mx-auto mb-10 max-w-3xl text-center md:mb-12">
          <p className="font-inter text-xs font-semibold uppercase tracking-widest text-[var(--green-primary)]">
            {pickLocalized(TOPICS_SECTION.eyebrow, locale)}
          </p>

          <h2
            className={cn(
              "mt-3 font-playfair text-2xl font-bold leading-tight text-[var(--green-dark)] md:text-3xl lg:text-4xl",
              locale === "bn" && "font-inter"
            )}
          >
            {pickLocalized(TOPICS_SECTION.titleBefore, locale)}
            <span className="text-[var(--green-primary)]">
              {pickLocalized(TOPICS_SECTION.titleHighlight, locale)}
            </span>
            {pickLocalized(TOPICS_SECTION.titleAfter, locale)}
          </h2>

          <p className="mt-4 font-inter text-base leading-relaxed text-[var(--text-gray)]">
            {pickLocalized(TOPICS_SECTION.subtitle, locale)}
          </p>
        </ScrollReveal>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: revealEase }}
          className={cn(
            "overflow-hidden rounded-3xl border border-[var(--green-primary)]/10 bg-white",
            "shadow-[0_24px_56px_-24px_rgba(50,201,145,0.22)]"
          )}
        >
          <div className="grid grid-cols-2 divide-x divide-y divide-gray-100 sm:grid-cols-3 lg:grid-cols-4">
            {TOPICS.map((topic, index) => (
              <TopicCard
                key={topic.id}
                topic={topic}
                locale={locale}
                index={index}
              />
            ))}
          </div>
        </motion.div>

        <ScrollReveal
          delay={0.15}
          className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <Link
            href="/free-class"
            className={cn(
              "inline-flex items-center justify-center rounded-full px-8 py-3.5",
              "bg-[var(--green-primary)] font-inter text-sm font-semibold text-white",
              "transition-all duration-300 hover:bg-[var(--green-dark)] hover:shadow-md"
            )}
          >
            {pickLocalized(TOPICS_SECTION.bookTrial, locale)}
          </Link>
          <Link
            href="/courses"
            className={cn(
              "inline-flex items-center gap-1.5 font-inter text-sm font-semibold text-[var(--green-primary)]",
              "transition-colors duration-300 hover:text-[var(--green-dark)]"
            )}
          >
            {pickLocalized(TOPICS_SECTION.exploreCourses, locale)}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
