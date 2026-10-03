/**
 * REPN — Real Estate Professionals Network
 * Demo data layer: all content for the association website demo.
 */

export type Tier = "basic" | "professional" | "premium";

export interface Member {
  id: string;
  name: string;
  title: string;
  brokerage: string;
  specialty: string;
  city: string;
  state: string;
  tier: Tier;
  avatar: string;
  email: string;
  phone: string;
  years: number;
}

export interface EventItem {
  id: string;
  title: string;
  type: "Conference" | "Webinar" | "Networking" | "Advocacy" | "Gala";
  dateISO: string;
  time: string;
  location: string;
  description: string;
  image?: string;
  capacity: string;
  price: string;
  featured?: boolean;
}

export interface PastEvent {
  id: string;
  title: string;
  dateISO: string;
  duration: string;
  presenter: string;
  image: string;
  description: string;
}

export type ResourceCategory =
  | "Market Reports"
  | "Legal & Compliance"
  | "Templates & Forms"
  | "Marketing Kits";

export interface Resource {
  id: string;
  title: string;
  category: ResourceCategory;
  format: "PDF Report" | "Guide" | "Template Pack" | "Worksheet";
  meta: string;
  updated: string;
  description: string;
  file: string;
  featured?: boolean;
}

export interface NewsItem {
  id: string;
  title: string;
  dateISO: string;
  category: "Announcement" | "Advocacy" | "Market" | "Member News" | "Benefit";
  excerpt: string;
  image?: string;
  featured?: boolean;
}

export interface TierPlan {
  id: Tier;
  name: string;
  price: number;
  tagline: string;
  features: string[];
  popular?: boolean;
}

/* ---------------------------------- tiers --------------------------------- */

export const TIER_PLAN: Record<Tier, TierPlan> = {
  basic: {
    id: "basic",
    name: "Basic",
    price: 195,
    tagline: "Get connected and stay informed.",
    features: [
      "Listing in the searchable Member Directory",
      "Monthly REPN Insider newsletter",
      "Member pricing on all events & webinars",
      "Community forum access",
      "Annual Housing Market Outlook report",
    ],
  },
  professional: {
    id: "professional",
    name: "Professional",
    price: 345,
    tagline: "The complete toolkit for practicing agents.",
    features: [
      "Everything in Basic",
      "Unlimited Resource Library downloads",
      "Full webinar & event recording archive",
      "Legal Hotline — 3 calls per month",
      "Eligibility for the national Referral Network",
      "20% discount on designation courses",
    ],
    popular: true,
  },
  premium: {
    id: "premium",
    name: "Premium",
    price: 545,
    tagline: "Maximum visibility, maximum access.",
    features: [
      "Everything in Professional",
      "Featured placement in directory search results",
      "Unlimited Legal Hotline access",
      "1:1 business coaching session each year",
      "Invitation to the annual Leadership Summit",
      "Foundation scholarship eligibility",
    ],
  },
};

export const TIER_ORDER: Tier[] = ["basic", "professional", "premium"];

export const COMPARISON_ROWS: {
  label: string;
  values: [boolean | string, boolean | string, boolean | string];
}[] = [
  { label: "Member directory listing", values: [true, true, true] },
  { label: "Monthly REPN Insider newsletter", values: [true, true, true] },
  { label: "Member pricing on events", values: [true, true, true] },
  { label: "Resource Library downloads", values: [false, true, true] },
  { label: "Webinar & event recording archive", values: [false, true, true] },
  { label: "Legal Hotline", values: [false, "3 calls / month", "Unlimited"] },
  { label: "National Referral Network eligibility", values: [false, true, true] },
  { label: "Featured directory placement", values: [false, false, true] },
  { label: "Annual 1:1 business coaching", values: [false, false, true] },
  { label: "Leadership Summit invitation", values: [false, false, true] },
];

/* --------------------------------- members -------------------------------- */

export const SPECIALTIES = [
  "Residential",
  "Commercial",
  "Luxury",
  "Property Management",
  "Mortgage Lending",
  "Title & Escrow",
  "Appraisal",
  "Investment",
  "New Construction",
  "Land & Rural",
];

