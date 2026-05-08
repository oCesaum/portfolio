---
title: "Estado atual do portfólio (auditoria pré-redesign)"
tipo: "inventario"
status: "ativo"
owner: "César Augusto"
atualizado_em: "2026-05-06"
---

# Estado atual do portfólio — auditoria pré-redesign

Documento descritivo do portfólio antes de qualquer alteração estrutural. Serve como linha de base para o próximo redesign.

Branch capturada: `codex/stitch-portfolio-phase-2`. Último commit: `55ad05e refactor(portfolio): align layout with stitch reference`.

---

## 1. Stack e dependências

### 1.1 Runtime

- Next.js **13.4.12** (App Router)
- React **18.2.0** / React DOM 18.2.0
- TypeScript **5.1.6**
- Tailwind CSS **3.3.3** com `darkMode: "class"`
- PostCSS 8.4.27 + Autoprefixer 10.4.14
- ESLint 8.45.0 + `eslint-config-next` 13.4.12
- Prettier 3.0.0 + `prettier-plugin-tailwindcss` 0.4.1

### 1.2 Bibliotecas de UI

- `lucide-react@0.263.1` — sistema de ícones (única lib visual)
- `react-scroll@1.8.9` — rolagem suave por âncoras (Navbar)
- `@next/font@13.4.12` — fontes Google (Fraunces + Manrope)
- `google-fonts@1.0.0` — pacote npm declarado, **sem uso real no código**

### 1.3 Bibliotecas ausentes (apesar do estilo "premium" pretendido)

- Sem `framer-motion`, `gsap`, `motion`, `@react-spring/*`, `lenis`, `@formkit/auto-animate`
- Sem `clsx`/`cva`/`tailwind-merge` (composição de classe é manual)
- Sem `zod`, `react-hook-form`, `@vercel/analytics`, `@vercel/speed-insights`
- Sem suite de testes (`vitest`, `playwright`, `jest`, `@testing-library/*`)

### 1.4 Configurações relevantes

- `tsconfig.json#target` = `es5` — anacrônico para Next 13 (defaults modernos sugerem `es2017+`)
- `tsconfig.json#paths` = `@/* → ./src/*`
- `next.config.js` vazio — sem `images.remotePatterns`, sem headers de segurança, sem `experimental.optimizePackageImports`, sem `i18n`
- `.eslintrc.json` apenas estende `next/core-web-vitals`
- Sem hook de Husky/lint-staged, sem CI, sem GitHub Actions

---

## 2. Estrutura de diretórios

```
portfolio/
├── .cursor/                       # Configuração Cursor (local)
├── .vscode/                       # Configuração VS Code
├── docs/                          # Documentação canônica (00-hub, 01-inventario, 04-governanca, 05-templates, 90-arquivo)
├── public/                        # 8 assets (7 imagens + 1 GIF não usado)
├── src/
│   ├── app/
│   │   ├── api/hello/route.ts     # Endpoint de teste (GET → "Hello, Next.js!")
│   │   ├── globals.css            # 562 linhas — design tokens + classes utilitárias
│   │   ├── scrollbar.css          # Estilo de scrollbar (tema claro hardcoded)
│   │   ├── layout.tsx             # Root layout + Meta Pixel
│   │   └── page.tsx               # Homepage única (424 linhas inline)
│   ├── components/                # 11 componentes — 6 NÃO usados pelo page.tsx
│   ├── types/                     # Vazio
│   └── utils/portfolio-data.ts    # Conteúdo centralizado (191 linhas)
├── AGENTS.md                      # Regras de workspace (não versionado)
├── README.md                      # README mínimo (35 linhas)
├── next.config.js                 # Vazio
├── tailwind.config.js             # Animações custom + gradientes
├── postcss.config.js
├── tsconfig.json
└── package.json                   # 14 dependências, 3 devDependencies
```

---

## 3. Rotas

| Path | Arquivo | Função |
|------|---------|--------|
| `/` | `src/app/page.tsx` | Homepage de página única (server component) |
| `/api/hello` | `src/app/api/hello/route.ts` | Endpoint trivial sem uso real |

