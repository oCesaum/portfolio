---
owner: agente-templates
title: Templates WhatsApp — Coleta de Depoimentos
contexto: Spec v2 §7.2 — go-live bloqueado até 2+ depoimentos coletados
formato_alvo: frase ≤ 280 chars + nome + cargo + empresa + foto (opcional) + autorização explícita
data: 2026-05-06
---

# Templates WhatsApp — Coleta de Depoimentos

## Template A — Cliente próximo / amigo (informal)

> Eai, [Nome]! Tudo certo?
>
> Tô relançando meu portfólio essa semana e queria muito uma frase sua sobre como foi trabalhar comigo — vai ajudar demais a fechar novos projetos.
>
> Se topar, me manda assim:
>
> *"[frase curta, até 280 caracteres]"*
> — [Seu nome], [Cargo], [Empresa]
> + foto sua (opcional, pode ser do LinkedIn)
> + um "pode publicar no site, César" pra eu ter sua autorização registrada.
>
> Se não rolar, sem stress — só me avisa que tá tranquilo.

---

## Template B — Cliente comercial neutro (semi-formal)

> Olá, [Nome], tudo bem?
>
> Aqui é o César Augusto. Estou relançando meu portfólio e gostaria de incluir um depoimento seu sobre o projeto que entregamos para a [Empresa].
>
> Se puder colaborar, preciso de:
>
> 1. Uma frase curta (até 280 caracteres) sobre o resultado
> 2. Seu nome, cargo e empresa
> 3. Foto profissional (opcional)
> 4. Sua autorização explícita para publicação no site
>
> Exemplo: *"O César entregou X em Y semanas e resolveu Z."* — Fulano, Cargo, Empresa.
>
> Se preferir não participar, sem problema algum.

---

## Template C — Cliente antigo (precisa lembrar quem é César)

> Oi, [Nome]! Aqui é o César Augusto, dev que trabalhou com você em [ano/projeto, ex.: 2023, na landing da Doce Compota]. Espero que esteja bem!
>
> Tô relançando meu portfólio e seu projeto foi marcante — adoraria incluir um depoimento seu, se fizer sentido.
>
> Se topar, me manda assim:
>
> *"[frase curta, até 280 caracteres sobre o que entreguei]"*
> — [Nome], [Cargo], [Empresa]
> + foto (opcional) + um "autorizo publicar no portfólio".
>
> Se não lembrar bem ou preferir não, fica tranquilo — agradeço de qualquer jeito.

---

## Mensagem `consentGiven` — Pós-recebimento

Enviar **após** receber a frase, formalizando autorização para registro:

> Show, [Nome]! Recebi aqui, muito obrigado pela força.
>
> Só pra deixar registrado: você me autoriza a publicar essa frase, seu nome, cargo ([Cargo]) e empresa ([Empresa]) — junto com a foto que você mandou — na seção de depoimentos do site cesaraugusto.dev e em materiais comerciais relacionados ao portfólio?
>
> Pode responder com um **"autorizo"** que já guardo aqui como confirmação. Qualquer hora que quiser remover, é só me avisar e tiro na hora.

---

## Objection handler — "não sei o que escrever"

> Sem problema! Me responde só isso: *o que mudou no seu negócio depois do projeto?* Eu transformo em frase e te mando pra aprovar antes de publicar.
