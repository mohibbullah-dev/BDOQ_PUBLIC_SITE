"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { WHY_CHOOSE_US } from "@/lib/constants";
import type { IWhyChooseItem } from "@/lib/types";
import { WHY_CHOOSE_I18N_KEYS } from "@/lib/i18n/quickNavKeys";
import { getWhyChooseIcon } from "@/lib/utils";
import { getWhyChooseImagePath } from "@/lib/whyChooseImages";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { cn } from "@/lib/cn";

const revealEase = [0.22, 1, 0.36, 1] as const;

interface IFeatureCardProps {
  item: IWhyChooseItem;
  index: number;
}

function FeatureCard({ item, index }: IFeatureCardProps) {
  const key = WHY_CHOOSE_I18N_KEYS[item.id] ?? item.id;
  const t = useTranslations(`home.whyChoose.items.${key}`);
  const Icon = getWhyChooseIcon(item.icon);
  const stepLabel = String(index + 1).padStart(2, "0");

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: revealEase }}
      className="group relative h-full"
    >
      <div
        className={cn(
          "relative flex h-full flex-col overflow-hidden rounded-[8px] border border-[var(--green-primary)]/10 bg-white",
          "shadow-[0_16px_40px_-22px_rgba(50,201,145,0.25)]",
          "transition-all duration-500 ease-out",
          "hover:-translate-y-1 hover:border-[var(--green-primary)]/20",
          "hover:shadow-[0_24px_52px_-18px_rgba(50,201,145,0.32)]"
        )}
      >
        <span className="site-card-hover-overlay z-[1]" aria-hidden="true" />

        <div className="relative z-[2] p-3 sm:p-4 sm:pb-0">
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[8px]">
            <Image
              src={getWhyChooseImagePath(item.id)}
              alt={t("title")}
              fill
              className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#32C991]/55 via-[#32C991]/10 to-transparent"
              aria-hidden="true"
            />

            <span
              className={cn(
                "absolute left-3 top-3 flex h-10 w-10 items-center justify-center rounded-xl",
                "bg-white/95 text-[var(--green-primary)] shadow-md backdrop-blur-sm",
                "transition-transform duration-500 group-hover:scale-105"
              )}
            >
              <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
            </span>

            <span
              className="pointer-events-none absolute bottom-2 right-3 font-playfair text-4xl font-bold text-white/20 sm:text-5xl"
              aria-hidden="true"
            >
              {stepLabel}
            </span>
          </div>
        </div>

        <div className="relative z-[2] flex flex-1 flex-col p-5 sm:p-6">
          <h3 className="font-inter text-base font-semibold leading-snug text-[var(--green-dark)] sm:text-lg">
            {t("title")}
          </h3>
          <p className="mt-2 flex-1 font-inter text-sm leading-relaxed text-[var(--text-gray)]">
            {t("description")}
          </p>
          <span
            className="mt-4 h-0.5 w-0 rounded-full bg-[var(--green-primary)] transition-all duration-500 group-hover:w-10"
            aria-hidden="true"
          />
        </div>
      </div>
    </motion.article>
  );
}

export function WhyChooseUsSection() {
  const t = useTranslations("home.whyChoose");

  return (
    <section className="relative overflow-hidden bg-bg-light py-16 md:py-24">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: "var(--islamic-pattern-light)",
          backgroundSize: "60px 60px",
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-20 top-10 h-64 w-64 rounded-full bg-[var(--green-primary)]/[0.06] blur-3xl"
        aria-hidden="true"
      />

      <div className="site-container relative z-[1]">
        <ScrollReveal className="mx-auto mb-10 max-w-2xl text-center md:mb-12">
          <p className="font-inter text-xs font-semibold uppercase tracking-widest text-[var(--green-primary)]">
            {t("eyebrow")}
          </p>
          <h2 className="mt-3 font-playfair text-2xl font-bold text-[var(--green-dark)] md:text-3xl lg:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-4 font-inter text-base leading-relaxed text-[var(--text-gray)]">
            {t("subtitle")}
          </p>
        </ScrollReveal>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.55, ease: revealEase }}
          className={cn(
            "overflow-hidden rounded-3xl border border-[var(--green-primary)]/10 bg-white/60 p-3 sm:p-4",
            "shadow-[0_24px_56px_-24px_rgba(50,201,145,0.22)] backdrop-blur-sm"
          )}
        >
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 lg:gap-5">
            {WHY_CHOOSE_US.map((item, index) => (
              <FeatureCard key={item.id} item={item} index={index} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
