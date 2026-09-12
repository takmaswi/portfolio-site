export interface Project {
  slug: string;
  title: string;
  category: string;
  status: string;
  summary: string;
  description: string[];
  contribution: string[];
  boundary: string;
  image: string;
  imageAlt: string;
  url?: string;
  stack: string[];
}

export const projects: Project[] = [
  {
    slug: "svika",
    title: "Svika",
    category: "Independent product / Mobility",
    status: "Active development",
    summary:
      "Trip planning and digital ticketing for Harare's kombi network, built around the passenger.",
    description: [
      "A passenger boards without a timetable, pays cash, and may leave without their change. Svika brings trip planning, short-code boarding, and change held as wallet credit into one rider experience.",
      "The interface works in English and Shona. Behind it, an event-sourced ticket system and double-entry ledger keep the money rules separate from arrival estimates and other intelligence features.",
    ],
    contribution: [
      "Product design and full-stack implementation of rider, conductor, and owner workflows.",
      "Offline conductor queues, ticket events, and ledger safeguards.",
      "Bounded arrival estimates, commute alerts, and revenue anomaly detection.",
    ],
    boundary:
      "An active product with a public demo. Arrival estimates currently use a measured baseline while more journey data is collected. A demo does not establish readiness for a live transport operation.",
    image: "/images/project-svika.webp",
    imageAlt:
      "Svika passenger interface with route planning and a clearly labelled demonstration map",
    url: "https://svika-web.vercel.app",
    stack: ["Next.js", "TypeScript", "Supabase", "PostgreSQL", "MapLibre"],
  },
  {
    slug: "muripi",
    title: "Muripi",
    category: "Independent product / Wayfinding",
    status: "Web built / Android in development",
    summary:
      "Directions that continue inside the building, all the way to the shop.",
    description: [
      "A map can get you to a shopping building and still leave you searching. Muripi lets shop owners record the walking route to their exact unit, using steps, landmarks, and photographs.",
      "Shoppers follow the route on the web, with visited routes available offline. An Android companion adds AR recording and replay, with photo directions for phones that do not support ARCore.",
    ],
    contribution: [
      "Shop directory, owner portal, route recording, and arrival promotions.",
      "Offline PWA routes and authorized Convex data access.",
      "Android route recording and replay with a non-AR fallback.",
    ],
    boundary:
      "The web demonstration uses seeded shops. Android AR has been built, but reliable physical navigation still needs real-world hallway, staircase, and relocalisation testing.",
    image: "/images/project-muripi.webp",
    imageAlt:
      "Muripi building directory showing demonstration shops inside Gulf Complex",
    url: "https://muripi.vercel.app",
    stack: ["Next.js", "TypeScript", "Convex", "Kotlin", "ARCore"],
  },
  {
    slug: "bushkin",
    title: "Bushkin",
    category: "Client work / Fashion",
    status: "In progress",
    summary:
      "An editorial storefront for a Dubai clothing brand with Zimbabwean roots.",
    description: [
      "Bushkin's clothing carries a distinct cultural point of view. The storefront gives its photography and garments room to speak, with a cinematic opening and an editorial path into the collection.",
      "A featured product moves from detail to the whole piece to being worn. Automatic quotations use reading-time pauses, while direct controls and reduced-motion support keep the experience usable.",
    ],
    contribution: [
      "Storefront interface design and Next.js implementation.",
      "Responsive product choreography using existing brand imagery.",
      "Accessible controls, reduced-motion behavior, and browser verification.",
    ],
    boundary:
      "The current homepage has been implemented and locally checked. Final client acceptance, production content, authentication, and backend workflows require separate verification.",
    image: "/images/project-bushkin.webp",
    imageAlt:
      "Implemented Bushkin homepage with large campaign typography and the brand portrait",
    stack: ["Next.js", "React", "TypeScript", "GSAP"],
  },
  {
    slug: "taku-cake",
    title: "taku-cake",
    category: "Reusable template / Commerce",
    status: "Built locally",
    summary:
      "A cake-shop storefront that turns a choice into a clear, editable enquiry.",
    description: [
      "A customer chooses a cake, explores the options supported by that product, and sees an estimate as the selection changes. One shared catalogue drives the choices and the enquiry details.",
      "The customer can edit the draft before opening WhatsApp or email, or copy it for another channel. The Pink Party design pairs expressive cake imagery with a compact, responsive shopping flow.",
    ],
    contribution: [
      "Reusable React storefront and a typed twelve-cake catalogue.",
      "Product-specific options, shared estimates, and editable enquiry text.",
      "Contact handoffs, copy fallback, and responsive accessibility checks.",
    ],
    boundary:
      "A Taku-owned local template with illustrative products and imagery. It does not take payments, reserve dates, confirm orders, or store enquiries. It is not a completed Cake Fairy client delivery.",
    image: "/images/project-cake.webp",
    imageAlt:
      "taku-cake Pink Party storefront with guided cake choices and estimated prices",
    stack: ["React", "TypeScript", "Vite", "Vitest", "Playwright"],
  },
];
