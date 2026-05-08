---
title: "Day-1 plan — síntese das 10 trilhas de execução"
tipo: "execution-summary"
status: "ativo"
owner: "pensador"
atualizado_em: "2026-05-06"
---

# Day-1 plan

10 agentes paralelos entregaram artefatos prontos pra destravar execução. Síntese:

---

## ✅ GO confirmado

### Spike (Agente 01)

**Veredito: GO para F1.** Next 15.5.15 + React 19.2 + Tailwind 4.2 + motion 12.38 + geist 1.7 instalado e buildado em scaffold isolado. Zero peer warnings críticos. Bundle 131 KB (1 KB sobre target 130 KB — fixable consolidando `LazyMotion` no layout).

**Surpresas mapeadas:**
- Tailwind 4 sem JS config → `@theme` em CSS funciona, valida `--accent #d8bea3`
- `tailwindcss` postcss plugin renomeado pra `@tailwindcss/postcss`
- Tailwind 4 tree-shake agressivo: `bg-whatsapp` só emite se referenciado

**Lock de versões validadas** disponível em `01-spike-validation.md`.

---

## ⚠ Bloqueadores externos descobertos

### Conteúdo de projetos (Agente 02)

**3 problemas que afetam Seção Projetos:**

| # | Problema | Severidade | Onde aparece |
|---|----------|------------|--------------|
| 1 | `docecompota.com.br` retorna `DEPLOYMENT_NOT_FOUND` (Vercel) + TLS handshake falha | **P0** | `portfolio-data.ts:84` |
| 2 | Repo `fast-cart-landing-page` deletado/privado no GitHub | P1 | `portfolio-data.ts:95` (live URL ainda OK) |
| 3 | Repo `barber-landing-page` deletado/privado no GitHub | P1 | `portfolio-data.ts:115` (live URL ainda OK) |

**Decisão necessária tua:**
- (a) Restaurar deploy do Doce Compota (cliente abandonou? subir de novo?)
- (b) Tornar repos públicos novamente, ou esconder o link "Repositório" daqueles 2 cards

5 de 6 projetos prontos. 1 projeto (Doce Compota) **não pode** ir pra spec v2 sem ação.

---

## 📋 Artefatos prontos pra usar

### F-Content (Agentes 03 + 04)

- **WhatsApp templates** (3 versões: amigo / cliente neutro / cliente antigo) + script de consentimento + objection handler em `03-whatsapp-templates.md`
- **Calendário 7-day** com slip-risk em D-7 (depoimentos) e D-4 (foto), Day 0 gate, fallback per-day em `04-fcontent-calendar.md`

### Foto profissional (Agente 08)

- **Brief completo DIY ou fotógrafo** com mood / wardrobe / lighting / shot list / receita Lightroom Mobile (split-tone hex 35°/215°, grain 12, crop 5:7 1500×2100) em `08-photo-brief.md`

### Copy EN final (Agente 10)

- **Dicionário `en.ts` pronto** pra drop em `src/lib/i18n/dictionaries/en.ts`. Cobre meta, nav, hero, projects (6 items), work (bio + method + stack), principles (5 frases), contact (CTA + rotativa + fallback), fab. ~8 desvios de tradução literal documentados em `10-en-copy-final.md`

### Migração técnica (Agente 05)

- **Sequência exata de comandos npm** em `05-migration-diff.md`:
  - 5 removals (`@next/font`, `google-fonts`, `react-scroll`, etc)
  - 8 installs em ordem React 19 → Next 15 → TS → Tailwind 4 → motion/geist/lucide → ESLint 9
  - tsconfig bump pra ES2022 + `moduleResolution: bundler` + `noUncheckedIndexedAccess`
  - tailwind.config.js: **deletar**, usa `@theme` em globals.css
  - `npx @tailwindcss/upgrade` pra automação parcial

### Cleanup (Agente 06)

