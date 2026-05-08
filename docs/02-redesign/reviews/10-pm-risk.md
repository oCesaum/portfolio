---
title: "PM Risk Audit — Portfolio v2 redesign plan"
tipo: "review"
owner: "agente-10"
status: "rascunho"
atualizado_em: "2026-05-06"
escopo: "§0 decisões + §7 plano de implementação"
---

# 10 — PM / Delivery Risk Audit

## 1. Phase plan audit (§7.1)

**Dependências bem ordenadas?** Em geral sim, mas há ineficiências. F0 (limpeza) → F1 (upgrade Next/Tailwind) → F2 (tokens) → F3 (shell) é correto. F4 (SEO) está mal posicionado: depende apenas de metadata e env, não precisa esperar o shell — pode rodar em paralelo desde F2. F5–F8 (seções) são serialmente listadas mas só compartilham F2/F3 como pré-requisito real, então são paralelizáveis entre si.

**Paralelismo perdido:**
- F4 pode rodar em paralelo com F3 (apenas precisa do app/layout existir).
- F5, F6, F8 podem ser desenvolvidas em branches simultâneas após F3 (Hero, Projetos e Contato não dependem entre si).
- F7 (Sobre) é o único bloqueado por asset externo (foto), então deve sair da rota crítica.
- F9 (a11y/perf) precisa estar embutido em cada fase, não como gate final — auditoria final continua, mas TDZ de a11y precisa ser regra desde F3.

**Maior risco de bloqueio:** **F1** (upgrade Next 13→15 + Tailwind 3→4). Tailwind 4 é breaking change estrutural (CSS-first config, `@theme`, `@import "tailwindcss"`), e Next 15 muda `params`/`searchParams` para Promise. Se F1 quebrar, tudo a jusante para. **F2** é segundo maior risco porque define contratos de token usados por todas as seções — refator depois custa caro.

**Re-ordenação recomendada:** fundir F0+F1 (limpeza acontece junto do upgrade, evita commit intermediário com código morto), separar F4 do caminho crítico, mover F9 para "gate por fase" em vez de fase única.

## 2. Bloqueadores audit (§7.2)

| Bloqueador | Severidade | Bloqueia mesmo? | Mitigação |
|---|---|---|---|
| Foto profissional (F7) | **MED** | Sim, mas só F7 | Placeholder cinza com iniciais "CA" + shimmer; lançar sem F7 e adicionar via PR pequeno |
| Depoimentos (futuro) | **HIGH** (não MED) | Não bloqueia build, **bloqueia conversão** | Ver §4: track paralelo de conteúdo, lançar com 1–2 depoimentos coletados via DM |
| Case studies (futuro) | **HIGH** | Bloqueia profundidade dos projetos | Lançar com cards "ver projeto" → live URL externa; case study interno em fase pós-MVP |
| Domínio próprio | **LOW** | Não bloqueia | Comprar `cesaraugusto.dev` (~R$60/ano) antes do deploy; Vercel domain assign é 5min |

**Bloqueadores não listados na spec:**
1. **Conteúdo de copy bilíngue EN.** Spec exige PT+EN completos (Q6=B). Tradução de Hero, Sobre, Contato, projetos e CTAs é trabalho de copywriting real, não auto-tradução. Sem isso, F3 (i18n provider) fica meia-boca e EN entra com texto ruim — pior que não ter EN.
2. **Lista de projetos reais com URL pública + permissão do cliente.** §4 (Projetos) é a seção mais crítica para B2B e o único material 100% sob controle do César ainda não foi listado. Sem 3–5 projetos confirmados (live URL + screenshots de alta resolução + descrição de papel), F6 entrega shell vazio.

## 3. MVP scope challenge

**4 seções (Hero, Projetos, Sobre, Contato) é o MVP correto?** Quase. Para captação freela B2B, **Projetos > Hero > Contato > Sobre** em ordem de importância. "Sobre" é o que cliente B2B abre por último, não primeiro.

