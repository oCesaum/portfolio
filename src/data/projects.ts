export type ProjectKind = "featured" | "client" | "product" | "study";

export type Project = {
  id: string;
  order: number;
  kind: ProjectKind;
  accent: string;
  name: { pt: string; en: string };
  description: { pt: string; en: string };
  tags: { pt: readonly string[]; en: readonly string[] };
  url: string;
  repo?: string;
  image: string;
  imageAlt: { pt: string; en: string };
  duration?: string;
};

function deriveDomainKind(url: string): "custom" | "vercel" {
  try {
    const host = new URL(url).host;
    return host.endsWith(".vercel.app") ? "vercel" : "custom";
  } catch {
    return "vercel";
  }
}

export function getDomainLabel(url: string): string {
  try {
    const host = new URL(url).host;
    return host.replace(/^www\./, "");
  } catch {
    return url;
  }
}

export function getDomainKind(url: string): "custom" | "vercel" {
  return deriveDomainKind(url);
}

export const projects: readonly Project[] = [
  {
    id: "dom-comparator",
    order: 1,
    kind: "featured",
    accent: "#7aa9ff",
    name: { pt: "DOM Comparator Universal", en: "DOM Comparator Universal" },
    description: {
      pt: "Ferramenta web para comparar sitemaps XML e HTML com normalização inteligente. Inclui robô automatizado e tema claro/escuro.",
      en: "Web tool to compare XML sitemaps and HTML with intelligent normalization. Includes automated bot and light/dark theme.",
    },
    tags: {
      pt: ["Ferramenta web", "SEO técnico", "Automação"],
      en: ["Web tool", "Technical SEO", "Automation"],
    },
    url: "https://dom-comparator.vercel.app/",
    repo: "https://github.com/oCesaum/DOM-Comparator",
    image: "/dom-comparator.png",
    imageAlt: {
      pt: "Print da interface do DOM Comparator mostrando comparação lado a lado de sitemaps.",
      en: "Screenshot of the DOM Comparator interface showing side-by-side sitemap comparison.",
    },
    duration: "21d",
  },
  {
    id: "doce-compota",
    order: 2,
    kind: "client",
    accent: "#d18a4f",
    name: { pt: "Doce Compota", en: "Doce Compota" },
    description: {
      pt: "Site institucional para loja de geleias artesanais. HTML, CSS e JS puros, foco em apresentação de produto e responsividade.",
      en: "Institutional site for an artisan jam shop. Pure HTML, CSS and JS, focused on product showcase and responsiveness.",
    },
    tags: {
      pt: ["Site institucional", "Landing page"],
      en: ["Institutional site", "Landing page"],
    },
    url: "https://docecompota.com.br/",
    repo: "https://github.com/oCesaum/Landing-Page-Doce-Compota",
    image: "/doce-compota.png",
    imageAlt: {
      pt: "Página inicial da Doce Compota com produtos de geleia artesanal e botão de contato.",
      en: "Doce Compota homepage with artisan jam products and a contact button.",
    },
    duration: "14d",
  },
  {
    id: "fast-cart",
    order: 3,
    kind: "product",
    accent: "#3ed598",
    name: { pt: "Fast Cart Landing Page", en: "Fast Cart Landing Page" },
    description: {
      pt: "Landing de produto digital para automação de carrinho de compras em e-commerce.",
      en: "Product landing for shopping cart automation in e-commerce.",
    },
    tags: {
      pt: ["Landing page", "Conversão"],
      en: ["Landing page", "Conversion"],
    },
    url: "https://fast-cart-landing-page.vercel.app/",
    image: "/fast-cart.png",
    imageAlt: {
      pt: "Hero da landing do Fast Cart com chamada principal e tela de produto à direita.",
      en: "Fast Cart landing hero with primary headline and product screen on the right.",
    },
  },
  {
    id: "tailwind-spotify",
    order: 4,
    kind: "study",
    accent: "#1ed760",
    name: { pt: "Tailwind Spotify", en: "Tailwind Spotify" },
    description: {
      pt: "Estudo de UI: clone visual do Spotify com Next.js + Tailwind CSS. Foco em fidelidade e composição.",
      en: "UI study: Spotify visual clone with Next.js + Tailwind CSS. Focus on fidelity and composition.",
    },
    tags: {
      pt: ["Estudo de UI", "Componentização"],
      en: ["UI study", "Componentization"],
    },
    url: "https://tailwind-spotify-phi.vercel.app/",
    repo: "https://github.com/oCesaum/tailwind-spotify",
    image: "/tailwind-spotify.png",
    imageAlt: {
      pt: "Clone visual do Spotify com sidebar e player na parte inferior.",
      en: "Spotify visual clone with sidebar and bottom player.",
    },
  },
  {
    id: "barber-landing-page",
    order: 5,
    kind: "client",
    accent: "#c8a878",
    name: { pt: "Barber Landing Page", en: "Barber Landing Page" },
    description: {
      pt: "Landing direta para barbearias, com estrutura focada em apresentação de serviço e conversão por contato.",
      en: "Direct landing for barbershops, structured around service showcase and contact-driven conversion.",
    },
    tags: {
      pt: ["Landing page", "Serviços"],
      en: ["Landing page", "Services"],
    },
    url: "https://barber-landing-page-theta.vercel.app/",
    image: "/barber.png",
    imageAlt: {
      pt: "Landing de barbearia com hero escuro e foto de tesoura em destaque.",
      en: "Barbershop landing with a dark hero and a featured scissor photo.",
    },
  },
  {
    id: "calculadora-taxa-gravidade",
    order: 6,
    kind: "client",
    accent: "#f08a3e",
    name: {
      pt: "Calculadora — Taxa de Gravidade",
      en: "Severity Rate Calculator",
    },
    description: {
      pt: "Ferramenta utilitária para técnicos em segurança do trabalho calcularem taxa de gravidade de acidentes.",
      en: "Utility tool for occupational safety technicians to calculate accident severity rate.",
    },
    tags: {
      pt: ["Ferramenta utilitária", "Produtividade"],
      en: ["Utility tool", "Productivity"],
    },
    url: "https://calculadora-hht.vercel.app/",
    repo: "https://github.com/oCesaum/calculadora-taxa-gravidade",
    image: "/calculadora-taxa-gravidade.png",
    imageAlt: {
      pt: "Calculadora de taxa de gravidade com campos de entrada e resultado destacado.",
      en: "Severity rate calculator with input fields and highlighted result.",
    },
  },
];

export const featuredProject = projects.find((p) => p.kind === "featured");
export const otherProjects = projects.filter((p) => p.kind !== "featured");
