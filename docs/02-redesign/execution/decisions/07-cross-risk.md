---
owner: agente-cross-risk
title: D1-D5 Cross-Cutting Risk Audit
status: draft
date: 2026-05-06
scope: worst-case + hidden risks across all five v2 redesign decisions
---

# Cross-Risk Audit (D1-D5)

Each entry frames the worst plausible outcome of the "obvious" answer plus the risk that the D-specific specialist would systematically underweight.

## D1 — Doce Compota dead site (obvious: restore)

1. **Worst-case.** Restoration succeeds technically but the live URL becomes a portfolio liability: stale stock, broken WhatsApp, expired SSL on a sub-asset, or a hardcoded test Stripe key resurfaces and a real user transacts. The "case study" then sells César as a dev who ships abandoned client work, and a takedown request from the original client lands while it's pinned to the homepage.
2. **Probability.** Medium (revival of an unmaintained Next.js + integrations app rarely comes back clean).
3. **Mitigation.** Restore to a `case-study/` static export only — never re-point a live commerce flow.

## D2 — Repos deleted (obvious: restore public)

1. **Worst-case.** Force-pushing restored history exposes a `.env`, an API key in an old commit, or a client NDA artifact that was the *reason* it was deleted in the first place. GitHub secret scanning fires, Vercel/Cloudflare tokens get auto-revoked across active projects, and the v2 deploy itself breaks.
2. **Probability.** High — repos are deleted for a reason, and that reason is rarely documented.
3. **Mitigation.** Restore to private first, run `gitleaks` + manual NDA pass, then flip visibility.

## D3 — Minimum shippable (obvious: full spec)

1. **Worst-case.** The full v2 spec stretches 6-10 weeks; recruiter traffic in the meantime hits the half-broken old site, and motivation collapses around week 4 when novelty fades but scope hasn't. The portfolio lands in the "started 2026, last commit 3 months ago" graveyard — worse than no redesign.
2. **Probability.** High (this is the modal failure of solo redesigns).
3. **Mitigation.** Define a 7-day shippable cut (home + 1 case study + contact) and freeze scope before any polish work.

## D4 — Photo (obvious: DIY)

1. **Worst-case.** DIY photo reads as "uncanny LinkedIn selfie" — slightly off lighting, slightly off crop, slightly off expression — and silently tanks recruiter trust on the *one* asset that signals seriousness above the fold. Worse, it gets cached on LinkedIn/Google for months.
2. **Probability.** Medium-high. Self-shot headshots fail the "would a hiring manager pause?" test ~70% of the time.
3. **Mitigation.** Budget R$150-300 for a 30-min studio session; treat as non-negotiable infra, not vanity.

## D5 — Sequência (obvious: parallel everything)

1. **Worst-case.** Parallel tracks (content + design + infra + photo) all hit 80% done simultaneously, none ship, and integration reveals contradictions (copy assumes 6 projects, design grid assumes 3). César burns the productive window on merge conflicts instead of momentum.
2. **Probability.** Medium-high in solo execution; parallelism needs a coordinator that doesn't exist here.
3. **Mitigation.** Critical path serial (content lock → design → build), only photo + repo audit run in parallel as independent tracks.

## Meta-risk none of D1-D5 captures

**The v2 redesign succeeds aesthetically and still fails commercially because no decision asks "who is this portfolio *for*?"** D1-D5 optimize the artifact; none commits to a target audience (BR recruiters? international remote? freelance clients? agencies?). A premium Stitch-aligned site aimed at the wrong reader converts worse than the current one — the v2 might lose the freelance-client traffic the old site was actually getting. Mitigation: lock an ICP statement (1 sentence, 1 audience) before D3 scope is finalized; every section must justify itself against that ICP or get cut.
