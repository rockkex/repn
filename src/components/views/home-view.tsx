"use client";

import Image from "next/image";
import {
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  FileText,
  GraduationCap,
  Landmark,
  MapPin,
  Megaphone,
  Network,
  Quote,
  RefreshCw,
  TrendingUp,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DateBlock,
  MemberCard,
  NewsCard,
  SectionHeading,
  TierCard,
} from "@/components/shared";
import { MEMBERS, NEWS, ORG, PARTNERS, STATS, TIER_ORDER, UPCOMING_EVENTS } from "@/lib/data";
import { go } from "@/lib/router";

const STAT_ICONS = {
  users: Users,
  map: MapPin,
  trending: TrendingUp,
  refresh: RefreshCw,
} as const;

const PILLARS = [
  {
    icon: Landmark,
    image: "/images/capitol.png",
    title: "Advocacy",
    text: "Our Government Affairs Committee monitors legislation in all 50 states and on Capitol Hill, briefing members on the bills that touch independent contractors, commission transparency, and housing supply. When industry rules are written, we make sure professionals have a seat at the table.",
    link: "See our advocacy wins",
  },
  {
    icon: GraduationCap,
    image: "/images/seminar.png",
    title: "Education",
    text: "From the annual Fall Summit to monthly webinars, REPN delivers 40+ continuing education sessions a year — taught by working brokers, attorneys, and economists. Members earn CE credits and designation discounts that pay for their dues.",
    link: "Browse events & webinars",
  },
  {
    icon: Network,
    image: "/images/networking.png",
    title: "Networking & Referrals",
    text: "The searchable Member Directory is the heart of REPN: 2,400+ professionals across every specialty, ready to trade referrals. Members moved more than $4.2 billion in referral volume through the network last year alone.",
    link: "Explore the directory",
  },
];

