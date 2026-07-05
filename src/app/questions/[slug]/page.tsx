import Link from "next/link";
import { notFound } from "next/navigation";
import { DetailSidebar } from "@/components/common/detail-sidebar";
import { FileViewer } from "@/components/common/file-viewer";
import { PageHero } from "@/components/common/page-hero";
import { ResourceCard } from "@/components/common/resource-card";
import { getMockRelatedQuestions, getQuestion } from "@/lib/api";
import { buildMetadata } from "@/lib/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const question = await getQuestion(slug);

  if (!question) {
    return buildMetadata({
      title: "Question not found",
      description: "This question paper could not be found.",
    });
  }

  return buildMetadata({
    title: question.title,
    description: question.summary,
  });
}

export default async function QuestionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const question = await getQuestion(slug);

  if (!question) {
    notFound();
  }

  const related = getMockRelatedQuestions(slug);

  return (
    <div className="pb-16">
      <PageHero
        eyebrow={question.subjectCode ?? `Exam year ${question.examYear}`}
        title={question.title}
        description={question.summary}
      />

      <section className="container-shell grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <a
            href={question.fileUrl}
            download
            className="inline-flex rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white"
          >
            Download question
          </a>
          <FileViewer fileUrl={question.fileUrl} title={question.title} />
        </div>
        <DetailSidebar
          item={question}
          extra={[{ label: "Exam year", value: String(question.examYear) }]}
        />
      </section>

      <section className="container-shell pt-10">
        <div className="mb-5 flex items-center justify-between gap-4">
          <h2 className="font-display text-3xl font-semibold text-slate-900">Related questions</h2>
          <Link href="/questions" className="text-sm font-semibold text-sky-700">
            Back to question bank
          </Link>
        </div>
        <div className="grid gap-5 lg:grid-cols-3">
          {related.map((item) => (
            <ResourceCard
              key={item.id}
              href={`/questions/${item.slug}`}
              item={item}
              showVerified
              downloadUrl={item.fileUrl}
              meta={[
                item.subjectCode ?? "Subject code unavailable",
                item.subjectName ?? "Subject unavailable",
                `Exam year ${item.examYear}`,
              ]}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
