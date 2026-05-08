---
id: D2
owner: agente-d2
title: Repos deletados — Fast Cart (#3) e Barber (#5)
status: decided
date: 2026-05-06
spec_ref: v2 §4.2
related_cards: [3, 5]
recommendation: B
---

# D2 — Repos deletados (Fast Cart, Barber)

## Contexto

Spec v2 §4.2 lista Fast Cart (#3) e Barber (#5) com `liveUrl` + `repositoryUrl`.
URLs ao vivo funcionam; os repos `oCesaum/fast-cart-landing-page` e `oCesaum/barber-landing-page` estão privados/deletados. Schema do dado declara `repositoryUrl?: string` — ou seja, opcional.

## Análise

### 1. Leitura B2B sobre repo ausente
Agência olhando portfólio de dev full-stack lê repo ausente como **sinal neutro**, não negativo, *desde que* a peça ao vivo esteja sólida. O viés "código fraco escondido" só aparece se a maioria dos cards mostra repo e dois destoam sem explicação. Mitigação: framing curatorial, não defensivo (ver §B abaixo).

### 2. Consistência de padrão
Como `repositoryUrl` é opcional no schema, a UI **já precisa** tratar o caso ausente. Cards 3 e 5 com CTA único ("Ver projeto") não são bug — são uso legítimo do contrato. Inconsistência visual só fere se o componente não foi desenhado pra essa variação; nesse caso o fix é no componente, não no dado.

### 3. Risco de restaurar às cegas
Alto. Repos antigos de landing tipicamente carregam:
- `.env` commitado em algum momento do histórico (chaves de API, SMTP, analytics)
- Logos/assets de cliente sem licença pra uso público
- Código datado que envergonha a versão atual do César
- Endpoints hardcoded de staging

Tornar público sem auditoria é **net negativo**: troca um sinal neutro (repo ausente) por um sinal ativamente ruim (commit history sujo).

### 4. Filtro técnico de agência
Agências sérias valorizam **curadoria seletiva** sobre exposição total. Portfólio é vitrine, não dump do GitHub. "Mostro o que vale mostrar" lê como senioridade; "tudo público sempre" lê como júnior sem filtro. Vetor (ii) ganha.

## Recomendação: **Opção B**

Esconder `repositoryUrl` apenas nos cards 3 e 5. Cards mostram só "Ver projeto". Demais cards mantêm "Ver projeto + Repositório".

**Por quê:**
- Schema já suporta (`repositoryUrl?`), zero dívida técnica.
- Risco zero (não toca código antigo).
- Leitura curatorial vence leitura inconsistente, dado o filtro de agência.
- Reversível: se César auditar e liberar depois, é só preencher o campo.

## Implementação

1. Em `src/data/projects.ts` (ou equivalente da spec v2): omitir `repositoryUrl` dos itens #3 e #5.
2. No componente `ProjectCard`: garantir branch que renderiza apenas o CTA primário quando `repositoryUrl` é `undefined` — sem placeholder, sem botão desabilitado.
3. Teste visual: confirmar que card sem repo não fica com gap fantasma onde o segundo CTA estava.

## Caminho de upgrade futuro (se César quiser voltar pra opção A)

Pré-condições obrigatórias antes de tornar qualquer repo público de novo:
- [ ] `git log -p | grep -iE "(api[_-]?key|secret|token|password|smtp)"` limpo
- [ ] Histórico varrido com `gitleaks detect` ou `trufflehog` — zero achados
- [ ] `.env`, `.env.local`, credenciais e dumps removidos do histórico inteiro (não só HEAD) via `git filter-repo`
- [ ] Logos, fotos e copy de cliente: confirmar direito de uso público OU substituir por placeholder
- [ ] README atualizado explicando contexto, stack e o que o projeto demonstra
- [ ] LICENSE definida (MIT pra portfolio é razoável)
- [ ] Code review pessoal: o César de hoje assina embaixo desse código?

Se algum item falhar, manter privado. Opção B continua válida indefinidamente.

## Decisão

**B aprovada.** Implementar na próxima passagem pelos cards. Reabrir como D2.1 caso César queira reauditar e republicar.
