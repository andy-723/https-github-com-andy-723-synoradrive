/** Canonical public origin for structured data, canonicals and social previews. */
export const SITE_URL = "https://www.synoradrive.com.au";

/** Absolute URL for a site path, e.g. absoluteUrl("/pricing"). */
export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path === "/" ? "/" : path}`;
}
