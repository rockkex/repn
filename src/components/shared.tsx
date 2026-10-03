"use client";

import Image from "next/image";
import { Lock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { TIER_PLAN, dateParts, type Member, type NewsItem, type Tier } from "@/lib/data";
import { go } from "@/lib/router";
import { useAuth } from "@/lib/auth";

/* ----------------------------- section heading ---------------------------- */

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "center",
  dark = false,
  className,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "center" | "left";
  dark?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className
      )}
    >
      {eyebrow && (
        <div className={cn("eyebrow", dark ? "text-gold-400" : "text-gold-600")}>
          {eyebrow}
        </div>
      )}
      <h2
        className={cn(
          "heading-caps text-4xl md:text-[44px] mt-2",
          dark ? "text-white" : "text-navy-900"
        )}
      >
        {title}
      </h2>
      <span className={cn("rule-gold mt-4", align === "center" && "mx-auto")} />
      {intro && (
        <p
          className={cn(
            "mt-4 text-[17px] leading-relaxed",
            dark ? "text-navy-100" : "text-muted-foreground"
          )}
        >
          {intro}
        </p>
      )}
    </div>
  );
}

/* -------------------------------- date block ------------------------------- */

export function DateBlock({ iso, dark = false }: { iso: string; dark?: boolean }) {
  const p = dateParts(iso);
  return (
    <div
      className={cn(
        "w-16 shrink-0 border text-center overflow-hidden",
        dark ? "bg-white border-navy-200" : "bg-navy-900 border-navy-900"
      )}
    >
      <div
        className={cn(
          "font-heading text-[11px] font-bold tracking-[0.2em] py-1",
          dark ? "bg-gold-500 text-navy-950" : "bg-gold-500 text-navy-950"
        )}
      >
        {p.month}
      </div>
      <div
        className={cn(
          "heading-caps text-[26px] py-1.5 leading-none",
          dark ? "text-navy-900" : "text-white"
        )}
      >
        {p.day}
      </div>
      <div
        className={cn(
          "font-heading text-[10px] tracking-[0.15em] pb-1.5",
          dark ? "text-steel-500" : "text-navy-300"
        )}
      >
        {p.year}
      </div>
    </div>
  );
}

/* ------------------------------- lock overlay ------------------------------ */

export function LockedBadge({ label = "Members Only" }: { label?: string }) {
  return (
    <Badge className="bg-navy-900 text-gold-300 hover:bg-navy-900 gap-1 px-2.5 py-1 uppercase font-heading tracking-widest text-[11px] font-semibold">
      <Lock className="h-3 w-3" aria-hidden />
      {label}
    </Badge>
  );
}

export function GatedTeaser({ message, onLogin }: { message: string; onLogin?: () => void }) {
  return (
    <div className="mt-3 rounded-sm border border-navy-100 bg-navy-50 p-4 text-center">
      <div className="flex items-center justify-center gap-1.5 text-navy-800 font-semibold text-sm">
        <Lock className="h-3.5 w-3.5 text-gold-600" aria-hidden /> {message}
      </div>
      <Button
        size="sm"
        onClick={() => (onLogin ? onLogin() : go("login"))}
        className="mt-3 bg-navy-900 hover:bg-navy-800 text-white h-8 font-heading uppercase tracking-wide text-sm"
      >
        Member Login
      </Button>
    </div>
  );
}

/* -------------------------------- tier card ------------------------------- */

