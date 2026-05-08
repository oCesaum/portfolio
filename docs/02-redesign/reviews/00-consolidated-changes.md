---
title: "Consolidação dos 10 reviews — mudanças propostas para spec v2"
tipo: "review-summary"
status: "ativo"
owner: "pensador"
atualizado_em: "2026-05-06"
---

# Consolidação dos 10 reviews

10 agentes paralelos auditaram `portfolio-redesign-spec.md`. Este doc agrega achados em 3 grupos:

- **Bloco A — bugs/críticas que devem ser corrigidos sem debate** (auto-aplicar)
- **Bloco B — decisões de produto que mudam algo material** (precisa green light tua)
- **Bloco C — refinos médios** (auto-aplicar a menos que conflitem)

Cada item: origem · decisão proposta · justificativa · risco se não aplicar.

---

## BLOCO A — bugs críticos (auto-aplicar)

| # | Item | Origem | Ação |
|---|------|--------|------|
| A1 | `--foreground-subtle #525252` declarado como 3.6:1 mas é **2.53:1** sobre `#0a0a0a`. Falha AA universal. Usado em texto-leitura (stack inline, indicadores, números de seção). | Agent 7 | Substituir por `--foreground-muted #a1a1a1` (7.57:1) em qualquer texto-leitura. Manter `--foreground-subtle` apenas em borders/dividers. |
| A2 | Texto branco sobre `#25d366` WhatsApp = **2.85:1**. Falha AA no único CTA da página. | Agent 7 | Texto preto `#0a0a0a` sobre verde (12.46:1). Único CTA com texto escuro. |
| A3 | Foco visível invisível sobre superfícies coloridas (CTA accent, CTA WhatsApp). | Agent 7 | Padrão **double-ring**: `outline: 2px solid var(--foreground); outline-offset: 2px; box-shadow: 0 0 0 4px var(--background);` — funciona em qualquer fundo. |
| A4 | `prefers-reduced-motion` tem 4 buracos (dot pulse §6, glow do flutuante, shimmer, foto pad-translate hover). | Agent 7 | Adicionar **safety net global** em `globals.css`: `*, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }`. |
| A5 | Lenis "smoothTouch: false" não cobre reduced-motion. Viola WCAG 2.3.3. | Agent 7 | Decisão H2 (drop Lenis) torna isso moot. |
| A6 | Hydration mismatch em `<html lang>` quando server e client divergem cookies. | Agent 6 + Agent 8 | Resolver locale **uma vez** no server, prop-drill pra LocaleProvider, **nunca** ler cookie no render do client. |
| A7 | Falta `Vary: Cookie` → CDN poisoning. (Moot se trocar pra route-based i18n — H1.) | Agent 6 + Agent 8 | Resolvido por H1. |
| A8 | Animação de `box-shadow` (halo dot, glow CTA), `width: auto` (botão WA hover), `padding-inline` (CTA hover), `filter: grayscale` (foto) não são GPU-accelerated. | Agent 9 | Trocar todas por `transform`/`opacity` em pseudo `::after`. Detalhado abaixo. |
| A9 | Featured thumbnail sem `aspect-ratio` obrigatório → CLS. | Agent 7 | Forçar `aspect-ratio` em **toda** imagem (`16:10` para featured/rows, `4:5` ou novo crop para foto). |
| A10 | Spec do magnetic hero CTA (raio 100px) é **menor** que largura do botão (~200px) — magnet engaja só depois do cursor entrar no botão. | Agent 4 | Raio 150px (1.5×). Damping 0.16. Flutuante mantém 80px mas damping 0.14. |

---

## BLOCO B — decisões de produto (precisa green light)

### B1. i18n — trocar de cookie pra route-based?

| Cenário | SEO | Dev cost | UX | Bug count |
|---------|-----|----------|----|-----------| 
| **Atual (cookie + URL única)** | EN invisível pro Google | ~80 linhas (na real ~465) | URL compartilhada não preserva locale | 5+ |
| **Route-based `/pt`, `/en` (Next 15 nativo)** | Ambas indexadas | ~150 linhas | URL compartilhada honesta | 0 |

Agent 8 deu nota **9/25 vs 23/25**. Agent 6 confirma. Linear migrou disso em 2022 por SEO.

