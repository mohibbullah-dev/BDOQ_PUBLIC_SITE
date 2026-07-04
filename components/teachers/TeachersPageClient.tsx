"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import { useTranslations } from "next-intl";
import { TeacherCard } from "@/components/shared/TeacherCard";
import { SearchEmptyState } from "@/components/search/SearchEmptyState";
import { SearchField } from "@/components/search/SearchField";
import { TeachersTabBar } from "@/components/teachers/TeachersTabBar";
import { filterTeachersByQuery } from "@/lib/search";
import {
  getTeacherTabById,
  resolveTeacherGenderTab,
  type ITeacherGenderTab,
  type TeacherGenderTabType,
} from "@/lib/teachersPage";

const panelMotion = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
  transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const },
};

export function TeachersPageClient({ tabs }: { tabs: ITeacherGenderTab[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const t = useTranslations("pages.teachers");
  const tCta = useTranslations("cta");

  const [activeTab, setActiveTab] = useState<TeacherGenderTabType>("male");
  const [searchQuery, setSearchQuery] = useState(
    () => searchParams.get("q") ?? ""
  );

  const syncTabFromUrl = useCallback((): void => {
    const genderParam = searchParams.get("gender");
    const hash = typeof window !== "undefined" ? window.location.hash : "";
    setActiveTab(resolveTeacherGenderTab(genderParam, hash));
  }, [searchParams]);

  useEffect(() => {
    syncTabFromUrl();
  }, [syncTabFromUrl]);

  useEffect(() => {
    setSearchQuery(searchParams.get("q") ?? "");
  }, [searchParams]);

  useEffect(() => {
    const onHashChange = (): void => {
      syncTabFromUrl();
    };

    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, [syncTabFromUrl]);

  const updateUrl = useCallback(
    (tab: TeacherGenderTabType, query: string): void => {
      const selected = getTeacherTabById(tabs, tab);
      const params = new URLSearchParams(searchParams.toString());
      params.set("gender", tab);

      if (query.trim()) params.set("q", query.trim());
      else params.delete("q");

      router.replace(`/teachers?${params.toString()}#${selected.hash}`, {
        scroll: false,
      });
    },
    [router, searchParams, tabs]
  );

  const handleTabChange = useCallback(
    (tab: TeacherGenderTabType): void => {
      setActiveTab(tab);
      updateUrl(tab, searchQuery);
    },
    [searchQuery, updateUrl]
  );

  const handleSearchChange = useCallback(
    (value: string): void => {
      setSearchQuery(value);
      updateUrl(activeTab, value);
    },
    [activeTab, updateUrl]
  );

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent): void => {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;

      const target = event.target;
      if (
        target instanceof HTMLElement &&
        (target.tagName === "INPUT" || target.tagName === "TEXTAREA")
      ) {
        return;
      }

      const currentIndex = tabs.findIndex((tab) => tab.id === activeTab);
      const nextIndex =
        event.key === "ArrowRight"
          ? Math.min(currentIndex + 1, tabs.length - 1)
          : Math.max(currentIndex - 1, 0);

      const nextTab = tabs[nextIndex]?.id;
      if (nextTab && nextTab !== activeTab) {
        handleTabChange(nextTab);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeTab, handleTabChange, tabs]);

  const currentTab = getTeacherTabById(tabs, activeTab);
  const filteredTeachers = useMemo(
    () => filterTeachersByQuery(currentTab.teachers, searchQuery),
    [currentTab.teachers, searchQuery]
  );

  return (
    <section
      id="all-teachers"
      className="scroll-mt-28 bg-bg-light py-12 md:py-16"
      aria-labelledby="all-teachers-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center md:mb-10">
          <h2
            id="all-teachers-heading"
            className="font-inter text-2xl font-semibold text-primary-dark md:text-3xl"
          >
            All Our Teachers
          </h2>
          <p className="mx-auto mt-3 max-w-2xl font-inter text-base text-text-gray">
            Male and female instructors — separate, respectful learning paths
            with certified Hafiz teachers from Bangladesh and abroad.
          </p>
        </div>

        <div className="mb-6 space-y-4">
          <TeachersTabBar
            tabs={tabs}
            activeTab={activeTab}
            onChange={handleTabChange}
          />
          <SearchField
            id="teachers-search"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder={t("searchPlaceholder")}
            ariaLabel={t("searchAria")}
            className="mx-auto max-w-xl"
          />
        </div>

        <div className="mb-8 flex justify-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-white px-4 py-2 font-inter text-sm text-text-gray shadow-sm">
            <ShieldCheck className="h-4 w-4 text-primary" aria-hidden="true" />
            {currentTab.subtitle}
            {searchQuery.trim() && (
              <span className="text-primary">
                ·{" "}
                {filteredTeachers.length === 1
                  ? t("results", { count: filteredTeachers.length })
                  : t("resultsPlural", { count: filteredTeachers.length })}
              </span>
            )}
          </p>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={`${currentTab.id}-${searchQuery.trim()}`}
            id={`teachers-panel-${currentTab.id}`}
            role="tabpanel"
            aria-labelledby={`teachers-tab-${currentTab.id}`}
            {...panelMotion}
          >
            <div
              id={currentTab.hash}
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
            >
              {filteredTeachers.length === 0 ? (
                <SearchEmptyState
                  query={searchQuery}
                  title={t("noTeachers")}
                  description={t("noTeachersDesc", {
                    category: currentTab.label,
                    query: searchQuery,
                  })}
                  ctaHref="/free-class"
                  ctaLabel={tCta("freeTrialClass")}
                />
              ) : (
                filteredTeachers.map((teacher, index) => (
                  <motion.div
                    key={teacher.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.35,
                      delay: index * 0.04,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <TeacherCard
                      teacher={teacher}
                      showDetailsLink
                      avatarVariant={
                        currentTab.id === "female" ? "female" : "default"
                      }
                    />
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
