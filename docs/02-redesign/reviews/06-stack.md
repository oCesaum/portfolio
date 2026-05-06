---
owner: agente-06
title: "Stack Audit — Next 15 + Tailwind 4 + motion + lenis + cookie i18n"
spec_ref: docs/02-redesign/portfolio-redesign-spec.md (§0, §1, §2.4, §2.9, §3.7, §4.7, §5.8, §6.7)
date: 2026-05-06
verdict: NEEDS REVISION
---

# 06 — Stack architecture audit

Senior frontend stack architect review. Current `package.json` is on Next 13.4.12, React 18.2, Tailwind 3.3.3 — the spec proposes a jump to Next 15 + React 18.3+/19, Tailwind 4, `motion` (the rebrand of `framer-motion` v11+), and `lenis`, with i18n via cookie + React context (no `next-intl`, single URL).

## 1. Migration risk audit (Next 13.4 → 15, Tailwind 3 → 4)

Five hardest breaking changes ranked by impact on this spec:

| # | Breaking change | Spec impact | Hours |
|---|-----------------|-------------|-------|
| 1 | **Async dynamic APIs in Next 15** (`cookies()`, `headers()`, `params`, `searchParams` are now `Promise`) | §2.4 reads `cookies()` from `next/headers` in a Server Component to inject locale — every consumer must be `await`ed. Layout/page signatures change; any existing helper that synchronously reads cookies breaks. | 4–6h |
| 2 | **Tailwind 4 engine rewrite (Oxide) + CSS-first config** | Spec leans on design tokens (§1.2/§1.3). Tailwind 4 drops `tailwind.config.js` token mapping in favor of `@theme` in CSS; PostCSS plugin replaced by `@tailwindcss/postcss`; arbitrary values, `@apply` scoping and `theme()` function semantics change. Geist font wiring and `--accent`, `--foreground-*` tokens must be redeclared in `@theme`. | 6–8h |
| 3 | **Caching defaults flipped** (fetch no longer cached by default; `GET` route handlers no longer cached; client router cache `staleTime` reset to 0) | §2.4 toggle uses a server action + `revalidatePath`. With Next 15 defaults, the page re-renders fresh per request anyway, so the locale toggle works — but any future ISR/data fetch must opt-in via `cache: 'force-cache'` or `export const dynamic`. | 2–3h |
| 4 | **React 19 peer requirement** (Next 15 ships React 19 RC by default; types and JSX transform shift) | `@types/react` 18.2 must move to 19.x; `forwardRef` is deprecated (refs as props). `motion` v11+ supports React 19, `lucide-react` 0.263 (>2 years old) does not — bump to ≥ 0.460. `react-scroll` (legacy dep) breaks; replace with native `scroll-behavior`/Lenis. | 4–6h |
| 5 | **ESLint 9 flat-config + `next lint` deprecation path** | `eslint-config-next@13.4` won't resolve against ESLint 9; `next lint` is being removed. Need migration to flat config + `eslint-plugin-next` standalone. | 2–3h |

**Total migration: 18–26 hours.** Recommend **NOT bundling into F1**. Split into a pre-F0 "infra reset" PR (Next 15 + React 19 + Tailwind 4 + ESLint 9 + token redeclaration, no UI changes) so F1 only tackles Hero/section work. Mixing infra and visual redesign in the same PR is the classic regression vector — contrast bug + Tailwind syntax change in the same diff is a 4-hour debugging session.

## 2. `motion` library validation

`motion` (npm: `motion`, package successor to `framer-motion`, since v11.12) is the right call for this spec.

