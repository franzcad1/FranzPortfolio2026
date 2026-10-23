// ─── EDIT THIS FILE to update all copy on the site ──────────────────────────
// Never add em dashes. Keep level scripts to 2-3 sentences max.

export const meta = {
  title: "Franz Cadiente — AI Engineer",
  description:
    "I build AI automation that runs in production. Portfolio of Franz Cadiente — AI engineer and founder of Cadiente Digital.",
  url: "https://franzcadiente.com", // TODO: update with real domain
  ogImage: "/og-image.png",         // TODO: supply real OG image
};

export const hero = {
  name: "Franz Cadiente",
  tagline: "I build AI automation that runs in production.",
  pressStart: "PRESS START",
};

// ─── Journey levels ──────────────────────────────────────────────────────────
export const levels = [
  {
    id: 1,
    slug: "takeoff",
    title: "LEVEL 1: TAKEOFF",
    subtitle: "Leaving the Philippines",
    script:
      "My mom always tells me I was using a computer before I could speak. Growing up in the Philippines, my earliest memories were PlayStation and video games. At 19 I moved to Canada alone to study game programming and software development. I was giving the kid who loved video games a chance to build something of his own.",
    outfit: "backpack",
    scene: "airport",
    accentColor: "#00e5ff",
  },
  {
    id: 2,
    slug: "campus",
    title: "LEVEL 2: THE FOUNDATION",
    subtitle: "Game Programming Degree",
    script:
      "Studying software development gave me the foundation to turn ideas into working solutions. Through my coursework and co-op experience, I got to apply what I was learning to real-world problems and see how technology works beyond the classroom. It was where I started connecting what I knew with what I could actually build.",
    outfit: "hoodie",
    scene: "campus",
    accentColor: "#ffe600",
  },
  {
    id: 3,
    slug: "detour",
    title: "LEVEL 3: THE DETOUR",
    subtitle: "Dental Assistant",
    script:
      "Upon graduating, my focus shifted from building a career in tech to finding my footing in Canada. Navigating the path to permanent residency meant making practical decisions, and dentistry became an unexpected part of my journey. Working in dental clinics taught me to perform under pressure, earn people's trust, and understand the challenges behind day-to-day operations. What started as a detour became an opportunity to see firsthand where technology could make a real difference.",
    outfit: "scrubs",
    scene: "dental-chair",
    accentColor: "#ff2d78",
  },
  {
    id: 4,
    slug: "side-quest",
    title: "LEVEL 4: SIDE QUEST",
    subtitle: "Treatment Coordinator",
    script:
      "Moving into treatment coordination and administration gave me a closer look at the challenges dental clinics face every day. But I never let go of the developer in me. I knew I had skills I could put to use beyond my day-to-day role, so I started finding ways to help the clinics I worked for grow and operate more efficiently. From SEO and digital marketing to AI-powered automation, I began applying my technical background to real problems, connecting the world of software with the realities of running a dental practice.",
    outfit: "office",
    scene: "clinic-desk",
    accentColor: "#39ff14",
  },
  {
    id: 5,
    slug: "final-boss",
    title: "LEVEL 5: FINAL BOSS",
    subtitle: "AI Engineer",
    script:
      "What started as helping the clinics I worked for turned into something bigger. Through SEO, I helped dental clinics reach the top of Google Search and strengthen their online presence. That work grew into Cadiente Digital, my own business helping other companies grow through digital marketing, web development, and AI automation.",
    outfit: "office",
    scene: "studio",
    accentColor: "#ff2d78",
  },
  {
    id: 6,
    slug: "ai-engineer",
    title: "LEVEL 6: AI ENGINEER",
    subtitle: "AI Engineer",
    script:
      "I also built DentalAI, bringing my software development background back into healthcare to solve real clinical problems. Today, I continue to build new projects, explore emerging technologies, and turn ideas into working products. The kid who grew up fascinated by computers never stopped building. He just found new problems worth solving.",
    outfit: "terminal",
    scene: "terminal",
    accentColor: "#00e5ff",
    isFinalBoss: true,
  },

  // ─── Optional slot (disabled by default) ────────────────────────────────
  // {
  //   id: 6,
  //   slug: "gov-it",
  //   title: "LEVEL 6: PUBLIC SECTOR",
  //   subtitle: "Government IT / Software Development",
  //   script: "TODO: add script here.",
  //   outfit: "TODO",
  //   scene: "TODO",
  //   accentColor: "#ffe600",
  //   disabled: true,
  // },
];