**Rotas ausentes:** sem `not-found.tsx`, `error.tsx`, `loading.tsx`, `robots.ts`, `sitemap.ts`, `manifest.ts`, `icon.tsx`, `opengraph-image.tsx`.

---

## 4. Componentes — inventário completo

| Arquivo | Tipo | Status | Observação |
|---------|------|--------|------------|
| `Header.tsx` | server | **EM USO** | Sticky top, logo "Architect.dev" + nome, Navbar + Socials responsivos |
| `Footer.tsx` | server | **EM USO** | Copyright + Socials (variant footer) |
| `Navbar.tsx` | client | **EM USO** | `react-scroll` + drawer mobile + DarkModeButton |
| `Socials.tsx` | server | **EM USO** | Props `componentType: "header"\|"footer"` (variantes idênticas no código) |
| `DarkModeButton.tsx` | client | **EM USO (sem efeito)** | Toggle adiciona `.dark` ao `<html>`, mas vars em `:root` e `html.dark` são idênticas — toggle não muda nada visível |
| `WhatsAppButton.tsx` | client | **EM USO** | Botão flutuante canto inferior direito |
| `Project.tsx` | server | **NÃO USADO** | Card antigo com hover blur — substituído por classes inline em page.tsx |
| `Projects.tsx` | server | **NÃO USADO** | Grade antiga com array duplicado de projetos |
| `About.tsx` | server | **NÃO USADO** | Bloco de bio antigo |
| `Timeline.tsx` | server | **NÃO USADO** | Linha do tempo 2002–2023 |
| `Technologies.tsx` | server | **NÃO USADO** | Pôster com 9 SVGs inline |
| `AdditionalTechnologiesAndSkills.tsx` | server | **NÃO USADO** | Lista de skills auxiliares |

**6 componentes órfãos (legado).** Custo zero em runtime (tree-shaken pelo Next), mas sujam `git grep`, exemplos para IA e mental model do dev.

---

## 5. Estrutura da homepage (`src/app/page.tsx`)

A página é uma única função `Home()` server-side que renderiza tudo via classes CSS de `globals.css`. Estrutura por seção:

| `id` | Bloco | Conteúdo |
|------|-------|----------|
| `home` | Hero | Eyebrow "Full-stack engineer", título "Engenharia de precisao para experiencias digitais.", parágrafos `summary + intro`, CTAs "Ver projetos" e "Entrar em contato", lateral "tech-poster" com forma azul rotacionada e legenda "Technical / Portfólio profissional", strip de stats "10+ tecnologias" + 5 itens da `techStack` |
| `projects` | Vitrine | Eyebrow "Portfólio", título "Projetos em destaque", nota lateral. Grid 2 colunas: 1 destaque (`featured: true` → DOM Comparator) + 2 compactos. Lista vertical com os 3 restantes |
| `about` | Sobre | Eyebrow "Sobre mim", título "Engenharia com proposito.", 3 parágrafos de `portfolioData.about`, badge "Solucoes web com foco em clareza e execucao", painel lateral "portrait-panel" com plate "Profile review / César Augusto" |
| (subseção) | Trajetória | Subtítulo "Recortes da atuação" + 3 cards `info-panel` (highlights) |
| `expertise` | Especialidades | Subtítulo "Areas de especialidade" + 3 `focus-card` (focusAreas) |
| `stack` | Stack | Subtítulo "Tecnologias e ferramentas" + grid `tech-grid` (9 tecnologias como tags) |
| (subseção) | Filosofia | Subtítulo "Filosofia de trabalho" + grid `principles-panel` (3 princípios) |
| `contact` | Contato | Eyebrow "Contato", título "Vamos construir algo extraordinario?", 4 contact cards (email/linkedin/github/whatsapp), painel lateral com `/project-image.jpg` + CTAs Email + LinkedIn |

### 5.1 Inconsistências detectadas no copy

- Título hero: `Engenharia de precisao` (sem cedilha/til) — provável artefato de encoding
- Título sobre: `Engenharia com proposito.`
- Badge: `Solucoes web com foco em clareza e execucao`
- Título contato: `Vamos construir algo extraordinario?`
- Parágrafo contato: `tecnicos e estrategicos`

