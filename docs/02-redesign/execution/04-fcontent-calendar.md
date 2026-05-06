---
owner: agente-calendar
track: F-Content (Spec v2 §8.1)
window: T-7d → T-0 (pre-F1 gate)
capacity: ~1-2h/day (evenings, solo — César Augusto)
status: draft
---

# F-Content 7-Day Calendar

Pre-flight content track. Runs **before** F1 code work. Goal: land 4 deliverables (testimonials, project URLs + screenshots, photo, EN copy) so F1 isn't blocked on missing assets.

## Day-by-day

| Day | Date | Deliverable | Est. | Depends on |
|---|---|---|---|---|
| **D-7** (Mon) | __/__ | Outreach kickoff: list 6 candidate testifiers (3 clients + 3 peers/devs), draft PT consent template (LGPD-friendly), send 6 WhatsApp/email asks | 90 min | — |
| **D-6** (Tue) | __/__ | Inventory 6 project URLs in spreadsheet (status: live / staging / dead). Identify gaps, ping clients for any URL behind login | 60 min | — |
| **D-5** (Wed) | __/__ | Capture HD screenshots (1920×1080, retina) for 4 confirmed live URLs. Save to `/public/work/{slug}.png`. Compress with Squoosh | 90 min | D-6 |
| **D-4** (Thu) | __/__ | Photo: book studio session OR self-shoot (natural light, 50mm equiv, neutral wall). Pick 3 finalists | 60 min (shoot) + buffer | — |
| **D-3** (Fri) | __/__ | EN copy draft v1: Hero + Trabalho sections. Use DeepL pass + manual polish. Target: native-readable, not literal PT→EN | 90 min | — |
| **D-2** (Sat) | __/__ | EN copy draft v1: Princípios + Contato. Chase any pending testimonial (2nd nudge) | 90 min | D-3 |
| **D-1** (Sun) | __/__ | Consolidate: paste testimonials into `content/testimonials.json`, finalize photo edit (1 hero + 1 about), QA all assets | 60 min | D-7, D-4, D-3, D-2 |
| **D-0** (Mon) | __/__ | **Deploy gate review.** F1 code work begins | 30 min | all above |

## Slip-risk days (top 2)

1. **D-7 (testimonials outreach)** — Brazilian client testimonials are notoriously slow. Clients ghost, ask for drafts, or say "manda o que escrever que eu assino" (which kills authenticity). Peers/devs respond in 24-48h; clients often take 5-10 days. **Mitigation:** lead with peers (3 of the 6 asks), treat client testimonials as bonus, not blocker.
2. **D-4 (photo)** — Single point of failure. Studio booking can fall through; weather kills natural-light self-shoots; you may dislike all takes. **Mitigation:** schedule the shoot for D-5 with D-4 as backup slot. Have a "good enough" fallback photo from existing library pre-selected.

## Day 0 deploy gate — checklist

Before F1 starts (hard gate, not soft):

- [ ] **≥ 2 testimonials** in `content/testimonials.json` with: author name, role, company, consent flag (`consented: true`), date, channel (WhatsApp/email screenshot archived in `/private/consent/`)
- [ ] **≥ 4 of 6 project URLs** confirmed reachable (HTTP 200) + screenshots in `/public/work/` named `{slug}.png` ≥ 1600px wide
- [ ] **Professional photo** delivered: 1 hero crop (square + 16:9) and 1 about crop, optimized < 200KB each, in `/public/me/`. If shoot scheduled but not done, must have placeholder + confirmed shoot date within F1 window
- [ ] **EN copy** drafts present in `content/en/` for: `hero.mdx`, `trabalho.mdx`, `principios.mdx`, `contato.mdx`. Reviewed once by a non-native check (Grammarly Premium or peer)
- [ ] **LGPD trail**: written consent archived for every testimonial used
- [ ] **No broken assets**: lighthouse smoke test on staging passes (no 404s on hero/work images)

If any unchecked → F1 starts in **degraded mode** (placeholder content tagged `TODO:fcontent`), and the gap becomes a P0 issue in F1 backlog.

## Fallback plan (per-day rescue)

| If this slips… | Rescue |
|---|---|
| **D-7 outreach** | Use 2 LinkedIn recommendations already public (with screenshot + link as proof of consent). Counts toward minimum. |
| **D-6 URL inventory** | Drop to 4 projects; archive 2 weakest as "case studies" (text-only, no live link required). |
| **D-5 screenshots** | Use Wayback Machine HD captures for dead URLs. Last resort: Figma mockup re-render of original design. |
| **D-4 photo** | Ship with best existing photo + a dated `// TODO: replace by F2` comment. Book reshoot in F1 week 1. |
| **D-3 / D-2 EN copy** | Ship PT-only at launch with `lang="pt-BR"` and `<link hreflang="en">` pointing to a "coming soon" stub. EN becomes F2 deliverable, not launch blocker. |
| **D-1 consolidation** | Push D-0 by 24h. Better a 1-day slip than a broken launch. |

## Operating notes

- **Evening reality check**: 1-2h/day means *one* deliverable per day, no stacking. If a day's task needs 3h, split it across two evenings and slip the dependent day.
- **Async outreach**: send all asks in batches early (D-7, D-6 mornings if possible) so replies arrive throughout the week without blocking you.
- **Brazilian context flag**: phrase testimonial asks in PT, offer a 3-bullet template they can edit ("nem precisa escrever do zero"), and accept WhatsApp voice notes as raw material — you transcribe + get sign-off on the written version. Friction kills response rate.
- **Buffer**: D-1 is intentionally light (60 min) so it absorbs slippage from earlier days.
