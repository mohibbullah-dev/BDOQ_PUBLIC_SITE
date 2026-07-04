"use client";

import type { ReactNode } from "react";
import { NextIntlClientProvider, useLocale, useMessages } from "next-intl";

interface IClientMessagesProviderProps {
  messages: Record<string, unknown>;
  children: ReactNode;
}

function mergeMessageTrees(
  parent: Record<string, unknown>,
  extra: Record<string, unknown>
): Record<string, unknown> {
  const merged = { ...parent };

  for (const key of Object.keys(extra)) {
    const existing = merged[key];
    const incoming = extra[key];

    if (
      existing &&
      incoming &&
      typeof existing === "object" &&
      typeof incoming === "object" &&
      !Array.isArray(existing) &&
      !Array.isArray(incoming)
    ) {
      merged[key] = mergeMessageTrees(
        existing as Record<string, unknown>,
        incoming as Record<string, unknown>
      );
    } else {
      merged[key] = incoming;
    }
  }

  return merged;
}

function MergedMessagesProvider({
  messages,
  children,
}: IClientMessagesProviderProps) {
  const parentMessages = useMessages() as Record<string, unknown>;
  const parentLocale = useLocale();
  const merged = mergeMessageTrees(parentMessages, messages);

  // #region agent log
  fetch("http://127.0.0.1:7416/ingest/ebf5acf2-f99a-40e3-88a0-a4b533c78c2b", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Debug-Session-Id": "1c0f9f",
    },
    body: JSON.stringify({
      sessionId: "1c0f9f",
      runId: "post-fix",
      hypothesisId: "B",
      location: "ClientMessagesProvider:MergedMessagesProvider",
      message: "nested NextIntlClientProvider render",
      data: {
        parentLocale,
        passesLocaleToProvider: true,
        mergedMessageKeys: Object.keys(merged).length,
      },
      timestamp: Date.now(),
    }),
  }).catch(() => {});
  // #endregion

  return (
    <NextIntlClientProvider locale={parentLocale} messages={merged}>
      {children}
    </NextIntlClientProvider>
  );
}

export function ClientMessagesProvider({
  messages,
  children,
}: IClientMessagesProviderProps) {
  return (
    <MergedMessagesProvider messages={messages}>
      {children}
    </MergedMessagesProvider>
  );
}
