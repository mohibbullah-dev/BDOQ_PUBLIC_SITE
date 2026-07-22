"use client";

import { useTranslations } from "next-intl";
import { useCallback, useState } from "react";
import { Check, Copy, Link2, Share2 } from "lucide-react";
import { FacebookIcon } from "@/components/shared/SocialBrandIcons";
import type { IBlogPost } from "@/lib/types";
import { SITE_URL } from "@/lib/constants";
import { cn } from "@/lib/cn";

interface IBlogShareBarProps {
  post: IBlogPost;
  className?: string;
}

export function BlogShareBar({ post, className }: IBlogShareBarProps) {
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
      label: "WhatsApp",
      href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
      icon: Share2,
    },
  ] as const;

  return (
    <div className={cn("space-y-3", className)}>
      <p className="font-body text-xs font-bold uppercase tracking-wider text-text-gray">
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
              "text-text-gray transition-all duration-200 hover:border-primary hover:bg-[#E8FAF2] hover:text-primary"
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
            "inline-flex h-10 min-w-10 items-center justify-center gap-1.5 rounded-full border px-3",
            "font-body text-xs font-semibold transition-all duration-200",
            copied
              ? "border-primary bg-[#E8FAF2] text-primary"
              : "border-gray-200 text-text-gray hover:border-primary hover:bg-[#E8FAF2] hover:text-primary"
          )}
        >
          {copied ? (
            <Check className="h-4 w-4" aria-hidden="true" />
          ) : (
            <Copy className="h-4 w-4" aria-hidden="true" />
          )}
          {copied ? t("copied") : t("copy")}
        </button>
      </div>
      <p className="flex items-start gap-2 font-body text-xs leading-relaxed text-text-gray">
        <Link2 className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
        <span className="break-all">{shareUrl}</span>
      </p>
    </div>
  );
}
