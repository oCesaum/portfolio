---
review: 02-visual-fundamentals
owner: agente-02
scope: portfolio-redesign-spec.md §1.1–§1.10
date: 2026-05-06
benchmarks:
  - linear.app
  - vercel.com
verdict: NEEDS REVISION
---

# Auditoria visual — Fundamentos (§1.1–§1.10)

## 1. Palette audit

A paleta é tecnicamente coerente: 3 superfícies (`#0a0a0a` / `#111111` / `#161616`), 3 níveis de texto (`#fafafa` / `#a1a1a1` / `#525252`), 3 níveis de accent quente (`#d4b896` / `#e8d4b8` / `#f5e6cc`) e o verde WhatsApp (`#25d366`) isolado por contrato.

**Pontos fortes**
- Princípio "1 accent só" é o mesmo de Linear (azul `#5e6ad2`) e Vercel (preto/branco + cinza). Maturidade clara.
- Stepping de superfície em ~6/10 lightness por degrau é confortável sem virar "cinza confuso".

**Riscos**
- `#0a0a0a` puro é mais escuro que Linear (`#08090a`, mas com matiz frio sutil) e Vercel (`#000` no marketing, `#0a0a0a` no product). Sem matiz, fica "aspirador de pó" em monitor OLED.
- `--background-overlay #161616` pode ficar visualmente igual a `--background-elevated #111111` em monitores não-calibrados (delta L* ≈ 2.3). Hover em card deveria ser perceptível sem precisar de border.
- `--foreground-subtle #525252` sobre `#0a0a0a` = 5.46:1 — passa AA mas falha em corpo de texto AAA. Como o token é descrito como "labels, micro", o uso é defensável; precisa estar documentado.

**WCAG 2.1 contrast ratios (calculados)**

| Par | Ratio | AA normal | AA large | AAA normal |
|---|---|---|---|---|
| `#fafafa` sobre `#0a0a0a` | **18.88:1** | PASS | PASS | PASS |
| `#a1a1a1` sobre `#0a0a0a` | **7.39:1** | PASS | PASS | PASS |
| `#525252` sobre `#0a0a0a` | **3.32:1** | FAIL | PASS | FAIL |
| `#d4b896` sobre `#0a0a0a` | **10.07:1** | PASS | PASS | PASS |
| `#d4b896` sobre `#111111` | **9.41:1** | PASS | PASS | PASS |
| `#25d366` sobre `#0a0a0a` | **10.81:1** | PASS | PASS | PASS |

`--foreground-subtle` precisa flag: usar **apenas** em texto >= 18px ou bold >= 14px. Caso contrário, falha AA.

**Refinamento 1 — accent.** `#d4b896` é um bege "cappuccino" levemente puxado para amarelo (HSL 33° 41% 71%). Em fundo `#0a0a0a` neutro, esse amarelo lê como "envelhecido"/sépia em monitor warm. Proposta:

```css
--accent: #d8bea3;   /* HSL 28° 39% 74%, +3% L, -5° H */
```

Razão: empurra o matiz 5° para o coral-bege, escapa do território "sépia escaneado" e ganha 0.6:1 de contraste sem alterar a percepção quente. Mantém o mesmo **mood**, mas lê como areia molhada em vez de pergaminho.

**Refinamento 2 — superfícies elevadas.** O salto `#111111 → #161616` (delta L* 2.3) é fraco demais para hover. Proposta:

```css
--background-elevated: #121212;   /* idem, visualmente ok */
--background-overlay:  #1a1a1a;   /* +0.4 delta L*, hover percebido */
--background-sunken:   #060606;   /* novo: poços/inputs, profundidade negativa */
```

`--background-sunken` permite inputs rebaixados (Linear usa essa mecânica) sem depender só de border, alinhado com §1.9 ("profundidade vem de borders e contraste de superfície").

**Score:** cohesion 9/10, distinction 6/10, contrast safety 8/10.

---

## 2. Type scale audit

Conversão para px e cálculo de ratio entre degraus consecutivos (base 16px):

| Token | Min px | Max px | Ratio para o anterior (max) |
|---|---|---|---|
| `display-1` | 48 | 104 | — |
| `display-2` | 36 | 64 | 1.625× |
| `display-3` | 24 | 32 | 2.000× |
| `body-lg` | 18 | 18 | 1.778× |
| `body` | 16 | 16 | 1.125× |
| `body-sm` | 14 | 14 | 1.143× |
| `eyebrow` | 12 | 12 | 1.167× |
| `label` | 11 | 11 | 1.091× |

**Veredito: arbitrário.** Não cola com golden (1.618), minor third (1.2), major third (1.25) nem perfect fifth (1.5). Os saltos vão de 2.0× (display-2 → display-3) a 1.09× (eyebrow → label). O salto display-3 → body-lg de 1.778× é especialmente quebrado — cria "buraco" entre subtítulo e lead.

**Escala corrigida (perfect fourth 1.333× para display, minor third 1.2× para corpo, base 16):**

