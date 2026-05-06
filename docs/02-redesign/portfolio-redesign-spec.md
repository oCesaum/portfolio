---
title: "Portfolio v2 — spec de redesign (consolidado pós-review)"
tipo: "spec"
status: "ativo"
owner: "César Augusto"
atualizado_em: "2026-05-06"
versao: "2.0"
substitui: "v1.0 (rascunho inicial)"
---

# Portfolio v2 — spec de redesign

Documento canônico para reconstrução do portfólio. Versão 2 incorpora decisões de 10 reviews paralelos (`docs/02-redesign/reviews/00-consolidated-changes.md`).

---

## −1. Changelog v1 → v2

### Mudanças aplicadas

**Bloco A — bugs críticos (10 fixes):**
- A1 Token `--foreground-subtle` reclassificado: só borders/dividers (contraste 2.53:1 falha AA pra texto)
- A2 Texto preto em CTA WhatsApp verde (antes branco — falhava 2.85:1)
- A3 Padrão `:focus-visible` double-ring (funciona em qualquer fundo)
- A4 Safety net global pra `prefers-reduced-motion` em `globals.css`
- A6 Locale resolvido server-side via prop (sem ler cookie no client render) — moot por A7
- A7 i18n migrado pra route-based (resolve hidratação + Vary + crawler blindness)
- A8 Animações GPU-only (sem `box-shadow`/`width`/`padding`/`filter`)
- A9 `aspect-ratio` obrigatório em toda imagem
- A10 Magnetic CTA hero raio 150px (era 100px)

**Bloco B — decisões de produto (10 decisões aplicadas):**
- B1 i18n: **route-based `/pt`, `/en`** (descartando cookie + URL única)
- B2 Lenis: **dropado** — usa `scroll-behavior: smooth` nativo + rAF dedicado pra parallax
- B3 Accent: `#d4b896` → **`#d8bea3`** (matiz +5° pra coral-bege, +0.6:1 contraste)
- B4 **Bloco "Princípios"** adicionado entre Sobre e Contato (manifesto curto primeira pessoa)
- B5 Hero e Contato com **layouts assimétricos** (grid 12-col, eyebrow lateral)
- B6 Foto: drop grayscale-to-color, **split-tone editorial** sempre colorida com grão
- B7 Indicador "24/7" → **"Aceitando 2 projetos este trimestre"** (escassez real)
- B8 CTA contato: **duas-camadas tipográficas** com mono rotativo (não pílula verde gigante)
- B9 "Sobre" → **"Como trabalho"** (PT) / **"How I work"** (EN)
- B10 **Depoimentos em MVP**, não pós-launch (track F-Content paralelo)

**Bloco C — refinos médios (34 itens):** type scale corrigido (perfect-fourth + minor-third), letter-spacing Geist-tuned, novo token `--background-sunken`, escala radius expandida, escala border tripla, easing par, aurora drift, breathing eyebrows, section-number tick, cursor blink no hero, focus-ring choreography, dropping shimmer §5.6, parallax via rAF dedicado, 8 melhorias de copy, pre-F0 spike, lucide bump, motion-dom drop, phase reorder.

Detalhes em `reviews/00-consolidated-changes.md`.

---

## 0. Decisões travadas (Q1–Q9 + Bloco B)

| Eixo | Decisão | Fonte |
|------|---------|-------|
| Objetivo primário | Captação de freela / contrato | Q1=B |
| Público-alvo | Cliente não-técnico (resultado) + agência/dev terceirizando (capacidade) | Q2=C+D |
| **ICP travado (Meta-1)** | **Primary: Founder BR cedo + lean teams · Secondary: International remote (Y2 upside)** | Tally 10 agentes ICP |
| **ICP statement** | "Trabalho com founders e times pequenos que precisam tirar um produto web do briefing pro deploy — sem virar refém de agência, sem perder mês em reunião." | Synth A10 |
| Identidade | "Full-stack focado em produtos web claros" | Q3=A |
| Estética | Premium minimalista (referência: linear.app, vercel.com) | Q4=A |
| Stack | Next.js 15 + Tailwind CSS 4 + `motion` + native scroll (sem Lenis) | Q5=C / B2 |
| Idioma | PT-BR principal + EN. **Route-based `/pt`, `/en`** | Q6=B / B1 |
| Pricing | Não exibir (caso a caso) | Q7 |
| Disponibilidade | "Aceitando 2 projetos este trimestre" + "Resposta em até 24h" | Q7 / B7 |
| Foto profissional | Disponível, tratamento split-tone editorial | Q7 / B6 |
| Depoimentos | **MVP obrigatório** ≥ 2 antes do deploy | Q7 / B10 |
| Case studies | Pós-MVP. Cards apontam pra URL pública por enquanto | Q7 |
| Métricas verificáveis | Não usar números inventados | Q7 |
| Canal de captação | WhatsApp único (sem form, sem cal, sem email) | Q8 |
| Seções | Hero · Projetos · **Como trabalho** · **Princípios** · Contato | Q9 + B4 + B9 |

---

## 1. Bloco 3 — Fundamentos visuais

### 1.1. Marca / logo

Wordmark "César Augusto" em Geist 600 + linha inferior `Full-stack engineer` em Geist Mono 11px tracking 0.14em uppercase, cor `--foreground-muted`.

Sem mark gráfico, sem ícone. Favicon: letra "c" minúscula em Geist 700 sobre `--background`.

### 1.2. Paleta

```css
:root {
  /* superfícies — 4 níveis com delta L* perceptível */
  --background:           #0a0a0a;   /* base */
  --background-elevated:  #121212;   /* cards, painéis */
  --background-overlay:   #1a1a1a;   /* hover/active de superfície */
  --background-sunken:    #060606;   /* poços/inputs, profundidade negativa */

  /* texto */
  --foreground:           #fafafa;   /* primário, AAA */
  --foreground-muted:     #a1a1a1;   /* corpo secundário, AAA */
  --foreground-subtle:    #737373;   /* labels >= 14px bold, AA */

  /* linhas — escala tripla */
  --border-1:             rgba(255, 255, 255, 0.06);   /* divisores estruturais */
  --border-2:             rgba(255, 255, 255, 0.12);   /* cards default */
  --border-3:             rgba(255, 255, 255, 0.20);   /* hover/focus */

  /* accent — único, quente, recalibrado */
  --accent:               #d8bea3;   /* base — coral-bege, escapa de "sépia" */
  --accent-strong:        #e8d4b8;   /* hover/active */
  --accent-emphasis:      #f5e6cc;   /* alta importância */

  /* utilitários */
  --whatsapp:             #25d366;   /* SOMENTE no botão flutuante e no ícone do CTA */
}
```

**Regras:**
- 1 accent só. Verde do WhatsApp não circula pelo resto da paleta.
- `--foreground-subtle #737373` (NÃO mais `#525252`) — passa AA em texto >= 14px bold.
- Hover de superfícies: `--background-elevated → --background-overlay` é perceptível (delta L* ≈ 4.2).

**Contraste WCAG (sobre `--background #0a0a0a`):**

