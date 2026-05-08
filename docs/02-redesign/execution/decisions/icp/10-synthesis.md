---
owner: agente-icp-synthesis
title: ICP Synthesis — final pick + spec adjustments
status: decision
date: 2026-05-06
inputs: 01-market-size · 02-conversion · 03-channels · 04-profile-fit · 05-pricing · 07-time-to-paid · 08-brand-fit · 09-risk · spec v2 §0/§6/§7
note: 06-competition not delivered at synthesis time — proceeding without (no signal flagged it as decisive in adjacent reviews).
---

# 10 — ICP Synthesis

## Scorecard (0–10, weights bracketed)

| Dimensão (peso) | A Recruiter BR | B Internacional | C Founder BR | D Agência BR |
|---|---|---|---|---|
| Speed-to-first-BRL (×3) | 4 | 6 | **9** | 5 |
| Profile-fit (×3) | 8.4 | 5.4 | **8.6** | 8.4 |
| Conversion / portfolio leverage (×2) | 4 | **9** | 8 | 5 |
| Brand-fit spec v2 (×2) | 4 | **9** | 8 | 5 |
| Market size (×1) | 7 | **10** | 9 | 6 |
| Pricing aderente §6 (×1) | 7 | 9 | **8 (nativo)** | 7 |
| Channel access today (×1) | **8** | 5 | 4 | 3 |
| Risk/resilience (×1) | 4 | **7** | 3 | 5 |
| **Total ponderado** | **75.4** | **101.2** | **104.6** | **70.4** |

C e B encostam — mas em peso de "solo-dev-needs-money", **C ganha por velocidade real (10–25d vs 35–60d) e profile-fit nativo**. B ganha em teto e marca. Os dois empatam em mercado e juntos cobrem caixa-rápido + upside-USD.

## DECISION

**Primary ICP = C (Founder BR cedo).** Caixa em ≤ 25d via PIX 50% upfront, ciclo 7–15d, ticket R$ 5–35k/projeto, stack do César é literalmente o stack que founder BR contrata, WhatsApp único é canal nativo (não amador), §6 "cobro pelo problema" é fixed-price-friendly por default. Único furo (track-record raso) some assim que 1–2 entregas C alimentam case studies.

**Secondary ICP = B (Internacional Remoto).** Pareamento natural: o portfólio v2 já está implicitamente desenhado pra B (08-brand confirma) — Vercel/Linear minimal, manifesto first-person, problem-pricing, honesty radical são dialeto SF/Berlin/Lisbon. B compensa o BRL-único de C com USD, cobre o ceiling baixo de C, e usa o mesmo asset (a versão EN do portfólio) sem reescrever marca. C alimenta caixa imediato; B alimenta margem e hedge cambial Y2.

**Descartados como foco ativo:** A (recruiter) e D (agência). Brand-fit ruim (4 e 5), violam §6 (hora-cheia / day-rate), atritam com WhatsApp-único, e canibalizam tempo que vai virar asset em B. Mantém-se como inbound oportunístico — não prospectar.

## ICP statement (1 linha pro portfólio)

PT (lead do hero, substitui a versão atual):
> `Trabalho com founders e operações enxutas que precisam tirar um produto web do briefing pro deploy — com escopo fechado, prazo honesto e código que a próxima pessoa entende.`

EN (lead do hero):
> `I work with founders and lean teams shipping web products from brief to deploy — fixed scope, honest timelines, code the next person can read.`

Trocas vs spec atual: "agências e founders" → "founders e operações enxutas" (remove agência, mantém porta aberta pra B internacional via "lean teams"). "Prazo honesto" mantido. "Escopo fechado" adicionado — sinaliza problem-pricing sem o jargão.

## Adjustments to spec

1. **Hero §3.2 lead PT/EN:** substituir pelo statement acima. "Agências" sai, "operações enxutas / lean teams" entra. Compatível com "Aceitando 2 projetos este trimestre" sem alteração.
2. **Hero §3.2 stack inline:** primeiro item destacado muda de `**Next.js**` puro para par funcional. Sugestão: `**Next.js** · TypeScript · Supabase · Tailwind · Node.js`. Move React pra "complemento" implícito, sobe Supabase (sinal claro pra founder MVP). PHP/WordPress some do hero.
3. **Como trabalho §5.2 stack agrupada:** manter as 4 categorias, mas reordenar dentro de back-end: `Node.js · Supabase` primeiro, `PHP · WordPress` depois (e abaixar pra peso de label, não default). PHP+WP fica como "também atendo legacy" sem virar a primeira impressão. Não remover — D é fallback de runway e WP destrava demanda que só César pega.
4. **Princípios §6.2:** adicionar 1 princípio que ancora C explicitamente. Sugestão item 6 PT: `Briefing curto, prazo curto, deploy real.` / EN: `Short brief, short timeline, real deploy.` Reforça velocidade (que é o que C compra). Mantém os 5 atuais — só adiciona.
5. **Contato §7.2 lead:** trocar "agências" por "founders". PT: `Aceitando 2 projetos este trimestre. Mande um WhatsApp com o que precisa fazer — eu volto com escopo, prazo e plano.` Adiciona "escopo" antes de "prazo e plano" (sinal de fixed-price). EN análogo.
6. **Contato §7.2 linha mono rotativa:** adicionar uma 4ª string que fala C. PT: `RESPOSTA EM ATÉ 24H` / `BRASIL · UTC−3` / `ACEITANDO PROJETOS` / **`PIX OU CARTÃO · 50% UPFRONT`**. Resolve a objeção #1 de founder ("como pago?") sem ocupar layout. EN: `PIX OR USD · 50% UPFRONT`.
7. **Projetos §4 etiquetas de tipo:** manter `Featured / Cliente / Produto / Estudo`. Adicionar tag de duração no card Featured (ex: `6 semanas`). Founder mede portfólio em "quanto tempo levou?" — esse sinal converte.
8. **Não mudar:** estética premium-minimal (já é o asset de B), single-page, no-blog, manifesto, foto split-tone, WhatsApp único. Tudo isso é o que faz brand-fit B=9 e C=8 ao mesmo tempo. Mexer aqui derruba os dois.
9. **F-Content §8.1:** os 2 depoimentos a coletar **devem ser de founders BR** (não de agências, não de colegas dev). Se só houver depoimento de agência, deploy entra `noindex`.
10. **Não-spec / canal:** após launch, ativar Twitter/X-BR (founder community) com 2h/sem cadence — é o único canal de prospecção ativa que C exige. LinkedIn EN passivo cobre B Y1; Toptal/Upwork ficam pra Y2.

> **DECISION: ICP primary = C (Founder BR cedo), secondary = B (Internacional Remoto). Adjustments to spec: §3.2 lead reescrito (founders + lean teams), §3.2 stack inline (Supabase sobe, PHP some do hero), §5.2 stack reordenada (Node+Supabase first, PHP+WP secundário), §6.2 adicionar princípio "Briefing curto, prazo curto, deploy real", §7.2 lead troca "agências" por "founders" + adiciona "escopo", §7.2 mono rotativa ganha 4ª string de pagamento, §4 cards Featured ganham tag de duração, F-Content depoimentos = founders only.**
