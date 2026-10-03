"use client";

import { useMemo, useState } from "react";
import { Lock, Search, SlidersHorizontal, Users } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MemberCard, SectionHeading } from "@/components/shared";
import { MEMBERS, SPECIALTIES, TIER_PLAN, type Tier } from "@/lib/data";
import { useAuth } from "@/lib/auth";
import { go } from "@/lib/router";

export function DirectoryView() {
  const { session } = useAuth();
  const [query, setQuery] = useState("");
  const [specialty, setSpecialty] = useState<string>("all");
  const [tierFilter, setTierFilter] = useState<string>("all");
  const [page, setPage] = useState(1);

  const PAGE_SIZE = 6;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return MEMBERS.filter((m) => {
      const matchesQuery =
        !q ||
        m.name.toLowerCase().includes(q) ||
        m.brokerage.toLowerCase().includes(q) ||
        m.city.toLowerCase().includes(q) ||
        m.state.toLowerCase().includes(q) ||
        m.title.toLowerCase().includes(q);
      const matchesSpecialty = specialty === "all" || m.specialty === specialty;
      const matchesTier = tierFilter === "all" || m.tier === tierFilter;
      return matchesQuery && matchesSpecialty && matchesTier;
    });
  }, [query, specialty, tierFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pageMembers = filtered.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE
  );
  const rangeStart = filtered.length === 0 ? 0 : (safePage - 1) * PAGE_SIZE + 1;
  const rangeEnd = Math.min(safePage * PAGE_SIZE, filtered.length);

  const changePage = (p: number) => {
    setPage(p);
    document
      .getElementById("directory-results")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div>
      {/* Page hero band */}
      <section className="bg-navy-900 py-14 md:py-16">
        <div className="container-repn">
          <SectionHeading
            dark
            eyebrow="Members Only Network"
            title="Find Your Next Referral Partner"
            intro="Browse 2,400+ vetted professionals across every specialty — residential to commercial, lending to title. Full contact details unlock with membership."
          />
        </div>
      </section>

      {/* Search + filters */}
      <section className="border-b border-border bg-muted py-6">
        <div className="container-repn">
          <div className="flex flex-col lg:flex-row gap-3 lg:items-center">
            <div className="relative flex-1">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
                aria-hidden
              />
              <Input
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setPage(1);
                }}
                placeholder="Search by name, brokerage, city, or state…"
                className="pl-9 h-11 bg-white"
                aria-label="Search members"
              />
            </div>
            <div className="flex gap-3">
              <Select
                value={specialty}
                onValueChange={(v) => {
                  setSpecialty(v);
                  setPage(1);
                }}
              >
                <SelectTrigger className="h-11 w-full lg:w-56 bg-white" aria-label="Filter by specialty">
                  <SlidersHorizontal className="h-3.5 w-3.5 text-muted-foreground" aria-hidden />
                  <SelectValue placeholder="Specialty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All specialties</SelectItem>
                  {SPECIALTIES.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select
                value={tierFilter}
                onValueChange={(v) => {
                  setTierFilter(v);
                  setPage(1);
                }}
              >
                <SelectTrigger className="h-11 w-full lg:w-44 bg-white" aria-label="Filter by tier">
                  <SelectValue placeholder="Tier" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All tiers</SelectItem>
                  {(Object.keys(TIER_PLAN) as Tier[]).map((t) => (
                    <SelectItem key={t} value={t}>
                      {TIER_PLAN[t].name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-sm text-muted-foreground">
            <span>
              Showing <strong className="text-navy-900">{rangeStart}–{rangeEnd}</strong> of{" "}
              <strong className="text-navy-900">{filtered.length}</strong> sample profiles
              {filtered.length !== MEMBERS.length && ` (filtered from ${MEMBERS.length})`} (2,400+ live)
            </span>
            {!session && (
              <span className="flex items-center gap-1.5 text-navy-800 font-medium">
                <Lock className="h-3.5 w-3.5 text-gold-600" aria-hidden />
                Contact details are members-only —{" "}
                <button
                  onClick={() => go("login")}
                  className="underline underline-offset-2 font-semibold text-gold-700 hover:text-gold-600"
                >
                  log in to unlock
                </button>
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Results grid */}
      <section id="directory-results" className="bg-white py-12 scroll-mt-28">
        <div className="container-repn">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <Users className="h-12 w-12 text-navy-200 mx-auto" aria-hidden />
              <h3 className="heading-caps text-2xl text-navy-900 mt-4">
                No members match your search
              </h3>
              <p className="mt-2 text-muted-foreground">
                Try a broader term, or clear the specialty and tier filters.
              </p>
              <Button
                onClick={() => {
                  setQuery("");
                  setSpecialty("all");
                  setTierFilter("all");
                  setPage(1);
                }}
                variant="outline"
                className="mt-6 border-navy-900 text-navy-900 hover:bg-navy-900 hover:text-white font-heading uppercase tracking-widest"
              >
                Clear filters
              </Button>
            </div>
          ) : (
            <>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {pageMembers.map((m) => (
                  <MemberCard key={m.id} member={m} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <nav
                  aria-label="Directory pagination"
                  className="mt-12 flex items-center justify-center gap-2"
                >
                  <button
                    onClick={() => changePage(safePage - 1)}
                    disabled={safePage === 1}
                    className="h-11 px-5 border border-border bg-white font-heading text-[13px] font-semibold uppercase tracking-widest text-navy-900 hover:border-navy-900 hover:bg-navy-50 transition-colors disabled:opacity-40 disabled:pointer-events-none"
                  >
                    &larr; Previous
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <button
                      key={p}
                      onClick={() => changePage(p)}
                      aria-current={p === safePage ? "page" : undefined}
                      aria-label={`Page ${p}`}
                      className={cn(
                        "h-11 w-11 border font-heading text-[15px] font-bold transition-colors",
                        p === safePage
                          ? "bg-navy-900 border-navy-900 text-gold-300"
                          : "bg-white border-border text-navy-900 hover:border-navy-900 hover:bg-navy-50"
                      )}
                    >
                      {p}
                    </button>
                  ))}
                  <button
                    onClick={() => changePage(safePage + 1)}
                    disabled={safePage === totalPages}
                    className="h-11 px-5 border border-border bg-white font-heading text-[13px] font-semibold uppercase tracking-widest text-navy-900 hover:border-navy-900 hover:bg-navy-50 transition-colors disabled:opacity-40 disabled:pointer-events-none"
                  >
                    Next &rarr;
                  </button>
                </nav>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}