Seis ocorrências de palavras sem acentos coexistindo com texto acentuado. Indica edição manual com fonte/teclado errado (provavelmente colado de outro IDE) — não é decisão de design.

### 5.2 Identidades concorrentes na página

| Local | Identidade exibida |
|-------|--------------------|
| Header | "Architect.dev" + "César Augusto" |
| Hero eyebrow | "Full-stack engineer" |
| `portfolioData.profile.role` | "Desenvolvedor Full-stack" |
| Portrait plate | "Profile review / César Augusto" |
| Hero copy | "desenvolvedor full-stack..." |
| Footer | "César Augusto" + "Portfólio refinado..." |

Seis posicionamentos diferentes (mesmo que sinônimos). Sem "tagline" autoral única.

---

## 6. Sistema de design (`globals.css`)

### 6.1 Tokens CSS (562 linhas, ~50 classes utilitárias)

```css
:root {
  --background:        #0c0d11;
  --background-soft:   #121419;
  --panel:             #14161c;
  --panel-alt:         #171a21;
  --line:              rgba(255,255,255,0.08);
  --foreground:        #f3f3f1;
  --foreground-soft:   #bbb9b2;
  --muted-foreground:  #8c8b87;
  --accent:            #9db7ff;   /* azul cornflower */
  --accent-strong:     #b8c9ff;
  --accent-warm:       #c49a68;   /* tan */
}
```

`html.dark` redefine os mesmos tokens com valores **idênticos**. Toggle de tema é cosmético — sem efeito visual.

### 6.2 Tipografia

- Carregadas: **Fraunces** (`--font-display`) + **Manrope** (`--font-sans`)
- **Aplicadas:** apenas Manrope. `.hero-title`, `.frame-title`, `.subsection-title` declaram `font-family: var(--font-sans), sans-serif` — Fraunces é carregada mas nunca usada
- Escala:
  - `hero-title`: `clamp(2.6rem, 6vw, 4.6rem)` peso 800 letter-spacing -0.05em
  - `frame-title`: `clamp(2rem, 3vw, 3.35rem)` peso 800
  - `subsection-title`: `1.65rem` peso 800
  - `micro-label`: `0.66rem` peso 600 letter-spacing 0.28em uppercase, cor `--accent-warm`
  - `micro-pill`: `0.62rem` peso 700 letter-spacing 0.12em uppercase
  - Body: `--foreground-soft` line-height 1.8

### 6.3 Componentes-chave (classes CSS)

`portfolio-shell`, `page-wrap`, `main-frame` (wrapper externo com border + backdrop-blur 18px + box-shadow), `frame-section`, `frame-hero`, `primary-button`, `secondary-button`, `text-link`, `project-card`, `project-card--featured`, `project-card--compact`, `project-row`, `info-panel`, `focus-card`, `tech-grid`, `principles-panel`, `contact-grid`, `portrait-panel`, `stats-strip`, `tech-poster`, `hero-visual-card`, `content-divider`, `section-topline`.

### 6.4 Background

```css
body {
  background:
    radial-gradient(circle at top center, rgba(157,183,255,0.08), transparent 28%),
    linear-gradient(180deg, #090a0d, #0d1015 50%, #090a0d);
}
.app-shell::before {  /* grid de pontos 24x24 sobre tudo */
  background-image:
    linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
  opacity: 0.28;
}
```

Background fixado em paleta escura — independe da var `--background` (token nunca aplicado ao body).

### 6.5 Animação

Tailwind `theme.extend.animation`:
- `rotate: rotate .5s linear` — usada em `DarkModeButton.tsx:44,46`
- `horizontal-move: translateX(-120%) 15s linear infinite` — **declarada, nunca referenciada**
- `background-pan: shift de background 3s linear infinite` — **declarada, nunca referenciada**

Microinterações reais: hover translateY(-2px) no WhatsApp, hover scale 1.25 + blur (Project legado), drawer mobile (opacity + translate-y), botões (transition 200ms ease).

**Não há scroll-driven animations, parallax, reveal-on-view, motion path, spring physics ou shaders.** Visualmente estático.

