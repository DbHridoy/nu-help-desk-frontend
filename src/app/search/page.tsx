import Link from "next/link";
import { EmptyState } from "@/components/common/empty-state";
import { PageHero } from "@/components/common/page-hero";
import { ResourceCard } from "@/components/common/resource-card";
import { getSearchResults } from "@/lib/api";
import { buildMetadata } from "@/lib/metadata";
import { readSearchParams } from "@/lib/query";

export const metadata = buildMetadata({
  title: "Search",
  description: "Search across notices, routines, syllabus, questions, and resources.",
});

const groups = [
  { key: "notices", title: "Notices", href: "/notices" },
  { key: "routines", title: "Routines", href: "/routines" },
  { key: "syllabus", title: "Syllabus", href: "/syllabus" },
  { key: "questions", title: "Questions", href: "/questions" },
  { key: "resources", title: "Resources", href: "/notes" },
] as const;

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = readSearchParams(await searchParams);
  const query = params.search?.trim() ?? "";
  const results = query ? await getSearchResults(query) : null;

  return (
    <div className="pb-16">
      <PageHero
        eyebrow="Search"
        title={query ? `Results for “${query}”` : "Search across all public resources"}
        description="Results are grouped into notices, routines, syllabus, questions, and resources."
      />

      <section className="container-shell space-y-10">
        {!query ? (
          <EmptyState
            title="Start with a keyword"
            description="Search by subject name, subject code, exam year, or a notice keyword."
          />
        ) : (
          groups.map((group) => {
            const items = results?.[group.key] ?? [];
            return (
              <div key={group.key} className="space-y-4">
                <div className="flex items-center justify-between gap-4">
                  <h2 className="font-display text-3xl font-semibold text-slate-900">{group.title}</h2>
                  <Link href={group.href} className="text-sm font-semibold text-sky-700">
                    Open section
                  </Link>
                </div>
                {items.length ? (
                  <div className="grid gap-5 lg:grid-cols-2">
                    {items.map((item) => (
                      <ResourceCard
                        key={item.id}
                        href={`${group.href}/${item.slug}`}
                        item={item}
                        showVerified={"verified" in item}
                        downloadUrl={item.fileUrl}
                        meta={[
                          item.departmentName ?? "Department unavailable",
                          item.subjectCode ?? item.subjectName ?? "General",
                        ]}
                      />
                    ))}
                  </div>
                ) : (
                  <EmptyState
                    title={`No ${group.title.toLowerCase()} found`}
                    description={`No ${group.title.toLowerCase()} matched “${query}”.`}
                  />
                )}
              </div>
            );
          })
        )}
      </section>
    </div>
  );
}
