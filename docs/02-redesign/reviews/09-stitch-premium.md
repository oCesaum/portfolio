---
title: "Review 09 — Stitch premium audit"
tipo: "review"
status: "rascunho"
owner: "agente-09"
atualizado_em: "2026-05-06"
escopo: "portfolio-redesign-spec.md (Bloco 3 + Seções 3 a 6)"
referencia: "https://stitch.withgoogle.com/"
veredicto: "FLAG"
---

# Review 09 — Stitch premium audit

Audit aplicando a filosofia Google Stitch (tipografia calibrada, cor justificada, layout assimétrico, micro-motion perpétuo, performance hardware-accelerated) sobre o spec atual.

## 1. Layout asymmetry audit

O spec abusa de `text-align: center`: Hero (§3.3), Sobre/Stack (§5.3), Contato inteiro (§6.3) e os indicadores. Stitch trata simetria como default genérico — distinção nasce de eixos deslocados. Três trocas concretas:

1. **Hero (§3.3) — abandonar coluna centrada.** Hoje todo bloco vive num único eixo central. Mover para grid 12-col com **título no col 1–8** e **lead + CTAs no col 7–12** com offset vertical de 96 px. Eyebrow `01 / Início` vira ancora vertical na lateral esquerda (rotacionada 90° em mono 11 px tracking 0.18em, como label técnico de blueprint). Resultado: lê-se em "Z assimétrico" — o olho cai do título grande para o CTA em diagonal, não em pilha de igreja.
2. **Contato (§6.3) — quebrar simetria do CTA hero.** Substituir bloco centralizado por grid `[5fr][7fr]`: título e lead no col 1–5 alinhados à esquerda, CTA + indicadores ocupando col 7–12 com baseline alinhado ao topo do parágrafo (não ao centro). O CTA deixa de parecer "boa-vinda do site cristão" e ganha peso de assinatura editorial.
3. **Sobre (§5.3) — desalinhar a foto.** Spec diz `position: sticky; top: 96px` num grid 1.05/0.95. Empurrar a foto para `col 8–12` com `translateY(48px)` permanente e o pad `--accent` saindo no canto inferior esquerdo (não superior direito padrão). Cria tensão visual sem custo de produção.

## 2. Perpetual micro-motion check

O spec só anima na entrada (reveal one-shot §1.5) e no dot da pílula (§3.5). Sem scroll/hover, a página congela — Stitch chama isso de "morte clínica". Duas micro-motions perpétuas que não distraem:

1. **Aurora drift no `--background`.** Camada `::before` em `<body>` com `background: radial-gradient(800px at 30% 20%, rgba(212,184,150,0.025), transparent 60%)`. Animar via `transform: translate3d()` num loop de 18s `--ease-in-out` infinito (deslocamento ≤ 6%). Opacidade ≤ 0.025 garante que olho não pega — sente-se sem ver. Hardware-accelerated (transform-only).
2. **Eyebrow numerais "respirando".** Os labels mono `01 / Início`, `02 / Projetos` ganham `opacity: 0.55 ↔ 0.75` em loop de 3.6s `cubic-bezier(0.45,0,0.55,1)`, dessincronizado por seção (delays 0/900/1800/2700ms). Mantém a página viva mesmo sem scroll. Sob `prefers-reduced-motion`: trava em 0.65.

## 3. Color calibration audit — 3 tokens mais frágeis

1. **`--background-overlay: #161616` (§1.2).** Defendido como "hover/active de superfície" mas o spec quase não usa hover de superfície (cards usam border-glow §1.9, rows usam `--background-elevated`). Token órfão. **Ação:** remover, ou redefinir como `color-mix(in oklch, var(--background-elevated) 92%, var(--accent) 8%)` para virar único hover quente, distinguível.
2. **`--accent-emphasis: #f5e6cc` (§1.2).** Justificado como "texto sobre escuro alta importância", mas o spec só cita uma vez (foco do CTA hero §6.6). Para 1 uso, é luxo desnecessário. **Ação:** ou remover e usar `--accent-strong`, ou amplificar uso (atribuir a `<h1>` em hover de seções, à inicial dropcap dos parágrafos da bio §5.2, ou ao numeral de seção que atinge `--accent` no hover §4.5).
3. **`--border` vs `--border-strong` (§1.2).** Dois tokens, gradiente arbitrário 0.08 → 0.16. Stitch exige escala calibrada. **Ação:** redefinir como tripla OKLCH `--border-1: oklch(100% 0 0 / 0.06)`, `--border-2: 0.12`, `--border-3: 0.20` com regra de uso documentada (1 = divisores estruturais, 2 = cards default, 3 = hover/focus). Cria escada, não par binário.

## 4. Generic vs distinguished — score 0–10

