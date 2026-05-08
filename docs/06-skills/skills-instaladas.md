---
title: "Skills instaladas — guia de uso para agentes"
tipo: "guia"
status: "ativo"
owner: "time do projeto"
atualizado_em: "2026-05-08"
---

# Skills instaladas — guia de uso para agentes

Este documento é a referência canônica que **agentes e subagentes (Claude Code, Codex, Cursor, etc.)** devem consultar antes de invocar qualquer skill. Cada entrada explica **o que a skill ensina**, **quando usar**, **quando NÃO usar**, **como invocar** e **saída esperada**.

Regra geral: **leia este guia antes de escolher uma skill**. Não invoque skill por nome similar — confirme propósito aqui primeiro.

## Sumário

1. [Convenções de invocação](#convenções-de-invocação)
2. [Matriz rápida de decisão](#matriz-rápida-de-decisão)
3. [Skills de design](#skills-de-design)
   - [emil-design-eng](#emil-design-eng)
   - [impeccable](#impeccable)
   - [design-taste-frontend](#design-taste-frontend)
   - [gpt-taste](#gpt-taste)
   - [high-end-visual-design](#high-end-visual-design)
   - [stitch-design-taste](#stitch-design-taste)
   - [redesign-existing-projects](#redesign-existing-projects)
   - [minimalist-ui](#minimalist-ui)
   - [industrial-brutalist-ui](#industrial-brutalist-ui)
   - [brandkit](#brandkit)
   - [imagegen-frontend-web](#imagegen-frontend-web)
   - [imagegen-frontend-mobile](#imagegen-frontend-mobile)
   - [image-to-code](#image-to-code)
4. [Skills de fluxo de trabalho](#skills-de-fluxo-de-trabalho)
   - [pensador](#pensador)
   - [executor](#executor)
   - [caveman](#caveman-modo-de-comunicação)
   - [cavecrew](#cavecrew)
   - [claude-api](#claude-api)
   - [full-output-enforcement](#full-output-enforcement)
5. [Skills utilitárias](#skills-utilitárias)
6. [Anti-padrões e armadilhas](#anti-padrões-e-armadilhas)
7. [Manutenção do conjunto](#manutenção-do-conjunto)

---

## Convenções de invocação

Existem três formas de invocar uma skill:

1. **Tool `Skill`**: chame `Skill(skill="nome-da-skill", args="...")` quando o nome aparecer na lista de skills disponíveis da sessão.
2. **Frase natural**: descreva a intenção (ex.: "polir essa tela") e o harness/orquestrador roteia para a skill correta. Funciona porque cada skill declara `description` e gatilhos no frontmatter de seu `SKILL.md`.
3. **Sub-comando direto** (apenas `impeccable`): `impeccable:critique`, `impeccable:audit`, etc. Cada sub-comando carrega prompt especializado.

Antes de invocar:
- Confirme que a skill **está listada na sessão atual** (ver system reminder de skills disponíveis).
- Não invente nomes de skills com base em conhecimento prévio. Skills mudam por sessão.
- Skills geram instruções e código; **não substituem revisão humana** em decisões de produto.

---

## Matriz rápida de decisão

Use esta tabela para decidir qual skill aplicar dado o pedido.

| Pedido do usuário | Skill primária | Combinar com |
|---|---|---|
| "Polir / dar acabamento / pré-launch" | `impeccable:polish` | `emil-design-eng` |
| "Criticar / revisar UX / dar feedback" | `impeccable:critique` | `gpt-taste` |
| "Auditar acessibilidade / performance / responsivo" | `impeccable:audit` | — |
| "Está sem graça / genérico / muito AI" | `gpt-taste` | `high-end-visual-design`, `design-taste-frontend` |
| "Está intenso demais / quietar / refinar" | `impeccable:quieter` | — |
| "Adicionar animação / micro-interação" | `impeccable:animate` | `emil-design-eng` |
| "Tornar mais ousado / impactante" | `impeccable:bolder` | `high-end-visual-design` |
| "Simplificar / remover ruído" | `impeccable:distill` | — |
| "Tipografia / fontes / hierarquia textual" | `impeccable:typeset` | `emil-design-eng` |
| "Cor / paleta / monocromático demais" | `impeccable:colorize` | — |
| "Layout / espaçamento / ritmo visual" | `impeccable:layout` | `design-taste-frontend` |
| "Responsivo / mobile / breakpoints" | `impeccable:adapt` | — |
| "Performance / bundle / LCP / lag" | `impeccable:optimize` | — |
| "Empolgar / wow / extraordinário" | `impeccable:overdrive` | `high-end-visual-design` |
| "Adicionar charme / delight / personalidade" | `impeccable:delight` | `emil-design-eng` |
| "Microcopy / mensagens de erro confusas" | `impeccable:clarify` | — |
| "Planejar UI antes de codar" | `impeccable:shape` | — |
| "Construir página/app premium do zero" | `impeccable` (root) | `gpt-taste` ou `high-end-visual-design` |
| "Refazer projeto existente" | `redesign-existing-projects` | `gpt-taste` |
| "Estética minimalista" | `minimalist-ui` | — |
| "Estética brutalist / industrial / dashboard tactical" | `industrial-brutalist-ui` | — |
| "Brand kit / identidade / logos" | `brandkit` | — |
| "Imagens-referência horizontais por seção" | `imagegen-frontend-web` | — |
| "Mockups de tela mobile" | `imagegen-frontend-mobile` | — |
| "Imagem → código de site" | `image-to-code` | `impeccable` |
| "Sistema de design DESIGN.md anti-genérico" | `stitch-design-taste` | — |
| "Geração com saída longa sem cortes / placeholders" | `full-output-enforcement` | qualquer skill |
| "Planejar tarefa multi-fase para outra sessão executar" | `pensador` | — |
| "Aplicar prompts em fases vindos de outra sessão" | `executor` | — |
| "Comprimir comunicação para economizar tokens" | `caveman` | — |
| "Code review compacto / commits compactos" | `caveman:caveman-review` ou `caveman:caveman-commit` | — |
| "Construir/depurar app que usa Anthropic SDK" | `claude-api` | — |

---

## Skills de design

### emil-design-eng

**O que ensina**: filosofia de design engineering do Emil Kowalski. Foca em micro-detalhes invisíveis que fazem software "sentir certo" — timing de animação, easing, transições de estado, polimento de componentes (dialog, list, sidebar, toast), discrição de motion design (Framer Motion), e a regra de que "taste é treinada, não inata".

**Quando usar**:
- Polir interação que já funciona mas "sente estranho"
- Decidir entre `ease-in-out` vs `cubic-bezier` específico
- Refinar transições de modal/drawer/dialog
- Implementar animações sutis que aparecem só quando necessário
- Avaliar se uma animação ajuda ou polui a UX

**Quando NÃO usar**:
- Layout/composição visual macro (use `design-taste-frontend` ou `impeccable:layout`)
- Decisões de paleta de cor (use `impeccable:colorize`)
- Sistemas de design completos (use `stitch-design-taste`)

**Como invocar**: pergunte "como o Emil Kowalski faria essa transição?" ou diretamente `Skill(skill="emil-design-eng")`. Ao ser invocada sem pergunta específica, ela responde com saudação fixa e aguarda — então sempre acompanhe de uma pergunta concreta.

**Saída esperada**: recomendações textuais sobre timing (em ms), easing functions específicas, ordem de mount/unmount, e padrões de interação. Não gera componente completo do zero — refina o que existe.

---

### impeccable

**O que ensina**: anti-genérico de UI premium. Guarda-chuva com 17 sub-comandos. Cada sub-comando é uma skill especializada. Use o **sub-comando correto** em vez do root `impeccable` quando o pedido é específico.

**Sub-comandos** (todos invocáveis como `impeccable:<nome>`):

| Sub-comando | Quando usar |
|---|---|
| `impeccable` (root) | Construir página/componente premium do zero. Roteia para `craft` (build), `teach` (setup de contexto), `extract` (puxar tokens reutilizáveis) |
| `shape` | **Antes** de codar. Discovery interview + brief de design |
| `craft` | Construção orientada por shape-then-build |
| `critique` | Avaliar UX com scoring quantitativo, persona testing, anti-pattern detection |
| `audit` | Checagem técnica: a11y, performance, theming, responsivo, anti-patterns. Score P0-P3 |
| `polish` | Pass final pré-launch — alinhamento, espaçamento, consistência |
| `distill` | Strip pra essência — remover complexidade desnecessária |
| `bolder` | Amplificar designs sem graça |
| `quieter` | Acalmar designs agressivos demais |
| `clarify` | Melhorar microcopy, labels, mensagens de erro |
| `colorize` | Adicionar cor estratégica em design monocromático |
| `typeset` | Refinar tipografia (fontes, hierarquia, sizing, peso) |
| `layout` | Corrigir grids monótonos, espaçamento, ritmo visual |
| `adapt` | Tornar responsivo / multi-device |
| `animate` | Adicionar animações com propósito |
| `delight` | Adicionar momentos de joy / personalidade |
| `optimize` | Diagnosticar e corrigir performance UI |
| `overdrive` | Empurrar além do convencional — shaders, spring physics, scroll-driven |

**Quando usar root `impeccable`**: pedidos abertos como "construa página de vendas premium" ou "redesenhe esse componente". Ele orquestra os sub-comandos.

**Quando NÃO usar**: tarefas backend, lógica não-UI, ou quando o pedido é tão específico que um sub-comando dedicado é melhor.

**Como invocar**:
- `Skill(skill="impeccable", args="craft <descrição>")`
- ou diretamente o sub-comando: `Skill(skill="impeccable:polish")`
- Frase natural: o orquestrador roteia ("revise essa tela" → `critique`).

**Saída esperada**: depende do sub-comando. `audit` retorna relatório scored. `polish` retorna diff. `craft` retorna implementação. `shape` retorna brief antes de codar.

**Conflitos**: NÃO use `impeccable:bolder` e `impeccable:quieter` na mesma sessão sem decidir direção. NÃO use `impeccable:overdrive` em contextos onde simplicidade é exigida (formulário governamental, site institucional sério).

---

### design-taste-frontend

**O que ensina**: senior frontend engineer com baseline configurável (DESIGN_VARIANCE=8, MOTION_INTENSITY=6, VISUAL_DENSITY=4). Anula vieses default de LLMs em layout, escolha de stack, hardware acceleration de CSS, arquitetura de componentes RSC vs Client.

**Quando usar**:
- Construir interface React/Next nova com identidade visual marcante
- Garantir que decisões de RSC vs `"use client"` estão corretas
- Forçar verificação de dependências antes de importar libs
- Aplicar regras de hardware acceleration (transform, opacity, will-change) em animações
- Pedidos onde o usuário quer "alta agência" no design — não conservador

**Quando NÃO usar**:
- Designs minimalistas ou enxutos (use `minimalist-ui`)
- Quando o usuário pediu "simples" ou "limpo" — esta skill empurra pra densidade média e variância alta
- Componente isolado pequeno (use `impeccable:craft`)

**Como invocar**: `Skill(skill="design-taste-frontend")` antes de tarefa de construção frontend, ou frase como "construa com taste senior".

**Saída esperada**: código React/Next com decisões explícitas de variância de layout, motion calibrado, e verificação prévia de `package.json`.

---

### gpt-taste

**O que ensina**: anti-vícios de LLM em UI. Força randomização Python-driven na escolha de layout, baniu fontes genéricas (Inter), proibiu wraps de heading de 6 linhas, força bento grids sem gaps, GSAP com pinning/scrubbing, e tipografia editorial larga.

**Quando usar**:
- Site landing AWWWARDS-tier
- Quando design anterior saiu genérico (cards centralizados, hero esquerda-texto/direita-imagem, navbar sticky padrão)
- Garantir que o resultado **não pareça AI-generated**
- Combinação com GSAP avançado

**Quando NÃO usar**:
- App interno, dashboard administrativo, ferramenta utilitária — esta skill é para landing/marketing impactante
- Quando o usuário não quer GSAP
- Sites onde Inter ou fontes Google básicas são exigidas pelo brand guideline

**Como invocar**: `Skill(skill="gpt-taste")` com prompt descrevendo a página. Ela simula plano Python interno antes de codar.

**Saída esperada**: bloco `<design_plan>` com escolhas randomizadas + código com Satoshi/Cabinet Grotesk/Outfit/Geist (nunca Inter), bento grids gapless, ScrollTriggers GSAP.

---

### high-end-visual-design

**O que ensina**: padrões "Apple-tier / Linear-tier / Awwwards" — fontes premium (Geist, Clash Display, PP Editorial New), ícones ultra-light (Phosphor Light, Remix Line), proibição de borders 1px solid gray, shadows harsh, layouts simétricos sem whitespace, transições `linear`. Define exatamente o que faz site "parecer caro".

**Quando usar**:
- Pedido contém "premium", "agência", "$150k", "Linear", "Apple", "Awwwards"
- Auditar se um design existente atinge nível "expensive"
- Decidir que sombras, fontes, ícones, e transições usar

**Quando NÃO usar**:
- Brand guidelines exigem Inter/Roboto explicitamente
- Projeto educacional/utilitário onde "parecer caro" não é objetivo
- Conflita com `minimalist-ui` (filosofias diferentes — esta empurra pra haptic depth, minimalist puxa pra plano)

**Como invocar**: `Skill(skill="high-end-visual-design")` antes de tarefa onde "premium feel" importa.

**Saída esperada**: persona `Vanguard_UI_Architect` aplicada — sempre combina arquétipos premium diferentes para evitar repetir layout. Diretiva "ABSOLUTE ZERO" rejeita instantaneamente qualquer output com fonte/ícone/shadow banido.

---

### stitch-design-taste

**O que ensina**: gera arquivo `DESIGN.md` semântico anti-genérico para o projeto. Contém tokens de tipografia, cor calibrada, layouts assimétricos, micro-motion perpétua, e rules de hardware acceleration. Pensado para Google Stitch mas aplicável.

**Quando usar**:
- Bootstrap inicial de projeto que precisa de design system
- Documentar tokens existentes em formato consumível por outras skills/agentes
- Garantir que múltiplas sessões/agentes compartilhem mesmas regras

**Quando NÃO usar**:
- Projeto já tem design system documentado
- Tarefa pontual de UI (use `impeccable:craft`)

**Como invocar**: `Skill(skill="stitch-design-taste")` no setup inicial.

**Saída esperada**: arquivo `DESIGN.md` para o repositório com tokens e regras enforce-able.

---

### redesign-existing-projects

**O que ensina**: workflow específico para refazer site/app existente sem quebrar funcionalidade. Audita design atual → identifica padrões AI-genéricos → aplica padrões high-end → preserva comportamento.

**Quando usar**:
- Refactor visual de site existente
- Migrar de tema "AI-genérico" para "premium" sem reescrever lógica
- Compatível com qualquer CSS framework ou vanilla CSS

**Quando NÃO usar**:
- Projeto novo (use `impeccable:craft` ou `high-end-visual-design`)
- Refactor de lógica/dados (esta skill foca apenas em design)

**Como invocar**: `Skill(skill="redesign-existing-projects")` apontando o repositório alvo.

---

### minimalist-ui

**O que ensina**: estética editorial minimalista — paleta warm monochrome, contraste tipográfico, bento grids planos, pastéis muted. Proíbe gradientes e sombras pesadas.

**Quando usar**:
- Pedido explícito de "minimalista", "editorial", "clean", "limpo"
- Site institucional/portfolio onde restraint é parte do brand
- Conteúdo onde tipografia carrega o peso visual

**Quando NÃO usar**:
- Pedido pede "wow", "impactante", "ousado" — use `gpt-taste` ou `high-end-visual-design`
- Dashboard data-heavy onde você precisa hierarquia colorida (use `industrial-brutalist-ui` se for tactical)

**Como invocar**: `Skill(skill="minimalist-ui")`.

---

### industrial-brutalist-ui

**O que ensina**: interfaces mecânicas raw fundindo Swiss typographic print + estética terminal militar. Grids rígidos, contraste extremo de escala tipográfica, cores utilitárias, efeitos de degradação analógica.

**Quando usar**:
- Dashboard data-heavy (telemetry, monitoring, ops)
- Portfolio que quer parecer "blueprint declassificado"
- Site editorial com vibe técnica
- Pedido contém "brutalist", "industrial", "tactical", "terminal", "blueprint"

**Quando NÃO usar**:
- E-commerce, SaaS amigável, produto consumidor — choca demais
- Audiência sensível a estética agressiva

**Como invocar**: `Skill(skill="industrial-brutalist-ui")`.

---

### brandkit

**O que ensina**: gera **imagens** de brand-kit premium — boards de identidade, sistemas de logo, decks visuais. Tipologias: minimalist, cinematic, editorial, dark-tech, luxury, cultural, security, gaming, developer-tool, consumer-app.

**Quando usar**:
- Apresentação de identidade de marca
- Conceitos de logo iniciais
- Mockups premium para deck/cliente
- Visual world / mood board

**Quando NÃO usar**:
- Você quer **código** (esta skill produz **imagens** apenas)
- Tarefa de UI implementada (use skills de frontend)

**Como invocar**: `Skill(skill="brandkit")` com briefing de marca.

**Saída esperada**: imagens. Não escreve código.

---

### imagegen-frontend-web

**O que ensina**: gera **uma imagem horizontal por seção** de site. Regra crítica: 8 seções = 8 imagens. Nunca compactar múltiplas seções numa única imagem. Para uso como referência visual antes de implementar.

**Quando usar**:
- Antes de codar landing page — gerar referência visual seção por seção
- Apresentar conceito ao cliente antes de implementação
- Pipeline imagem → código (combinar com `image-to-code`)

**Quando NÃO usar**:
- Já existe design final (Figma, etc.)
- Tarefa de implementação direta sem fase visual

**Como invocar**: `Skill(skill="imagegen-frontend-web")` com lista de seções desejadas (default: 6 ou 8 seções se não especificado).

**Saída esperada**: N imagens horizontais, anunciadas sequencialmente ("Section 1 of 8: Hero").

---

### imagegen-frontend-mobile

**O que ensina**: imagens premium app-native de telas iOS/Android. Foco em hierarquia limpa, texto legível, consistência multi-tela, paletas controladas, mockup de phone com frame visível.

**Quando usar**:
- Conceito de fluxo mobile (onboarding, auth, dashboard, profile, settings, chat, ecommerce, fintech)
- Apresentação de produto mobile
- Referência antes de implementar React Native / SwiftUI / Flutter

**Quando NÃO usar**:
- Site web responsivo (use `imagegen-frontend-web`)
- Você quer código mobile (esta skill produz **imagens**)

**Como invocar**: `Skill(skill="imagegen-frontend-mobile")` com fluxo descrito.

---

### image-to-code

**O que ensina**: pipeline imagem-first → código. Gera imagens de referência primeiro, analisa profundamente, depois implementa. Otimizado para Codex. Prefere imagens grandes seção-específicas em vez de boards comprimidos.

**Quando usar**:
- Pedido visual importante onde "ver antes de codar" ajuda
- Hero, landing, página premium multi-seção
- Quer evitar resultado AI-genérico forçando passo visual antes do código

**Quando NÃO usar**:
- Componente isolado pequeno
- Tarefa lógica/backend
- Já existe design pronto (Figma)

**Como invocar**: `Skill(skill="image-to-code")` com brief.

---

## Skills de fluxo de trabalho

### pensador

**O que ensina**: modo planner do workflow planner+executor. Esta sessão planeja em Fases numeradas; **outra sessão** (executor) aplica.

**Quando usar**:
- Tarefa multi-arquivo grande
- Você quer separar **decisão** (esta sessão) de **aplicação** (outra sessão)
- Side effects externos (commit, push, PR, deploy) precisam ser controlados pela sessão planejadora

**Quando NÃO usar**:
- Tarefa simples 1-2 arquivos (use direto sem cerimônia)
- Sessão única conseguindo fazer tudo

**Como invocar**: usuário diz "vou agir como pensador" ou `/pensador`. Skill é ativada automaticamente pelo nome.

**Contrato**:
- Não improvisar — parar e perguntar em ambiguidade
- Pesquisar antes de planejar
- Decisões de produto/UX vêm do usuário
- Trabalhar em worktree dedicada
- Trust-but-verify após cada Fase do executor
- Pausar antes de side effects

---

### executor

**O que ensina**: modo aplicador do workflow planner+executor. Recebe prompts em Fases numeradas e aplica com precisão. PARA em ambiguidade — não improvisa.

**Quando usar**:
- Outra sessão (pensador) gerou prompt em Fase numerada
- Você precisa aplicar edits exatos `old_string`/`new_string`
- Disciplina: zero side effects fora do escopo descrito

**Quando NÃO usar**:
- Você é a sessão planejadora — use `pensador`
- Tarefa não foi pré-planejada por outra sessão

**Como invocar**: usuário diz "modo executor" ou cola prompt entre setas `⬇️ Início do prompt` / `⬆️ Fim do prompt`.

---

### caveman (modo de comunicação)

**O que ensina**: ultra-compressão de comunicação. Corta artigos, fillers, pleasantries. Mantém substância técnica. Variantes: `lite`, `full` (default), `ultra`, `wenyan-*`. Reduz tokens ~75%.

**Quando usar**:
- Sessão longa onde context window aperta
- Usuário pede "menos texto", "seja breve", "/caveman"
- Necessidade explícita de reduzir tokens

**Quando NÃO usar**:
- Security warnings (auto-desliga)
- Confirmações irreversíveis (push/deploy/migration)
- Multi-step sequences onde ordem importaria
- Code/commits/PRs (sempre escrever normal nesses)

**Sub-skills relacionadas**:
| Sub-skill | Para quê |
|---|---|
| `caveman:caveman-help` | Card de referência |
| `caveman:caveman-commit` | Commit messages comprimidas (Conventional Commits) |
| `caveman:caveman-review` | Code review comments compactos |
| `caveman:caveman-stats` | Métricas reais de tokens da sessão |
| `caveman:compress` | Comprimir arquivos de memória (CLAUDE.md, todos) |

**Como invocar**: `/caveman`, "modo caveman", ou auto-trigger por contexto.

---

### cavecrew

**O que ensina**: guia de decisão para delegar trabalho a subagentes caveman-style (`cavecrew-investigator`, `cavecrew-builder`, `cavecrew-reviewer`). Output dos subagentes é caveman-comprimido — protege ~60% do contexto da sessão principal.

**Quando usar**:
- Sessão principal está perto do limite
- Tarefa pode ser delegada (busca de código, edit pequeno, review de diff)
- Você quer output compacto

**Quando NÃO usar**:
- Tarefa simples que cabe inline
- Você precisa do output verboso para acompanhar

**Como invocar**: `Agent(subagent_type="caveman:cavecrew-investigator|builder|reviewer")`.

---

### claude-api

**O que ensina**: build/debug/optimize de apps que usam Anthropic SDK. Inclui prompt caching, thinking, compaction, tool use, batch, files, citations, memory. Migrações entre versões de modelo (4.5 → 4.6 → 4.7).

**Quando usar**:
- Código importa `anthropic` ou `@anthropic-ai/sdk`
- Pergunta sobre Claude API / Anthropic SDK / Managed Agents
- Adicionar/modificar feature do Claude (caching, thinking, tool use)

**Quando NÃO usar**:
- Código importa `openai` ou outro SDK
- Filename `*-openai.py` / `*-generic.py`
- Programação geral / ML genérico

---

### full-output-enforcement

**O que ensina**: sobrescreve comportamento default de truncamento do LLM. Bane padrões `// ...`, `// rest of code`, `// TODO`, "for brevity", "the rest follows the same pattern". Força entrega completa.

**Quando usar**:
- Pedido pede arquivo completo, lista completa de N items
- Resultados anteriores vieram truncados
- Tarefa production-critical onde parcial = quebrado

**Quando NÃO usar**:
- Pedido explícito de snippet curto
- Demonstração conceitual onde truncar com `...` é didático

**Como invocar**: `Skill(skill="full-output-enforcement")` antes de pedido pesado.

---

## Skills utilitárias

| Skill | Para quê |
|---|---|
| `update-config` | Editar `settings.json` do Claude Code (hooks, permissions, env vars) |
| `keybindings-help` | Customizar `keybindings.json` |
| `fewer-permission-prompts` | Adicionar allowlist de Bash/MCP em `.claude/settings.json` |
| `loop` | Rodar prompt/slash-command em intervalo recorrente |
| `schedule` | Criar/listar/rodar agentes remotos em cron schedule |
| `simplify` | Revisar código alterado para reuse, qualidade, eficiência |
| `init` | Inicializar `CLAUDE.md` do projeto |
| `review` | Revisar PR |
| `security-review` | Security review do branch atual |

---

## Anti-padrões e armadilhas

1. **Não invocar skill por nome similar** — `frontend-design`, `webgpu-threejs-tsl`, `ui-ux-pro-max` foram **removidos**. Se aparecerem em system reminder antigo, restart da sessão é necessário. Não use.
2. **Não combinar `bolder` + `quieter`** na mesma sessão sem decisão prévia.
3. **Não usar `gpt-taste` ou `high-end-visual-design`** em dashboard interno — desperdício e clash com restraint exigido.
4. **Não usar `minimalist-ui` + `industrial-brutalist-ui`** juntos — filosofias incompatíveis.
5. **Skills de imagem (`brandkit`, `imagegen-*`) NÃO geram código** — separe a fase visual da implementação.
6. **`emil-design-eng` ao ser invocada sozinha responde com saudação fixa** — sempre acompanhe de pergunta concreta.
7. **`pensador` e `executor` exigem disciplina de duas sessões** — não tente os dois papéis na mesma sessão.
8. **Caveman desativa em segurança/irreversíveis** automaticamente — não force.
9. **Skills mudam por sessão** — confirme disponibilidade antes de invocar.

---

## Manutenção do conjunto

Skills de design são gerenciadas via `npx skills` em escopo global (`-g`).

```bash
# Listar instaladas
npx skills list -g

# Adicionar
npx skills add -g -y <pacote>

# Remover
npx skills remove -g -y -s <nome>

# Atualizar
npx skills update -g
```

Repositórios atualmente instalados:

| Origem | Skills geradas |
|---|---|
| `emilkowalski/skill` | `emil-design-eng` |
| `pbakaus/impeccable` | `impeccable` (com 17 sub-comandos) |
| `https://github.com/Leonxlnx/taste-skill` | `brandkit`, `design-taste-frontend`, `gpt-taste`, `high-end-visual-design`, `imagegen-frontend-mobile`, `imagegen-frontend-web`, `image-to-code`, `industrial-brutalist-ui`, `minimalist-ui`, `redesign-existing-projects`, `stitch-design-taste`, `full-output-enforcement` |

Caveman e claude-api vêm com a runtime do Claude Code. Pensador e executor são skills locais do usuário.

Antes de adicionar nova skill: leia o `description` do `SKILL.md` da fonte e atualize **este documento** antes de codificar uso. Skills sem entrada aqui não devem ser invocadas em fluxo automatizado.
