import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white/90">
      <div className="container-shell grid gap-8 py-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-sky-700">
            NU Student Help Website
          </p>
          <p className="max-w-md text-sm leading-7 text-slate-600">
            A public-first MVP to help National University students find notices, routines,
            syllabus, questions, and notes without login friction.
          </p>
        </div>
        <div className="space-y-3 text-sm text-slate-600">
          <p className="font-semibold text-slate-900">Explore</p>
          <Link href="/notices">Notices</Link>
          <Link href="/routines">Routines</Link>
          <Link href="/syllabus">Syllabus</Link>
          <Link href="/questions">Questions</Link>
          <Link href="/notes">Notes</Link>
        </div>
        <div className="space-y-3 text-sm text-slate-600">
          <p className="font-semibold text-slate-900">Info</p>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/search?q=honours">Search</Link>
          <Link href="/request-resource">Request Resource</Link>
        </div>
      </div>
    </footer>
  );
}
