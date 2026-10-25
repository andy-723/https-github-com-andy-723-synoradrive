import { Reveal } from "@/components/reveal";
import founderPortrait from "@/assets/founder-portrait.jpg";

/**
 * Founder showcase: an arch-framed portrait that floats gently, with
 * animated dashed "wiring" connecting it to orbiting fact chips —
 * the same visual language as the SynoraCNS orchestration diagram.
 *
 * To use the real founder photo, replace src/assets/founder-portrait.jpg.
 */

const CHIPS = [
  {
    id: "floor",
    label: "From the floor",
    detail: "Frontline prestige dealership sales, Melbourne",
    side: "left",
    top: "12%",
  },
  {
    id: "problem",
    label: "Lived the problem",
    detail: "Manila folders, whiteboards, pretty spreadsheets",
    side: "left",
    top: "58%",
  },
  {
    id: "built",
    label: "Built the fix",
    detail: "One contract in, every gate enforced",
    side: "right",
    top: "22%",
  },
  {
    id: "mission",
    label: "The mission",
    detail: "Every car visible from signature to keys",
    side: "right",
    top: "66%",
  },
] as const;

export function FounderShowcase() {
  return (
    <div className="founder-stage">
      {/* Dashed wiring behind the portrait */}
      <svg
        className="founder-wires"
        viewBox="0 0 1000 620"
        fill="none"
        aria-hidden="true"
        preserveAspectRatio="none"
      >
        <path className="founder-wire" d="M 500 180 C 340 160, 240 130, 150 120" />
        <path className="founder-wire founder-wire-alt" d="M 500 420 C 330 440, 230 400, 150 380" />
        <path className="founder-wire" d="M 500 200 C 660 190, 760 180, 850 170" />
        <path className="founder-wire founder-wire-alt" d="M 500 440 C 670 450, 770 430, 850 420" />
        <circle className="founder-wire-node" cx="150" cy="120" r="6" />
        <circle className="founder-wire-node" cx="150" cy="380" r="6" />
        <circle className="founder-wire-node" cx="850" cy="170" r="6" />
        <circle className="founder-wire-node" cx="850" cy="420" r="6" />
      </svg>

      {/* Floating portrait */}
      <Reveal className="founder-portrait-wrap">
        <div className="founder-portrait-float">
          <div className="founder-portrait">
            <img
              src={founderPortrait}
              alt="Andrew Phan, founder of SynoraTech, in a dealership showroom"
              width={1024}
              height={1280}
              loading="lazy"
            />
            <div className="founder-portrait-ring" aria-hidden="true" />
          </div>
          <div className="founder-nameplate">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary">Founder</span>
            <span className="text-lg font-semibold">Andrew Phan</span>
            <span className="text-xs text-muted-foreground">SynoraTech · Melbourne</span>
          </div>
        </div>
      </Reveal>

      {/* Orbiting fact chips */}
      {CHIPS.map((chip, i) => (
        <Reveal
          key={chip.id}
          delay={150 + i * 120}
          className={`founder-chip founder-chip-${chip.side}`}
          // eslint-disable-next-line react/forbid-dom-props
          // position comes from the chip config, not user input
        >
          <div className="founder-chip-inner" style={{ top: chip.top }}>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">{chip.label}</span>
            <span className="mt-1 text-sm font-medium leading-snug">{chip.detail}</span>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
