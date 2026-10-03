"use client";

import { useState } from "react";
import { KeyRound, LogIn, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SectionHeading } from "@/components/shared";
import { useAuth } from "@/lib/auth";
import { go } from "@/lib/router";
import { toast } from "sonner";
import { DEMO_ACCOUNTS } from "@/lib/data";

export function LoginView({ notice }: { notice?: string }) {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    // brief delay to feel like a real portal round-trip
    setTimeout(() => {
      const res = login(email, password);
      setBusy(false);
      if (res.ok) {
        toast.success("Welcome back! You're logged in.", {
          description: "Loading your member dashboard…",
        });
        go("dashboard");
      } else {
        setError(res.error ?? "Login failed.");
      }
    }, 500);
  };

  return (
    <div>
      {/* Page hero band */}
      <section className="bg-navy-900 py-12 md:py-14">
        <div className="container-repn">
          <SectionHeading
            dark
            eyebrow="Member Portal"
            title="Member Login"
            intro="Access your dashboard, the Resource Library, member contacts, and event registrations."
          />
        </div>
      </section>

      <section className="bg-muted py-14">
        <div className="container-repn max-w-5xl grid gap-8 lg:grid-cols-[1fr_360px] items-start">
          {/* Login card */}
          <div className="bg-white border border-border p-7 md:p-9">
            {notice && (
              <div className="mb-5 rounded-sm border border-gold-300 bg-gold-50 px-4 py-3 text-sm text-navy-900 flex items-start gap-2">
                <KeyRound className="h-4 w-4 mt-0.5 text-gold-600 shrink-0" aria-hidden />
                {notice}
              </div>
            )}
            <h2 className="heading-caps text-2xl text-navy-900 flex items-center gap-2">
              <LogIn className="h-5 w-5 text-gold-600" aria-hidden />
              Sign in to your account
            </h2>
            <form onSubmit={submit} className="mt-6 space-y-4" noValidate>
              <div className="space-y-1.5">
                <Label htmlFor="login-email">Email address</Label>
                <Input
                  id="login-email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@brokerage.com"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="login-pass">Password</Label>
                <Input
                  id="login-pass"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>
              {error && (
                <p className="rounded-sm border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive">
                  {error}
                </p>
              )}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-muted-foreground cursor-pointer">
                  <input type="checkbox" className="accent-[#c19a3d]" defaultChecked />
                  Remember me
                </label>
                <button
                  type="button"
                  onClick={() =>
                    toast.info("Password reset is not included in this portfolio demo.")
                  }
                  className="text-gold-700 hover:text-gold-600 font-medium"
                >
                  Forgot password?
                </button>
              </div>
              <Button
                type="submit"
                disabled={busy}
                className="w-full h-12 bg-navy-900 hover:bg-navy-800 text-white font-heading uppercase tracking-widest text-[16px]"
              >
                {busy ? "Signing in…" : "Log In to Portal"}
              </Button>
            </form>

            <div className="mt-6 border-t border-navy-50 pt-5 text-center text-sm text-muted-foreground">
              Not a member yet?{" "}
              <button
                onClick={() => go("join")}
                className="font-semibold text-gold-700 hover:text-gold-600 underline underline-offset-2"
              >
                Join REPN today
              </button>{" "}
              — approval is instant in this demo.
            </div>
          </div>

          {/* Demo credentials card */}
          <aside className="bg-white border-2 border-gold-500 p-6">
            <h3 className="heading-caps text-xl text-navy-900 flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-gold-600" aria-hidden />
              Demo Accounts
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              This is a portfolio demo — use either account below to tour the
              gated member experience:
            </p>
            <div className="mt-4 space-y-3">
              {DEMO_ACCOUNTS.map((a) => (
                <button
                  key={a.email}
                  type="button"
                  onClick={() => {
                    setEmail(a.email);
                    setPassword(a.password);
                    setError(null);
                    toast.info("Credentials filled — press Log In to continue.");
                  }}
                  className="w-full text-left rounded-sm border border-border bg-muted px-4 py-3 hover:border-gold-500 hover:bg-gold-50 transition-colors"
                >
                  <div className="font-heading text-[15px] font-bold uppercase tracking-wide text-navy-900">
                    {a.name} · {a.tier} tier
                  </div>
                  <div className="text-sm text-muted-foreground mt-0.5">
                    <span className="font-medium text-navy-900">{a.email}</span> ·{" "}
                    {a.password}
                  </div>
                  <div className="text-[12px] mt-1 text-gold-700 font-semibold">
                    {a.duesStatus === "due"
                      ? "→ Has unpaid dues: try the online payment flow"
                      : "→ Dues paid: view receipts & registrations"}
                  </div>
                </button>
              ))}
            </div>
            <p className="mt-4 text-[12px] text-muted-foreground">
              Click a card to autofill the form. Sessions persist in your browser
              via localStorage — no data leaves this demo.
            </p>
          </aside>
        </div>
      </section>
    </div>
  );
}