export const MEMBERS: Member[] = [
  { id: "m-001", name: "Sarah Mitchell", title: "Managing Broker", brokerage: "Summit Realty Group", specialty: "Residential", city: "Austin", state: "TX", tier: "professional", avatar: "/images/avatar-w3.jpg?v=2", email: "s.mitchell@summitrealty.com", phone: "(512) 555-0148", years: 14 },
  { id: "m-002", name: "James Okafor", title: "Commercial Advisor", brokerage: "Metro Commercial Partners", specialty: "Commercial", city: "Chicago", state: "IL", tier: "premium", avatar: "/images/avatar-m4.jpg?v=2", email: "j.okafor@metropic.com", phone: "(312) 555-0192", years: 22 },
  { id: "m-003", name: "Elena Vasquez", title: "Luxury Listing Specialist", brokerage: "Premier Estates International", specialty: "Luxury", city: "Beverly Hills", state: "CA", tier: "premium", avatar: "/images/avatar-w6.jpg?v=2", email: "elena@premiervasquez.com", phone: "(310) 555-0177", years: 17 },
  { id: "m-004", name: "David Chen", title: "Senior Mortgage Planner", brokerage: "Golden Gate Lending", specialty: "Mortgage Lending", city: "San Francisco", state: "CA", tier: "professional", avatar: "/images/avatar-m2.jpg?v=2", email: "dchen@gglending.com", phone: "(415) 555-0136", years: 11 },
  { id: "m-005", name: "Rachel Thompson", title: "Portfolio Manager", brokerage: "Keystone Property Group", specialty: "Property Management", city: "Denver", state: "CO", tier: "basic", avatar: "/images/avatar-w5.jpg?v=2", email: "rthompson@keystonepg.com", phone: "(303) 555-0159", years: 8 },
  { id: "m-006", name: "Marcus Williams", title: "Investment Advisor", brokerage: "Williams Capital Realty", specialty: "Investment", city: "Atlanta", state: "GA", tier: "professional", avatar: "/images/avatar-m7.jpg?v=2", email: "marcus@williamscapital.net", phone: "(404) 555-0183", years: 15 },
  { id: "m-007", name: "Jennifer Park", title: "Escrow Officer", brokerage: "Pacific Title Company", specialty: "Title & Escrow", city: "Seattle", state: "WA", tier: "professional", avatar: "/images/avatar-w8.jpg?v=2", email: "jpark@pacifictitle.com", phone: "(206) 555-0121", years: 12 },
  { id: "m-008", name: "Robert Martinez", title: "Broker-Associate", brokerage: "Bayside Realty Advisors", specialty: "Residential", city: "Miami", state: "FL", tier: "premium", avatar: "/images/avatar-m1.jpg?v=2", email: "robert@baysideadvisors.com", phone: "(305) 555-0164", years: 25 },
  { id: "m-009", name: "Amanda Foster", title: "Certified Appraiser", brokerage: "Foster Valuation Services", specialty: "Appraisal", city: "Nashville", state: "TN", tier: "basic", avatar: "/images/avatar-w2.jpg?v=2", email: "amanda@fostervaluation.com", phone: "(615) 555-0110", years: 9 },
  { id: "m-010", name: "Kevin O'Brien", title: "New Home Sales Director", brokerage: "Lennar Homes Division", specialty: "New Construction", city: "Phoenix", state: "AZ", tier: "professional", avatar: "/images/avatar-m5.jpg?v=2", email: "k.obrien@lennardiv.com", phone: "(602) 555-0145", years: 13 },
  { id: "m-011", name: "Nicole Grant", title: "Broker / Owner", brokerage: "Grant & Associates Realty", specialty: "Residential", city: "Charlotte", state: "NC", tier: "premium", avatar: "/images/avatar-w1.jpg?v=2", email: "nicole@grantrealty.com", phone: "(704) 555-0172", years: 19 },
  { id: "m-012", name: "Tom Reynolds", title: "Land Specialist", brokerage: "Heartland Land Company", specialty: "Land & Rural", city: "Kansas City", state: "MO", tier: "basic", avatar: "/images/avatar-m9.jpg?v=2", email: "tom@heartlandland.co", phone: "(816) 555-0128", years: 21 },
];

/* --------------------------------- events --------------------------------- */

