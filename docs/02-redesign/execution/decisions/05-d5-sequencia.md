---
owner: agente-d5
title: D5 — Sequência de execução (paralelismo vs serialização)
date: 2026-05-06
status: decided
inputs:
  - spec-v2 §8.1 (F-Content + Pre-F0 + F0..F8)
  - agent-03 (whatsapp templates)
  - agent-06 (cleanup list)
  - agent-07 (first-commit plan)
  - agent-08 (photo brief)
  - D1..D4 (decisões já tomadas)
---

## 1. Grafo de dependências

```
D1..D4 (decididos) ──────────────┐
                                 ▼
F-Content (César, paralelo, sem código):
  C1 WhatsApp 5 msgs (15min) ──────────► depoimentos chegam D+1..D+5
  C2 Foto book/DIY (1d-1w)   ──────────► hero asset

Dev track (serial dentro do branch):
  Pre-F0 spike  → F0 cleanup  → F1 migration → F2 fundamentos → F3 shell → F4..F8
  (já validado)   (~1h)         (~2-3h)        (~6h)            (~12h)
```

Regras duras:
- F1 (migration) **deve** rodar depois de F0 (cleanup). Migrar arquivos que serão deletados é trabalho jogado fora e gera conflito.
- F2 depende de F1 (Tailwind 4 + tokens novos exigem stack migrada).
- F3..F8 dependem de F2 (consomem tokens, globals.css, safety net).
- F-Content **não** depende de código — roda em paralelo com tudo.

## 2. Risco de conflitos em paralelo

Cleanup + Migration simultâneos = colisão garantida: agent-06 deleta 18 arquivos, agent-05 reescreve `package.json`/`next.config`/`tailwind.config`. Se rodarem em branches separados, o merge vira conflito de 3 vias em arquivos-chave. **Serializar no mesmo branch, dois commits atômicos.**

F-Content é seguro em paralelo: César mexe em WhatsApp/câmera, dev mexe em código. Zero overlap de arquivos.

## 3. Caminho crítico (menor time-to-deploy)

`F0 → F1 → F2 → F3 → F4..F8 (paralelizáveis entre si)`. Total dev ≈ 1+3+6+12+N. F-Content roda em paralelo: depoimentos prontos no D+5, foto pronta no D+1..D+7. Nenhum dos dois bloqueia deploy de F2/F3.

## 4. Isolamento de falhas

- **Cleanup e migration em commits separados, mesmo branch (`chore/f0-cleanup` → `chore/f1-migration`).** Se F1 quebrar, `git revert` derruba só a migration; F0 fica e o repo continua mais limpo.
- Branches separados foram considerados e descartados: dobram o custo de merge sem ganho real (o agent-07 já validou ordem A→B).
- F2 em branch próprio (`feat/f2-fundamentos`) — falha aqui não toca F0/F1 já mergeados.

## 5. Dependência de decisão

D1..D4 **já estão decididos** (Doce/Compota, repos deletados, etc.) — destravam F0/F1/F2 sem espera. F3..F8 podem precisar de D5+ que ainda não existem; não bloqueiam o início agora.

## Recomendação — ordem executável

**Hoje, em paralelo:**
1. César dispara as 5 mensagens WhatsApp (15min, agent-03).
2. César agenda foto profissional OU executa DIY (agent-08) — kick off só, não bloqueia.
3. Dev abre branch `chore/f0-cleanup`, executa Option A do agent-07 (~1h), commit, PR, merge.

**Em sequência (dev, após F0 mergear):**
4. Dev abre `chore/f1-migration` a partir de main, executa diff do agent-05 (~2-3h), commit, PR, merge. **Aguarda CI verde antes de seguir.**
5. Dev abre `feat/f2-fundamentos` (~6h) — tokens, globals.css, safety net. Merge.
6. Dev abre `feat/f3-shell` (~12h) — Header/Footer/FAB/i18n. A partir daqui F4..F8 podem rodar em paralelo entre si (branches separados por seção).

**Não começar antes:** F2 antes de F1 mergear; F3 antes de F2 mergear; qualquer coisa de seção (F4+) antes de F3.

## Bonus — ação de maior alavancagem hoje

**César manda as 5 mensagens WhatsApp agora (15 min).** Depoimento tem latência humana (1–5 dias) e é input de F6 (Provas). Disparar hoje faz o conteúdo chegar exatamente quando o dev terminar F2/F3 e estiver pronto para popular as seções. Qualquer outra ação (foto, código) tem latência menor ou cabe no caminho crítico do dev — só o WhatsApp tem ciclo externo que precisa começar a contar imediatamente.
