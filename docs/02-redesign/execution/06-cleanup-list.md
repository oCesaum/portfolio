---
title: F0+F1 Cleanup List — Exhaustive
owner: agente-cleanup
phase: F0+F1
spec: docs/02-redesign/portfolio-redesign-spec.md §8.1
date: 2026-05-06
status: ready-to-execute
---

# F0+F1 Cleanup List — Exhaustive

Ground truth for the merged F0+F1 phase (Limpeza + Upgrade) per spec v2 §8.1, cross-referenced with §0 decisions.

Decisions that drive this list (spec §0):
- Stack: Next 15 + Tailwind 4 (`@theme`) + `motion` + native scroll (drop Lenis / `react-scroll`).
- Tema: dark-only (B2). No light mode, no toggle.
- Idioma: route-based `/pt` + `/en` — dictionaries split per locale (B1).
- Estética: premium minimalista. 1 accent (`--accent #d8bea3`), Geist + Geist Mono.
- Seções: Hero · Projetos · **Como trabalho** (was "About") · **Princípios** (NEW) · Contato.
- Canal: WhatsApp único — sem form, sem Meta Pixel.

Spec §8.1 explicit removals (verbatim):
> "Remove componentes legado (6 arquivos), mario.gif, project-image.jpg, /api/hello, scrollbar.css. Remove Meta Pixel. Remove react-scroll."

---

## Files to delete

```bash
# === 1. Legacy components NOT used by spec v2 ===
# Current page.tsx imports only: Footer, Header, WhatsAppButton (+ portfolioData).
# Everything else in src/components/ is dead code from the pre-v2 layout, OR will be
# rebuilt under hero/, projects/, work/, contact/, principles/, ui/, providers/.

git rm src/components/About.tsx
git rm src/components/AdditionalTechnologiesAndSkills.tsx
git rm src/components/Project.tsx
git rm src/components/Projects.tsx
git rm src/components/Technologies.tsx
git rm src/components/Timeline.tsx

# === 2. Components removed by explicit v2 decisions ===

# Dark-only (Bloco B2) — no theme toggle.
git rm src/components/DarkModeButton.tsx

# Header/Navbar/Socials/Footer/WhatsAppButton are imported by current page.tsx
# but their internals violate v2 (react-scroll in Navbar, light/dark logic in Socials,
# 5-nav-items vs current 6, no PT|EN route toggle). Wholesale rebuild under
# components/ui/ + components/providers/ per spec §2.1, §2.2, §2.3.
git rm src/components/Header.tsx
git rm src/components/Navbar.tsx
git rm src/components/Footer.tsx
git rm src/components/Socials.tsx
git rm src/components/WhatsAppButton.tsx

# === 3. API routes with no purpose ===
git rm src/app/api/hello/route.ts
# leads/capture/ is an empty dir leftover — drop it once tracked files are gone.
# (git rm only tracks files; remove empty dir manually after.)

# === 4. CSS that hardcodes light palette (incompatible with B2 dark-only) ===
git rm src/app/scrollbar.css

# === 5. Public assets — unused or oversized ===
git rm public/mario.gif              # 235 KB, unused (no imports anywhere)
git rm public/project-image.jpg      # 2.25 MB, only ref is decorative <Image> in page.tsx
                                     # contact-side — replaced by split-tone foto profissional (F7)
# NOTE: "doce compota.png" is renamed below (kept, just renamed).

# === 6. Legacy data file (will be split into 5 files) ===
git rm src/utils/portfolio-data.ts

# === 7. Legacy Tailwind 3 config (Tailwind 4 uses CSS @theme inside globals.css) ===
git rm tailwind.config.js

# === 8. Empty utils dir cleanup (after portfolio-data.ts removal) ===
# src/utils/ becomes empty — remove the directory after the file is deleted.
```

---

## Files to rename

```bash
# Spaces in asset filenames break URL handling on some hosts and force percent-encoding.
git mv "public/doce compota.png" public/doce-compota.png
```

After rename, update the single reference in `src/data/projects.ts` (when the file is recreated in F2/F3) from `/doce compota.png` → `/doce-compota.png`.

---

## Files to rewrite (delete + new in F2/later)

These files stay in git history but their **current content is fully discarded**. They get rewritten from scratch in the listed phase.

