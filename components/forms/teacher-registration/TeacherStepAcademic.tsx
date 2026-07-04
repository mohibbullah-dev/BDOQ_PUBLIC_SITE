"use client";

import { useTranslations } from "next-intl";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import { BilingualLabel } from "@/components/forms/shared/BilingualLabel";
import { FileDropzone } from "@/components/forms/shared/FileDropzone";
import { SingleSelectChips } from "@/components/forms/shared/SingleSelectChips";
import {
  formErrorClass,
  formInputClass,
} from "@/components/forms/shared/formStyles";
import { HAFIZ_OPTIONS } from "@/lib/formOptions";
import type { TeacherRegistrationFormValues } from "@/lib/validators/teacherRegistration";

export function TeacherStepAcademic() {
  const t = useTranslations("forms.teacherRegistration");
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<TeacherRegistrationFormValues>();

  const isHafiz = useWatch({ control, name: "isHafiz" });

  return (
    <div className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <BilingualLabel
            htmlFor="educationQualification"
            labelBn="সর্বোচ্চ শিক্ষাগত যোগ্যতা"
            labelEn="Highest qualification"
            required
          />
          <input
            id="educationQualification"
            className={formInputClass}
            {...register("educationQualification")}
          />
          {errors.educationQualification && (
            <p className={formErrorClass}>
              {errors.educationQualification.message}
            </p>
          )}
        </div>
        <div>
          <BilingualLabel
            htmlFor="educationSubject"
            labelBn="বিষয় / মেজর"
            labelEn="Subject / Major"
            required
          />
          <input
            id="educationSubject"
            className={formInputClass}
            {...register("educationSubject")}
          />
          {errors.educationSubject && (
            <p className={formErrorClass}>{errors.educationSubject.message}</p>
          )}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <BilingualLabel
            htmlFor="educationInstitution"
            labelBn="প্রতিষ্ঠান"
            labelEn="Institution"
            required
          />
          <input
            id="educationInstitution"
            className={formInputClass}
            {...register("educationInstitution")}
          />
          {errors.educationInstitution && (
            <p className={formErrorClass}>
              {errors.educationInstitution.message}
            </p>
          )}
        </div>
        <div>
          <BilingualLabel
            htmlFor="educationYear"
            labelBn="পাসের সাল"
            labelEn="Year of passing"
            required
          />
          <input
            id="educationYear"
            className={formInputClass}
            {...register("educationYear")}
          />
          {errors.educationYear && (
            <p className={formErrorClass}>{errors.educationYear.message}</p>
          )}
        </div>
      </div>

      <Controller
        name="certificateFile"
        control={control}
        render={({ field }) => (
          <FileDropzone
            id="certificateFile"
            label={t("files.certificate")}
            accept=".pdf,application/pdf"
            value={field.value ?? null}
            onChange={field.onChange}
            error={errors.certificateFile?.message}
          />
        )}
      />

      <div>
        <BilingualLabel
          labelBn="আপনি কি হাফিজ?"
          labelEn="Are you a Hafiz-e-Quran?"
          required
        />
        <Controller
          name="isHafiz"
          control={control}
          render={({ field }) => (
            <SingleSelectChips
              columns={2}
              value={field.value ?? ""}
              onChange={field.onChange}
              error={errors.isHafiz?.message}
              options={HAFIZ_OPTIONS}
            />
          )}
        />
      </div>

      {isHafiz === "yes" && (
        <div>
          <BilingualLabel
            htmlFor="parasMemorized"
            labelBn="কত পারা হিফজ?"
            labelEn="How many paras have you memorized?"
            required
          />
          <input
            id="parasMemorized"
            className={formInputClass}
            placeholder={t("placeholders.paras")}
            {...register("parasMemorized")}
          />
          {errors.parasMemorized && (
            <p className={formErrorClass}>{errors.parasMemorized.message}</p>
          )}
        </div>
      )}

      <div>
        <BilingualLabel
          htmlFor="islamicQualification"
          labelBn="ইসলামিক যোগ্যতা"
          labelEn="Islamic qualification"
          required
        />
        <input
          id="islamicQualification"
          className={formInputClass}
          placeholder={t("placeholders.islamicQual")}
          {...register("islamicQualification")}
        />
        {errors.islamicQualification && (
          <p className={formErrorClass}>
            {errors.islamicQualification.message}
          </p>
        )}
      </div>
    </div>
  );
}