**Proposta:** trocar pra route-based. Custo +1 dia, ganho estrutural permanente.

**Alternativa Agent 10:** descopar EN inteiro pro pós-launch (F11), lançar PT-only. Argumenta que 80% dos leads vêm via WhatsApp/LinkedIn em PT. Economiza ~12h.

**Pergunta:** route-based bilíngue **OU** PT-only com EN pós-launch?

---

### B2. Lenis — drop ou manter?

Agent 4 (motion designer): **drop**. ~12KB, RAF coupling com parallax, problema de reduced-motion, quase nenhum ganho perceptível em página single-page text-heavy.

Agent 6 (stack arquiteto): aceita drop, mas dá pattern caso queira manter.

Agent 7 (a11y/perf): "se manter, precisa mudar config para `lerp: 1` em reduce-motion".

**Proposta:** drop Lenis. Usa `scroll-behavior: smooth` nativo. Substitui parallax por single rAF loop dedicado.

**Pergunta:** ok dropar?

---

### B3. Accent color — `#d4b896` → `#d8bea3`?

Agent 2: bege atual lê "boutique/sépia escaneado" no contexto B2B engineer. Empurrar matiz +5° pra coral-bege ganha 0.6:1 contraste e escapa do território "Stripe Press 2024 mood-board".

Agent 1 (mais radical): derivar accent da cor real do retrato profissional — virá uma decisão pós-foto.

**Proposta intermediária:** trocar pra `#d8bea3` agora; reavaliar quando foto chegar.

**Pergunta:** ok trocar?

---

### B4. Adicionar bloco "Princípios" / voz autoral?

Agent 1: spec é factual mas nunca declara posição. Falta manifesto curto (3-5 frases primeira pessoa) que assina autoria. Exemplo de tom:

> Não trabalho com escopo aberto. Não entrego sem README. Não cobro por hora — cobro pelo problema.

**Proposta:** adicionar bloco entre §5 (Sobre) e §6 (Contato). Frases factuais sobre como você trabalha, em primeira pessoa, com força.

**Pergunta:** quer adicionar? Se sim, posso rascunhar 3-5 frases — você ajusta.

---

### B5. Layouts assimétricos — Hero e Contato

Agent 9 + Agent 1: hero centralizado puro = clone Vercel.

Hero proposto: grid 12-col, título no col 1-8 (esquerda), lead+CTAs no col 7-12 com offset vertical 96px, eyebrow `01 / Início` rotacionado 90° na lateral esquerda como "blueprint label".

Contato proposto: grid `[5fr][7fr]`. Título+lead à esquerda, CTA+indicadores à direita, baseline alinhado no topo (não centralizado).

**Pergunta:** assimetria sim/não? Se quiser, vou renderizar mockup HTML descartável antes de codar real.

---

### B6. Foto profissional — tratamento

Atual no spec: grayscale-by-default → cor no hover. Agent 1: cliché 2018-2022, parodiado.

**Proposta Agent 1:** sempre colorida, com **grão de filme + split-tone sutil** (highlights bege, sombras azul-frio), crop 5:7 (cinema, não 4:5 LinkedIn), legenda mono "Belo Horizonte, 2026".

**Pergunta:** drop grayscale-hover ok? Pra split-tone preciso da foto pronta pra eu calibrar tons.

---

### B7. Indicador "Disponível 24/7" — substituir por escassez real?

Agent 1: "24/7" lê call-center. Repetido 4× na página vira ruído.

**Proposta:** substituir por algo factível e específico:
- `Aceitando 2 projetos este trimestre` (escassez verdadeira se for o caso)
- `Próxima vaga: julho/2026`
- ou simplesmente `Resposta em até 24h` (sozinho, sem "24/7")

**Pergunta:** qual? Ou você escreve sua versão.

---

### B8. CTA Contato — pílula verde gigante OU duas-camadas tipográficas?

Spec atual: botão pílula verde gigante centralizado. Agent 9 marca como genérico (4/10).

**Proposta Agent 9:** botão duas-camadas alinhado à esquerda do grid:
- Camada 1: "Falar no WhatsApp" Geist 18px peso 600
- Camada 2 abaixo: mono 11px tracking 0.18em cor `--accent`, **rotativa** entre `RESPOSTA EM ATÉ 24H`, `BRASIL · UTC−3`, `ACEITANDO PROJETOS` — troca a cada 4.5s com mask-reveal

