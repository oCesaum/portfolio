import type { Dictionary } from "./pt";

export const en: Dictionary = {
  meta: {
    title: "César Augusto — Full-stack engineer",
    description:
      "Clear web products, from brief to deploy. I work with founders and lean teams who need direct technical execution.",
    brand: "César Augusto",
  },
  nav: {
    home: "Home",
    projects: "Projects",
    work: "Work",
    principles: "Principles",
    contact: "Contact",
  },
  hero: {
    eyebrow: "01 / Start",
    pill: "Taking 2 projects this quarter · Reply within 24h",
    title_line1: "Clear web products,",
    title_line2: "from brief to deploy.",
    lead: "I work with founders and lean teams who need to take a web product from brief to deploy — without getting stuck in agency cycles or losing a month to meetings.",
    cta_primary: "Message on WhatsApp",
    cta_secondary: "See projects",
    stack_inline: ["Next.js", "TypeScript", "Supabase", "React", "Tailwind"],
  },
  projects: {
    eyebrow: "02 / Projects",
    title: "Selected work.",
    subtitle:
      "Six published products. Each one solved a concrete problem — from landing pages to internal tools.",
    cta_view: "View live",
    cta_repo: "Repository",
    type_featured: "Featured",
    type_client: "Client",
    type_product: "Product",
    type_study: "Study",
  },
  work: {
    eyebrow: "03 / Work",
    title: "How I work.",
    bio: [
      "I'm César Augusto, a full-stack developer. I build web products — from landings to internal tools — balancing visual clarity, maintainable code, and realistic timelines.",
      "I went from IT assistant (2020) to junior dev (2022), and since then I've shipped everything from quick landings to internal systems that keep operations running. Stack choices come from the problem, not the hype.",
      "My commitment is simple: deliver what we agreed, communicate what's happening, and leave code the next person can understand.",
    ],
    method_eyebrow: "How I deliver",
    method: [
      "Short briefing over WhatsApp, no endless meetings.",
      "Deadlines I commit to, I hit — renegotiated up front if scope shifts.",
      "Incremental delivery with a preview link at every step.",
      "Code another dev can clone and run in five minutes — README included.",
    ],
    stack_eyebrow: "Stack",
    stack: {
      frontend: { label: "Front-end", items: ["React", "Next.js", "TypeScript", "Tailwind CSS"] },
      backend: { label: "Back-end", items: ["Node.js", "PHP", "WordPress"] },
      data: { label: "Data", items: ["Supabase", "MySQL"] },
      tooling: { label: "Tooling", items: ["Git", "VS Code", "Vercel", "Figma"] },
    },
    portrait_alt: "Portrait of César Augusto, full-stack developer.",
    portrait_caption: "Belo Horizonte, 2026",
  },
  principles: {
    eyebrow: "04 / Principles",
    title: "How I think.",
    items: [
      "No open-ended scope.",
      "No deploy without a README.",
      "I charge per problem, not per hour.",
      "Stack comes from the problem, not the hype.",
      "A deadline I give is a deadline I hit.",
      "Short briefs, short timelines, real deploys.",
    ],
  },
  contact: {
    eyebrow: "05 / Contact",
    title: "Tell me the idea. I'll reply within 24 hours.",
    lead: "Taking 2 projects this quarter. Send a WhatsApp with what you need to build — I'll come back with a timeline and a plan.",
    cta_primary: "Message on WhatsApp",
    cta_rotating: [
      "REPLY WITHIN 24H",
      "BRAZIL · UTC−3",
      "ACCEPTING PROJECTS",
      "50% UPFRONT, USD WIRE OK",
    ],
    fallback: "If WhatsApp doesn't open, copy: +55 31 98737-3513",
    other_channels_eyebrow: "Other channels",
    testimonials_eyebrow: "What they say",
    whatsapp_message:
      "Hey César, came from your portfolio. I have a project in mind — can you walk me through how you work?",
  },
  fab: {
    label: "Message on WhatsApp",
    aria_label: "Start a conversation on WhatsApp with César Augusto",
  },
  footer: {
    role: "Full-stack engineer",
    tagline: "Based in Brazil · Available for projects",
  },
};
