export const portfolioData = {
  profile: {
    name: "César Augusto",
    role: "Desenvolvedor Full-stack",
    location: "Brasil",
    summary:
      "Desenvolvedor full-stack focado em criar produtos web claros, funcionais e bem construídos, com experiência prática em WordPress, PHP, Node.js, React, Next.js, TypeScript e Tailwind CSS.",
    intro:
      "Transformo ideias em interfaces consistentes, fluxos úteis e soluções que equilibram performance, manutenção e boa experiência de uso.",
    email: "contato@cesaraugusto.dev",
    whatsapp: "5531987373513",
  },
  highlights: [
    {
      label: "Projetos publicados",
      value: "6",
      description: "Aplicações, landing pages e ferramentas web já disponíveis online.",
    },
    {
      label: "Base de atuação",
      value: "WordPress + Next.js",
      description: "Experiência combinando ecossistemas maduros com stack moderna de front-end.",
    },
    {
      label: "Foco atual",
      value: "Interfaces modernas",
      description: "Produtos com boa arquitetura visual, clareza técnica e execução pragmática.",
    },
  ],
  expertise: [
    {
      title: "Front-end com direção clara",
      description:
        "Construção de interfaces responsivas com React, Next.js, TypeScript e Tailwind CSS, priorizando hierarquia visual, legibilidade e manutenção.",
    },
    {
      title: "Entrega full-stack pragmática",
      description:
        "Capacidade de sair da ideia para a implementação com PHP, Node.js, integrações, estruturação de páginas e resolução de problemas reais.",
    },
    {
      title: "Projetos com aplicação prática",
      description:
        "Experiência em landing pages, ferramentas utilitárias e produtos web com foco em clareza, objetivo e resultado funcional.",
    },
  ],
  projects: [
    {
      name: "DOM Comparator Universal",
      description:
        "Ferramenta web para comparação de sitemaps XML e código HTML com normalização inteligente, robô automatizado e interface moderna com suporte a tema claro e escuro.",
      link: "https://dom-comparator.vercel.app/",
      repositoryUrl: "https://github.com/oCesaum/DOM-Comparator",
      image: "/dom-comparator.png",
      tags: ["Next.js", "TypeScript", "Automação", "Tema claro/escuro"],
      featured: true,
    },
    {
      name: "Doce Compota",
      description:
        "Landing page para loja de geleias artesanais, desenvolvida com HTML, CSS e JavaScript para apresentar produtos de forma atrativa e responsiva.",
      link: "https://docecompota.com.br/",
      repositoryUrl: "https://github.com/oCesaum/Landing-Page-Doce-Compota",
      image: "/doce compota.png",
      tags: ["Landing page", "HTML", "CSS", "JavaScript"],
      featured: false,
    },
    {
      name: "Fast Cart Landing Page",
      description:
        "Projeto criado para apresentar uma solução focada em automatizar a criação de carrinho de compras em sites de venda.",
      link: "https://fast-cart-landing-page.vercel.app/",
      repositoryUrl: "https://github.com/oCesaum/fast-cart-landing-page",
      image: "/fast-cart.png",
      tags: ["Produto digital", "Landing page", "Conversão"],
      featured: false,
    },
    {
      name: "Tailwind Spotify",
      description:
        "Clone visual do Spotify desenvolvido com Next.js e Tailwind CSS, com foco em composição de interface e fidelidade visual.",
      link: "https://tailwind-spotify-phi.vercel.app/",
      repositoryUrl: "https://github.com/oCesaum/tailwind-spotify",
      image: "/tailwind-spotify.png",
      tags: ["Next.js", "Tailwind CSS", "UI"],
      featured: false,
    },
    {
      name: "Barber Landing Page",
      description:
        "Landing page simples para barbearias, com estrutura direta e abordagem visual voltada para apresentação de serviço.",
      link: "https://barber-landing-page-theta.vercel.app/",
      repositoryUrl: "https://github.com/oCesaum/barber-landing-page",
      image: "/barber.png",
      tags: ["Landing page", "Serviços", "Responsivo"],
      featured: false,
    },
    {
      name: "Calculadora - Taxa de Gravidade",
      description:
        "Calculadora criada para apoiar técnicos em segurança do trabalho e agilizar tarefas do dia a dia.",
      link: "https://calculadora-hht.vercel.app/",
      repositoryUrl: "https://github.com/oCesaum/calculadora-taxa-gravidade",
      image: "/calculadora-taxa-gravidade.png",
      tags: ["Ferramenta web", "Produtividade", "Utilitário"],
      featured: false,
    },
  ],
  techStack: [
    "Node.js",
    "TypeScript",
    "React",
    "Next.js",
    "PHP",
    "WordPress",
    "JavaScript",
    "Supabase",
    "MySQL",
  ],
  additionalSkills: [
    "Git",
    "VS Code",
    "Inglês",
    "Product Owner",
    "npm",
    "Arquitetura de interfaces",
    "Componentização",
  ],
  about: [
    "Sou César Augusto, desenvolvedor full-stack focado em criação de soluções web e resolução de problemas com abordagem prática.",
    "Atuo principalmente com PHP, WordPress e Node.js, mantendo também domínio de tecnologias modernas como React, Next.js, TypeScript e Tailwind CSS.",
    "Meu foco é entregar produtos que façam sentido no uso real: interfaces responsivas, código organizado e soluções eficientes para cada contexto.",
  ],
  socials: {
    github: "https://github.com/oCesaum",
    linkedin: "https://www.linkedin.com/in/cesar-augusto-pinho/",
    instagram: "https://www.instagram.com/csr_pinho/",
    whatsappMessage:
      "Olá! Preciso de um desenvolvedor para um projeto. Pode me ajudar?",
  },
} as const;

export const navigationItems = [
  { id: "home", label: "Início" },
  { id: "projects", label: "Projetos" },
  { id: "expertise", label: "Expertise" },
  { id: "stack", label: "Stack" },
  { id: "about", label: "Perfil" },
  { id: "contact", label: "Contato" },
] as const;