Cor verde só no ícone + linha mono, não no fill inteiro. Botão vira "linha de informação que age".

**Pergunta:** ok substituir? Mais editorial, menos "balão WhatsApp".

---

### B9. Renomear "Sobre" → "Como trabalho"?

Agent 10: cliente B2B não-técnico não clica em "Sobre" — vago. "Como trabalho" sinaliza método/processo, alinha com posicionamento de consultor.

**Proposta:** renomear nav item + URL hash de `#sobre` pra `#trabalho` (ou `#metodo`). Conteúdo da seção fica idêntico (bio + "Como trabalho" + Stack).

**Pergunta:** renomear?

---

### B10. Depoimentos — MVP ou pós-launch?

Spec atual: estado vazio (não renderiza). Agent 10: conversão B2B sem prova social cai 3×. Não é "futuro" — é dia 1.

**Proposta:** track F-Content paralelo (não-dev) pede 2 depoimentos via WhatsApp a clientes anteriores. 15min de trabalho. Critério de "pronto pra deploy" inclui ≥ 2 depoimentos coletados.

**Pergunta:** ok adotar critério? Ou aceita lançar sem e adicionar depois?

---

## BLOCO C — refinos médios (auto-aplicar)

### Sistema visual
- C1. Type scale **corrigido** pra perfect-fourth display + minor-third body. Específico: `display-3` reduzido de 2rem max → 2.25rem max pra suavizar salto. (Agent 2 + 3)
- C2. Letter-spacing **Geist-tuned**: display-1 -0.04em → -0.022em; display-2 -0.035em → -0.018em; display-3 -0.02em → -0.012em; body 0; eyebrow 0.16em → 0.14em; label 0.18em → 0.15em. (Agent 3)
- C3. Adicionar `--background-sunken: #060606` (poços/inputs). Renomear `--background-overlay #161616 → #1a1a1a` pra delta de luminância perceptível. (Agent 2)
- C4. Radius escala expandida: `--radius-xs 2px / --radius-sm 4px / --radius 6px / --radius-lg 8px / --radius-pill`. Cards de projeto sobem pra 8px. (Agent 2)
- C5. Border tokens em escala tripla: `--border-1 0.06 / --border-2 0.12 / --border-3 0.20`. (Agent 9)
- C6. Easing par: manter `cubic-bezier(0.16,1,0.3,1)` pra entradas (`--ease-out`); ADICIONAR `cubic-bezier(0.22,1,0.36,1)` pra hover/state (`--ease-out-quint`, 150-300ms). (Agent 4)

### Motion
- C7. Adicionar **aurora drift** sutil no `<body>::before`: radial-gradient muito leve (`opacity ≤ 0.025`), translate3d loop 18s. Hardware-accelerated. Vida perpétua sem distrair. (Agent 9)
- C8. Adicionar **breathing eyebrows**: `01 / Hero`, `02 / Projetos`, etc com opacity 0.55↔0.75 em loop de 3.6s, dessincronizado por seção. (Agent 9)
- C9. **Section-number tick** on enter: dígitos 02-06 com mask de 60ms entre caracteres. Unifica grammar text-mask + numeração. (Agent 4)
- C10. **Cursor blink** após "caminho." no título do hero — `▌` piscando, troca de glifo a cada 4s. Assinatura editorial dev. Sem custo, com reduce-motion trava em `▌`. (Agent 9)
- C11. **Focus-ring choreography**: `outline-offset 0 → 3px` em 120ms `--ease-out-quint` ao receber foco keyboard. (Agent 4)
- C12. **Drop §5.6 text-shimmer** — efeito Linear-clone reconhecível, sinaliza tutorial. (Agent 1 + 4)
- C13. Parallax: substituir Lenis-coupled por **single rAF loop dedicado** + IntersectionObserver gate + `will-change` toggle on/off + cap em 1 thumb visível em mobile + auto-disable em `deviceMemory < 4` ou `saveData`. (Agent 4)
- C14. Drop pulse de `box-shadow` → pseudo `::after` com `transform: scale + opacity`. Aplicar em dot da pílula, glow do CTA hero, glow do flutuante. (Agent 9)
- C15. Botão WA flutuante hover: trocar `width: auto` por `transform: translateX + scaleX` em label sempre presente com opacity 0. (Agent 9)
- C16. CTA hero hover: `padding-inline cresce` → `transform: scaleX(1.025)` no wrapper. (Agent 9)

