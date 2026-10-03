"use client";

import { useEffect } from "react";
import { AuthProvider, useAuth } from "@/lib/auth";
import { useHashRoute } from "@/lib/router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { HomeView } from "@/components/views/home-view";
import { MembershipView } from "@/components/views/membership-view";
import { DirectoryView } from "@/components/views/directory-view";
import { EventsView } from "@/components/views/events-view";
import { ResourcesView } from "@/components/views/resources-view";
import { NewsView } from "@/components/views/news-view";
import { LoginView } from "@/components/views/login-view";
import { JoinView } from "@/components/views/join-view";
import { DashboardView } from "@/components/views/dashboard-view";

function SiteBody() {
  const route = useHashRoute()[0];
  const { session } = useAuth();

  // Gate the dashboard: unauthenticated visitors get the login portal.
  const gated = route === "dashboard" && !session;

  useEffect(() => {
    if (route === "dashboard" && !session) {
      // replace hash silently so the URL reflects the login screen
      if (window.location.hash !== "#/login") {
        window.history.replaceState(null, "", "#/login");
      }
    }
  }, [route, session]);

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader route={gated ? "login" : route} />
      <main id="main" className="flex-1">
        {gated ? (
          <LoginView notice="Please log in to access the member dashboard — your session is required for gated content." />
        ) : (
          <>
            {route === "home" && <HomeView />}
            {route === "membership" && <MembershipView />}
            {route === "directory" && <DirectoryView />}
            {route === "events" && <EventsView />}
            {route === "resources" && <ResourcesView />}
            {route === "news" && <NewsView />}
            {route === "login" && <LoginView />}
            {route === "join" && <JoinView />}
            {route === "dashboard" && <DashboardView />}
          </>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}

export default function Page() {
  return (
    <AuthProvider>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:bg-navy-900 focus:text-white focus:px-4 focus:py-2"
      >
        Skip to main content
      </a>
      <SiteBody />
    </AuthProvider>
  );
}
