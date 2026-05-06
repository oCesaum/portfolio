---
owner: agente-urls
date: 2026-05-06
phase: 02-redesign / execution
scope: Validação live dos 6 projetos do portfólio v2
sources:
  - src/utils/portfolio-data.ts
  - docs/02-redesign/spec §4.2
---

# Validação de URLs — Portfólio v2

Verificação executada via `curl -IL` (HEAD + redirects) e `WebFetch` (renderização + match de propósito) em 2026-05-06. Repositórios checados via HTTP HEAD + GitHub REST API (`/users/oCesaum/repos`).

| # | Projeto | URL ao vivo | Status | Repo | Status repo | Observação |
|---|---|---|---|---|---|---|
| 1 | DOM Comparator Universal | https://dom-comparator.vercel.app/ | ✓ OK | https://github.com/oCesaum/DOM-Comparator | ✓ OK | HTTP 200; conteúdo confere (comparador de sitemaps XML / HTML com normalização). |
| 2 | Doce Compota | https://docecompota.com.br/ | ✗ broken | https://github.com/oCesaum/Landing-Page-Doce-Compota | ✓ OK | Domínio responde com `X-Vercel-Error: DEPLOYMENT_NOT_FOUND` (HTTP 404) e handshake TLS falha em HTTPS. Deployment removido ou DNS apontando para projeto inexistente no Vercel. |
| 3 | Fast Cart Landing Page | https://fast-cart-landing-page.vercel.app/ | ✓ OK | https://github.com/oCesaum/fast-cart-landing-page | ✗ broken | Live HTTP 200 e conteúdo confere; repo retorna 404 e não aparece na lista pública de `oCesaum` (deletado ou tornado privado). |
| 4 | Tailwind Spotify | https://tailwind-spotify-phi.vercel.app/ | ✓ OK | https://github.com/oCesaum/tailwind-spotify | ✓ OK | HTTP 200; clone visual do Spotify renderiza com playlists "Made for César Augusto". |
| 5 | Barber Landing Page | https://barber-landing-page-theta.vercel.app/ | ✓ OK | https://github.com/oCesaum/barber-landing-page | ✗ broken | Live HTTP 200 (Barbearia Soninha + agendamento WhatsApp); repo retorna 404 e ausente da lista pública (deletado ou privado). |
| 6 | Calculadora — Taxa de Gravidade | https://calculadora-hht.vercel.app/ | ✓ OK | https://github.com/oCesaum/calculadora-taxa-gravidade | ✓ OK | HTTP 200; calculadora `TG = T x 1.000.000 / HHT` renderiza. |

## Veredito

**5 de 6 projetos prontos para o lançamento do portfólio v2. 3 bloqueadores.**

### Bloqueadores em ordem de severidade

1. **P0 — Doce Compota live quebrado** (`https://docecompota.com.br/`). Domínio próprio retorna `DEPLOYMENT_NOT_FOUND` no Vercel e falha de TLS em HTTPS. É o único projeto do portfólio com domínio customizado, e o link do card vai levar a uma página 404 visível ao visitante. **Ação:** redeploy no Vercel ou substituir `link` por uma URL `*.vercel.app` ativa antes do launch.
2. **P1 — Repo Fast Cart 404** (`oCesaum/fast-cart-landing-page`). Card tem botão "código-fonte" que vai quebrar. **Ação:** restaurar/republicar o repo, ou remover `repositoryUrl` do objeto em `portfolio-data.ts` para esconder o CTA de repo apenas neste card.
3. **P1 — Repo Barber 404** (`oCesaum/barber-landing-page`). Mesma situação do #3. **Ação:** restaurar/tornar público, ou remover `repositoryUrl`.

Os três sites Vercel em si (Fast Cart, Barber) seguem online e podem ser linkados; o problema é só o repo. Doce Compota é o único em que o produto final não está acessível.
