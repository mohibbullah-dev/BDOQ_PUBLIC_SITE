/**
 * BDOQ Academy brand colors — sourced from the logo mark.
 * "BDOQ" / arch accent → red · "ACADEMY" / pillars → green
 */
export const BRAND_COLORS = {
  green: "#32C991",
  greenDark: "#269B6F",
  greenLight: "#E8FAF2",
  red: "#CD443F",
  redDark: "#A83530",
  redLight: "#FBEAE9",
  /** Decorative only — not a logo brand color */
  gold: "#D4A853",
} as const;

/** CSS-ready logo pair gradient (green → red) */
export const BRAND_PAIR_GRADIENT =
  "linear-gradient(135deg, #32C991 0%, #CD443F 100%)";