### Copy
- C17. Hero tagline PT: `Produtos web bem construídos, sem complicar o caminho.` → `Produtos web claros, do briefing ao deploy.` EN: `Web products built well, without overcomplicating it.` → `Clear web products, from brief to deploy.` (Agent 5)
- C18. Hero lead: tirar lista de stack (já aparece inline). Nova versão PT: `Trabalho com agências e founders que precisam tirar um produto web do briefing pro deploy — com prazo honesto e código que a próxima pessoa entende.` (Agent 5)
- C19. Bio §2 reescrita PT: `Saí de auxiliar de TI (2020) pra dev júnior (2022) e desde lá entreguei tanto landing rápida quanto sistema interno que sustenta operação. A escolha de stack vem do problema, não do hype.` (Agent 5)
- C20. Bullet "Como trabalho" #2: `Prazos honestos, sem promessa que não cabe.` (clichê) → `Prazo dado é prazo cumprido — e renegociado antes, se mudar.` (Agent 5)
- C21. Bullet "Como trabalho" #4: `Código revisável, com README e setup mínimo.` → `Código que outro dev abre e roda em 5 minutos — README incluso.` (Agent 5)
- C22. Contato título: `Tem um projeto em mente? Vamos conversar.` → `Conta a ideia. Eu respondo em até 24 horas.` PT. EN equivalente. (Agent 5)
- C23. Mensagem WhatsApp pré-preenchida: trocar PT pra `Oi César, vim do seu portfólio. Tenho um projeto em vista — pode me passar como funciona?` (mais natural, abre conversa). (Agent 5)
- C24. Adicionar **fallback inline** abaixo do CTA hero do contato: `Se o WhatsApp não abrir, copie: +55 31 98737-3513` em `--foreground-muted` 12px. (Agent 5)
- C25. Stack inline com **um item destacado por linha** (`**Next.js** · React · TypeScript · Tailwind`) — destaque é o que você escolheria primeiro hoje. (Agent 1)

### Stack técnico
- C26. **Pre-F0 spike** (2h) em branch separada validando Next 15 + Tailwind 4 + Geist + motion + lenis (ou sem se H2 dropar) **antes** de F1 commitar. (Agent 6 + 10)
- C27. Drop `motion-dom` separado de §3.7. Usar só `motion/react` com `LazyMotion strict` + `domAnimation` + `m.*`. (Agent 6)
- C28. lucide-react: bump pra ≥ 0.460 e import individual: `import ArrowUpRight from "lucide-react/icons/arrow-up-right"`. (Agent 6)
- C29. PT-BR til risk: tagline atual sem tildes pesados — OK. Mas testar `criação`, `não`, `produção` em mock antes de travar copy futuro. (Agent 3)

### Plano
- C30. Reordenar fases: F-Content paralelo (T-7d) · F0+F1 merged (com spike antes) · F2 fundamentos · F3 shell + F4 SEO em paralelo · F5/F6/F8 paralelos · F7 fora da rota crítica (esperando foto) · F9 vira gate por PR · F10 deploy. (Agent 10)
- C31. Critério de "ready to deploy": ≥ 4 projetos com URL pública confirmada + ≥ 2 depoimentos coletados + foto pronta. Senão deploy é beta com `noindex`. (Agent 10)

### Fora-spec
- C32. Adicionar `<link rel="dns-prefetch" href="https://wa.me">` + Speculation Rules. (Agent 7)
- C33. Preload + `fetchpriority="high"` na thumb do Featured. (Agent 7)
- C34. Análise de bundle via `@next/bundle-analyzer` em CI. (Agent 6 + 7)

---

## Próximo passo

1. **Você lê o Bloco B (10 perguntas) e responde** — pode ser yes/no/escolha-letra ou "decide você".
2. Eu aplico Bloco A + Bloco C automaticamente + Bloco B conforme respostas, gerando `portfolio-redesign-spec.md` v2.
3. Marco v1 como `substituido` e v2 como `ativo`.

Sem fazer isso, spec atual fica com 10 bugs críticos identificados, dos quais 5 quebram WCAG AA.
