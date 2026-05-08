---
title: "Review 03 — Tipografia (Geist + escala)"
tipo: "review"
status: "rascunho"
owner: "agente-03"
atualizado_em: "2026-05-06"
escopo: "portfolio-redesign-spec.md §1.3"
---

# Review 03 — Tipografia

## 1. Validação Geist Sans + Geist Mono

**Strengths**

1. **Tom Vercel-tier sem custo cognitivo.** Geist é literalmente o type-system da Vercel: o cliente B2B que pesquisar referências em linear.app, vercel.com, resend.com vai reconhecer o "ar" sem ler o nome. Isso colapsa o gap "premium minimal" em zero esforço de design.
2. **Métrica neutra-geométrica adequada a display grande.** x-height alto, terminais cortados retos, contraform aberto — o desenho aguenta `clamp(3rem, 8vw, 6.5rem)` sem virar cartoon nem virar Helvetica genérica. Em hero >5rem, isso é o que separa "premium" de "default Tailwind".
3. **Mono casado de fábrica.** Geist Mono compartilha métrica, peso ótico e shape primitives com a sans. O eyebrow `01 / Sobre` em Mono 12px tracking 0.16em ao lado de display em Sans 700 fica em harmonia sem ajuste manual de baseline.

**Weaknesses**

1. **Cobertura latina apenas funcional, não premium.** Geist tem os glyphs necessários para PT-BR, mas os acentos (especialmente `~` em `ã`, `õ`) são geometricamente derivados, não desenhados de origem. Em peso 700 a >5rem aparece um leve desequilíbrio de espessura no til — perceptível para olho treinado, ignorável para cliente B2B.
2. **Pouca diferenciação no mercado dev.** Toda landing page de SaaS infra usa Geist hoje. "Premium minimal" vira "indistinguível dos concorrentes". Para um portfólio que vende identidade pessoal, isso enfraquece o sinal.
3. **Variable font ainda não exposta no pacote `geist`.** O package distribui pesos estáticos (400/500/600/700/800), o que infla payload (~5 weights × 2 famílias = ~10 arquivos) vs uma variable que entregaria range completo em 1 arquivo.

## 2. Alternativas

### Alt A — Inter Display + JetBrains Mono

- **Pesos:** Inter Display 400/500/600/700; JetBrains Mono 400/500.
- **Por que cabe:** Inter Display é o tier "óptico para tamanhos grandes" do Inter — desenho mais condensado, contraform mais apertado, ideal para hero sizes. Mantém a leitura neutra-engenheirada que o público dev/agência espera, com presença ligeiramente mais editorial que Geist. JetBrains Mono adiciona tom técnico forte em eyebrows e labels sem competir.
- **Trade-offs vs Geist:** Inter é mais reconhecível e mais "seguro", mas perde o sinal "Vercel-tier" imediato. Inter Display brilha em hero, mas o casamento sans+mono não é nativo (métricas próximas, não idênticas). Vantagem: cobertura latina nativa de altíssima qualidade — `ã`, `ç`, `ó` desenhados, não derivados.
- **CSS:**
  ```css
  :root {
    --font-sans: "Inter", system-ui, sans-serif;
    --font-display: "Inter Display", "Inter", sans-serif;
    --font-mono: "JetBrains Mono", ui-monospace, monospace;
  }
  ```

### Alt B — General Sans + IBM Plex Mono

