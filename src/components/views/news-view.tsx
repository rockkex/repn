"use client";

import { CalendarDays, Megaphone } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { NewsCard, SectionHeading } from "@/components/shared";
import { NEWS, formatDate } from "@/lib/data";
import { go } from "@/lib/router";

export function NewsView() {
  const [lead, second, ...rest] = NEWS;

  return (
    <div>
      {/* Page hero band */}
      <section className="bg-navy-900 py-14 md:py-16">
        <div className="container-repn">
          <SectionHeading
            dark
            eyebrow="Newsroom"
            title="News & Announcements"
            intro="Association updates, advocacy victories, market intelligence, and member milestones — published for members and the industry press."
          />
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="container-repn">
          {/* Lead stories */}
          <div className="grid gap-6 lg:grid-cols-2">
            <article className="group flex flex-col border border-border bg-white hover:shadow-lg transition-all overflow-hidden">
              {lead.image && (
                <div className="relative h-64 md:h-80 overflow-hidden">
                  <img
                    src={lead.image}
                    alt={lead.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <Badge className="absolute top-4 left-4 bg-gold-500 text-navy-950 hover:bg-gold-500 uppercase font-heading tracking-widest text-[11px]">
                    <Megaphone className="h-3 w-3 mr-1" aria-hidden /> Top Story
                  </Badge>
                </div>
              )}
              <div className="flex flex-1 flex-col p-6 border-t-[3px] border-gold-500">
                <div className="flex items-center gap-2 text-[13px] text-muted-foreground">
                  <CalendarDays className="h-3.5 w-3.5 text-gold-600" aria-hidden />
                  {formatDate(lead.dateISO, { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
                  <span aria-hidden>·</span>
                  <Badge variant="outline" className="border-navy-200 text-navy-800 font-semibold">
                    {lead.category}
                  </Badge>
                </div>
                <h2 className="heading-caps text-3xl md:text-4xl text-navy-900 mt-3 leading-tight">
                  {lead.title}
                </h2>
                <p className="mt-3 text-[16px] leading-relaxed text-muted-foreground">
                  {lead.excerpt}{" "}
                  Membership Director Priya Nair adds that the association&apos;s
                  referral network and redesigned member dashboard were the two
                  most-cited reasons in this year&apos;s renewal survey. A
                  celebration reception is planned for the Fall Summit&apos;s
                  opening night in Chicago — members can reserve seats during
                  registration.
                </p>
                <button
                  onClick={() => go("events")}
                  className="mt-auto pt-5 inline-flex items-center gap-1 font-heading uppercase tracking-widest text-[14px] font-semibold text-gold-700 hover:text-gold-600 text-left w-fit"
                >
                  Reserve summit seats →
                </button>
              </div>
            </article>

            <div className="flex flex-col gap-6">
              {/* Secondary story */}
              <article className="flex-1 border border-border bg-white hover:shadow-md transition-all flex flex-col">
                <div className="flex flex-col sm:flex-row">
                  {second.image && (
                    <div className="relative sm:w-56 h-44 sm:h-auto shrink-0">
                      <img
                        src={second.image}
                        alt={second.title}
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                    </div>
                  )}
                  <div className="p-5 flex-1">
                    <div className="flex items-center gap-2 text-[13px] text-muted-foreground">
                      <CalendarDays className="h-3.5 w-3.5 text-gold-600" aria-hidden />
                      {formatDate(second.dateISO)}
                    </div>
                    <h3 className="heading-caps text-2xl text-navy-900 mt-2 leading-tight">
                      {second.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {second.excerpt}
                    </p>
                  </div>
                </div>
              </article>

              {/* Quick list */}
              <div className="border border-border bg-white">
                <h3 className="heading-caps text-xl text-navy-900 px-5 pt-4 pb-2 border-b border-navy-50">
                  Association Briefs
                </h3>
                <ul>
                  {rest.slice(0, 2).map((n) => (
                    <li
                      key={n.id}
                      className="px-5 py-3.5 border-b border-navy-50 last:border-0 flex items-start gap-3"
                    >
                      <span
                        aria-hidden
                        className="mt-2 h-1.5 w-1.5 shrink-0 bg-gold-500"
                      />
                      <div>
                        <div className="text-[12px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                          {formatDate(n.dateISO)} · {n.category}
                        </div>
                        <p className="text-[15px] font-medium text-navy-900 leading-snug">
                          {n.title}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Remaining stories */}
          <div className="mt-10">
            <h3 className="heading-caps text-2xl text-navy-900 border-b-2 border-gold-500 inline-block pb-1.5">
              More From REPN
            </h3>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {rest.map((n) => (
                <NewsCard key={n.id} item={n} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
