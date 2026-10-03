import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Real Estate Professionals Network | REPN",
  description:
    "The Real Estate Professionals Network (REPN) is a national membership association advancing the business of real estate through advocacy, education, networking, and member resources. Join 2,400+ professionals nationwide.",
  keywords: [
    "real estate association",
    "REPN",
    "real estate professionals",
    "membership organization",
    "realtor network",
  ],
  authors: [{ name: "Real Estate Professionals Network" }],
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "Real Estate Professionals Network | REPN",
    description:
      "Advancing the business of real estate since 2004. Advocacy, education, networking, and member resources.",
    siteName: "REPN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className="antialiased bg-background text-foreground">
        {children}
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
