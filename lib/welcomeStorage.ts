const WELCOME_DISMISSED_KEY = "boq_welcome_dismissed";

export function isWelcomeDismissed(): boolean {
  if (typeof window === "undefined") return true;
  try {
    return sessionStorage.getItem(WELCOME_DISMISSED_KEY) === "1";
  } catch {
    return true;
  }
}

export function dismissWelcome(permanent = false): void {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(WELCOME_DISMISSED_KEY, "1");
    if (permanent) {
      localStorage.setItem(WELCOME_DISMISSED_KEY, "1");
    }
  } catch {
    /* ignore storage errors */
  }
}

export function shouldShowWelcomeModal(): boolean {
  if (typeof window === "undefined") return false;
  try {
    if (localStorage.getItem(WELCOME_DISMISSED_KEY) === "1") return false;
    if (sessionStorage.getItem(WELCOME_DISMISSED_KEY) === "1") return false;
    return true;
  } catch {
    return false;
  }
}
