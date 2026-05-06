---
title: "EN-US final copy — portfolio v2"
tipo: "execution-output"
status: "ativo"
owner: "agente-copy-en"
atualizado_em: "2026-05-06"
fonte: "docs/02-redesign/portfolio-redesign-spec.md (v2.0)"
target_file: "src/lib/i18n/dictionaries/en.ts"
---

# EN-US final copy

Drop-in object for `src/lib/i18n/dictionaries/en.ts`. Mirrors the locked PT-BR keys 1:1 (CI parity check expects this shape).

```ts
export const en = {
  meta: {
    title: "César Augusto — Full-stack engineer",
    description: "Full-stack developer building clear web products — from brief to deploy. Working with agencies and founders, in Brazil and abroad.",
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
    lead: "I work with agencies and founders who need to take a web product from brief to deploy — with honest timelines and code the next person can read.",
    cta_primary: "Message on WhatsApp",
    cta_secondary: "See projects",
    stack_inline: ["Next.js", "React", "TypeScript", "Tailwind", "Node.js"],
  },
  projects: {
    eyebrow: "02 / Projects",
    title: "Selected work.",
    subtitle: "Six published products. Each one solved a concrete problem — from landing pages to internal tools.",
    cta_view: "View live",
    cta_repo: "View repo",
    type_featured: "Featured",
    type_client: "Client",
    type_product: "Product",
    type_study: "Study",
    items: [
      {
        name: "DOM Comparator",
        type: "featured",
        description: "Visual diff tool for HTML structures. Side-by-side comparison, change highlighting, and shareable reports — built to cut review time on front-end refactors.",
        tags: ["Diff tool", "Front-end", "Productivity"],
        alt: "DOM Comparator interface showing two HTML trees side by side with highlighted differences.",
      },
      {
        name: "Doce Compota",
        type: "client",
        description: "Storefront and order flow for an artisanal bakery. Catalog, WhatsApp checkout, and an admin panel the owner actually uses.",
        tags: ["E-commerce", "WordPress", "WhatsApp"],
        alt: "Doce Compota product page with photographs of jars and an order button.",
      },
      {
        name: "Studio Landing",
        type: "client",
        description: "One-page site for a creative studio. Editorial layout, fast load, and a brief form routed straight to WhatsApp.",
        tags: ["Landing page", "Next.js", "Tailwind"],
        alt: "Studio landing page with full-bleed hero image and a clean navigation bar.",
      },
      {
        name: "Internal Ops Dashboard",
        type: "product",
        description: "Internal tool that pulls operational data into one screen. Replaced three spreadsheets and a Slack thread.",
        tags: ["Internal tool", "Supabase", "TypeScript"],
        alt: "Operations dashboard with charts, table view, and filter controls.",
      },
      {
        name: "Portfolio v1",
        type: "study",
        description: "Earlier iteration of this site. Kept online as a public log of what changed — and why.",
        tags: ["Portfolio", "React", "Case log"],
        alt: "Earlier portfolio version with a darker palette and a centered layout.",
      },
      {
        name: "Timeline",
        type: "study",
        description: "Personal timeline component built to learn scroll-driven animation. Open source, used in two client projects since.",
        tags: ["Open source", "Animation", "React"],
        alt: "Vertical timeline with milestones and short descriptions on alternating sides.",
      },
    ],
  },
  work: {
    eyebrow: "03 / Work",
    title: "How I work.",
    bio: [
      "I'm César Augusto, a full-stack developer. I build web products — from landings to internal tools — balancing visual clarity, maintainable code, and realistic timelines.",
      "I went from IT assistant in 2020 to junior dev in 2022, and since then I've shipped everything from quick landings to internal systems that keep operations running. Stack choices come from the problem, not the hype.",
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
    ],
  },
  contact: {
    eyebrow: "05 / Contact",
    title: "Tell me the idea. I'll reply within 24 hours.",
    lead: "Taking 2 projects this quarter. Send a WhatsApp with what you need to build — I'll come back with a timeline and a plan.",
    cta_primary: "Message on WhatsApp",
    cta_rotating: ["REPLY WITHIN 24H", "BRAZIL · UTC−3", "ACCEPTING PROJECTS"],
    fallback: "If WhatsApp doesn't open, copy: +55 31 98737-3513",
    other_channels_eyebrow: "Other channels",
    testimonials_eyebrow: "What they say",
    whatsapp_message: "Hey César, came from your portfolio. I have a project in mind — can you walk me through how you work?",
  },
  fab: {
    label: "Message on WhatsApp",
    aria_label: "Start a conversation on WhatsApp",
  },
} as const;
```

## Translation notes (where EN diverged from a literal pass)

- **`hero.cta_primary` / `fab.label`** — "Message on WhatsApp" instead of literal "Talk on WhatsApp". "Talk" reads as voice call in EN; "Message" matches the actual action and stays one verb.
- **`hero.lead`** — "code the next person can read" keeps César's anti-hype tone. "Read" is more honest than "maintain"; it's the property he actually optimizes for.
- **`work.bio[2]`** — kept "leave code the next person can understand" rather than collapsing the two clauses; the parallel structure ("deliver / communicate / leave") is load-bearing.
- **`work.method[1]`** — "Deadlines I commit to, I hit" front-loads the promise. Literal "A deadline given is a deadline kept" is grammatically passive and reads translated.
- **`principles.items[2]`** — "I charge per problem, not per hour" preserves the contrast PT relies on. "By the problem" sounded ESL; "per problem / per hour" gives the rhythm.
- **`principles.items[4]`** — "A deadline I give is a deadline I hit" mirrors the PT cadence ("Prazo dado é prazo cumprido") with native EN parallelism, deliberately echoing `work.method[1]` as the spec calls out.
- **`contact.lead`** — "I'll come back with a timeline and a plan" keeps the unhurried register of "eu volto com prazo e plano." "Get back to you with..." would tilt American-corporate.
- **`contact.cta_rotating`** — kept short caps strings ≤ 22 chars so the mono mask-reveal animation has parity with PT widths.
- **`projects.cta_view` / `cta_repo`** — "View live" / "View repo" instead of "Visit" / "Source"; matches dev shorthand without sounding flippant.
- **`meta.description`** — added "in Brazil and abroad" because the EN version is the one foreign agencies actually read; signals geographic flexibility without overselling it.
- Avoided every flagged tell: no "we", no "deliver solutions", no "passionate", no "leverage", no "thrilled". "Build", "ship", "work with" carry the load.
