"use client";

import { useMemo, useState } from "react";
import { Lock, Search, SlidersHorizontal, Users } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by name, brokerage, city, or state…"
                className="pl-9 h-11 bg-white"
                aria-label="Search members"
              />
            </div>
            <div className="flex gap-3">
              <Select value={specialty} onValueChange={setSpecialty}>
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
              <Select value={tierFilter} onValueChange={setTierFilter}>
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
              Showing <strong className="text-navy-900">{filtered.length}</strong> of{" "}
              {MEMBERS.length} sample profiles (2,400+ live)
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
      <section className="bg-white py-12">
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
                }}
                variant="outline"
                className="mt-6 border-navy-900 text-navy-900 hover:bg-navy-900 hover:text-white font-heading uppercase tracking-widest"
              >
                Clear filters
              </Button>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((m) => (
                <MemberCard key={m.id} member={m} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