| Token | Ratio | Classificação |
|-------|-------|---------------|
| `--foreground` | 19.4:1 | AAA |
| `--foreground-muted` | 7.57:1 | AAA |
| `--foreground-subtle` | 4.5:1 | AA (≥14px bold) |
| `--accent` | 10.7:1 | AAA |
| `--whatsapp` (fundo) | 9.99:1 | AAA |
| `#0a0a0a` sobre `#25d366` | 12.46:1 | AAA — **texto preto no CTA verde** |

### 1.3. Tipografia

Geist Sans + Geist Mono via `next/font`.

```ts
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
```

**Escala corrigida** (perfect-fourth 1.333× display + minor-third 1.2× corpo):

| Token | Tamanho | Peso | Letter-spacing | Line-height | Uso |
|-------|---------|------|----------------|-------------|-----|
| `display-1` | clamp(3rem, 7.5vw, 6rem) | 700 | **-0.022em** | 0.95 | Hero |
| `display-2` | clamp(2.25rem, 5vw, 4.5rem) | 700 | **-0.018em** | 1.0 | Seção |
| `display-3` | clamp(1.75rem, 3vw, 2.25rem) | 600 | **-0.012em** | 1.1 | Subtítulo |
| `body-lg` | 1.125rem (18px) | 400 | **0** | 1.6 | Lead |
| `body` | 1rem (16px) | 400 | **0** | 1.6 | Corpo |
| `body-sm` | 0.875rem (14px) | 400 | 0 | 1.5 | Captions |
| `eyebrow` | 0.75rem (12px) mono | 500 | **0.14em** | 1.4 | "01 / Sobre" |
| `label` | 0.6875rem (11px) mono | 500 | **0.15em** | 1.3 | Tags, micro-rótulos |

Letter-spacing **Geist-tuned** (Geist já vem pré-tightened — defaults LLM produzem colisão visível em peso 700 ≥ 5rem).

**PT-BR til risk:** evitar palavras com til (`ã`, `õ`) em `display-1` ≥ 5rem. Tagline atual ("Produtos web claros, do briefing ao deploy.") é segura.

### 1.4. Tema

**Dark only.** `DarkModeButton` removido. `html.dark` selector eliminado.

### 1.5. Filosofia de motion

**Grammar (princípio unificador):**
- Motion **physics-driven** (continuous, input-following): exclusivo do **eixo WhatsApp** — magnetic CTA + glow
- Motion **discrete state-change** (one-shot, easing): tudo o resto — reveal, hover, transitions
- Motion **ambient perpétuo**: aurora drift + breathing eyebrows (sempre presentes, sutis)

| Padrão | Status | Onde |
|--------|--------|------|
| Reveal on scroll (opacity + translateY) | SIM | Toda seção primária e cards, IO threshold 0.15, dispara 1× |
| Hover micro (lift -2px + accent border + 200ms) | SIM | Cards, links, botões |
| **Native scroll** (sem Lenis) | SIM | `html { scroll-behavior: smooth }` + `scroll-margin-top: 80px` em âncoras |
| Magnetic CTA | SIM | Apenas botões WhatsApp (flutuante 80px raio, hero 150px raio) |
| Text-mask reveal (clip-path linha a linha) | SIM | Hero h1 apenas |
| Parallax thumbnails | SIM | Single rAF dedicado, IO-gated, `will-change` toggled |
| **Aurora drift** ambient | NOVO | `<body>::before` radial-gradient transform translate3d, 18s loop |
| **Breathing eyebrows** | NOVO | Numerais `01–04` opacity 0.55↔0.75, 3.6s, dessincronizado |
| **Cursor blink** hero title | NOVO | `▌` piscando após "deploy.", troca glifo a cada 4s |
| **Section-number tick** | NOVO | Dígitos 02-06 com mask 60ms entre chars on enter |
| **Focus-ring choreography** | NOVO | `outline-offset 0 → 3px` em 120ms ao foco keyboard |
| Cursor custom | NÃO | Distrai cliente B2B |
| Page transitions | NÃO | Página única no MVP |
| Number counters | NÃO | Sem métricas verificáveis |
| Marquee/ticker | NÃO | Anti-minimal |
| 3D/WebGL/shaders | NÃO | Fora de "sutil" |
| Text-shimmer | NÃO | Removido (era Linear-clone reconhecível) |

**Reduce-motion:** safety net global em `globals.css`:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

Mais opt-outs por componente (cursor blink trava em `▌`, breathing trava em opacity 0.65, parallax desliga, magnetic desliga).

### 1.6. Largura máxima e grid

Container max 1200px, grid 12-col com gap 24px desktop / 16px mobile, gutters fluidos `clamp(1rem, 4vw, 2.5rem)`.

### 1.7. Curva de easing

```css
:root {
  --ease-out:        cubic-bezier(0.16, 1, 0.3, 1);    /* entradas, reveal, text-mask */
  --ease-out-quint:  cubic-bezier(0.22, 1, 0.36, 1);   /* hover, state changes */
  --ease-in-out:     cubic-bezier(0.65, 0, 0.35, 1);   /* loops ambient */
  --duration-fast:   150ms;
  --duration:        300ms;
  --duration-slow:   600ms;
  --duration-reveal: 800ms;
}
```

Pareamento por banda de duração: `--ease-out` em ≥600ms (entrada cinematográfica), `--ease-out-quint` em 150-300ms (hover anchored).

### 1.8. Espaçamento e radius

```css
:root {
  --space-1:  0.25rem;   --space-2:  0.5rem;   --space-3:  0.75rem;
  --space-4:  1rem;      --space-5:  1.5rem;   --space-6:  2rem;
  --space-7:  3rem;      --space-8:  4rem;     --space-9:  6rem;
  --space-10: 8rem;
  --space-section: clamp(5rem, 12vw, 9rem);

  /* radius — escala expandida */
  --radius-none: 0;
  --radius-xs:   2px;    /* badges, tags, label inputs */
  --radius-sm:   4px;    /* buttons, inputs */
  --radius:      6px;    /* cards pequenos, dropdowns */
  --radius-lg:   8px;    /* cards de projeto, painéis */
  --radius-pill: 999px;
}
```

Ceiling 8px. Sensação minimal radical preservada.

### 1.9. Sombras

Política: profundidade vem de borders e contraste de superfície (`--background-elevated → --background-overlay`).

Exceção única: botão WhatsApp flutuante — `--whatsapp-glow: 0 4px 16px rgba(37, 211, 102, 0.22)` (reduzido de 0 8px 24px). Glow do CTA hero é **pseudo `::after` com `transform: scale + opacity`** (GPU), não `box-shadow`.

### 1.10. Iconografia

`lucide-react ≥ 0.460`, stroke 1.5px, tamanho 16px ou 20px, cor `currentColor`. Import individual:

```ts
import ArrowUpRight from "lucide-react/icons/arrow-up-right";
```

---

## 2. Bloco 4 — Fundamentos de sistema

### 2.1. Header

Sticky 64px desktop / 56px mobile. Fundo `--background` com border-bottom `--border-1` quando rola > 8px (sem backdrop-blur).

```
[ César Augusto              ] [ Início Projetos Trabalho Princípios Contato ] [ PT|EN ] [ Falar no WhatsApp → ]
[ Full-stack engineer  (mono) ]
```

