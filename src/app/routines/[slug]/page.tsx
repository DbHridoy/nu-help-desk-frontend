import { notFound } from "next/navigation";
import { DetailSidebar } from "@/components/common/detail-sidebar";
import { FileViewer } from "@/components/common/file-viewer";
import { PageHero } from "@/components/common/page-hero";
import { getRoutine } from "@/lib/api";
import { buildMetadata } from "@/lib/metadata";
import { formatDate } from "@/lib/utils";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const routine = await getRoutine(slug);

  if (!routine) {
    return buildMetadata({
      title: "Routine not found",
      description: "This routine could not be found.",
    });
  }

  return buildMetadata({
    title: routine.title,
    description: routine.summary,
  });
}

export default async function RoutineDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const routine = await getRoutine(slug);

  if (!routine) {
    notFound();
  }

  return (
    <div className="pb-16">
      <PageHero
        eyebrow={routine.examType}
        title={routine.title}
        description={routine.summary}
      />

      <section className="container-shell grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <div className="flex flex-wrap gap-3">
            <a
              href={routine.fileUrl}
              download
              className="rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white"
            >
              Download routine
            </a>
          </div>
          <FileViewer fileUrl={routine.fileUrl} title={routine.title} />
        </div>
        <DetailSidebar
          item={routine}
          extra={[
            { label: "Exam type", value: routine.examType },
            { label: "Exam start", value: formatDate(routine.examStartDate) },
            { label: "Exam end", value: formatDate(routine.examEndDate) },
          ]}
        />
      </section>
    </div>
  );
}
