---
title: "Cross-cutting PM call — D1 a D5 sob lente solo-dev"
tipo: "decisao-pm"
status: "ativo"
owner: "agente-cross-pm"
atualizado_em: "2026-05-06"
referencia: "docs/02-redesign/execution/00-day1-plan.md §Decisões pendentes"
---

# Cross-PM realista — o que sobrevive a 3 semanas em capacidade noturna

## D1 — Doce Compota
**PM call: (b) esconder do portfólio v2 · porque restaurar deploy abandonado depende de cliente que já saiu (P0 vira blocker eterno) e produzir substituto custa 8-15h que não temos · risco se errado: portfólio fica com 5 projetos em vez de 6, perda estética mínima vs. semana queimada chasing DNS/Vercel de cliente fantasma. Reativar pós-launch como F12 se cliente voltar.**

## D2 — Repos deletados (Fast Cart + Barber)
**PM call: (b) esconder link "Repositório" só nesses 2 cards, manter live URL · porque tornar público de novo exige checar histórico por secrets/keys (1-2h por repo, energia gasta em zero valor de portfólio) e remover ambos derruba projetos visualmente fortes · risco se errado: recrutador percebe inconsistência ("por que esse não tem repo?") — mitiga com microcopy honesta "código privado a pedido do cliente" no card.**

## D3 — Minimum shippable
**PM call: (b) Hero + Projetos + Contato (45h base, 58h com buffer) · porque risco #1 (César sem tempo, 20/25) é o único que composta todos os outros e o spec já marca Princípios/Trabalho como "cortáveis" · risco se errado: portfólio sai "menos completo" mas atomic e shippable em 2 semanas — Princípios e Trabalho viram F11/F12 com 2h cada de iteração pós-launch quando energia volta. Lançar é melhor que perfeccionar.**

## D4 — Foto profissional
**PM call: (c) placeholder com iniciais "CA" no launch → (a) DIY no fim de semana 2 · porque foto é risco #9 (severidade 12) mas não é blocker de launch, e bookar fotógrafo (opção b) come 1 semana de calendário que F2 precisa · risco se errado: hero fica "menos pessoal" por 2 semanas — substitui pós-launch sem PR review, custo zero. Brief DIY do agente 08 fica armado pra weekend slot quando F1+F2 estabilizar.**

## D5 — Sequência de partida
**PM call: (a)+(b) hoje em paralelo, (c) amanhã sequencial · porque WhatsApp depende de terceiros (relógio externo começa AGORA, cada hora perdida é risco #2 composta) e cleanup commit é trivial de reviewar · adiar spike pra amanhã garante mente fresca pra debug Tailwind 4 + React 19 peer deps · risco se errado: empilhar 3 trilhas técnicas no dia 1 = burnout dia 2 e cleanup pode esconder bug que migração trouxe. Atomicidade > paralelismo máximo.**

---

## Recomendações cross-cutting

**1. Scope-cut adicional não óbvio: descopar EN do launch v2.0, não Princípios.**
Spec trata EN como F0 obrigatório, mas o agente 10 entregou dicionário pronto — ou seja, copy custa zero. O custo real de EN é **route-based i18n** (risco #6, severidade 12) + **generateStaticParams** + testar 2 idiomas em cada componente. Cortar EN pra F11 economiza ~8-12h reais (i18n routing, QA bilíngue, fallback de copy faltante) e remove o risco #6 inteiro do calendário. Princípios é 2h de copy + 1 componente — barato. **Lançar PT-only com `<html lang="pt">` e adicionar EN como sprint isolado pós-launch é 3x mais seguro que cortar Princípios.** Recrutador internacional ainda lê PT com tradutor; recrutador BR não toma EN como sinal.

**2. Padrão de timing que comprime calendário: "stack 2 trilhas paralelas mas diferentes em fadiga cognitiva".**
F-Content (WhatsApp + foto + copy) é trabalho **social/criativo** — drena energia diferente de migração técnica. Em vez de seguir spec sequencial (F-Content → spike → F0 → F1 → F2), rodar **F-Content nos slots de 30min-1h de baixa energia (manhã, almoço, noite tarde)** e **trilha técnica nos slots de 2-3h de foco (final de noite)**. Isso transforma o calendário de "3 semanas serial" em "2 semanas com 2 tracks alternadas". Trigger concreto: bater no F1 (hero) só depois de ter pelo menos 1 depoimento em mãos — assim risco #1 e risco #2 são atacados em paralelo sem competir pelo mesmo bloco de tempo. Ganho estimado: 4-6 dias de calendário.
