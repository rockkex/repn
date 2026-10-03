"use client";

/**
 * REPN demo authentication — a tiny external store (useSyncExternalStore)
 * backed by localStorage. Deliberately dependency-free so the demo deploys
 * to Vercel with zero config.
 */

import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
} from "react";
import { DEMO_ACCOUNTS, MEMBERS, TIER_PLAN, type Tier } from "./data";

export interface PaymentRecord {
  id: string;
  dateISO: string;
  description: string;
  amount: number;
  method: string;
}

export interface Session {
  memberId: string;
  name: string;
  email: string;
  tier: Tier;
  brokerage: string;
  title: string;
  specialty: string;
  city: string;
  state: string;
  phone: string;
  joinedDate: string;
  duesStatus: "paid" | "due";
  duesAmount: number;
  duesPaidUntil?: string;
  registrations: string[];
  payments: PaymentRecord[];
}

const STORAGE_KEY = "repn_session_v1";
const MEMBERS_KEY = "repn_members_v1";

/* ------------------------- module-level mini store ------------------------- */

let currentSession: Session | null = null;
let hydrated = false;
const listeners = new Set<() => void>();

function hydrate() {
  if (hydrated || typeof window === "undefined") return;
  hydrated = true;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    currentSession = raw ? (JSON.parse(raw) as Session) : null;
  } catch {
    currentSession = null;
  }
}

function getSnapshot(): Session | null {
  hydrate();
  return currentSession;
}

function getServerSnapshot(): Session | null {
  return null;
}

function subscribe(cb: () => void): () => void {
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
}

function setStore(next: Session | null) {
  currentSession = next;
  try {
    if (next) localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    else localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* storage unavailable — session lives in memory only */
  }
  listeners.forEach((l) => l());
}

function readJoinedMembers(): Array<{ password: string; session: Session }> {
  try {
    const raw = localStorage.getItem(MEMBERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function seedFromMember(memberId: string): Session | null {
  const demo = DEMO_ACCOUNTS.find((a) => a.memberId === memberId);
  if (!demo) return null;
  const m = MEMBERS.find((x) => x.id === demo.memberId);
  if (!m) return null;
  const paidThrough = new Date();
  paidThrough.setFullYear(paidThrough.getFullYear() + 1);
  return {
    memberId: m.id,
    name: m.name,
    email: demo.email,
    tier: m.tier,
    brokerage: m.brokerage,
    title: m.title,
    specialty: m.specialty,
    city: m.city,
    state: m.state,
    phone: m.phone,
    joinedDate: `March 14, ${2021 + (parseInt(m.id.slice(-1), 10) % 4)}`,
    duesStatus: demo.duesStatus,
    duesAmount: TIER_PLAN[m.tier].price,
    duesPaidUntil:
      demo.duesStatus === "paid"
        ? paidThrough.toLocaleDateString("en-US", { month: "long", year: "numeric" })
        : undefined,
    registrations:
      demo.duesStatus === "paid" ? ["e-101", "e-104"] : ["e-102"],
    payments:
      demo.duesStatus === "paid"
        ? [
            {
              id: "RCP-88213",
              dateISO: new Date(new Date().setDate(new Date().getDate() - 200))
                .toISOString()
                .slice(0, 10),
              description: `Annual membership dues — ${TIER_PLAN[m.tier].name} tier`,
              amount: TIER_PLAN[m.tier].price,
              method: "Visa ending 4242",
            },
          ]
        : [],
  };
}

/* -------------------------------- context --------------------------------- */

interface AuthContextValue {
  session: Session | null;
  login: (email: string, password: string) => { ok: boolean; error?: string };
  logout: () => void;
  registerForEvent: (eventId: string) => void;
  cancelRegistration: (eventId: string) => void;
  recordPayment: (p: PaymentRecord) => void;
  updateProfile: (patch: Partial<Session>) => void;
  createAccount: (input: {
    name: string;
    email: string;
    password: string;
    tier: Tier;
    brokerage: string;
    title: string;
    specialty: string;
    city: string;
    state: string;
    phone: string;
    payment: PaymentRecord;
  }) => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const session = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const login = useCallback((email: string, password: string) => {
    const e = email.trim().toLowerCase();
    const demo = DEMO_ACCOUNTS.find((a) => a.email === e);
    if (demo && password === demo.password) {
      const seeded = seedFromMember(demo.memberId);
      if (seeded) {
        setStore(seeded);
        return { ok: true };
      }
    }
    const joined = readJoinedMembers().find(
      (m) => m.session.email.toLowerCase() === e
    );
    if (joined && password === joined.password) {
      setStore(joined.session);
      return { ok: true };
    }
    return {
      ok: false,
      error:
        "No account matches that email and password. Try a demo login below.",
    };
  }, []);

  const logout = useCallback(() => setStore(null), []);

  const registerForEvent = useCallback((eventId: string) => {
    const s = getSnapshot();
    if (!s) return;
    setStore({ ...s, registrations: [...s.registrations, eventId] });
  }, []);

  const cancelRegistration = useCallback((eventId: string) => {
    const s = getSnapshot();
    if (!s) return;
    setStore({
      ...s,
      registrations: s.registrations.filter((r) => r !== eventId),
    });
  }, []);

  const recordPayment = useCallback((p: PaymentRecord) => {
    const s = getSnapshot();
    if (!s) return;
    const until = new Date();
    until.setFullYear(until.getFullYear() + 1);
    setStore({
      ...s,
      duesStatus: "paid",
      duesPaidUntil: until.toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      }),
      payments: [p, ...s.payments],
    });
  }, []);

  const updateProfile = useCallback((patch: Partial<Session>) => {
    const s = getSnapshot();
    if (!s) return;
    setStore({ ...s, ...patch });
  }, []);

  const createAccount = useCallback<AuthContextValue["createAccount"]>(
    (input) => {
      const memberId = "j-" + Math.random().toString(36).slice(2, 8);
      const newSession: Session = {
        memberId,
        name: input.name,
        email: input.email,
        tier: input.tier,
        brokerage: input.brokerage,
        title: input.title,
        specialty: input.specialty,
        city: input.city,
        state: input.state,
        phone: input.phone,
        joinedDate: new Date().toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        }),
        duesStatus: "paid",
        duesAmount: TIER_PLAN[input.tier].price,
        duesPaidUntil: new Date(
          new Date().setFullYear(new Date().getFullYear() + 1)
        ).toLocaleDateString("en-US", { month: "long", year: "numeric" }),
        registrations: [],
        payments: [input.payment],
      };
      try {
        const list = readJoinedMembers();
        list.push({ password: input.password, session: newSession });
        localStorage.setItem(MEMBERS_KEY, JSON.stringify(list));
      } catch {
        /* ignore */
      }
      setStore(newSession);
    },
    []
  );

  const value = useMemo(
    () => ({
      session,
      login,
      logout,
      registerForEvent,
      cancelRegistration,
      recordPayment,
      updateProfile,
      createAccount,
    }),
    [
      session,
      login,
      logout,
      registerForEvent,
      cancelRegistration,
      recordPayment,
      updateProfile,
      createAccount,
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
