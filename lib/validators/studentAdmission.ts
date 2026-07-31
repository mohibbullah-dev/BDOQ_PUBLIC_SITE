import { z } from "zod";
import { ADMISSION_FEE } from "@/lib/constants";
import type { FormValidationFn } from "@/lib/validators/freeClass";

const referralEnum = z.enum(["facebook", "youtube", "google", "friend"]);
const quranLevelEnum = z.enum([
  "not-started",
  "letters-only",
  "can-read",
  "with-tajweed",
]);
const teachingLanguageEnum = z.enum(["bengali", "english", "urdu", "hindi"]);
const topicEnum = z.enum([
  "quran-education",
  "quran-recitation",
  "tafsir",
  "seerah-history",
  "islamic-studies",
  "urdu",
  "tajweed",
  "hifz",
  "surah-memorization",
  "adab",
  "arabic",
  "english",
]);
const classTypeEnum = z.enum(["private", "batch"]);
const deviceEnum = z.enum(["laptop", "smartphone", "tablet"]);
const internetTypeEnum = z.enum(["wifi", "mobile", "both"]);

function addressFields(v: FormValidationFn) {
  return {
    currentAddressLine1: z.string().min(2, v("currentAddressRequired")),
    currentAddressLine2: z.string().optional(),
    currentState: z.string().min(1, v("stateRequired")),
    currentCity: z.string().min(2, v("cityRequired")),
    currentDistrict: z.string().min(2, v("districtRequired")),
    currentPostalCode: z.string().min(1, v("postalRequired")),
    currentCountry: z.string().min(2, v("countryRequired")),
    sameAsCurrentAddress: z.boolean(),
    permanentAddressLine1: z.string().min(2, v("permanentAddressRequired")),
    permanentAddressLine2: z.string().optional(),
    permanentState: z.string().min(1, v("stateRequired")),
    permanentCity: z.string().min(2, v("cityRequired")),
    permanentDistrict: z.string().min(2, v("districtRequired")),
    permanentPostalCode: z.string().min(1, v("postalRequired")),
    permanentCountry: z.string().min(2, v("countryRequired")),
  };
}

export function createStudentAdmissionSchemas(v: FormValidationFn) {
  const step1 = z.object({
    fullName: z.string().min(2, v("fullNameRequired")),
    dateOfBirth: z.string().min(1, v("dobRequired")),
    nationality: z.string().min(2, v("nationalityRequired")),
    gender: z.enum(["male", "female"], { message: v("genderRequired") }),
    email: z.string().email(v("emailRequired")),
    whatsapp: z.string().min(10, v("whatsappRequired")),
    guardianWhatsapp: z.string().optional(),
  });

  const step2 = z.object(addressFields(v));

  const step3 = z.object({
    quranReadingLevel: quranLevelEnum,
    teachingLanguage: teachingLanguageEnum,
    topicsOfInterest: z.array(topicEnum).min(1, v("topicRequired")),
    classType: classTypeEnum,
    timezone: z.string().min(1, v("timezoneRequired")),
    preferredHour: z.string().min(1, v("hourRequired")),
    preferredMinute: z.string().min(1, v("minuteRequired")),
    preferredPeriod: z.enum(["AM", "PM"], { message: v("periodRequired") }),
    devices: z.array(deviceEnum).min(1, v("deviceRequired")),
    internetType: internetTypeEnum,
    packagePlan: z.string().min(1, v("packageRequired")),
    paymentMethod: z.string().min(1, v("paymentRequired")),
  });

  const step4 = z.object({
    parentName: z.string().min(2, v("parentNameRequired")),
    parentRelationship: z.string().min(2, v("relationshipRequired")),
    parentWhatsapp: z.string().min(10, v("parentWhatsappRequired")),
    parentEmail: z
      .string()
      .optional()
      .refine((val) => !val || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), {
        message: v("emailInvalid"),
      }),
    referralSources: z.array(referralEnum).min(1, v("referralRequired")),
    goals: z.string().min(10, v("goalsRequired")),
  });

  const proofSchema = z
    .instanceof(File, { message: v("imageRequired") })
    .refine((file) => file.size <= 5 * 1024 * 1024, v("fileSize5mb"))
    .refine((file) => file.type.startsWith("image/"), v("imageType"));

  const step5Base = z.object({
    admissionFeeCurrency: z.enum(["bdt", "usd"], {
      message: v("admissionCurrencyRequired"),
    }),
    admissionFeeAmount: z.string().min(1, v("admissionAmountRequired")),
    admissionFeePaymentMethod: z.string().min(1, v("admissionPaymentRequired")),
    admissionPaymentReference: z
      .string()
      .min(3, v("admissionReferenceRequired")),
    admissionPaymentDate: z.string().min(1, v("admissionDateRequired")),
    admissionPaymentSender: z.string().optional(),
    admissionPaymentNote: z.string().optional(),
    admissionPaymentProofFile: proofSchema,
  });

  const applyAdmissionFeeRefinement = (
    data: Pick<
      z.infer<typeof step5Base>,
      "admissionFeeAmount" | "admissionFeeCurrency"
    >,
    ctx: z.RefinementCtx
  ): void => {
    const amount = Number(data.admissionFeeAmount);
    if (!Number.isFinite(amount) || amount <= 0) {
      ctx.addIssue({
        code: "custom",
        message: v("admissionAmountInvalid"),
        path: ["admissionFeeAmount"],
      });
      return;
    }

    const expected =
      ADMISSION_FEE[data.admissionFeeCurrency === "usd" ? "usd" : "bdt"];
    if (amount < expected) {
      ctx.addIssue({
        code: "custom",
        message: v("admissionAmountTooLow"),
        path: ["admissionFeeAmount"],
      });
    }
  };

  const step5 = step5Base.superRefine(applyAdmissionFeeRefinement);

  const step6Base = z.object({
    termsAccepted: z.boolean(),
  });

  const step6 = step6Base.refine((data) => data.termsAccepted === true, {
    message: v("termsRequired"),
    path: ["termsAccepted"],
  });

  const full = step1
    .merge(step2)
    .merge(step3)
    .merge(step4)
    .merge(step5Base)
    .merge(step6Base)
    .superRefine((data, ctx) => {
      applyAdmissionFeeRefinement(data, ctx);

      if (!data.termsAccepted) {
        ctx.addIssue({
          code: "custom",
          message: v("termsRequired"),
          path: ["termsAccepted"],
        });
      }
    });

  return {
    step1,
    step2,
    step3,
    step4,
    step5,
    step6,
    full,
    steps: [step1, step2, step3, step4, step5, step6] as const,
  };
}

