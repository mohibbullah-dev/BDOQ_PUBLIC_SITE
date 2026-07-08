"use client";

import Link from "next/link";
import type { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { PORTAL_BASE_URL, PORTAL_LOGIN_URL } from "@/lib/navigation";
import {
  formInputClass,
  formLabelClass,
} from "@/components/forms/shared/formStyles";
import { cn } from "@/lib/cn";

export function LoginPageContent() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();
    const portalUrl = new URL(PORTAL_LOGIN_URL);
    if (email) portalUrl.searchParams.set("email", email);
    if (rememberMe) portalUrl.searchParams.set("remember", "1");
    window.location.href = portalUrl.toString();
  };

  return (
    <section className="bg-bg-light py-12 md:py-16">
      <div className="site-container flex items-center justify-center">
        <div className="w-full max-w-md">
          <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="login-email" className={formLabelClass}>
                  Username / Email
                </label>
                <input
                  id="login-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={formInputClass}
                  autoComplete="username"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label htmlFor="login-password" className={formLabelClass}>
                  Password
                </label>
                <input
                  id="login-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={formInputClass}
                  autoComplete="current-password"
                  placeholder="••••••••"
                />
              </div>

              <div className="flex items-center justify-between gap-4">
                <label className="inline-flex min-h-[44px] items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <span className="font-inter text-sm text-text-dark">
                    Keep me signed in
                  </span>
                </label>
                <a
                  href={`${PORTAL_BASE_URL}/forgot-password`}
                  className="font-inter text-sm font-medium text-primary hover:text-primary-dark transition-colors"
                >
                  Forgot Password?
                </a>
              </div>

              <button
                type="submit"
                className={cn(
                  "w-full min-h-[44px] rounded-full bg-primary hover:bg-primary-dark",
                  "font-inter text-sm font-semibold text-white transition-colors"
                )}
              >
                Sign In
              </button>
            </form>

            <p className="font-inter text-sm text-text-gray text-center mt-6">
              Don&apos;t have an account?{" "}
              <Link
                href="/student-admission"
                className="font-semibold text-primary hover:text-primary-dark transition-colors"
              >
                Register Now
              </Link>
            </p>

            <button
              type="button"
              onClick={() => router.push("/")}
              className="w-full mt-4 font-inter text-sm text-text-gray hover:text-primary transition-colors"
            >
              ← Back to website
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
