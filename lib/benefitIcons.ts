import type { LucideIcon } from "lucide-react";
import {
  ArrowUpRight,
  Award,
  BarChart3,
  BookMarked,
  BookOpen,
  BookText,
  CalendarCheck,
  ClipboardList,
  Clock,
  Gift,
  GraduationCap,
  Headphones,
  Heart,
  ListChecks,
  MessageSquare,
  Mic,
  RefreshCw,
  ShieldCheck,
  User,
  Users,
  Video,
} from "lucide-react";

const BENEFIT_ICON_MAP: Record<string, LucideIcon> = {
  "book-open": BookOpen,
  mic: Mic,
  heart: Heart,
  user: User,
  "graduation-cap": GraduationCap,
  "message-square": MessageSquare,
  "book-marked": BookMarked,
  "refresh-cw": RefreshCw,
  award: Award,
  "bar-chart": BarChart3,
  clock: Clock,
  "shield-check": ShieldCheck,
  "clipboard-list": ClipboardList,
  "calendar-check": CalendarCheck,
  "book-text": BookText,
  "list-checks": ListChecks,
  headphones: Headphones,
  video: Video,
  gift: Gift,
  users: Users,
  "arrow-up-right": ArrowUpRight,
};

export function getBenefitIcon(iconName: string): LucideIcon {
  return BENEFIT_ICON_MAP[iconName] ?? BookOpen;
}