export const UPCOMING_EVENTS: EventItem[] = [
  {
    id: "e-101",
    title: "2026 REPN National Fall Summit",
    type: "Conference",
    dateISO: "2026-10-22",
    time: "8:30 AM – 5:30 PM CT (both days)",
    location: "Chicago Hilton, 720 S Michigan Ave, Chicago, IL",
    description:
      "Our flagship two-day conference: 24 breakout sessions, the industry keynote, 90+ exhibitors, and the networking reception every member talks about. Continuing education credits available.",
    image: "/images/gala.png",
    capacity: "1,200 attendees",
    price: "$199 members / $449 non-members",
    featured: true,
  },
  {
    id: "e-102",
    title: "Mastering Buyer Agreements in the New Era",
    type: "Webinar",
    dateISO: "2026-10-15",
    time: "1:00 PM – 2:15 PM ET",
    location: "Live online — link sent after registration",
    description:
      "Value-first scripts and retention strategies for post-settlement buyer representation. Includes live Q&A and a downloadable script pack.",
    image: "/images/webinar.png",
    capacity: "500 seats",
    price: "Free for members",
    featured: true,
  },
  {
    id: "e-103",
    title: "Luxury Listing Masterclass: Marketing to the Affluent",
    type: "Webinar",
    dateISO: "2026-11-05",
    time: "12:00 PM – 1:30 PM ET",
    location: "Live online",
    description:
      "Elena Vasquez (Premier Estates International) breaks down her print-plus-digital listing campaign system for $2M+ properties.",
    capacity: "300 seats",
    price: "Free for members",
  },
  {
    id: "e-104",
    title: "Fall Networking Mixer — Atlanta Chapter",
    type: "Networking",
    dateISO: "2026-11-12",
    time: "6:00 PM – 8:30 PM ET",
    location: "The Rusty Ledger, 214 Peachtree St NE, Atlanta, GA",
    description:
      "Structured speed-networking hour followed by open social. Bring your cards — referral partners from mortgage, title, and inspection will be in the room.",
    image: "/images/networking.png",
    capacity: "120 attendees",
    price: "$15 members / $40 non-members",
  },
  {
    id: "e-105",
    title: "2026 Annual Awards Gala",
    type: "Gala",
    dateISO: "2026-12-11",
    time: "7:00 PM – 11:00 PM ET",
    location: "Grand Ballroom, Washington Hilton, Washington, DC",
    description:
      "Black-tie optional evening honoring the Agent of the Year, Emerging Leader, and Chapter of the Year. Dinner service begins promptly at 7:30 PM.",
    image: "/images/gala.png",
    capacity: "400 seats",
    price: "$85 members / $150 guests",
  },
  {
    id: "e-106",
    title: "2027 Legislative Day on the Hill",
    type: "Advocacy",
    dateISO: "2027-02-24",
    time: "9:00 AM – 4:30 PM ET",
    location: " Capitol Hill + REPN Advocacy Center, Washington, DC",
    description:
      "Join 300+ members as we brief legislators on independent-contractor classification, commission transparency, and housing supply policy. Advocacy briefing training included.",
    image: "/images/capitol.png",
    capacity: "350 attendees",
    price: "Free for members (travel not included)",
    featured: true,
  },
];

export const PAST_EVENTS: PastEvent[] = [
  {
    id: "r-201",
    title: "Winning Multiple-Offer Situations Without Overpaying",
    dateISO: "2026-09-18",
    duration: "58 min",
    presenter: "Dr. Amanda Ross, Prof. Real Estate Center",
    image: "/images/house.png",
    description:
      "Data-backed offer strategy: escalation limits, appraisal-gap language, and how to advise buyers when inventory is tight.",
  },
  {
    id: "r-202",
    title: "AI Tools Every Agent Should Be Using in 2026",
    dateISO: "2026-08-21",
    duration: "47 min",
    presenter: "Marcus Williams, Williams Capital Realty",
    image: "/images/webinar.png",
    description:
      "A practical tour of listing-description writers, CMA assistants, and follow-up automation — with a compliance checklist.",
  },
  {
    id: "r-203",
    title: "Fair Housing Annual Refresher 2026",
    dateISO: "2026-07-30",
    duration: "90 min",
    presenter: "REPN Legal Affairs Team",
    image: "/images/office-meeting.png",
    description:
      "Required annual refresher covering advertising language, steering, and documentation practices, with real case reviews.",
  },
  {
    id: "r-204",
    title: "Commercial Real Estate 101: Diversifying Your Income",
    dateISO: "2026-06-12",
    duration: "62 min",
    presenter: "James Okafor, Metro Commercial Partners",
    image: "/images/seminar.png",
    description:
      "How residential agents can begin brokering small multifamily and mixed-use deals — capital, comps, and client pipeline.",
  },
];

/* -------------------------------- resources ------------------------------- */

