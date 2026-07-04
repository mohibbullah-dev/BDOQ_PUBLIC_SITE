import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SITE_URL } from "@/lib/constants";
import { CertificateVerifyView } from "@/components/certificates/CertificateVerifyView";
import { apiFetch } from "@/lib/api";

interface ICertificateVerifyPageProps {
  params: { certificateId: string };
}

interface ICertificateVerifyData {
  valid: boolean;
  certificateId: string;
  studentName: string;
  studentNameBn?: string;
  courseName: string;
  courseNameBn?: string;
  issueDate: string;
  courseDuration?: string;
  grade?: string;
  showExcellentBadge?: boolean;
  performanceTextEn?: string;
  performanceTextBn?: string;
}

interface IApiCertificateResponse {
  success: boolean;
  data: ICertificateVerifyData;
}

async function fetchCertificate(
  certificateId: string
): Promise<ICertificateVerifyData | null> {
  try {
    const response = await apiFetch<IApiCertificateResponse>(
      `/public/certificates/verify/${encodeURIComponent(certificateId)}`,
      { cache: "no-store" }
    );
    return response.data ?? null;
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: ICertificateVerifyPageProps): Promise<Metadata> {
  return {
    title: `Verify Certificate ${params.certificateId}`,
    description: "Verify BD Online Quran Academy certificate authenticity.",
    alternates: {
      canonical: `${SITE_URL}/certificates/verify/${params.certificateId}`,
    },
  };
}

export default async function CertificateVerifyPage({
  params,
}: ICertificateVerifyPageProps) {
  const certificate = await fetchCertificate(params.certificateId);
  if (!certificate) notFound();

  return <CertificateVerifyView certificate={certificate} />;
}
