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
import { cn } from "@/lib/cn";

const SUBJECT_KEYS = [
  "general",
  "freeTrial",
  "pricing",
  "admission",
  "teacher",
  "other",
] as const;

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
    defaultValues: {
      subject: "general",
      phone: "",
    },
  });

  const onSubmit = async (data: ContactFormValues): Promise<void> => {
    setSubmitState("loading");
    try {
      const subjectLabel = t(
        `subjects.${data.subject as (typeof SUBJECT_KEYS)[number]}`
      );
      const response = await fetch(`${API_BASE}/public/contact-messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          mapContactFormToApi({ ...data, subject: subjectLabel }, locale)
        ),
        cache: "no-store",
      });
      if (!response.ok) throw new Error("Failed");
      setSubmitState("success");
      reset({ subject: "general", phone: "", name: "", email: "", message: "" });
    } catch {
      setSubmitState("error");
    }
  };

  return (
    <div
      id="contact-form"
      className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm md:p-7"
    >
      <h2 className="font-playfair text-2xl font-bold text-primary-dark">
        {t("formTitle")}
      </h2>
      <p className="mt-1 font-body text-sm text-text-gray">{t("formHint")}</p>

      {submitState === "success" && (
        <FormAlert type="success" message={t("success")} className="mt-5" />
      )}

      {submitState === "error" && (
        <FormAlert type="error" message={t("error")} className="mt-5" />
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-6 space-y-4"
        noValidate
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="contact-name" className={formLabelClass}>
              {t("name")} <span className="text-primary">*</span>
            </label>
            <input
              id="contact-name"
              className={formInputClass}
              autoComplete="name"
              placeholder={t("namePlaceholder")}
              {...register("name")}
            />
            {errors.name ? (
              <p className={formErrorClass}>{errors.name.message}</p>
            ) : null}
          </div>

          <div>
            <label htmlFor="contact-email" className={formLabelClass}>
              {t("email")} <span className="text-primary">*</span>
            </label>
            <input
              id="contact-email"
              type="email"
              className={formInputClass}
              autoComplete="email"
              placeholder={t("emailPlaceholder")}
              {...register("email")}
            />
            {errors.email ? (
              <p className={formErrorClass}>{errors.email.message}</p>
            ) : null}
          </div>

          <div>
            <label htmlFor="contact-subject" className={formLabelClass}>
              {t("subject")} <span className="text-primary">*</span>
            </label>
            <select
              id="contact-subject"
              className={cn(formInputClass, "cursor-pointer")}
              {...register("subject")}
            >
              {SUBJECT_KEYS.map((key) => (
                <option key={key} value={key}>
                  {t(`subjects.${key}`)}
                </option>
              ))}
            </select>
            {errors.subject ? (
              <p className={formErrorClass}>{errors.subject.message}</p>
            ) : null}
          </div>

          <div>
            <label htmlFor="contact-phone" className={formLabelClass}>
              {t("phone")}
            </label>
            <input
              id="contact-phone"
              type="tel"
              className={formInputClass}
              autoComplete="tel"
              placeholder={t("phonePlaceholder")}
              {...register("phone")}
            />
          </div>
        </div>

        <div>
          <label htmlFor="contact-message" className={formLabelClass}>
            {t("message")} <span className="text-primary">*</span>
          </label>
          <textarea
            id="contact-message"
            rows={5}
            className={formTextareaClass}
            placeholder={t("messagePlaceholder")}
            {...register("message")}
          />
          {errors.message ? (
            <p className={formErrorClass}>{errors.message.message}</p>
          ) : null}
        </div>

        <SubmitButton
          isLoading={submitState === "loading"}
          label={tCta("sendMessage")}
          loadingLabel={tCta("sending")}
          className={cn(
            "bg-[linear-gradient(135deg,#32C991_0%,#CD443F_100%)] shadow-primary/15",
            "hover:brightness-95"
          )}
        />
      </form>
    </div>
  );
}
