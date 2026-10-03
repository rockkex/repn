"use client";

import Image from "next/image";
import { useState } from "react";
import {
  BadgeCheck,
  CalendarDays,
  CreditCard,
  Download,
  FileText,
  LayoutDashboard,
  MapPin,
  Receipt,
  Save,
  TriangleAlert,
  UserRound,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DateBlock, SectionHeading } from "@/components/shared";
import { PaymentModal } from "@/components/payment-modal";
import {
  MEMBERS,
  RESOURCES,
  TIER_PLAN,
  UPCOMING_EVENTS,
  formatDate,
  type Tier,
} from "@/lib/data";
import { useAuth } from "@/lib/auth";
import { go } from "@/lib/router";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

type DashTab = "overview" | "events" | "resources" | "profile" | "billing";

const TABS: { id: DashTab; label: string; icon: React.ElementType }[] = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "events", label: "My Events", icon: CalendarDays },
  { id: "resources", label: "Resource Library", icon: FileText },
  { id: "profile", label: "Profile", icon: UserRound },
  { id: "billing", label: "Billing & Dues", icon: CreditCard },
];

function DuesCard({
  duesStatus,
  duesPaidUntil,
  tier,
  onPay,
  compact = false,
}: {
  duesStatus: "paid" | "due";
  duesPaidUntil?: string;
  tier: Tier;
  onPay: () => void;
  compact?: boolean;
}) {
  const plan = TIER_PLAN[tier];
  return (
    <div
      className={cn(
        "rounded-sm border-2 p-5",
        duesStatus === "paid"
          ? "border-green-700/40 bg-green-50"
          : "border-gold-500 bg-gold-50"
      )}
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            {duesStatus === "paid" ? (
              <BadgeCheck className="h-5 w-5 text-green-700" aria-hidden />
            ) : (
              <TriangleAlert className="h-5 w-5 text-gold-700" aria-hidden />
            )}
            <span className="font-heading text-xl font-bold uppercase tracking-wide text-navy-900">
              {duesStatus === "paid"
                ? "Dues Paid — Membership Active"
                : "Annual Dues Outstanding"}
            </span>
          </div>
          <p className="mt-1.5 text-sm text-muted-foreground">
            {duesStatus === "paid"
              ? `Active through ${duesPaidUntil}. Receipts are listed under Billing & Dues.`
              : `Your ${plan.name} renewal of $${plan.price} is due Nov 1, 2026. Keep directory access and member pricing active by paying online.`}
          </p>
        </div>
        {duesStatus === "due" && (
          <Button
            onClick={onPay}
            className={cn(
              "font-heading uppercase tracking-widest",
              compact ? "h-10 px-5 text-sm" : "h-11 px-6"
            )}
          >
            <CreditCard className="h-4 w-4 mr-2" aria-hidden />
            Pay ${plan.price} Now
          </Button>
        )}
      </div>
    </div>
  );
}

