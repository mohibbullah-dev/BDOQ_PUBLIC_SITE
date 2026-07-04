import { z } from "zod";
import type { FormValidationFn } from "@/lib/validators/freeClass";

const referralEnum = z.enum(["facebook", "youtube", "google", "friend"]);
const maritalEnum = z.enum(["single", "married", "divorced", "widowed"]);
const hafizEnum = z.enum(["yes", "no"]);
const subjectEnum = z.enum([
  "quran-education",
  "quran-recitation",
  "tajweed",
  "hifz",
  "surah-memorization",
  "islamic-studies",
  "tafsir",
  "seerah-history",
  "arabic",
  "urdu",
  "english",
  "adab",
]);
const weekdayEnum = z.enum([
  "saturday",
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
]);
const timeSlotEnum = z.enum(["morning", "noon", "evening", "night"]);
const languageEnum = z.enum(["bengali", "english", "arabic", "urdu"]);
const deviceEnum = z.enum(["laptop", "desktop", "tablet", "mobile"]);
const internetTypeEnum = z.enum(["wifi", "mobile", "both"]);

function addressFields(v: FormValidationFn) {
  return {
    currentAddressLine1: z.string().min(2, v("currentAddressRequired")),
    currentAddressLine2: z.string().optional(),
    currentCity: z.string().min(2, v("cityRequired")),
    currentDistrict: z.string().min(2, v("districtRequired")),
    currentPostalCode: z.string().optional(),
    currentCountry: z.string().min(2, v("countryRequired")),
    sameAsCurrentAddress: z.boolean(),
    permanentAddressLine1: z.string().min(2, v("permanentAddressRequired")),
    permanentAddressLine2: z.string().optional(),
    permanentCity: z.string().min(2, v("cityRequired")),
    permanentDistrict: z.string().min(2, v("districtRequired")),
    permanentPostalCode: z.string().optional(),
    permanentCountry: z.string().min(2, v("countryRequired")),
  };
}

function applyHafizRefinement<
  T extends { isHafiz: "yes" | "no"; parasMemorized?: string },
>(data: T, ctx: z.RefinementCtx, v: FormValidationFn): void {
  if (data.isHafiz === "yes" && !data.parasMemorized?.trim()) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: v("parasRequired"),
      path: ["parasMemorized"],
    });
  }
}

export function createTeacherRegistrationSchemas(v: FormValidationFn) {
  const fileSchema = z
    .instanceof(File, { message: v("fileRequired") })
    .refine((file) => file.size <= 5 * 1024 * 1024, v("fileSize5mb"));

  const imageSchema = z
    .instanceof(File, { message: v("imageRequired") })
    .refine((file) => file.size <= 3 * 1024 * 1024, v("imageSize3mb"))
    .refine((file) => file.type.startsWith("image/"), v("imageType"));

  const step1 = z.object({
    fullName: z.string().min(2, v("fullNameRequired")),
    fatherName: z.string().min(2, v("fatherNameRequired")),
    surname: z.string().optional(),
    dateOfBirth: z.string().min(1, v("dobRequired")),
    gender: z.enum(["male", "female"], { message: v("genderRequired") }),
    maritalStatus: maritalEnum,
    email: z.string().email(v("emailRequired")),
    phone: z.string().min(10, v("phoneRequired")),
    whatsapp: z.string().min(10, v("whatsappRequired")),
    ...addressFields(v),
  });

  const step2Base = z.object({
    educationQualification: z.string().min(2, v("educationRequired")),
    educationSubject: z.string().min(2, v("educationSubjectRequired")),
    educationInstitution: z.string().min(2, v("institutionRequired")),
    educationYear: z.string().min(4, v("yearRequired")),
    certificateFile: fileSchema,
    isHafiz: hafizEnum,
    parasMemorized: z.string().optional(),
    islamicQualification: z.string().min(2, v("islamicQualRequired")),
  });

  const step2 = step2Base.superRefine((data, ctx) =>
    applyHafizRefinement(data, ctx, v)
  );

  const step3 = z.object({
    subjects: z.array(subjectEnum).min(1, v("subjectsRequired")),
    teachingExperience: z.string().min(1, v("experienceRequired")),
    availableDays: z.array(weekdayEnum).min(1, v("daysRequired")),
    availableTimeSlots: z.array(timeSlotEnum).min(1, v("slotsRequired")),
    languages: z.array(languageEnum).min(1, v("languagesRequired")),
    expectedSalary: z.string().min(1, v("salaryRequired")),
    referralSource: referralEnum,
    tajweedExperience: z.string().min(2, v("tajweedRequired")),
    hifzExperience: z.string().optional(),
  });

  const step4 = z.object({
    profilePhotoFile: imageSchema,
    cvFile: fileSchema,
    screenshotFile: fileSchema.optional(),
    teachingDevices: z.array(deviceEnum).min(1, v("deviceRequired")),
    internetType: internetTypeEnum,
    motivation: z.string().min(20, v("motivationRequired")),
  });

  const step5 = z.object({
    rulesAccepted: z.boolean().refine((val) => val === true, {
      message: v("rulesRequired"),
    }),
  });

  const full = step1
    .merge(step2Base)
    .merge(step3)
    .merge(step4)
    .merge(step5)
    .superRefine((data, ctx) => applyHafizRefinement(data, ctx, v));

  return {
    step1,
    step2,
    step3,
    step4,
    step5,
    full,
    steps: [step1, step2, step3, step4, step5] as const,
  };
}

export type TeacherRegistrationFormValues = z.infer<
  ReturnType<typeof createTeacherRegistrationSchemas>["full"]
>;

export const TEACHER_REGISTRATION_STEPS = [
  {
    id: "personal",
    titleBn: "ব্যক্তিগত তথ্য",
    titleEn: "Personal Information",
    fields: [
      "fullName",
      "fatherName",
      "surname",
      "dateOfBirth",
      "gender",
      "maritalStatus",
      "email",
      "phone",
      "whatsapp",
      "currentAddressLine1",
      "currentCity",
      "currentDistrict",
      "currentCountry",
      "sameAsCurrentAddress",
      "permanentAddressLine1",
      "permanentCity",
      "permanentDistrict",
      "permanentCountry",
    ],
  },
  {
    id: "academic",
    titleBn: "শিক্ষাগত তথ্য",
    titleEn: "Academic & Islamic Qualification",
    fields: [
      "educationQualification",
      "educationSubject",
      "educationInstitution",
      "educationYear",
      "certificateFile",
      "isHafiz",
      "parasMemorized",
      "islamicQualification",
    ],
  },
  {
    id: "teaching",
    titleBn: "শিক্ষাদান সংক্রান্ত",
    titleEn: "Teaching Profile",
    fields: [
      "subjects",
      "teachingExperience",
      "availableDays",
      "availableTimeSlots",
      "languages",
      "expectedSalary",
      "referralSource",
      "tajweedExperience",
    ],
  },
  {
    id: "documents",
    titleBn: "ডকুমেন্ট ও সেটআপ",
    titleEn: "Documents & Setup",
    fields: [
      "profilePhotoFile",
      "cvFile",
      "teachingDevices",
      "internetType",
      "motivation",
    ],
  },
  {
    id: "review",
    titleBn: "পর্যালোচনা ও জমা",
    titleEn: "Review & Submit",
    fields: ["rulesAccepted"],
  },
] as const;
