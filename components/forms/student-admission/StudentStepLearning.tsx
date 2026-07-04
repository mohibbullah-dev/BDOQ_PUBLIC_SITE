"use client";

import { useTranslations } from "next-intl";
import { Controller, useFormContext } from "react-hook-form";
import { BilingualLabel } from "@/components/forms/shared/BilingualLabel";
import { MultiSelectChips } from "@/components/forms/shared/MultiSelectChips";
import { SingleSelectChips } from "@/components/forms/shared/SingleSelectChips";
import {
  formErrorClass,
  formInputClass,
} from "@/components/forms/shared/formStyles";
import {
  usePackageSelectOptions,
  usePaymentSelectOptions,
} from "@/lib/i18n/useFormSelectOptions";
import {
  CLASS_TYPE_OPTIONS,
  DEVICE_MULTI_OPTIONS,
  HOUR_OPTIONS,
  INTERNET_CONNECTION_TYPES,
  MINUTE_OPTIONS,
  QURAN_READING_LEVELS,
  TEACHING_LANGUAGE_OPTIONS,
  TIMEZONE_OPTIONS,
  TOPIC_INTEREST_OPTIONS,
} from "@/lib/formOptions";
import type { StudentAdmissionFormValues } from "@/lib/validators/studentAdmission";

export function StudentStepLearning() {
  const t = useTranslations("forms.studentAdmission");
  const tCommon = useTranslations("forms.common");
  const packageOptions = usePackageSelectOptions();
  const paymentOptions = usePaymentSelectOptions();
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<StudentAdmissionFormValues>();

  return (
    <div className="space-y-6">
      <div>
        <BilingualLabel
          labelBn="আপনি কতটুকু কুরআন পড়তে পারেন?"
          labelEn="How much of the Quran can you currently read?"
          required
        />
        <Controller
          name="quranReadingLevel"
          control={control}
          render={({ field }) => (
            <SingleSelectChips
              columns={2}
              value={field.value ?? ""}
              onChange={field.onChange}
              error={errors.quranReadingLevel?.message}
              options={QURAN_READING_LEVELS}
            />
          )}
        />
      </div>

      <div>
        <BilingualLabel
          labelBn="কোন ভাষায় পড়তে চান?"
          labelEn="In which language would you like to learn from BDOQ?"
          required
        />
        <Controller
          name="teachingLanguage"
          control={control}
          render={({ field }) => (
            <SingleSelectChips
              columns={4}
              value={field.value ?? ""}
              onChange={field.onChange}
              error={errors.teachingLanguage?.message}
              options={TEACHING_LANGUAGE_OPTIONS}
            />
          )}
        />
      </div>

      <div>
        <BilingualLabel
          labelBn="কোন বিষয় শিখতে চান?"
          labelEn="What topics would you like to learn?"
          required
        />
        <Controller
          name="topicsOfInterest"
          control={control}
          render={({ field }) => (
            <MultiSelectChips
              value={field.value ?? []}
              onChange={field.onChange}
              error={errors.topicsOfInterest?.message}
              options={TOPIC_INTEREST_OPTIONS}
            />
          )}
        />
      </div>

      <div>
        <BilingualLabel
          labelBn="কিভাবে ক্লাস নিতে চান?"
          labelEn="How would you like to start?"
          required
        />
        <Controller
          name="classType"
          control={control}
          render={({ field }) => (
            <SingleSelectChips
              value={field.value ?? ""}
              onChange={field.onChange}
              error={errors.classType?.message}
              options={CLASS_TYPE_OPTIONS}
            />
          )}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <BilingualLabel
            htmlFor="timezone"
            labelBn="সুবিধাজনক টাইম জোন"
            labelEn="Convenient time zone"
            required
          />
          <select
            id="timezone"
            className={formInputClass}
            {...register("timezone")}
          >
            {TIMEZONE_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {errors.timezone && (
            <p className={formErrorClass}>{errors.timezone.message}</p>
          )}
        </div>
        <div>
          <BilingualLabel
            labelBn="পছন্দের ক্লাস সময়"
            labelEn="Preferred class time"
            required
          />
          <div className="grid grid-cols-3 gap-2">
            <select className={formInputClass} {...register("preferredHour")}>
              <option value="">{tCommon("hour")}</option>
              {HOUR_OPTIONS.map((hour) => (
                <option key={hour} value={hour}>
                  {hour}
                </option>
              ))}
            </select>
            <select className={formInputClass} {...register("preferredMinute")}>
              <option value="">{tCommon("minute")}</option>
              {MINUTE_OPTIONS.map((minute) => (
                <option key={minute} value={minute}>
                  {minute}
                </option>
              ))}
            </select>
            <select className={formInputClass} {...register("preferredPeriod")}>
              <option value="AM">{tCommon("am")}</option>
              <option value="PM">{tCommon("pm")}</option>
            </select>
          </div>
          {(errors.preferredHour || errors.preferredMinute) && (
            <p className={formErrorClass}>
              {errors.preferredHour?.message ?? errors.preferredMinute?.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <BilingualLabel
          labelBn="আপনার কোন ডিভাইস আছে?"
          labelEn="Which device(s) do you have?"
          required
        />
        <Controller
          name="devices"
          control={control}
          render={({ field }) => (
            <MultiSelectChips
              value={field.value ?? []}
              onChange={field.onChange}
              error={errors.devices?.message}
              options={DEVICE_MULTI_OPTIONS}
            />
          )}
        />
      </div>

      <div>
        <BilingualLabel
          labelBn="ইন্টারনেট সংযোগ"
          labelEn="Internet connection"
          required
        />
        <Controller
          name="internetType"
          control={control}
          render={({ field }) => (
            <SingleSelectChips
              columns={3}
              value={field.value ?? ""}
              onChange={field.onChange}
              error={errors.internetType?.message}
              options={INTERNET_CONNECTION_TYPES}
            />
          )}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <BilingualLabel
            htmlFor="packagePlan"
            labelBn="প্যাকেজ"
            labelEn="Select package"
            required
          />
          <select
            id="packagePlan"
            className={formInputClass}
            {...register("packagePlan")}
          >
            <option value="">{t("placeholders.package")}</option>
            {packageOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.packagePlan && (
            <p className={formErrorClass}>{errors.packagePlan.message}</p>
          )}
        </div>
        <div>
          <BilingualLabel
            htmlFor="paymentMethod"
            labelBn="পেমেন্ট পদ্ধতি"
            labelEn="How would you like to pay?"
            required
          />
          <select
            id="paymentMethod"
            className={formInputClass}
            {...register("paymentMethod")}
          >
            <option value="">{t("placeholders.payment")}</option>
            {paymentOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.paymentMethod && (
            <p className={formErrorClass}>{errors.paymentMethod.message}</p>
          )}
        </div>
      </div>
    </div>
  );
}
