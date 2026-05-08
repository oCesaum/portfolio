---
owner: agente-d4
phase: execution
spec: v2 §5.4
date: 2026-05-06
decision: a (DIY com gate) + c (placeholder fallback)
status: locked
related: 08-photo-brief.md
---

# D4 — Retrato split-tone: DIY com gate de qualidade, placeholder como fallback

## Recomendação

**Opção (a) DIY com smartphone, com gate de Go/No-go obrigatório. Se reprovar, opção (c) placeholder até retake ou contratação.**

## Raciocínio

**1. Realismo do DIY.** O brief já entrega o trabalho difícil: setup de luz (janela 45° + cartolina A3), settings (1×, ISO 100–200, 1/125s, WB 5200K), recipe Lightroom Mobile com hex 35°/215° e grain 12 explícitos. Não é "fotografia editorial improvisada" — é receita pronta, hex literais. Taxa realista de falha em ~22 disparos: alta em pose/expressão (40–50%), média em luz (20%), baixa em recipe (<10% se seguir passos). "Bom o suficiente" é alcançável solo em 1–2 sessões.

**2. ROI do fotógrafo.** R$500 médios = ~10–15h de trabalho freelance do César. Para um portfólio cujo objetivo é converter lead frio em call paga, o delta visual de fotógrafo profissional é real mas marginal **quando o tratamento split-tone domina o frame** — o filtro nivela 70% da diferença entre amador-com-luz-correta e profissional. Vale R$500 só se DIY falhar 2x e calendário permitir.

**3. Custo do placeholder.** Mark geométrico "CA" em premium minimal **não fere** profissionalismo — fere ausência de identidade. Stripe Press, Linear, Vercel usam marks tipográficos no lugar de fotos sem perder ar premium. Risco real: parecer "site não terminado" se o resto da página gritar foto faltando. Com a seção §5.4 escrita pra suportar mark, é neutro-a-positivo.

**4. Recovery.** DIY ruim: retake em 1 dia, custo zero. Fotógrafo flaka: já bloqueou 1 semana, plano B vira DIY ou placeholder de qualquer jeito. **DIY tem o melhor failure mode.**

**5. Time-to-launch.** DIY 1–2 dias é absorvível dentro de F7. Fotógrafo 1–2 semanas atrasa launch material. Placeholder unblocka F7 imediato mas adiciona swap-in pós-launch (trivial: trocar 1 asset + alt).

## Gate Go/No-go (DIY) — todos os 5 devem passar

Antes de exportar `cesar-portrait-v1.avif/webp`:

1. **Foco no olho mais próximo da câmera.** Zoom 200% no Lightroom — pestana nítida, não nariz/orelha. Reject se foco caiu fora dos olhos.
2. **Highlight da pele não estourado pós split-tone.** Histograma sem clipping no canal R após aplicar recipe. Pele não esverdeada nem amarelada-doente (criterio §9 do brief).
3. **Fundo limpo e dessaturado.** Zero tomada, quadro, sombra dura projetada, mancha. Se aparecer textura, trocar parede ou aumentar distância sujeito-fundo pra >1,5 m.
4. **Expressão calma, não-LinkedIn.** Boca fechada relaxada, micro-tensão nos olhos. Reject se sorriso forçado ou cara séria-tensa. Critério: você mostraria pra um amigo designer sem se desculpar?
5. **Peso final ≤80KB em AVIF e WebP a 1500×2100.** Export ambos formatos, medir. Se >80KB com qualidade aceitável, baixar quality 80→75 antes de aceitar.

**Falhou em qualquer um:** retake mesmo dia (não "salvar no edit"). Falhou em retake: ativar placeholder.

## Placeholder (fallback opção c)

**Visual exato:** SVG 5:7 (1500×2100), fundo `#ece6dc` (off-white quente do brief §6). Centralizado, monograma **CA** em JetBrains Mono, weight 500, tamanho 320px, cor `#2c2a28` (charcoal mate do brief). Letras com tracking +20, kerning manual entre C e A pra colar levemente (overlap 4–6px, formando ligadura sutil). Linha vertical fina (`1px`, opacity 30%, mesmo charcoal) atrás do monograma, altura 60% do frame, alinhada ao eixo entre as duas letras — referência geométrica que ecoa o gutter da grid do site. Sem moldura, sem ornamento. Caption `Belo Horizonte, 2026` mantida idêntica ao brief.

Peso esperado SVG: <4KB. AVIF rasterizado: <20KB.

## Ação

César executa DIY hoje (sessão 09–10h ou 16–17h, luz lateral macia). Roda gate. Se passar, ship. Se reprovar 2x consecutivas, ship com placeholder e abre issue F7.1 "swap retrato" como follow-up pós-launch — não bloqueia release.
