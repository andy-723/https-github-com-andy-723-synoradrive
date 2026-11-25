import { describe, expect, it } from "vitest";
import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { SITE_URL } from "@/lib/site";

const SRC = path.resolve(__dirname, "..");

function filesIn(dir: string, out: string[] = []): string[] {
  for (const name of readdirSync(dir)) {
    const full = path.join(dir, name);
    if (statSync(full).isDirectory()) filesIn(full, out);
    else if (/\.(ts|tsx|css)$/.test(name)) out.push(full);
  }
  return out;
}

/* ------------------------------------------------------------------ *
 * WCAG 2.1 contrast, computed from the real theme tokens in styles.css
 * ------------------------------------------------------------------ */
type RGB = [number, number, number];
type Scope = Map<string, string>;

const toLinear = (v: number) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
const toGamma = (v: number) => (v <= 0.0031308 ? v * 12.92 : 1.055 * v ** (1 / 2.4) - 0.055);
const luminance = ([r, g, b]: RGB) =>
  0.2126 * toLinear(r / 255) + 0.7152 * toLinear(g / 255) + 0.0722 * toLinear(b / 255);

function contrast(a: RGB, b: RGB) {
  const [hi = 0, lo = 0] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

function oklchToRgb(l: number, c: number, h: number): RGB {
  const a = c * Math.cos((h * Math.PI) / 180);
  const b = c * Math.sin((h * Math.PI) / 180);
  const l_ = l + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = l - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = l - 0.0894841775 * a - 1.2914855480 * b;
  const [L, M, S] = [l_ ** 3, m_ ** 3, s_ ** 3];
  return [
    4.0767416621 * L - 3.3077115913 * M + 0.2309699292 * S,
    -1.2684380046 * L + 2.6097574011 * M - 0.3413193965 * S,
    -0.0041960863 * L - 0.7034186147 * M + 1.7076147010 * S,
  ].map((v) => Math.round(Math.min(1, Math.max(0, toGamma(v))) * 255)) as RGB;
}

const css = readFileSync(path.join(SRC, "styles.css"), "utf8");

/** Merges every top-level (or nested) rule block for a bare selector. */
function collect(selector: string): Scope {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const map: Scope = new Map();
  const blocks = new RegExp(`^\\s*${escaped}\\s*\\{([\\s\\S]*?)\\n\\s*\\}`, "gm");
  for (const block of css.matchAll(blocks)) {
    for (const decl of block[1]!.matchAll(/(--[a-z0-9-]+)\s*:\s*([^;]+);/g)) {
      map.set(decl[1]!, decl[2]!.trim());
    }
  }
  expect(map.size, `styles.css declares no tokens in "${selector}" blocks`).toBeGreaterThan(0);
  return map;
}

const rootBlock = collect(":root");
const lightBlock = collect(".light-section");
const dark: Scope[] = [rootBlock];
const light: Scope[] = [lightBlock, rootBlock];

function token(name: string, scopes: Scope[]): string {
  for (const scope of scopes) if (scope.has(name)) return scope.get(name)!;
  throw new Error(`unknown token ${name}`);
}

function colour(value: string, scopes: Scope[]): RGB {
  const v = value.trim();
  const ref = /^var\((--[a-z0-9-]+)\)$/.exec(v);
  if (ref) return colour(token(ref[1]!, scopes), scopes);
  const mix = /^color-mix\(in srgb,\s*(.+?)\s+([\d.]+)%\s*,\s*(.+)\)$/.exec(v);
  if (mix) {
    const a = colour(mix[1]!, scopes);
    const b = colour(mix[3]!, scopes);
    const p = Number(mix[2]!) / 100;
    const [ar, ag, ab] = a;
    const [br, bg, bb] = b;
    return [ar * p + br * (1 - p), ag * p + bg * (1 - p), ab * p + bb * (1 - p)].map(
      (n) => Math.round(n),
    ) as RGB;
  }
  const hex = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(v);
  if (hex) {
    const raw = hex[1]!;
    const digits = raw.length === 3 ? raw.replace(/./g, (d) => d + d) : raw;
    const parts = [0, 2, 4].map((i) => parseInt(digits.slice(i, i + 2), 16));
    return [parts[0] ?? 0, parts[1] ?? 0, parts[2] ?? 0];
  }
  const ok = /^oklch\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)\s*\)$/.exec(v);
  if (ok) return oklchToRgb(Number(ok[1]!), Number(ok[2]!), Number(ok[3]!));
  throw new Error(`unparsed colour: ${v}`);
}

