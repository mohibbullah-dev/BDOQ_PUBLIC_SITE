import type { FreeClassFormValues } from "@/lib/validators/freeClass";

type BackendTimeSlot =
  | "anytime"
  | "early_morning"
  | "morning"
  | "afternoon"
  | "evening"
  | "late_evening";

const SLOT_MAP: Record<string, BackendTimeSlot> = {
  morning: "morning",
  noon: "afternoon",
  evening: "evening",
  night: "late_evening",
  other: "anytime",
};

const DAY_LABELS: Record<string, string> = {
  morning: "Morning",
  noon: "Noon",
  evening: "Evening",
  night: "Night",
  other: "Flexible",
};

function resolveCourseSlug(subject: string): string | undefined {
  return subject.trim() || undefined;
}

export function ageToLearnerType(age: string): "child" | "teen" | "adult" {
  if (age === "70+") return "adult";
  const years = Number.parseInt(age, 10);
  if (Number.isNaN(years)) return "adult";
  if (years < 12) return "child";
  if (years < 18) return "teen";
  return "adult";
}

export interface ITrialBookingApiPayload {
  parentName: string;
  whatsapp: string;
  country: string;
  age: string;
  learnerGender: "male" | "female";
  learnerType: "child" | "teen" | "adult";
  timeSlot?: BackendTimeSlot;
  teacherPreference: "any" | "female" | "male";
  preferredDays: string[];
  timezone?: string;
  source: string;
  courseSlug?: string;
}

export function mapFreeClassToTrialBooking(
  data: FreeClassFormValues
): ITrialBookingApiPayload {
  const firstSlot = data.classTimeSlots?.[0];
  const mappedSlot = firstSlot ? SLOT_MAP[firstSlot] : undefined;
  const preferredDays = (data.classTimeSlots ?? []).map(
    (slot) => DAY_LABELS[slot] ?? slot
  );

  return {
    parentName: data.fullName.trim(),
    whatsapp: data.whatsapp.trim(),
    country: "Bangladesh",
    age: data.age.trim(),
    learnerGender: data.gender,
    learnerType: ageToLearnerType(data.age),
    timeSlot: mappedSlot,
    teacherPreference:
      data.teacherGender === "male" || data.teacherGender === "female"
        ? data.teacherGender
        : "any",
    preferredDays,
    timezone: data.timezone,
    source: "public-site-free-class",
    courseSlug: resolveCourseSlug(data.subject),
  };
}
