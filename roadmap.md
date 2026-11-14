# Roadmap

## Enhanced Customer Experience
- [x] Update the feature page and pricing add-on with explicitly planned stage-triggered customer updates; desktop stage selection and phone layouts verified, 17 relevant tests pass.

## Reopen public website
- [x] Removed IP-hold lock, holding page and private viewing; restored all pages, robots and sitemap.

## Laptop product showcase
- [x] Replay laptop opening/closing on scroll, gently float banners, simplify capability headings and rename reporting to Command Report; verified report/document navigation, shared settlement, 1075/768/390px layouts and reduced motion.
- [x] Review supplied HTML laptop animation and adapt suitable motion for mobile without extra dependencies.
- [x] Replace Product View with an opening laptop, six interactive satellites and RACI overlay; verify all seven records and tabs, shared simulated settlement, focus return, phone/tablet layouts and reduced-motion behavior. No new showcase media or animation dependencies; the <1.5s mobile-load target is not verified on a physical mobile connection.

## Terms and Disclaimer update
- [x] Replace the Terms outline with supplied October 24 draft Terms and Disclaimer, preserve review warnings and unconfirmed clauses, exclude internal lawyer notes, and verify document navigation.

## Orchestration and delivery visibility
- [x] Integrate animated SynoraCNS and delivery black-hole sections into Home; verify touch, keyboard and reduced-motion behavior.

## Interactive deal-card preview
- [x] Open fictional customer records from board cards with working tabs, trade-in details and simulated settlement; verify keyboard and touch layouts.

## Navigation and boxed-section effects
- [x] Smooth touch navigation, add keyboard focus indicators, and verify dismissal and pointer cleanup.
- [x] Animate navigation and links, highlight framed sections across pages, and verify hover/navigation behavior.

## Website Copy v4 build (16 pages)
- [x] Global header with Platform/Company dropdowns, mobile menu, Book a demo
- [x] Global footer (Platform / Company / Trust / Get started) + closing CTA band
- [x] Home `/` rewritten to v4 (hero, works-with, positioning, pillars, workflow teaser, product view, proof band, ROI teaser)
- [x] Platform overview `/platform` + 4 pillar pages (compliance, operations, reporting, customer-experience)
- [x] How it works `/how-it-works` (five gated stages from the stage engine)
- [x] Security `/security` (v4 safe wording: 35-day retention, opt-in MFA, "stored in Australia")
- [x] Pricing `/pricing` (prices on request, ROI estimator, onboarding, dealer FAQ)
- [x] About `/about`, Partners `/partners`
- [x] Demo `/demo` and Contact `/contact` forms with validation + thank-you states
- [x] Privacy `/privacy` and Terms `/terms` outlines (lawyer review pending)
- [x] v4 404 page ("This page has driven off the lot.")
- [x] Per-page search titles/descriptions + canonical links
- [x] ROI estimator module + boundary tests; pricing module updated to v4 plans

## Open items (blocked on Andrew)
- [ ] Restore receiving email at andrew@synoratech.ai with the mail provider so enquiry alerts arrive (submissions are stored in Cloud; inbox arrival unverified)
- [ ] Lawyer review of Privacy Policy, Website Terms and Disclaimer
- [ ] Staff sign-in destination for the header (Pilot Portal sign-in removed; link still to be chosen)
- [ ] Product screenshots with dummy data for Home and pillar pages (visual gaps in v4)

- [x] Visual refresh: scroll-reveal animations, marquee ticker, glow orbs, dealership yard/workshop/handover image bands

## About page visual redesign
- [x] Cinematic founder showcase (floating arch portrait, animated dashed wiring, orbiting fact chips), journey road timeline, dealership photo band, mission/vision cards; verified desktop/mobile layouts, image loading and reduced-motion. Founder photo replaced with Andrew's real portrait.

## Performance, accessibility and search foundations
- [x] Final surgical polish: solid text/CTA colours, photo scrims, scroll-only homepage nav CTA, non-modal consent, mobile target checks; 35 tests pass. Film reduced from 6MB to 650KB WebM with MP4 fallback and deferred loading. Live Google crawling allowed; actual index status unavailable without Search Console.
- [ ] Google indexing diagnosis and sitemap submission: needs Andrew's verified Google Search Console access; current live custom-domain sitemap is reachable and intentionally canonical to www.synoradrive.com.au.
- [x] Responsive WebP photo variants under 180KB with srcset/sizes; hero preload plus high fetch priority; lazy below-fold images with explicit dimensions
- [x] One main landmark plus skip-to-content link; 12px minimum text; WCAG AA contrast tokens per theme; 44px tap targets; duplicate mobile nav CTA removed
- [x] Meta descriptions within 155 characters; JSON-LD (SoftwareApplication and Organization); sitemap.xml plus robots Sitemap directive; absolute canonical and og:url on every page
- [x] src/test/site-foundations.test.ts guards contrast, text floor, descriptions, sitemap coverage and landmarks; 34 tests pass, build clean, no console errors on any page
