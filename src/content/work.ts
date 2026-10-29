export type AudienceId = "corporate" | "businesses" | "individuals";

export interface Audience {
  id: AudienceId;
  label: string;
  heading: string;
  intro: string;
  alsoBuilt: string[];
}

export interface System {
  slug: string;
  audience: AudienceId;
  title: string;
  subtitle?: string;
  sector: string;
  summary: string;
  points: string[];
  image?: string;
  imageAlt?: string;
  url?: string;
  featured?: boolean;
}

export const audiences: Audience[] = [
  {
    id: "corporate",
    label: "Corporate",
    heading: "For companies and institutions",
    intro:
      "Payroll, HR, compliance and research software for organisations that answer to regulators, auditors and a board.",
    alsoBuilt: [
      "An engagement tracker for an accounting firm, with separate admin and staff roles and an audit trail",
      "An offline AI assistant that answers questions from company documents on the company's own hardware",
    ],
  },
  {
    id: "businesses",
    label: "Businesses",
    heading: "Websites that work like systems",
    intro:
      "Custom design, ordering that fits how customers already buy, and a back office the owner can run.",
    alsoBuilt: [
      "Hair salon and beauty sites, plus templates other small businesses can adapt",
    ],
  },
  {
    id: "individuals",
    label: "Individuals",
    heading: "Apps for everyday life",
    intro:
      "Money, shopping, learning and getting around, designed for Zimbabwean prices, languages and patchy data.",
    alsoBuilt: [
      "A student accommodation marketplace with separate portals for students, landlords and admins",
      "A maths tutor where a maths engine holds the answer and the AI only gives hints",
    ],
  },
];

