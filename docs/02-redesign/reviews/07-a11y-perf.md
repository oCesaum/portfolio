---
title: "Revisão 07 — A11y + Performance"
tipo: "review"
status: "rascunho"
owner: "agente-07"
escopo: "WCAG 2.1 AA + Core Web Vitals"
spec_revisada: "docs/02-redesign/portfolio-redesign-spec.md"
secoes_lidas: ["§1.1–§1.10", "§2.8", "§2.9", "§3", "§4", "§5", "§6"]
atualizado_em: "2026-05-06"
---

# Revisão 07 — Acessibilidade & Performance

Auditoria do spec contra WCAG 2.1 AA e metas de Core Web Vitals declaradas em §2.9. Foco operacional: o que passa, o que falha, o que mitigar antes de F9.

---

## 1. Auditoria de contraste

Cálculo via fórmula relativa de luminância (WCAG 2.x), todas as cores sobre `--background #0a0a0a` (L ≈ 0.00304).

| Token | Hex | Luminância | Ratio vs `#0a0a0a` | Classificação | Uso permitido |
|-------|-----|------------|-------------------|---------------|---------------|
| `--foreground` | `#fafafa` | 0.9793 | **19.4 : 1** | AAA | Qualquer texto |
| `--foreground-muted` | `#a1a1a1` | 0.3515 | **7.57 : 1** | AAA | Qualquer texto (corpo OK) |
| `--foreground-subtle` | `#525252` | 0.0843 | **2.53 : 1** | **FAIL** (abaixo de 3:1) | Nem texto grande passa |
| `--accent` | `#d4b896` | 0.5049 | **10.46 : 1** | AAA | Qualquer texto |
| `--accent-strong` | `#e8d4b8` | 0.6771 | **13.71 : 1** | AAA | Qualquer texto |
| `--accent-emphasis` | `#f5e6cc` | 0.8039 | **16.10 : 1** | AAA | Qualquer texto |
| WhatsApp `#25d366` | — | 0.4796 | **9.99 : 1** vs `#0a0a0a` | AAA (fundo) | Texto branco SOBRE verde = **2.85 : 1 → FAIL** |

### Achados que invalidam o spec

1. **§2.8 declara `#525252` em 3.6:1 — incorreto. O valor real é 2.53:1**, abaixo do mínimo 3:1 mesmo para texto grande/non-text. Falha AA universal.
2. Spec usa `--foreground-subtle` em pontos de leitura: stack inline do hero (§3.2 - body-sm 14px), indicadores do contato (§6.2), número de seção em rows de projeto (§4.3 14px), aspas do depoimento (Mono 32px), números mono dos rows. Todos falham AA exceto a aspa de 32px (que ainda é decorativa).
3. **CTA WhatsApp:** texto/ícone branco `#fff` sobre fundo `#25d366` = 2.85:1. Falha AA mesmo para large-text. Mitigar com texto `#0a0a0a` ou usar accent bege como CTA primário e relegar verde só ao botão flutuante com label off-canvas.
4. `--accent #d4b896` como cor de outline `:focus-visible` (§2.8) sobre cards `--background-elevated #111` — 9.7:1, OK. Sobre o próprio CTA WhatsApp o foco vira ~1.05:1, **inviável**: focus do CTA precisa de cor diferente (ex.: `--foreground` ou ring duplo branco/preto).

### Substituições recomendadas

| Onde | Trocar de | Para | Motivo |
|------|-----------|------|--------|
| Stack inline body-sm hero | `--foreground-subtle` | `--foreground-muted` | 7.57:1 AAA |
| Número de seção rows | `--foreground-subtle` | `#737373` (4.6:1) ou muted | AA pass |
| Indicadores contato | `--foreground-subtle` | `--foreground-muted` | AA |
| Texto botão WhatsApp | `#fff` sobre `#25d366` | `#0a0a0a` sobre `#25d366` (12.46:1) | AAA |
| Foco do CTA WhatsApp | `--accent` | Ring duplo `--foreground` 2px + offset preto 2px | Garante visibilidade |