Nav itens: 5 com novos labels (Início, Projetos, **Trabalho**, **Princípios**, Contato). Geist 14px peso 500 cor `--foreground-muted`, hover `--foreground` com underline accent que cresce via `transform: scaleX` (origin-left, 200ms `--ease-out-quint`).

Toggle de idioma: `<a href="/pt">PT</a> | <a href="/en">EN</a>` — ativo em `--foreground`, inativo em `--foreground-subtle`.

CTA inline "Falar no WhatsApp" tamanho compacto.

Mobile: hambúrguer + drawer com focus trap, `aria-expanded`, ESC fecha, retorna foco ao trigger.

### 2.2. Footer

Border-top `--border-1`, padding-block 48px.

```
─────────────────────────────────────────────────────
César Augusto                          GitHub  LinkedIn  Instagram  WhatsApp
Full-stack engineer · 2026             [PT] [EN]
─────────────────────────────────────────────────────
```

Sem "Made with Next.js", sem newsletter, sem cards de stack.

### 2.3. Botão WhatsApp flutuante

```css
.fab {
  position: fixed;
  inset: auto 24px 24px auto;
  width: 56px;
  height: 56px;
  background: var(--whatsapp);
  color: var(--background);  /* preto sobre verde — 12.46:1 */
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: var(--radius-pill);
  z-index: 60;
}
```

**Glow:** pseudo `::after` com `transform: scale(1) → scale(2.4)` + `opacity: 0.5 → 0`, 2.4s `--ease-in-out` infinite (NÃO `box-shadow` animado).

**Hover desktop:** label "Falar no WhatsApp" sempre presente com `opacity: 0; transform: translateX(-8px) scaleX(0)` (origin-right). No hover anima `opacity:1; translateX(0) scaleX(1)` (transform, não width).

**Magnetic:** raio 80px, damping 0.14 (mais snappy que damping 0.18 anterior).

**Mensagem PT:** `Oi César, vim do seu portfólio. Tenho um projeto em vista — pode me passar como funciona?`
**Mensagem EN:** `Hey César, came from your portfolio. I have a project in mind — can you walk me through how you work?`

Reduce-motion: sem magnetic, sem glow, sem expansão. Hover só escurece fundo 8%.

### 2.4. i18n — route-based

**Implementação Next 15 nativa:**

```
src/app/
├── [locale]/
│   ├── layout.tsx           # passa locale via context
│   ├── page.tsx             # home
│   └── opengraph-image.tsx
├── layout.tsx               # root layout (sem locale)
├── sitemap.ts               # gera /pt + /en
└── robots.ts
```

`generateStaticParams`:

```ts
export async function generateStaticParams() {
  return [{ locale: "pt" }, { locale: "en" }];
}
```

Middleware redireciona `/` → `/pt` (ou negocia via `Accept-Language` em primeiro acesso).

Dicionários em `src/lib/i18n/dictionaries/{pt,en}.ts` com tipo `DeepKeyOf<T>` e CI check de paridade de chaves.

**hreflang correto:**

```html
<link rel="alternate" hreflang="pt-BR" href="https://.../pt" />
<link rel="alternate" hreflang="en-US" href="https://.../en" />
<link rel="alternate" hreflang="x-default" href="https://.../pt" />
```

**Vantagens vs cookie:** SSG funciona, hreflang válido, share-link preserva locale, Googlebot indexa ambas, sem hidratação mismatch.

### 2.5. Analytics

Zero tracking no MVP. Pixel Meta removido. Vercel Analytics adicionado quando precisar de número de visitas (sem cookie, sem opt-in, drop-in).

### 2.6. Domínio e hospedagem

Vercel Hobby. Subdomain padrão até comprar `cesaraugusto.dev`. Variável de ambiente `NEXT_PUBLIC_SITE_URL`.

Email **não exibido** no contact card — só WhatsApp + LinkedIn + GitHub + Instagram.

### 2.7. SEO base

`src/app/[locale]/layout.tsx`:

```ts
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = getDictionary(locale);
  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://cesaraugusto.vercel.app"),
    title: { default: t.meta.title, template: `%s | ${t.meta.brand}` },
    description: t.meta.description,
    alternates: {
      canonical: `/${locale}`,
      languages: { "pt-BR": "/pt", "en-US": "/en", "x-default": "/pt" },
    },
    openGraph: {
      type: "website",
      locale: locale === "pt" ? "pt_BR" : "en_US",
      alternateLocale: locale === "pt" ? ["en_US"] : ["pt_BR"],
      siteName: "César Augusto",
      images: [{ url: `/${locale}/opengraph-image`, width: 1200, height: 630 }],
    },
    twitter: { card: "summary_large_image", creator: "@oCesaum" },
    icons: { icon: "/icon", apple: "/apple-icon" },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
  };
}
```

Arquivos novos:
- `src/app/[locale]/opengraph-image.tsx` (Next 15 ImageResponse)
- `src/app/icon.tsx`, `src/app/apple-icon.tsx`
- `src/app/sitemap.ts` (lista `/pt` + `/en`)
- `src/app/robots.ts`

JSON-LD Person schema injetado no layout.

Adições de performance: `<link rel="dns-prefetch" href="https://wa.me">` + `<link rel="preload" as="image" href="/dom-comparator.avif" fetchpriority="high">` para featured thumb.

### 2.8. Acessibilidade — WCAG 2.1 AA

**Padrão `:focus-visible` global (double-ring):**

```css
*:focus-visible {
  outline: 2px solid var(--foreground);
  outline-offset: 2px;
  box-shadow: 0 0 0 4px var(--background);
  transition: outline-offset 120ms var(--ease-out-quint);
}

*:focus-visible:not(:active) {
  outline-offset: 3px;  /* choreography on landing focus */
}
```

Funciona em qualquer fundo (branco + halo preto envolvendo o accent ou WhatsApp).

**Outras regras:**
- Skip link "Pular para o conteúdo" como primeiro `<a>` dentro do `<body>`, antes do header. `<main id="main">` com `scroll-margin-top: 80px`.
- `<html lang>` derivado da rota (`/pt` → `pt-BR`, `/en` → `en`).
- Imagens com `alt` descritivo (não "imagem do projeto X").
- Hierarquia: 1× h1 (hero), h2 por seção, h3 dentro.
- Drawer mobile com focus trap + `aria-modal` + ESC fecha + retorna foco.
- `prefers-reduced-motion` safety net global (§1.5).

Validação: `axe-core` via Playwright **em cada PR de seção** (não só F9). Lighthouse a11y target ≥ 95.

### 2.9. Performance budget

| Métrica | Alvo |
|---------|------|
| LCP | < 2.0s |
| CLS | < 0.05 |
| INP | < 200ms |
| TBT | < 200ms |
| FCP | < 1.5s |
| Bundle JS first-load (gzip) | **< 130 KB** (Lenis dropado) |
| Lighthouse Performance | ≥ 95 |
| Lighthouse Accessibility | ≥ 95 |
| Lighthouse SEO | ≥ 100 |
| Lighthouse Best Practices | ≥ 100 |

Bundle estimado pós-decisões: **~95–110 KB gzip** (sem Lenis, motion via LazyMotion + domAnimation, lucide individual).

