"use client";

/**
 * Demo payment modal — validates a card form, simulates processing,
 * and returns a PaymentRecord. No real charge; clearly labeled as demo.
 */

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle2, CreditCard, Loader2, Lock, ShieldCheck } from "lucide-react";
import { formatMoney, type Tier } from "@/lib/data";
import type { PaymentRecord } from "@/lib/auth";
import { toast } from "sonner";

interface Props {
  open: boolean;
  onClose: () => void;
  amount: number;
  description: string;
  tier?: Tier;
  onSuccess: (p: PaymentRecord) => void;
}

function luhnValid(num: string) {
  const digits = num.replace(/\D/g, "");
  if (digits.length < 13) return false;
  let sum = 0;
  let alt = false;
  for (let i = digits.length - 1; i >= 0; i--) {
    let d = parseInt(digits[i], 10);
    if (alt) {
      d *= 2;
      if (d > 9) d -= 9;
    }
    sum += d;
    alt = !alt;
  }
  return sum % 10 === 0;
}

function cardBrand(num: string) {
  const d = num.replace(/\D/g, "");
  if (/^4/.test(d)) return "Visa";
  if (/^5[1-5]/.test(d)) return "Mastercard";
  if (/^3[47]/.test(d)) return "Amex";
  if (/^6/.test(d)) return "Discover";
  return "Card";
}

export function PaymentModal({ open, onClose, amount, description, onSuccess }: Props) {
  const [name, setName] = useState("");
  const [card, setCard] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [zip, setZip] = useState("");
  const [processing, setProcessing] = useState(false);
  const [done, setDone] = useState<PaymentRecord | null>(null);

  const resetFields = () => {
    setName("");
    setCard("");
    setExpiry("");
    setCvc("");
    setZip("");
    setProcessing(false);
    setDone(null);
  };

  const fmtCard = (v: string) =>
    v
      .replace(/\D/g, "")
      .slice(0, 16)
      .replace(/(\d{4})(?=\d)/g, "$1 ");

  const fmtExpiry = (v: string) => {
    const d = v.replace(/\D/g, "").slice(0, 4);
    if (d.length <= 2) return d;
    return d.slice(0, 2) + "/" + d.slice(2);
  };

  const expiryOk = () => {
    const m = /^(\d{2})\/(\d{2})$/.exec(expiry);
    if (!m) return false;
    const month = parseInt(m[1], 10);
    const year = 2000 + parseInt(m[2], 10);
    if (month < 1 || month > 12) return false;
    const now = new Date();
    return year > now.getFullYear() || (year === now.getFullYear() && month >= now.getMonth() + 1);
  };

  const errors = {
    name: name.trim().length < 3,
    card: !luhnValid(card),
    expiry: !expiryOk(),
    cvc: !/^\d{3,4}$/.test(cvc),
    zip: !/^\d{5}$/.test(zip),
  };
  const formValid = !Object.values(errors).some(Boolean);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formValid) {
      toast.error("Please check the highlighted card fields.");
      return;
    }
    setProcessing(true);
    setTimeout(() => {
      const record: PaymentRecord = {
        id: "RCP-" + Math.floor(10000 + Math.random() * 89999),
        dateISO: new Date().toISOString().slice(0, 10),
        description,
        amount,
        method: `${cardBrand(card)} ending ${card.replace(/\D/g, "").slice(-4)}`,
      };
      setProcessing(false);
      setDone(record);
    }, 1600);
  };

  const finish = () => {
    if (done) onSuccess(done);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        if (!v) {
          resetFields();
          onClose();
        }
      }}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="heading-caps text-2xl text-navy-900 flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-gold-600" aria-hidden />
            {done ? "Payment Confirmed" : "Secure Checkout"}
          </DialogTitle>
          <DialogDescription>
            {done ? "A receipt has been added to your account." : description}
          </DialogDescription>
        </DialogHeader>

        {done ? (
          <div className="text-center py-2">
            <CheckCircle2 className="h-14 w-14 text-green-600 mx-auto" aria-hidden />
            <div className="heading-caps text-3xl text-navy-900 mt-3">
              {formatMoney(done.amount)} Paid
            </div>
            <p className="text-sm text-muted-foreground mt-1">{done.description}</p>
            <div className="mt-4 rounded-sm border border-border bg-muted p-3 text-sm space-y-1 text-left">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Confirmation</span>
                <span className="font-bold">{done.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Method</span>
                <span className="font-medium">{done.method}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Date</span>
                <span className="font-medium">{done.dateISO}</span>
              </div>
            </div>
            <Button
              onClick={finish}
              className="mt-5 w-full h-11 bg-gold-500 hover:bg-gold-600 text-navy-950 font-heading uppercase tracking-widest"
            >
              Done
            </Button>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-3.5" noValidate>
            <div className="flex items-center justify-between rounded-sm bg-navy-900 text-white px-4 py-2.5">
              <span className="text-sm text-navy-100">Amount due today</span>
              <span className="heading-caps text-2xl text-gold-400">
                {formatMoney(amount)}
              </span>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="pm-name">Name on card</Label>
              <Input
                id="pm-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jordan Smith"
                aria-invalid={!!name && errors.name}
                className={name && errors.name ? "border-destructive" : ""}
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="pm-card">Card number</Label>
              <div className="relative">
                <Input
                  id="pm-card"
                  inputMode="numeric"
                  value={card}
                  onChange={(e) => setCard(fmtCard(e.target.value))}
                  placeholder="4242 4242 4242 4242"
                  aria-invalid={!!card && errors.card}
                  className={card && errors.card ? "border-destructive pr-16" : "pr-16"}
                />
                {card.length > 0 && (
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] font-bold uppercase tracking-wider text-gold-700">
                    {cardBrand(card)}
                  </span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="pm-exp">Expiry</Label>
                <Input
                  id="pm-exp"
                  inputMode="numeric"
                  value={expiry}
                  onChange={(e) => setExpiry(fmtExpiry(e.target.value))}
                  placeholder="MM/YY"
                  aria-invalid={!!expiry && errors.expiry}
                  className={expiry && errors.expiry ? "border-destructive" : ""}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="pm-cvc">CVC</Label>
                <Input
                  id="pm-cvc"
                  inputMode="numeric"
                  value={cvc}
                  onChange={(e) => setCvc(e.target.value.replace(/\D/g, "").slice(0, 4))}
                  placeholder="123"
                  aria-invalid={!!cvc && errors.cvc}
                  className={cvc && errors.cvc ? "border-destructive" : ""}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="pm-zip">Billing ZIP</Label>
                <Input
                  id="pm-zip"
                  inputMode="numeric"
                  value={zip}
                  onChange={(e) => setZip(e.target.value.replace(/\D/g, "").slice(0, 5))}
                  placeholder="20005"
                  aria-invalid={!!zip && errors.zip}
                  className={zip && errors.zip ? "border-destructive" : ""}
                />
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-[12px] text-muted-foreground pt-1">
              <ShieldCheck className="h-3.5 w-3.5 text-gold-600 shrink-0" aria-hidden />
              Demo checkout — no real payment is processed. Try 4242 4242 4242 4242.
            </div>

            <Button
              type="submit"
              disabled={processing}
              className="w-full h-12 bg-gold-500 hover:bg-gold-600 text-navy-950 font-heading uppercase tracking-widest text-[16px]"
            >
              {processing ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" aria-hidden />
                  Processing…
                </>
              ) : (
                <>
                  <Lock className="h-4 w-4 mr-2" aria-hidden />
                  Pay {formatMoney(amount)}
                </>
              )}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
