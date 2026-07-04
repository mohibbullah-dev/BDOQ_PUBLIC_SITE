import { ShieldCheck, Award, Calendar, BookOpen } from "lucide-react";
import Link from "next/link";

interface ICertificateVerifyViewProps {
  certificate: {
    certificateId: string;
    studentName: string;
    courseName: string;
    issueDate: string;
    courseDuration?: string;
    grade?: string;
    showExcellentBadge?: boolean;
    performanceTextEn?: string;
  };
}

function formatDate(value: string): string {
  return new Date(value).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function CertificateVerifyView({
  certificate,
}: ICertificateVerifyViewProps) {
  return (
    <section className="py-16 md:py-24 bg-bg-light min-h-[70vh]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-primary/10 bg-white p-8 shadow-lg md:p-10">
          <div className="mb-6 flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
              <ShieldCheck className="h-6 w-6" aria-hidden="true" />
            </span>
            <div>
              <p className="font-inter text-sm font-semibold uppercase tracking-wide text-emerald-700">
                Verified Certificate
              </p>
              <h1 className="font-playfair text-2xl font-bold text-primary-dark md:text-3xl">
                Certificate Authentic
              </h1>
            </div>
          </div>

          <dl className="space-y-4">
            <div className="rounded-2xl bg-bg-light px-4 py-3">
              <dt className="font-inter text-xs uppercase tracking-wide text-text-gray">
                Certificate ID
              </dt>
              <dd className="mt-1 font-inter text-base font-semibold text-primary-dark">
                {certificate.certificateId}
              </dd>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-gray-100 px-4 py-3">
                <dt className="flex items-center gap-2 font-inter text-xs uppercase tracking-wide text-text-gray">
                  <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
                  Student
                </dt>
                <dd className="mt-1 font-inter text-base font-semibold text-primary-dark">
                  {certificate.studentName}
                </dd>
              </div>

              <div className="rounded-2xl border border-gray-100 px-4 py-3">
                <dt className="flex items-center gap-2 font-inter text-xs uppercase tracking-wide text-text-gray">
                  <Award className="h-3.5 w-3.5" aria-hidden="true" />
                  Course
                </dt>
                <dd className="mt-1 font-inter text-base font-semibold text-primary-dark">
                  {certificate.courseName}
                </dd>
              </div>

              <div className="rounded-2xl border border-gray-100 px-4 py-3">
                <dt className="flex items-center gap-2 font-inter text-xs uppercase tracking-wide text-text-gray">
                  <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                  Issue date
                </dt>
                <dd className="mt-1 font-inter text-base font-semibold text-primary-dark">
                  {formatDate(certificate.issueDate)}
                </dd>
              </div>

              {certificate.grade ? (
                <div className="rounded-2xl border border-gray-100 px-4 py-3">
                  <dt className="font-inter text-xs uppercase tracking-wide text-text-gray">
                    Grade
                  </dt>
                  <dd className="mt-1 font-inter text-base font-semibold text-primary-dark">
                    {certificate.grade}
                  </dd>
                </div>
              ) : null}
            </div>

            {certificate.performanceTextEn ? (
              <p className="rounded-2xl border border-primary/10 bg-primary/5 px-4 py-3 font-inter text-sm leading-relaxed text-primary-dark">
                {certificate.performanceTextEn}
              </p>
            ) : null}

            {certificate.showExcellentBadge ? (
              <p className="inline-flex items-center gap-2 rounded-full bg-gold/15 px-4 py-2 font-inter text-sm font-semibold text-primary-dark">
                <Award className="h-4 w-4 text-gold" aria-hidden="true" />
                Excellent Performance
              </p>
            ) : null}
          </dl>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 font-inter text-sm font-semibold text-white transition hover:bg-primary-dark"
            >
              Back to home
            </Link>
            <Link
              href="/courses"
              className="inline-flex items-center justify-center rounded-full border-2 border-primary px-6 py-3 font-inter text-sm font-semibold text-primary transition hover:bg-primary hover:text-white"
            >
              Explore courses
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
