---
id: 01-d1-doce-compota
owner: agente-d1
date: 2026-05-06
status: decidido
spec_ref: v2 §4.2 (projeto #2, etiqueta `Cliente`)
decision: "(a) Restaurar deploy"
---

# D1 — Doce Compota: restaurar, esconder ou substituir?

## Recomendação: **(a) Restaurar deploy**

## Justificativa

**1. Impacto de marca do link morto.** O screenshot em `public/doce compota.png` mostra um trabalho competente — hero com foto apetitosa, hierarquia visual clara, navegação enxuta, CTA duplo (Peça já / Contato), barra promocional superior, botão WhatsApp flutuante. Não é portfolio-de-luxo, mas é honesto para o que se propõe: landing de loja artesanal. O problema não é a peça em si — é o link morto. Em portfolio sênior, link 404 num projeto rotulado `Cliente` é o pior de todos os mundos: o cliente não-tech não verifica, mas o recrutador técnico de agência clica em tudo e vai concluir "ele coloca projetos sem manter". Cinco projetos vivos é estritamente melhor que seis projetos com um suspeito. Mas restaurar é melhor que ambos.

**2. Custo vs benefício da restauração.** Spec v2 §4.2 marca Doce Compota como o **único** projeto com etiqueta `Cliente` e o único com domínio próprio (`docecompota.com.br`). Esses dois atributos são raros e diferenciadores — todos os outros cinco são `vercel.app`. Removê-lo significa perder a única prova social de "trabalhei para terceiros pagantes" e voltar o portfolio para 100% projetos pessoais/estudos, o que enfraquece o posicionamento de full-stack contratável. O custo estimado é assimétrico em favor da restauração: se o domínio só venceu SSL/DNS, são ~30min no painel Vercel + Registro.br. Se o domínio foi perdido de fato, o fallback é re-deploy em `doce-compota.vercel.app` mantendo a etiqueta `Cliente` (com nota "domínio fora do ar" removida do card) — ainda assim restaura o sinal. César tem o source local e o repo `oCesaum/Landing-Page-Doce-Compota` está vivo, então re-deploy é trivial.

**3. Princípio do portfolio honesto.** Spec v1 §4.2 fundou as etiquetas `Cliente`/`Estudo` justamente para o portfolio ser auditável — dizer o que é real e o que é exercício. Esconder um projeto real porque o deploy quebrou subverte exatamente esse princípio: vira maquiagem reversa. Substituir (opção c) é pior ainda — pede um sétimo projeto de qualidade equivalente em 1-2 semanas, e nada no inventário atual sugere que César tenha algo guardado nesse nível (se tivesse, já estaria publicado). A solução íntegra é tratar Doce Compota como dívida operacional, não como mancha permanente: restaura, atualiza tags se necessário (manter `HTML/CSS/JavaScript` é honesto sobre maturidade técnica), e mantém os seis projetos publicados anunciados nos `highlights`.

## Plano de execução

1. Verificar status do domínio `docecompota.com.br` no Registro.br (vencido vs perdido).
2. Re-deploy do repo `oCesaum/Landing-Page-Doce-Compota` na Vercel.
3. Se domínio vivo: re-apontar DNS (A/CNAME) e renovar SSL via Vercel — alvo ~30min.
4. Se domínio perdido: usar URL `*.vercel.app`, atualizar `link` em `portfolio-data.ts` linha 84, manter etiqueta `Cliente`.
5. Validar abertura do link no card e atualizar evidência no spec v2 §4.2.

## Critério de fallback

Se em 2h de tentativa o domínio não puder ser recuperado **e** o re-deploy `*.vercel.app` apresentar bug visual irrecuperável no source local, escalar para opção (b) — reduzir para 5 projetos e ajustar `highlights[0].value` de `"6"` para `"5"` em `src/utils/portfolio-data.ts`. Opção (c) fica descartada por inviabilidade de prazo.