Padrões obrigatórios:
- Imagens via `next/image` com `priority` apenas no LCP
- AVIF + WebP fallback, max 80 KB cada thumbnail
- Renomear `doce compota.png` → `doce-compota.png`
- Excluir `mario.gif`, `project-image.jpg`
- `motion`: `import { LazyMotion, domAnimation, m } from "motion/react"`
- `lucide-react`: import individual
- Geist subset latin
- Sem `backdrop-filter` em mobile
- INP risk: `mousemove` do magnetic via rAF throttle + suspende durante scroll ativo
- `@next/bundle-analyzer` em CI

---

## 3. Seção 1 — Hero

### 3.1. Objetivo

Em ≤ 3s comunicar:
1. Quem é → "César Augusto, full-stack"
2. O que entrega → "produtos web claros"
3. Status real → "Aceitando 2 projetos este trimestre"
4. Como contratar → CTA "Falar no WhatsApp"

### 3.2. Conteúdo

**Eyebrow vertical (lateral esquerda, mono 11px tracking 0.14em uppercase, rotacionado 90°):**
- PT: `01 / Início`
- EN: `01 / Start`

**Pílula de status (topo, antes do título):**
- PT: `Aceitando 2 projetos este trimestre · Resposta em até 24h`
- EN: `Taking 2 projects this quarter · Reply within 24h`

Visual: pílula `--background-elevated`, border 1px `--border-2`, padding 8x14px, dot 6px verde `--whatsapp` à esquerda com pulse via pseudo `::after` (transform-only).

**Tagline (display-1):**
- PT: `Produtos web claros,` / `do briefing ao deploy.`
- EN: `Clear web products,` / `from brief to deploy.`

Após o ponto final do `display-1`, **cursor mono `▌` piscando** (1s `step-end` infinite). Glifo troca a cada 4s entre `▌`, `_`, `·`. Reduce-motion trava em `▌`.

**Lead (body-lg, max-width 60ch, cor `--foreground-muted`):**
- PT: `Trabalho com founders e times pequenos que precisam tirar um produto web do briefing pro deploy — sem virar refém de agência, sem perder mês em reunião.`
- EN: `I work with founders and lean teams who need to take a web product from brief to deploy — without getting stuck in agency cycles or losing a month to meetings.`

**CTAs:**

| Ordem | PT | EN | Tipo |
|-------|----|----|------|
| 1 | `Falar no WhatsApp →` | `Message on WhatsApp →` | Primário (accent fill, texto preto) |
| 2 | `Ver projetos ↓` | `See projects ↓` | Secundário (ghost) |

**Stack inline (body-sm, cor `--foreground-muted`, separador `·`, primeiro item em peso 600 cor `--foreground`):**
- `**Next.js** · TypeScript · Supabase · React · Tailwind`

(Reorder pós-ICP travado em Founder BR: Supabase sobe — founders BR pedem auth/DB pronto. PHP/WordPress saem do hero — relevante pra D Agência mas D não é ICP. Stack completa fica em §5.)

### 3.3. Layout assimétrico (grid 12-col)

```
┌──────────────────────────────────────────────────────────────────────┐
│ ┃                                                                     │
│ ┃   [• Aceitando 2 projetos este trimestre · Resposta em 24h]        │
│ ┃                                                                     │
│ ┃   Produtos web claros,                                              │
│ ┃   do briefing ao deploy. ▌                                          │
│ ┃                                                                     │
│ ┃                          ┌──────────────────────────────────────┐   │
│ ┃                          │ Trabalho com agências e founders... │   │
│ ┃   01 / Início            │                                      │   │
│ ┃   ↑                      │ [ Falar no WhatsApp → ]              │   │
│ ┃   (vertical eyebrow)     │ [ Ver projetos ↓ ]                   │   │
│ ┃                          │                                      │   │
│ ┃                          │ **Next.js** · React · TypeScript ·.. │   │
│ ┃                          └──────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────────────────┘
```

- **Eyebrow rotacionado 90°** ancorado na col 1 (margem esquerda), top alinhado com pílula
- **Pílula + título** ocupam col 1-8 esquerda
- **Lead + CTAs + stack inline** col 7-12 direita, com `translateY(96px)` permanente — cria leitura em Z assimétrico
- Wrapper alinhado em baseline grid 8px

### 3.4. Mobile (< 768px)

- Eyebrow desrotaciona, vai pra topo
- Pílula full-width
- Título e bloco de lead empilhados (sem offset Z)
- CTAs full-width vertical, ordem WhatsApp → ver projetos

### 3.5. Animações

Sequência on-mount (1×):

| # | Elemento | Animação | Duração | Delay | Easing |
|---|----------|----------|---------|-------|--------|
| 1 | Eyebrow rotacionado | opacity 0→1, translateY +12→0 | 600ms | 0 | `--ease-out` |
| 2 | Pílula | opacity 0→1, scale 0.96→1 | 500ms | 100ms | `--ease-out` |
| 3 | h1 linha 1 | clip-path inset(0 0 100% 0)→inset(0) | 800ms | 250ms | `--ease-out` |
| 4 | h1 linha 2 | clip-path idem | 800ms | 350ms | `--ease-out` |
| 5 | Cursor `▌` aparece | opacity 0→1 | 200ms | 1100ms | `--ease-out` |
| 6 | Lead | opacity 0→1, translateY +16→0 | 600ms | 700ms | `--ease-out` |
| 7 | CTA primário | opacity 0→1, translateY +16→0 | 500ms | 900ms | `--ease-out` |
| 8 | CTA secundário | opacity 0→1, translateY +16→0 | 500ms | 980ms | `--ease-out` |
| 9 | Stack inline | opacity 0→0.7 | 600ms | 1100ms | `--ease-out` |

Loops perpétuos:
- **Dot pílula:** pseudo `::after` `transform: scale(1)→scale(2.4)` + `opacity: 0.5→0`, 1.6s, infinite
- **Cursor `▌`:** opacity 1↔0 em 1s `step-end`, glifo troca a cada 4s
- **Eyebrow numerais (todas seções):** opacity 0.55↔0.75 em 3.6s `--ease-in-out`, dessincronizado por seção (`01` delay 0, `02` 900ms, `03` 1800ms, etc)

Hover micro:
- CTA primário: magnetic raio 80px damping 0.14, fundo `--accent → --accent-strong` em 200ms `--ease-out-quint`, ícone `ArrowRight` translateX +2px
- CTA secundário: border `--border-2 → --border-3`, ícone `ArrowDown` translateY +2px

### 3.6. Semântica e a11y

- `<section id="hero" aria-labelledby="hero-title">`
- `<h1 id="hero-title">` único na página
- Pílula: `<div role="status" aria-live="polite">`
- CTA primário: `<a href="https://wa.me/..." target="_blank" rel="noopener noreferrer" aria-label="Iniciar conversa no WhatsApp">`
- CTA secundário: `<a href="#projetos">` (smooth scroll com `scroll-margin-top: 80px` no destino)
- Stack inline: `<ul aria-label="Tecnologias principais">` com `<li>`
- Cursor `▌`: `<span aria-hidden="true">`
- Eyebrow rotacionado: `<p aria-hidden="true">` (decorativo)

### 3.7. Componentes técnicos

