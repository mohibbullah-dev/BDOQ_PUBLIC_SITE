"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { AboutVideoPlayer } from "@/components/home/AboutVideoPlayer";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { cn } from "@/lib/cn";

export function AboutSection() {
  const t = useTranslations("home.about");
  const tAcademy = useTranslations("academy");
  const tCta = useTranslations("cta");
  const tags = t.raw("tags") as string[];

  return (
    <section className="bg-white py-14 md:py-20">
      <div className="site-container">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <ScrollReveal direction="left">
            <AboutVideoPlayer compact />
          </ScrollReveal>

          <ScrollReveal direction="right" delay={0.08}>
            <p className="font-inter text-xs font-semibold uppercase tracking-widest text-[var(--green-primary)]">
              {t("eyebrow", { shortName: tAcademy("shortName") })}
            </p>

            <h2 className="mt-3 font-playfair text-3xl font-bold leading-tight text-[var(--green-dark)] md:text-[2.5rem]">
              {tAcademy("tagline")}
            </h2>

            <p className="mt-4 max-w-lg font-inter text-base leading-relaxed text-[var(--text-gray)]">
              {t("snippet")}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-[var(--green-light)] px-3.5 py-1.5 font-inter text-xs font-medium text-[var(--green-dark)]"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/free-class"
                className={cn(
                  "inline-flex items-center justify-center rounded-full px-7 py-3",
                  "bg-[var(--green-primary)] font-inter text-sm font-semibold text-white",
                  "transition-all duration-300 hover:brightness-95 hover:shadow-md"
                )}
              >
                {tCta("bookFreeTrial")}
              </Link>
              <Link
                href="/about"
                className={cn(
                  "inline-flex items-center gap-1.5 font-inter text-sm font-semibold text-[var(--green-primary)]",
                  "transition-colors duration-300 hover:text-[var(--green-dark)]"
                )}
              >
                {tCta("learnMoreAboutUs")}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
