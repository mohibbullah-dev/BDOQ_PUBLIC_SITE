import { ACADEMY_INFO, SITE_URL } from "@/lib/constants";

export function OrganizationJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: ACADEMY_INFO.name,
    url: SITE_URL,
    description: ACADEMY_INFO.tagline,
    telephone: ACADEMY_INFO.contactBD,
    email: ACADEMY_INFO.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Gopalganj",
      addressRegion: "Dhaka",
      addressCountry: "BD",
    },
    sameAs: [
      "https://www.facebook.com/bdonlinequranacademy",
      "https://www.youtube.com/@bdonlinequranacademy",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
