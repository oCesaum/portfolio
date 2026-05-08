---
owner: agente-05
role: senior-conversion-copywriter
scope: portfolio-redesign-spec.md §3.2, §5.2, §6.2, §2.3
date: 2026-05-06
audience: [cliente-nao-tecnico-BR, agencia-tech-BR-EN]
single_cta: whatsapp
tone_reference: [linear.app, vercel.com]
---

# Copy audit — Portfolio redesign

Foco: 30 segundos pra cliente decidir. Sem jargão sem propósito, sem clichê de freelancer. Cada item: estado atual → proposta → justificativa.

---

## 1. Hero tagline (§3.2)

**Atual PT:** `Produtos web bem construídos, sem complicar o caminho.`
**Atual EN:** `Web products built well, without overcomplicating it.`

**Hook strength: 6/10.** O ritmo é bom e o "sem complicar o caminho" tem personalidade — mas "bem construídos" é vago (todo mundo diz que constrói bem). Em EN, "built well" soa traduzido. "Without overcomplicating it" tem o referente solto — overcomplicating *what*?

**Funciona:** ritmo de duas linhas, ausência de buzzwords, postura calma.
**Fraco:** verbo passivo ("construídos"), promessa genérica, EN literal.

| | PT | EN | Justificativa |
|---|---|---|---|
| **Alt A (recomendado)** | `Produtos web claros, do briefing ao deploy.` | `Clear web products, from brief to deploy.` | Substitui "bem construídos" (genérico) por "claros" (alinhado ao posicionamento) e troca a promessa abstrata por escopo concreto. Funciona pra cliente (entende ponta a ponta) e pra agência (sabe que cobre o ciclo). |
| **Alt B** | `Sites e apps que ninguém precisa explicar duas vezes.` | `Web products nobody needs to explain twice.` | Hook mais forte — vira um benefício observável. Trade-off: menos calmo que Linear/Vercel. Use se quiser personalidade > sobriedade. |

---

## 2. Lead (§3.2)

**Atual PT:** `Trabalho com agências e founders que precisam de execução técnica direta — WordPress, Node.js e React, com prazos honestos e código que dura.`

**Risco confirmado: sim.** Listar stack no lead é "tells the wrong audience" — cliente não-técnico bate o olho em "Node.js" e desliga; a stack já aparece no inline abaixo dos CTAs, então repetir custa atenção sem ganhar nada. Agência também não precisa disso *aqui* — ela já scrolla pra Stack section.

**Proposta PT:** `Trabalho com agências e founders que precisam tirar um produto web do briefing pro deploy — com prazo honesto e código que a próxima pessoa entende.`
**Proposta EN:** `I work with agencies and founders who need to take a web product from brief to deploy — with honest timelines and code the next person can read.`

Mantém os dois públicos (agência vê "deploy/timeline"; cliente vê "tirar do briefing"), tira a stack daqui (já está abaixo), e a frase final é prova social implícita ("código que a próxima pessoa entende" = não vai ficar refém).

---

## 3. Bio — parágrafo mais fraco (§5.2)

**§2 atual PT:** `Comecei em 2020 como auxiliar de TI, virei programador júnior em 2022 e desde então atuo em projetos com PHP, WordPress, Node.js, React, Next.js, TypeScript e Tailwind CSS.`

É o mais fraco: vira CV cronológico + lista de stack que já aparece em duas outras seções (hero inline + Stack block). Não diz nada sobre *como pensa*.

**Reescrita PT:** `Saí de auxiliar de TI (2020) pra dev júnior (2022) e desde lá entreguei tanto landing rápida quanto sistema interno que sustenta operação. A escolha de stack vem do problema, não do hype.`
**Reescrita EN:** `I went from IT assistant (2020) to junior dev (2022), and since then I've shipped everything from quick landings to internal systems that keep operations running. Stack choices come from the problem, not the hype.`

