"use client";

import { Facebook, Linkedin, Instagram, Youtube, Mail, MapPin, Phone } from "lucide-react";
import { ORG } from "@/lib/data";
import { go } from "@/lib/router";

const FOOTER_COLS: { title: string; links: { label: string; action?: () => void }[] }[] = [
  {
    title: "Membership",
    links: [
      { label: "Join REPN", action: () => go("join") },
      { label: "Compare Plans", action: () => go("membership") },
      { label: "Member Benefits", action: () => go("membership") },
      { label: "Pay Annual Dues", action: () => go("dashboard") },
      { label: "Member Directory", action: () => go("directory") },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Resource Library", action: () => go("resources") },
      { label: "Market Reports", action: () => go("resources") },
      { label: "Legal & Compliance", action: () => go("resources") },
      { label: "Webinar Archive", action: () => go("events") },
      { label: "News & Updates", action: () => go("news") },
    ],
  },
  {
    title: "Events",
    links: [
      { label: "Upcoming Events", action: () => go("events") },
      { label: "2026 Fall Summit", action: () => go("events") },
      { label: "Legislative Day", action: () => go("events") },
      { label: "Chapter Mixers", action: () => go("events") },
      { label: "Past Recordings", action: () => go("events") },
    ],
  },
  {
    title: "Association",
    links: [
      { label: "About REPN", action: () => go("home") },
      { label: "Our Mission", action: () => go("home") },
      { label: "Leadership Team", action: () => go("home") },
      { label: "Member Login", action: () => go("login") },
      { label: "Become a Partner", action: () => go("home") },
    ],
  },
];

const SOCIALS = [
  { icon: Facebook, label: "Facebook" },
  { icon: Linkedin, label: "LinkedIn" },
  { icon: Instagram, label: "Instagram" },
  { icon: Youtube, label: "YouTube" },
];

export function SiteFooter() {
  return (
    <footer className="mt-auto bg-navy-950 text-navy-100">
      {/* Main footer */}
      <div className="container-repn py-14 grid gap-10 md:grid-cols-2 lg:grid-cols-6">
        {/* Brand block */}
        <div className="lg:col-span-2 pr-0 lg:pr-8">
          <div className="flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-sm bg-navy-900 text-white font-heading font-bold text-base tracking-wide border-2 border-gold-500">
              REPN
            </span>
            <div className="leading-tight">
              <div className="font-heading text-lg font-bold uppercase tracking-wide text-white">
                Real Estate Professionals
              </div>
              <div className="font-heading text-[12px] font-semibold uppercase tracking-[0.35em] text-gold-400">
                Network
              </div>
            </div>
          </div>
          <p className="mt-5 text-sm leading-relaxed text-navy-200">
            Advancing the business of real estate since 2004 through advocacy,
            education, and a referral community spanning 38 chapters nationwide.
          </p>
          <div className="mt-6 space-y-2.5 text-sm">
            <div className="flex items-start gap-2.5">
              <MapPin className="h-4 w-4 mt-0.5 text-gold-400 shrink-0" aria-hidden />
              <span>{ORG.address}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Phone className="h-4 w-4 text-gold-400 shrink-0" aria-hidden />
              <span>{ORG.phone}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Mail className="h-4 w-4 text-gold-400 shrink-0" aria-hidden />
              <span>{ORG.email}</span>
            </div>
          </div>
          <div className="mt-6 flex gap-2">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href="#/"
                onClick={(e) => e.preventDefault()}
                aria-label={s.label}
                className="grid h-9 w-9 place-items-center rounded-sm bg-navy-900 border border-navy-700 text-navy-200 hover:text-gold-300 hover:border-gold-500 transition-colors"
              >
                <s.icon className="h-4 w-4" aria-hidden />
              </a>
            ))}
          </div>
        </div>

        {/* Link columns */}
        {FOOTER_COLS.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <h3 className="font-heading text-[15px] font-bold uppercase tracking-[0.18em] text-white border-b-2 border-gold-500 inline-block pb-1.5">
              {col.title}
            </h3>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((l) => (
                <li key={l.label}>
                  <button
                    onClick={l.action ?? (() => go("home"))}
                    className="text-sm text-navy-200 hover:text-gold-300 transition-colors text-left"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="border-t border-navy-800">
        <div className="container-repn py-4 flex flex-col md:flex-row items-center justify-between gap-2 text-[12.5px] text-navy-300">
          <span>
            © {new Date().getFullYear()} Real Estate Professionals Network (REPN). All
            rights reserved. Fictional demo website.
          </span>
          <div className="flex items-center gap-4">
            <a
              href="#/"
              onClick={(e) => e.preventDefault()}
              className="hover:text-gold-300 transition-colors"
            >
              Privacy Policy
            </a>
            <span aria-hidden>·</span>
            <a
              href="#/"
              onClick={(e) => e.preventDefault()}
              className="hover:text-gold-300 transition-colors"
            >
              Terms of Service
            </a>
            <span aria-hidden>·</span>
            <span className="text-navy-400">Portfolio demo — no real payments</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