export const RESOURCE_CATEGORIES: ResourceCategory[] = [
  "Market Reports",
  "Legal & Compliance",
  "Templates & Forms",
  "Marketing Kits",
];

export const RESOURCES: Resource[] = [
  {
    id: "res-1",
    title: "2026 Housing Market Outlook",
    category: "Market Reports",
    format: "PDF Report",
    meta: "42 pages",
    updated: "Oct 2026",
    description:
      "Our flagship annual forecast: national and metro-level projections, affordability tables, and a client-facing presentation deck.",
    file: "/docs/2026-housing-market-outlook.pdf",
    featured: true,
  },
  {
    id: "res-2",
    title: "Q3 2026 MLS Data Digest",
    category: "Market Reports",
    format: "PDF Report",
    meta: "18 pages",
    updated: "Oct 2026",
    description:
      "Quarterly absorption rates, months-of-supply, and price-band movement across the 40 largest metros.",
    file: "/docs/2026-housing-market-outlook.pdf",
  },
  {
    id: "res-3",
    title: "Fair Housing Compliance Guide",
    category: "Legal & Compliance",
    format: "Guide",
    meta: "36 pages",
    updated: "Aug 2026",
    description:
      "Advertising language, steering red flags, and documentation practices — the annual refresher companion.",
    file: "/docs/fair-housing-compliance-guide.pdf",
    featured: true,
  },
  {
    id: "res-4",
    title: "Contract Clause Library",
    category: "Legal & Compliance",
    format: "Template Pack",
    meta: "40+ reviewed clauses",
    updated: "Sep 2026",
    description:
      "Attorney-reviewed contingency, appraisal-gap, and kick-out clauses with plain-English usage notes.",
    file: "/docs/fair-housing-compliance-guide.pdf",
  },
  {
    id: "res-5",
    title: "Buyer Representation Agreement Pack",
    category: "Templates & Forms",
    format: "Template Pack",
    meta: "6 agreements",
    updated: "Sep 2026",
    description:
      "Exclusive and non-exclusive representation forms with fillable fee structures, aligned to post-settlement rules.",
    file: "/docs/commission-negotiation-scripts.pdf",
  },
  {
    id: "res-6",
    title: "Listing Presentation Template (2026 Edition)",
    category: "Templates & Forms",
    format: "Template Pack",
    meta: "24 slides",
    updated: "Jul 2026",
    description:
      "The convertible listing presentation used by our top-producing members — pricing, marketing plan, and net sheets.",
    file: "/docs/commission-negotiation-scripts.pdf",
  },
  {
    id: "res-7",
    title: "Transaction Checklist Kit",
    category: "Templates & Forms",
    format: "Worksheet",
    meta: "Buyer + seller tracks",
    updated: "Jun 2026",
    description:
      "Step-by-step milestones from pre-listing prep through closing day, with compliance checkpoints.",
    file: "/docs/commission-negotiation-scripts.pdf",
  },
  {
    id: "res-8",
    title: "Open House Social Media Kit",
    category: "Marketing Kits",
    format: "Template Pack",
    meta: "30 templates",
    updated: "Sep 2026",
    description:
      "Canva-ready story, post, and carousel templates plus a 5-day posting cadence for every open house.",
    file: "/docs/2026-housing-market-outlook.pdf",
  },
  {
    id: "res-9",
    title: "Client Gift & Referral Playbook",
    category: "Marketing Kits",
    format: "Guide",
    meta: "22 pages",
    updated: "May 2026",
    description:
      "Budget-tiered closing gift ideas and the 12-touch referral calendar our members average 4.1 referrals from per year.",
    file: "/docs/commission-negotiation-scripts.pdf",
  },
  {
    id: "res-10",
    title: "Personal Branding Workbook",
    category: "Marketing Kits",
    format: "Worksheet",
    meta: "16 pages",
    updated: "Apr 2026",
    description:
      "Define your niche, promise, and proof — then turn it into a consistent brand across cards, signs, and socials.",
    file: "/docs/commission-negotiation-scripts.pdf",
  },
];

/* ---------------------------------- news ---------------------------------- */

