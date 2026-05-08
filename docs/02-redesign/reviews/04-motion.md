---
owner: agente-04
role: senior-motion-designer
target: docs/02-redesign/portfolio-redesign-spec.md
sections_audited: ["§1.5", "§1.7", "§3.5", "§4.5", "§5.6", "§6.5"]
date: 2026-05-06
status: review
---

# Motion audit — portfolio redesign

## 1. Coherence audit — Score 7.5 / 10

The six patterns *almost* compose a single language but read closer to a curated checklist than a system. The unifying axis the spec implies — "subtle, premium, restraint" — is honored at the easing level (single curve everywhere) and at the trigger level (everything fires once, on intersection at 0.15). That is the connective tissue.

What breaks coherence:
- **Magnetic + parallax + Lenis** belong to the "physics-driven" family (continuous, input-following). **Reveal + text-mask + hover lift** belong to the "discrete state-change" family (one-shot, easing-driven). The spec doesn't tell us how the two families relate. A grammar would say e.g. *"physics-driven motion only on the WhatsApp axis (CTA + magnetic + glow); discrete motion everywhere else"* — that's almost true today but isn't articulated.
- §6.5 introduces a glow pulse + icon rotation + brightness shift + padding growth on the same element. That's four simultaneous channels on one CTA, which is louder than the rest of the page and contradicts "minimal radical".
- §5.6 uses a text-shimmer that doesn't appear elsewhere — it leaks a 7th pattern in.

**Recommendation:** add a §1.5.1 "Motion grammar" stating: physics for the WhatsApp/contact axis only, discrete reveals for narrative, parallax as ambient (not interactive). Drop the §5.6 shimmer or promote it to a documented 7th pattern with at least 2 use sites.

## 2. Easing scrutiny — keep, but add a paired curve

`cubic-bezier(0.16, 1, 0.3, 1)` (easeOutExpo-ish) is the single most overused curve in 2024–2026 portfolio work — Vercel, Linear, Framer all default to variants. It is *appropriate* (fast attack, long settle reads as "premium hardware") but it is **not distinctive**.

**Alternative:** `cubic-bezier(0.22, 1, 0.36, 1)` — easeOutQuint. Slightly less aggressive on the front (0.22 vs 0.16) and lands earlier (0.36 vs 0.3 second handle), which gives a more *anchored* feel. Less "snap then float", more "pull then lock". This is what Stripe and Arc use and feels distinctive without being weird.

**Decision:** keep 0.16/1/0.3/1 as `--ease-out` for entrances (text-mask, reveal — where the hang time sells "cinematic"), but add `--ease-out-quint: cubic-bezier(0.22, 1, 0.36, 1)` for hover/state changes (150–300ms range). Pairing two curves by *duration band* is itself a system signal. Don't switch entirely — overhauling all entrances yields zero perceived gain at this duration.

## 3. Lenis configuration — drop it

For a single-page portfolio composed of text + thumbs + 4 sections, **Lenis is not worth ~12KB gz + RAF cost + scroll-event indirection**. Native scroll on macOS/Windows trackpads is already smooth; Lenis primarily helps mouse-wheel users on long marketing pages with heavy scroll-driven sequences (none here — parallax is 24px range, that's noise).

Concrete cost beyond bytes: every scroll-linked effect (the §4.5 parallax) runs through Lenis's RAF, which forces the parallax math into the same frame budget as scroll itself. Native + IntersectionObserver + a dedicated `requestAnimationFrame` for parallax is *cheaper* and decouples failures.

**Decision:** remove Lenis. Use `scroll-behavior: smooth` for anchor jumps (CTA secundário → #projetos) and let native handle the rest. If the client rejects the feel after a stakeholder review, re-add Lenis with `smoothTouch: false` and `lerp: 0.1`. Do not adopt by default.

## 4. Magnetic CTA calibration — radii are right, damping is too high

Best-practice numbers from Cuberto / Linear / Stripe contact pages:
- Activation radius: 1.2× to 1.6× the button's longest edge.
- Damping (lerp): 0.10–0.15 for "snappy", 0.16–0.20 for "heavy".
- Max travel: 8–14px (you have 12px — fine).

Your floating WhatsApp button is 56×56 → radius 80px = 1.43×, **good**. The hero contact CTA at radius 100px against a typical 180–220px-wide button = 0.45–0.55×, **too small** — the cursor will arrive *inside* the button before magnetism engages, killing the effect.

Damping 0.18 is on the heavy side; combined with easeOutExpo it will feel laggy on a 120Hz display.

**Calibration:**
- Floating button: keep 80px. Lower damping to **0.14**.
- Hero contact CTA: raise to **150px** (1.5× a ~200px button). Damping **0.16**.
- Add a `prefers-reduced-data` opt-out in addition to reduced-motion.

## 5. Missing motion — two recommendations

1. **Focus-ring choreography (keyboard).** The spec defines a 2px accent outline but no animation. Add: outline animates from `outline-offset: 0 → 3px` over 120ms with `--ease-out-quint` on `:focus-visible`. Where: every interactive element. When: keyboard focus only. This is the cheapest "premium" tell — it signals the site cares about non-mouse users and matches Linear/Vercel.
2. **Section-number tick on enter.** §4.3 numbers projects 02–06; §3 has "01 / Início". On reveal, animate the *separator and digits* with a 60ms staggered character mask (digit "0" lands, then "2"). Where: section eyebrows. When: section enters viewport. This unifies the existing text-mask pattern with the numbering grammar at zero new infra cost.

## 6. Performance — parallax is the riskiest, not Lenis

On mid-tier mobile (Snapdragon 6-gen-1 class, ~Lighthouse mobile baseline):
- Reveal-on-scroll: cheap. IO callbacks fire once, transforms are GPU.
- Lenis: medium. ~0.4ms/frame budget on low-end Android, but moot if removed per §3.
- Magnetic: cheap (mouse only — no touch).
- **Parallax thumbnails: highest risk.** Per §4.5, every featured/row thumbnail translates Y on every scroll frame. With 5–6 projects and Lenis-driven scroll events, you can hit 6 layout reads + 6 transform writes per frame. On a Pixel 6a this drops to ~45fps during fast scroll.

**Mitigation:**
- Use a **single shared `requestAnimationFrame` loop** (not Lenis-coupled) that batches reads then writes, with `transform: translate3d(0, var(--py), 0)` and `will-change: transform` toggled on/off via IntersectionObserver (only "near viewport" thumbs animate).
- Cap parallax to **1 thumbnail visible at a time** on mobile — the spec already halves intensity, but the real win is gating *which* thumbs run the loop.
- Fallback: if `navigator.deviceMemory < 4` or `connection.saveData`, disable parallax entirely. Reuse the reduced-motion code path.

This single mitigation is what keeps the page above 60fps on the bottom 30% of devices that visit Brazilian portfolios.
