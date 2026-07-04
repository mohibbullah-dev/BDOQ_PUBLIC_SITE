import { z } from "zod";

export type FormValidationKey =
  | "fullNameRequired"
  | "whatsappRequired"
  | "genderRequired"
  | "subjectRequired"
  | "teacherGenderRequired"
  | "classTimeRequired"
  | "timezoneRequired"
  | "dobRequired"
  | "nationalityRequired"
  | "emailRequired"
  | "emailInvalid"
  | "currentAddressRequired"
  | "cityRequired"
  | "districtRequired"
  | "countryRequired"
  | "permanentAddressRequired"
  | "topicRequired"
  | "hourRequired"
  | "minuteRequired"
  | "periodRequired"
  | "deviceRequired"
  | "packageRequired"
  | "paymentRequired"
  | "parentNameRequired"
  | "relationshipRequired"
  | "parentWhatsappRequired"
  | "referralRequired"
  | "goalsRequired"
  | "termsRequired"
  | "fatherNameRequired"
  | "maritalRequired"
  | "phoneRequired"
  | "educationRequired"
  | "educationSubjectRequired"
  | "institutionRequired"
  | "yearRequired"
  | "fileRequired"
  | "fileSize5mb"
  | "imageRequired"
  | "imageSize3mb"
  | "imageType"
  | "parasRequired"
  | "islamicQualRequired"
  | "subjectsRequired"
  | "experienceRequired"
  | "daysRequired"
  | "slotsRequired"
  | "languagesRequired"
  | "salaryRequired"
  | "tajweedRequired"
  | "motivationRequired"
  | "rulesRequired"
  | "contactNameRequired"
  | "contactEmailRequired"
  | "contactSubjectRequired"
  | "contactMessageRequired";

export type FormValidationFn = (key: FormValidationKey) => string;

const classTimeEnum = z.enum(["morning", "noon", "evening", "night", "other"]);

export function createFreeClassSchemas(v: FormValidationFn) {
  const step1 = z.object({
    fullName: z.string().min(2, v("fullNameRequired")),
    whatsapp: z.string().min(10, v("whatsappRequired")),
    gender: z.enum(["male", "female"], { message: v("genderRequired") }),
  });

  const step2 = z.object({
    subject: z.string().min(1, v("subjectRequired")),
    teacherGender: z.enum(["male", "female", "any"], {
      message: v("teacherGenderRequired"),
    }),
    classTimeSlots: z.array(classTimeEnum).min(1, v("classTimeRequired")),
    timezone: z.string().min(1, v("timezoneRequired")),
  });

  return {
    step1,
    step2,
    full: step1.merge(step2),
    steps: [step1, step2] as const,
  };
}

export type FreeClassFormValues = z.infer<
  ReturnType<typeof createFreeClassSchemas>["full"]
>;

export const FREE_CLASS_STEPS = [
  { id: "contact", titleBn: "আপনার তথ্য", titleEn: "Your Details" },
  { id: "booking", titleBn: "ক্লাস বুকিং", titleEn: "Book Your Trial" },
] as const;

export function createContactSchema(v: FormValidationFn) {
  return z.object({
    name: z.string().min(2, v("contactNameRequired")),
    email: z.string().email(v("contactEmailRequired")),
    subject: z.string().min(3, v("contactSubjectRequired")),
    message: z.string().min(10, v("contactMessageRequired")),
  });
}

export type ContactFormValues = z.infer<ReturnType<typeof createContactSchema>>;
