---
title: "Tally final — votos dos 10 agentes em D1-D5"
tipo: "decision-summary"
status: "ativo"
owner: "pensador"
atualizado_em: "2026-05-06"
---

# Tally final dos 10 agentes em D1-D5

10 agentes (5 specialists + 5 cross-cutting) votaram em cada decisão. Resultados consolidados.

---

## D1 — Doce Compota (deploy 404)

| Agente | Voto |
|--------|------|
| D1 specialist | (a) Restaurar |
| Cross-PM | (b) Esconder |
| Cross-risk | (a) com cuidado: restaurar como case-study estático (não live commerce) |
| Cross-brand | (a) Restaurar |
| Cross-UX | (a) Restaurar (404 em card `Cliente` mata em 4s) |
| Cross-velocity | (a) Restaurar (menos arquivos tocados) |

**Maioria:** 5/6 votam (a). 1 voto (b).

**Decisão final:** **(a) Restaurar** — re-deploy Vercel + verificar SSL/DNS. Antes do deploy: revisar source local pra garantir zero leaks (.env, hardcoded keys, customer data). ~30min se domain ainda registrado, ~2h se DNS expirou. Fallback se falhar em 2h: cair pra (b) com edição em `portfolio-data.ts:16` (`value: "6"` → `"5"`).

---

## D2 — Repos deletados (Fast Cart + Barber)

| Agente | Voto |
|--------|------|
| D2 specialist | (b) Esconder link `Repositório` |
| Cross-PM | (b) Esconder + microcopy honesta |
| Cross-risk | (b) com fluxo: restaurar privado → gitleaks → flip pra público |
| Cross-brand | (b) Curadoria seletiva = senioridade |
| Cross-UX | (b) Cliente não vê CTA secundário; agência lê como curadoria |
| Cross-velocity | (c) Remover (deixa dead code) |

**Maioria:** 5/6 votam (b). 1 voto (c).

**Decisão final:** **(b) Esconder link `Repositório`** apenas nesses 2 cards. Live URL permanece. Schema do projeto já tem `repositoryUrl?: string` — opcional. Pattern aceito.

**Upgrade futuro pra (a):** se César quiser republicar repos depois, pré-condições:
1. `gitleaks` ou `trufflehog` em todo histórico
2. `git filter-repo` em chaves históricas
3. Auditar logos/assets de cliente sem licença
4. Adicionar LICENSE + README
5. Code review pessoal antes de tornar público

---

## D3 — Minimum shippable

