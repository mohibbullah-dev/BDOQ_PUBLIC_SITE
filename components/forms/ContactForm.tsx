"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocale, useTranslations } from "next-intl";
import { Mail, MessageSquare, User } from "lucide-react";
import { API_BASE } from "@/lib/constants";
import { mapContactFormToApi } from "@/lib/mappers/contactMessage";
import { useFormValidation } from "@/lib/i18n/useFormValidation";
import {
  createContactSchema,
  type ContactFormValues,
} from "@/lib/validators/contact";
import { FormAlert } from "@/components/forms/shared/FormAlert";
import { FormCard } from "@/components/forms/shared/FormCard";
import { SubmitButton } from "@/components/forms/shared/SubmitButton";
import {
  formErrorClass,
  formInputClass,
  formLabelClass,
  formTextareaClass,
} from "@/components/forms/shared/formStyles";
import { cn } from "@/lib/cn";

function FieldIcon({ children }: { children: React.ReactNode }) {
  return (
    <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-primary/50">
      {children}
    </span>
  );
}

export function ContactForm() {
  const locale = useLocale();
  const t = useTranslations("pages.contact");
  const tCta = useTranslations("cta");
  const validate = useFormValidation();
  const schema = useMemo(
    () => createContactSchema(validate),
    [validate, locale]
  );

  const [submitState, setSubmitState] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: ContactFormValues): Promise<void> => {
    setSubmitState("loading");
    try {
      const response = await fetch(`${API_BASE}/public/contact-messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(mapContactFormToApi(data, locale)),
        cache: "no-store",
      });
      if (!response.ok) throw new Error("Failed");
      setSubmitState("success");
      reset();
    } catch {
      setSubmitState("error");
    }
  };

  return (
    <FormCard>
      <p className="mb-1 font-body text-xs font-bold uppercase tracking-[0.16em] text-primary">
        {t("formEyebrow")}
      </p>
      <h2 className="mb-6 font-amiri text-2xl font-bold text-primary-dark md:text-3xl">
        {t("formTitle")}
      </h2>

      {submitState === "success" && (
        <FormAlert type="success" message={t("success")} className="mb-5" />
      )}

      {submitState === "error" && (
        <FormAlert type="error" message={t("error")} className="mb-5" />
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="contact-name" className={formLabelClass}>
              {t("name")} <span className="text-primary">*</span>
            </label>
            <div className="relative">
              <FieldIcon>
                <User className="h-4 w-4" aria-hidden="true" />
              </FieldIcon>
              <input
                id="contact-name"
                className={cn(formInputClass, "pl-10")}
                autoComplete="name"
                {...register("name")}
              />
            </div>
            {errors.name && (
              <p className={formErrorClass}>{errors.name.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="contact-email" className={formLabelClass}>
              {t("email")} <span className="text-primary">*</span>
            </label>
            <div className="relative">
              <FieldIcon>
                <Mail className="h-4 w-4" aria-hidden="true" />
              </FieldIcon>
              <input
                id="contact-email"
                type="email"
                className={cn(formInputClass, "pl-10")}
                autoComplete="email"
                {...register("email")}
              />
            </div>
            {errors.email && (
              <p className={formErrorClass}>{errors.email.message}</p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="contact-subject" className={formLabelClass}>
            {t("subject")} <span className="text-primary">*</span>
          </label>
          <div className="relative">
            <FieldIcon>
              <MessageSquare className="h-4 w-4" aria-hidden="true" />
            </FieldIcon>
            <input
              id="contact-subject"
              className={cn(formInputClass, "pl-10")}
              {...register("subject")}
            />
          </div>
          {errors.subject && (
            <p className={formErrorClass}>{errors.subject.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="contact-message" className={formLabelClass}>
            {t("message")} <span className="text-primary">*</span>
          </label>
          <textarea
            id="contact-message"
            rows={5}
            className={formTextareaClass}
            {...register("message")}
          />
          {errors.message && (
            <p className={formErrorClass}>{errors.message.message}</p>
          )}
        </div>

        <SubmitButton
          isLoading={submitState === "loading"}
          label={tCta("sendMessage")}
          loadingLabel={tCta("sending")}
          className="w-full sm:w-auto"
        />
      </form>
    </FormCard>
  );
}
