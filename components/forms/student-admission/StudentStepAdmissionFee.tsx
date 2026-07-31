"use client";

import { useMemo } from "react";
import { useTranslations } from "next-intl";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import { BilingualLabel } from "@/components/forms/shared/BilingualLabel";
import { FileDropzone } from "@/components/forms/shared/FileDropzone";
import {
  formErrorClass,
  formInputClass,
  formTextareaClass,
} from "@/components/forms/shared/formStyles";
import {
  ADMISSION_FEE,
  ADMISSION_PAYMENT_ACCOUNTS,
  ACADEMY_INFO,
  WHATSAPP_URL,
} from "@/lib/constants";
import { usePaymentSelectOptions } from "@/lib/i18n/useFormSelectOptions";
import type { StudentAdmissionFormValues } from "@/lib/validators/studentAdmission";

export function StudentStepAdmissionFee() {
  const t = useTranslations("forms.studentAdmission.admissionFee");
  const paymentOptions = usePaymentSelectOptions();
  const {
    register,
    control,
    setValue,
    formState: { errors },
  } = useFormContext<StudentAdmissionFormValues>();

  const currency = useWatch({ control, name: "admissionFeeCurrency" }) ?? "bdt";
  const paymentMethod = useWatch({ control, name: "admissionFeePaymentMethod" });

  const expectedAmount = ADMISSION_FEE[currency === "usd" ? "usd" : "bdt"];
  const amountLabel =
    currency === "usd" ? `$${expectedAmount} USD` : `৳${expectedAmount} BDT`;

  const instructionLines = useMemo(() => {
    if (!paymentMethod) return [];

    switch (paymentMethod) {
      case "bkash":
        return [
          t("instructions.sendTo", {
            method: ADMISSION_PAYMENT_ACCOUNTS.bkash.label,
            account: ADMISSION_PAYMENT_ACCOUNTS.bkash.number,
          }),
          t("instructions.amount", { amount: amountLabel }),
          t("instructions.referenceHint"),
        ];
      case "nagad":
        return [
          t("instructions.sendTo", {
            method: ADMISSION_PAYMENT_ACCOUNTS.nagad.label,
            account: ADMISSION_PAYMENT_ACCOUNTS.nagad.number,
          }),
          t("instructions.amount", { amount: amountLabel }),
          t("instructions.referenceHint"),
        ];
      case "bank":
        return [
          t("instructions.bankIntro", {
            name: ADMISSION_PAYMENT_ACCOUNTS.bank.accountName,
          }),
          ADMISSION_PAYMENT_ACCOUNTS.bank.note,
          t("instructions.amount", { amount: amountLabel }),
        ];
      case "paypal":
        return [
          t("instructions.sendTo", {
            method: ADMISSION_PAYMENT_ACCOUNTS.paypal.label,
            account: ADMISSION_PAYMENT_ACCOUNTS.paypal.email,
          }),
          t("instructions.amount", { amount: amountLabel }),
        ];
      case "cash":
        return [
          ADMISSION_PAYMENT_ACCOUNTS.cash.note,
          t("instructions.contactWhatsApp", { phone: ACADEMY_INFO.whatsapp }),
        ];
      default:
        return [];
    }
  }, [amountLabel, paymentMethod, t]);

  const handleCurrencyChange = (next: "bdt" | "usd"): void => {
    setValue("admissionFeeCurrency", next, { shouldValidate: true });
    setValue(
      "admissionFeeAmount",
      String(ADMISSION_FEE[next === "usd" ? "usd" : "bdt"]),
      { shouldValidate: true }
    );
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-primary/20 bg-primary/5 p-5">
        <p className="font-body text-sm leading-relaxed text-text-dark">
          {t("intro")}
        </p>
        <p className="mt-3 font-inter text-lg font-semibold text-primary-dark">
          {t("expectedFee")}: {amountLabel}
        </p>
        <p className="mt-2 font-body text-xs text-text-gray">{t("manualNote")}</p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <BilingualLabel
            htmlFor="admissionFeeCurrency"
            labelBn="ফি মুদ্রা"
            labelEn="Fee currency"
            required
          />
          <select
            id="admissionFeeCurrency"
            className={formInputClass}
            {...register("admissionFeeCurrency")}
            onChange={(event) =>
              handleCurrencyChange(event.target.value as "bdt" | "usd")
            }
          >
            <option value="bdt">{t("currencyBdt")}</option>
            <option value="usd">{t("currencyUsd")}</option>
          </select>
          {errors.admissionFeeCurrency && (
            <p className={formErrorClass}>{errors.admissionFeeCurrency.message}</p>
          )}
        </div>

        <div>
          <BilingualLabel
            htmlFor="admissionFeeAmount"
            labelBn="পরিশোধিত ভর্তি ফি"
            labelEn="Admission fee paid"
            required
          />
          <input
            id="admissionFeeAmount"
            type="number"
            min={1}
            step="0.01"
            className={formInputClass}
            {...register("admissionFeeAmount")}
          />
          {errors.admissionFeeAmount && (
            <p className={formErrorClass}>{errors.admissionFeeAmount.message}</p>
          )}
        </div>
      </div>

      <div>
        <BilingualLabel
          htmlFor="admissionFeePaymentMethod"
          labelBn="পেমেন্ট পদ্ধতি"
          labelEn="How did you pay the admission fee?"
          required
        />
        <select
          id="admissionFeePaymentMethod"
          className={formInputClass}
          {...register("admissionFeePaymentMethod")}
        >
          <option value="">{t("selectMethod")}</option>
          {paymentOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {errors.admissionFeePaymentMethod && (
          <p className={formErrorClass}>
            {errors.admissionFeePaymentMethod.message}
          </p>
        )}
      </div>

      {instructionLines.length > 0 ? (
        <div
          className="rounded-xl border border-gray-200 bg-bg-light/80 p-4"
          aria-live="polite"
        >
          <p className="font-body text-sm font-semibold text-text-dark">
            {t("instructions.title")}
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-5 font-body text-sm text-text-gray">
            {instructionLines.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block text-sm font-semibold text-primary hover:text-primary-dark"
          >
            {t("instructions.whatsappHelp")}
          </a>
        </div>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <BilingualLabel
            htmlFor="admissionPaymentReference"
            labelBn="ট্রানজেকশন / রেফারেন্স নম্বর"
            labelEn="Transaction / reference number"
            required
          />
          <input
            id="admissionPaymentReference"
            type="text"
            className={formInputClass}
            placeholder={t("referencePlaceholder")}
            {...register("admissionPaymentReference")}
          />
          {errors.admissionPaymentReference && (
            <p className={formErrorClass}>
              {errors.admissionPaymentReference.message}
            </p>
          )}
        </div>

        <div>
          <BilingualLabel
            htmlFor="admissionPaymentDate"
            labelBn="পেমেন্টের তারিখ"
            labelEn="Payment date"
            required
          />
          <input
            id="admissionPaymentDate"
            type="date"
            className={formInputClass}
            {...register("admissionPaymentDate")}
          />
          {errors.admissionPaymentDate && (
            <p className={formErrorClass}>{errors.admissionPaymentDate.message}</p>
          )}
        </div>
      </div>

      <div>
        <BilingualLabel
          htmlFor="admissionPaymentSender"
          labelBn="প্রেরকের নম্বর / অ্যাকাউন্ট (ঐচ্ছিক)"
          labelEn="Sender mobile / account (optional)"
        />
        <input
          id="admissionPaymentSender"
          type="text"
          className={formInputClass}
          placeholder={t("senderPlaceholder")}
          {...register("admissionPaymentSender")}
        />
      </div>

      <div>
        <BilingualLabel
          htmlFor="admissionPaymentNote"
          labelBn="অতিরিক্ত নোট (ঐচ্ছিক)"
          labelEn="Additional note (optional)"
        />
        <textarea
          id="admissionPaymentNote"
          rows={3}
          className={formTextareaClass}
          placeholder={t("notePlaceholder")}
          {...register("admissionPaymentNote")}
        />
      </div>

      <Controller
        name="admissionPaymentProofFile"
        control={control}
        render={({ field }) => (
          <FileDropzone
            id="admissionPaymentProofFile"
            label={t("proofLabel")}
            accept="image/*"
            value={field.value ?? null}
            onChange={field.onChange}
            error={errors.admissionPaymentProofFile?.message}
          />
        )}
      />

      <p className="font-body text-xs text-text-gray">{t("proofHint")}</p>
    </div>
  );
}
