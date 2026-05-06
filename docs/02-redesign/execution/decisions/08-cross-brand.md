---
id: 08-cross-brand
owner: agente-cross-brand
date: 2026-05-06
spec_ref: v2 §0 (decisões travadas), §3 (Hero), §6 (Princípios)
brand_position: "Full-stack focado em produtos web claros — premium minimalista, honesty radical"
audience: "Agência/founder decidindo em 30s se manda WhatsApp"
---

# Cross-brand — o que cada opção D1-D5 sinaliza

## D1 — Doce Compota
Option (a) Restaurar deploy signals: "eu mantenho o que entrego". Reforça honesty radical — o único card `Cliente` continua existindo, prova social real preservada. Agência lê: "trabalha com cliente pagante e não abandona o legado". Vetor mais alto de credibilidade.
Option (b) Reduzir a 5 projetos signals: curadoria honesta, mas paga preço — perde a única etiqueta `Cliente`. Portfolio vira 100% estudos/pessoais. Agência lê: "trabalha bem, mas nunca foi pago por isso". Aceitável, não ideal.
Option (c) Substituir por novo projeto signals: maquiagem. Sob pressão de prazo, vira projeto-meio-pronto, e o cliente fareja. Quebra "sem métricas inventadas".
Brand-aligned recommendation: **(a)** — restaurar é a única opção que casa com "honesty radical" e preserva o sinal `Cliente` único.

## D2 — Repos deletados (Fast Cart, Barber)
Option (a) Restaurar repos públicos signals: transparência total — mas só se o histórico estiver limpo. Sem auditoria, vira "achou .env commitado", o que destrói honesty radical via auto-gol.
Option (b) Esconder `repositoryUrl` apenas nesses 2 signals: curadoria sênior. Schema já é opcional, leitura B2B é neutra. Agência lê: "mostra o que vale mostrar" — vetor de senioridade.
Option (c) Manter link quebrado signals: amador. Pior dos mundos — recrutador técnico clica e conclui "não mantém".
Brand-aligned recommendation: **(b)** — curadoria seletiva é mais premium do que exposição total. Honesty não exige nudez de código; exige não mentir sobre o que está visível.

## D3 — Escopo mínimo enviável
Option (a) Full spec (Hero+Projetos+Trabalho+Princípios+Contato+EN) signals: ambição. Mas ~25% de chance de virar fantasma. Site não-lançado sinaliza zero — pior que site enxuto lançado.
Option (b) Minimal (cortar Trabalho **e** Princípios) signals: competência sem voz. Vira "mais um portfolio dev limpo". Perde o único bloco que carrega opinião — exatamente o que diferencia "consultor com tese" de "freelancer disponível".
Option (b') Híbrido (corta Trabalho, mantém Princípios slim, descopa EN) signals: prioridade certa — voz autoral preservada, plumbing adiado até existir canal EN real. Agência lê: "tem opinião e envia".
Brand-aligned recommendation: **(b')** — Princípios é o ativo de marca de maior ROI por hora. Trabalho é redundante (stack vive nos cards). EN sem canal é vaidade técnica, oposto de honesty radical.

## D4 — Retrato split-tone
Option (a) DIY com gate Go/No-go signals: "controla o próprio output". Recipe Lightroom literal + 5 critérios objetivos = método visível, ecoa §6 Princípios. Falha rápida e barata.
Option (b) Fotógrafo R$500 signals: investimento — mas delta visual marginal quando split-tone domina o frame. Bloqueia 1-2 semanas, e flaka do fotógrafo cai pra DIY de qualquer jeito.
Option (c) Placeholder monograma "CA" signals: identidade tipográfica premium (Stripe Press, Linear). Neutro-a-positivo se a página não gritar foto faltando. Mau sinal só se for fallback permanente sem swap planejado.
Brand-aligned recommendation: **(a) com (c) como fallback** — gate de qualidade é honesty radical aplicada ao próprio rosto: "mostro a foto se passar no mesmo critério que aplico ao código".

## D5 — Sequência de execução
Option (a) Tudo paralelo signals (interno, mas vaza): caos. Cleanup + migration colidem, branches viram conflito de 3 vias. Risco de bug em produção que cliente vê.
Option (b) Tudo serial signals: lentidão desnecessária — F-Content (WhatsApp aos clientes) tem latência humana de 1-5 dias e não toca código. Serializar custa semana de calendário.
Option (c) Híbrido (F-Content paralelo, dev serial F0→F1→F2→F3→F4..F8) signals: gestão real de dependências. WhatsApp dispara hoje, depoimentos chegam exatamente quando o dev termina F2/F3. Caminho crítico respeitado.
Brand-aligned recommendation: **(c)** — único modo que combina rapidez de envio com zero risco de regressão. "Prazo dado é prazo cumprido" (Princípio §6) só funciona se o plano de execução é honesto sobre dependências.

---

## Elemento de marca faltando no spec

**Um "diário de bordo" público com data e duração real de cada projeto.** Concreto: bloco discreto no card de cada projeto (ou página própria `/registros`) com `iniciado: 2025-08-12 · entregue: 2025-09-04 · 23 dias · 41h`. Honesty radical hoje está declarada (sem métricas inventadas, etiquetas Cliente/Estudo) mas é **negativa** — diz o que não faz. Falta o equivalente positivo: prova auditável de prazo cumprido. É o único dado que valida "Prazo dado é prazo cumprido" (Princípio 5) sem testemunho. Custa ~30min por projeto pra preencher retroativamente, é impossível de inventar sem deixar pegada (timestamps de commit), e dá ao cliente B2B exatamente o sinal que ele procura nos 30s antes de mandar WhatsApp: "este cara entrega quando diz que entrega".