- **Cost:** `motion/react` tree-shaken with `LazyMotion` + `domAnimation` features ≈ **18–22 KB gzip**; full `motion/react` ≈ 34 KB gzip. Spec uses `useMotionValue` + `useSpring` (magnetic) and reveal sequences, which are in `domAnimation`. With `LazyMotion strict` and `m.*` instead of `motion.*`, realistic footprint = **~20 KB gzip**.
- **Alternatives:**
  - `@react-spring/web` — 17 KB gzip, imperative API, no `useScroll`/`useTransform` ergonomics; would require hand-rolling parallax. Net loss.
  - Native CSS `@keyframes` + IntersectionObserver — ~0 KB but ~150 LOC of custom orchestration for the hero stagger and project parallax. Maintenance debt > the 20 KB win.
  - GSAP — 35–50 KB gzip with ScrollTrigger; license restrictions on commercial use; overkill for this spec's "subset travado de motion sutil" (§1.5).
- **SSR:** `motion/react` is SSR-safe in App Router; only client components import it (spec already marks `HeroPill`, `ContactCTA`, etc. as client). The `motion-dom` import in §3.7 is fine but redundant — `motion/react` re-exports the DOM utilities.

**Recommend KEEP `motion`**, but lock the import pattern: `import { LazyMotion, domAnimation, m } from "motion/react"`. Drop the §3.7 reference to `motion-dom` as a separate import — it doubles the surface area for no gain.

## 3. Lenis on Next 15 RSC

Lenis is browser-only (touches `window`, `document`, `requestAnimationFrame`). Correct integration pattern in App Router:

1. Create `src/components/providers/LenisProvider.tsx` marked `"use client"`.
2. Use `useEffect` to instantiate Lenis on mount (never at module scope), with `prefers-reduced-motion` short-circuit returning `null`.
3. Mount it inside `app/layout.tsx` wrapping `{children}` — the layout itself stays a Server Component; only the provider is client.
4. Lazy-load via `next/dynamic` with `{ ssr: false }` only if you want to defer the ~5 KB further; the spec §2.9 already calls for "Lenis carregado lazy (dynamic import), só após primeira interação ou após `requestIdleCallback`" — that's correct, implement with `dynamic(() => import("./LenisProvider"), { ssr: false })`.
5. Server actions for the locale toggle still work; Lenis listens to scroll, not router events, so it survives `revalidatePath`.

**Pitfall to flag:** Lenis + native CSS `scroll-behavior: smooth` fight each other. Strip `scroll-behavior` from `globals.css` and ensure the §3.3 "rola pra `#projetos` com offset 80px" CTA uses `lenis.scrollTo("#projetos", { offset: -80 })`, not `element.scrollIntoView()`.

## 4. i18n via cookie audit

Trade-offs of cookie + single URL:

- **SEO:** Material loss. Google indexes one variant; the `hreflang` alternates pointing to the same URL (§2.7) are flagged by Google Search Console as misconfigured. EN won't rank for English queries. Spec acknowledges this.
- **Implementation:** ~80 LOC sounds tight, but `revalidatePath('/')` on every toggle invalidates the full-route cache — fine for a static site, will hurt if any section ever uses ISR.
- **UX:** Sharing a URL doesn't share the locale. EN visitor copies link, sends to PT visitor, PT visitor sees EN because their cookie is missing → server falls back to PT default but the link the EN user expected to "be in EN" isn't.

**Three concrete bugs this approach will hit:**

