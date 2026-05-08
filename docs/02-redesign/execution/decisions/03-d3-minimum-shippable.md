---
id: 03-d3-minimum-shippable
owner: agente-d3
date: 2026-05-06
status: decidido
spec_ref: v2 §3 (seções), §6 (i18n), risco #9 ("César sem tempo" sev 20/25)
decision: "(b) Minimal — Hero + Projetos + Princípios (slim) + Contato; cortar Trabalho; descopar EN para F11"
---

# D3 — Escopo mínimo enviável

## Recomendação: **(b') Híbrida** — Hero + Projetos + **Princípios slim** + Contato. Cortar Trabalho. EN descopado para F11.

A opção (b) pura corta Princípios junto com Trabalho. Eu desvio: mantenho Princípios em versão enxuta (3 frases, ~1h) porque é o único bloco que carrega voz autoral. Cortar Trabalho economiza ~10–14h reais; cortar Princípios economiza 1–2h e custa o diferencial inteiro.

## Análise

**1. Cortar Trabalho — impacto de conversão.** Trabalho concentra bio + processo + stack. Bio é resolvível em 2 frases no Hero ("César, full-stack que entrega") + link "Sobre" no nav apontando para LinkedIn. Processo (`Discovery → Build → Polish`) é conteúdo de agência, não de freelancer pleno — cliente direto não lê, recrutador técnico avalia pelo Projetos. Stack é redundante: já aparece como tags em cada card de projeto e na bio do Hero. **Veredicto:** corte seguro. Conversão cai <5% e o tempo recuperado (10–14h) é desproporcional.

**2. Cortar Princípios — impacto de conversão.** Aqui (b) erra. Agent 1 review v2 adicionou Princípios *especificamente* porque sem ele o portfolio voltava para "competente mas não memorável". É o único bloco com 1ª pessoa, ponto de vista, opinião técnica. Hero tem headline curta, Projetos tem cases neutros, Contato tem form. Sem Princípios, sobra zero superfície para César soar como pessoa. Custo: 1–2h para escrever 3 frases curtas (sem ícones, sem grid elaborado, só typography enxuta). **Veredicto:** manter. ROI por hora é o mais alto de todos os blocos.

**3. EN bilingual — ROI.** Roteamento i18n no Next 15 (B1 task) traz `[locale]` segments, middleware de detecção, e dobra cada string editada. Custo real: ~12–18h só de plumbing + tradução iterativa. Benefício alegado: leads internacionais. César tem **zero** leads internacionais hoje, sem canal ativo (sem Upwork, sem Toptal, sem inglês no LinkedIn headline). Tradução de portfolio é necessária *quando* o canal de captação existe; antes disso é vaidade técnica. **Veredicto:** descopar para F11. Adicionar quando César efetivamente abrir canal EN.

**4. Probabilidade de envio.** Solo dev com risco "sem tempo" sev 20/25 + spec de 92h-com-buffer = padrão clássico de projeto que vira fantasma em 6 semanas. Estimativas:
- (a) full spec: ~40% de chegar ao ar em 6 semanas, ~70% em 10 semanas, ~25% de ser abandonado.
- (b'/recomendada): ~80% em 3 semanas, ~95% em 5. Risco de abandono <10%.
- (c) full sem EN: ~55% em 5 semanas. Trabalho continua sendo o bloco mais propenso a empacar (texto de bio é o que mais trava César historicamente).

**5. Reversibilidade.** Adicionar Trabalho em semana 4–5 pós-launch é trivial: nova rota `/sobre` ou seção injetada no scroll, sem refator. Adicionar EN depois exige migração estrutural (rotas viram `[locale]/...`) — mas ainda assim é mecânico, não destrutivo. **Veredicto:** alta reversibilidade em ambos. Isso é o argumento decisivo a favor de (b').

## Compensações para conteúdo cortado

- **Hero:** subtítulo ganha bio de 2 linhas (`César Pedroso — full-stack | Eu construo produtos finalizados, não protótipos`). Stack principal vira chip-row abaixo da headline (4–5 ícones).
- **Nav:** link "Sobre" aponta para `linkedin.com/in/cesarpedroso` em nova aba (rel=`noopener`). Nada de página vazia.
- **Projetos:** cada card já carrega tags de stack — suficiente para inferir competência técnica.
- **Contato:** abaixo do form, linha discreta `Resposta em até 24h · Brasília, BR · Aberto a remoto` cobre disponibilidade e geografia que estariam em Trabalho.
- **Footer:** mini-bio de 1 frase + tagline = encerramento honesto sem precisar de seção dedicada.

## Conclusão

Enviar em 3 semanas com voz autoral preservada > enviar em 8 semanas com seção de bio polida. Trabalho é deletável, Princípios não é, EN é vaidade até existir canal. Roadmap pós-launch já tem espaço para F8–F11 — usar.