```
src/
├── components/
│   ├── hero/
│   │   ├── Hero.tsx
│   │   ├── HeroPill.tsx
│   │   ├── HeroTitle.tsx       # client (text-mask + cursor blink)
│   │   ├── HeroCTA.tsx         # client (magnetic)
│   │   └── HeroStack.tsx
│   └── ui/
│       ├── Button.tsx
│       └── MagneticWrapper.tsx
└── lib/
    ├── motion.ts               # variants, easings, durations
    └── i18n/
        ├── dictionaries/
        │   ├── pt.ts
        │   └── en.ts
        └── useT.ts
```

Stack: `motion/react` com `LazyMotion strict + domAnimation + m.*`.

### 3.8. Critérios de aceite

- [ ] Tagline lê em < 2s mesmo em 3G (LCP < 2s)
- [ ] Layout assimétrico em desktop, single-column em mobile
- [ ] Eyebrow rotacionado 90° na lateral esquerda em desktop
- [ ] Cursor `▌` pisca após "deploy.", troca de glifo a cada 4s
- [ ] Pílula com dot pulsando via pseudo-element transform (não box-shadow)
- [ ] CTA primário texto preto sobre accent (12.46:1 AAA)
- [ ] CTA primário com magnetic raio 80px damping 0.14 em desktop, sem em touch
- [ ] CTA secundário rola pra `#projetos` com offset 80px
- [ ] `prefers-reduced-motion` desliga sequence + cursor blink + dot pulse + breathing
- [ ] Stack inline com primeiro item em peso 600
- [ ] Bundle JS específico do hero ≤ 8 KB gzip

---

## 4. Seção 2 — Projetos

### 4.1. Objetivo

Mostrar capacidade através de 6 projetos publicados. Cliente não-técnico vê resultado; agência vê stack.

### 4.2. Conteúdo

**Eyebrow:** `02 / Projetos` / `02 / Projects`

**Título (display-2):** `Trabalhos selecionados.` / `Selected work.`

**Subtítulo:** `Seis produtos publicados. Cada um resolveu um problema concreto — de landing pages a ferramentas internas.` / `Six published products. Each one solved a concrete problem — from landing pages to internal tools.`

**Lista (mantém os 6 atuais):** ver tabela em v1 §4.2 (idêntica). Tags em linguagem de negócio. Etiquetas de tipo: `Featured / Cliente / Produto / Estudo`. Featured: DOM Comparator.

### 4.3. Layout

**Featured** (formato hero-card 2-col): igual v1 §4.3.

**Demais 5** (rows compactas com number, thumb, conteúdo, etiqueta de tipo): igual v1 §4.3, mas com:
- Hover de row inteira: background `--background-elevated → --background-overlay` (ambos tokens definidos, delta perceptível agora)
- Number `02–06` cor `--foreground-muted` (não mais `--foreground-subtle`)
- Hover number: `--foreground-muted → --accent` em 200ms `--ease-out-quint`

**Adições pós-ICP travado (Meta-2 + Meta-3):**

- **Tag de duração real** ao lado do número de seção (mono 10px tracking 0.16em uppercase cor `--foreground-subtle`): `14d`, `21d`, etc. Lido do campo `duration` no schema do projeto. Prova auditável de "Prazo dado é prazo cumprido" (Princípio 5). Diário de bordo light.
- **Sub-label de domínio** abaixo do CTA "Ver projeto" (mono 11px tracking 0.14em cor `--foreground-subtle`): `docecompota.com.br` quando custom domain, `*.vercel.app` quando subdomínio. Distingue cliente real (custom domain) de estudo/produto (subdomain). Sinaliza cuidado e produção real, não custa atenção extra do visitante.

Schema atualizado: `Project.duration?: string` (formato livre `"14d"`, `"3 semanas"`) e `Project.domainKind: "custom" | "vercel"` (computed do hostname).

### 4.4. Mobile

Igual v1 §4.4.

### 4.5. Animações

Reveal on scroll: igual v1.

**Section-number tick** (NOVO): números 02–06 entram com mask 60ms entre dígitos (clip-path `inset(0 0 100% 0)` por caractere).

**Parallax thumbnails:** single rAF dedicado (NÃO acoplado a Lenis):

```ts
let frame = 0;
const tick = () => {
  for (const thumb of nearViewportThumbs) {
    const rect = thumb.getBoundingClientRect();
    const py = (rect.top - viewportH / 2) * 0.06;
    thumb.style.transform = `translate3d(0, ${py}px, 0)`;
  }
  frame = requestAnimationFrame(tick);
};
```

- IO toggle `near-viewport` (rootMargin 200px) → adiciona/remove `will-change: transform`
- Cap 1 thumb visível em mobile
- Auto-disable se `navigator.deviceMemory < 4` ou `connection.saveData`

Hover: igual v1.

### 4.6. Semântica e a11y

Igual v1 §4.6 + cada thumb com `aspect-ratio` obrigatório (16:10 ou 4:3 conforme contexto).

### 4.7. Componentes técnicos

Igual v1 §4.7.

### 4.8. Assets

Igual v1 §4.8 + preload + `fetchpriority="high"` na thumb do Featured.

### 4.9. Critérios de aceite

Igual v1 §4.9 + parallax via rAF dedicado + section-number tick on enter + hover de number muda pra `--accent`.

---

## 5. Seção 3 — Como trabalho

### 5.1. Objetivo

(antiga "Sobre", renomeada B9.) Construir confiança por **método visível**. Cliente B2B precisa ver bio honesta, foto real, processo declarado, stack.

### 5.2. Conteúdo

**Eyebrow:** `03 / Trabalho` / `03 / Work`

**Título (display-2):** `Como eu trabalho.` / `How I work.`

**Bio (3 parágrafos, body-lg, cor `--foreground-muted`, max-width 56ch):**

PT:
1. `Sou César Augusto, desenvolvedor full-stack. Construo produtos web — de landings a ferramentas internas — buscando o equilíbrio entre clareza visual, código sustentável e prazo realista.`
2. `Saí de auxiliar de TI (2020) pra dev júnior (2022) e desde lá entreguei tanto landing rápida quanto sistema interno que sustenta operação. A escolha de stack vem do problema, não do hype.`
3. `Meu compromisso é simples: entregar o que foi combinado, comunicar o que está acontecendo e deixar código que a próxima pessoa consiga entender.`

EN:
1. `I'm César Augusto, a full-stack developer. I build web products — from landings to internal tools — balancing visual clarity, maintainable code, and realistic timelines.`
2. `I went from IT assistant (2020) to junior dev (2022), and since then I've shipped everything from quick landings to internal systems that keep operations running. Stack choices come from the problem, not the hype.`
3. `My commitment is simple: deliver what we agreed, communicate what's happening, and leave code the next person can understand.`

**Bullets de método (4):**

PT:
- `Briefing curto via WhatsApp, sem reuniões intermináveis.`
- `Prazo dado é prazo cumprido — e renegociado antes, se mudar.`
- `Entregas incrementais com link de prévia.`
- `Código que outro dev abre e roda em 5 minutos — README incluso.`

