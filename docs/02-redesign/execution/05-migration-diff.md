---
title: "Portfolio v2 — migration diff (deps + config)"
tipo: "execucao"
status: "ativo"
owner: "agente-migration"
atualizado_em: "2026-05-06"
versao: "1.0"
referencia: "portfolio-redesign-spec.md §0, §1.3, §1.5, §2.4"
---

# 05 — Migration diff: 13.4/18/Tailwind 3 → 15/19/Tailwind 4

Plano executável para o passo F0+F1 do roadmap (spec §8.1). Roda em branch `chore/upgrade-stack`, commit por bloco.

---

## 1. Removal commands

```bash
npm uninstall @next/font google-fonts react-scroll @types/react-scroll
```

Razões:
- `@next/font` foi absorvido por `next/font` em Next 13.2; mantê-lo é dead-weight.
- `google-fonts` (1.0.0) é pacote abandonado, sem uso (Geist via `next/font`).
- `react-scroll` dropado por B2 — substituído por `scroll-behavior: smooth` nativo + `scroll-margin-top`.
- `@types/react-scroll` cai junto.

---

## 2. Install commands (ordem importa)

```bash
# 2.1 — React 19 primeiro (peer de Next 15)
npm install react@^19.0.0 react-dom@^19.0.0
npm install -D @types/react@^19.0.0 @types/react-dom@^19.0.0

# 2.2 — Next 15 + ESLint config oficial
npm install next@^15.0.0
npm install -D eslint-config-next@^15.0.0

# 2.3 — TypeScript 5.x atual
npm install -D typescript@^5.6.0

# 2.4 — Tailwind 4 (PostCSS plugin separado é obrigatório)
npm install -D tailwindcss@^4.0.0 @tailwindcss/postcss@^4.0.0 postcss@^8.4.47 autoprefixer@^10.4.20

# 2.5 — Motion + Geist + lucide bump
npm install motion@latest geist@^1.3.1 lucide-react@^0.460.0

# 2.6 — ESLint 9 flat config
npm install -D eslint@^9.0.0

# 2.7 — Prettier mantém, plugin Tailwind precisa bump pra v4
npm install -D prettier@^3.3.0 prettier-plugin-tailwindcss@^0.6.0
```

Após cada bloco rodar `npm ls` — abortar se peer warning crítico. `--legacy-peer-deps` **proibido** (mascara incompatibilidade real).

---

## 3. Final `package.json`

```json
{
  "dependencies": {
    "geist": "^1.3.1",
    "lucide-react": "^0.460.0",
    "motion": "^11.11.0",
    "next": "^15.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4.0.0",
    "@types/node": "^20.4.4",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "autoprefixer": "^10.4.20",
    "eslint": "^9.0.0",
    "eslint-config-next": "^15.0.0",
    "postcss": "^8.4.47",
    "prettier": "^3.3.0",
    "prettier-plugin-tailwindcss": "^0.6.0",
    "tailwindcss": "^4.0.0",
    "typescript": "^5.6.0"
  }
}
```

> `@types/node` e `autoprefixer` movidos pra `devDependencies` (nunca foram runtime). `motion` ranged em `^11` pra travar major (12 ainda incerto em maio/2026).

---

## 4. `postcss.config.js`

Tailwind 4 trocou o plugin. Substituir por:

```js
module.exports = {
  plugins: {
    "@tailwindcss/postcss": {},
    autoprefixer: {},
  },
};
```

(Antes era `tailwindcss: {}`.)

---

## 5. `tailwind.config.js` — **deletar**

Tailwind 4 deprecou JS config. Tokens v2 (paleta, type scale, easings, radius — spec §1.2/1.3/1.7/1.8) ficam em `src/app/globals.css` via `@theme`:

```css
@import "tailwindcss";

@theme {
  --color-background: #0a0a0a;
  --color-accent: #d8bea3;
  --font-sans: var(--font-geist-sans);
  /* ... */
}
```

Único motivo pra **manter** um `tailwind.config.ts` mínimo: precisar de `content` glob custom ou plugins JS legacy. Nenhum dos dois aplica aqui — **deletar o arquivo**.

---

## 6. `tsconfig.json` updates

Diff completo:

```diff
{
  "compilerOptions": {
-   "target": "es5",
-   "lib": ["dom", "dom.iterable", "esnext"],
+   "target": "ES2022",
+   "lib": ["dom", "dom.iterable", "ES2022"],
+   "moduleResolution": "bundler",
+   "verbatimModuleSyntax": true,
+   "noUncheckedIndexedAccess": true,
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
-   "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./src/*"] }
  }
}
```

`ES2022` (não `ES2017`): suporta `Object.hasOwn`, top-level `await`, `.at()`. Next 15 pede mínimo ES2022 internamente. `bundler` resolution é o recomendado pelo time TS pra Next/Vite.

---

## 7. Breaking changes — top 5 red flags

1. **`react-scroll` imports quebram tudo.** Procurar `from "react-scroll"` em `src/` — substituir `<Link to="hero">` por `<a href="#hero">` + `scroll-margin-top: 80px` no destino (spec §1.5).
2. **`next/router` morto em App Router.** Qualquer `useRouter` de `next/router` migra pra `next/navigation` (`useRouter`, `usePathname`, `useSearchParams`). API diferente — `router.query` não existe.
3. **Async dynamic APIs (Next 15).** `cookies()`, `headers()`, `params`, `searchParams` agora retornam `Promise`. Ver spec §2.7 — `generateMetadata` já tipa `params: Promise<{ locale: string }>`.
4. **React 19 ref como prop.** `forwardRef` é desnecessário; `ref` agora é prop normal. Componentes terceiros que ainda usam `forwardRef` continuam OK, mas TS pode reclamar de tipos `LegacyRef`. Bibliotecas não-React-19-ready (radix < v2, etc.) podem warnar.
5. **Tailwind 4 quebra `@apply` de classes não-builtin + drop de `theme()`.** Qualquer `@apply text-foreground-muted` que dependia de config JS precisa virar `var(--color-foreground-muted)` direto. Rodar `npx @tailwindcss/upgrade` no projeto pra automatizar parte.

Bônus #6: ESLint 9 flat config usa `eslint.config.mjs`, não `.eslintrc.json`. `eslint-config-next@15` exporta flat-compatível.

---

## 8. Verification commands

```bash
# Sanidade básica
npm ls react react-dom next     # esperar 19.x e 15.x sem dupes
npx next info                   # versão Next + Node + plataforma
npx tsc --noEmit                # type-check sem build

# Build real
rm -rf .next
npm run build                   # esperar 0 erros, ver bundle first-load
npm run start                   # smoke test produção em localhost:3000

# Lighthouse local (gate spec §2.9)
npx lighthouse http://localhost:3000/pt --view --preset=desktop

# Bundle analyzer (spec §2.9 budget < 130 KB gzip)
ANALYZE=true npm run build      # com @next/bundle-analyzer plugado em F2
```

Critério de aceite F0+F1: `npm run build` verde + `npx tsc --noEmit` verde + bundle home < 130 KB gzip + zero peer-warning crítico em `npm ls`. Falhou qualquer um → não merger, debugar antes de F2.
