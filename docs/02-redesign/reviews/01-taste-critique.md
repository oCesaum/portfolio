---
title: "Review 01 — Taste & UX Critique"
tipo: "review"
status: "ativo"
owner: "agente-01"
atualizado_em: "2026-05-06"
---

# Review 01 — Taste & UX Critique

Senior taste audit of `portfolio-redesign-spec.md` §0–§6. Honest read, anti-LLM-default lens.

## 1. Scorecard (0–10)

| Dimensão | Score | Justificativa |
|---|---|---|
| Originalidade vs generic-dev-portfolio | **5/10** | Boas decisões de sistema (1 accent, dark-only, mono eyebrows numerados), mas a referência declarada é literalmente "linear.app + vercel.com" — é o template default 2024 de portfólio dev sério. |
| Confiança (sabe o que é) | **8/10** | Decisões travadas, vocabulário maduro ("kind=study" honesto, sem métricas inventadas, sem formulário). Falha só em §3 hero, que é um manifesto genérico de "premium minimal". |
| Densidade vs respiro | **6/10** | Spec densa, mas a página entregue será **excessivamente arejada**: §3 hero é text-only centralizado, §6 contato é text-only centralizado. Dois pontos focais idênticos, sem ritmo. |
| Ressonância emocional B2B (não-técnico + agência) | **5/10** | Para agência: ok, comunica "operador maduro". Para cliente não-técnico: zero gancho emocional — não há prova, não há rosto até §5, não há linguagem de problema-solução. Tudo é "produtos web bem construídos", que não significa nada pra dono de loja. |
| Distinção (em meio a 50 portfólios) | **4/10** | Indistinguível de qualquer Vercel-clone bem-feito. Falta um traço autoral — gesto tipográfico, anomalia de cor, cadência de copy, qualquer coisa que assine "isto é César", não "isto é o template". |

**Média: 5,6/10.** Spec executa o "premium safe" com competência, mas não tem ousadia.

## 2. Decisões "default LLM" e alternativas distinguidas

1. **§3.2 Tagline** — `"Produtos web bem construídos, sem complicar o caminho."` é a frase que 200 portfólios escreveriam. Genérico, defensivo ("sem complicar"), zero risco.
   *Alternativa:* uma tagline em **primeira pessoa, com um verbo concreto e um objeto estranho**. Ex: `"Construo o site que sua agência ia subcontratar — e responde no mesmo dia."` Tem sujeito, oponente implícito, e diferencial.

2. **§1.2 Accent bege `#d4b896`** — bege quente é o accent default 2025–26 (Stripe, Are.na, todo Notion-like minimal). Lê como "li o mood-board do Twitter".
   *Alternativa:* accent **off-spec** que case com a cor da foto profissional (oliva esfumaçado, ferrugem dessaturada, ou um amarelo-pergaminho `#e5d49b` com 8% chroma a mais). Ou — mais ousado — derivar o accent do retrato real do César via amostragem manual e travá-lo no spec com origem documentada.

3. **§3.3 Layout hero centralizado single-column** — é literalmente o layout vercel.com. Não há nenhuma decisão autoral aqui.
   *Alternativa:* assimetria editorial — título alinhado à esquerda em coluna 8/12, eyebrow numerado na coluna 1 de fora ("01"), pílula de disponibilidade flutuando à direita do parágrafo. Cria leitura em Z, não em centro. Linear.app já não faz mais centered hero.

4. **§5.4 Tratamento da foto (grayscale → cor no hover)** — é o cliché 2018–2022 de portfólio premium. Já parodiado.
   *Alternativa:* foto **sempre colorida**, mas **com grão de filme + leve viés de matiz** (ex: split-tone bege nas highlights, azul-frio nas sombras), enquadrada em proporção 5:7 não 4:5 (cinema) com legenda mono "Belo Horizonte, 2026" — vira retrato editorial, não headshot LinkedIn.

5. **§6.2 CTA "Falar no WhatsApp"** — a etiqueta é ok funcionalmente, mas o CTA é o único elemento gigante da página e está usando linguagem genérica de botão.
   *Alternativa:* o botão diz `"Conversar agora →"` e a **microcopy abaixo** especifica `WhatsApp · resposta em até 24h`. Separa intenção (verbo) do canal (detalhe técnico) — fica menos plataforma-marketing, mais convite.