| Seção | Score | Racional |
|-------|-------|----------|
| Hero (§3) | **5** | Texto centralizado, single-column, sem foto, sem visual. É "Vercel-tier" assumido — funciona, mas é o template AI-genérico de 2026. |
| Projetos (§4) | **8** | Featured + rows numeradas com parallax e hover de número virando accent é forte. Linear-style. Distinto. |
| Sobre/portrait (§5.4) | **7** | Grayscale → cor no hover + pad accent deslocado é bom. Mas pad some no mobile e o crop 4:5 é convencional. |
| Contato CTA (§6.3) | **4** | Bloco centralizado com título grande + botão verde gigante + 3 chips. Pode estar em 600 portfólios na Awwwards. |

## 5. Anti-generic enhancements (seções < 7)

**Hero (§3) — score 5 → alvo 8:** abandonar centralização (vide §1.1 deste review) e adicionar **assinatura cinética**: o título `display-1` ganha um cursor mono `▌` piscando após "caminho." que troca de glifo a cada 4s entre `▌`, `_`, `·` — referência a editor de texto, reforça identidade dev sem virar terminal-cliché. Custo: 1 componente client de ~30 linhas, reduce-motion trava em `▌`.

**Contato CTA (§6.3) — score 4 → alvo 8:** trocar pílula verde gigante por **botão de duas camadas tipográficas**. Camada 1: `Falar no WhatsApp` em Geist 18 px peso 600. Camada 2 (abaixo, mono 11 px tracking 0.18em cor `--accent`): texto rotativo perpétuo entre `RESPOSTA EM ATÉ 24H`, `BRASIL · UTC−3`, `DISPONÍVEL AGORA` — troca a cada 4.5s com mask-reveal (clip-path inset, 600ms). Alinha CTA à esquerda do grid (vide §1.2 deste review). Mantém a cor `--whatsapp` mas no ícone + na linha mono apenas, não no fill inteiro — o botão passa a ser "linha de informação que age", não "balão de chat gigante".

## 6. Hardware acceleration audit

Animações no spec que tocam propriedades não-aceleradas:

| Local | Propriedade animada | Substituição |
|-------|---------------------|--------------|
| Halo do dot (§3.5) | `box-shadow: 0 0 0 0 → 0 0 0 8px` | Trocar por pseudo-elemento `::after` com `transform: scale(1) → scale(2.4)` + `opacity: 0.5 → 0`. Aceitável manter `box-shadow` se for **único** loop, mas não escala se replicado. |
| CTA hero glow pulse (§6.5) | `box-shadow: 0 0 0 0 → 0 0 0 12px rgba(...)` | Pseudo `::after` absoluto, mesmo bounding box, `transform: scale(1) → scale(1.18)` + `opacity: 0.5 → 0`. Composite-only. |
| CTA hero hover (§6.5) | `padding-inline cresce 4px` em 250ms | Trocar por `transform: scaleX(1.025)` no wrapper (com `transform-origin: center`) — mantém retângulo aparente sem reflow. |
| WhatsApp flutuante hover (§2.3) | "expande pra `auto x 56px`" (largura) | Renderizar label sempre presente com `opacity: 0` + `transform: translateX(-8px) scaleX(0)` (origin-right), animar para `opacity:1; translateX(0) scaleX(1)`. Botão muda de tamanho via transform, não via `width: auto`. |
| Header underline nav (§2.1) | `transform: scaleX` | **Já correto.** Manter. |
| Foto Sobre hover (§5.6) | `filter: grayscale` 600ms | Filter **não** é composite-friendly (recompositing layer). Substituir por dois `<img>` empilhados: top em grayscale (CSS `filter: grayscale` aplicado estático) com `opacity: 1 → 0` no hover, bottom colorido visível por baixo. Anima opacity puro. |
| Pad accent translação (§5.6) | `translate +12,+12 → +16,+16` | **Já é transform.** OK. |
| Reveal on scroll genérico (§1.5) | `translateY(20px)` | OK, é transform. |

## 7. Final verdict — **FLAG**

Não passa direto, não bloqueia. O spec acerta os fundamentos mensuráveis (tipo, perf budget §2.9, easing único §1.7, accent solo §1.2) — base sólida no padrão Linear/Vercel. Mas falha no que diferencia Stitch de "AI-generated minimal 2026": layout assimétrico (Hero e Contato são pilhas centradas), micro-motion perpétuo (página congela fora de scroll/hover), tokens de cor com par órfão (`--background-overlay`, `--accent-emphasis`), e três animações usando `box-shadow`/`width`/`padding` que vão custar repaint em mobile médio. Aplicadas as três trocas de eixo da §1, as duas micro-motions da §2, a calibração tripla de borders da §3 e os swaps de §6, o portfólio sai de "competente e seguro" para "premium e distinguível" — sem ferir o critério `var(--space-section)` nem o budget de 150 KB. **Recomendação: incorporar correções antes da F2 (Fundamentos) para que tokens e regras já nasçam calibrados; correções de layout/motion entram em F5 e F8.**
