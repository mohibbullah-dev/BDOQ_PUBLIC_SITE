import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    borderRadius: {
      none: "0px",
      sm: "8px",
      DEFAULT: "8px",
      md: "8px",
      lg: "8px",
      xl: "8px",
      "2xl": "8px",
      "3xl": "8px",
      /* Pills / CTAs — keep true full radius */
      full: "9999px",
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: "#32C991",
          dark: "#269B6F",
          mint: "#ADEBB3",
        },
        teal: {
          accent: "#2DD4BF",
          DEFAULT: "#0D9488",
        },
        brand: {
          DEFAULT: "#32C991",
          light: "#E8FAF2",
          dark: "#269B6F",
        },
        "brand-red": {
          DEFAULT: "#CD443F",
          light: "#FBEAE9",
          dark: "#A83530",
        },
        gold: "#D4A853",
        "gold-light": "#F8F1DE",
        "bg-light": "#E8FAF2",
        cream: "#FDF6E3",
        dark: "#0A1628",
        "text-dark": "#111827",
        "text-gray": "#6B7280",
        border: "#E5E7EB",
      },
      fontFamily: {
        /* Plus Jakarta Sans — body/UI (font-body kept as legacy alias) */
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        inter: ["var(--font-body)", "system-ui", "sans-serif"],
        amiri: ["var(--font-amiri)", "Georgia", "serif"],
        playfair: ["var(--font-playfair)", "Georgia", "serif"],
        bengali: ["var(--font-bengali)", "sans-serif"],
        "bengali-display": ["var(--font-bengali-display)", "serif"],
        display: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideInLeft: {
          "0%": { opacity: "0", transform: "translateX(-20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        orbit: {
          "0%": {
            transform:
              "rotate(calc(var(--angle) * 1deg)) translateY(calc(var(--radius) * 1px)) rotate(calc(var(--angle) * -1deg))",
          },
          "100%": {
            transform:
              "rotate(calc(var(--angle) * 1deg + 360deg)) translateY(calc(var(--radius) * 1px)) rotate(calc((var(--angle) * -1deg) - 360deg))",
          },
        },
        "marquee-left": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        "marquee-right": {
          from: { transform: "translateX(-50%)" },
          to: { transform: "translateX(0)" },
        },
        "marquee-up": {
          from: { transform: "translateY(0)" },
          to: { transform: "translateY(-50%)" },
        },
        "marquee-down": {
          from: { transform: "translateY(-50%)" },
          to: { transform: "translateY(0)" },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.6s ease-out forwards",
        slideUp: "slideUp 0.6s ease-out forwards",
        slideInLeft: "slideInLeft 0.6s ease-out forwards",
        orbit: "orbit calc(var(--duration) * 1s) linear infinite",
        "marquee-left": "marquee-left 160s linear infinite",
        "marquee-right": "marquee-right 160s linear infinite",
        "marquee-up": "marquee-up 180s linear infinite",
        "marquee-down": "marquee-down 180s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
