"use client";

import Image from "next/image";
import { useState } from "react";
import {
  CalendarDays,
  CheckCircle2,
  Clock,
  MapPin,
  PlayCircle,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { DateBlock, SectionHeading } from "@/components/shared";
import { PAST_EVENTS, UPCOMING_EVENTS, type EventItem, formatDate } from "@/lib/data";
import { useAuth } from "@/lib/auth";
import { go } from "@/lib/router";
import { toast } from "sonner";

function RegistrationDialog({
  event,
  open,
  onClose,
}: {
  event: EventItem | null;
  open: boolean;
  onClose: () => void;
}) {
  const { session, registerForEvent } = useAuth();
  if (!event) return null;
  const isFree = event.price.toLowerCase().includes("free");

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="heading-caps text-2xl text-navy-900">
            {isFree ? "Confirm Registration" : "Reserve Your Seat"}
          </DialogTitle>
          <DialogDescription>{event.title}</DialogDescription>
        </DialogHeader>
        <div className="space-y-2.5 rounded-sm border border-border bg-muted p-4 text-sm">
          <div className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-gold-600" aria-hidden />
            {formatDate(event.dateISO, { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-gold-600" aria-hidden />
            {event.time}
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-gold-600" aria-hidden />
            {event.location}
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-gold-600" aria-hidden />
            {event.capacity} · {event.price}
          </div>
        </div>
        <p className="text-[13px] text-muted-foreground">
          {isFree
            ? "Free for active members. Cancel anytime from your dashboard."
            : isFree
              ? ""
              : "This demo skips the event payment step — in production your card on file would be charged the member rate."}
        </p>
        <Button
          onClick={() => {
            if (session) registerForEvent(event.id);
            toast.success(`You're registered for ${event.title}. See the confirmation in your dashboard.`);
            onClose();
          }}
          className="w-full h-11 bg-gold-500 hover:bg-gold-600 text-navy-950 font-heading uppercase tracking-widest"
        >
          Confirm My Registration
        </Button>
      </DialogContent>
    </Dialog>
  );
}

function RecordingDialog({
  recording,
  open,
  onClose,
}: {
  recording: (typeof PAST_EVENTS)[number] | null;
  open: boolean;
  onClose: () => void;
}) {
  if (!recording) return null;
  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="heading-caps text-2xl text-navy-900">
            {recording.title}
          </DialogTitle>
          <DialogDescription>
            Recorded {formatDate(recording.dateISO)} · {recording.duration} · Presented
            by {recording.presenter}
          </DialogDescription>
        </DialogHeader>
        {/* Demo player chrome */}
        <div className="relative aspect-video rounded-sm overflow-hidden bg-navy-950">
          <Image
            src={recording.image}
            alt={recording.title}
            fill
            sizes="(max-width: 768px) 100vw, 640px"
            className="object-cover opacity-40"
          />
          <div className="absolute inset-0 grid place-items-center">
            <div className="text-center">
              <PlayCircle className="h-16 w-16 text-gold-400 mx-auto" aria-hidden />
              <p className="mt-3 text-navy-100 text-sm max-w-sm px-4">
                Video playback is not included in this portfolio demo — the full
                recording would stream here from the member archive.
              </p>
            </div>
          </div>
          <div className="absolute bottom-0 inset-x-0 bg-navy-950/90 px-4 py-2 flex items-center gap-3">
            <div className="h-1 flex-1 rounded-full bg-navy-700 overflow-hidden">
              <div className="h-full w-1/3 bg-gold-500" />
            </div>
            <span className="text-[11px] text-navy-200 font-medium">19:24 / {recording.duration}</span>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">{recording.description}</p>
      </DialogContent>
    </Dialog>
  );
}

export function EventsView() {
  const { session } = useAuth();
  const [regEvent, setRegEvent] = useState<EventItem | null>(null);
  const [regOpen, setRegOpen] = useState(false);
  const [recording, setRecording] = useState<(typeof PAST_EVENTS)[number] | null>(null);
  const [recOpen, setRecOpen] = useState(false);

  const openRegistration = (e: EventItem) => {
    if (!session) {
      toast.error("Event registration is a member benefit.", {
        description: "Log in or join REPN to reserve your seat.",
        action: { label: "Log in", onClick: () => go("login") },
      });
      return;
    }
    setRegEvent(e);
    setRegOpen(true);
  };

  const openRecording = (r: (typeof PAST_EVENTS)[number]) => {
    if (!session) {
      toast.error("The recording archive is members-only.", {
        description: "Log in to watch past webinars and conference sessions.",
        action: { label: "Log in", onClick: () => go("login") },
      });
      return;
    }
    setRecording(r);
    setRecOpen(true);
  };

  return (
    <div>
      {/* Page hero band */}
      <section className="bg-navy-900 py-14 md:py-16">
        <div className="container-repn">
          <SectionHeading
            dark
            eyebrow="Learning & Community Calendar"
            title="Events, Webinars & Recordings"
            intro="40+ sessions a year — conferences, chapter mixers, advocacy days, and free monthly webinars. Members register in one click and can revisit every recording."
          />
        </div>
      </section>

      {/* Upcoming */}
      <section className="bg-white py-14">
        <div className="container-repn">
          <div className="flex items-center gap-3">
            <CalendarDays className="h-6 w-6 text-gold-600" aria-hidden />
            <h2 className="heading-caps text-3xl text-navy-900">Upcoming Events</h2>
          </div>

          <div className="mt-8 space-y-5">
            {UPCOMING_EVENTS.map((e) => {
              const registered = session?.registrations.includes(e.id);
              return (
                <article
                  key={e.id}
                  className="grid gap-0 border border-border bg-white hover:shadow-md transition-shadow md:grid-cols-[220px_1fr] overflow-hidden"
                >
                  <div className="relative h-44 md:h-full min-h-[176px]">
                    {e.image ? (
                      <Image
                        src={e.image}
                        alt={e.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 220px"
                        className="object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-navy-900 grid place-items-center">
                        <CalendarDays className="h-10 w-10 text-gold-500" aria-hidden />
                      </div>
                    )}
                    <Badge className="absolute top-3 left-3 bg-gold-500 text-navy-950 hover:bg-gold-500 uppercase font-heading tracking-widest text-[11px]">
                      {e.type}
                    </Badge>
                  </div>
                  <div className="p-5 md:p-6 flex flex-col">
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                      <div className="flex items-center gap-2 text-sm font-semibold text-navy-900">
                        <CalendarDays className="h-4 w-4 text-gold-600" aria-hidden />
                        {formatDate(e.dateISO, { weekday: "short", month: "long", day: "numeric", year: "numeric" })}
                      </div>
                      <span className="text-sm text-muted-foreground">{e.time}</span>
                    </div>
                    <h3 className="heading-caps text-2xl text-navy-900 mt-1.5 leading-tight">
                      {e.title}
                    </h3>
                    <p className="text-sm text-muted-foreground flex items-center gap-1.5 mt-1">
                      <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden />
                      {e.location}
                    </p>
                    <p className="mt-2.5 text-[15px] leading-relaxed text-foreground/85">
                      {e.description}
                    </p>
                    <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-navy-50 pt-4">
                      <div className="text-[13px] text-muted-foreground">
                        <strong className="text-navy-900">{e.capacity}</strong> · {e.price}
                      </div>
                      {registered ? (
                        <div className="flex items-center gap-3">
                          <span className="flex items-center gap-1.5 text-sm font-semibold text-green-700">
                            <CheckCircle2 className="h-4 w-4" aria-hidden /> Registered
                          </span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => go("dashboard")}
                            className="border-navy-900 text-navy-900 hover:bg-navy-900 hover:text-white h-9 font-heading uppercase tracking-wide text-[13px]"
                          >
                            Manage in Dashboard
                          </Button>
                        </div>
                      ) : (
                        <Button
                          onClick={() => openRegistration(e)}
                          className="bg-navy-900 hover:bg-navy-800 text-white font-heading uppercase tracking-widest h-10 px-6"
                        >
                          {session ? "Register Now" : "Members Register Here"}
                        </Button>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Past recordings */}
      <section className="bg-muted py-14">
        <div className="container-repn">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <PlayCircle className="h-6 w-6 text-gold-600" aria-hidden />
              <h2 className="heading-caps text-3xl text-navy-900">
                Past Webinars & Recordings
              </h2>
            </div>
            {!session && (
              <span className="flex items-center gap-1.5 text-sm text-navy-800 font-medium">
                <PlayCircle className="h-4 w-4 text-gold-600" aria-hidden />
                Members watch free —{" "}
                <button
                  onClick={() => go("login")}
                  className="underline underline-offset-2 font-semibold text-gold-700 hover:text-gold-600"
                >
                  log in
                </button>
              </span>
            )}
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PAST_EVENTS.map((r) => (
              <article
                key={r.id}
                className="group flex flex-col border border-border bg-white hover:shadow-md transition-all"
              >
                <div className="relative h-36 overflow-hidden">
                  <Image
                    src={r.image}
                    alt={r.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div
                    className={`absolute inset-0 grid place-items-center ${
                      session ? "bg-navy-950/20" : "bg-navy-950/50"
                    }`}
                  >
                    <PlayCircle
                      className={`h-10 w-10 ${
                        session ? "text-white/90" : "text-gold-400/90"
                      }`}
                      aria-hidden
                    />
                  </div>
                  <span className="absolute bottom-2 right-2 bg-navy-950/90 text-gold-300 text-[11px] font-semibold px-2 py-0.5">
                    {r.duration}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <div className="font-heading text-[12px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                    {formatDate(r.dateISO)}
                  </div>
                  <h3 className="heading-caps text-[19px] leading-tight text-navy-900 mt-1">
                    {r.title}
                  </h3>
                  <p className="text-[13px] text-muted-foreground mt-1">
                    {r.presenter}
                  </p>
                  <Button
                    onClick={() => openRecording(r)}
                    size="sm"
                    variant={session ? "default" : "outline"}
                    className={`mt-4 h-9 font-heading uppercase tracking-widest text-[13px] ${
                      session
                        ? "bg-navy-900 hover:bg-navy-800 text-white"
                        : "border-navy-300 text-steel-500 hover:bg-navy-50"
                    }`}
                  >
                    {session ? "Watch Recording" : "Members Only"}
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <RegistrationDialog event={regEvent} open={regOpen} onClose={() => setRegOpen(false)} />
      <RecordingDialog recording={recording} open={recOpen} onClose={() => setRecOpen(false)} />
    </div>
  );
}
