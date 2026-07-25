"use client";

import { useTranslations } from "next-intl";
import { useCallback, useState } from "react";
import { Check, Link2 } from "lucide-react";
import {
  FacebookIcon,
  WhatsappIcon,
  XIcon,
} from "@/components/shared/SocialBrandIcons";
import type { IBlogPost } from "@/lib/types";
import { SITE_URL } from "@/lib/constants";
import { cn } from "@/lib/cn";

interface IBlogShareBarProps {
  post: IBlogPost;
  className?: string;
  variant?: "sidebar" | "inline";
}

export function BlogShareBar({
  post,
  className,
  variant = "inline",
}: IBlogShareBarProps) {
  const t = useTranslations("content.blog");
  const [copied, setCopied] = useState(false);
  const shareUrl = `${SITE_URL}/blog/${post.slug}`;
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(post.title);

  const handleCopy = useCallback(async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }, [shareUrl]);

  const shareLinks = [
    {
      label: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      icon: FacebookIcon,
    },
    {
      label: "X",
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      icon: XIcon,
    },
    {
      label: "WhatsApp",
      href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
      icon: WhatsappIcon,
    },
  ] as const;

  return (
    <div
      className={cn(
        variant === "inline"
          ? "flex flex-wrap items-center gap-3"
          : "space-y-3",
        className
      )}
    >
      <p
        className={cn(
          "font-body text-sm font-semibold text-primary-dark",
          variant === "sidebar" &&
            "text-xs font-bold uppercase tracking-wider text-text-gray"
        )}
      >
        {t("shareArticle")}
      </p>
      <div className="flex flex-wrap gap-2">
        {shareLinks.map(({ label, href, icon: Icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Share on ${label}`}
            className={cn(
              "inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-200",
              "text-text-gray transition-all duration-200 hover:border-primary hover:bg-bg-light hover:text-primary"
            )}
          >
            <Icon className="h-4 w-4" aria-hidden="true" />
          </a>
        ))}
        <button
          type="button"
          onClick={handleCopy}
          aria-label={copied ? t("linkCopied") : t("copyLink")}
          className={cn(
            "inline-flex h-10 w-10 items-center justify-center rounded-full border",
            "transition-all duration-200",
            copied
              ? "border-primary bg-bg-light text-primary"
              : "border-gray-200 text-text-gray hover:border-primary hover:bg-bg-light hover:text-primary"
          )}
        >
          {copied ? (
            <Check className="h-4 w-4" aria-hidden="true" />
          ) : (
            <Link2 className="h-4 w-4" aria-hidden="true" />
          )}
        </button>
      </div>
    </div>
  );
}
