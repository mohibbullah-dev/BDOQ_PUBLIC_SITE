import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import {
  AudioLines,
  BookMarked,
  BookOpen,
  Brain,
  GraduationCap,
  Languages,
  Mic2,
  ScrollText,
} from "lucide-react";

export const TOPIC_CLOUD_SLUGS = [
  "quran",
  "tajweed",
  "hifz",
  "arabic",
  "noorani",
  "tafsir",
  "islamic-studies",
  "memorization",
  "recitation",
] as const;

export type TopicCloudSlugType = (typeof TOPIC_CLOUD_SLUGS)[number];

const TOPIC_CLOUD_ICON_MAP: Record<TopicCloudSlugType, LucideIcon> = {
  quran: BookOpen,
  tajweed: AudioLines,
  hifz: Brain,
  arabic: Languages,
  noorani: BookMarked,
  tafsir: ScrollText,
  "islamic-studies": GraduationCap,
  memorization: Brain,
  recitation: Mic2,
};

const TOPIC_CLOUD_LABELS: Record<TopicCloudSlugType, string> = {
  quran: "Quran",
  tajweed: "Tajweed",
  hifz: "Hifz",
  arabic: "Arabic",
  noorani: "Noorani",
  tafsir: "Tafsir",
  "islamic-studies": "Islamic Studies",
  memorization: "Memorization",
  recitation: "Recitation",
};

export function createTopicCloudIcons(): ReactNode[] {
  return TOPIC_CLOUD_SLUGS.map((slug) => {
    const Icon = TOPIC_CLOUD_ICON_MAP[slug];
    const label = TOPIC_CLOUD_LABELS[slug];

    return (
      <div
        key={slug}
        className="flex h-11 w-11 flex-col items-center justify-center rounded-full bg-[#E8FAF2]"
        title={label}
      >
        <Icon className="h-5 w-5 text-[#32C991]" strokeWidth={2} aria-hidden />
      </div>
    );
  });
}
