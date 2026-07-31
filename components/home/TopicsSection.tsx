"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { TOPICS, TOPICS_SECTION } from "@/lib/constants";
import type { ILocalizedText, ITopic } from "@/lib/types";
import type { LocaleType } from "@/i18n/routing";
import { getTopicImagePath } from "@/lib/topicImages";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { SiteCta } from "@/components/shared/SiteCta";
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
    <ScrollReveal delay={index * 0.03}>
      <motion.article
        whileHover={{ y: -4 }}
        transition={{ duration: 0.25, ease: revealEase }}
        className="h-full"
      >
        <Link
          href="/courses"
          className={cn(
            "site-card group flex h-full flex-col items-center rounded-2xl border border-gray-100 bg-white",
            "px-3 py-4 text-center shadow-[0_8px_24px_-16px_rgba(15,23,42,0.18)]",
            "transition-shadow duration-300 hover:shadow-[0_16px_36px_-16px_rgba(15,107,76,0.28)]",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          )}
        >
          <div className="relative z-[1] h-[52px] w-[68px] shrink-0 overflow-hidden rounded-[10px] border border-gray-100 shadow-sm sm:h-[58px] sm:w-[76px] md:h-[62px] md:w-[82px]">
            <Image
              src={getTopicImagePath(topic.id)}
              alt={label}
              fill
              className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.04]"
              sizes="82px"
            />
          </div>
          <h3 className="relative z-[1] mt-2.5 font-inter text-xs font-semibold leading-snug text-[#1A1A2E] sm:text-[13px]">
            {label}
          </h3>
        </Link>
      </motion.article>
    </ScrollReveal>
  );
}

export function TopicsSection() {
  const locale = useLocale() as LocaleType;

  const eyebrow = pickLocalized(TOPICS_SECTION.eyebrow, locale);
  const titleBefore = pickLocalized(TOPICS_SECTION.titleBefore, locale);
  const titleHighlight = pickLocalized(TOPICS_SECTION.titleHighlight, locale);
  const titleAfter = pickLocalized(TOPICS_SECTION.titleAfter, locale);
  const subtitle = pickLocalized(TOPICS_SECTION.subtitle, locale);
  const bookTrial = pickLocalized(TOPICS_SECTION.bookTrial, locale);
  const exploreCourses = pickLocalized(TOPICS_SECTION.exploreCourses, locale);

  return (
    <section className="bg-bg-light py-16 md:py-20" aria-labelledby="topics-heading">
      <div className="site-container">
        <div className="rounded-3xl border border-gray-200/80 bg-white px-5 py-10 shadow-[0_20px_60px_-30px_rgba(15,23,42,0.12)] sm:px-8 md:px-10 md:py-12">
          <ScrollReveal className="mx-auto max-w-3xl text-center">
            <p className="font-body text-[11px] font-bold uppercase tracking-[0.18em] text-primary sm:text-xs">
              {eyebrow}
            </p>
            <h2
              id="topics-heading"
              className="mt-4 font-playfair text-3xl font-bold leading-tight text-primary-dark md:text-4xl"
            >
              {titleBefore}
              <span className="text-primary">{titleHighlight}</span>
              {titleAfter}
            </h2>
            <p className="mt-4 font-inter text-base leading-relaxed text-text-dark">
              {subtitle}
            </p>
          </ScrollReveal>

          <div
            className={cn(
              "mt-10 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 md:gap-5",
              "lg:grid-cols-4"
            )}
          >
            {TOPICS.map((topic, index) => (
              <TopicCard key={topic.id} topic={topic} locale={locale} index={index} />
            ))}
          </div>

          <ScrollReveal delay={0.12} className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <SiteCta href="/free-class" size="sm" className="inline-flex items-center gap-2">
              {bookTrial}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </SiteCta>
            <SiteCta href="/courses" variant="secondary" size="sm">
              {exploreCourses}
            </SiteCta>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
