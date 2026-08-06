import { z } from "zod";

export type FormValidationKey =
  | "fullNameRequired"
  | "whatsappRequired"
  | "genderRequired"
  | "ageRequired"
  | "subjectRequired"
  | "teacherGenderRequired"
  | "classTimeRequired"
  | "timezoneRequired"
  | "studentNameRequired"
  | "trialDateRequired"
  | "trialTimeRequired"
  | "trialDatePast"
  | "dobRequired"
  | "nationalityRequired"
  | "emailRequired"
  | "emailInvalid"
  | "currentAddressRequired"
  | "cityRequired"
  | "districtRequired"
  | "stateRequired"
  | "postalRequired"
  | "countryRequired"
  | "permanentAddressRequired"
  | "topicRequired"
  | "hourRequired"
  | "minuteRequired"
  | "periodRequired"
  | "deviceRequired"
  | "packageRequired"
  | "paymentRequired"
  | "admissionCurrencyRequired"
  | "admissionAmountRequired"
  | "admissionAmountInvalid"
  | "admissionAmountTooLow"
  | "admissionPaymentRequired"
  | "admissionReferenceRequired"
  | "admissionDateRequired"
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

function isTodayOrFuture(dateStr: string): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const picked = new Date(`${dateStr}T00:00:00`);
  return !Number.isNaN(picked.getTime()) && picked >= today;
}

export function createFreeClassSchemas(v: FormValidationFn) {
  const step1 = z.object({
    parentName: z.string().min(2, v("parentNameRequired")),
    studentName: z.string().min(2, v("studentNameRequired")),
    whatsapp: z.string().min(10, v("whatsappRequired")),
    gender: z.enum(["male", "female"], { message: v("genderRequired") }),
    age: z.string().min(1, v("ageRequired")),
    country: z.string().min(1, v("countryRequired")),
  });

  const step2 = z.object({
    subject: z.string().min(1, v("subjectRequired")),
    teacherGender: z.enum(["male", "female", "any"], {
      message: v("teacherGenderRequired"),
    }),
    preferredTrialDate: z
      .string()
      .min(1, v("trialDateRequired"))
      .refine(isTodayOrFuture, v("trialDatePast")),
    preferredTrialTime: z.string().min(1, v("trialTimeRequired")),
    additionalNote: z.string().optional(),
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
    subject: z.string().min(2, v("contactSubjectRequired")),
    phone: z.string().optional(),
    message: z.string().min(10, v("contactMessageRequired")),
  });
}

export type ContactFormValues = z.infer<ReturnType<typeof createContactSchema>>;
