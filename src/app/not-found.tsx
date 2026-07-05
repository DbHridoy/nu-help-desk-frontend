import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container-shell py-20">
      <div className="surface-card rounded-[2rem] p-10 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">Not found</p>
        <h1 className="mt-4 font-display text-4xl font-semibold text-slate-900">
          The page or resource could not be found.
        </h1>
        <p className="mt-4 text-sm leading-7 text-slate-600">
          Try the main search, or go back to the sections for notices, routines, syllabus,
          questions, and notes.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white"
        >
          Back to home
        </Link>
      </div>
    </section>
  );
}