6. **§3.2 Pílula "Disponível para projetos · Resposta em até 24h"** + **§6 indicadores idênticos** — informação repetida quatro vezes na página (hero, indicadores, footer, botão flutuante). Vira ruído.
   *Alternativa:* a pílula no hero diz **um número factível e específico**: `"Próxima vaga: junho/2026"` ou `"2 projetos abertos este trimestre"`. Escassez real > "disponível 24/7" (que soa a call-center).

7. **§4.2 Tags de projeto em "linguagem de negócio"** (ex: `Ferramenta web · SEO técnico · Automação`) — listas separadas por `·` é o pattern default. Lê como tag-cloud.
   *Alternativa:* **uma frase de resultado por projeto**, no padrão `<verbo> + <quem> + <o quê>`. Ex: "Reduziu auditoria manual de sitemap de 40min pra 30s" para o DOM Comparator. Tag genérica vira evidência específica. Para os que não têm métrica: "Descreva-os pelo problema que resolvem", não pela categoria.

8. **§5.6 Stack header com text-shimmer** — shimmer linear-gradient mask é o efeito Linear-clone mais reconhecível. Sinaliza "vi um tutorial".
   *Alternativa:* remova o shimmer. Em vez disso, a lista de stack tem **um item destacado por categoria** (ex: `**Next.js** · React · TypeScript · Tailwind`) onde o destaque é o que César *escolheria primeiro hoje*. Posição editorial > ornamento decorativo.

## 3. Três movimentos fortes — preservar e amplificar

1. **§0 honestidade radical sobre o que não tem** — sem métricas inventadas, sem testemunhos placeholder renderizados, sem "10 anos de experiência". Isso é raríssimo e é o ativo mais distinguido da spec. **Amplificar:** transformar essa honestidade em copy visível ("ainda sem depoimentos públicos — peço autorização caso a caso") em vez de só esconder o bloco.

2. **§4.2 etiqueta de tipo `Featured / Cliente / Produto / Estudo`** — separar projeto comercial de estudo é maturidade. **Amplificar:** dar peso visual diferente — `Cliente` em accent, `Estudo` em foreground-subtle. Hierarquia honesta vira hierarquia visível.

3. **§2.5 Zero tracking + §2.3 WhatsApp único como canal** — decisão de produto coerente: cliente B2B brasileiro vive no WhatsApp, e zero analytics combina com posicionamento de "não somos uma agência que vai te perseguir com remarketing". **Amplificar:** mencionar isso explicitamente em copy ("sem formulário, sem cookie banner, sem remarketing — só conversa") como diferencial declarado.

## 4. Camada faltante

**Voz autoral / ponto de vista.** A spec define como o portfólio se *parece* e como se *comporta*, mas não define **o que César pensa**. Portfólios sêniores (Rauno, Ahmad Shadeed, Maxwell Barvian, Studio Lumio) carregam um **manifesto curto** — uma seção, um rodapé, um princípio repetido — que assina autoria. Aqui a bio em §5.2 é factual ("comecei em 2020 como auxiliar de TI") mas nunca declara uma posição: o que César acha que é código bom? Por que ele cobra por projeto e não por hora? O que ele *recusa* fazer?

Sem isso, o portfólio é um currículo bem-tipografado. **Adicionar:** uma sub-seção `Princípios` (3–5 frases curtas, primeira pessoa, opinativas) entre §5 Sobre e §6 Contato, ou como rodapé editorial. Exemplo de tom: *"Não trabalho com escopo aberto. Não entrego sem README. Não cobro por hora — cobro pelo problema."* Isso é o que separa "bom portfólio" de "portfólio que o cliente lembra na semana seguinte".

---

**Veredicto:** spec sólida em fundamentos, defensiva em decisões autorais. Pronta pra construir um site competente; ainda não pronta pra construir um site memorável. As 8 trocas acima e o manifesto faltante movem a média de 5,6 pra ~7,5 sem aumentar escopo de implementação.
