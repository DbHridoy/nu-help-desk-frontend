import Link from "next/link";
import { notFound } from "next/navigation";
import { DetailSidebar } from "@/components/common/detail-sidebar";
import { FileViewer } from "@/components/common/file-viewer";
import { PageHero } from "@/components/common/page-hero";
import { getNotice } from "@/lib/api";
import { buildMetadata } from "@/lib/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const notice = await getNotice(slug);

  if (!notice) {
    return buildMetadata({
      title: "Notice not found",
      description: "This notice could not be found.",
    });
  }

  return buildMetadata({
    title: notice.title,
    description: notice.summary,
  });
}

export default async function NoticeDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const notice = await getNotice(slug);

  if (!notice) {
    notFound();
  }

  return (
    <div className="pb-16">
      <PageHero
        eyebrow={notice.category}
        title={notice.title}
        description={notice.description ?? notice.summary}
      />

      <section className="container-shell grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <div className="surface-card rounded-[2rem] p-6 md:p-8">
            <h2 className="text-xl font-semibold text-slate-900">Description</h2>
            <p className="mt-4 text-sm leading-8 text-slate-600">{notice.description ?? notice.summary}</p>
            {notice.officialSourceUrl ? (
              <Link
                href={notice.officialSourceUrl}
                target="_blank"
                className="mt-6 inline-flex rounded-full bg-sky-700 px-5 py-3 text-sm font-semibold text-white"
              >
                Open official source
              </Link>
            ) : null}
          </div>
          <FileViewer fileUrl={notice.fileUrl} title={notice.title} />
        </div>

        <DetailSidebar item={notice} extra={[{ label: "Category", value: notice.category }]} />
      </section>
    </div>
  );
}
