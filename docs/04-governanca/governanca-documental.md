---
title: "Governança documental"
tipo: "governanca"
status: "ativo"
owner: "time do projeto"
atualizado_em: "2026-03-24"
---

# Governança documental

## Princípios

- A pasta `docs/` é a base canônica da documentação do projeto.
- O arquivo `docs/00-hub/documentacao-hub.md` é o ponto de entrada principal.
- Mudanças incrementais têm prioridade sobre recriação de conteúdo.
- Documentos ativos devem ter owner definido e data de atualização válida.

## Padrões obrigatórios

- Novos documentos devem usar frontmatter.
- Metadados mínimos: `title`, `tipo`, `status`, `owner`, `atualizado_em`.
- Status permitidos: `rascunho`, `ativo`, `substituido`, `arquivado`.
- Arquivos devem usar `kebab-case`.
- Pastas de documentação devem seguir prefixo numérico por função quando aplicável.

## Política de atualização

- Se o documento existente resolver o problema, atualize o arquivo atual.
- Se a mudança for estrutural e romper o contexto anterior, crie um novo documento e marque o anterior como `substituido`.
- Conteúdo histórico ou concluído deve ser mantido em `docs/90-arquivo/` ou referenciado a partir dessa área.
- Não usar documento histórico como base de decisão atual sem validar seu status.

## Operação com agentes

- Codex e Cursor devem priorizar o hub documental antes de gerar novos documentos.
- `AGENTS.md` é uma configuração local do workspace e não deve ser versionado por padrão.
- Regras locais de ignore para `AGENTS.md` devem ficar em `.git/info/exclude` sempre que possível.

## Segurança documental

- Não criar trilhas de ataque e defesa sem necessidade explícita do projeto.
- Se a trilha `AGENT-SEC` for adotada no futuro, `AGENT-SEC-mestre.md` deve ser a política central.
