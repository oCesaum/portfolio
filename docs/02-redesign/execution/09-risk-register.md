---
title: "Portfolio v2 — risk register (14 dias)"
tipo: "registro-riscos"
status: "ativo"
owner: "agente-riscos"
atualizado_em: "2026-05-06"
escopo: "Spec v2 §8 — F-Content + spike + F0 + F1 + F2 (dia 1–14)"
referencia_spec: "docs/02-redesign/portfolio-redesign-spec.md §8"
---

# Risk register — janela de 14 dias

Top 10 riscos ranqueados por **impacto x probabilidade** sobre o cronograma de ~71h em 3 semanas (solo dev). Janela coberta: F-Content paralelo + spike pré-F0 + F0 (tokens/i18n) + F1 (hero) + F2 (projetos/timeline). Severidade em escala 1–5 cada eixo (S = I x P, máx 25).

| # | Risco | Severidade (I x P) | Janela (dia/fase) | Sinal de alerta precoce | Mitigação imediata | Plano B |
|---|---|---|---|---|---|---|
| 1 | César sem tempo (vida real, freelas, energia) — solo dev sem buffer real | 5 x 4 = 20 | Toda janela; pico dias 5–10 (F1+F2 densos) | Slip de 1 dia em qualquer fase, commit gap >48h, sessão <2h | Cortar escopo: Princípios e Timeline viram pós-launch; manter Hero+Projetos+Contato | Estender pra 4 semanas, soltar v2.0 minimal (sem Princípios/Timeline) e iterar |
| 2 | Depoimentos não chegam a tempo (F-Content depende de terceiros) | 5 x 4 = 20 | Dias 1–10 (track paralelo, B10 obriga em MVP) | Sem resposta 72h após pedido, <2 confirmados dia 7 | Disparar 5 pedidos dia 1 com template pronto + deadline dia 8; follow-up dia 4 | Lançar com 1–2 quotes curtas + placeholder honesto "mais a caminho", ou esconder seção atrás de feature flag |
| 3 | Bundle estoura 130 KB (motion + lucide + Geist) | 4 x 4 = 16 | Dia 6–10 (F1 hero motion) e dia 12–14 (F2 projetos) | `next build` reporta route >130KB no spike, motion adiciona >25KB gz | Tree-shake lucide via imports diretos, lazy-load motion em below-fold, pesar no spike pré-F0 | Trocar motion por CSS-only animations no hero; aceitar 145KB se LCP segurar |
| 4 | LCP >2s em 3G após stack motion + parallax + aurora | 5 x 3 = 15 | Dia 7–11 (pós-F1 com hero completo) | Lighthouse mobile 3G LCP >1.8s no preview deploy | Defer aurora/parallax pra rAF pós-FCP, preload Geist subset, hero text-first com motion gated | Remover aurora drift e parallax; manter só fade-in estático; perfect-fourth still ships |
| 5 | Tailwind 4 quebra em token específico (Geist via @theme, custom easings, container queries) | 4 x 3 = 12 | Spike pré-F0 (dia 2–3) e F0 (dia 3–5) | Erro de build no `@theme` block, fonte Geist não aplica, custom property não compila | Spike isolado dia 2 testando Geist+@theme+custom easings antes de F0 começar | Rollback pra Tailwind 3.4 (suportado), perder container queries mas ganhar estabilidade |
| 6 | i18n route migration quebra SSG (`/pt`, `/en` + generateStaticParams) | 4 x 3 = 12 | F0 dia 4–5 (A7 forçou migração) | `next build` falha em static export, dynamic params undefined, 404 em rota localizada | Validar generateStaticParams com `output: 'export'` no spike; copiar pattern de doc oficial Next 15 | Manter i18n route-based mas SSR puro (sem static export); aceitar deploy Vercel com runtime |
| 7 | React 19 peer dep conflict (lucide-react, motion, outras libs ainda em peer ^18) | 4 x 3 = 12 | Spike dia 1–2 e qualquer `npm install` novo | `npm install` solta ERESOLVE ou warns de peer mismatch | Lockar versões testadas no spike (lucide ^0.460, motion ^11.15+); usar `--legacy-peer-deps` só se documentado | Voltar pra React 18.3 (Next 15 suporta); perder use() hook mas estabilizar deps |
| 8 | Foco invisível regression escapa (double-ring A3 não cobre todos os fundos) | 4 x 3 = 12 | F1 dia 6–8 (CTAs hero) e F2 dia 11–14 (cards projeto) | Tab manual mostra anel sumindo em fundo `--background-sunken` ou hover state | Smoke test com Tab em todos componentes interativos ao final de cada fase; axe-core no CI | Adicionar terceiro ring layer (ring offset alto-contraste) global; fix antes do launch obrigatório |
| 9 | Foto profissional não agendada / não chega (B6 split-tone exige sessão) | 3 x 4 = 12 | Dias 1–10 (precisa pra "Como trabalho" e Hero/Sobre) | Sem fotógrafo agendado dia 3, sem shoot até dia 8 | Agendar shoot dia 1; alternativa: self-shoot guiado com tripod + janela natural dia 5 | Lançar com selfie editorial tratada (grão + split-tone via CSS filter); substituir pós-launch sem PR |
| 10 | URLs de projetos caem (Vercel free tier sleep, domínios expirados) durante validação | 4 x 3 = 12 | F2 dia 11–14 (validação obrigatória pré-link) | Health check retorna 404/503 em qualquer card de projeto | Rodar `02-url-validation.md` script dia 11 e re-rodar dia 14; redeploy/renew imediato | Trocar link externo por screenshot + case study interno; remover card se projeto morto |

## Riscos monitorados (fora do top 10)

- **Next 15 async API quebra código copiado** (3x3=9): `params`/`searchParams` agora são Promise — alerta no spike, fix mecânico via codemod oficial.
- **Copy iteration arrasta** (3x3=9): timebox 2h por seção, lock copy dia 9 mesmo "imperfeita".
- **Reduce-motion safety net falha em algo** (3x2=6): A4 cobre global, mas testar parallax rAF e aurora drift manualmente com `prefers-reduced-motion: reduce` em DevTools.

---

## Top 3 a atacar ESTA SEMANA (dias 1–7)

1. **Risco #1 — César sem tempo:** definir hoje o "minimum shippable" (Hero+Projetos+Contato) e marcar Princípios/Timeline como "cortáveis" no roadmap. Sem isso, todos os outros riscos compostam.
2. **Risco #2 — Depoimentos:** disparar 5 pedidos HOJE (dia 1) com template do `03-whatsapp-templates.md` + deadline explícito dia 8. Cada dia perdido = 1 dia menos pra follow-up.
3. **Risco #5+#6+#7 — Stack quebra no spike:** rodar spike pré-F0 dias 2–3 testando Tailwind 4 + Geist + @theme + i18n route + React 19 peers num branch isolado. Se algum falha, decidir rollback ANTES de F0 começar — não no meio.

Reavaliar este registro **dia 7** (mid-cycle) e **dia 11** (pré-F2 lock). Severidades >15 que persistirem dia 7 disparam corte de escopo automático.
