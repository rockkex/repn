"use client";

import { useState } from "react";
import { BadgeCheck, Building2, CheckCircle2, CreditCard, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SectionHeading, TierCard } from "@/components/shared";
import { PaymentModal } from "@/components/payment-modal";
import { SPECIALTIES, TIER_PLAN, TIER_ORDER, type Tier } from "@/lib/data";
import { useAuth } from "@/lib/auth";
import { go } from "@/lib/router";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const STEPS = ["Choose Your Tier", "Your Information", "Payment"] as const;

export function JoinView() {
  const { createAccount } = useAuth();
  const [step, setStep] = useState(0);
  const [tier, setTier] = useState<Tier>("professional");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [brokerage, setBrokerage] = useState("");
  const [specialty, setSpecialty] = useState<string>("Residential");
  const [city, setCity] = useState("");
  const [stateCode, setStateCode] = useState("");
  const [phone, setPhone] = useState("");
  const [payOpen, setPayOpen] = useState(false);
  const [joined, setJoined] = useState(false);

  const plan = TIER_PLAN[tier];

  const stepValid = [
    true,
    name.trim().length >= 3 &&
      /^\S+@\S+\.\S+$/.test(email) &&
      password.length >= 8 &&
      brokerage.trim().length >= 2 &&
      city.trim().length >= 2 &&
      stateCode.trim().length === 2,
    true,
  ][step];

  const infoError =
    step === 1 && !stepValid
      ? "Please complete all required fields (password must be 8+ characters; state is 2 letters)."
      : null;

  const finish = () => {
    setJoined(true);
    toast.success("Welcome to REPN! Your membership is active.");
    setTimeout(() => go("dashboard"), 400);
  };

  return (
    <div>
      {/* Page hero band */}
      <section className="bg-navy-900 py-12 md:py-14">
        <div className="container-repn">
          <SectionHeading
            dark
            eyebrow="Application"
            title="Join the Network"
            intro="Three quick steps: pick your tier, tell us about your practice, and pay your first year of dues. Approval is instant in this demo."
          />
        </div>
      </section>

      {joined ? (
        <section className="bg-white py-20">
          <div className="container-repn max-w-xl text-center">
            <CheckCircle2 className="h-16 w-16 text-green-600 mx-auto" aria-hidden />
            <h2 className="heading-caps text-4xl text-navy-900 mt-4">
              Welcome to REPN, {name.split(" ")[0]}!
            </h2>
            <p className="mt-3 text-lg text-muted-foreground">
              Your {plan.name} membership is active through next year. Your
              directory profile is live and your dues receipt is in the dashboard.
            </p>
            <Button
              onClick={() => go("dashboard")}
              className="mt-8 h-12 px-8 bg-gold-500 hover:bg-gold-600 text-navy-950 font-heading uppercase tracking-widest text-[16px]"
            >
              Open My Dashboard
            </Button>
          </div>
        </section>
      ) : (
        <section className="bg-muted py-14">
          <div className="container-repn max-w-4xl">
            {/* Stepper */}
            <ol className="flex items-center justify-center gap-2 md:gap-4 flex-wrap">
              {STEPS.map((label, i) => (
                <li key={label} className="flex items-center gap-2 md:gap-4">
                  <button
                    onClick={() => i < step && setStep(i)}
                    className={cn(
                      "flex items-center gap-2",
                      i <= step ? "cursor-default" : "cursor-default"
                    )}
                    aria-current={i === step ? "step" : undefined}
                  >
                    <span
                      className={cn(
                        "grid h-9 w-9 place-items-center rounded-full font-heading font-bold text-lg border-2 transition-colors",
                        i < step
                          ? "bg-navy-900 border-navy-900 text-white"
                          : i === step
                            ? "bg-gold-500 border-gold-500 text-navy-950"
                            : "bg-white border-border text-muted-foreground"
                      )}
                    >
                      {i < step ? <CheckCircle2 className="h-5 w-5" aria-hidden /> : i + 1}
                    </span>
                    <span
                      className={cn(
                        "font-heading text-sm md:text-base font-semibold uppercase tracking-wide",
                        i === step ? "text-navy-900" : "text-muted-foreground"
                      )}
                    >
                      {label}
                    </span>
                  </button>
                  {i < STEPS.length - 1 && (
                    <span
                      aria-hidden
                      className={cn(
                        "h-px w-8 md:w-14",
                        i < step ? "bg-navy-900" : "bg-border"
                      )}
                    />
                  )}
                </li>
              ))}
            </ol>

            {/* Step content */}
            <div className="mt-10 bg-white border border-border p-6 md:p-9">
              {step === 0 && (
                <div>
                  <h2 className="heading-caps text-2xl text-navy-900">
                    Step 1 — Select your membership tier
                  </h2>
                  <p className="mt-1.5 text-sm text-muted-foreground">
                    You can upgrade at any time; differences are prorated.
                  </p>
                  <div className="mt-7 grid gap-6 md:grid-cols-3 items-start">
                    {TIER_ORDER.map((t) => (
                      <button
                        key={t}
                        onClick={() => setTier(t)}
                        className={cn(
                          "text-left transition-all rounded-sm",
                          tier === t
                            ? "ring-4 ring-gold-500/50 rounded-sm"
                            : "opacity-90 hover:opacity-100"
                        )}
                      >
                        <div className="relative">
                          {tier === t && (
                            <span className="absolute -top-2 left-4 z-10 bg-navy-900 text-gold-300 text-[11px] font-heading font-bold uppercase tracking-widest px-2.5 py-1">
                              Selected
                            </span>
                          )}
                        </div>
                        <TierCard tier={t} compact onJoin={setTier} />
                      </button>
                    ))}
                  </div>
                  <div className="mt-8 flex justify-end">
                    <Button
                      onClick={() => setStep(1)}
                      className="h-12 px-8 bg-navy-900 hover:bg-navy-800 text-white font-heading uppercase tracking-widest text-[15px]"
                    >
                      Continue with {plan.name} — ${plan.price}/yr
                    </Button>
                  </div>
                </div>
              )}

              {step === 1 && (
                <div>
                  <h2 className="heading-caps text-2xl text-navy-900">
                    Step 2 — Tell us about your practice
                  </h2>
                  <p className="mt-1.5 text-sm text-muted-foreground">
                    This information populates your public directory profile.
                  </p>
                  <form
                    className="mt-6 grid gap-4 md:grid-cols-2"
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (!stepValid) {
                        toast.error(infoError!);
                        return;
                      }
                      setStep(2);
                    }}
                    noValidate
                  >
                    <div className="space-y-1.5">
                      <Label htmlFor="join-name">Full name *</Label>
                      <div className="relative">
                        <UserRound className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" aria-hidden />
                        <Input id="join-name" className="pl-8" value={name} onChange={(e) => setName(e.target.value)} placeholder="Jordan Smith" />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="join-email">Email address *</Label>
                      <Input id="join-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@brokerage.com" />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="join-pass">Create password * (8+ characters)</Label>
                      <Input id="join-pass" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="join-title">Professional title</Label>
                      <Input id="join-title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Realtor / Broker / Loan Officer" />
                    </div>
                    <div className="space-y-1.5 md:col-span-2">
                      <Label htmlFor="join-brokerage">Brokerage / Company *</Label>
                      <div className="relative">
                        <Building2 className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" aria-hidden />
                        <Input id="join-brokerage" className="pl-8" value={brokerage} onChange={(e) => setBrokerage(e.target.value)} placeholder="Summit Realty Group" />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <Label>Primary specialty *</Label>
                      <Select value={specialty} onValueChange={setSpecialty}>
                        <SelectTrigger aria-label="Primary specialty">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {SPECIALTIES.map((s) => (
                            <SelectItem key={s} value={s}>
                              {s}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label htmlFor="join-city">City *</Label>
                        <Input id="join-city" value={city} onChange={(e) => setCity(e.target.value)} placeholder="Austin" />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="join-state">State * (2 letters)</Label>
                        <Input
                          id="join-state"
                          value={stateCode}
                          onChange={(e) => setStateCode(e.target.value.toUpperCase().slice(0, 2))}
                          placeholder="TX"
                        />
                      </div>
                    </div>
                    <div className="space-y-1.5 md:col-span-2">
                      <Label htmlFor="join-phone">Phone (shown to members)</Label>
                      <Input id="join-phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="(555) 555-0100" />
                    </div>

                    {infoError && (
                      <p className="md:col-span-2 rounded-sm border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive">
                        {infoError}
                      </p>
                    )}

                    <div className="md:col-span-2 flex items-center justify-between border-t border-navy-50 pt-5">
                      <button
                        type="button"
                        onClick={() => setStep(0)}
                        className="font-heading uppercase tracking-widest text-sm font-semibold text-steel-500 hover:text-navy-900"
                      >
                        ← Back
                      </button>
                      <Button
                        type="submit"
                        className="h-12 px-8 bg-navy-900 hover:bg-navy-800 text-white font-heading uppercase tracking-widest text-[15px]"
                      >
                        Continue to Payment
                      </Button>
                    </div>
                  </form>
                </div>
              )}

              {step === 2 && (
                <div>
                  <h2 className="heading-caps text-2xl text-navy-900">
                    Step 3 — Pay your first year of dues
                  </h2>
                  <p className="mt-1.5 text-sm text-muted-foreground">
                    Your {plan.name} membership activates immediately after checkout.
                  </p>

                  <div className="mt-6 rounded-sm border border-border bg-muted p-5 flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <div className="font-heading text-xl font-bold uppercase tracking-wide text-navy-900">
                        REPN {plan.name} Membership
                      </div>
                      <div className="text-sm text-muted-foreground">
                        12 months · renews automatically · 60-day guarantee
                      </div>
                      <div className="mt-2 flex items-center gap-1.5 text-[13px] text-navy-800">
                        <BadgeCheck className="h-4 w-4 text-gold-600" aria-hidden />
                        Includes: {plan.features[0]}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[12px] uppercase tracking-widest text-muted-foreground font-semibold">
                        Due today
                      </div>
                      <div className="heading-caps text-5xl text-navy-900">${plan.price}</div>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-navy-50 pt-5">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="font-heading uppercase tracking-widest text-sm font-semibold text-steel-500 hover:text-navy-900"
                    >
                      ← Back
                    </button>
                    <Button
                      onClick={() => setPayOpen(true)}
                      className="h-12 px-8 bg-gold-500 hover:bg-gold-600 text-navy-950 font-heading uppercase tracking-widest text-[15px]"
                    >
                      <CreditCard className="h-4 w-4 mr-2" aria-hidden />
                      Pay ${plan.price} & Activate
                    </Button>
                  </div>
                </div>
              )}
            </div>

            <p className="mt-5 text-center text-[13px] text-muted-foreground">
              Already a member?{" "}
              <button
                onClick={() => go("login")}
                className="font-semibold text-gold-700 hover:text-gold-600 underline underline-offset-2"
              >
                Log in to the portal
              </button>
            </p>
          </div>
        </section>
      )}

      <PaymentModal
        open={payOpen}
        onClose={() => setPayOpen(false)}
        amount={plan.price}
        description={`REPN ${plan.name} membership — first year dues`}
        onSuccess={(p) => {
          createAccount({
            name,
            email,
            password,
            tier,
            brokerage,
            title: title || "Member",
            specialty,
            city,
            state: stateCode,
            phone: phone || "(555) 555-0100",
            payment: p,
          });
          setPayOpen(false);
          finish();
        }}
      />
    </div>
  );
}