Mantém a cronologia (legitimidade), troca lista redundante por range de impacto, e fecha com posicionamento (anti-hype) — duas seções aplaudem isso: cliente ("não vai me empurrar tecnologia") e agência ("pensa antes de escolher").

---

## 4. "Como trabalho" — bullets (§5.2)

| # | Atual PT | Veredito | Proposta |
|---|---|---|---|
| 1 | Briefing curto via WhatsApp, sem reuniões intermináveis. | OK — específico, tem voz. | Manter. |
| 2 | Prazos honestos, sem promessa que não cabe. | **Clichê.** "Honest deadlines" é o "best of breed" do freelancer. | PT: `Prazo dado é prazo cumprido — e renegociado antes, se mudar.` / EN: `Deadlines I commit to, I hit — renegotiated up front if scope shifts.` |
| 3 | Entregas incrementais com link de prévia. | OK — concreto. | Manter. |
| 4 | Código revisável, com README e setup mínimo. | Levemente jargão ("revisável"). | PT: `Código que outro dev abre e roda em 5 minutos — README incluso.` / EN: `Code another dev can clone and run in 5 minutes — README included.` |

A troca do #2 é a mais importante: "prazos honestos" é a frase mais clichê desse mercado.

---

## 5. Contact section title (§6.2)

**Atual PT:** `Tem um projeto em mente? Vamos conversar.`
**Atual EN:** `Got a project in mind? Let's talk.`

Genérica — usada em 90% dos sites de freelancer. Não diferencia.

**Proposta PT:** `Conta a ideia. Eu respondo em até 24 horas.`
**Proposta EN:** `Tell me the idea. I'll reply within 24 hours.`

Substitui pergunta retórica por instrução + promessa verificável. Casa com o lead da seção (que já promete 24h), reduzindo redundância e injetando ação. Mais Linear/Vercel.

---

## 6. WhatsApp prefilled message (§2.3 + §6.2)

**Atual PT:** `Olá, César. Vi seu portfólio e quero conversar sobre um projeto.`
**Atual EN:** `Hi, César. I saw your portfolio and want to discuss a project.`

Soa de template — o cliente lê isso na tela do WhatsApp antes de mandar e percebe. Pra parecer menos automático: primeira pessoa natural + uma deixa pra editar.

**Proposta PT:** `Oi César, vim do seu portfólio. Tenho um projeto em vista — pode me passar como funciona?`
**Proposta EN:** `Hey César, came from your portfolio. I have a project in mind — can you walk me through how you work?`

"Pode me passar como funciona" abre conversa específica em vez de fechar; "vim do seu portfólio" rastreia origem implicitamente sem UTM. Sem pontuação corporativa ("Olá," → "Oi,").

---

## 7. Microcopy crítico ausente

**Falta: estado de erro / fallback do CTA WhatsApp.** O spec assume `wa.me` sempre abre. Mas: pop-up bloqueado, WhatsApp não instalado em desktop sem WhatsApp Web, mobile sem app. Se o `target="_blank"` falha silenciosamente, o cliente acha que o site quebrou e não há plano B visível.

**Proposta — fallback inline abaixo do CTA hero (Contato), só aparece se `window.open` falhar OU como link permanente em `--foreground-subtle` 12px:**

- PT: `Se o WhatsApp não abrir, copie: +55 31 98737-3513`
- EN: `If WhatsApp doesn't open, copy: +55 31 98737-3513`

Custa uma linha. Salva 100% das conversões em casos-borda. É o tipo de detalhe que separa portfolio de produto.

---

## Resumo executivo

Mudanças com maior impacto de conversão, em ordem:

1. **Lead do hero** — tirar stack daqui (item 2).
2. **Bullet #2 de "Como trabalho"** — matar o clichê (item 4).
3. **Fallback do WhatsApp** — destravar borda (item 7).
4. **Tagline Alt A** — substituir "bem construídos" por "claros" (item 1).

Próximo passo sugerido: aplicar 1–4 no spec antes de qualquer implementação visual, pra evitar retrabalho de copy depois que o componente estiver pintado.
