"use client";

import { useEffect, useState } from "react";
import { CalendarDays, ChevronRight, LayoutDashboard, LogIn, LogOut, Mail, Menu, Phone, Search, UserPlus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";
import { go, type Route } from "@/lib/router";
import { cn } from "@/lib/utils";

const NAV_ITEMS: { label: string; route: Route }[] = [
  { label: "Home", route: "home" },
  { label: "Membership", route: "membership" },
  { label: "Member Directory", route: "directory" },
  { label: "Events", route: "events" },
  { label: "Resources", route: "resources" },
  { label: "News", route: "news" },
];

export function SiteHeader({ route }: { route: Route }) {
  const { session, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const [showBanner, setShowBanner] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (r: Route) => r === route;

  const navTo = (r: Route) => {
    setOpen(false);
    go(r);
  };

  return (
    <header className="sticky top-0 z-40">
      {/* Announcement strip */}
      {showBanner && (
        <div className="bg-gold-500 text-navy-950">
          <div className="container-repn flex items-center justify-center gap-2 py-1.5 text-[13px] font-semibold relative pr-10">
            <CalendarDays className="h-3.5 w-3.5 shrink-0" aria-hidden />
            <span className="truncate">
              2026 National Fall Summit — Oct 22–23, Chicago · Member registration is
              now open
            </span>
            <button
              onClick={() => go("events")}
              className="hidden sm:inline-flex items-center gap-0.5 underline underline-offset-2 font-bold hover:text-navy-800"
            >
              Register <ChevronRight className="h-3.5 w-3.5" aria-hidden />
            </button>
            <button
              onClick={() => setShowBanner(false)}
              aria-label="Dismiss announcement"
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded p-1 hover:bg-gold-600/30"
            >
              <X className="h-3.5 w-3.5" aria-hidden />
            </button>
          </div>
        </div>
      )}

      {/* Utility top bar */}
      <div className="bg-navy-950 text-navy-100 text-[12.5px]">
        <div className="container-repn flex items-center justify-between gap-4 py-1.5">
          <div className="flex items-center gap-5 min-w-0">
            <a href={`tel:8005557376`} className="hidden md:inline-flex items-center gap-1.5 hover:text-gold-300 transition-colors">
              <Phone className="h-3 w-3 text-gold-400" aria-hidden /> (800) 555-REPN
            </a>
            <a href={`mailto:members@repn.org`} className="hidden lg:inline-flex items-center gap-1.5 hover:text-gold-300 transition-colors">
              <Mail className="h-3 w-3 text-gold-400" aria-hidden /> members@repn.org
            </a>
            <span className="hidden sm:inline text-navy-300">Est. 2004 · 38 Chapters Nationwide</span>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            {session ? (
              <>
                <button
                  onClick={() => navTo("dashboard")}
                  className="inline-flex items-center gap-1.5 rounded px-2.5 py-1 font-semibold text-gold-300 hover:bg-navy-800 transition-colors"
                >
                  <LayoutDashboard className="h-3.5 w-3.5" aria-hidden />
                  {session.name.split(" ")[0]}&apos;s Dashboard
                </button>
                <button
                  onClick={() => { logout(); navTo("home"); }}
                  className="inline-flex items-center gap-1.5 rounded px-2.5 py-1 text-navy-200 hover:text-white hover:bg-navy-800 transition-colors"
                >
                  <LogOut className="h-3.5 w-3.5" aria-hidden /> Log Out
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => navTo("login")}
                  className="inline-flex items-center gap-1.5 rounded px-2.5 py-1 font-semibold hover:bg-navy-800 hover:text-white transition-colors"
                >
                  <LogIn className="h-3.5 w-3.5 text-gold-400" aria-hidden /> Member Login
                </button>
                <button
                  onClick={() => navTo("join")}
                  className="inline-flex items-center gap-1.5 rounded px-2.5 py-1 font-semibold text-gold-300 hover:bg-navy-800 transition-colors"
                >
                  <UserPlus className="h-3.5 w-3.5" aria-hidden /> Join Now
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div
        className={cn(
          "bg-white border-b transition-shadow",
          scrolled ? "shadow-md border-navy-100" : "border-border"
        )}
      >
        <div className="container-repn flex items-center justify-between gap-4 py-3">
          {/* Logo */}
          <button
            onClick={() => go("home")}
            className="flex items-center gap-3 text-left"
            aria-label="REPN home"
          >
            <span className="grid h-11 w-11 place-items-center rounded-sm bg-navy-900 text-white font-heading font-bold text-[15px] tracking-wide border-2 border-gold-500 shrink-0">
              REPN
            </span>
            <span className="hidden sm:block leading-none">
              <span className="block font-heading text-[17px] font-bold uppercase tracking-wide text-navy-900">
                Real Estate Professionals
              </span>
              <span className="block font-heading text-[13px] font-semibold uppercase tracking-[0.35em] text-gold-600 mt-0.5">
                Network · Est. 2004
              </span>
            </span>
          </button>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Primary">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.route}
                onClick={() => go(item.route)}
                aria-current={isActive(item.route) ? "page" : undefined}
                className={cn(
                  "relative px-3 py-2 font-heading text-[16px] font-semibold uppercase tracking-wide transition-colors rounded-sm",
                  isActive(item.route)
                    ? "text-navy-900"
                    : "text-steel-500 hover:text-navy-900 hover:bg-navy-50"
                )}
              >
                {item.label}
                <span
                  className={cn(
                    "absolute inset-x-3 -bottom-[13px] h-[3px] bg-gold-500 transition-opacity",
                    isActive(item.route) ? "opacity-100" : "opacity-0"
                  )}
                />
              </button>
            ))}
            <button
              aria-label="Search (demo)"
              onClick={() => go("directory")}
              className="ml-1 grid h-9 w-9 place-items-center rounded-sm text-steel-500 hover:bg-navy-50 hover:text-navy-900 transition-colors"
            >
              <Search className="h-4.5 w-4.5" aria-hidden />
            </button>
            {session ? (
              <Button
                onClick={() => go("dashboard")}
                className="ml-3 bg-navy-900 hover:bg-navy-800 text-white font-heading uppercase tracking-wide text-[15px] px-5 h-10"
              >
                <LayoutDashboard className="h-4 w-4 mr-1.5" aria-hidden />
                Dashboard
              </Button>
            ) : (
              <>
                <Button
                  onClick={() => go("login")}
                  variant="outline"
                  className="ml-3 border-navy-900 text-navy-900 hover:bg-navy-50 font-heading uppercase tracking-wide text-[15px] px-4 h-10"
                >
                  Login
                </Button>
                <Button
                  onClick={() => go("join")}
                  className="bg-gold-500 hover:bg-gold-600 text-navy-950 font-heading uppercase tracking-wide text-[15px] px-5 h-10"
                >
                  Join REPN
                </Button>
              </>
            )}
          </nav>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden grid h-10 w-10 place-items-center rounded-sm border border-border text-navy-900"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <nav className="lg:hidden border-t border-border bg-white" aria-label="Mobile">
            <div className="container-repn py-3 flex flex-col">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.route}
                  onClick={() => navTo(item.route)}
                  className={cn(
                    "text-left py-3 px-2 font-heading text-[18px] font-semibold uppercase tracking-wide border-b border-navy-50",
                    isActive(item.route) ? "text-gold-600" : "text-navy-900"
                  )}
                >
                  {item.label}
                </button>
              ))}
              <div className="flex gap-3 pt-4 pb-2">
                {session ? (
                  <Button
                    onClick={() => navTo("dashboard")}
                    className="flex-1 bg-navy-900 hover:bg-navy-800 text-white font-heading uppercase tracking-wide h-11"
                  >
                    <LayoutDashboard className="h-4 w-4 mr-1.5" aria-hidden /> Dashboard
                  </Button>
                ) : (
                  <>
                    <Button
                      onClick={() => navTo("login")}
                      variant="outline"
                      className="flex-1 border-navy-900 text-navy-900 font-heading uppercase tracking-wide h-11"
                    >
                      Member Login
                    </Button>
                    <Button
                      onClick={() => go("join")}
                      className="flex-1 bg-gold-500 hover:bg-gold-600 text-navy-950 font-heading uppercase tracking-wide h-11"
                    >
                      Join REPN
                    </Button>
                  </>
                )}
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
