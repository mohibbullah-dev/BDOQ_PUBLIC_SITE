"use client";

interface IBlogErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function BlogError({ reset }: IBlogErrorProps) {
  return (
    <div className="py-24 text-center px-4">
      <h2 className="font-amiri text-2xl font-bold text-primary-dark mb-3">
        Unable to load blog
      </h2>
      <p className="font-inter text-text-gray mb-6 max-w-md mx-auto">
        Something went wrong while loading the blog. Please try again.
      </p>
      <button
        type="button"
        onClick={reset}
        className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-primary text-white font-semibold px-8 py-3 hover:bg-primary-dark transition-colors"
      >
        Try again
      </button>
    </div>
  );
}
