import { PageHero } from "@/components/common/page-hero";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "About",
  description: "Learn why NU Student Help Website exists and what the public MVP covers.",
});

export default function AboutPage() {
  return (
    <div className="pb-16">
      <PageHero
        eyebrow="About"
        title="One public place for the NU resources students usually search everywhere else for."
        description="NU Student Help Website is designed to help National University students quickly find notices, exam routines, syllabus files, previous year questions, and study notes without needing a student account."
      />

      <section className="container-shell grid gap-6 md:grid-cols-3">
        {[
          "Latest notices with category, date, verified labels, and source links.",
          "Routine, syllabus, question, and note pages with direct preview and download options.",
          "A simple request form so students can ask for missing resources publicly.",
        ].map((item) => (
          <div key={item} className="surface-card rounded-[2rem] p-6 text-sm leading-7 text-slate-700">
            {item}
          </div>
        ))}
      </section>
    </div>
  );
}
