"use client";

/**
 * Lightweight hash router — routes live in the URL hash so the demo works
 * in any sandbox preview (single / route) and deploys to Vercel as-is.
 */

import { useCallback, useSyncExternalStore } from "react";

export const ROUTES = [
  "home",
  "membership",
  "directory",
  "events",
  "resources",
  "news",
  "login",
  "join",
  "dashboard",
] as const;

export type Route = (typeof ROUTES)[number];

function parseHash(): Route {
  const h = window.location.hash.replace(/^#\/?/, "").split("?")[0];
  if ((ROUTES as readonly string[]).includes(h)) return h as Route;
  return "home";
}

function subscribe(onChange: () => void) {
  window.addEventListener("hashchange", onChange);
  return () => window.removeEventListener("hashchange", onChange);
}

/**
 * SSR-safe hash routing via useSyncExternalStore:
 * - SSR and the hydration pass both render the server snapshot ("home"),
 *   so deep-linked routes can never mismatch the server HTML;
 * - React then immediately re-renders with the real client hash.
 */
export function useHashRoute(): [Route, (r: Route) => void] {
  const route = useSyncExternalStore(subscribe, parseHash, () => "home" as Route);

  const navigate = useCallback((r: Route) => {
    if (parseHash() === r) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    window.location.hash = "#/" + (r === "home" ? "" : r);
  }, []);

  return [route, navigate];
}

export function go(r: Route) {
  window.location.hash = "#/" + (r === "home" ? "" : r);
}
