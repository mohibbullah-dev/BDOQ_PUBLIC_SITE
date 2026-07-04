import Link from "next/link";
import { Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <section className="min-h-[60vh] flex items-center justify-center py-16 md:py-24 bg-bg-light">
      <div className="max-w-lg mx-auto px-4 text-center">
        <div className="inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-6">
          <Search className="h-10 w-10" aria-hidden="true" />
        </div>
        <p className="font-amiri text-6xl font-bold text-primary-dark mb-2">
          404
        </p>
        <h1 className="font-amiri text-2xl md:text-3xl font-bold text-primary-dark mb-4">
          Page not found
        </h1>
        <p className="font-inter text-text-gray leading-relaxed mb-8">
          The page you are looking for does not exist or may have been moved.
          Return to BD Online Quran Academy home to continue your Quran learning
          journey.
        </p>
        <Link
          href="/"
          className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-primary text-white font-semibold px-8 py-3 hover:bg-primary-dark transition-colors"
        >
          <Home className="h-5 w-5" aria-hidden="true" />
          Back to Home
        </Link>
      </div>
    </section>
  );
}