EN:
- `Short briefing via WhatsApp, no endless meetings.`
- `Deadlines I commit to, I hit — renegotiated up front if scope shifts.`
- `Incremental delivery with a preview link.`
- `Code another dev can clone and run in 5 minutes — README included.`

**Stack agrupada:**

| Categoria | PT/EN | Items |
|-----------|-------|-------|
| `frontend` | Front-end / Front-end | React · Next.js · TypeScript · Tailwind CSS |
| `backend` | Back-end / Back-end | Node.js · PHP · WordPress |
| `data` | Dados / Data | Supabase · MySQL |
| `tooling` | Ferramentas / Tooling | Git · VS Code · Vercel · Figma |

### 5.3. Layout assimétrico

Foto **deslocada para `col 8-12`** com `translateY(48px)` permanente. Pad accent (atrás da foto) sai no canto **inferior-esquerdo** (não superior-direito padrão).

```
┌────────────────────────────────────────────────────────────────────┐
│  03 / Trabalho                                                      │
│                                                                     │
│  Como eu trabalho.                                                  │
│                                                                     │
│  Sou César Augusto, desenvolvedor                                   │
│  full-stack. Construo produtos...               ┌──────────────┐    │
│                                                 │              │    │
│  Saí de auxiliar de TI (2020)...                │  FOTO        │    │
│                                                 │  split-tone  │    │
│  Meu compromisso é simples...                   │  5:7 cinema  │    │
│                                                 │              │    │
│  Belo Horizonte, 2026 (mono caption)         ┌──┴──────────────┘    │
│                                              │ pad accent           │
│                                              └──────────────────    │
├────────────────────────────────────────────────────────────────────┤
│  COMO ENTREGO                                                       │
│  01  Briefing curto via WhatsApp, sem reuniões intermináveis.      │
│  02  Prazo dado é prazo cumprido — e renegociado antes, se mudar. │
│  03  Entregas incrementais com link de prévia.                     │
│  04  Código que outro dev abre e roda em 5 minutos — README ...    │
├────────────────────────────────────────────────────────────────────┤
│  STACK                                                              │
│  Front-end   React · Next.js · TypeScript · Tailwind CSS            │
│  Back-end    Node.js · PHP · WordPress                              │
│  Dados       Supabase · MySQL                                       │
│  Ferramentas Git · VS Code · Vercel · Figma                         │
└────────────────────────────────────────────────────────────────────┘
```

Bullets de método com numeração mono `01–04` (não `─` traço).

### 5.4. Foto profissional — split-tone editorial

Drop grayscale-to-color (B6).

- **Aspect:** 5:7 (cinema)
- **Tamanho:** 400px width desktop, full-width até 320px mobile
- **Tratamento:** sempre colorida, `filter: contrast(1.05) saturate(0.92)` + grão de filme via SVG `<feTurbulence>` overlay 3% opacity. **Não** aplicar `filter: grayscale`.
- **Split-tone sutil:** highlights bege (mix com `--accent`) + sombras azul-frio leve. Aplicado via Photoshop/Figma na imagem fonte, não em CSS (filter custa repaint).
- **Border:** 1px `--border-2`, sem radius
- **Pad accent:** retângulo `background: var(--accent)` opacity 0.18, deslocado `-12px, +12px` (canto inferior-esquerdo). Desliga em mobile.
- **Caption mono abaixo da foto:** `Belo Horizonte, 2026` em Geist Mono 11px tracking 0.14em uppercase cor `--foreground-subtle` (decorativa, com `aria-hidden`)
- **Alt:**
  - PT: `Retrato de César Augusto, desenvolvedor full-stack.`
  - EN: `Portrait of César Augusto, full-stack developer.`
- **Arquivo:** `public/cesar-augusto-retrato.jpg` (gerar AVIF/WebP), `loading="lazy"`, `aspect-ratio: 5/7`.

**Hover:** sem mudança de filter (nada de grayscale-toggle). Pad accent translada de `-12,+12 → -16,+16` via `transform: translate3d` (já era transform, OK).

### 5.5. Mobile

- Foto vai pro topo da seção, aspect 4:5, sem pad accent
- Bullets verticais
- Stack: categorias verticais, label mono à esquerda, items na linha de baixo

### 5.6. Animações

Reveal: igual v1, **menos shimmer no header de stack** (removido). Stack categorias entram em stagger 80ms simples (opacity + translateY).

**Section-number tick** no `03`.

`prefers-reduced-motion`: igual v1, mais coverage do safety net global.

### 5.7. Semântica e a11y

Igual v1 §5.7.

### 5.8. Componentes técnicos

```
src/components/work/
├── Work.tsx                    # rota: #trabalho
├── WorkPortrait.tsx            # split-tone via static image, sem hover
├── WorkMethod.tsx              # bullets com numeração mono
├── StackList.tsx
└── StackCategory.tsx
src/data/
├── work.ts                     # bio + bullets
└── stack.ts
```

Renomeação `about/ → work/`. Hash da rota `#sobre → #trabalho` (PT) / `#work` (EN).

### 5.9. Critérios de aceite

- [ ] Foto sempre colorida com split-tone, sem grayscale-hover
- [ ] Aspect 5:7 desktop / 4:5 mobile, `aspect-ratio` reservando espaço
- [ ] Pad accent canto inferior-esquerdo desktop, ausente mobile
- [ ] Caption mono `Belo Horizonte, 2026` abaixo da foto
- [ ] Bullets de método com numeração mono `01–04`
- [ ] Header de stack sem shimmer
- [ ] 4 categorias em grid 2x2 desktop
- [ ] Toggle PT/EN troca todo o conteúdo via rota
- [ ] Bio §2 reescrita: "Saí de auxiliar de TI..." + "stack vem do problema, não do hype"
- [ ] Bullet 2 reescrito: "Prazo dado é prazo cumprido..."

---

## 6. Seção 4 — Princípios (NOVA)

### 6.1. Objetivo

Voz autoral. Manifesto curto em primeira pessoa que assina autoria. Posiciona César como consultor com opinião, não freelancer disponível.

### 6.2. Conteúdo

**Eyebrow:** `04 / Princípios` / `04 / Principles`

**Título (display-3):** `Como eu penso.` / `How I think.`

**6 princípios em primeira pessoa** (display-3 em peso 600 `--foreground`, alternando alinhamento esquerda/direita):

PT:
1. `Não trabalho com escopo aberto.`
2. `Não entrego sem README.`
3. `Não cobro por hora — cobro pelo problema.`
4. `Stack vem do problema, não do hype.`
5. `Prazo dado é prazo cumprido.`
6. `Briefing curto, prazo curto, deploy real.`

EN:
1. `No open-ended scope.`
2. `No deploy without a README.`
3. `I charge per problem, not per hour.`
4. `Stack comes from the problem, not the hype.`
5. `A deadline I give is a deadline I hit.`
6. `Short briefs, short timelines, real deploys.`

> Itens 4 e 5 ecoam Sobre §5.2 e bullets §5.2. Repetição **deliberada** — manifesto reforça o que outras seções afirmam.

### 6.3. Layout

Single column centralizado, mas com **alinhamento alternado** dos princípios:

```
                        04 / Princípios
                       Como eu penso.

  Não trabalho com escopo aberto.
                                       Não entrego sem README.
  Não cobro por hora — cobro pelo problema.
                                       Stack vem do problema, não do hype.
  Prazo dado é prazo cumprido.
```