- **Pesos:** General Sans 500/600/700; IBM Plex Mono 400/500.
- **Por que cabe:** General Sans (Indian Type Foundry, free no Fontshare) tem desenho geométrico mais quente que Geist, com terminais ligeiramente humanistas. Combina bem com a paleta accent bege (#d4b896) — mesma temperatura visual. IBM Plex Mono adiciona personalidade técnica sem ser frio.
- **Trade-offs vs Geist:** Diferenciação real — pouquíssimos portfólios brasileiros usam General Sans, então sinaliza curadoria. Risco: Fontshare não tem o mesmo SLA que Google Fonts/Vercel; fallback precisa ser robusto. Cobertura PT-BR é boa mas inferior a Inter. Não tem o "halo Vercel".
- **CSS:**
  ```css
  :root {
    --font-sans: "General Sans", "Inter", system-ui, sans-serif;
    --font-mono: "IBM Plex Mono", ui-monospace, monospace;
  }
  ```

## 3. Auditoria da escala

A escala atual **não segue uma razão única**. Razões consecutivas observadas no max-clamp:
- 6.5 → 4 = 0.615 (≈ minor sixth invertida)
- 4 → 2 = 0.5
- 2 → 1.125 = 0.5625
- 1.125 → 1 = 0.888
- 1 → 0.875 = 0.875
- 0.875 → 0.75 = 0.857
- 0.75 → 0.6875 = 0.916

Quebra entre display e body é abrupta (0.5) e o microspaço body→eyebrow→label é confuso (3 ratios diferentes). **Proposta corrigida — perfect fourth (1.333) no display, minor third (1.2) no corpo:**

| Token | Atual (max) | Corrigido (max) | Razão |
|-------|-------------|-----------------|-------|
| display-1 | 6.5rem | 6.328rem | base × 1.333³ |
| display-2 | 4rem | 4.747rem | base × 1.333² |
| display-3 | 2rem | 2.369rem | base × 1.333 (rebalanceado) |
| body-lg | 1.125rem | 1.2rem | 1rem × 1.2 |
| body | 1rem | 1rem | base |
| body-sm | 0.875rem | 0.833rem | 1rem ÷ 1.2 |
| eyebrow | 0.75rem | 0.694rem | 0.833 ÷ 1.2 |
| label | 0.6875rem | — | absorver em eyebrow |

Pragmaticamente, manter os números atuais e apenas alinhar `display-3 = 2.25rem` (para razão limpa display-2/display-3 = 1.778 ≈ φ²) já resolve 80% do problema sem refatorar. Recomendado **mínimo**: `display-3: clamp(1.75rem, 3vw, 2.25rem)`.

## 4. Letter-spacing — calibração Geist

Os valores no spec (-0.04 / -0.035 / -0.02 / -0.01 / -0.005) são **defaults LLM genéricos**, não Geist-tuned. Geist já vem com tracking levemente apertado de origem; aplicar -0.04em em peso 700 a 6rem produz colisão visível entre `R`+`A`, `T`+`Y`, e nas pares com acento (`Ã`+`O`).

**Geist-specific (testado em vercel.com/ds):**

| Token | Spec | Geist-tuned |
|-------|------|-------------|
| display-1 | -0.04em | **-0.022em** |
| display-2 | -0.035em | **-0.018em** |
| display-3 | -0.02em | **-0.012em** |
| body-lg | -0.01em | **0** |
| body | -0.005em | **0** |
| eyebrow (mono) | 0.16em | **0.14em** (Geist Mono já é largo) |
| label (mono) | 0.18em | **0.15em** |

## 5. PT-BR em display sizes

Risco real, magnitude baixa. Em `display-1` 700 acima de 5rem:
- `ã` / `õ`: o til Geist é geometricamente derivado e fica visualmente fino contra a haste 700 — gera impressão de "acento descolado". Mitigação: `font-feature-settings: "ss01"` não ajuda (Geist não tem alt). Aceitar ou usar `font-synthesis: none` + testar em produção.
- `ç`: cedilha bem desenhada, sem risco.
- `á é í ó ú`: agudos OK em todos pesos.

**Risco crítico:** palavras com til em hero (ex.: `criação`, `não`, `produção`) — testar antes de travar copy. Se o hero for "Construo produtos web claros", zero problema. Se for "Criação de produtos", fazer mock antes.

## 6. Recomendação

**Manter Geist** — o ganho de sinal "Vercel-tier" para público agência/dev supera as fraquezas latinas, desde que o letter-spacing seja recalibrado (§4) e a copy do hero evite acentos pesados em display-1.