- `src/app/globals.css` (replaced by F2 — Tailwind 4 `@theme`, paleta v2 com 4 níveis de superfície, tokens border/foreground/accent triplos, easings globais, aurora drift no `<body>::before`, breathing eyebrows, reduce-motion safety net, double-ring focus-visible. Spec §1.2 / §1.5 / F2 deliverables.)
- `src/app/layout.tsx` (replaced by F3 — torna-se `app/[locale]/layout.tsx` route-based PT/EN, Geist + Geist Mono via `next/font`, **sem Meta Pixel**, **sem `<Script>` do facebook tracking**, sem noscript pixel `<img>`. Spec §2.4 / §2.5.)
- `src/app/page.tsx` (replaced by F5/F6/F7/F8 — vira `app/[locale]/page.tsx` compondo Hero, Projects, Work, Principles, Contact a partir de `components/<seção>/`. Spec §3–§7.)
- `src/utils/portfolio-data.ts` (split per spec v2 into):
  - `src/data/projects.ts` (spec §4.2 — projetos com URL pública confirmada)
  - `src/data/work.ts` (spec §5.2 — trajetória "Como trabalho")
  - `src/data/contact.ts` (spec §7.2 — disponibilidade, canais, mensagem WA)
  - `src/data/testimonials.ts` (spec §0 / §F-Content — depoimentos MVP obrigatórios ≥ 2)
  - `src/lib/i18n/dictionaries/pt.ts` (todas as strings PT-BR)
  - `src/lib/i18n/dictionaries/en.ts` (todas as strings EN, paridade de chaves checada em CI — spec §2.4)
- `tailwind.config.js` (replaced by Tailwind 4 — `@theme` block dentro de `globals.css`. Não recriar `.config.js`.)
- `package.json` (rewritten in F1 upgrade — Next 13.4 → 15, React 18 → 19, Tailwind 3 → 4, lucide-react 0.263 → ≥ 0.460, drop `react-scroll` + `@types/react-scroll`, drop `@next/font` (use `next/font`), drop `google-fonts`, drop `autoprefixer` (Tailwind 4 não precisa), add `motion`, `geist`, ESLint 9 flat config deps. Spec §8.1 F0+F1.)
- `package-lock.json` (regenerated by `npm install` after package.json rewrite.)
- `postcss.config.js` (Tailwind 4 simplifica — substituir por `postcss.config.mjs` com `@tailwindcss/postcss`, ou eliminar se Next 15 ja resolver via plugin. Decidir em F1.)
- `.eslintrc.json` (replaced by `eslint.config.mjs` — ESLint 9 flat config, spec §8.1 F0+F1.)

---

## Files to keep

### Core configs (no changes needed in F0+F1, may receive minor edits later)
- `next.config.js` (still relevant; minor updates for Next 15 in F1 — likely converted to `next.config.mjs`)
- `next-env.d.ts` (auto-managed by Next, keep as-is)
- `tsconfig.json` (still relevant; review `target`/`moduleResolution` in F1)
- `.gitignore` (still relevant)
- `README.md` (still relevant; will be touched up post-launch)
- `AGENTS.md` (still relevant — governance contract)

### Public assets — kept (real project screenshots)
- `public/barber.png` (615 KB — Barber Landing Page)
- `public/calculadora-taxa-gravidade.png` (403 KB — Calculadora HHT)
- `public/dom-comparator.png` (481 KB — DOM Comparator, **featured project**)
- `public/fast-cart.png` (148 KB — Fast Cart Landing)
- `public/tailwind-spotify.png` (346 KB — Tailwind Spotify)
- `public/doce-compota.png` (1.32 MB — Doce Compota, **after rename**)
- `public/favicon.ico` → `src/app/favicon.ico` (kept; spec §1.1 says letra "c" sobre `--background` — pode ser regenerado em F4 SEO + assets, mas NÃO bloqueante em F0+F1)

### Docs
- `docs/02-redesign/portfolio-redesign-spec.md` (spec v2 — fonte de verdade)
- `docs/02-redesign/execution/03-whatsapp-templates.md` (F-Content artifact, kept)
- `docs/02-redesign/reviews/**` (review trail, kept)

---

## Notes / things found that don't fit v2

