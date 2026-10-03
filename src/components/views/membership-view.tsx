"use client";

import { Check, HelpCircle, Minus, ShieldCheck } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionHeading, TierCard } from "@/components/shared";
import { COMPARISON_ROWS, TIER_ORDER } from "@/lib/data";
import { go } from "@/lib/router";
import { toast } from "sonner";

const FAQS = [
  {
    q: "When does my membership renew?",
    a: "Dues are billed annually on the anniversary of your join date. We email a reminder 30 days ahead, and you can pay online from your member dashboard with any major card. Members on the Premium tier can also request quarterly invoicing.",
  },
  {
    q: "Can I upgrade or downgrade my tier mid-year?",
    a: "Yes. Upgrades take effect immediately — we simply prorate the difference for the remainder of your term. Downgrades apply at your next renewal so you keep the benefits you already paid for.",
  },
  {
    q: "Is there a satisfaction guarantee?",
    a: "Every new membership carries a 60-day guarantee. If REPN is not the right fit, contact member services and we will refund your dues in full — no questions asked.",
  },
  {
    q: "Do you offer group or brokerage accounts?",
    a: "Brokerages with five or more agents qualify for group pricing starting at 15% off, plus a dedicated onboarding session and a co-branded directory presence. Contact members@repn.org for a quote.",
  },
  {
    q: "How does the Referral Network work?",
    a: "Professional and Premium members are matched automatically when a consumer or fellow member requests an agent in your specialty and market. Referrals are tracked in your dashboard, and last year the network moved $4.2B in volume.",
  },
];

export function MembershipView() {
  return (
    <div>
      {/* Page hero band */}
      <section className="bg-navy-900 py-14 md:py-16">
        <div className="container-repn">
          <SectionHeading
            dark
            eyebrow="Membership Plans"
            title="Invest in Your Professional Network"
            intro="Three straightforward tiers. Annual dues. No hidden platform fees. Every plan is backed by our 60-day satisfaction guarantee."
          />
        </div>
      </section>

      {/* Pricing cards */}
      <section className="bg-white py-16">
        <div className="container-repn">
          <div className="grid gap-6 pt-2 md:grid-cols-3">
            {TIER_ORDER.map((t) => (
              <TierCard key={t} tier={t} onJoin={(tier) => {
                go("join");
                toast.success(`${tier.charAt(0).toUpperCase() + tier.slice(1)} tier selected — complete your application below.`);
              }} />
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-muted-foreground flex items-center justify-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-gold-600" aria-hidden />
            All prices in USD. Dues may be tax-deductible as a professional
            association expense — consult your tax advisor.
          </p>
        </div>
      </section>

      {/* Comparison table */}
      <section className="bg-muted py-16">
        <div className="container-repn">
          <SectionHeading
            eyebrow="Side by Side"
            title="Compare Member Benefits"
          />
          <div className="mt-10 overflow-x-auto scroll-thin border border-border bg-white">
            <table className="w-full min-w-[640px] text-sm">
              <thead>
                <tr className="bg-navy-900 text-white">
                  <th className="text-left px-5 py-4 font-heading uppercase tracking-widest text-[15px] font-semibold">
                    Benefit
                  </th>
                  <th className="px-4 py-4 font-heading uppercase tracking-widest text-[15px] font-semibold w-32">
                    Basic
                    <div className="text-gold-400 text-[13px] normal-case tracking-normal">$195/yr</div>
                  </th>
                  <th className="px-4 py-4 font-heading uppercase tracking-widest text-[15px] font-semibold w-32 bg-navy-800">
                    Professional
                    <div className="text-gold-400 text-[13px] normal-case tracking-normal">$345/yr</div>
                  </th>
                  <th className="px-4 py-4 font-heading uppercase tracking-widest text-[15px] font-semibold w-32">
                    Premium
                    <div className="text-gold-400 text-[13px] normal-case tracking-normal">$545/yr</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_ROWS.map((row, i) => (
                  <tr
                    key={row.label}
                    className={i % 2 === 0 ? "bg-white" : "bg-muted/60"}
                  >
                    <td className="px-5 py-3.5 font-medium text-foreground">
                      {row.label}
                    </td>
                    {row.values.map((v, j) => (
                      <td
                        key={j}
                        className={`px-4 py-3.5 text-center ${
                          j === 1 ? "bg-gold-50/60" : ""
                        }`}
                      >
                        {v === true ? (
                          <Check className="h-4.5 w-4.5 text-green-700 mx-auto" aria-label="Included" />
                        ) : v === false ? (
                          <Minus className="h-4 w-4 text-muted-foreground/50 mx-auto" aria-label="Not included" />
                        ) : (
                          <span className="text-[13px] font-semibold text-navy-900">{v}</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-16">
        <div className="container-repn max-w-3xl">
          <SectionHeading
            eyebrow="Questions"
            title="Membership FAQ"
            intro="Everything agents, brokers, and industry partners usually ask before joining."
          />
          <Accordion type="single" collapsible className="mt-10">
            {FAQS.map((f, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger className="text-left font-heading text-lg font-semibold uppercase tracking-wide text-navy-900 hover:text-gold-700 hover:no-underline">
                  <span className="flex items-start gap-2">
                    <HelpCircle className="h-4.5 w-4.5 mt-1 text-gold-600 shrink-0" aria-hidden />
                    {f.q}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-[15px] leading-relaxed text-muted-foreground">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-12 rounded-sm border border-navy-100 bg-navy-50 p-8 text-center">
            <h3 className="heading-caps text-2xl text-navy-900">
              Still deciding? Tour the member portal first.
            </h3>
            <p className="mt-2 text-[15px] text-muted-foreground">
              Use the demo account on the login page to explore the dashboard,
              directory, and Resource Library before you join.
            </p>
            <button
              onClick={() => go("login")}
              className="mt-5 inline-flex items-center gap-1.5 font-heading uppercase tracking-widest text-[15px] font-semibold text-gold-700 hover:text-gold-600"
            >
              Go to member login →
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
