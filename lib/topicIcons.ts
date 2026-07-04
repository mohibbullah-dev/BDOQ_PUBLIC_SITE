import type { LucideIcon } from "lucide-react";
import {
  BookMarked,
  BookOpen,
  BookText,
  Globe,
  Globe2,
  GraduationCap,
  History,
  Landmark,
  Languages,
  MessageSquare,
  Mic,
  ScrollText,
} from "lucide-react";

const TOPIC_ICON_MAP: Record<string, LucideIcon> = {
  "book-open": BookOpen,
  "scroll-text": ScrollText,
  mic: Mic,
  "book-marked": BookMarked,
  "book-text": BookText,
  "message-square": MessageSquare,
  history: History,
  "graduation-cap": GraduationCap,
  landmark: Landmark,
  languages: Languages,
  globe: Globe,
  "globe-2": Globe2,
};

export function getTopicIcon(iconName: string): LucideIcon {
  return TOPIC_ICON_MAP[iconName] ?? BookOpen;
}
