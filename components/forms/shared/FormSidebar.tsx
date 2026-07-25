"use client";

import { MessageCircle, ShieldCheck, Users, Clock3, Check } from "lucide-react";
import { useTranslations } from "next-intl";
import { ACADEMY_INFO } from "@/lib/constants";
import type { FormLayoutVariant } from "@/lib/forms/formLayout";
import { useStepTitle } from "@/lib/i18n/useFormLocale";
import type { IWizardStep } from "@/components/forms/wizard/WizardProgress";
import { cn } from "@/lib/cn";

interface IFormSidebarProps {
  variant: FormLayoutVariant;
  steps?: IWizardStep[];
  currentStep?: number;
  className?: string;
}

const TRUST_ICONS = [ShieldCheck, MessageCircle, Users] as const;

export function FormSidebar({
  variant,
  steps,
  currentStep = 0,
  className,
}: IFormSidebarProps) {
  const t = useTranslations(`forms.layout.${variant}`);
  const tCommon = useTranslations("forms.layout");
  const stepTitle = useStepTitle();
  const whatsappUrl = `https://wa.me/${ACADEMY_INFO.whatsapp.replace(/\D/g, "")}`;
  const trustKeys = ["trustSecure", "trustWhatsapp", "trustTeachers"] as const;

  return (
    <aside className={cn("lg:sticky lg:top-28", className)}>
      <div className="space-y-4">
        <div className="rounded-2xl bg-primary-dark p-5 text-white shadow-lg shadow-primary/20 md:p-6">
          <p className="font-amiri text-lg text-white/90">{tCommon("ahlan")}</p>
          <h2 className="mt-2 font-playfair text-xl font-bold md:text-2xl">
            {t("title")}
          </h2>
          <p className="mt-2 font-body text-sm leading-relaxed text-white/80">
            {t("subtitle")}
          </p>
          <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 font-body text-xs font-semibold text-white">
            <Clock3 className="h-3.5 w-3.5" aria-hidden="true" />
            {t("estimate")}
          </div>
        </div>

        {steps && steps.length > 0 ? (
          <ol className="hidden space-y-2 lg:block">
            {steps.map((step, index) => {
              const isActive = index === currentStep;
              const isComplete = index < currentStep;

              return (
                <li
                  key={step.id}
                  className={cn(
                    "flex items-center gap-3 rounded-full border px-3 py-2.5 transition-colors",
                    isActive
                      ? "border-primary/25 bg-white shadow-sm"
                      : isComplete
                        ? "border-primary/15 bg-bg-light/80"
                        : "border-transparent bg-transparent"
                  )}
                >
                  <span
                    className={cn(
                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold",
                      isComplete
                        ? "bg-primary text-white"
                        : isActive
                          ? "bg-primary text-white"
                          : "bg-primary/10 text-primary"
                    )}
                  >
                    {isComplete ? (
                      <Check className="h-3.5 w-3.5" aria-hidden="true" />
                    ) : (
                      index + 1
                    )}
                  </span>
                  <span
                    className={cn(
                      "font-body text-sm leading-snug",
                      isActive
                        ? "font-semibold text-primary-dark"
                        : "font-medium text-text-gray"
                    )}
                  >
                    {stepTitle(step)}
                  </span>
                </li>
              );
            })}
          </ol>
        ) : null}

        <ul className="space-y-2.5">
          {trustKeys.map((key, index) => {
            const Icon = TRUST_ICONS[index] ?? ShieldCheck;
            return (
              <li
                key={key}
                className="flex items-center gap-3 rounded-xl border border-primary/15 bg-bg-light/70 px-3 py-2.5"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-primary shadow-sm">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </span>
                <span className="font-body text-sm font-medium text-primary-dark">
                  {t(key)}
                </span>
              </li>
            );
          })}
        </ul>

        <div className="rounded-xl border border-primary/15 bg-white p-4 shadow-sm">
          <p className="font-body text-[11px] font-bold uppercase tracking-[0.16em] text-text-gray">
            {tCommon("needHelp")}
          </p>
          <p className="mt-1 font-body text-sm text-text-gray">
            {tCommon("helpBody")}
          </p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-2 font-body text-sm font-semibold text-primary transition-colors hover:text-primary-dark"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            WhatsApp · {ACADEMY_INFO.whatsapp}
          </a>
        </div>
      </div>
    </aside>
  );
}
