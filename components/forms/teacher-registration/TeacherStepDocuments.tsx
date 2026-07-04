"use client";

import { useTranslations } from "next-intl";
import { Controller, useFormContext } from "react-hook-form";
import { BilingualLabel } from "@/components/forms/shared/BilingualLabel";
import { FileDropzone } from "@/components/forms/shared/FileDropzone";
import { MultiSelectChips } from "@/components/forms/shared/MultiSelectChips";
import { SingleSelectChips } from "@/components/forms/shared/SingleSelectChips";
import {
  formErrorClass,
  formTextareaClass,
} from "@/components/forms/shared/formStyles";
import {
  INTERNET_CONNECTION_TYPES,
  TEACHING_DEVICE_OPTIONS,
} from "@/lib/formOptions";
import type { TeacherRegistrationFormValues } from "@/lib/validators/teacherRegistration";

export function TeacherStepDocuments() {
  const t = useTranslations("forms.teacherRegistration");
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<TeacherRegistrationFormValues>();

  return (
    <div className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Controller
          name="profilePhotoFile"
          control={control}
          render={({ field }) => (
            <FileDropzone
              id="profilePhotoFile"
              label={t("files.profilePhoto")}
              accept="image/*"
              value={field.value ?? null}
              onChange={field.onChange}
              error={errors.profilePhotoFile?.message}
            />
          )}
        />
        <Controller
          name="cvFile"
          control={control}
          render={({ field }) => (
            <FileDropzone
              id="cvFile"
              label={t("files.cv")}
              accept=".pdf,application/pdf"
              value={field.value ?? null}
              onChange={field.onChange}
              error={errors.cvFile?.message}
            />
          )}
        />
      </div>

      <Controller
        name="screenshotFile"
        control={control}
        render={({ field }) => (
          <FileDropzone
            id="screenshotFile"
            label={t("files.screenshot")}
            accept="image/*"
            value={field.value ?? null}
            onChange={field.onChange}
            error={errors.screenshotFile?.message}
          />
        )}
      />

      <div>
        <BilingualLabel
          labelBn="কোন ডিভাইসে পড়াবেন?"
          labelEn="Which device will you use for teaching?"
          required
        />
        <Controller
          name="teachingDevices"
          control={control}
          render={({ field }) => (
            <MultiSelectChips
              value={field.value ?? []}
              onChange={field.onChange}
              error={errors.teachingDevices?.message}
              options={TEACHING_DEVICE_OPTIONS}
            />
          )}
        />
      </div>

      <div>
        <BilingualLabel
          labelBn="ইন্টারনেট সংযোগ"
          labelEn="Internet connection type"
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

      <div>
        <BilingualLabel
          htmlFor="motivation"
          labelBn="কেন BDOQ Academy-তে যোগ দিতে চান?"
          labelEn="Why do you want to join BDOQ Academy?"
          required
        />
        <textarea
          id="motivation"
          rows={5}
          className={formTextareaClass}
          {...register("motivation")}
        />
        {errors.motivation && (
          <p className={formErrorClass}>{errors.motivation.message}</p>
        )}
      </div>
    </div>
  );
}