1. **Cache poisoning on Vercel CDN** — without `Vary: Cookie` on the response (Next 15 doesn't auto-emit it for cookie reads), the CDN can serve a PT-cached HTML to an EN cookie-holder. Mitigation: `export const dynamic = "force-dynamic"` on the root page (kills static optimization) or set `cookies().set` with a `vary` header manually.
2. **Hydration mismatch on `<html lang>`** — server reads cookie and renders `lang="pt"`, client `LocaleProvider` flips state, React warns "Prop `lang` did not match." Fix: pass server-resolved locale as a prop into `<html>` and never mutate it client-side; toggle triggers a server action + reload.
3. **Crawler cookie blindness** — Googlebot/Bingbot don't send cookies; they always see PT. Combined with `hreflang` pointing to `/`, EN content is effectively invisible to search.

**Recommendation:** For MVP traffic (BR-first, per §2.4 trade-off note), cookie pattern is acceptable IF you (a) add `Vary: Cookie`, (b) resolve locale once on the server and prop-drill, (c) accept EN is functionally a "user-facing toggle" not an SEO surface. For anything beyond MVP, migrate to `/pt`, `/en` route segments — Next 15's `[locale]` segment handles this in ~120 LOC without `next-intl`.

## 5. Component library decision

Hand-rolling 4 sections (Hero, Projects, About, Contact) is **correct** for this spec. Reasoning:

- Spec §1 fundamentos define a tight token system (4 colors, 1 accent, Geist + Geist Mono, 2 radii). shadcn/ui ships Radix primitives styled with default Tailwind variables; importing it forces re-theming every component to match `--foreground-subtle` etc., which is *more* work than hand-rolling.
- The interactive surface is tiny: 1 button variant set (§3.7 `Button.tsx` primary/secondary/ghost), 1 magnetic wrapper, 1 toggle. No dialogs, no comboboxes, no command menus. shadcn pays off at ~8+ primitive components, not 3.
- Focus-visible polish is one Tailwind utility (`focus-visible:outline-2 focus-visible:outline-[--accent] focus-visible:outline-offset-2`), already specified in §2.8. Doesn't need Radix.

**One exception worth carving out:** if §6 contact ever grows a contact form, lift `react-hook-form` + Radix `@radix-ui/react-label` + `@radix-ui/react-visually-hidden` (~6 KB combined). But that's out of MVP scope.

**Recommendation: hand-roll, no lib.** Document in §3.7/§5.8/§6.7 that `MagneticWrapper`, `Button`, and the locale toggle are the only shared primitives — anything else gets inlined per section.

## 6. Bundle budget feasibility (<150 KB gzip first-load)

Rough math for the home route in production:

| Chunk | gzip estimate |
|-------|---------------|
| Next 15 + React 19 framework chunk | 48–52 KB |
| App Router runtime + RSC payload helpers | 8–10 KB |
| `motion/react` with `LazyMotion` + `domAnimation` | 18–22 KB |
| Lenis (lazy, but counted if loaded on idle) | 4–5 KB |
| `lucide-react` tree-shaken (3–4 icons: ArrowUpRight, etc.) | 2–3 KB |
| LocaleProvider + dictionary (PT+EN) | 3–4 KB |
| Hero/Projects/About/Contact client components | 12–18 KB |
| Tailwind 4 emitted CSS (separate, not in JS budget) | — |
| **Total JS first-load** | **95–114 KB gzip** |

**Verdict: achievable with margin.** The 150 KB target holds if (a) Lenis stays lazy until idle, (b) `motion` uses `LazyMotion strict`, (c) `lucide-react` icons are imported individually (`import ArrowUpRight from "lucide-react/icons/arrow-up-right"`), (d) the locale dictionary stays under 4 KB combined and ships as a server-prop, not a client bundle. Risk zone: if the spec adds a 5th section or a `react-three-fiber`/canvas effect, budget evaporates.

## 7. Final verdict

**NEEDS REVISION.**

The stack is fundamentally sound and the bundle math works, but three corrections are required before F1 starts: (1) extract the Next 13→15 + Tailwind 3→4 + React 19 migration into a pre-F0 infra PR rather than mixing it into Hero work, (2) the cookie i18n approach must add explicit `Vary: Cookie` handling and server-side locale prop-drilling to avoid CDN cache poisoning and hydration mismatches — flagged in §2.4 as "aceitável no MVP" but the spec doesn't yet enumerate the mitigations, (3) §3.7 should drop the `motion-dom` separate import and lock `LazyMotion + m.*` as the team-wide pattern. With those revisions, the stack is a PASS for the four-section MVP. Without them, expect ~10–15h of debugging in F1 chasing async-cookie errors, Tailwind 4 token regressions, and EN-cached-as-PT support tickets.
