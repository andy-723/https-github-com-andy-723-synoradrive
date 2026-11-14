import { Reveal } from "@/components/reveal";
import founderPortrait from "@/assets/founder-portrait.jpg";

/**
 * Founder showcase: an arch-framed portrait that floats gently, with
 * animated dashed "wiring" connecting it to orbiting fact chips —
 * the same visual language as the SynoraCNS orchestration diagram.
 *
 * The founder photo is served from src/assets/founder-portrait.jpg.asset.json.
 */

const CHIPS = [
  {
    id: "floor",
    label: "From the floor",
    detail: "Australian automotive retail",
    pos: "tl",
  },
  {
    id: "problem",
    label: "Lived the problem",
    detail: "Manila folders, whiteboards, pretty spreadsheets",
    pos: "bl",
  },
  {
    id: "built",
    label: "Built the fix",
    detail: "One contract in, a deal pack ready to check",
    pos: "tr",
  },
  {
    id: "mission",
    label: "The mission",
    detail: "Every car visible from signature to keys",
    pos: "br",
  },
] as const;

export function FounderShowcase() {
  return (
    <div className="founder-stage">
      {/* Dashed wiring behind the portrait */}
      <svg
        className="founder-wires"
        viewBox="0 0 1000 460"
        fill="none"
        aria-hidden="true"
        preserveAspectRatio="none"
      >
        {/* Wires overshoot and run underneath the glass chips, so they
            always read as connected at any viewport width. */}
        <path className="founder-wire" d="M 368 150 C 300 120, 250 85, 175 55" />
        <path className="founder-wire founder-wire-alt" d="M 368 330 C 300 360, 260 395, 195 418" />
        <path className="founder-wire" d="M 632 160 C 700 130, 740 105, 825 82" />
        <path className="founder-wire founder-wire-alt" d="M 632 340 C 700 370, 730 400, 805 425" />
      </svg>

      {/* Floating portrait */}
      <Reveal className="founder-portrait-wrap">
        <div className="founder-portrait-float">
          <div className="founder-portrait">
    <img
  src={founderPortrait}
  alt="Andrew Phan, founder of SYNORA TECH"
  width={640}
  height={640}
  loading="lazy"
/>
            <div className="founder-portrait-ring" aria-hidden="true" />
          </div>
          <div className="founder-nameplate">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary">Founder</span>
            <span className="text-lg font-semibold">Andrew Phan</span>
            <span className="text-xs text-muted-foreground">SYNORA TECH</span>
          </div>
        </div>
      </Reveal>

      {/* Orbiting fact chips */}
      {CHIPS.map((chip, i) => (
        <Reveal key={chip.id} delay={150 + i * 120} className={`founder-chip founder-chip-${chip.pos}`}>
          <div className="founder-chip-inner">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary">{chip.label}</span>
            <span className="mt-1 block text-sm font-medium leading-snug">{chip.detail}</span>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
