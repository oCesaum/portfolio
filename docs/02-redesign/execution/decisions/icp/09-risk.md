---
owner: agente-icp-risk
date: 2026-05-06
status: draft
scope: ICP risk & resilience analysis
---

# 09 — ICP Risk & Resilience

Each ICP scored 0–10 (10 = robust, 0 = single point of failure).

## A. Recruiter BR
**Top 3 risks**
1. **CLT/PJ regulatory shift** — reforma trabalhista or PJ crackdown (Carf/Receita) collapses contractor demand overnight.
2. **BR macro contraction** — Selic spike + hiring freeze; recruiters are the first budget cut at agencies/scale-ups.
3. **Relationship concentration** — pipeline depends on 3–5 recruiters; one job change = pipeline halved.

**Failure modes**: CLT-only mandate kills PJ rate; BRL inflation eats real wage; recruiter quotas shift to senior-only roles.
**Score: 4/10** — high concentration, BRL-denominated, regulatory exposure.

## B. International Remote
**Top 3 risks**
1. **EN proficiency gap in live calls** — written EN ≠ technical interview EN; one bad call closes the lead.
2. **Payment infra fragility** — Wise/Stripe/Deel can suspend LATAM accounts (KYC, sanctions sweep); 2-week cash gap.
3. **FX whiplash + LATAM bias** — strong BRL erodes margin; US/EU clients still default to "hire EU/US first" for senior roles.

**Failure modes**: timezone mismatch (US-West async fails for live standups); compliance friction (1099 vs contractor); commoditization vs Eastern Europe + India at lower rates.
**Score: 7/10** — diversified geo + USD-denominated hedges BR macro, but infra single points exist.

## C. Founder BR
**Top 3 risks**
1. **Founder dropout** — 70%+ of pre-seed BR startups die in 18mo; client churn baked in.
2. **Budget volatility** — bridge rounds delayed → invoice paid 60–90d late or written off.
3. **Scope creep + equity-instead-of-cash pressure** — founders trade equity for discount; cash flow rots.

**Failure modes**: client pivots, defunds the project mid-build; founder hires in-house dev and ghosts; equity becomes worthless.
**Score: 3/10** — highest churn, weakest payment discipline, BRL-denominated.

## D. Agência BR
**Top 3 risks**
1. **Overflow is cyclical, not structural** — agencies only subcontract during peak; dry months = zero pipeline.
2. **Margin squeeze** — agencies extract 40–60% markup; rate ceiling is low and shrinking.
3. **Single-agency loyalty trap** — one agency = 80% of revenue; they drop you, you reset.

**Failure modes**: agency in-houses the role; client contract ends and overflow vanishes; NDA blocks portfolio reuse.
**Score: 5/10** — predictable demand pattern, but margin and concentration are real.

## Switching Cost Analysis

| From → To | Cost | Reason |
|---|---|---|
| A → C | **Low** | Same language, same network (BR LinkedIn), same case studies; only sales motion changes (recruiter pitch → founder pitch). |
| A → D | **Low-Med** | Shared BR network; needs portfolio reframe ("delivery muscle" vs "individual IC"). |
| A → B | **High** | Requires EN portfolio rewrite, USD pricing page, payment infra setup, timezone proof, Stripe/Wise/Deel onboarding. |
| B → A | **Medium** | EN assets translate down; BR network must be rebuilt. |
| C → D | **Medium** | Founder case studies don't sell to agencies (they want process, not heroics). |

**Lowest switching cost**: **A → C** (recruiter-BR → founder-BR). Same language, same network, same currency, same case studies. Sales motion is the only delta.

## Verdict

- **Lowest-risk ICP**: **B (International Remote) — 7/10**. USD revenue hedges BRL, geographic diversification, ceiling on rate is highest. Infra risk is fixable; macro risk is structural everywhere else.
- **Most resilient combo of 2**: **B + A** (International Remote + Recruiter BR). Hedges currency (USD + BRL), hedges channel (cold outbound + warm referral), hedges macro (US/EU cycle ≠ BR cycle). A provides cashflow stability while B is being seeded; B provides upside ceiling once locked. Avoid C+D pairing — both BRL, both cyclical, correlated downside.

**Recommendation**: lock A first (fastest cash), seed B in parallel (compounding asset), treat C and D as opportunistic fill — never anchor a strategy on them.
