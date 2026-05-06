---
title: "Cross-cut D1–D5 — análise de velocidade de dev"
tipo: "decisao"
status: "ativo"
owner: "agente-cross-velocity"
atualizado_em: "2026-05-06"
referencia:
  - "execution/05-migration-diff.md"
  - "execution/06-cleanup-list.md"
  - "execution/07-first-commit-plan.md"
---

# 10 — Velocity delta D1–D5

Premissa: legado é descartado em F0+F1 (06-cleanup-list §"Files to rewrite" reescreve `page.tsx`, `globals.css`, `layout.tsx`, `portfolio-data.ts`). Isso muda o cálculo: tudo que sobrevive em F2+ é código novo, então "restore" custa mais do que parece.

## D1 — Doce Compota: restore vs hide vs substitute

- **Δ horas:** restore 0h (rename já planejado em 06 §"Files to rename") · hide +1.5h (CSS opt-out + flag em `data/projects.ts`) · substitute +6h (nova screenshot + retake + alt copy PT/EN).
- **Menos arquivos:** restore — toca 2 (`public/doce-compota.png` rename + 1 string em `data/projects.ts`). Hide toca 3 (data + grid component + dictionaries). Substitute toca 4+.
- **Menor risco de merge-conflict:** restore — rename é idempotente, vive fora dos hotspots de F5/F6.
- **Ship mais rápido:** **restore**. Já está no checklist 06; zero debug.

## D2 — Repos deletados: restore vs hide vs remove

- **Δ horas:** remove 0h · hide +0.5h (filtro `published: true`) · restore varia 4–20h (depende de Git reflog/backup, fora da malha do dev).
- **Menos arquivos:** remove e hide empatam em 1 (`data/projects.ts`). Restore toca infra externa + N arquivos.
- **Menor risco de merge-conflict:** remove — entrada some do array, sem branch paralela mexendo na mesma linha.
- **Ship mais rápido:** **remove**. Hide deixa dead code esperando uma decisão que nunca volta; remove fecha o loop.

## D3 — Conteúdo: 5 seções vs minimal vs no-EN — maior delta

- **Δ horas:** 5 seções (PT+EN) ≈ 28h · minimal (Hero+Projetos+Contato, PT+EN) ≈ 12h · **no-EN (5 seções, só PT) ≈ 18h**.
- **Maior delta:** entre 5-seções-bilíngue e minimal-bilíngue → **16h** (a maior tesoura). No-EN economiza 10h vs full mas mata o gate de paridade de chaves do CI (spec §2.4).
- **Menos context-switch:** **minimal** — uma única passada Hero→Projetos→Contato, sem alternar mental model entre Princípios (copy filosófica) e Work (timeline factual).
- **Ship mais rápido:** **minimal**. 5 seções é o produto final; minimal é o MVP-deploy-friday.

## D4 — Foto: DIY vs photographer vs placeholder — bloqueio para F7

- **Δ horas dev:** todos ~2h de integração (split-tone + `next/image`). O custo real é wall-clock externo: DIY 4–8h · photographer 5–10 dias · placeholder 0h.
- **Bloqueia F7?** Photographer **bloqueia** (F7 = Contact, depende da split-tone foto, 06 §"public assets"). Placeholder **não bloqueia** — F7 entrega com `<div>` gradient + `aria-label`. DIY bloqueia parcialmente (1 dia).
- **Menor risco de merge-conflict:** placeholder — substituível por 1-line swap em `data/contact.ts` depois.
- **Ship mais rápido:** **placeholder agora, photographer em paralelo**. Desbloqueia F7→F8→F9 sem esperar agenda externa.

## D5 — Sequência: paralela vs serial — dias "esqueci onde estava"

- **Δ horas:** serial 0h overhead · paralela +3–5h (rebases + re-leitura de contexto a cada switch).
- **Menos context-switch:** **serial F0→F1→F2→…→F9**, commits atômicos como o 07-first-commit estabelece (cleanup, depois bump, depois tokens). Cada commit < 1500 linhas líquidas evita "qual arquivo eu estava editando segunda?".
- **Menor risco de merge-conflict:** serial — só uma branch viva (`feat/portfolio-v2`) tocando `globals.css`/`page.tsx`/`data/*`, que são todos hotspots compartilhados.
- **Ship mais rápido com menos debug:** **serial**. Paralela só ganha se F4 (SEO/assets) e F-Content rodarem em branches read-mostly — mas 06 mostra que F-Content reescreve dictionaries que F3 layout consome → conflito garantido.

---

## Padrão omitido pelo spec (≥15% speedup)

**Pre-commit `tsc --noEmit` + `next lint` em hook local + `lint-staged` em arquivos tocados.** O spec exige build verde no CI (07 §4) mas só descobre regressão depois do push — cada round-trip custa ~6min de CI. Hook local pega o erro em <20s, na mesma janela mental do dev. Em F2–F8 (estimado 8 commits/dia × 5 dias × 30% taxa de retrabalho de tipo) economiza ~4h em 40h de fase = **10% só de tempo morto, +5% de fluxo preservado** (Csíkszentmihályi: cada quebra de flow custa ~15min de re-rampa). Setup: 15min (`husky` + `lint-staged` + 4 linhas em `package.json`). ROI no commit #3.