const ratio = (fg: string, bg: string, scopes: Scope[]) =>
  contrast(colour(token(fg, scopes), scopes), colour(token(bg, scopes), scopes));

describe("Theme contrast (WCAG AA, 4.5:1 body text)", () => {
  it("keeps dark-section text readable on the near-black surface", () => {
    expect(ratio("--foreground", "--background", dark)).toBeGreaterThanOrEqual(4.5);
    expect(ratio("--muted-foreground", "--background", dark)).toBeGreaterThanOrEqual(4.5);
    expect(ratio("--primary", "--background", dark)).toBeGreaterThanOrEqual(4.5);
    expect(ratio("--primary-foreground", "--primary", dark)).toBeGreaterThanOrEqual(4.5);
  });

  it("keeps status colours readable on the near-black surface", () => {
    for (const status of ["--success", "--warning", "--destructive"]) {
      expect(ratio(status, "--background", dark), status).toBeGreaterThanOrEqual(4.5);
    }
  });

  it("keeps light-section text readable on white", () => {
    expect(ratio("--foreground", "--background", light)).toBeGreaterThanOrEqual(4.5);
    expect(ratio("--muted-foreground", "--background", light)).toBeGreaterThanOrEqual(4.5);
    expect(ratio("--primary", "--card", light)).toBeGreaterThanOrEqual(4.5);
    expect(ratio("--primary-foreground", "--primary", light)).toBeGreaterThanOrEqual(4.5);
    expect(ratio("--accent-foreground", "--accent", light)).toBeGreaterThanOrEqual(4.5);
  });

  it("uses a light-mode primary that is not the dark-mode one", () => {
    expect(token("--primary", light)).not.toBe(token("--primary", dark));
    expect(ratio("--logo-accent", "--background", light)).toBeGreaterThanOrEqual(4.5);
  });

  it("keeps status colours readable on white cards", () => {
    for (const status of ["--success", "--warning", "--destructive"]) {
      expect(ratio(status, "--card", light), status).toBeGreaterThanOrEqual(4.5);
    }
  });
});

describe("Minimum text size", () => {
  it("never sets a label below 12px", () => {
    const offenders: string[] = [];
    for (const file of filesIn(SRC)) {
      const src = readFileSync(file, "utf8");
      const px = [
        ...src.matchAll(/font-size:\s*(\d+(?:\.\d+)?)px/g),
        ...src.matchAll(/font:\s*(\d+(?:\.\d+)?)px/g),
        ...src.matchAll(/text-\[(\d+(?:\.\d+)?)px\]/g),
      ];
      const rem = [
        ...src.matchAll(/font-size:\s*(0?\.\d+)rem/g),
        ...src.matchAll(/text-\[(0?\.\d+)rem\]/g),
      ];
      for (const m of px) if (Number(m[1]) < 12) offenders.push(`${file}: ${m[0]}`);
      for (const m of rem) if (Number(m[1]) * 16 < 12) offenders.push(`${file}: ${m[0]}`);
    }
    expect(offenders).toEqual([]);
  });
});

