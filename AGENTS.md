<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep dealership marketing sections in the existing index route and use imported image assets with semantic overlay tokens; this preserves navigation while supporting a cohesive photographic identity.
- Keep the interactive product demonstration in a dedicated browser-safe component with explicitly labelled sample data and simulated actions; marketing previews must not imply real integrations or send requests.
- Keep laptop showcase framing in a lightweight CSS/SVG presentation component and share view, dialog selection and per-deal simulated settlement state in ProductPreview; satellites and board must read the same state without bypassing other delivery gates.
- Observe the laptop device separately from its banner group so the hinge can replay on scroll while revealed banners remain available on tall mobile layouts; pause floating motion during interaction and disable it for reduced motion.
- Keep expanded demo deal records and trade-in settlement arithmetic in a browser-safe shared data module, rendered through an accessible dialog; reference screenshots guide layout only and never supply public customer data.
- Keep pricing tier data and group-total calculation in a shared module with boundary tests; this prevents per-group and per-rooftop pricing from diverging.
- Render navbar and footer branding through a shared inline-SVG logo with unique gradient IDs and global semantic palette tokens; this keeps duplicate emblems and light/dark wordmarks consistent.
- Keep site-wide framed-section highlights in shared CSS with a delegated mouse-only listener gated by fine-pointer and reduced-motion preferences; use focus-visible for keyboard highlights and transient active feedback for touch to avoid sticky hover effects.
- Keep navigation as labelled link disclosures with pointer-aware opening, outside dismissal, Escape focus return, and scrollable touch menus; this preserves normal Tab navigation without imposing menu-widget keyboard rules.
- Keep orchestration and delivery-visibility storytelling in a browser-safe presentation component with semantic SVG/CSS signals and explicit comparison controls; these explain ownership without implying live integrations or unverified outcomes.
- Keep legal pages (Privacy, Website Terms, Disclaimer) as source-controlled Markdown in src/content rendered through the shared legal document component; unpublished drafts (e.g. subscription-terms.md) stay in source but are not imported by any route.
- Demo and contact enquiries are validated by shared zod schemas and stored via server functions using the admin client into RLS-locked tables (no public policies); this keeps submissions private and lets owner emails be added in the same handler later.