1. **`public/favicon.ico` (25.3 KB)** — current ico likely gigantic for a single-letter favicon. Not deleting in F0+F1, but flag for F4 (SEO + assets) regeneration per spec §1.1.
2. **`src/app/api/leads/capture/`** — empty directory, no `route.ts` ever committed. v2 has no leads API (canal único = WhatsApp, spec §0 / §2.3). Remove the empty directory after `api/hello/route.ts` is deleted.
3. **`src/utils/`** — becomes empty after `portfolio-data.ts` removal. New structure uses `src/data/` and `src/lib/i18n/`. Drop `src/utils/` directory.
4. **`@next/font` dependency** — deprecated since Next 13.2; Next 15 ships `next/font` natively. Drop from `package.json` in F1.
5. **`google-fonts` npm package** — unused dead dependency in `package.json`. Drop.
6. **`autoprefixer` + `postcss` deps** — Tailwind 4 bundles its own. Reassess in F1.
7. **`react-scroll` + `@types/react-scroll`** — only used by `Navbar.tsx` (deleted above). Drop deps in F1; native scroll + smooth `scrollIntoView` (spec §0 stack: "native scroll").
8. **Meta Pixel `fbq` in `layout.tsx` lines 32-57** — explicit removal per spec §8.1 F0+F1 ("Remove Meta Pixel"). The whole `<noscript>` `<img>` (Facebook tracking pixel) AND the inline `<Script id="meta-pixel">` go away in the F3 layout rewrite.
9. **`html.dark { ... }` block in current `globals.css` (lines 19-31)** — duplicates `:root` and exists only because `DarkModeButton` toggles a `.dark` class. With B2 (dark-only), `html.dark` block is gone — `:root` IS the dark theme.
10. **`portfolio-data.ts` keys NOT used in spec v2:**
    - `expertise[]` (replaced by `principles[]` section per Q9 + B4 + B9 — concept changes)
    - `additionalSkills[]` (no longer surfaced; tech stack lives within Hero stats strip + Work)
    - `focusAreas[]` (current page used it under "Areas de especialidade" — that subsection is gone in v2 layout; folded into Work / Principles)
    - `highlights[]` (current "info-panel" trio — replaced by 3-stat strip in Hero, spec §3.2)
    - `navigationItems` (moves to dictionaries; Header in v2 has 5 items: Início · Projetos · Trabalho · Princípios · Contato — spec §2.1)
    - `socials.whatsappMessage` (moves to `data/contact.ts` with v2 fallback copy per spec §2.3 / review 05-copy)
11. **`scrollbar.css`** — uses light palette `#e2e8f0` track + `#020617` thumb. Incompatible with B2 dark-only. Native dark scrollbar from Tailwind 4 + `color-scheme: dark` on `<html>` in F2 globals.
12. **`page.tsx` line 379** — `<Image src="/project-image.jpg">` is the only ref to that 2.25 MB asset. Removing the file requires also removing this `Image`. Both go in F0+F1 wipe (page.tsx is rewritten in F5+).
13. **`.eslintrc.json` (43 bytes)** — single line `"next/core-web-vitals"` extends. Migrate to ESLint 9 flat config (`eslint.config.mjs`) per spec §8.1 F0+F1.
14. **`.cursor/`, `.vscode/`, `.claude/`** — IDE/agent configs, untouched.
15. **`page.tsx` strings without diacritics** (`Engenharia de precisao`, `experiencias digitais`, `proposito`, `Solucoes`, `Areas`, `extraordinario`, `tecnicos`, `visao`) — encoding artifacts from prior session. Won't matter since `page.tsx` is fully rewritten in F5+ from `dictionaries/pt.ts` (which will use proper UTF-8).

---

## Summary

### Deleted files (count + raw bytes)

| File | Size (bytes) |
|------|--------------|
| `src/components/About.tsx` | 894 |
| `src/components/AdditionalTechnologiesAndSkills.tsx` | 945 |
| `src/components/Project.tsx` | 2,118 |
| `src/components/Projects.tsx` | 3,585 |
| `src/components/Technologies.tsx` | 25,020 |
| `src/components/Timeline.tsx` | 2,734 |
| `src/components/DarkModeButton.tsx` | 1,615 |
| `src/components/Header.tsx` | 1,057 |
| `src/components/Navbar.tsx` | 3,133 |
| `src/components/Footer.tsx` | 625 |
| `src/components/Socials.tsx` | 1,512 |
| `src/components/WhatsAppButton.tsx` | 882 |
| `src/app/api/hello/route.ts` | 92 |
| `src/app/scrollbar.css` | 640 |
| `public/mario.gif` | 235,456 |
| `public/project-image.jpg` | 2,251,497 |
| `src/utils/portfolio-data.ts` | 6,992 |
| `tailwind.config.js` | 1,241 |

**TOTAL DELETED: 18 files, 2,540,038 bytes ≈ 2,481 KB ≈ 2.42 MB**

(of which ~2.43 MB is the two oversized public assets `mario.gif` + `project-image.jpg` — single biggest perf win of F0+F1.)

### Renamed: 1 file (`doce compota.png` → `doce-compota.png`)

### Rewritten (delete + new in later phase): 9 files
`globals.css`, `layout.tsx`, `page.tsx`, `portfolio-data.ts` (split into 6 new files), `package.json`, `package-lock.json`, `postcss.config.js`, `.eslintrc.json` (→ `eslint.config.mjs`)

### Kept: 6 public assets, 6 root configs, all docs.