export function TierCard({
  tier,
  compact = false,
  onJoin,
}: {
  tier: Tier;
  compact?: boolean;
  onJoin?: (t: Tier) => void;
}) {
  const plan = TIER_PLAN[tier];
  return (
    <div
      className={cn(
        "relative flex flex-col bg-white border-2 h-full",
        plan.popular ? "border-gold-500 shadow-lg" : "border-border"
      )}
    >
      {plan.popular && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap bg-gold-500 text-navy-950 font-heading text-[13px] font-bold uppercase tracking-[0.18em] px-4 py-1">
          Most Popular
        </div>
      )}
      <div className={cn("p-6", plan.popular && "pt-8")}>
        <h3 className="heading-caps text-[26px] text-navy-900">{plan.name}</h3>
        <p className="text-sm text-muted-foreground mt-1">{plan.tagline}</p>
        <div className="mt-4 flex items-baseline gap-1.5 border-t border-navy-50 pt-4">
          <span className="heading-caps text-5xl text-navy-900">${plan.price}</span>
          <span className="text-sm text-muted-foreground font-semibold">/ year</span>
        </div>
        <ul className={cn("mt-5 space-y-2.5", compact && "space-y-2")}>
          {plan.features.map((f) => (
            <li key={f} className="flex items-start gap-2 text-sm text-foreground/90">
              <span
                aria-hidden
                className="mt-[7px] h-1.5 w-1.5 shrink-0 bg-gold-500"
              />
              {f}
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-auto p-6 pt-0">
        <Button
          onClick={() => (onJoin ? onJoin(tier) : go("join"))}
          className={cn(
            "w-full h-11 font-heading uppercase tracking-widest text-[15px]",
            plan.popular
              ? "bg-gold-500 hover:bg-gold-600 text-navy-950"
              : "bg-navy-900 hover:bg-navy-800 text-white"
          )}
        >
          Join as {plan.name}
        </Button>
      </div>
    </div>
  );
}

/* ------------------------------- member card ------------------------------ */

export function MemberCard({ member }: { member: Member }) {
  const { session } = useAuth();
  const authed = !!session;

  return (
    <div className="group flex flex-col border border-border bg-white hover:shadow-md hover:border-navy-200 transition-all">
      <div className="relative h-52 overflow-hidden bg-navy-100">
        <Image
          src={member.avatar}
          alt={`Portrait of ${member.name}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />
        <Badge
          className={cn(
            "absolute top-3 left-3 uppercase font-heading tracking-widest text-[11px] px-2.5",
            member.tier === "premium"
              ? "bg-gold-500 text-navy-950 hover:bg-gold-500"
              : member.tier === "professional"
                ? "bg-navy-900 text-white hover:bg-navy-900"
                : "bg-white/95 text-navy-900 hover:bg-white/95"
          )}
        >
          {member.tier}
        </Badge>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="heading-caps text-[22px] text-navy-900 leading-tight">
          {member.name}
        </h3>
        <p className="text-sm font-semibold text-gold-700 mt-0.5">{member.title}</p>
        <p className="text-sm text-muted-foreground">{member.brokerage}</p>
        <div className="mt-3 flex flex-wrap gap-1.5 text-[12px]">
          <span className="bg-navy-50 text-navy-800 px-2 py-0.5 font-semibold">
            {member.specialty}
          </span>
          <span className="bg-navy-50 text-navy-800 px-2 py-0.5 font-semibold">
            {member.city}, {member.state}
          </span>
          <span className="bg-navy-50 text-navy-800 px-2 py-0.5 font-semibold">
            {member.years} yrs
          </span>
        </div>

        {authed ? (
          <div className="mt-4 border-t border-navy-50 pt-3 text-sm space-y-1">
            <div className="truncate">
              <span className="text-muted-foreground">Email: </span>
              <span className="font-medium">{member.email}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Direct: </span>
              <span className="font-medium">{member.phone}</span>
            </div>
            <a
              href={`mailto:${member.email}`}
              className="mt-2 inline-flex items-center gap-1 font-heading uppercase tracking-widest text-[13px] font-semibold text-gold-700 hover:text-gold-600"
            >
              Contact {member.name.split(" ")[0]} →
            </a>
          </div>
        ) : (
          <div className="mt-4 border-t border-navy-50 pt-3 relative select-none" aria-hidden>
            <div className="text-sm space-y-1 blur-[3px] opacity-70">
              <div>s.mitchell@summitrealty.com</div>
              <div>(512) 555-0148</div>
            </div>
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-center">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  go("login");
                }}
                className="inline-flex items-center gap-1.5 bg-navy-900 text-white text-[12px] font-heading uppercase tracking-widest px-3 py-1.5 hover:bg-navy-800"
              >
                <Lock className="h-3 w-3 text-gold-400" aria-hidden />
                Members Only — Log In
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* -------------------------------- news card ------------------------------- */

export function NewsCard({ item }: { item: NewsItem }) {
  return (
    <article className="group flex flex-col border border-border bg-white hover:shadow-md transition-all">
      {item.image && (
        <div className="relative h-44 overflow-hidden">
          <Image
            src={item.image}
            alt={item.title}
            fill
            sizes="(max-width: 640px) 100vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <Badge className="absolute bottom-3 left-3 bg-navy-900/95 text-gold-300 hover:bg-navy-900 uppercase font-heading tracking-widest text-[11px]">
            {item.category}
          </Badge>
        </div>
      )}
      <div className="flex flex-1 flex-col p-5">
        <div className="font-heading text-[13px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
          {new Date(item.dateISO + "T12:00:00").toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </div>
        <h3 className="heading-caps text-[21px] leading-tight text-navy-900 mt-1.5 group-hover:text-gold-700 transition-colors">
          {item.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground line-clamp-3">
          {item.excerpt}
        </p>
        <button
          onClick={() => go("news")}
          className="mt-auto pt-4 inline-flex items-center gap-1 font-heading uppercase tracking-widest text-[13px] font-semibold text-gold-700 hover:text-gold-600 text-left w-fit"
        >
          Read Full Story →
        </button>
      </div>
    </article>
  );
}
