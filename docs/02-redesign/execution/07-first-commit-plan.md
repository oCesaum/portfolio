---
title: "Portfolio v2 — plano do commit #1"
tipo: "plano de execução"
status: "ativo"
owner: "agente-firstcommit"
atualizado_em: "2026-05-06"
escopo: "primeiro commit atômico da branch feat/portfolio-v2"
depende_de:
  - "docs/02-redesign/portfolio-redesign-spec.md §8.1"
  - "docs/02-redesign/execution/05-migration-diff.md (pendente A5)"
  - "docs/02-redesign/execution/06-cleanup-list.md (pendente A6)"
---

# Commit #1 — recomendação e plano

> Nota: A5 e A6 ainda não existem em `execution/`. Plano baseado direto no spec §8.1 (fase F0+F1 merged).

## Recomendação: **Opção A — cleanup only, stack travado em Next 13**

**Por quê:**
- Spec §8.1 manda F0+F1 juntos (10h total). Mas isso é "fase", não "commit". Uma fase pode (deve) virar 4–6 commits atômicos.
- Cleanup + migration no mesmo commit gera diff de >2k linhas misturando deleções legado com bumps de major version — irreversível por `git revert`, ilegível em review.
- Opção C (migrar sobre legado) força reescrita dupla — toca arquivo deletado em commit seguinte. Trabalho jogado fora.
- Opção D (scaffold fresh) descarta histórico git e perde rastro de decisão sobre `package-lock.json` atual.
- Opção A isola a remoção (commit reversível, baixo risco) e permite que o commit #2 seja apenas o salto de versão Next/Tailwind/React num diff focado em deps.

Pré-requisito do spec respeitado: **PRE-F0 spike** (2h) acontece em branch throwaway antes desta — a branch `feat/portfolio-v2` parte do mesmo HEAD que `main`/branch atual e só roda cleanup.

## 1. Branch

```bash
git checkout main
git pull --ff-only origin main
git checkout -b feat/portfolio-v2
```

## 2. Arquivos do commit #1 (deletes + 1 update)

**Removidos (legado fora do escopo v2):**
- `src/components/DarkModeButton.tsx` (dark-only, §1.4)
- `src/components/Cursor.tsx` (cursor custom = NÃO, §1.5)
- `src/components/Loading.tsx` (sem page transitions, §1.5)
- `src/components/Timeline.tsx` (não está em §0 nav)
- `src/components/SkillsSection.tsx` (refeito como `StackList` em §5.8)
- `src/components/Footer.tsx` legado (será reescrito em F3)
- `src/app/api/hello/route.ts` + pasta `api/` se órfã
- `src/styles/scrollbar.css` (sem Lenis, native scroll)
- Meta Pixel: snippets em `src/app/layout.tsx` (analytics zero, §2.5)
- `react-scroll` import sites (busca global; substituído por âncoras nativas)
- `public/mario.gif`, `public/project-image.jpg`, `public/doce compota.png` (renomear pro doce-compota fora deste commit; só DELETE dos 2 inúteis aqui)

**Mantidos intactos:** `package.json`, `next.config.js`, `tailwind.config.js`, tokens atuais, hero/projetos atuais. Nada de migration aqui.

**Atualizado:** `src/app/layout.tsx` apenas pra remover imports de componentes deletados + Pixel snippet. Sem refactor.

## 3. Mensagem de commit (Conventional Commits)

```
chore(portfolio-v2): remove legacy components and tracking before v2 rewrite

Drops components and assets that conflict with v2 spec decisions
(dark-only, no cursor custom, no page transitions, zero tracking,
native scroll). Keeps stack at Next 13 — version bumps land in commit #2.

Removed:
- DarkModeButton, Cursor, Loading, Timeline, SkillsSection, legacy Footer
- src/app/api/hello, src/styles/scrollbar.css
- Meta Pixel snippets in app/layout.tsx
- react-scroll usages (anchor-based nav coming in F3)
- public/mario.gif, public/project-image.jpg

Refs: docs/02-redesign/portfolio-redesign-spec.md §1.4, §1.5, §2.5, §8.1
```

## 4. CI checks que precisam passar

- `pnpm install` (lockfile consistente após remoções)
- `next build` (sem imports quebrados pros componentes deletados)
- `next lint` (zero warnings novos)
- `tsc --noEmit` (sem types órfãos de `react-scroll`)
- Visual smoke: `next dev` carrega `/` sem erro de console (estado degradado é aceito; styling vai parecer quebrado e tudo bem)

Nada de Lighthouse/axe-core ainda — esses gates entram no F9 por PR.

## 5. Tamanho estimado

- **Linhas removidas:** ~900–1100 (componentes + Pixel + scrollbar.css + binários ignorados no count)
- **Linhas adicionadas:** ~10–25 (apenas edits cirúrgicos em `app/layout.tsx`)
- **Arquivos tocados:** ~12–15
- **Diff revisável em:** 5–8 minutos

## 6. Commit #2 (estabelece a cadência)

```
chore(portfolio-v2): bump to Next 15 + Tailwind 4 + React 19
```

Escopo: `package.json` + `package-lock.json` + `next.config.js` (App Router defaults v15) + `postcss.config.js` (Tailwind 4 plugin) + `tsconfig.json` (target bump). Zero código de UI novo. Build precisa passar mesmo com app degradado.

**Padrão estabelecido pelos dois primeiros commits:**
1. Um commit = uma intenção (cleanup, bump, token system, shell, etc.)
2. Mensagem `<tipo>(portfolio-v2): <ação no imperativo>` + corpo com referência ao spec
3. Build verde obrigatório (lint pode warning, type-check obrigatório)
4. Diff < 1500 linhas líquidas; se passar, dividir
