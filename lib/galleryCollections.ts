import type { LucideIcon } from "lucide-react";
import {
  Award,
  BookOpen,
  Camera,
  FolderOpen,
  Globe2,
  GraduationCap,
  Mic2,
  Sparkles,
  Users,
  Video,
} from "lucide-react";
import type { IGalleryItem } from "@/lib/types";

export type GalleryCollectionIconType =
  | "camera"
  | "video"
  | "folder"
  | "award"
  | "users"
  | "globe"
  | "book"
  | "mic"
  | "grad"
  | "sparkles";

export interface IGalleryCollection {
  id: string;
  titleKey: string;
  icon: GalleryCollectionIconType;
  coverGradient: string;
  itemIds: string[];
}

export const GALLERY_COLLECTION_ICONS: Record<
  GalleryCollectionIconType,
  LucideIcon
> = {
  camera: Camera,
  video: Video,
  folder: FolderOpen,
  award: Award,
  users: Users,
  globe: Globe2,
  book: BookOpen,
  mic: Mic2,
  grad: GraduationCap,
  sparkles: Sparkles,
};

/** Thematic album cards shown on the gallery landing grid */
export const GALLERY_COLLECTIONS: IGalleryCollection[] = [
  {
    id: "online-class",
    titleKey: "onlineClass",
    icon: "camera",
    coverGradient: "from-primary to-primary-dark",
    itemIds: ["g1", "g3"],
  },
  {
    id: "noorani-qaida",
    titleKey: "nooraniQaida",
    icon: "book",
    coverGradient: "from-teal to-primary-dark",
    itemIds: ["g4"],
  },
  {
    id: "hifz",
    titleKey: "hifzProgram",
    icon: "grad",
    coverGradient: "from-primary-dark to-teal",
    itemIds: ["g6"],
  },
  {
    id: "events",
    titleKey: "eventsSeminars",
    icon: "sparkles",
    coverGradient: "from-gold/80 to-primary-dark",
    itemIds: ["g5", "g9"],
  },
  {
    id: "recitation",
    titleKey: "quranRecitation",
    icon: "mic",
    coverGradient: "from-primary to-teal-accent",
    itemIds: ["g2"],
  },
  {
    id: "teacher-training",
    titleKey: "teacherTraining",
    icon: "users",
    coverGradient: "from-teal-accent/70 to-primary-dark",
    itemIds: ["g7"],
  },
  {
    id: "student-activities",
    titleKey: "studentActivities",
    icon: "folder",
    coverGradient: "from-primary-dark to-primary",
    itemIds: ["g8"],
  },
  {
    id: "certificates",
    titleKey: "certificatesAwards",
    icon: "award",
    coverGradient: "from-gold/70 to-teal",
    itemIds: ["g10"],
  },
  {
    id: "community",
    titleKey: "communityGathering",
    icon: "users",
    coverGradient: "from-primary to-teal",
    itemIds: ["g12"],
  },
  {
    id: "international",
    titleKey: "internationalStudents",
    icon: "globe",
    coverGradient: "from-teal to-primary",
    itemIds: ["g8", "g11"],
  },
];

export function getCollectionItems(
  collection: IGalleryCollection,
  allItems: IGalleryItem[]
): IGalleryItem[] {
  const byId = new Map(allItems.map((item) => [item.id, item]));
  return collection.itemIds
    .map((id) => byId.get(id))
    .filter((item): item is IGalleryItem => Boolean(item));
}