- **"Sobre" tem nome errado.** Cliente não-técnico (Q2=C) não clica em "Sobre" — é vago. Trocar para **"Como trabalho"** (PT) / **"How I work"** (EN). Foco em método/processo, não biografia. Aproxima a posição de "consultor", reforçando Q3=A.
- **Bilingue EN no MVP é dúvida legítima.** 80% dos clientes B2B do César virão por LinkedIn/WhatsApp em PT-BR. EN dobra o esforço de copy e i18n. **Recomendação:** lançar PT-only, EN como F11 pós-launch quando primeiro cliente internacional aparecer. Isso libera ~12h e remove uma classe inteira de bugs (rota, hreflang, fallback, toggle UX).
- **Depoimentos pós-launch é erro.** Conversão B2B sem prova social é ~3x menor. Não é "futuro" — é dia 1. Coletar 2 depoimentos curtos via WhatsApp de clientes anteriores (15min de trabalho) deve estar **dentro** do MVP, mesmo que renderizados como blockquotes simples.

## 4. Phase F-MVP (track paralelo de conteúdo)

Spec atual marca depoimentos/case studies como "P=vai produzir" sem timeline. Proposta:

- **F-Content (paralela a F0–F8, owner César, não dev):**
  - Semana 1: pedir depoimento por WhatsApp a 5 clientes antigos, esperar 2 retornos.
  - Semana 1: escolher 4 projetos públicos, levantar URL + screenshot + 3 frases de papel.
  - Semana 2: rascunho EN dos textos finais (ou adiar conforme §3).
  - Semana 2: foto profissional batida ou contratada (R$300–800).
- **Critério de "pronto pra deploy":** 4 projetos com live URL + 2 depoimentos + foto. Sem isso, deploy é beta privado com `noindex`.

## 5. Time-to-launch estimate (senior solo dev, honesto)

| Fase | Escopo | Estimativa (h) |
|---|---|---|
| F0+F1 | Limpeza + upgrade Next 15 + Tailwind 4 + Geist | 10 |
| F2 | Tokens, Lenis, motion, easings | 6 |
| F3 | Layout shell, Header, Footer, WhatsApp flutuante, i18n provider | 12 |
| F4 | SEO, OG image, sitemap, robots, JSON-LD | 4 |
| F5 | Hero | 8 |
| F6 | Projetos (sem case study interno) | 10 |
| F7 | Sobre + foto | 8 |
| F8 | Contato | 5 |
| F9 | A11y audit + Lighthouse + bundle | 6 |
| F10 | Deploy + smoke | 2 |
| **Total** | | **~71h** |

Buffer realista de 30% (debug Tailwind 4, motion edge cases, copy iteração) → **~92h**, ou **~3 semanas de trabalho focado** (30h/sem). Bilíngue EN adicionaria +12h. Depoimentos+conteúdo adiciona +6h em paralelo.

## 6. Top 5 delivery risks (likelihood × impact)

1. **Tailwind 4 + Next 15 breaking changes em F1** — alta × alto. Mitigação: spike de 2h num branch separado antes de F1 commitar, validar `@theme`, `motion`, `lenis` compatíveis.
2. **Conteúdo dos projetos atrasa F6** — alta × alto. Mitigação: F-Content começa **antes** de F0, não em paralelo.
3. **Bilíngue EN consome budget e atrasa MVP** — média × alto. Mitigação: descopar EN para F11 pós-launch.
4. **Foto profissional não chega antes de F7** — média × médio. Mitigação: placeholder definido em F2 já é deployable.
5. **A11y/perf descobertos só em F9 forçam refator** — média × alto. Mitigação: gate de Lighthouse ≥90 + axe limpo em cada PR de seção, não só no final.

## 7. Recommended order revision

```
F-Content (track paralelo, começa T-7d)
F0+F1 (merge: clean+upgrade)         → spike de validação primeiro
F2 (tokens+motion+lenis)
F3 (shell+header+footer+whatsapp+i18n)  ─┐
F4 (SEO+OG+sitemap)                       ├ paralelo após F2
F5 (Hero)         ─┐
F6 (Projetos)      ├ paralelo após F3 (branches separadas)
F8 (Contato)      ─┘
F7 (Sobre)        — fora da rota crítica, mergeia quando foto chegar
F9 — vira gate por PR, não fase isolada
F10 (Deploy)
F11 (EN i18n, pós-launch quando justificar)
```

**Razão:** rota crítica vai de 11 fases sequenciais para 6 marcos sequenciais com 3 trilhas paralelas, cortando ~25% do calendário e isolando o único bloqueador externo (foto) da entrega principal.
