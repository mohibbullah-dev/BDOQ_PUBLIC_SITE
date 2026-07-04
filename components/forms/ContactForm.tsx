"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocale, useTranslations } from "next-intl";
import { API_BASE } from "@/lib/constants";
import { mapContactFormToApi } from "@/lib/mappers/contactMessage";
import { useFormValidation } from "@/lib/i18n/useFormValidation";
import {
  createContactSchema,
  type ContactFormValues,
} from "@/lib/validators/contact";
import { FormAlert } from "@/components/forms/shared/FormAlert";
import { SubmitButton } from "@/components/forms/shared/SubmitButton";
import {
  formErrorClass,
  formInputClass,
  formLabelClass,
  formTextareaClass,
} from "@/components/forms/shared/formStyles";

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
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-lg ring-1 ring-primary/5 md:p-8">
      <p className="mb-1 font-inter text-xs font-bold uppercase tracking-widest text-primary">
        {t("formEyebrow")}
      </p>
      <h2 className="mb-6 font-amiri text-2xl font-bold text-primary-dark">
        {t("formTitle")}
      </h2>

      {submitState === "success" && (
        <FormAlert type="success" message={t("success")} className="mb-5" />
      )}

      {submitState === "error" && (
        <FormAlert type="error" message={t("error")} className="mb-5" />
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
        <div>
          <label htmlFor="contact-name" className={formLabelClass}>
            {t("name")} <span className="text-red-500">*</span>
          </label>
          <input
            id="contact-name"
            className={formInputClass}
            autoComplete="name"
            {...register("name")}
          />
          {errors.name && (
            <p className={formErrorClass}>{errors.name.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="contact-email" className={formLabelClass}>
            {t("email")} <span className="text-red-500">*</span>
          </label>
          <input
            id="contact-email"
            type="email"
            className={formInputClass}
            autoComplete="email"
            {...register("email")}
          />
          {errors.email && (
            <p className={formErrorClass}>{errors.email.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="contact-subject" className={formLabelClass}>
            {t("subject")} <span className="text-red-500">*</span>
          </label>
          <input
            id="contact-subject"
            className={formInputClass}
            {...register("subject")}
          />
          {errors.subject && (
            <p className={formErrorClass}>{errors.subject.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="contact-message" className={formLabelClass}>
            {t("message")} <span className="text-red-500">*</span>
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
        />
      </form>
    </div>
  );
}
