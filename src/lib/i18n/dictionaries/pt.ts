export type Dictionary = {
  meta: { title: string; description: string; brand: string };
  nav: { home: string; projects: string; work: string; principles: string; contact: string };
  hero: {
    eyebrow: string;
    pill: string;
    title_line1: string;
    title_line2: string;
    lead: string;
    cta_primary: string;
    cta_secondary: string;
    stack_inline: readonly string[];
  };
  projects: {
    eyebrow: string;
    title: string;
    subtitle: string;
    cta_view: string;
    cta_repo: string;
    type_featured: string;
    type_client: string;
    type_product: string;
    type_study: string;
  };
  work: {
    eyebrow: string;
    title: string;
    bio: readonly string[];
    method_eyebrow: string;
    method: readonly string[];
    stack_eyebrow: string;
    stack: {
      frontend: { label: string; items: readonly string[] };
      backend: { label: string; items: readonly string[] };
      data: { label: string; items: readonly string[] };
      tooling: { label: string; items: readonly string[] };
    };
    portrait_alt: string;
    portrait_caption: string;
  };
  principles: { eyebrow: string; title: string; items: readonly string[] };
  contact: {
    eyebrow: string;
    title: string;
    lead: string;
    cta_primary: string;
    cta_rotating: readonly string[];
    fallback: string;
    other_channels_eyebrow: string;
    testimonials_eyebrow: string;
    whatsapp_message: string;
  };
  fab: { label: string; aria_label: string };
  footer: { role: string; tagline: string };
};

export const pt: Dictionary = {
  meta: {
    title: "César Augusto — Full-stack engineer",
    description:
      "Produtos web claros, do briefing ao deploy. Trabalho com founders e times pequenos que precisam de execução técnica direta.",
    brand: "César Augusto",
  },
  nav: {
    home: "Início",
    projects: "Projetos",
    work: "Trabalho",
    principles: "Princípios",
    contact: "Contato",
  },
  hero: {
    eyebrow: "01 / Início",
    pill: "Aceitando 2 projetos este trimestre · Resposta em até 24h",
    title_line1: "Produtos web claros,",
    title_line2: "do briefing ao deploy.",
    lead: "Trabalho com founders e times pequenos que precisam tirar um produto web do briefing pro deploy — sem virar refém de agência, sem perder mês em reunião.",
    cta_primary: "Falar no WhatsApp",
    cta_secondary: "Ver projetos",
    stack_inline: ["Next.js", "TypeScript", "Supabase", "React", "Tailwind"],
  },
  projects: {
    eyebrow: "02 / Projetos",
    title: "Trabalhos selecionados.",
    subtitle:
      "Seis produtos publicados. Cada um resolveu um problema concreto — de landing pages a ferramentas internas.",
    cta_view: "Ver projeto",
    cta_repo: "Repositório",
    type_featured: "Featured",
    type_client: "Cliente",
    type_product: "Produto",
    type_study: "Estudo",
  },
  work: {
    eyebrow: "03 / Trabalho",
    title: "Como eu trabalho.",
    bio: [
      "Sou César Augusto, desenvolvedor full-stack. Construo produtos web — de landings a ferramentas internas — buscando o equilíbrio entre clareza visual, código sustentável e prazo realista.",
      "Saí de auxiliar de TI (2020) pra dev júnior (2022) e desde lá entreguei tanto landing rápida quanto sistema interno que sustenta operação. A escolha de stack vem do problema, não do hype.",
      "Meu compromisso é simples: entregar o que foi combinado, comunicar o que está acontecendo e deixar código que a próxima pessoa consiga entender.",
    ],
    method_eyebrow: "Como entrego",
    method: [
      "Briefing curto via WhatsApp, sem reuniões intermináveis.",
      "Prazo dado é prazo cumprido — e renegociado antes, se mudar.",
      "Entregas incrementais com link de prévia.",
      "Código que outro dev abre e roda em 5 minutos — README incluso.",
    ],
    stack_eyebrow: "Stack",
    stack: {
      frontend: { label: "Front-end", items: ["React", "Next.js", "TypeScript", "Tailwind CSS"] },
      backend: { label: "Back-end", items: ["Node.js", "PHP", "WordPress"] },
      data: { label: "Dados", items: ["Supabase", "MySQL"] },
      tooling: { label: "Ferramentas", items: ["Git", "VS Code", "Vercel", "Figma"] },
    },
    portrait_alt: "Retrato de César Augusto, desenvolvedor full-stack.",
    portrait_caption: "Belo Horizonte, 2026",
  },
  principles: {
    eyebrow: "04 / Princípios",
    title: "Como eu penso.",
    items: [
      "Não trabalho com escopo aberto.",
      "Não entrego sem README.",
      "Não cobro por hora — cobro pelo problema.",
      "Stack vem do problema, não do hype.",
      "Prazo dado é prazo cumprido.",
      "Briefing curto, prazo curto, deploy real.",
    ],
  },
  contact: {
    eyebrow: "05 / Contato",
    title: "Conta a ideia. Eu respondo em até 24 horas.",
    lead: "Aceitando 2 projetos este trimestre. Mande um WhatsApp com o que precisa fazer — eu volto com prazo e plano.",
    cta_primary: "Falar no WhatsApp",
    cta_rotating: [
      "RESPOSTA EM ATÉ 24H",
      "BRASIL · UTC−3",
      "ACEITANDO PROJETOS",
      "PIX 50% NA ASSINATURA",
    ],
    fallback: "Se o WhatsApp não abrir, copie: +55 31 98737-3513",
    other_channels_eyebrow: "Outros canais",
    testimonials_eyebrow: "O que dizem",
    whatsapp_message:
      "Oi César, vim do seu portfólio. Tenho um projeto em vista — pode me passar como funciona?",
  },
  fab: {
    label: "Falar no WhatsApp",
    aria_label: "Iniciar conversa no WhatsApp com César Augusto",
  },
  footer: {
    role: "Full-stack engineer",
    tagline: "Belo Horizonte · Disponível para projetos",
  },
};
