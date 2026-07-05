import { PageHero } from "@/components/common/page-hero";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Contact",
  description: "Basic public contact and admin information for the MVP.",
});

export default function ContactPage() {
  return (
    <div className="pb-16">
      <PageHero
        eyebrow="Contact"
        title="Need to reach the admin side of the MVP?"
        description="Use the information below as a placeholder contact channel until the production admin workflow is finalized."
      />

      <section className="container-shell grid gap-6 md:grid-cols-2">
        <div className="surface-card rounded-[2rem] p-6">
          <h2 className="text-xl font-semibold text-slate-900">Admin contact</h2>
          <p className="mt-4 text-sm leading-7 text-slate-600">
            Email: admin@nuhelpdesk.test
            <br />
            Office hours: Sunday to Thursday, 10:00 AM to 5:00 PM
            <br />
            For missing files, the request resource form is the preferred channel.
          </p>
        </div>
        <div className="surface-card rounded-[2rem] p-6">
          <h2 className="text-xl font-semibold text-slate-900">MVP scope reminder</h2>
          <p className="mt-4 text-sm leading-7 text-slate-600">
            This public website does not include student login, payments, or forum features. It is
            focused on fast discovery, browsing, viewing, and downloading.
          </p>
        </div>
      </section>
    </div>
  );
}
