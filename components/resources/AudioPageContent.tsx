"use client";

import { useTranslations } from "next-intl";
import type { IAudioPageData } from "@/lib/resources";
import { FeaturedAudioPlayer } from "@/components/resources/FeaturedAudioPlayer";
import { RecitationCard } from "@/components/resources/RecitationCard";
import { PageHero } from "@/components/shared/PageHero";
import { ScrollReveal } from "@/components/shared/ScrollReveal";

interface IAudioPageContentProps {
  data: IAudioPageData;
}

export function AudioPageContent({ data }: IAudioPageContentProps) {
  const t = useTranslations("pages.resources");

  return (
    <>
      <PageHero
        eyebrow={t("audioEyebrow")}
        title={t("audioTitle")}
        subtitle={t("audioSubtitle")}
        centered
      />

      <section className="pb-16 md:pb-24 bg-bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 md:pt-16">
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            <ScrollReveal direction="left">
              <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-md max-h-[480px] overflow-y-auto">
                <h2 className="font-inter text-lg font-semibold text-primary-dark mb-4">
                  Surah Al-Fatiha — Verses
                </h2>
                <ol className="space-y-4">
                  {data.verses.map((verse, index) => (
                    <li
                      key={verse.id}
                      className="border-b border-gray-100 pb-4 last:border-0"
                    >
                      <p className="font-inter text-xs text-primary font-medium mb-1">
                        Verse {index + 1}
                      </p>
                      <p
                        className="font-amiri text-xl text-primary-dark text-right leading-loose mb-2"
                        dir="rtl"
                      >
                        {verse.arabic}
                      </p>
                      <p className="font-inter text-sm text-text-gray leading-relaxed">
                        {verse.translation}
                      </p>
                    </li>
                  ))}
                </ol>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={0.1}>
              <FeaturedAudioPlayer
                src={data.featuredSrc}
                title={data.featuredTitle}
              />
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-amiri text-2xl md:text-3xl font-bold text-primary-dark mb-8">
                Other Recitation
              </h2>
            </ScrollReveal>
            <div className="grid sm:grid-cols-2 gap-5">
              {data.recitations.map((recitation, index) => (
                <ScrollReveal key={recitation.id} delay={index * 0.05}>
                  <RecitationCard recitation={recitation} />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