Manter `--foreground-subtle` apenas em **non-text** (borders, dividers) e em rótulos uppercase de 11px considerados decorativos com `aria-hidden="true"`.

---

## 2. Reduced motion — completude

Spec menciona `prefers-reduced-motion` em §1.5, §2.8, §3.5, §4.5, §5.6, §6.5 (seis pontos, não quatro — cobertura razoável). Mas há lacunas:

### Bug 1 — Pulse do dot verde
§3.5 diz "dot pulse desliga (fica em opacity 1 sólido)", porém §6.2 reusa o mesmo dot nos indicadores de contato e §6.5 só lista glow/magnetic/mask como desligados. **O dot dos indicadores continua pulsando com reduce on.** Padronizar: pulse global desativado.

### Bug 2 — Lenis em "no smooth"
§1.5 e §2.8 dizem "mantém Lenis em modo no-smooth". §6.5 troca o termo para `smoothTouch: false`, que é outra coisa (só desativa em touch). Lenis precisa `smoothWheel: false` + `lerp: 1` ou desmontar instância. O spec atual deixaria smooth ativo com reduce on — **viola SC 2.3.3 Animation from Interactions**.

### Bug 3 — Loop de glow no CTA hero & shimmer da stack
§6.5 desliga glow do CTA hero, mas o **glow shadow do botão flutuante (§2.3)** não tem cláusula reduce. §5.6 desativa shimmer no header de stack, porém o spec não toca no `text-shimmer` global se for reaproveitado em outras seções. Adicional: pad accent que translada no hover da foto (§5.6) só fala em hover, não em reduce — usuário com reduce + hover ainda vê translação 16px.

### Bug bônus
§3.5 anima `clip-path` no título via reduce-pulando-sequence, mas em browsers antigos sem suporte a `clip-path` o fallback não está descrito. Sem fallback, o título pode ficar invisível com `clip-path: inset(0 0 100% 0)` permanente.

**Recomendação:** uma media-query global com `*, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }` como rede de segurança, complementando os opt-ins por componente.

---

## 3. Focus-visible — caminho pelo teclado

Outline 2px solid `--accent` offset 2px é OK em superfícies escuras (10.46:1) mas tem 4 problemas no fluxo Hero → Projetos → Sobre → Contato:

| Etapa | Problema | Severidade |
|-------|----------|------------|
| Hero | CTA primário tem fundo `--accent` no estado default → outline `--accent` desaparece | Alta |
| Hero → Projetos (skip âncora) | "Ver projetos ↓" rola para `#projetos`, mas header sticky 64px cobre o `<h2>` se não houver `scroll-margin-top` (spec menciona offset 80px só para o JS, não no CSS) | Média |
| Projetos | `<article>` com `tabindex="-1"` (§4.6) é bom para skip futuro, mas hoje o foco pula direto para o link interno; ícone `MessageCircle` decorativo precisa `aria-hidden="true"` (não está dito) | Baixa |
| Sobre → foto | Foto não é focável; pad accent decorativo OK | — |
| Contato → CTA hero | Foco offset 4px sobre `--whatsapp` verde com cor `--accent-emphasis`: ratio entre bege claro e verde ≈ 1.7:1 → **invisível** | Alta |
| WhatsApp flutuante | z-index 60, sempre visível; mas fica ANTES do header no tab order natural se montado no fim do DOM (children do `<body>`). Com `Tab` partindo do skip-link, usuário pode atingir o flutuante depois do footer e voltar — ordem inconsistente | Média |
| Drawer mobile | Focus trap mencionado (§2.1), mas não há menção de **retornar foco ao hambúrguer ao fechar** — armadilha de foco residual | Média |

Sem focus-traps explícitos fora do drawer. O risco real é foco invisível em superfícies coloridas. **Mitigação:** aplicar padrão `outline: 2px solid var(--foreground); outline-offset: 2px; box-shadow: 0 0 0 4px var(--background);` em `:focus-visible` — funciona em qualquer fundo (técnica "double-ring").

---

## 4. Skip link × header sticky × Lenis

