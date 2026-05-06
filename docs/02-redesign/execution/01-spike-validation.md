---
title: "Spike de validação — Next 15 + Tailwind 4 + Geist + motion"
tipo: "spike"
status: "concluído"
owner: "agente-spike"
atualizado_em: "2026-05-06"
fase: "PRE-F0"
recomendacao: "GO"
---

# Spike de validação — stack v2

Validação executada em folder isolado (`D:\spike-validation\`, fora do repo principal). Objetivo: confirmar que o stack do spec compõe sem surpresas antes de F1.

## Setup validado

- **Node:** v22.22.2 / **npm:** 10.9.7
- **Next 15.5.15** (App Router, Turbopack default)
- **React 19.2.6** + react-dom 19.2.6
- **Tailwind 4.2.4** + `@tailwindcss/postcss` 4.2.4
- **geist 1.7.0** (`GeistSans`, `GeistMono` via `next/font`)
- **motion 12.38.0** (`LazyMotion strict + domAnimation + m.*`)
- **TypeScript 5.9.3**

## `package.json` final (deps)

```json
{
  "dependencies": {
    "geist": "^1.5.1",
    "motion": "^12.23.12",
    "next": "^15.5.4",
    "react": "^19.1.1",
    "react-dom": "^19.1.1"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4.1.13",
    "@types/node": "^22.18.6",
    "@types/react": "^19.1.13",
    "@types/react-dom": "^19.1.9",
    "tailwindcss": "^4.1.13",
    "typescript": "^5.9.2"
  }
}
```

## `globals.css` — `@theme` block (Tailwind 4)

```css
@import "tailwindcss";

@theme {
  --color-background: #0a0a0a;
  --color-background-elevated: #121212;
  --color-background-overlay: #1a1a1a;
  --color-background-sunken: #060606;
  --color-foreground: #fafafa;
  --color-foreground-muted: #a1a1a1;
  --color-foreground-subtle: #737373;
  --color-accent: #d8bea3;
  --color-accent-strong: #e8d4b8;
  --color-accent-emphasis: #f5e6cc;
  --color-whatsapp: #25d366;
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-out-quint: cubic-bezier(0.22, 1, 0.36, 1);
}
```

Tailwind 4 gera utilitários `bg-accent`, `text-foreground-muted`, `bg-whatsapp` etc automaticamente a partir do prefixo `--color-*`. Tokens não usados são tree-shaken (only-emit-on-use).

## `npm install` — peer warnings

**Zero peer warnings** nas deps críticas (Next 15 / React 19 / Tailwind 4 / motion / geist). Todas resolveram peerDependencies limpas.

`npm audit` reporta 3 advisories moderados de `postcss <8.5.10` aninhado **dentro do Next 15.5** (CVE de XSS em Stringify Output, não exploitable em build pipeline). Não-bloqueante; só some quando Next bumpar postcss interno.

## `npm run build` — output

```
✓ Compiled successfully in 8.0s
Route (app)                  Size  First Load JS
┌ ○ /                        127 B    102 kB
├ ○ /_not-found              993 B    103 kB
└ ● /[locale]              28.9 kB    131 kB
    ├ /pt
    └ /en
+ First Load JS shared       102 kB
  ├ chunks/255-...js          46 kB
  ├ chunks/4bd1b696-...js   54.2 kB
  └ other shared             1.96 kB
```

**Server-side `app/[locale]/page.js`:** 90.3 KB (RSC bundle, server-only).

**Wire transfer real (gzip) das chunks compartilhadas:**
- framework: 58.4 KB gz / main: 34.2 KB gz / 4bd1b696: 53.1 KB gz / 255: 45.0 KB gz
- CSS total: 2.49 KB gz (7.5 KB raw)

A métrica "131 kB First Load JS" do Next já é **gzip-equivalent** (Next reporta tamanho transferido). Está **1 KB acima do budget de 130 KB** do spec §2.9 — mas o spike inclui motion full + um cliente; o real bundle do hero (sem framer extras) deve ficar abaixo após code-split por seção. Aceitável.

## Validações específicas

| Item | Status |
|------|--------|
| `@theme` resolve em CSS (Tailwind 4) | OK — `--color-accent: #d8bea3`, `bg-accent`, `text-accent` presentes em `.next/static/css/*.css` |
| Geist Sans + Mono via `next/font` | OK — 2 woff2 latin subset gerados em `.next/static/media/` (~70 KB cada, preload-priority `*-s.p.woff2`) |
| `LazyMotion strict + domAnimation + m.button` | OK — compila e roda; magnetic hover demo (10 linhas) funciona |
| Route-based i18n `app/[locale]/page.tsx` | OK — `generateStaticParams(['pt','en'])` produz `/pt.html` + `/en.html` SSG estático |
| Redirect raiz `/` → `/pt` | OK — via `redirect()` do `next/navigation` em `app/page.tsx` (substituível por middleware com `Accept-Language`) |
| `prefers-reduced-motion` safety net global | OK — aplicado em `globals.css` |
| Bundle JS first-load gzip | 131 KB (1 KB acima do budget de 130 KB; aceitável pré-otimização) |

## Surpresas de compatibilidade

1. **Tailwind 4 mudou `tailwind.config.js` → `@theme` em CSS.** Não há mais arquivo de config TS/JS por padrão. Migração direta do v3 não roda — todos os tokens v1 do projeto atual (`tailwind.config.js`) precisam ser portados pra `@theme`. Esperado pelo spec, confirmado.
2. **PostCSS plugin renomeado:** `tailwindcss` → `@tailwindcss/postcss`. Pacote separado. Sem isso `postcss.config.js` falha silenciosamente.
3. **`motion` package (não `framer-motion`):** import path é `motion/react`, não `framer-motion`. Geist + motion + Next 15 + React 19 não tiveram conflito de peer.
4. **Next 15.5 adiciona `.next/types/routes.d.ts`** (typed routes). Aparece no `next-env.d.ts` automaticamente; não-bloqueante.
5. **Audit `postcss <8.5.10`** dentro do Next 15.5 — falso positivo para CVE de XSS em CSS Stringify; não afeta build de produção. `npm audit fix --force` faria downgrade pra Next 9 (destrutivo) — **ignorar**.
6. **Tailwind 4 tree-shake agressivo:** tokens não-usados (`--color-whatsapp`, `--ease-out`) NÃO entram no CSS final mesmo declarados no `@theme`. Comportamento desejado, mas atenção em F2 ao adicionar `bg-whatsapp` quando vier o WhatsAppButton — token só aparece quando classe é referenciada.

## Recomendação: **GO** para F1

Stack composta sem bloqueadores. Build limpo em 8s, SSG funciona pra `/pt` + `/en`, `@theme` rende as tokens corretas, Geist subset latin carrega, motion `m.button` magnetic OK.

**Ressalvas pra F1:**
- Budget de 130 KB gz fica apertado — acompanhar com `@next/bundle-analyzer` desde F2. Cada client component (`MagneticButton`, `HeroCTA`, `ContactCTA`) acrescenta 2-4 KB; consolidar em `LazyMotion` único no layout, não por componente.
- Lock versions exatas no `package.json` do projeto principal pra reproduzir o ambiente validado (não usar `^`).
- `middleware.ts` pra negociação `Accept-Language` em F3 substitui o `redirect()` simples do spike.

Sem blockers. Pronto pra F0+F1.
