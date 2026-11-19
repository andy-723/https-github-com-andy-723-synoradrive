/** Canonical public origin for structured data, canonicals and social previews. */
export const SITE_URL = "https://www.synoradrive.com.au";

/** Absolute URL for a site path, e.g. absoluteUrl("/pricing"). */
export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path === "/" ? "/" : path}`;
}

/**
 * SynoraDrive app sign-in page for dealership staff (the Azure-hosted product).
 * Switch to https://app.synoradrive.com.au/login once that domain is live on the app.
 */
export const APP_LOGIN_URL = "https://www.thedealflow.com.au/login";
