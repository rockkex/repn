"use client";

/**
 * Lightweight hash router — routes live in the URL hash so the demo works
 * in any sandbox preview (single / route) and deploys to Vercel as-is.
 */

import { useCallback, useEffect, useState } from "react";

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

export function useHashRoute(): [Route, (r: Route) => void] {
  // Lazy initializer reads the hash once; the effect only subscribes to changes.
  const [route, setRoute] = useState<Route>(() =>
    typeof window === "undefined" ? "home" : parseHash()
  );

  useEffect(() => {
    const onChange = () => {
      setRoute(parseHash());
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    };
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);

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