export const systems: System[] = [
  {
    slug: "payroll",
    audience: "corporate",
    title: "Taku Payroll",
    sector: "Payroll and statutory filing",
    summary:
      "Payroll for Zimbabwean employers who pay in USD, ZiG or both. Every figure can show the formula behind it.",
    points: [
      "PAYE worked out per currency, with NSSA, AIDS levy and NEC levies per employee",
      "Payslips, ZIMRA P2, NSSA returns and bank files from the same run",
      "A check that holds the run back until missing ZIMRA or NSSA details are fixed",
    ],
    image: "/images/work/payroll.webp",
    imageAlt:
      "Taku Payroll home screen for a test company, showing the month's pay run and four issues that block submission",
    featured: true,
  },
  {
    slug: "hr-intelligence",
    audience: "corporate",
    title: "HR intelligence dashboards",
    sector: "Corporate HR analytics",
    summary:
      "Dashboards for an HR team that needs to see who is paid outside the scale, who may leave, and what untaken leave is costing.",
    points: [
      "Every employee plotted against grade bands and market quartiles",
      "Leave liability costed by department",
      "Runs on the company's own machine, so staff records stay in the building",
    ],
    image: "/images/work/hr-intelligence.webp",
    imageAlt:
      "Compensation dashboard plotting staff pay against grade bands, with flight risk and overpaid counts",
  },
  {
    slug: "performance-management",
    audience: "corporate",
    title: "Performance management",
    sector: "Microfinance HR",
    summary:
      "Appraisals for a microfinance institution, from a staff member's self review to the supervisor's score and management's view across branches.",
    points: [
      "An indicator library the institution maintains itself",
      "An audit log of every change, with exports to spreadsheet and PDF",
    ],
    image: "/images/work/performance.webp",
    imageAlt:
      "Administration screen with staff, branches, review cycles, indicator library, competencies and audit log",
  },
  {
    slug: "due-diligence",
    audience: "corporate",
    title: "Due diligence and AML screening",
    sector: "Compliance",
    summary:
      "Enhanced due diligence on companies and the people behind them, ending in a report a compliance officer can sign off.",
    points: [
      "Sanctions and PEP checks on directors, shareholders and beneficial owners",
      "Adverse media counts only after its source has been checked",
      "People who share a name with someone on a list are not flagged by mistake",
    ],
    image: "/images/work/compliance.webp",
    imageAlt:
      "System diagram of public records flowing through normalising, matching and human review into one dataset",
  },
  {
    slug: "research-platform",
    audience: "corporate",
    title: "Taku Survey",
    sector: "Market research and fieldwork",
    summary:
      "A research platform that takes a study from the questionnaire to live results the client can watch.",
    points: [
      "Interviews on phones keep working offline and sync when the signal returns",
      "Flags for interviews finished too fast, answered the same way throughout, or recorded twice in one place",
      "Telephone interviewing, regional quotas and consent records under Zimbabwe's Cyber and Data Protection Act",
    ],
    image: "/images/work/research.webp",
    imageAlt:
      "Live fieldwork dashboard for a demonstration banking survey, showing 147 of 400 responses and daily progress",
  },
  {
    slug: "electronics-store",
    audience: "businesses",
    title: "Electronics shop and back office",
    sector: "Retail",
    summary:
      "A storefront and admin for an electronics retailer with hundreds of products. Customers order on WhatsApp.",
    points: [
      "Spreadsheet imports are checked before any product goes live",
      "Stock, promotions and brands managed by the shop's own staff",
      "Search that still finds the product when the name is misspelt",
    ],
    image: "/images/work/electronics-store.webp",
    imageAlt:
      "Electronics storefront with product categories and a phone showing a WhatsApp order conversation",
  },
  {
    slug: "spice-store",
    audience: "businesses",
    title: "Spice shop with recipes",
    sector: "Food and grocery",
    summary:
      "A phone first catalogue for a spice maker. Each recipe lists its spices and adds them to the basket in one tap.",
    points: [
      "The basket reaches the shop as a WhatsApp order, ready to confirm",
      "Customers choose collection or delivery before they send it",
      "Recipe pages give people a reason to come back and give search engines something to find",
    ],
    image: "/images/work/spice-store.webp",
    imageAlt:
      "Recipe page with the spices it uses and an open basket ready to send as a WhatsApp order",
  },
  {
    slug: "stockmate",
    audience: "businesses",
    title: "StockMate",
    sector: "Home food business",
    summary:
      "Stock and sales for a family selling chicken and meat from one freezer, with sellers who are rarely in the same place.",
    points: [
      "A cash sale takes two taps on a cheap Android phone",
      "Sells by count, by weight, or by dollar amount",
      "Tracks who owes money and sends the reminder on WhatsApp",
      "Opens with no connection",
    ],
  },
  {
    slug: "fashion-storefront",
    audience: "businesses",
    title: "Bespoke fashion storefront",
    sector: "Fashion",
    summary:
      "An editorial storefront for a clothing label, designed around its photography and its story.",
    points: [
      "Layout and motion designed for this one brand",
      "Product pages that move from a close detail to the full garment to someone wearing it",
    ],
    image: "/images/work/fashion-storefront.webp",
    imageAlt:
      "Fashion storefront homepage with large campaign type over a portrait",
  },
  {
    slug: "cake-storefront",
    audience: "businesses",
    title: "Storefront for small businesses",
    sector: "Bakery",
    summary:
      "A bakery storefront that turns a customer's choices into a clear enquiry, with a price estimate that updates as they choose.",
    points: [
      "Options change with each cake",
      "The enquiry opens in WhatsApp or email, and the customer can edit it before sending",
      "One catalogue file adapts it for another small business",
    ],
    image: "/images/work/cake-storefront.webp",
    imageAlt:
      "Cake shop storefront with a pink cake, occasion filters and estimated prices",
  },
  {
    slug: "finance",
    audience: "individuals",
    title: "Taku Finance",
    sector: "Personal and small business money",
    summary:
      "Money planning for people whose income changes from month to month, in USD and ZiG.",
    points: [
      "Budgets built on a bad month instead of a good one",
      "Pricing, break even and a 13 week cash flow for traders and farmers",
      "An AI assistant explains the numbers but is not allowed to calculate them",
    ],
    image: "/images/work/finance.webp",
    imageAlt:
      "Taku Finance on a phone, working out the lowest selling price from unit cost, margin, spoilage and exchange rate buffer",
    featured: true,
  },
  {
    slug: "muripi",
    audience: "individuals",
    title: "Muripi",
    sector: "Indoor wayfinding",
    summary:
      "Directions that keep going inside the building, all the way to the shop door.",
    points: [
      "Shop owners record the walk to their unit step by step, with photos",
      "An Android app records and replays routes with AR",
    ],
    image: "/images/work/muripi.webp",
    imageAlt:
      "Muripi home screen with shop search and two Harare shopping buildings",
    featured: true,
  },
  {
    slug: "svika",
    audience: "individuals",
    title: "Svika",
    sector: "Public transport",
    summary: "Trip planning and digital tickets for Harare's kombis.",
    points: [
      "Plan a trip in Shona or English",
      "Change the conductor cannot give back is saved as wallet credit",
      "Arrival estimates without a timetable",
    ],
    image: "/images/work/svika.webp",
    imageAlt:
      "Svika on a phone showing a kombi route on a map, a five minute arrival estimate and a 1.50 dollar fare",
  },
  {
    slug: "amayi-learn",
    audience: "individuals",
    title: "Amayi Learn",
    subtitle: "by Taku",
    sector: "Primary school learning",
    summary:
      "A safe AI learning app for children in Zimbabwe, from ECD to Grade 7. I built it end to end.",
    points: [
      "Mayi, an AI teacher, teaches by hints and questions",
      "Teachers turn their scheme of work into lessons, quizzes, songs, lesson plans and marks",
      "In English and ChiShona",
      "Parents get safety alerts",
    ],
    image: "/images/work/amayi-learn.webp",
    imageAlt:
      "Amayi Learn by Taku logo beside the child home screen on a phone, with an illustrated Mayi reading to children and the question What shall we learn today",
    url: "https://amayi-learn.vercel.app",
  },
];

export const searchReady = {
  eyebrow: "Found where people look now",
  heading: "Built for Google and for AI answers.",
  body: "People still search on Google, but they also ask ChatGPT, Gemini and Perplexity, check Maps, and message the business on WhatsApp. I build sites with fast pages, structured data and plain answers that search engines and AI assistants can read and quote. The business shows up wherever the question gets asked.",
  points: [
    "Structured data that tells search engines what the business sells, where it is and when it opens",
    "Pages written around the questions customers actually ask",
    "Orders and enquiries that arrive on WhatsApp already filled in",
    "Recipe pages, reminders and other reasons for customers to come back",
  ],
};

export const featuredSystems = systems.filter((system) => system.featured);

export function systemsFor(audience: AudienceId) {
  return systems.filter((system) => system.audience === audience);
}