describe("Page descriptions", () => {
  const routeFiles = readdirSync(path.join(SRC, "routes"))
    .filter((f) => f.endsWith(".tsx") && f !== "__root.tsx")
    .map((f) => path.join(SRC, "routes", f));

  function descriptionOf(file: string): string {
    const src = readFileSync(file, "utf8");
    const literal = /\{ name: "description", content: "([^"]+)" \}/.exec(src);
    if (literal) return literal[1]!;
    const named = /\{ name: "description", content: ([A-Z][A-Z0-9_]*) \}/.exec(src);
    if (named) {
      const value = new RegExp(`const ${named[1]} =\\s*"([^"]+)"`).exec(src);
      expect(value, `${file}: description constant ${named[1]} not found`).not.toBeNull();
      return value![1]!;
    }
    throw new Error(`${file} has no meta description`);
  }

  it("exists on every public page and stays under 155 characters", () => {
    for (const file of routeFiles) {
      const description = descriptionOf(file);
      expect(description.length, `${path.basename(file)} description`).toBeLessThanOrEqual(155);
      expect(description.length, `${path.basename(file)} description`).toBeGreaterThanOrEqual(50);
    }
  });

  it("is written for people, not a placeholder", () => {
    for (const file of routeFiles) {
      const description = descriptionOf(file);
      expect(description).not.toMatch(/lovable (app|generated project)/i);
    }
  });
});

describe("Search crawling", () => {
  const routePaths = readdirSync(path.join(SRC, "routes"))
    .filter((f) => f.endsWith(".tsx") && f !== "__root.tsx" && !f.startsWith("$"))
    .map((f) => f.replace(/\.tsx$/, ""))
    .map((name) => (name === "index" ? "/" : `/${name.replace(/\.index$/, "").replace(/\./g, "/")}`))
    .sort();
  const sitemap = readFileSync(path.join(SRC, "..", "public", "sitemap.xml"), "utf8");
  const robots = readFileSync(path.join(SRC, "..", "public", "robots.txt"), "utf8");

  it("lists every public page in the sitemap", () => {
    for (const p of routePaths) expect(sitemap).toContain(`<loc>${SITE_URL}${p === "/" ? "/" : p}</loc>`);
  });

  it("allows crawlers and points them at the sitemap", () => {
    expect(robots).not.toMatch(/^Disallow:\s*\/\s*$/m);
    expect(robots).toContain(`${SITE_URL}/sitemap.xml`);
  });
});

describe("Layout landmarks", () => {
  it("renders exactly one main region, in the root layout only", () => {
    const root = readFileSync(path.join(SRC, "routes", "__root.tsx"), "utf8");
    expect(root.match(/<main\b/g)).toHaveLength(1);
    expect(root).toContain('id="main-content"');
    for (const file of filesIn(path.join(SRC, "routes"))) {
      if (file.endsWith("__root.tsx")) continue;
      expect(readFileSync(file, "utf8"), file).not.toMatch(/<main\b/);
    }
  });
});

describe("Favicon set", () => {
  const PUBLIC = path.resolve(SRC, "..", "public");
  const root = readFileSync(path.join(SRC, "routes", "__root.tsx"), "utf8");

  it("links every icon from the root head and ships the file", () => {
    const hrefs = [...root.matchAll(/rel: "(?:icon|apple-touch-icon|manifest)", href: "([^"]+)"/g)].map((m) => m[1]);
    expect(hrefs).toEqual(
      expect.arrayContaining(["/favicon.ico", "/favicon.svg", "/apple-touch-icon.png", "/site.webmanifest"]),
    );
    for (const href of hrefs) expect(statSync(path.join(PUBLIC, href)).size).toBeGreaterThan(0);
  });

  it("lists manifest icons that exist", () => {
    const manifest = JSON.parse(readFileSync(path.join(PUBLIC, "site.webmanifest"), "utf8"));
    expect(manifest.name).toBe("SynoraDrive");
    for (const icon of manifest.icons) expect(statSync(path.join(PUBLIC, icon.src)).size).toBeGreaterThan(0);
  });
});
