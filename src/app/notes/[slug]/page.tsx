import Link from "next/link";
import { notFound } from "next/navigation";
import { DetailSidebar } from "@/components/common/detail-sidebar";
import { FileViewer } from "@/components/common/file-viewer";
import { PageHero } from "@/components/common/page-hero";
import { ResourceCard } from "@/components/common/resource-card";
import { getMockRelatedResources, getResource } from "@/lib/api";
import { buildMetadata } from "@/lib/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const resource = await getResource(slug);

  if (!resource) {
    return buildMetadata({
      title: "Resource not found",
      description: "This resource could not be found.",
    });
  }

  return buildMetadata({
    title: resource.title,
    description: resource.summary,
  });
}

export default async function NoteDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const resource = await getResource(slug);

  if (!resource) {
    notFound();
  }

  const related = getMockRelatedResources(slug);

  return (
    <div className="pb-16">
      <PageHero
        eyebrow={resource.resourceType}
        title={resource.title}
        description={resource.description ?? resource.summary}
      />

      <section className="container-shell grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <a
            href={resource.fileUrl}
            download
            className="inline-flex rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white"
          >
            Download resource
          </a>
          <FileViewer fileUrl={resource.fileUrl} title={resource.title} />
        </div>
        <DetailSidebar
          item={resource}
          extra={[{ label: "Resource type", value: resource.resourceType }]}
        />
      </section>

      <section className="container-shell pt-10">
        <div className="mb-5 flex items-center justify-between gap-4">
          <h2 className="font-display text-3xl font-semibold text-slate-900">Related resources</h2>
          <Link href="/notes" className="text-sm font-semibold text-sky-700">
            Back to notes
          </Link>
        </div>
        <div className="grid gap-5 lg:grid-cols-3">
          {related.map((item) => (
            <ResourceCard
              key={item.id}
              href={`/notes/${item.slug}`}
              item={item}
              showVerified
              downloadUrl={item.fileUrl}
              eyebrow={item.resourceType}
              meta={[
                item.subjectCode ?? "Subject code unavailable",
                item.subjectName ?? "Subject unavailable",
              ]}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
