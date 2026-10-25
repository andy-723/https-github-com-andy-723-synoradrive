import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";

const KEY = "synoradrive-cookie-consent";
export type CookieConsent = "accepted" | "essential";

export function getCookieConsent(): CookieConsent | null {
  if (typeof window === "undefined") return null;
  const v = window.localStorage.getItem(KEY);
  return v === "accepted" || v === "essential" ? v : null;
}

export function CookieBanner() {
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(getCookieConsent() === null), []);
  if (!open) return null;

  const choose = (v: CookieConsent) => {
    window.localStorage.setItem(KEY, v);
    window.dispatchEvent(new CustomEvent("cookie-consent", { detail: v }));
    setOpen(false);
  };

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie preferences"
      className="fixed inset-x-4 bottom-4 z-[60] mx-auto max-w-3xl rounded-2xl border bg-card/95 p-5 text-card-foreground shadow-glow backdrop-blur sm:flex sm:items-center sm:gap-6"
    >
      <p className="text-sm text-muted-foreground">
        We use essential cookies to run this website. With your permission, we'd also use analytics to understand how it's used; this data may be processed outside Australia. See our{" "}
        <Link to="/privacy" className="underline hover:text-foreground">Privacy Policy</Link>.
      </p>
      <div className="mt-4 flex shrink-0 gap-2 sm:mt-0">
        <button onClick={() => choose("essential")} className="min-h-11 rounded-lg border px-4 text-sm font-semibold transition-colors hover:bg-accent">
          Essential only
        </button>
        <button onClick={() => choose("accepted")} className="min-h-11 rounded-lg bg-brand px-4 text-sm font-semibold text-primary-foreground transition hover:opacity-90">
          Accept all
        </button>
      </div>
    </div>
  );
}