| Agente | Voto |
|--------|------|
| D3 specialist | (b') Hybrid: Hero + Projetos + Princípios slim + Contato. Cut Trabalho. Drop EN |
| Cross-PM | (b) Minimal + descopar EN, não Princípios |
| Cross-risk | (b/b') Reduzir escopo (full spec = 6-10 sem, alta prob slip) |
| Cross-brand | (b') Princípios fica (única voz autoral). Trabalho cuts cleanly. EN sem canal = vaidade |
| Cross-UX | (a) 5 seções — densidade calibrada (premium-minimal não é ausência) |
| Cross-velocity | Sem voto direto. EN economiza 10h. |

**Padrão claro:** 4/6 votam variantes de descope. UX é único defendendo full spec.

**Decisão final:** **(b') Hybrid descopado**:
- Lançar 4 seções: Hero + Projetos + **Princípios** + Contato
- **Cortar Trabalho** do MVP (vai pra F12 pós-launch)
- **Descopar EN** pra F11 pós-launch (sem canal internacional ativo, ROI = 0)
- Compensação UX (atende voto Cross-UX): Hero subtitle ganha 2 linhas de bio + chips de stack; Footer carrega 1-line mini-bio; nav "Sobre" → link externo LinkedIn (target=_blank)
- **Trabalho** entra como F12 quando foto chegar

**Tempo total revisado:** ~45h base + 30% buffer = ~58h ≈ 2 semanas focadas (vs 3 semanas full spec).

---

## D4 — Foto profissional

| Agente | Voto |
|--------|------|
| D4 specialist | (a) DIY + (c) placeholder fallback |
| Cross-PM | (c) Placeholder no launch → (a) DIY weekend slot 2 |
| Cross-risk | (b) Fotógrafo R$150-300 (DIY high prob falha) |
| Cross-brand | (a) DIY + gate de qualidade |
| Cross-UX | **Foto real obrigatória**. Placeholder mata trust em ≤3s. Adiar seção é melhor que fake |
| Cross-velocity | (c) Placeholder unblocks F7 |

**Padrão complexo:** DIY 3× | placeholder 2× | photographer 1× | UX defende "foto real ou nada"

**Decisão final:** **(a) DIY weekend** com gate rigoroso (5 checks do agente D4) + **fallback alternativo**: se DIY falhar 2 vezes, **adiar a seção Trabalho inteira** (já tá fora do MVP por D3). **Não usar placeholder genérico** (UX tem razão sobre trust collapse).

Lógica: D3 já cortou Trabalho do MVP → D4 fica desbloqueado. Foto entra com Trabalho na F12, weekend slot, sem pressão de deploy.

5 Go/No-Go checks (do agente D4) antes de commitar foto:
1. Foco trancado no olho mais próximo (zoom 200%)
2. Sem clipping de skin highlight pós split-tone, sem cast verde/amarelo
3. Background limpo (sem tomadas, molduras, sombras projetadas, fall-off >1.5m)
4. Expressão calma — "would you show this to a designer friend without apologizing?"
5. Final AVIF + WebP ≤80KB at 1500×2100

---

## D5 — Sequência de partida

| Agente | Voto |
|--------|------|
| D5 specialist | Paralelo César+dev hoje, dev serial internamente |
| Cross-PM | (a)+(b) paralelo hoje, (c) spike amanhã sequencial |
| Cross-risk | Serializar critical path (med-high prob parallel contradict) |
| Cross-velocity | Serial wins all (parallel é armadilha) |

**Consenso:** dois tracks paralelos em pessoas diferentes (César + dev), cada track serial em si.

**Decisão final:** Sequência confirmada:

**HOJE (paralelo):**
- César: dispara 5 WhatsApp testimonial messages (15min) usando templates de `03-whatsapp-templates.md`
- Dev: cleanup commit (Option A do agente 07, ~1h) — deleta 18 arquivos, sem migração

**Amanhã (serial dev):**
- Migration commit (~2-3h): Next 15 + Tailwind 4 + deps
- F2 fundamentos (~6h): tokens + globals.css + safety net + double-ring focus

**Próxima semana (serial dev):**
- F3 layout shell (~12h): Header, Footer, FAB, i18n provider PT-only inicialmente
- F5 Hero (~8h)
- F6 Projetos (~10h, depois de D1 resolvido)
- F8 Contato (~5h, depois de WhatsApp templates retornarem)
- F-Princípios (~3h)

**Single highest-leverage action TODAY** (do agente D5): César envia 5 WhatsApp messages — única latência humana externa no caminho crítico. Disparado hoje, depoimentos chegam quando dev finaliza F3, prontos pra popular F8.

---

## Meta-issues surfaced (não cobertas em D1-D5)

### Meta-1: ICP ainda não-locked (Cross-risk)
Q2 travou "cliente não-técnico + agência tech terceirizando". Mas ainda há ambiguidade:
- BR-only vs international?
- Recruiter (CLT) vs freela direto?
- Founder cedo (sem grana) vs agência média (com budget)?

Cross-risk diz: não respondendo, premium v2 pode converter pior que site atual. **Pergunta:** qual desses 4 perfis é o **mais importante** pra otimizar?

### Meta-2: Diário de bordo público (Cross-brand)
Adicionar bloco que mostra **data início + entrega + duração real** por projeto, com timestamps de commit como prova auditável. Honesty positiva — cliente vê "prazo cumprido" sem precisar de testemunho.

**Custo:** ~2h pra montar componente que lê dados estáticos. **ROI:** alto (alinha com Princípio 5 "Prazo dado é prazo cumprido").

**Recomendação:** adicionar como **F12.1** pós-Trabalho.

### Meta-3: Sub-label de domínio (Cross-UX)
CTA "Ver projeto" ganha sub-label mono mostrando domínio: `docecompota.com.br` vs `*.vercel.app`. Distingue cliente real visualmente.

**Custo:** trivial (1 prop nova em ProjectCard). **ROI:** alto.

**Recomendação:** **incorporar em F6 Projetos** desde MVP. Atualizar spec §4.3.

### Meta-4: Trilha de fadiga cognitiva (Cross-PM)
Stack F-Content em slots de baixa energia (manhã/almoço/noite tarde), trilha técnica em slots de foco (final de noite). -4-6 dias.

**Recomendação:** aplicar como heurística pessoal, sem mudança de spec.

### Meta-5: Husky pre-commit hook (Cross-velocity)
Local `tsc --noEmit` + `next lint` via husky + lint-staged. +15% velocity.

**Custo:** 15min setup. **ROI:** payback no commit #3.

**Recomendação:** **adicionar em F2 fundamentos**. Atualizar spec §8.1.

---

## Resumo executivo das decisões

| ID | Decisão final | Tempo impacto |
|----|--------------|----------------|
| D1 | (a) Restaurar Doce Compota | +0.5-2h |
| D2 | (b) Esconder repos nos 2 cards | 0h |
| D3 | (b') Hybrid: 4 seções (Hero+Projetos+Princípios+Contato), cortar Trabalho, descopar EN | -27h vs full spec |
| D4 | (a) DIY weekend + se falhar adiar seção (não placeholder) | 0h crítico (Trabalho já fora MVP) |
| D5 | Hoje paralelo (César + dev), depois serial dev | — |

**Tempo revisado pra MVP:** ~45h base, ~58h com buffer ≈ 2 semanas focadas.

**Adições ao spec a aplicar:**
- Sub-label de domínio em ProjectCard (Meta-3)
- Husky pre-commit em F2 (Meta-5)
- Diário de bordo como F12.1 pós-launch (Meta-2)

**Pergunta aberta pro user:**
- Meta-1: refinar ICP (recruiter BR / international remote / founder / agência média)?

---

## Próxima ação concreta

Aguardando green light tua. Se OK:
1. Atualizo spec v2 com decisões finais (refletir D3 cuts, adicionar Meta-3 e Meta-5)
2. Disparo cleanup commit (Option A) — ~1h
3. Tu disparas 5 WhatsApp messages (15min)