Spec só diz "skip link visível em :focus, ancorado em `<main id='main'>`" (§2.8). Casos de borda:

1. **Offset do header sticky (64px desktop / 56px mobile):** ao ativar skip, scroll vai para o topo do `<main>` e o header sobrepõe a primeira linha do hero. Solução: `#main { scroll-margin-top: 80px; }` e `:target` styling.
2. **Lenis intercepta `scrollIntoView`:** Lenis substitui o scroll nativo. Se o skip link usa `<a href="#main">` puro, Lenis pega o evento e faz transição de 1.2s — usuário com reduce-motion ainda vê a animação. Precisa chamar `lenis.scrollTo('#main', { immediate: prefersReduce })`.
3. **Skip link em modo i18n com cookie:** ao trocar PT↔EN há `revalidatePath`, e o skip link fica re-renderizado depois do toggle — risco de perder foco. Reaplicar foco ao primeiro elemento focável após hidratação.
4. **Skip link e botão flutuante:** se o WA flutuante estiver no DOM antes do `<main>`, Tab natural pula skip → flutuante → header → main. Skip link **deve ser o primeiro `<a>` dentro do `<body>`**, antes do header.
5. **Lenis carregado lazy (§2.9):** entre o primeiro paint e a hidratação do Lenis, o skip link funciona com scroll nativo. Após Lenis montar, a função muda. Resultado pode ser inconsistente entre dois cliques rápidos.

---

## 5. Realismo do orçamento de performance

### LCP < 2.0s com Geist + Geist Mono via `next/font`
**Viável**, com ressalvas. `next/font` self-hospeda, faz subset latin (spec já pede), inline `@font-face`. LCP-element é o `<h1>` (texto), não imagem. O risco real é o **text-mask reveal de §3.5 ocupando 800ms de delay** — LCP é o primeiro paint do texto após `clip-path` abrir, então delay 250+800 = 1050ms só de animação. Em 3G simulado, FCP gira em torno de 1.3-1.5s; LCP fica colado em 2.0-2.3s. Marcar `<h1>` com `font-display: optional` ajuda, mas o `clip-path` é o gargalo. **Mitigação:** usar `content-visibility` + revelar título com opacity simples se conexão lenta (Network Information API).

### Bundle < 150KB gzip — breakdown estimado

| Pacote | gzip estimado |
|--------|---------------|
| React + Next runtime (App Router) | 78 KB |
| `motion` (subset `motion/react` + `useScroll`/`useTransform`/`useSpring`) | 22-28 KB |
| `lenis` (carregado lazy, fora do first-load se atrasado) | 4 KB |
| i18n custom (~80 linhas + dicionários) | 3-5 KB |
| `lucide-react` tree-shaken | 6-10 KB (depende dos ícones usados) |
| App code (Hero, Projects, About, Contact + UI) | 18-25 KB |
| **Total realista (sem lenis no first-load)** | **131-150 KB** |

**Risco:** se Lenis não for atrasado para após `requestIdleCallback`, total beira 154 KB. Importar `motion/react` específico é crucial — o bundle inteiro de motion bate 60+ KB. **Provavelmente passa, mas com 5KB de margem.** Adicionar análise via `@next/bundle-analyzer` em CI.

### INP < 200ms — interação mais arriscada

Magnetic CTA (§2.3 e §6.5). Cálculo: `mousemove` dispara 60+/s, cada evento exige `getBoundingClientRect` + cálculo de distância + `useSpring` update. Sem `requestAnimationFrame` throttle, INP de 250-350ms é comum. **Mitigação:** rAF throttle + `pointer-events: none` no halo + `will-change: transform`.

Parallax (§4.5) é menos arriscado porque `useScroll` do motion já throttla. Mas combinar parallax × magnetic × Lenis num mesmo viewport pode estourar o budget de 200ms — recomendo desligar magnetic enquanto a viewport está scrollando (estado idle).

### CLS < 0.05 — onde mora o risco

