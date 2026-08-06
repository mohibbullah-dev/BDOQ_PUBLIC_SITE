import type { FreeClassFormValues } from "@/lib/validators/freeClass";
import {
  DEFAULT_COUNTRY,
  resolveTimezoneFromCountry,
} from "@/lib/countryTimezone";

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
  studentName: string;
  whatsapp: string;
  country: string;
  age: string;
  learnerGender: "male" | "female";
  learnerType: "child" | "teen" | "adult";
  preferredTrialDate: string;
  preferredTrialTime: string;
  additionalNote?: string;
  teacherPreference: "any" | "female" | "male";
  timezone: string;
  source: string;
  courseSlug?: string;
}

export function mapFreeClassToTrialBooking(
  data: FreeClassFormValues
): ITrialBookingApiPayload {
  const country = data.country.trim() || DEFAULT_COUNTRY;

  return {
    parentName: data.parentName.trim(),
    studentName: data.studentName.trim(),
    whatsapp: data.whatsapp.trim(),
    country,
    age: data.age.trim(),
    learnerGender: data.gender,
    learnerType: ageToLearnerType(data.age),
    preferredTrialDate: data.preferredTrialDate,
    preferredTrialTime: data.preferredTrialTime,
    additionalNote: data.additionalNote?.trim() || undefined,
    teacherPreference:
      data.teacherGender === "male" || data.teacherGender === "female"
        ? data.teacherGender
        : "any",
    timezone: resolveTimezoneFromCountry(country),
    source: "public-site-free-class",
    courseSlug: resolveCourseSlug(data.subject),
  };
}