- **18 arquivos pra deletar (2.42 MB)** em `06-cleanup-list.md`:
  - `project-image.jpg` (2.25 MB) + `mario.gif` (235 KB)
  - 6 componentes legado (About, Project, Projects, Timeline, Technologies, AdditionalTechnologies)
  - 6 componentes a serem reconstruídos (Header, Navbar, Footer, Socials, WhatsAppButton, DarkModeButton)
  - `api/hello/route.ts`, `scrollbar.css`, `tailwind.config.js`
- 1 rename: `doce compota.png` → `doce-compota.png`
- 9 arquivos a reescrever (globals.css, layout.tsx, page.tsx, portfolio-data.ts → 6 arquivos novos, package.json, postcss.config.js, .eslintrc.json → eslint.config.mjs)

### Plano commits (Agente 07)

- **Commit #1: cleanup only** (Option A). Não bundlar com upgrade. Razão: cleanup + Next 15 + Tailwind 4 + React 19 num commit só = 2k+ linhas irreversíveis. Atomicidade vale ouro
- ~900-1100 linhas removidas, reviewable em 5-8min
- Commit #2: version bump only

### Riscos 14d (Agente 09)

**Top 3 desta semana:**
1. César sem tempo (severidade 20/25) — definir minimum shippable HOJE: Hero + Projetos + Contato. Princípios e Trabalho ficam pós-launch se aperto
2. Depoimentos atrasarem (20/25) — disparar 5 pedidos via WhatsApp HOJE, esperar pelo menos 2 retornos em 7 dias
3. Tailwind 4 + Next 15 quebrarem (já mitigado pelo Spike — agente 01 confirma GO)

**Plano B padrão recorrente:** cortar Princípios pra pós-launch, lançar minimal (Hero+Projetos+Contato), iterar

---

## 🎯 Decisões pendentes (precisa tua palavra)

### D1. Doce Compota (P0)
- (a) **Restaurar deploy** Vercel — você sobe de novo?
- (b) **Esconder do portfólio v2** (5 projetos em vez de 6)
- (c) **Substituir** por outro projeto que vou produzir

### D2. Repos deletados (Fast Cart + Barber)
- (a) **Tornar públicos** novamente
- (b) **Esconder link "Repositório"** só nesses 2 cards (deixar live URL)
- (c) **Remover ambos** do portfolio

### D3. Minimum shippable
Risco "César sem tempo" sugere cortar escopo. Opções:
- (a) **Lançar 5 seções completas** como spec v2 — 71h base, 92h com buffer
- (b) **Lançar minimal: Hero + Projetos + Contato** — corta Trabalho e Princípios pra pós-launch — 45h base, 58h com buffer
- (c) **Lançar com tudo + EN descopado pra F11** — 60h base

### D4. Foto profissional
- (a) **DIY com smartphone** seguindo brief (R$0, 1 dia)
- (b) **Fotógrafo R$300-800** (1 semana agendamento)
- (c) **Adiar** e usar placeholder com iniciais "CA"

### D5. Sequência de partida
Pode começar **hoje** (em paralelo):
- (a) Você dispara 5 mensagens de WhatsApp via templates do agente 03 (15min)
- (b) Eu disparo cleanup commit #1 do agente 07 (1h)
- (c) Spike isolado já tá validado, só falta executar migração (agente 05) — 2-3h

Faz tudo em paralelo? Quer ordem específica?

---

## 📁 Inventário de artefatos

```
docs/02-redesign/execution/
├── 00-day1-plan.md          ← este doc
├── 01-spike-validation.md   ← GO/NO-GO + lock de versões
├── 02-url-validation.md     ← 5/6 projetos OK + 3 blockers
├── 03-whatsapp-templates.md ← 3 templates + consent + objeção
├── 04-fcontent-calendar.md  ← D-7 a D-0
├── 05-migration-diff.md     ← npm commands + tsconfig
├── 06-cleanup-list.md       ← 18 deletions
├── 07-first-commit-plan.md  ← Option A
├── 08-photo-brief.md        ← DIY ou fotógrafo
├── 09-risk-register.md      ← top 10 + ações desta semana
└── 10-en-copy-final.md      ← dicionário en.ts pronto
```

Total: ~63 KB de artefatos prontos. Todos com frontmatter, todos cross-linked com spec v2.