Cada princípio em `display-3` cor `--foreground` peso 600. Espaçamento vertical generoso `--space-7` entre cada um. Linha-base 1.1.

### 6.4. Mobile

Centraliza todos (sem alternância), `display-3` reduz pra ~1.5rem.

### 6.5. Animações

Reveal individual stagger 120ms. Cada princípio entra com `opacity 0→1` + `translateX (alternado: ±24px → 0)` em 700ms `--ease-out`. Reduce-motion: tudo aparece em opacity 1 sólido.

### 6.6. Semântica e a11y

`<section id="principios" aria-labelledby="principios-title">`. Lista `<ol>` com `<li>` em peso 600. Ordem semântica preservada.

### 6.7. Critérios de aceite

- [ ] 5 princípios renderizados com alternância de alinhamento desktop
- [ ] Linguagem em primeira pessoa, declarativa, opinativa
- [ ] Não soa como bullet de "como trabalho" — é manifesto
- [ ] Reduce-motion preserva legibilidade
- [ ] Toggle PT/EN troca todo conteúdo via rota

---

## 7. Seção 5 — Contato

### 7.1. Objetivo

Conversão única. CTA editorial (não pílula verde gigante). Depoimentos como prova social no MVP (≥ 2 obrigatórios).

### 7.2. Conteúdo

**Eyebrow:** `05 / Contato` / `05 / Contact`

**Título (display-2, alinhado à esquerda):**
- PT: `Conta a ideia. Eu respondo em até 24 horas.`
- EN: `Tell me the idea. I'll reply within 24 hours.`

**Lead:**
- PT: `Aceitando 2 projetos este trimestre. Mande um WhatsApp com o que precisa fazer — eu volto com prazo e plano.`
- EN: `Taking 2 projects this quarter. Send a WhatsApp with what you need to build — I'll reply with timeline and plan.`

**CTA duas-camadas (B8):**

```
┌─────────────────────────────────────────┐
│ 💬  Falar no WhatsApp →                 │   ← Camada 1: Geist 18 px peso 600
│     RESPOSTA EM ATÉ 24H                 │   ← Camada 2: mono 11 px tracking 0.14em accent
└─────────────────────────────────────────┘
```

Layout:
- Border 1px `--border-2`, padding 20x32px, `--radius-lg`
- Ícone `MessageCircle` lucide 22px stroke 1.5 cor `--whatsapp` à esquerda
- Camada 1 (action): "Falar no WhatsApp →" em `--foreground`
- Camada 2 (rotativa): mono 11px tracking 0.14em uppercase cor `--accent`, **rotaciona** entre 4 strings a cada 4.5s com mask-reveal (clip-path inset, 600ms `--ease-out`)
  - PT: `RESPOSTA EM ATÉ 24H` / `BRASIL · UTC−3` / `ACEITANDO PROJETOS` / `PIX 50% NA ASSINATURA`
  - EN: `REPLY WITHIN 24H` / `BRAZIL · UTC−3` / `ACCEPTING PROJECTS` / `50% UPFRONT, USD WIRE OK`
- Verde `--whatsapp` aparece **apenas** no ícone e na linha mono (sob hover do CTA, todo a linha brilha de `--accent → --whatsapp` em 300ms)
- Hover: `transform: scaleX(1.025)` no wrapper (não padding-inline). Border `--border-2 → --border-3`.
- Magnetic raio 150px damping 0.16

**Fallback inline (abaixo do CTA, body-sm cor `--foreground-muted`):**
- PT: `Se o WhatsApp não abrir, copie: +55 31 98737-3513`
- EN: `If WhatsApp doesn't open, copy: +55 31 98737-3513`

**Outros canais (linha sutil abaixo):**
- Eyebrow PT: `OUTROS CANAIS` / EN: `OTHER CHANNELS`
- 3 chips: LinkedIn, GitHub, Instagram (sem email)

**Depoimentos (≥ 2 obrigatórios no MVP):**
- Eyebrow PT: `O QUE DIZEM` / EN: `WHAT THEY SAY`
- Cards igual v1 §6.2 — coletar via WhatsApp dos clientes anteriores antes de deploy
- Schema `consentGiven: boolean` — só renderiza se true
- Sem depoimentos coletados → deploy é beta com `noindex`

### 7.3. Layout assimétrico (B5)

Grid `[5fr][7fr]`:

```
┌───────────────────────────────┬─────────────────────────────────────┐
│ 05 / Contato                  │                                     │
│                               │  ┌─────────────────────────────┐    │
│ Conta a ideia.                │  │ 💬 Falar no WhatsApp →      │    │
│ Eu respondo em até            │  │    RESPOSTA EM ATÉ 24H      │    │
│ 24 horas.                     │  └─────────────────────────────┘    │
│                               │                                     │
│ Aceitando 2 projetos este     │  Se o WhatsApp não abrir,           │
│ trimestre. Mande um           │  copie: +55 31 98737-3513           │
│ WhatsApp com o que precisa    │                                     │
│ fazer — eu volto com prazo    │  OUTROS CANAIS                      │
│ e plano.                      │  [LinkedIn] [GitHub] [Instagram]    │
└───────────────────────────────┴─────────────────────────────────────┘
─────────────────────────────────────────────────────────────────────
                          O QUE DIZEM
   ┌──────────┐    ┌──────────┐    ┌──────────┐
   │  card    │    │  card    │    │  card    │
   └──────────┘    └──────────┘    └──────────┘
```

- Esquerda (col 1-5): título + lead alinhados à esquerda, baseline alinhado ao topo
- Direita (col 7-12): CTA + fallback + outros canais
- Depoimentos: row inferior full-width, grid 3-col desktop, snap-x mobile

### 7.4. Mobile

Single column. Título → lead → CTA full-width → fallback → outros canais → depoimentos snap-x.

### 7.5. Animações

Reveal padrão. CTA hero com glow via pseudo `::after` (transform-only, NÃO box-shadow).

Linha mono rotativa: clip-path mask-reveal a cada 4.5s.

`prefers-reduced-motion`: linha mono trava no primeiro item, sem rotação. Glow desliga. Magnetic desliga.

### 7.6. Semântica e a11y

Igual v1 §6.6 + foco visível double-ring no CTA hero (visível sobre qualquer fundo).

### 7.7. Componentes técnicos

```
src/components/contact/
├── Contact.tsx
├── ContactCTA.tsx              # client (magnetic, glow pseudo, mono rotativa)
├── ContactFallback.tsx
├── OtherChannels.tsx
├── Testimonials.tsx            # early-return se < 1 depoimento E `noindex` ativo
└── TestimonialCard.tsx
```

### 7.8. Critérios de aceite

- [ ] Layout assimétrico desktop (`[5fr][7fr]`), single-column mobile
- [ ] CTA duas-camadas com Camada 2 rotativa entre 3 strings a cada 4.5s
- [ ] Verde `--whatsapp` aparece SÓ no ícone + linha mono, não no fill do botão
- [ ] Glow do CTA via pseudo `::after` transform/opacity, não box-shadow
- [ ] Magnetic raio 150px damping 0.16
- [ ] Fallback inline sempre visível (não condicional)
- [ ] Email **não** aparece em lugar algum
- [ ] Depoimentos: ≥ 2 antes de deploy público OU `noindex`
- [ ] Toggle PT/EN troca todos os textos via rota
- [ ] Foco double-ring visível sobre fundo accent/whatsapp
- [ ] `prefers-reduced-motion` desliga glow + rotação mono + magnetic

