import type { ContactFormValues } from "@/lib/validators/contact";

export interface IContactMessageApiPayload {
  name: string;
  email: string;
  message: string;
  subject?: string;
  locale: "en" | "bn";
}

export function mapContactFormToApi(
  data: ContactFormValues,
  locale: string
): IContactMessageApiPayload {
  const subjectLine = data.subject.trim();
  const body = data.message.trim();

  return {
    name: data.name.trim(),
    email: data.email.trim().toLowerCase(),
    subject: subjectLine,
    message: subjectLine ? `[${subjectLine}]\n\n${body}` : body,
    locale: locale === "bn" ? "bn" : "en",
  };
}