export function DashboardView() {
  const { session, recordPayment, updateProfile, cancelRegistration } = useAuth();
  const [tab, setTab] = useState<DashTab>("overview");
  const [payOpen, setPayOpen] = useState(false);

  // profile draft state
  const [draft, setDraft] = useState<null | {
    name: string; title: string; brokerage: string; specialty: string; city: string; state: string; phone: string;
  }>(null);

  if (!session) return null;

  const plan = TIER_PLAN[session.tier];
  const member = MEMBERS.find((m) => m.id === session.memberId);
  const avatar = member?.avatar ?? "/images/avatar-w3.jpg?v=2";
  const registeredEvents = UPCOMING_EVENTS.filter((e) =>
    session.registrations.includes(e.id)
  );
  const nextEvents = UPCOMING_EVENTS.filter(
    (e) => new Date(e.dateISO) >= new Date("2026-10-03")
  ).slice(0, 2);

  const d = draft ?? {
    name: session.name,
    title: session.title,
    brokerage: session.brokerage,
    specialty: session.specialty,
    city: session.city,
    state: session.state,
    phone: session.phone,
  };

  const startPay = () => setPayOpen(true);

  return (
    <div>
      {/* Greeting band */}
      <section className="bg-navy-900 py-10">
        <div className="container-repn flex flex-wrap items-center justify-between gap-5">
          <div className="flex items-center gap-4">
            <Image
              src={avatar}
              alt={session.name}
              width={64}
              height={64}
              className="h-16 w-16 rounded-full object-cover object-top border-2 border-gold-500"
            />
            <div>
              <div className="eyebrow text-gold-400">Member Dashboard</div>
              <h1 className="heading-caps text-3xl md:text-4xl text-white mt-1">
                Welcome back, {session.name.split(" ")[0]}
              </h1>
              <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-navy-200">
                <Badge className="bg-gold-500 text-navy-950 hover:bg-gold-500 uppercase font-heading tracking-widest text-[11px]">
                  {session.tier} member
                </Badge>
                <span>ID {session.memberId.toUpperCase()}</span>
                <span aria-hidden>·</span>
                <span>Member since {session.joinedDate}</span>
              </div>
            </div>
          </div>
          <Button
            onClick={() => go("directory")}
            variant="outline"
            className="border-2 border-gold-500 text-gold-400 hover:bg-gold-500 hover:text-navy-950 font-heading uppercase tracking-widest h-11 px-6"
          >
            <Users className="h-4 w-4 mr-2" aria-hidden />
            Browse Directory
          </Button>
        </div>
      </section>

      <section className="bg-muted py-10">
        <div className="container-repn grid gap-6 lg:grid-cols-[260px_1fr] items-start">
          {/* Sidebar */}
          <nav className="bg-white border border-border overflow-hidden lg:sticky lg:top-40" aria-label="Dashboard">
            <div className="lg:hidden flex overflow-x-auto scroll-thin">
              {TABS.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-3 whitespace-nowrap font-heading text-sm font-semibold uppercase tracking-wide border-b-2",
                    tab === t.id
                      ? "border-gold-500 text-navy-900 bg-navy-50"
                      : "border-transparent text-steel-500"
                  )}
                >
                  <t.icon className="h-4 w-4" aria-hidden />
                  {t.label}
                </button>
              ))}
            </div>
            <div className="hidden lg:block">
              {TABS.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  aria-current={tab === t.id ? "true" : undefined}
                  className={cn(
                    "w-full flex items-center gap-3 px-5 py-3.5 text-left border-l-[3px] transition-colors",
                    tab === t.id
                      ? "border-gold-500 bg-navy-50 text-navy-900"
                      : "border-transparent text-steel-500 hover:bg-navy-50/60"
                  )}
                >
                  <t.icon className={cn("h-4.5 w-4.5", tab === t.id && "text-gold-600")} aria-hidden />
                  <span className="font-heading text-[15px] font-semibold uppercase tracking-wide">
                    {t.label}
                  </span>
                </button>
              ))}
              <div className="border-t border-navy-50 p-4">
                <div className="text-[12px] text-muted-foreground">
                  Signed in as
                  <div className="font-semibold text-navy-900 truncate">{session.email}</div>
                </div>
                <Button
                  onClick={() => { go("home"); }}
                  variant="outline"
                  className="mt-3 w-full h-9 border-navy-200 text-steel-500 hover:bg-navy-50 font-heading uppercase tracking-wide text-[13px]"
                >
                  View Public Site
                </Button>
              </div>
            </div>
          </nav>

          {/* Content */}
          <div className="min-w-0 space-y-6">
            {tab === "overview" && (
              <>
                <DuesCard
                  duesStatus={session.duesStatus}
                  duesPaidUntil={session.duesPaidUntil}
                  tier={session.tier}
                  onPay={startPay}
                />
                <div className="grid gap-6 md:grid-cols-2">
                  {/* Next events */}
                  <div className="bg-white border border-border">
                    <h3 className="heading-caps text-xl text-navy-900 px-5 pt-4 pb-2.5 border-b border-navy-50 flex items-center gap-2">
                      <CalendarDays className="h-4.5 w-4.5 text-gold-600" aria-hidden />
                      Coming Up Next
                    </h3>
                    <ul>
                      {nextEvents.map((e) => {
                        const reg = session.registrations.includes(e.id);
                        return (
                          <li key={e.id} className="flex items-start gap-4 px-5 py-4 border-b border-navy-50 last:border-0">
                            <DateBlock iso={e.dateISO} />
                            <div className="min-w-0">
                              <div className="text-[12px] font-semibold uppercase tracking-[0.14em] text-gold-700">
                                {e.type}
                              </div>
                              <p className="font-semibold text-navy-900 leading-snug">{e.title}</p>
                              <p className="text-[13px] text-muted-foreground mt-0.5 flex items-center gap-1">
                                <MapPin className="h-3 w-3" aria-hidden /> {e.location.split(",")[0]}
                              </p>
                              <span className={cn("mt-1.5 inline-block text-[12px] font-semibold", reg ? "text-green-700" : "text-steel-500")}>
                                {reg ? "✓ You're registered" : "Not registered yet"}
                              </span>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                    <button
                      onClick={() => setTab("events")}
                      className="w-full text-center py-3 font-heading text-sm font-semibold uppercase tracking-widest text-gold-700 hover:text-gold-600 hover:bg-gold-50 border-t border-navy-50 transition-colors"
                    >
                      Manage my events →
                    </button>
                  </div>

                  {/* Quick links + announcement */}
                  <div className="space-y-6">
                    <div className="bg-white border border-border">
                      <h3 className="heading-caps text-xl text-navy-900 px-5 pt-4 pb-2.5 border-b border-navy-50 flex items-center gap-2">
                        <FileText className="h-4.5 w-4.5 text-gold-600" aria-hidden />
                        Member Quick Links
                      </h3>
                      <div className="p-4 grid grid-cols-2 gap-3">
                        {[
                          { label: "Resource Library", action: () => setTab("resources") },
                          { label: "Update Profile", action: () => setTab("profile") },
                          { label: "Pay / View Dues", action: () => setTab("billing") },
                          { label: "Member Directory", action: () => go("directory") },
                          { label: "Event Calendar", action: () => go("events") },
                          { label: "Latest News", action: () => go("news") },
                        ].map((l) => (
                          <button
                            key={l.label}
                            onClick={l.action}
                            className="border border-border bg-muted hover:bg-navy-50 hover:border-navy-200 transition-colors px-3 py-2.5 text-sm font-semibold text-navy-900 text-left"
                          >
                            {l.label} →
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="bg-navy-900 border border-navy-900 p-5">
                      <div className="eyebrow text-gold-400">Announcement</div>
                      <p className="mt-2 text-[15px] leading-relaxed text-navy-100">
                        The <strong className="text-white">2026 Fall Summit</strong> is Oct
                        22–23 in Chicago. Premium members: your Leadership Summit
                        dinner invitation is in your email — RSVP by Nov 1.
                      </p>
                      <button
                        onClick={() => go("events")}
                        className="mt-3 font-heading text-sm font-semibold uppercase tracking-widest text-gold-400 hover:text-gold-300"
                      >
                        View summit agenda →
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}

            {tab === "events" && (
              <div className="bg-white border border-border">
                <div className="px-6 py-5 border-b border-navy-50">
                  <h3 className="heading-caps text-2xl text-navy-900">My Event Registrations</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {registeredEvents.length} upcoming registration
                    {registeredEvents.length === 1 ? "" : "s"} · cancellations are free
                    until 7 days before each event
                  </p>
                </div>
                {registeredEvents.length === 0 ? (
                  <div className="p-10 text-center">
                    <CalendarDays className="h-10 w-10 text-navy-200 mx-auto" aria-hidden />
                    <p className="mt-3 text-muted-foreground">
                      You haven&apos;t registered for any upcoming events.
                    </p>
                    <Button
                      onClick={() => go("events")}
                      className="mt-5 bg-navy-900 hover:bg-navy-800 text-white font-heading uppercase tracking-widest"
                    >
                      Browse Events
                    </Button>
                  </div>
                ) : (
                  <ul>
                    {registeredEvents.map((e) => (
                      <li key={e.id} className="flex flex-wrap items-center gap-4 px-6 py-4 border-b border-navy-50 last:border-0">
                        <DateBlock iso={e.dateISO} />
                        <div className="min-w-0 flex-1">
                          <div className="text-[12px] font-semibold uppercase tracking-[0.14em] text-gold-700">
                            {e.type} · {e.price}
                          </div>
                          <p className="font-semibold text-navy-900">{e.title}</p>
                          <p className="text-[13px] text-muted-foreground">
                            {formatDate(e.dateISO, { weekday: "long", month: "long", day: "numeric" })} · {e.time}
                          </p>
                        </div>
                        <Badge className="bg-green-50 text-green-800 border border-green-700/30 hover:bg-green-50">
                          <BadgeCheck className="h-3.5 w-3.5 mr-1" aria-hidden /> Confirmed
                        </Badge>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            cancelRegistration(e.id);
                            toast.success("Registration cancelled. See you at a future event!");
                          }}
                          className="border-navy-200 text-steel-500 hover:bg-destructive/5 hover:border-destructive/40 hover:text-destructive h-9"
                        >
                          Cancel
                        </Button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            {tab === "resources" && (
              <div className="bg-white border border-border">
                <div className="px-6 py-5 border-b border-navy-50 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h3 className="heading-caps text-2xl text-navy-900">Resource Library</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Included with your {plan.name} membership — download anytime.
                    </p>
                  </div>
                  <Button
                    onClick={() => go("resources")}
                    variant="outline"
                    className="border-navy-900 text-navy-900 hover:bg-navy-900 hover:text-white font-heading uppercase tracking-widest h-10"
                  >
                    Open Full Library
                  </Button>
                </div>
                <ul>
                  {RESOURCES.slice(0, 6).map((r) => (
                    <li key={r.id} className="flex flex-wrap items-center gap-4 px-6 py-4 border-b border-navy-50 last:border-0">
                      <span className="grid h-11 w-11 place-items-center bg-navy-900 text-gold-400 shrink-0">
                        <FileText className="h-5 w-5" aria-hidden />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-navy-900">{r.title}</p>
                        <p className="text-[13px] text-muted-foreground">
                          {r.format} · {r.meta} · Updated {r.updated}
                        </p>
                      </div>
                      <a
                        href={r.file}
                        download
                        onClick={() => toast.success(`Downloading "${r.title}"…`)}
                        className="inline-flex items-center gap-1.5 h-9 px-4 border border-navy-900 text-navy-900 hover:bg-navy-900 hover:text-white transition-colors font-heading text-[13px] font-semibold uppercase tracking-widest cursor-pointer"
                      >
                        <Download className="h-3.5 w-3.5" aria-hidden />
                        Download
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {tab === "profile" && (
              <div className="bg-white border border-border">
                <div className="px-6 py-5 border-b border-navy-50">
                  <h3 className="heading-caps text-2xl text-navy-900">My Profile</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Changes appear instantly in the public member directory.
                  </p>
                </div>
                <form
                  className="p-6 grid gap-4 md:grid-cols-2"
                  onSubmit={(e) => {
                    e.preventDefault();
                    updateProfile(draft!);
                    toast.success("Profile updated — your directory card now shows the new details.");
                  }}
                  noValidate
                >
                  <div className="space-y-1.5">
                    <Label htmlFor="pf-name">Full name</Label>
                    <Input id="pf-name" value={d.name} onChange={(e) => setDraft({ ...d, name: e.target.value })} />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="pf-title">Professional title</Label>
                    <Input id="pf-title" value={d.title} onChange={(e) => setDraft({ ...d, title: e.target.value })} />
                  </div>
                  <div className="space-y-1.5 md:col-span-2">
                    <Label htmlFor="pf-brokerage">Brokerage / Company</Label>
                    <Input id="pf-brokerage" value={d.brokerage} onChange={(e) => setDraft({ ...d, brokerage: e.target.value })} />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="pf-specialty">Primary specialty</Label>
                    <Input id="pf-specialty" value={d.specialty} onChange={(e) => setDraft({ ...d, specialty: e.target.value })} />
                  </div>
                  <div className="grid grid-cols-[1fr_80px] gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="pf-city">City</Label>
                      <Input id="pf-city" value={d.city} onChange={(e) => setDraft({ ...d, city: e.target.value })} />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="pf-state">State</Label>
                      <Input id="pf-state" value={d.state} onChange={(e) => setDraft({ ...d, state: e.target.value.toUpperCase().slice(0, 2) })} />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="pf-phone">Phone</Label>
                    <Input id="pf-phone" value={d.phone} onChange={(e) => setDraft({ ...d, phone: e.target.value })} />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="pf-email">Email (login — read only)</Label>
                    <Input id="pf-email" value={session.email} disabled className="opacity-70" />
                  </div>
                  <div className="md:col-span-2 border-t border-navy-50 pt-5 flex justify-end">
                    <Button
                      type="submit"
                      disabled={!draft}
                      className="bg-navy-900 hover:bg-navy-800 text-white font-heading uppercase tracking-widest h-11 px-7"
                    >
                      <Save className="h-4 w-4 mr-2" aria-hidden />
                      Save Changes
                    </Button>
                  </div>
                </form>
              </div>
            )}

            {tab === "billing" && (
              <>
                <DuesCard
                  duesStatus={session.duesStatus}
                  duesPaidUntil={session.duesPaidUntil}
                  tier={session.tier}
                  onPay={startPay}
                  compact
                />
                <div className="bg-white border border-border">
                  <div className="px-6 py-5 border-b border-navy-50 flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h3 className="heading-caps text-2xl text-navy-900">Payment History</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Receipts for your records — dues may be tax-deductible.
                      </p>
                    </div>
                    <Receipt className="h-6 w-6 text-gold-600" aria-hidden />
                  </div>
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/60 hover:bg-muted/60">
                        <TableHead className="px-6 font-heading uppercase tracking-widest text-[12px] text-steel-500">
                          Receipt
                        </TableHead>
                        <TableHead className="font-heading uppercase tracking-widest text-[12px] text-steel-500">
                          Description
                        </TableHead>
                        <TableHead className="font-heading uppercase tracking-widest text-[12px] text-steel-500">
                          Date
                        </TableHead>
                        <TableHead className="font-heading uppercase tracking-widest text-[12px] text-steel-500">
                          Method
                        </TableHead>
                        <TableHead className="text-right px-6 font-heading uppercase tracking-widest text-[12px] text-steel-500">
                          Amount
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {session.payments.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center py-10 text-muted-foreground">
                            No payments yet — your first receipt appears after you pay dues.
                          </TableCell>
                        </TableRow>
                      ) : (
                        session.payments.map((p) => (
                          <TableRow key={p.id}>
                            <TableCell className="px-6 font-bold text-navy-900">{p.id}</TableCell>
                            <TableCell className="text-foreground/85">{p.description}</TableCell>
                            <TableCell className="text-foreground/85">{formatDate(p.dateISO)}</TableCell>
                            <TableCell className="text-foreground/85">{p.method}</TableCell>
                            <TableCell className="text-right px-6 font-bold text-navy-900">
                              ${p.amount}
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
                <div className="rounded-sm border border-border bg-white p-5 text-sm text-muted-foreground flex flex-wrap items-center justify-between gap-3">
                  <span>
                    Need an invoice for your brokerage? Member services can issue
                    W-9 and itemized receipts.
                  </span>
                  <button
                    onClick={() => toast.info("In demo mode — an accountant copy would be emailed to you.")}
                    className="font-heading uppercase tracking-widest text-[13px] font-semibold text-gold-700 hover:text-gold-600"
                  >
                    Request invoice copy →
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      <PaymentModal
        open={payOpen}
        onClose={() => setPayOpen(false)}
        amount={plan.price}
        description={`REPN ${plan.name} membership — annual dues`}
        onSuccess={(p) => {
          recordPayment(p);
          setPayOpen(false);
          toast.success(`Dues paid — ${p.id}`, {
            description: "Your membership is active through next year. Thank you!",
          });
        }}
      />
    </div>
  );
}