export function HomeView() {
  const featuredEvents = UPCOMING_EVENTS.filter((e) => e.featured).slice(0, 3);
  const featuredNews = NEWS.filter((n) => n.featured).slice(0, 3);
  const sampleMembers = MEMBERS.slice(0, 3);

  return (
    <div>
      {/* ============================== HERO ============================== */}
      <section className="relative">
        <div className="absolute inset-0">
          <Image
            src="/images/hero-skyline.png"
            alt="City skyline at dusk"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950/95 via-navy-950/75 to-navy-900/40" />
        </div>
        <div className="relative container-repn py-24 md:py-36">
          <div className="max-w-2xl">
            <div className="eyebrow text-gold-400 flex items-center gap-2">
              <span className="inline-block h-px w-10 bg-gold-400" aria-hidden />
              Est. 2004 · The Voice of Real Estate Professionals
            </div>
            <h1 className="heading-caps text-white text-5xl md:text-7xl mt-4">
              Advancing the Business of Real Estate
            </h1>
            <p className="mt-5 text-lg md:text-xl leading-relaxed text-navy-100">
              The Real Estate Professionals Network is a national membership
              association representing 2,400+ agents, brokers, and industry
              partners. We deliver the advocacy, education, and referral
              community that independent professionals need to thrive.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                onClick={() => go("join")}
                size="lg"
                className="h-13 bg-gold-500 hover:bg-gold-600 text-navy-950 font-heading uppercase tracking-widest text-lg px-8"
              >
                Become a Member
              </Button>
              <Button
                onClick={() => go("membership")}
                size="lg"
                variant="outline"
                className="h-13 bg-transparent shadow-none border-2 border-white/80 text-white hover:bg-white hover:text-navy-900 font-heading uppercase tracking-widest text-lg px-8"
              >
                Explore Benefits
              </Button>
            </div>
            <div className="mt-8 flex items-center gap-2 text-sm text-navy-200">
              <BadgeCheck className="h-4 w-4 text-gold-400" aria-hidden />
              Members report 31% more listings after their first year in REPN
            </div>
          </div>
        </div>
      </section>

      {/* ============================ MISSION ============================ */}
      <section className="bg-white py-16 md:py-20">
        <div className="container-repn">
          <SectionHeading
            eyebrow="Who We Are"
            title="One Network. Every Specialty. Real Influence."
            intro="Founded in 2004, REPN unites residential and commercial agents, brokers, lenders, appraisers, and title professionals under a single mission: to protect and advance the business of the professionals who make housing happen."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {PILLARS.map((p) => (
              <article
                key={p.title}
                className="group flex flex-col border border-border bg-white hover:shadow-lg transition-shadow"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6 border-t-[3px] border-gold-500">
                  <div className="flex items-center gap-2.5">
                    <span className="grid h-9 w-9 place-items-center bg-navy-900 text-gold-400">
                      <p.icon className="h-4.5 w-4.5" aria-hidden />
                    </span>
                    <h3 className="heading-caps text-2xl text-navy-900">{p.title}</h3>
                  </div>
                  <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
                    {p.text}
                  </p>
                  <button
                    onClick={() =>
                      go(
                        p.title === "Advocacy"
                          ? "news"
                          : p.title === "Education"
                            ? "events"
                            : "directory"
                      )
                    }
                    className="mt-auto pt-4 inline-flex items-center gap-1 font-heading uppercase tracking-widest text-[13px] font-semibold text-gold-700 hover:text-gold-600 text-left w-fit"
                  >
                    {p.link} <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============================= STATS ============================= */}
      <section className="bg-navy-900 py-14">
        <div className="container-repn">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {STATS.map((s) => {
              const Icon = STAT_ICONS[s.icon as keyof typeof STAT_ICONS];
              return (
                <div key={s.label} className="text-center">
                  <Icon className="h-8 w-8 text-gold-400 mx-auto" aria-hidden />
                  <div className="heading-caps text-4xl md:text-5xl text-white mt-3">
                    {s.value}
                  </div>
                  <div className="mt-1.5 text-[13px] font-semibold uppercase tracking-[0.14em] text-navy-200">
                    {s.label}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-10 text-center">
            <Button
              onClick={() => go("resources")}
              variant="outline"
              className="border-2 border-gold-500 text-gold-400 hover:bg-gold-500 hover:text-navy-950 font-heading uppercase tracking-widest h-11 px-6"
            >
              <FileText className="h-4 w-4 mr-2" aria-hidden />
              Get the 2026 Impact Report
            </Button>
          </div>
        </div>
      </section>

      {/* ========================= MEMBERSHIP TEASER ====================== */}
      <section className="bg-muted py-16 md:py-20">
        <div className="container-repn">
          <SectionHeading
            eyebrow="Membership"
            title="Choose the Plan That Fits Your Business"
            intro="Every tier includes a directory listing, member pricing, and our monthly market intelligence. Upgrade anytime — dues are annual and tax-deductible for most members."
          />
          <div className="mt-14 grid gap-6 pt-2 md:grid-cols-3">
            {TIER_ORDER.map((t) => (
              <TierCard key={t} tier={t} compact />
            ))}
          </div>
          <div className="mt-10 text-center">
            <button
              onClick={() => go("membership")}
              className="inline-flex items-center gap-1.5 font-heading uppercase tracking-widest text-[15px] font-semibold text-navy-900 hover:text-gold-700"
            >
              Compare all member benefits <ArrowRight className="h-4 w-4" aria-hidden />
            </button>
          </div>
        </div>
      </section>

      {/* ========================= DIRECTORY TEASER ======================= */}
      <section className="bg-white py-16 md:py-20">
        <div className="container-repn">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <SectionHeading
              align="left"
              eyebrow="The Directory Advantage"
              title="Your Next Referral Partner Is Already a Member"
              intro="Search 2,400+ vetted professionals by specialty, market, and tier. Full contact details are a members-only benefit."
              className="max-w-2xl"
            />
            <Button
              onClick={() => go("directory")}
              className="bg-navy-900 hover:bg-navy-800 text-white font-heading uppercase tracking-widest h-12 px-7 shrink-0"
            >
              <Users className="h-4 w-4 mr-2" aria-hidden />
              Browse the Directory
            </Button>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sampleMembers.map((m) => (
              <MemberCard key={m.id} member={m} />
            ))}
          </div>
        </div>
      </section>

      {/* ============================= EVENTS ============================= */}
      <section className="relative bg-navy-950 py-16 md:py-20 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.07] bg-cover bg-center"
          style={{ backgroundImage: "url(/images/seminar.png)" }}
          aria-hidden
        />
        <div className="relative container-repn">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <SectionHeading
              align="left"
              dark
              eyebrow="Mark Your Calendar"
              title="Upcoming Events & Webinars"
              intro="Summits, mixers, advocacy days, and free monthly webinars — included or discounted with membership."
              className="max-w-2xl"
            />
            <Button
              onClick={() => go("events")}
              variant="outline"
              className="border-2 border-gold-500 text-gold-400 hover:bg-gold-500 hover:text-navy-950 font-heading uppercase tracking-widest h-12 px-7 shrink-0"
            >
              <CalendarDays className="h-4 w-4 mr-2" aria-hidden />
              All Events
            </Button>
          </div>
          <div className="mt-10 space-y-4">
            {featuredEvents.map((e) => (
              <button
                key={e.id}
                onClick={() => go("events")}
                className="w-full flex items-start md:items-center gap-5 rounded-sm border border-navy-800 bg-navy-900/70 hover:bg-navy-900 hover:border-gold-500/50 transition-all p-4 md:p-5 text-left"
              >
                <DateBlock iso={e.dateISO} dark />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="bg-gold-500/15 text-gold-400 font-heading text-[12px] font-semibold uppercase tracking-[0.15em] px-2 py-0.5">
                      {e.type}
                    </span>
                    <span className="text-[13px] text-navy-300">{e.price}</span>
                  </div>
                  <h3 className="heading-caps text-xl md:text-2xl text-white mt-1.5 truncate">
                    {e.title}
                  </h3>
                  <p className="text-sm text-navy-200 mt-0.5 truncate">
                    {e.location}
                  </p>
                </div>
                <ArrowRight
                  className="hidden md:block h-5 w-5 text-gold-400 shrink-0"
                  aria-hidden
                />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* =========================== TESTIMONIAL ========================== */}
      <section className="bg-muted py-16 md:py-20">
        <div className="container-repn max-w-3xl text-center">
          <Quote className="h-12 w-12 text-gold-500 mx-auto" aria-hidden />
          <blockquote className="mt-5 font-heading text-2xl md:text-[32px] leading-snug text-navy-900 font-semibold">
            &ldquo;I joined REPN for the legal hotline. I stayed for the referral
            network — it now accounts for a third of my annual volume. No other
            association delivers this much per dollar of dues.&rdquo;
          </blockquote>
          <div className="mt-6 flex items-center justify-center gap-3">
            <Image
              src="/images/avatar-w1.jpg?v=2"
              alt="Nicole Grant"
              width={52}
              height={52}
              className="h-13 w-13 rounded-full object-cover object-top border-2 border-gold-500"
            />
            <div className="text-left">
              <div className="font-heading text-lg font-bold text-navy-900 uppercase tracking-wide">
                Nicole Grant
              </div>
              <div className="text-sm text-muted-foreground">
                Broker/Owner, Grant &amp; Associates Realty — Charlotte, NC ·
                Premium Member since 2019
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================== NEWS ============================== */}
      <section className="bg-white py-16 md:py-20">
        <div className="container-repn">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <SectionHeading
              align="left"
              eyebrow="The Latest"
              title="News & Announcements"
              className="max-w-xl"
            />
            <Button
              onClick={() => go("news")}
              variant="outline"
              className="border-navy-900 text-navy-900 hover:bg-navy-900 hover:text-white font-heading uppercase tracking-widest h-11 px-6 shrink-0"
            >
              <Megaphone className="h-4 w-4 mr-2" aria-hidden />
              All News
            </Button>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {featuredNews.map((n) => (
              <NewsCard key={n.id} item={n} />
            ))}
          </div>
        </div>
      </section>

      {/* ============================ PARTNERS ============================ */}
      <section className="border-y border-border bg-muted py-10">
        <div className="container-repn">
          <div className="eyebrow text-center text-muted-foreground">
            Our Preferred Partners
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-12 gap-y-5">
            {PARTNERS.map((p) => (
              <span
                key={p.name}
                className={`${p.style} text-lg text-steel-500/70 hover:text-navy-900 transition-colors cursor-default`}
              >
                {p.name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ============================== CTA =============================== */}
      <section className="relative bg-navy-900 overflow-hidden">
        <div className="absolute inset-y-0 right-0 w-full md:w-3/5">
          <Image
            src="/images/keys.png"
            alt="Agent handing keys to new homeowners"
            fill
            sizes="(max-width: 768px) 100vw, 60vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-900 via-navy-900/85 to-navy-900/30" />
        </div>
        <div className="relative container-repn py-20 md:py-24">
          <div className="max-w-xl">
            <div className="eyebrow text-gold-400">Join REPN Today</div>
            <h2 className="heading-caps text-white text-4xl md:text-5xl mt-3">
              Your Business Deserves a Professional Network Behind It
            </h2>
            <p className="mt-4 text-lg text-navy-100 leading-relaxed">
              Dues start at $195 a year. Most members earn that back with their
              first directory referral — and the average member renews for four
              consecutive years.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                onClick={() => go("join")}
                size="lg"
                className="h-13 bg-gold-500 hover:bg-gold-600 text-navy-950 font-heading uppercase tracking-widest text-lg px-8"
              >
                Join Today
              </Button>
              <Button
                onClick={() => go("login")}
                size="lg"
                variant="outline"
                className="h-13 bg-transparent shadow-none border-2 border-white/80 text-white hover:bg-white hover:text-navy-900 font-heading uppercase tracking-widest text-lg px-8"
              >
                Member Login
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Tagline strip */}
      <div className="bg-navy-950 py-5">
        <div className="container-repn flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-center">
          <span className="font-heading text-sm font-semibold uppercase tracking-[0.25em] text-navy-300">
            {ORG.tagline} · Since {ORG.founded}
          </span>
        </div>
      </div>
    </div>
  );
}