---

## 7. Conteúdo (`src/utils/portfolio-data.ts`)

Objeto `portfolioData` (191 linhas) e `navigationItems` (6 âncoras).

| Chave | Tipo | Tamanho | Em uso? |
|-------|------|---------|---------|
| `profile` | objeto | name, role, location, summary, intro, email, whatsapp | **Sim** |
| `highlights` | array | 3 itens (Projetos publicados, Base de atuação, Foco atual) | **Sim** |
| `expertise` | array | 3 itens | **NÃO** (página usa `focusAreas`) |
| `focusAreas` | array | 3 itens (Arquitetura, Back-end, UX/UI) | **Sim** |
| `principles` | array | 3 strings | **Sim** |
| `projects` | array | 6 projetos com `featured: true` em DOM Comparator | **Sim** |
| `contactCards` | array | 4 itens | **Sim** |
| `techStack` | array | 9 strings (Node.js, TypeScript, React, Next.js, PHP, WordPress, JavaScript, Supabase, MySQL) | **Sim** |
| `additionalSkills` | array | 7 strings | **NÃO** |
| `about` | array | 3 parágrafos | **Sim** |
| `socials` | objeto | github/linkedin/instagram/whatsappMessage | **Sim** |

### 7.1 Projetos cadastrados

| # | Nome | URL ao vivo | Tags | Destaque |
|---|------|-------------|------|----------|
| 1 | DOM Comparator Universal | dom-comparator.vercel.app | Next.js, TypeScript, Automação, Tema | **Sim** |
| 2 | Doce Compota | docecompota.com.br | Landing page, HTML, CSS, JS | Não |
| 3 | Fast Cart Landing Page | fast-cart-landing-page.vercel.app | Produto digital, Landing page, Conversão | Não |
| 4 | Tailwind Spotify | tailwind-spotify-phi.vercel.app | Next.js, Tailwind, UI | Não |
| 5 | Barber Landing Page | barber-landing-page-theta.vercel.app | Landing page, Serviços, Responsivo | Não |
| 6 | Calculadora Taxa de Gravidade | calculadora-hht.vercel.app | Ferramenta web, Produtividade | Não |

Todos 6 com repositório público em `github.com/oCesaum/*`.

### 7.2 Duplicação detectada

`src/components/Projects.tsx:20–69` mantém um **segundo array** de projetos hardcoded (não usado, mas com descrições levemente diferentes das de `portfolio-data.ts`). Risco de drift se algum dev "atualizar" no lugar errado.

---

## 8. Assets em `/public`

| Arquivo | Tamanho | Uso |
|---------|---------|-----|
| `barber.png` | 615 KB | Projeto Barber |
| `calculadora-taxa-gravidade.png` | 403 KB | Projeto Calculadora |
| `dom-comparator.png` | 481 KB | Projeto DOM Comparator |
| `doce compota.png` | **1.32 MB** + nome com espaço | Projeto Doce Compota |
| `fast-cart.png` | 148 KB | Projeto Fast Cart |
| `tailwind-spotify.png` | 346 KB | Projeto Tailwind Spotify |
| `project-image.jpg` | **2.20 MB** | Card lateral de contato |
| `mario.gif` | 230 KB | **NÃO USADO** |

**Custos:** ~5.5 MB de imagens, todas servidas sem otimização explícita (`next.config.js` sem `images` config). `next/image` faz lazy + WebP/AVIF on-demand, mas falta `sizes` em vários `<Image>`. Nome `doce compota.png` com espaço é problemático para CDN/cache.

---

## 9. Integrações externas

### 9.1 Tracking

- **Meta (Facebook) Pixel** ID `2062041987533580` em `src/app/layout.tsx:32–57`
  - Hardcoded sem env var
  - Sem consentimento (LGPD): pixel dispara `PageView` no `afterInteractive` sem opt-in
  - Sem `<script>` para Google Analytics, Vercel Analytics, PostHog, etc.

### 9.2 Comunicação

