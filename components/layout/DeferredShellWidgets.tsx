"use client";

import dynamic from "next/dynamic";

const WhatsAppButton = dynamic(
  () =>
    import("@/components/shared/WhatsAppButton").then((m) => ({
      default: m.WhatsAppButton,
    })),
  { ssr: false }
);

const ScrollToTop = dynamic(
  () =>
    import("@/components/shared/ScrollToTop").then((m) => ({
      default: m.ScrollToTop,
    })),
  { ssr: false }
);

const WelcomeModal = dynamic(
  () =>
    import("@/components/home/WelcomeModal").then((m) => ({
      default: m.WelcomeModal,
    })),
  { ssr: false }
);

export function DeferredShellWidgets() {
  return (
    <>
      <WhatsAppButton />
      <ScrollToTop />
      <WelcomeModal />
    </>
  );
}
