import { useId } from "react";

export function SynoraDriveLogo() {
  const id = useId().replace(/:/g, "");
  const top = `sdStarTop-${id}`;
  const bottom = `sdStarBot-${id}`;
  return (
    <div className="flex items-center gap-2.5" aria-label="SynoraDrive">
      <svg viewBox="0 0 512 512" width={36} height={36} className="size-9 shrink-0" aria-hidden="true">
        <defs>
          <linearGradient id={top} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--brand-sky)" />
            <stop offset="50%" stopColor="var(--brand-indigo)" />
            <stop offset="100%" stopColor="var(--brand-violet)" />
          </linearGradient>
          <linearGradient id={bottom} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--brand-violet)" />
            <stop offset="50%" stopColor="var(--brand-star-purple)" />
            <stop offset="100%" stopColor="var(--brand-sky)" />
          </linearGradient>
        </defs>
        <rect x="16" y="16" width="480" height="480" rx="120" fill="var(--brand-ink)" stroke="var(--brand-indigo)" strokeOpacity="0.5" strokeWidth="10" />
        <path d="M 276 84 L 318 214 L 428 236 L 304 282 L 236 228 Z" fill={`url(#${top})`} />
        <path d="M 236 428 L 194 298 L 84 276 L 208 230 L 276 284 Z" fill={`url(#${bottom})`} />
        <ellipse cx="256" cy="256" rx="168" ry="68" transform="rotate(-32 256 256)" fill="none" stroke="var(--brand-mint)" strokeWidth="16" strokeLinecap="round" strokeDasharray="240 320" />
      </svg>
      <span className="font-display text-lg font-bold"><span className="text-logo-wordmark">Synora</span><span className="text-logo-accent">Drive</span></span>
    </div>
  );
}