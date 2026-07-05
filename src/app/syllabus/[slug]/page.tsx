import { notFound } from "next/navigation";
import { DetailSidebar } from "@/components/common/detail-sidebar";
import { FileViewer } from "@/components/common/file-viewer";
import { PageHero } from "@/components/common/page-hero";
import { getSyllabusDetail } from "@/lib/api";
import { buildMetadata } from "@/lib/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const syllabus = await getSyllabusDetail(slug);

  if (!syllabus) {
    return buildMetadata({
      title: "Syllabus not found",
      description: "This syllabus file could not be found.",
    });
  }

  return buildMetadata({
    title: syllabus.title,
    description: syllabus.summary,
  });
}

export default async function SyllabusDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const syllabus = await getSyllabusDetail(slug);

  if (!syllabus) {
    notFound();
  }

  return (
    <div className="pb-16">
      <PageHero
        eyebrow={syllabus.subjectCode ?? "Syllabus"}
        title={syllabus.title}
        description={syllabus.summary}
      />

      <section className="container-shell grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <a
            href={syllabus.fileUrl}
            download
            className="inline-flex rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white"
          >
            Download syllabus
          </a>
          <FileViewer fileUrl={syllabus.fileUrl} title={syllabus.title} />
        </div>
        <DetailSidebar
          item={syllabus}
          extra={[
            { label: "Subject code", value: syllabus.subjectCode },
            { label: "Subject title", value: syllabus.subjectTitle ?? syllabus.subjectName },
          ]}
        />
      </section>
    </div>
  );
}
