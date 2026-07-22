"use client";

import Image from "next/image";
import { FOUNDER, FOUNDER_VISION } from "@/lib/constants";
import { SectionHeader } from "@/components/shared/SectionHeader";

export function FounderSection() {
  return (
    <section className="bg-white py-16 md:py-20">
      <div className="site-container">
        <div className="grid items-center gap-10 md:grid-cols-2 lg:gap-16">
          <div className="flex justify-center md:justify-start">
            <div className="relative w-full max-w-sm overflow-hidden rounded-2xl border border-gray-200 bg-bg-light">
              <div className="relative aspect-[4/5] w-full">
                <Image
                  src={FOUNDER.image}
                  alt={`${FOUNDER.name} — Founder & Director, BD Online Quran Academy`}
                  fill
                  className="object-contain object-bottom p-4 pb-0"
                  sizes="(max-width: 768px) 100vw, 384px"
                  priority
                />
              </div>
              <div className="border-t border-gray-100 bg-white px-6 py-5 text-center">
                <p className="font-body text-sm font-semibold text-primary-dark">
                  {FOUNDER.name}
                </p>
                <p className="mt-1 font-body text-xs text-text-gray">
                  {FOUNDER.role}
                </p>
              </div>
            </div>
          </div>

          <div>
            <SectionHeader
              eyebrow="Briefly about the founder and director"
              title="Founder & Director"
            />
            <h3 className="mt-3 mb-5 font-amiri text-2xl font-bold text-primary-dark md:text-3xl">
              {FOUNDER.name}
            </h3>
            <p className="font-body text-sm text-text-gray leading-relaxed mb-8">
              {FOUNDER.bio} Under his leadership, BD Online Quran Academy has
              grown into a trusted international platform serving hundreds of
              students with one-to-one live Quran classes, Tajweed, Hifz, and
              Islamic education.
            </p>

            <div className="rounded-2xl border-l-4 border-gold bg-bg-light p-6">
              <h4 className="font-body text-sm font-bold uppercase tracking-wide text-primary mb-3">
                Vision and goals
              </h4>
              <blockquote className="font-body text-sm text-text-dark leading-relaxed italic">
                &ldquo;{FOUNDER_VISION}&rdquo;
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