- **WhatsApp**: deep link `wa.me/5531987373513` com mensagem pré-preenchida
- **Email**: `mailto:contato@cesaraugusto.dev`
- **Sem formulário de contato** (sem server action, sem API route, sem reCAPTCHA, sem antispam)

### 9.3 Redes

- GitHub: `github.com/oCesaum`
- LinkedIn: `linkedin.com/in/cesar-augusto-pinho`
- Instagram: `instagram.com/csr_pinho`

---

## 10. SEO e metadata

`src/app/layout.tsx` exporta apenas:

```ts
metadata = {
  title: "Portfólio | César Augusto",
  description: "Portfólio de César Augusto, desenvolvedor full-stack..."
}
```

**Ausente:**
- `metadataBase` (URL canônica)
- `openGraph` (image, title, description, type, locale)
- `twitter` (card, image, creator)
- `icons` (favicon, apple-touch, manifest)
- `alternates.canonical`
- `keywords`, `authors`, `creator`, `publisher`
- `robots` (apesar de não haver bloqueio)
- `verification` (Google Search Console)
- `themeColor`, `colorScheme`
- Schema.org JSON-LD (`Person`, `WebSite`)
- `<link rel="preconnect">` para Google Fonts (Next/font cuida, mas não há para Meta Pixel)

**Sem `sitemap.ts`, sem `robots.ts`, sem `opengraph-image.tsx`.** O site é tecnicamente indexável mas invisível para social sharing.

---

## 11. Acessibilidade

| Item | Estado |
|------|--------|
| `<html lang="pt-BR">` | OK |
| `aria-label` em CTAs/botões | Parcial (Socials e DarkModeButton têm; Header não tem `<nav aria-label>`) |
| Contraste de cor | `--foreground-soft #bbb9b2` sobre `--background #0c0d11` ≈ 8.8:1 — **OK**. Mas `--muted-foreground #8c8b87` sobre `#0c0d11` ≈ 5.2:1 — **borderline para texto pequeno (<14px)** usado em `.stats-list__item` e `.tech-grid__item` |
| Foco visível | Sem `:focus-visible` custom — depende do default do browser |
| Skip link | Ausente |
| Landmarks | `<main>`, `<header>`, `<footer>` presentes; falta `<section aria-labelledby>` |
| `prefers-reduced-motion` | Não respeitado em `animate-rotate` |
| Tamanhos clicáveis | OK em geral; `text-link` (12px uppercase) é pequeno para mobile |
| Imagens decorativas | `tech-poster__shape` é `<div>` sem semântica — OK; `project-image.jpg` no contato tem alt `"Estação de trabalho"` adequado |
| `<noscript>` | Tem (apenas para fallback do pixel) |

---

## 12. Performance — riscos identificados

- `project-image.jpg` 2.2 MB sem `priority` nem `sizes` — single LCP candidate
- 6 imagens PNG totalizando ~3.3 MB — Next/Image converte sob demanda mas servir WebP/AVIF pré-gerado seria mais previsível
- `<Image>` sem `placeholder="blur"` em projetos (só legado `Project.tsx` usava)
- `src/app/page.tsx` é server component com 424 linhas inline — viável, mas dificulta manutenção e refactor
- `backdrop-filter: blur(18px)` em `.main-frame` é caro em mobile
- Sem prefetch explícito, sem PWA, sem cache headers customizados

---

## 13. Segurança

- Pixel hardcoded sem cookie banner / opt-in (risco LGPD se servir UE/BR rastreável)
- Email exposto em texto puro (`mailto:contato@cesaraugusto.dev`)
- WhatsApp em URL pública (esperado)
- Sem CSP (`next.config.js` vazio)
- Sem rate limit (não há endpoints sensíveis)
- Sem `Strict-Transport-Security`, `X-Frame-Options`, `X-Content-Type-Options` definidos no app

---

## 14. Estado da documentação canônica

| Doc | Status | Observação |
|-----|--------|------------|
| `docs/README.md` | ativo | Aponta para hub |
| `docs/00-hub/documentacao-hub.md` | ativo | Frontmatter ok |
| `docs/01-inventario/inventario-do-projeto.md` | ativo | Stack alto-nível, sem profundidade |
| `docs/04-governanca/governanca-documental.md` | ativo | Política e padrões |
| `docs/05-templates/*.md` | ativo | 5 templates (ADR, changelog, plano, runbook, segurança) — **nenhum preenchido ainda** |
| `docs/90-arquivo/README.md` | ativo | Arquivo histórico vazio |

