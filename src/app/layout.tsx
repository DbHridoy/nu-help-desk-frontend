import type { Metadata } from "next";
import { Manrope, Playfair_Display } from "next/font/google";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nu-student-help.example"),
  title: {
    default: "NU Student Help Website",
    template: "%s | NU Student Help Website",
  },
  description:
    "A public student-first portal for National University notices, routines, syllabus, previous year questions, and study resources.",
  openGraph: {
    title: "NU Student Help Website",
    description:
      "Find NU notices, routines, syllabus, questions, and notes in one place.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${playfair.variable} h-full scroll-smooth`}
    >
      <body className="min-h-full bg-[var(--color-canvas)] text-slate-900 antialiased">
        <div className="relative flex min-h-screen flex-col overflow-x-clip">
          <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[28rem] bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.18),_transparent_52%),linear-gradient(180deg,_rgba(255,255,255,0.96),_rgba(244,247,251,1))]" />
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
