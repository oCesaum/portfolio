---
id: 09-cross-ux
owner: agente-cross-ux
date: 2026-05-06
status: parecer
spec_ref: v2 §3–§7
scope: D1, D2, D3, D4, D5 — leitura UX (30s, dois personas)
---

# 09 — Parecer cross-UX (D1–D5)

Persona A: cliente não-tech, escaneia em diagonal, decide por clareza + sensação de resultado.
Persona B: agência tech, clica em tudo, decide por capability + qualidade de código.
Janela de decisão: ~30s acima da dobra + 1–2 scrolls.

## D1 — 6 vs 5 vs 6-com-1-quebrado

**Veredito do visitante.** O cliente não-tech **não conta projetos** — ele conta sensação. Seis cards bem alinhados parecem "estúdio em operação"; cinco parecem "começando". Mas o cliente clica no primeiro card que tem etiqueta `Cliente` (porque é o que se parece com ele), e se cair em 404, o portfolio inteiro morre em 4 segundos — o nome do site some da memória dele e ele volta pro Google. A agência tech conta sim, mas o que quebra a confiança não é o número, é o link morto: link 404 num card rotulado `Cliente` lê como "ele publica e abandona". Seis-com-1-quebrado é estritamente o pior dos três.

**Vence:** opção (a) — restaurar. Seis vivos ≫ cinco ≫ seis-com-quebrado. Alinhado com D1 já decidido.

## D2 — repo em todos vs repo em alguns

**Veredito do visitante.** O cliente não-tech **não vê o link de repo**. Ele lê "Ver projeto" e clica; o segundo CTA é mancha cinza pra ele. Para a agência tech, o instinto é o oposto da preocupação intuitiva: dois cards sem repo entre seis **não lê como inconsistência**, lê como curadoria — *desde que* o vivo esteja sólido. O que lê como amador é o contrário: repo em tudo, incluindo coisas que envergonham o autor. "Mostro o que vale" é sinal de senioridade. O risco real seria botão desabilitado ou placeholder "repo privado" — isso sim grita defensividade. Omissão silenciosa não.

**Vence:** opção B (omitir nos cards 3 e 5, sem placeholder, sem botão fantasma). Alinhado com D2 já decidido.

## D3 — 5 seções vs 3 seções

**Veredito do visitante.** Três seções (Hero + Projetos + Contato) lê como **landing page de SaaS**, não como portfolio sênior. Para o cliente não-tech, falta a parte que ele mais precisa: "como você trabalha" — sem isso ele não sabe se é caro, se é rápido, se responde no WhatsApp. Para a agência, falta o sinal de método (Princípios) que separa freelancer de profissional. Cinco seções (Hero, Projetos, Como trabalho, Princípios, Contato) é o mínimo para a página parecer **considerada**, não comprimida. O risco de cinco é fadiga de scroll, mas o spec já mitiga com hierarquia de eyebrow numerais e densidades alternadas. Três seções economiza scroll que ninguém pediu para economizar.

**Vence:** 5 seções. Página com 3 parece thin, e thin é o oposto de premium-minimal — minimal é **densidade calibrada**, não ausência.

## D4 — foto real vs placeholder

**Veredito do visitante.** Trust collapse em ≤3s se for placeholder. O cliente não-tech procura rosto antes de procurar texto — é instinto B2B comum ("com quem estou falando?"). Placeholder genérico (avatar, silhueta, ilustração) lê como "ainda não está pronto" ou "não é real" — mata a conversão de WhatsApp imediatamente. A agência tech é mais tolerante a ausência de foto do que a presença de foto ruim/genérica: melhor não ter seção do que ter placeholder. Foto real, mesmo simples (não precisa ser editorial split-tone para funcionar), recupera ~80% do efeito. O split-tone do spec §5.4 é upside, não baseline.

**Vence:** foto real, sem exceção. Se foto profissional não está pronta no D-day, **adiar deploy da seção "Como trabalho" inteira** é melhor que publicar com placeholder. Seção ausente lê como "em construção honesta"; placeholder lê como "fake".

## D5 — fora de UX

Pulo. Comentário breve: se D5 toca build/infra (CI, deploy, lockfile), o impacto UX é zero direto e indireto via tempo de carga / estabilidade. Visitante não percebe boa engenharia, só percebe a ausência dela.

---

## Microcopy/UX detail nenhum agente chamou

**O CTA "Ver projeto" deveria carregar o domínio visível como sub-label mono.**

Hoje todos os cards mostram "Ver projeto →" idêntico. Em 30s, o visitante não distingue qual é `*.vercel.app` (estudo) e qual é `docecompota.com.br` (cliente real com domínio próprio). A etiqueta `Cliente`/`Estudo` resolve em parte, mas o domínio é o sinal mais forte de "isto está no ar de verdade, em produção, com alguém pagando" — e está sendo desperdiçado.

Proposta:

```
[ Ver projeto → ]
  docecompota.com.br
```

Sub-label em Geist Mono 11px, tracking 0.14em, cor `--foreground-subtle`, `aria-hidden` (já é redundante com o href). Custo: uma linha de JSX por card. Ganho: o único card com domínio próprio passa a **gritar** isso sem dizer; os cinco `*.vercel.app` ficam visualmente honestos sobre o que são, sem etiqueta defensiva. É a mesma filosofia do caption mono `Belo Horizonte, 2026` da foto (§5.4) — informação técnica decorativa que sinaliza cuidado.

Bônus: reforça D1. Quando Doce Compota voltar a `docecompota.com.br`, o sub-label fica visualmente mais "pesado" que os `*.vercel.app` dos outros — o cliente real fica destacado sem precisar de badge extra. Se cair pro fallback `*.vercel.app`, o tratamento uniforme não machuca.