1. **Text-mask reveal do hero:** `clip-path` não causa reflow, OK.
2. **Pílula de disponibilidade:** dot pulse muda `box-shadow`, sem layout shift, OK.
3. **Foto de §5.4:** spec garante `aspect-ratio`, OK — mas `loading="lazy"` no LCP-area se o usuário rolar rápido pode shift o pad accent atrás.
4. **Featured thumbnail (§4.3):** `aspect-ratio` 16:10 está sugerido mas não obrigatório no spec. Sem isso, CLS sobe quando AVIF/WebP carregam.
5. **Toggle PT/EN:** PT "Falar no WhatsApp" tem 19 chars; EN "Message on WhatsApp" tem 20. Quase neutro, OK. Mas "Resposta em até 24h" (PT 19c) vs "Reply within 24h" (EN 16c) muda largura dos indicadores → leve CLS na linha do contato.
6. **Header sticky aparece após scroll > 80px:** o fade-in 200ms muda `border-bottom` — não causa shift se posicionado `fixed`, mas se `sticky` o body ganha border. Confirmar `position: fixed`.

CLS provável: 0.02-0.04 se `aspect-ratio` aplicado em **todas** thumbs e foto; 0.07+ se faltar em alguma.

---

## 6. Top 5 riscos (impacto decrescente)

| # | Risco | Impacto | Mitigação 1-linha |
|---|-------|---------|-------------------|
| 1 | `--foreground-subtle` 2.53:1 usado em texto pequeno (stack, indicadores, números) | Falha AA universal; perde Lighthouse a11y ≥ 95 | Substituir por `--foreground-muted` em todo texto < 18px / não-decorativo |
| 2 | Texto branco sobre `#25d366` no CTA WhatsApp = 2.85:1 | Falha AA no único CTA da página | Trocar texto para `#0a0a0a` (12.46:1) ou usar accent bege como CTA primário |
| 3 | Magnetic CTA + parallax + Lenis simultâneos → INP > 200ms | Quebra meta CWV; afeta SEO | rAF throttle + suspender magnetic durante scroll ativo |
| 4 | Lenis em "smoothTouch" não cobre reduce-motion corretamente | Viola WCAG SC 2.3.3 | `lerp: 1` + `smoothWheel: false` quando `prefers-reduced-motion: reduce` |
| 5 | Foco invisível sobre superfícies coloridas (CTA accent, CTA WhatsApp) | Bloqueia usuário keyboard-only | Padrão double-ring `outline + box-shadow` neutro |

---

## 7. Três quick-wins ausentes no spec

1. **CSS `:focus-visible` global double-ring** — uma regra única no `globals.css` com `outline: 2px solid var(--foreground); outline-offset: 2px; box-shadow: 0 0 0 4px var(--background);` resolve risco #5 e poupa redefinições por componente. Custo: 6 linhas.

2. **`@media (prefers-reduced-motion: reduce)` blanket** no `globals.css` zerando `animation-duration` e `transition-duration` para `*`, complementando opt-outs por componente. Cobre todos os bugs da seção 2 com uma única safety net. Custo: 8 linhas.

3. **`<link rel="preconnect">` + `<link rel="preload" as="image">` para a thumb do Featured (DOM Comparator)** — Featured é o segundo elemento mais visível após hero, e seu thumb 960w pode virar LCP em viewports altas. Preload corta 200-400ms da entrega. Combinar com `fetchpriority="high"` em `next/image priority`. Custo: 2 atributos.

Bônus (4º): adicionar `Speculation Rules` (`<script type="speculationrules">`) para prefetch de `wa.me/...` — embora seja externo, pré-conexão DNS via `<link rel="dns-prefetch" href="https://wa.me">` corta 100-200ms na primeira ida ao WhatsApp.

---

## Apêndice — fórmula usada

Luminância relativa WCAG: `L = 0.2126*R + 0.7152*G + 0.0722*B`, onde cada canal é linearizado por `c = ((c+0.055)/1.055)^2.4` (para `c > 0.03928`). Ratio = `(L1 + 0.05) / (L2 + 0.05)`. Valores conferidos manualmente; convém validar em F9 com `axe-core` ou `pa11y` no CI.
