"use client";

import Image from "next/image";
import { FOUNDER, FOUNDER_VISION } from "@/lib/constants";

export function FounderSection() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="site-container">
        <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="flex justify-center md:justify-start">
            <div className="relative w-full max-w-sm rounded-2xl border border-gray-100 bg-bg-light shadow-xl overflow-hidden">
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
                <p className="font-inter text-sm font-semibold text-primary-dark">
                  {FOUNDER.name}
                </p>
                <p className="font-inter text-xs text-text-gray mt-1">
                  {FOUNDER.role}
                </p>
              </div>
            </div>
          </div>

          <div>
            <p className="font-inter text-xs font-bold uppercase tracking-widest text-primary mb-3">
              Briefly about the founder and director
            </p>
            <h2 className="font-inter text-2xl font-semibold text-primary-dark mb-2">
              Founder & Director
            </h2>
            <h3 className="font-amiri text-2xl md:text-3xl font-bold text-primary-dark mb-5">
              {FOUNDER.name}
            </h3>
            <p className="font-inter text-sm text-text-gray leading-relaxed mb-8">
              {FOUNDER.bio} Under his leadership, BD Online Quran Academy has
              grown into a trusted international platform serving hundreds of
              students with one-to-one live Quran classes, Tajweed, Hifz, and
              Islamic education.
            </p>

            <div className="rounded-2xl border-l-4 border-gold bg-bg-light p-6">
              <h4 className="font-inter text-sm font-bold uppercase tracking-wide text-primary mb-3">
                Vision and goals
              </h4>
              <blockquote className="font-inter text-sm text-text-dark leading-relaxed italic">
                &ldquo;{FOUNDER_VISION}&rdquo;
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
