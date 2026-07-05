import { RequestResourceForm } from "@/components/forms/request-resource-form";
import { PageHero } from "@/components/common/page-hero";
import { getLookups } from "@/lib/api";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Request Resource",
  description: "Submit a missing resource request to the NU Student Help Website admin team.",
});

export default async function RequestResourcePage() {
  const lookups = await getLookups();

  return (
    <div className="pb-16">
      <PageHero
        eyebrow="Request Resource"
        title="Ask for a missing note, question, routine, or syllabus file."
        description="Students can submit public resource requests here. No login is required."
      />

      <section className="container-shell">
        <RequestResourceForm lookups={lookups} />
      </section>
    </div>
  );
}
