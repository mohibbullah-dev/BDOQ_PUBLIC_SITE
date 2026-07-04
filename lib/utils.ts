import type { LucideIcon } from "lucide-react";
import {
  Clock,
  Globe,
  Languages,
  ShieldCheck,
  Users,
  UsersRound,
} from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

const WHY_CHOOSE_ICON_MAP: Record<string, LucideIcon> = {
  users: Users,
  "users-round": UsersRound,
  clock: Clock,
  "shield-check": ShieldCheck,
  globe: Globe,
  languages: Languages,
};

export function getWhyChooseIcon(iconName: string): LucideIcon {
  return WHY_CHOOSE_ICON_MAP[iconName] ?? Users;
}