---

## 8. Plano de implementação revisado (B + Agent 10)

### 8.1. Fases revisadas

```
T-7d: F-Content (track paralelo, owner César, não-dev)
  - Pedir 2 depoimentos via WhatsApp a clientes anteriores (15min)
  - Confirmar URLs públicas + screenshots HD dos 6 projetos
  - Bater foto profissional ou agendar (R$300-800)
  - Rascunho EN dos textos finais (Hero, Trabalho, Princípios, Contato)

PRE-F0: Spike (2h)
  - Branch throwaway. Criar Next 15 + Tailwind 4 + Geist + motion num projeto vazio.
  - Validar: @theme funciona, Geist subset latin, motion LazyMotion strict bundle math.
  - Sem isso, F1 vira sessão de 4h debugando.

F0+F1 (merged, 10h): Limpeza + Upgrade
  - Remove componentes legado (6 arquivos), mario.gif, project-image.jpg, /api/hello, scrollbar.css
  - Remove Meta Pixel
  - Next 13.4 → 15
  - Tailwind 3 → 4 (CSS-first @theme)
  - React 18 → 19 (peer)
  - lucide-react 0.263 → ≥ 0.460
  - Remove react-scroll
  - ESLint 9 flat config
  - Geist + Geist Mono via next/font

F2 (6h): Fundamentos
  - tokens CSS (paleta v2, tipografia v2 Geist-tuned, espaços, radius escala, border tripla)
  - reset + globals.css (incluindo safety net reduce-motion + double-ring focus-visible)
  - motion lib instalada com pattern travado
  - easings globais (--ease-out + --ease-out-quint)
  - aurora drift no <body>::before
  - breathing eyebrows global
  - **Husky + lint-staged pré-commit hook** (Meta-5): roda `tsc --noEmit` + `next lint` em arquivos staged. Setup ~15min, payback no commit #3, +15% velocity ao longo de F3-F8. Evita CI round-trip de 6min por regressão de tipo.

F3 (12h): Layout shell
  - app/[locale]/layout.tsx (i18n route-based)
  - Header (5 nav items, toggle PT|EN como links de rota, CTA inline)
  - Footer (border-top, sociais, toggle rota)
  - WhatsAppButton flutuante (transform-only glow, magnetic 80/0.14)
  - Skip link como primeiro <a>
  - middleware redirect / → /pt + Accept-Language negotiation
  - dictionaries pt.ts + en.ts com type-safe DeepKeyOf
  - CI check de paridade de chaves PT/EN

F4 (4h, paralelo a F3): SEO + assets
  - generateMetadata por locale
  - opengraph-image dinâmica
  - sitemap, robots, icons
  - JSON-LD Person
  - dns-prefetch + preload featured

F5/F6/F7+/F8 (paralelos após F3, branches separadas):
  F5 (8h): Hero (assimétrico, cursor blink, magnetic, text-mask)
  F6 (10h): Projetos (rows com section-number tick + parallax rAF)
  F8 (5h): Contato (CTA duas-camadas, mono rotativa, glow pseudo)
  F7 (8h, fora rota crítica): Trabalho (foto split-tone, bullets numerados)

F-Princípios (3h, depois de F2): seção nova entre Trabalho e Contato

F9: Gate por PR (a11y/perf/Lighthouse axe-core via Playwright)

F10 (2h): Deploy Vercel + smoke test
  - Critério deploy: ≥ 2 depoimentos coletados, ≥ 4 projetos com URL confirmada, foto pronta
  - Se não, deploy com noindex como beta privado

F11 (post-launch): EN i18n production-grade quando primeiro lead internacional aparecer (B secondary se ativa)
F12 (post-launch): Seção Trabalho retorna ao MVP (foto pronta, bio, "Como entrego", Stack completa)
F12.1 (post-launch): Diário de bordo público com timestamps de commit reais (Meta-2 — honesty positiva)
F13 (post-launch, ICP-driven): cases Stripe/PIX integration — founders BR pedem
```

**Tempo total estimado:** ~71h base + 30% buffer = ~92h ≈ 3 semanas focadas (30h/sem).

### 8.2. Bloqueadores conhecidos

| Bloqueador | Severidade | Bloqueia | Mitigação |
|------------|-----------|----------|-----------|
| Foto profissional | MED | F7 só | Placeholder com iniciais "CA" + shimmer; lançar sem F7 |
| Depoimentos ≥ 2 | **HIGH** | Deploy público | F-Content T-7d, fallback `noindex` se não coletar |
| URLs/screenshots projetos | **HIGH** | F6 | F-Content T-7d |
| Copy EN final | MED | F3+F5+F7+F8 | F-Content semana 2 |

### 8.3. Decisões irreversíveis flagged

- Trocar de cookie i18n pra route-based: **não-trivial reverter** (estrutura de rotas muda)
- Drop Lenis: trivial reverter se cliente reclamar do feel
- Renomear "Sobre" → "Trabalho": trivial
- Adicionar Princípios: trivial reverter

---

## Apêndice A — Glossário

- **CTA**: Call-to-action
- **Eyebrow**: rótulo pequeno acima do título (mono uppercase)
- **Lead**: parágrafo de abertura abaixo do título
- **Magnetic**: efeito onde botão "puxa" o cursor
- **Reveal on scroll**: animação ao entrar na viewport
- **Stagger**: delay incremental entre elementos
- **Aurora drift**: gradient muito sutil em loop ambient
- **Breathing**: opacity oscilando 0.55↔0.75
- **Section-number tick**: animação dígito-por-dígito ao revelar
- **Section featured**: projeto destacado
- **F-Content**: track paralelo de produção de conteúdo (não-dev)

## Apêndice B — Referências

- linear.app — typography, mono eyebrows numerados, 1 accent
- vercel.com — Geist, minimalismo radical
- ahmadshadeed.com — voz autoral em portfolio dev
- maxwellbarvian.com — manifesto curto + foto editorial
- (a expandir conforme decisões)

## Apêndice C — Reviews fonte

- `reviews/00-consolidated-changes.md` — síntese
- `reviews/01-taste-critique.md` — score 5.6/10, 8 default-LLM flags
- `reviews/02-visual-fundamentals.md` — paleta + escala matemática
- `reviews/03-typography.md` — Geist validação + letter-spacing tuning
- `reviews/04-motion.md` — drop Lenis, calibração magnetic
- `reviews/05-copy.md` — 7 melhorias copy + fallback WA
- `reviews/06-stack.md` — migração 18-26h, bundle 95-114 KB
- `reviews/07-a11y-perf.md` — contrast bug, INP risk, double-ring
- `reviews/08-i18n.md` — switch to route-based recomendado
- `reviews/09-stitch-premium.md` — assimetria, micro-motion perpétuo
- `reviews/10-pm-risk.md` — phase reorder, F-Content, MVP scope