export type StudentAdmissionFormValues = z.infer<
  ReturnType<typeof createStudentAdmissionSchemas>["full"]
>;

export const STUDENT_ADMISSION_STEPS = [
  {
    id: "personal",
    titleBn: "ব্যক্তিগত তথ্য",
    titleEn: "Personal Information",
    fields: [
      "fullName",
      "dateOfBirth",
      "nationality",
      "gender",
      "email",
      "whatsapp",
    ],
  },
  {
    id: "address",
    titleBn: "ঠিকানা",
    titleEn: "Current & Permanent Address",
    fields: [
      "currentCountry",
      "currentState",
      "currentDistrict",
      "currentCity",
      "currentPostalCode",
      "currentAddressLine1",
      "permanentCountry",
      "permanentState",
      "permanentDistrict",
      "permanentCity",
      "permanentPostalCode",
      "permanentAddressLine1",
    ],
  },
  {
    id: "learning",
    titleBn: "কোর্স ও শেখার পছন্দ",
    titleEn: "Course & Learning Preferences",
    fields: [
      "quranReadingLevel",
      "teachingLanguage",
      "topicsOfInterest",
      "classType",
      "timezone",
      "preferredHour",
      "preferredMinute",
      "preferredPeriod",
      "devices",
      "internetType",
      "packagePlan",
      "paymentMethod",
    ],
  },
  {
    id: "guardian",
    titleBn: "অভিভাবক ও অন্যান্য তথ্য",
    titleEn: "Guardian & Additional Information",
    fields: [
      "parentName",
      "parentRelationship",
      "parentWhatsapp",
      "referralSources",
      "goals",
    ],
  },
  {
    id: "admissionFee",
    titleBn: "ভর্তি ফি",
    titleEn: "Admission Fee",
    fields: [
      "admissionFeeCurrency",
      "admissionFeeAmount",
      "admissionFeePaymentMethod",
      "admissionPaymentReference",
      "admissionPaymentDate",
      "admissionPaymentProofFile",
    ],
  },
  {
    id: "review",
    titleBn: "পর্যালোচনা ও জমা",
    titleEn: "Review & Submit",
    fields: ["termsAccepted"],
  },
] as const;

export function getStudentAge(dateOfBirth: string): number | null {
  if (!dateOfBirth) return null;
  const birthDate = new Date(dateOfBirth);
  if (Number.isNaN(birthDate.getTime())) return null;

  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age -= 1;
  }
  return age;
}
