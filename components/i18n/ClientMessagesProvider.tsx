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
