"use client";

import { useMemo, useState } from "react";
import {
  BookOpenCheck,
  Download,
  FileText,
  FolderOpen,
  Lock,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { SectionHeading, LockedBadge } from "@/components/shared";
import { RESOURCES, RESOURCE_CATEGORIES, type Resource } from "@/lib/data";
import { useAuth } from "@/lib/auth";
import { go } from "@/lib/router";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export function ResourcesView() {
  const { session } = useAuth();
  const [tab, setTab] = useState<string>("All");
  const [preview, setPreview] = useState<Resource | null>(null);
  const authed = !!session;

  const list = useMemo(
    () => (tab === "All" ? RESOURCES : RESOURCES.filter((r) => r.category === tab)),
    [tab]
  );

  const openPreview = (r: Resource) => {
    if (!authed) {
      toast.error("The Resource Library is a members-only benefit.", {
        description: "Join REPN or log in to download reports, guides, and templates.",
        action: { label: "Log in", onClick: () => go("login") },
      });
      return;
    }
    setPreview(r);
  };

  return (
    <div>
      {/* Page hero band */}
      <section className="bg-navy-900 py-14 md:py-16">
        <div className="container-repn">
          <SectionHeading
            dark
            eyebrow="Members-Only Library"
            title="Reports, Guides, Templates & Kits"
            intro="The tools our members use every week: market reports, attorney-reviewed compliance guides, and practice-building templates — all included with Professional and Premium membership."
          />
        </div>
      </section>

      {/* Category tabs */}
      <section className="border-b border-border bg-muted py-5">
        <div className="container-repn flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <Tabs value={tab} onValueChange={setTab}>
            <TabsList className="bg-white border border-border h-11 flex-wrap">
              <TabsTrigger
                value="All"
                className="font-heading uppercase tracking-wide text-sm data-[state=active]:bg-navy-900 data-[state=active]:text-white px-4"
              >
                <FolderOpen className="h-4 w-4 mr-1.5" aria-hidden />
                All Resources
              </TabsTrigger>
              {RESOURCE_CATEGORIES.map((c) => (
                <TabsTrigger
                  key={c}
                  value={c}
                  className="font-heading uppercase tracking-wide text-sm data-[state=active]:bg-navy-900 data-[state=active]:text-white px-4"
                >
                  {c}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
          {!authed && (
            <span className="flex items-center gap-1.5 text-sm text-navy-800 font-medium">
              <Lock className="h-4 w-4 text-gold-600" aria-hidden />
              10 of 10 documents are members-only
            </span>
          )}
        </div>
      </section>

      {/* Grid */}
      <section className="bg-white py-12">
        <div className="container-repn">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((r) => {
              const locked = !authed;
              return (
                <article
                  key={r.id}
                  className={cn(
                    "relative flex flex-col border bg-white transition-all",
                    locked
                      ? "border-border"
                      : "border-border hover:shadow-md hover:border-navy-200"
                  )}
                >
                  {r.featured && authed && (
                    <span className="absolute top-3 right-3 z-10">
                      <Star className="h-5 w-5 text-gold-500 fill-gold-500" aria-label="Featured" />
                    </span>
                  )}
                  {/* Doc cover */}
                  <div className="relative h-36 bg-navy-900 overflow-hidden">
                    <div
                      className="absolute inset-0 opacity-[0.12]"
                      style={{
                        backgroundImage:
                          "repeating-linear-gradient(45deg, #c19a3d 0 2px, transparent 2px 14px)",
                      }}
                      aria-hidden
                    />
                    <div className="absolute inset-0 flex items-center justify-between px-6">
                      <div>
                        <div className="font-heading text-3xl font-bold text-white/95 leading-none">
                          REPN
                        </div>
                        <div className="mt-1.5 text-[10px] font-semibold uppercase tracking-[0.25em] text-gold-400">
                          Member Library
                        </div>
                      </div>
                      <FileText className="h-10 w-10 text-gold-500/80" aria-hidden />
                    </div>
                    <div className="absolute bottom-0 inset-x-0 bg-gold-500 px-6 py-1">
                      <span className="font-heading text-[12px] font-bold uppercase tracking-[0.2em] text-navy-950">
                        {r.format} · {r.meta}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-5">
                    <div className="text-[12px] font-semibold uppercase tracking-[0.14em] text-gold-700">
                      {r.category}
                    </div>
                    <h3 className="heading-caps text-[21px] leading-tight text-navy-900 mt-1">
                      {r.title}
                    </h3>
                    <p
                      className={cn(
                        "mt-2 text-sm leading-relaxed text-muted-foreground",
                        locked && "blur-[2.5px] select-none"
                      )}
                    >
                      {r.description}
                    </p>
                    <div className="mt-3 text-[12px] text-muted-foreground">
                      Updated {r.updated}
                    </div>
                    <div className="mt-auto pt-4">
                      <Button
                        onClick={() => openPreview(r)}
                        className={cn(
                          "w-full h-10 font-heading uppercase tracking-widest text-[14px]",
                          locked
                            ? "bg-navy-100 text-steel-500 hover:bg-navy-100"
                            : "bg-navy-900 hover:bg-navy-800 text-white"
                        )}
                      >
                        {locked ? (
                          <>
                            <Lock className="h-3.5 w-3.5 mr-1.5 text-gold-600" aria-hidden />
                            Members Only
                          </>
                        ) : (
                          <>
                            <BookOpenCheck className="h-4 w-4 mr-1.5" aria-hidden />
                            Open Resource
                          </>
                        )}
                      </Button>
                    </div>
                    {locked && (
                      <div className="mt-3 text-center">
                        <LockedBadge />
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>

          {/* Join nudge for guests */}
          {!authed && (
            <div className="mt-12 rounded-sm border-2 border-gold-500 bg-navy-50 p-8 text-center">
              <h3 className="heading-caps text-2xl text-navy-900">
                Unlock the full library with membership
              </h3>
              <p className="mt-2 max-w-xl mx-auto text-[15px] text-muted-foreground">
                Professional and Premium members get unlimited downloads of every
                report, template, and kit — plus quarterly additions from the REPN
                research and legal teams.
              </p>
              <div className="mt-5 flex flex-wrap justify-center gap-3">
                <Button
                  onClick={() => go("join")}
                  className="bg-gold-500 hover:bg-gold-600 text-navy-950 font-heading uppercase tracking-widest h-11 px-7"
                >
                  Join REPN
                </Button>
                <Button
                  onClick={() => go("login")}
                  variant="outline"
                  className="border-navy-900 text-navy-900 hover:bg-navy-900 hover:text-white font-heading uppercase tracking-widest h-11 px-7"
                >
                  Member Login
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Preview dialog */}
      <Dialog open={!!preview} onOpenChange={(v) => !v && setPreview(null)}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="heading-caps text-2xl text-navy-900 pr-6">
              {preview?.title}
            </DialogTitle>
            <DialogDescription>
              {preview?.format} · {preview?.meta} · Updated {preview?.updated}
            </DialogDescription>
          </DialogHeader>
          <p className="text-[15px] leading-relaxed text-muted-foreground">
            {preview?.description}
          </p>
          <div className="rounded-sm border border-border bg-muted p-4 text-sm text-muted-foreground">
            <strong className="text-navy-900">What&apos;s inside:</strong> curated
            chapters, ready-to-use worksheets, and member-only data you will not
            find anywhere else. Sample pages are available in this demo.
          </div>
          <a
            href={preview?.file}
            download
            onClick={() => {
              toast.success("Document download started — thank you for your membership!");
              setPreview(null);
            }}
            className="inline-flex h-11 w-full items-center justify-center gap-2 bg-gold-500 hover:bg-gold-600 text-navy-950 font-heading uppercase tracking-widest text-[15px] font-semibold rounded-sm transition-colors cursor-pointer"
          >
            <Download className="h-4 w-4" aria-hidden />
            Download Now
          </a>
        </DialogContent>
      </Dialog>
    </div>
  );
}
