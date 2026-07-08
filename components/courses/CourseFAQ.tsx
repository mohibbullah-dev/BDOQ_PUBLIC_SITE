"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import type { IFAQItem } from "@/lib/types";
import { cn } from "@/lib/cn";

interface ICourseFAQProps {
  faqs: IFAQItem[];
}

export function CourseFAQ({ faqs }: ICourseFAQProps) {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id ?? null);
  const t = useTranslations("courseDetails.ui.faq");

  return (
    <section className="py-16 md:py-24 bg-bg-light">
      <div className="site-container">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-amiri text-2xl md:text-3xl font-bold text-primary-dark mb-8 text-center">
            {t("title")}
          </h2>

          <div className="rounded-2xl border border-gray-100 bg-white px-5 md:px-6 shadow-sm">
            {faqs.map((item) => {
              const isOpen = openId === item.id;
              return (
                <div
                  key={item.id}
                  className="border-b border-gray-100 last:border-b-0"
                >
                  <button
                    type="button"
                    onClick={() =>
                      setOpenId((current) =>
                        current === item.id ? null : item.id
                      )
                    }
                    className="flex w-full items-start justify-between gap-4 py-5 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="font-inter text-sm font-semibold text-primary-dark pr-4">
                      {item.question}
                    </span>
                    <span
                      className={cn(
                        "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2",
                        isOpen
                          ? "border-primary bg-primary text-white"
                          : "border-primary text-primary"
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
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <p className="font-inter text-sm text-text-gray leading-relaxed pb-5 pr-12">
                          {item.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