---

## 15. Histórico recente (últimos 5 commits)

```
55ad05e refactor(portfolio): align layout with stitch reference
e231e0a feat(portfolio): redesign premium home experience
a6701c9 docs(governance): add canonical docs base
52c74aa Update package-lock.json + page/Timeline shift to 'Full-stack'
f57ea6f Enhance WhatsAppButton component
```

A versão atual é resultado de duas rodadas consecutivas de redesign baseadas em referência do Stitch (Google) — daí o branch `codex/stitch-portfolio-phase-2`. Os componentes legados (Project/Projects/About/Timeline/Technologies) são da fase anterior e ainda não foram removidos.

---

## 16. Resumo executivo dos pontos críticos

| Severidade | Item |
|------------|------|
| **Alto** | DarkModeButton não funcional (vars idênticas em :root e .dark) |
| **Alto** | SEO praticamente ausente (sem OpenGraph, sitemap, robots, ícones) |
| **Alto** | Pixel Meta sem env var e sem consentimento (LGPD) |
| **Médio** | 6 componentes legado não usados sujando `src/components/` |
| **Médio** | `expertise` e `additionalSkills` declarados mas não consumidos |
| **Médio** | Fraunces carregada mas nunca aplicada (latência sem retorno visual) |
| **Médio** | Texto sem acentuação em hero/about/contato (artefato de encoding) |
| **Médio** | Identidade fragmentada (6 títulos diferentes para o mesmo profissional) |
| **Médio** | `project-image.jpg` 2.2 MB sem `priority`/`sizes` |
| **Médio** | Sem testes, sem CI, sem error boundary, sem 404 |
| **Baixo** | Tailwind keyframes `horizontal-move` e `background-pan` declaradas e nunca usadas |
| **Baixo** | `tsconfig.target = es5` |
| **Baixo** | `Projects.tsx` legado tem array duplicado de projetos |
| **Baixo** | `mario.gif` em `/public` sem uso |
| **Baixo** | `doce compota.png` com espaço no nome |
| **Baixo** | `/api/hello` sem propósito |

---

## 17. Pontos fortes a preservar

- **Conteúdo único centralizado** em `portfolio-data.ts` (boa decisão arquitetural)
- **Design tokens via CSS variables** (boa base para tematização real)
- **Paleta tonal coerente** (azul cornflower #9db7ff + bege quente #c49a68 sobre carvão)
- **Tipografia bem dimensionada** com `clamp()` (funciona em mobile e desktop)
- **Hierarquia visual clara** por seção (eyebrow → título → corpo → ações)
- **WhatsApp + Email + LinkedIn** como triplo canal de contato direto
- **6 projetos reais publicados** com URL ao vivo + repo
- **Stack declarada coerente com projetos entregues** (não há "TypeScript" sem TypeScript)
- **Documentação canônica em `docs/`** já estruturada com governança

---

## 18. Próximos passos sugeridos (não executados)

Lista do que o redesign pode atacar — discutir antes de implementar:

1. Decidir identidade única e tagline autoral (encerra fragmentação)
2. Resolver tema dark/light de verdade ou remover o toggle
3. Aplicar Fraunces como display real ou remover do bundle
4. Implementar SEO completo (metadata, OG image, sitemap, robots)
5. Adicionar `framer-motion` ou TSL para microinterações reais
6. Limpar componentes legado e dados não usados
7. Otimizar imagens (compressão, renomear `doce compota.png`, gerar OG)
8. Migrar pixel Meta para env var + cookie consent
9. Adicionar `not-found.tsx`, `error.tsx`, `loading.tsx`
10. Definir métricas mensuráveis (Lighthouse target, contraste WCAG AA, CLS, LCP)

Cada item deve virar uma fase com escopo, decisões de produto e contrato de execução claros antes de qualquer alteração.