// ─── Projects ─────────────────────────────────────────────────────────────────
export const projects = [
  {
    id: "dental-ai",
    title: "DentalAI",
    label: "AI PROJECT",
    tagline: "Full-stack AI practice management tool built by someone who has actually worked in a dental office.",
    problem:
      "Dental offices waste hours every week on manual scheduling, recall follow-ups, and patient outreach.",
    built:
      "A full-stack tool with drag-and-drop scheduling, an AI recall queue that drafts personalised patient messages, a searchable patient directory, and a Groq-powered AI agent that can book appointments and answer questions in plain English. Includes a real-time agent log for full observability.",
    stack: ["Python", "FastAPI", "React", "TypeScript", "Tailwind CSS", "Groq", "LangChain", "Vercel", "Railway"],
    result: "Built on the NexHealth API schema, meaning it could connect to a real clinic with minimal changes.",
    preview: "/previews/dental-ai.png",
    links: {
      live: "https://dental-ai-phi.vercel.app/",
      github: "https://github.com/franzcad1/DentalAI",
      caseStudy: null,
    },
  },
  {
    id: "crypto-current",
    title: "CryptoCurrent",
    label: "CRYPTO APP",
    tagline: "Cryptocurrency index app that pulls live CoinGecko data so users can browse, compare, and track their favourite coins.",
    problem:
      "Crypto data is scattered across dozens of sources with no clean way to compare coins or track a personal watchlist in one place.",
    built:
      "A React + Redux app that hits the CoinGecko REST API for real-time prices and market data. Users can browse thousands of coins, view 7-day sparkline charts powered by Charts.js, and save favourites for quick tracking.",
    stack: ["React", "Redux", "Charts.js", "CoinGecko API"],
    result: "",
    preview: "/previews/crypto-current.png",
    links: {
      live: "https://cryptocurrent.vercel.app/",
      github: "https://github.com/franzcad1/cryptocurrent",
      caseStudy: null,
    },
  },
  {
    id: "cadiente-digital",
    title: "Cadiente Digital",
    label: "AGENCY",
    tagline: "GTA-based digital marketing and AI automation for local businesses.",
    problem:
      "Local businesses across the GTA are expected to compete in an increasingly digital marketplace, but often lack the time, resources, and in-house expertise to manage marketing, maintain a consistent online presence, and streamline operations.",
    built:
      "Cadiente Digital is a digital growth agency that helps local businesses compete smarter through strategic SEO, paid advertising, web development, and AI-powered automation. By combining proven digital marketing strategies with practical technology, I help businesses strengthen their online visibility, generate leads, and build more efficient systems without the overhead of a full-time marketing team.",
    stack: [],
    result: "Leaside Orthodontic Centre: Grew organic traffic from ~80 to 500+ monthly visits. Achieved top 1–3 rankings across 31 Central Toronto areas, driving increased appointment requests and patient referrals.\n\nSnap 'n Sweet: Established #1 AI search visibility for targeted local queries, helping a Toronto-based 360 photobooth business stand out in AI-powered discovery tools beyond traditional search.",
    resultImages: ["/results/leaside-rankings.webp", "/results/snap-n-sweet-ai.png"],
    resultLinks: [
      { label: "Leaside Orthodontic Centre case study", url: "https://cadientedigital.ca/local-seo-near-me/" },
      { label: "Snap 'n Sweet case study", url: "https://cadientedigital.ca/seo-for-ai-search-engines/" },
    ],
    preview: "/previews/cadiente-digital.png",
    links: {
      live: "https://cadientedigital.ca",
      github: null,
      caseStudy: null,
    },
  },
];

// ─── Player profile ───────────────────────────────────────────────────────────
export const profile = {
  name: "Franz Cadiente",
  location: "Greater Toronto Area, Canada",
  bio: "My journey has taken me across software development, healthcare operations, and digital marketing, where I discovered how technology can solve real-world problems. Today, I bring those experiences together to build AI-powered systems and software that make work more efficient, solve meaningful problems, and deliver value to the people who use them.",
  // TODO: add real headshot path
  headshot: "/headshot.jpg",
  // TODO: add real work photo path
  workPhoto: null as string | null,
  skillGroups: [
    {
      label: "AI / Automation",
      skills: [
        { name: "OpenAI API / LLMs", level: 90 },
        { name: "Workflow automation", level: 85 },
        { name: "Prompt engineering", level: 88 },
      ],
    },
    {
      label: "Front-End",
      skills: [
        { name: "React / Next.js", level: 85 },
        { name: "TypeScript", level: 80 },
        { name: "Tailwind CSS", level: 82 },
      ],
    },
    {
      label: "Cloud / Infra",
      skills: [
        { name: "AWS EC2", level: 75 },
        { name: "Vercel", level: 85 },
        { name: "TODO: add more", level: 0 },
      ],
    },
  ],
};

// ─── Contact ──────────────────────────────────────────────────────────────────
export const contact = {
  email: "fmpcadiente@gmail.com",
  linkedin: "https://www.linkedin.com/in/franzcadiente/",
  github: "https://github.com/franzcad1",
  resume: false as const,
  ctaLabel: "Let's build something.",
};
