"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import type { ICourseModule } from "@/lib/types";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { cn } from "@/lib/cn";

interface ICourseModulesAccordionProps {
  modules: ICourseModule[];
}

export function CourseModulesAccordion({
  modules,
}: ICourseModulesAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(modules[0]?.id ?? null);
  const t = useTranslations("courseDetails.ui.modules");

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="site-container">
        <div className="mb-12">
          <SectionHeader title={t("title")} subtitle={t("subtitle")} />
        </div>

        <div className="max-w-3xl rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
          {modules.map((module) => {
            const isOpen = openId === module.id;
            return (
              <div
                key={module.id}
                className="border-b border-gray-100 last:border-b-0"
              >
                <button
                  type="button"
                  onClick={() =>
                    setOpenId((current) =>
                      current === module.id ? null : module.id
                    )
                  }
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left hover:bg-bg-light/50 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="font-body text-sm font-semibold text-primary-dark">
                    {module.title}
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
                      <ul className="px-5 pb-4 space-y-2">
                        {module.topics.map((topic) => (
                          <li
                            key={topic}
                            className="font-body text-sm text-text-gray flex items-center gap-2"
                          >
                            <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                            {topic}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