export const NEWS: NewsItem[] = [
  {
    id: "n-1",
    title: "REPN Reaches 2,400 Member Milestone Ahead of Fall Summit",
    dateISO: "2026-10-01",
    category: "Announcement",
    excerpt:
      "Membership grew 11% year over year, with the strongest gains in the Atlanta, Phoenix, and Charlotte chapters. President Sandra Ellis credits the expanded Resource Library and the return of in-person chapter mixers.",
    image: "/images/office-meeting.png",
    featured: true,
  },
  {
    id: "n-2",
    title: "2026 Housing Market Outlook: What the Data Says About Your Spring",
    dateISO: "2026-09-24",
    category: "Market",
    excerpt:
      "The annual member forecast projects a 4.8% lift in existing-home sales as rates settle. Download the full 42-page report in the Resource Library.",
    image: "/images/house.png",
    featured: true,
  },
  {
    id: "n-3",
    title: "Advocacy Win: Sales Tax on Agent Services Defeated in Two States",
    dateISO: "2026-09-10",
    category: "Advocacy",
    excerpt:
      "Coalition testimony from REPN's Government Affairs Committee helped stall measures in Ohio and North Carolina. A full briefing is available to members.",
    image: "/images/capitol.png",
    featured: true,
  },
  {
    id: "n-4",
    title: "Foundation Awards $52,000 in Scholarships to Emerging Leaders",
    dateISO: "2026-08-28",
    category: "Member News",
    excerpt:
      "Thirteen members entering their first two years of practice received tuition support for designation coursework.",
    image: "/images/scholarships.png",
  },
  {
    id: "n-5",
    title: "New Member Benefit: Free Legal Office Hours Every Thursday",
    dateISO: "2026-08-14",
    category: "Benefit",
    excerpt:
      "Professional- and Premium-tier members can now book 15-minute slots with association counsel on contracts and compliance questions.",
    image: "/images/legal-hours.png",
  },
  {
    id: "n-6",
    title: "REPN Partners with National Title Group for Member Discount",
    dateISO: "2026-07-30",
    category: "Benefit",
    excerpt:
      "Members save up to 18% on title and settlement services nationwide — activate the discount from your member dashboard.",
    image: "/images/title-partnership.png",
  },
];

/* --------------------------------- sponsors -------------------------------- */

export const PARTNERS = [
  { name: "MERIDIAN TITLE GROUP", style: "font-heading tracking-[0.18em] font-semibold" },
  { name: "Homestead Mortgage", style: "font-heading tracking-wide font-bold" },
  { name: "RealtyShield Ins.", style: "font-body font-bold tracking-tight" },
  { name: "LANDMARK ESCROW", style: "font-heading tracking-[0.3em] font-medium" },
  { name: "Keystone Staging Co.", style: "font-body italic font-semibold" },
  { name: "BLUEPEAK CRM", style: "font-heading tracking-[0.12em] font-bold" },
];

/* ------------------------------ association meta --------------------------- */

export const ORG = {
  name: "Real Estate Professionals Network",
  short: "REPN",
  tagline: "Your Unified Voice in Real Estate",
  founded: 2004,
  phone: "(800) 555-7376",
  email: "members@repn.org",
  address: "1275 K Street NW, Suite 620, Washington, DC 20005",
};

export const STATS = [
  { value: "2,400+", label: "Members Nationwide", icon: "users" },
  { value: "38", label: "State & Regional Chapters", icon: "map" },
  { value: "$4.2B", label: "Annual Referral Volume", icon: "trending" },
  { value: "96%", label: "Member Renewal Rate", icon: "refresh" },
];

export const DEMO_ACCOUNTS = [
  {
    email: "sarah@repn.org",
    password: "demo1234",
    name: "Sarah Mitchell",
    tier: "professional" as Tier,
    memberId: "m-001",
    duesStatus: "due" as const,
    duesAmount: 345,
  },
  {
    email: "james@repn.org",
    password: "demo5678",
    name: "James Okafor",
    tier: "premium" as Tier,
    memberId: "m-002",
    duesStatus: "paid" as const,
    duesAmount: 545,
  },
];

export const formatMoney = (n: number) =>
  "$" + n.toLocaleString("en-US", { minimumFractionDigits: 0 });

export const formatDate = (iso: string, opts?: Intl.DateTimeFormatOptions) =>
  new Date(iso + "T12:00:00").toLocaleDateString(
    "en-US",
    opts ?? { month: "short", day: "numeric", year: "numeric" }
  );

export const dateParts = (iso: string) => {
  const d = new Date(iso + "T12:00:00");
  return {
    day: d.toLocaleDateString("en-US", { day: "2-digit" }),
    month: d.toLocaleDateString("en-US", { month: "short" }).toUpperCase(),
    year: d.getFullYear().toString(),
  };
};