| Token | Tamanho proposto | Ratio | Uso |
|---|---|---|---|
| `display-1` | clamp(3rem, 7.5vw, 6rem) — 48–96px | — | Hero |
| `display-2` | clamp(2.25rem, 5vw, 4.5rem) — 36–72px | 1.333× | Seção |
| `display-3` | clamp(1.6875rem, 3vw, 2.25rem) — 27–36px | 2.000× → reduzido p/ ~1.6 | Subtítulo |
| `body-lg` | 1.125rem (18px) | 1.2× sobre body | Lead |
| `body` | 1rem (16px) | base | Corpo |
| `body-sm` | 0.8125rem (13px) | 1.231× | Captions |
| `eyebrow` | 0.75rem (12px) mono | — | Numeração |
| `label` | 0.6875rem (11px) mono | — | Tags |

Mantive `eyebrow`/`label` fora do ratio (são UI mono, não corpo). Reduzir `display-1` max para 96px alinha com Linear (display marketing 80–96px) e evita "caixa-alta gigante" em desktop ≥ 1440px.

---

## 3. Radius + border + shadow philosophy

**Spec:** `--radius-sm: 2px`, `--radius: 4px`, sem shadow perceptível, border 1px.

**Linear** usa `--radius-4: 4px`, `--radius-8: 8px`, `--radius-12: 12px`; cards de issue são 8px. Border `rgba(255,255,255,0.06)`.
**Vercel (Geist UI)** usa 5px/8px/12px nos componentes; marketing usa 6px em buttons e 12px em cards.

**Veredito: defensável, mas extremo.** 2px é território "brutalist soft" — funciona em badges/labels, mas em **cards de projeto** (cobertura larga) lê como "wireframe" no contexto de portfolio premium. Linear nunca desce abaixo de 4px em superfície grande.

**Proposta:**

```css
--radius-none: 0;
--radius-xs:   2px;   /* badges, tags, label inputs */
--radius-sm:   4px;   /* buttons, inputs */
--radius:      6px;   /* cards pequenos, dropdowns */
--radius-lg:   8px;   /* cards de projeto, painéis */
--radius-pill: 999px;
```

Mantém o espírito "minimal radical" (8px é o teto, não 16/24px), mas dá hierarquia. Borders mantém `rgba(255,255,255,0.08)` — alinhado com Linear `0.06`, suficiente.

Shadow: política "sem shadow perceptível" é correta para o mood, mas o **WhatsApp `0 8px 24px rgba(37,211,102,0.18)`** é forte demais (offset 8px puxa atenção). Reduzir para `0 4px 16px rgba(37,211,102,0.22)` mantém presença com menos "balão".

---

## 4. Três contradições visuais

**4.1. "Premium minimal" + bege quente saturado.** Linear/Vercel premium-minimal usa accent **frio** (azul-violeta, branco). Bege `#d4b896` evoca craft/warmth — território Stripe Press, Maven, Readwise. O role do site é "Full-stack engineer" para B2B SMB; o accent quente sinaliza "designer/agência criativa", não "engenheiro confiável". Conflito de signaling: a paleta diz boutique, o copy diz dev.

**4.2. "Cantos quase retos" (2/4px) + "magnetic CTA" + "smooth scroll Lenis 1.2s".** Cantos retos comunicam precisão técnica/seriedade; magnetic + Lenis 1.2s comunicam playfulness/agência. §1.5 lista magnetic CTA como "SIM" mas exclui cursor custom como "distrai cliente não-técnico" — magnetic CTA distrai exatamente o mesmo perfil. Inconsistência de critério.

**4.3. "Sem shadow perceptível" + "border-glow em hover" + "shadow no botão WhatsApp".** A regra é "profundidade vem de borders e contraste de superfície", mas a única exceção é justamente o elemento que deveria sumir no fundo (botão flutuante). Resultado: o WhatsApp, que é o **canal único de conversão**, é o único elemento com shadow — o que está correto **por intenção** mas **contradiz a filosofia declarada**. Documentar como "shadow é exclusivo de elementos flutuantes" resolve.

---

## 5. Final verdict

**NEEDS REVISION.**

A paleta tem cohesion alta e contrast safety adequada (com a ressalva do `--foreground-subtle`), mas o accent bege puxa o sistema para "boutique" enquanto o resto do spec posiciona como "engenheiro B2B" — esse desalinhamento de signaling é o risco maior do bloco. A escala tipográfica é matematicamente arbitrária (saltos entre 1.09× e 2.0×) e precisa ser regularizada num ratio único. O sistema de radius 2/4px é coerente mas extremo demais para cards grandes — Linear/Vercel não descem disso em superfície primária. Nada disso é bloqueante, mas tudo é polish que separa "portfolio bom" de "portfolio que parece Linear". Aprovar após (a) substituir accent para `#d8bea3`, (b) reescalar tipografia em perfect-fourth, (c) introduzir `--radius-lg: 8px` para cards de projeto, (d) documentar `--foreground-subtle` como token "≥18px only", (e) resolver as três contradições do §4.
