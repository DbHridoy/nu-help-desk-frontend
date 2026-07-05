import { EmptyState } from "@/components/common/empty-state";
import { FilterBar } from "@/components/common/filter-bar";
import { PageHero } from "@/components/common/page-hero";
import { Pagination } from "@/components/common/pagination";
import { ResourceCard } from "@/components/common/resource-card";
import { resourceTypes } from "@/features/catalog/config";
import { getLookups, getResources } from "@/lib/api";
import { buildMetadata } from "@/lib/metadata";
import { readSearchParams } from "@/lib/query";

export const metadata = buildMetadata({
  title: "Notes",
  description: "Browse notes and study resources by type, department, year, and subject.",
});

export default async function NotesPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = readSearchParams(await searchParams);
  const [lookups, data] = await Promise.all([getLookups(), getResources({ ...params, limit: "6" })]);

  return (
    <div className="pb-16">
      <PageHero
        eyebrow="Notes & Resources"
        title="Public notes, suggestions, and important topics"
        description="Filter by course, department, academic year, subject, or resource type."
      />

      <section className="container-shell space-y-6">
        <FilterBar
          action="/notes"
          values={{ ...params, limit: "6" }}
          fields={[
            {
              name: "courseId",
              label: "Course",
              type: "select",
              options: lookups.courses.map((course) => ({ label: course.name, value: course.id })),
            },
            {
              name: "departmentId",
              label: "Department",
              type: "select",
              options: lookups.departments.map((department) => ({
                label: department.name,
                value: department.id,
              })),
            },
            {
              name: "academicYearId",
              label: "Academic year",
              type: "select",
              options: lookups.academicYears.map((year) => ({ label: year.name, value: year.id })),
            },
            {
              name: "subjectId",
              label: "Subject",
              type: "select",
              options: lookups.subjects.map((subject) => ({
                label: `${subject.code} · ${subject.name}`,
                value: subject.id,
              })),
            },
            {
              name: "resourceType",
              label: "Resource type",
              type: "select",
              options: resourceTypes.map((value) => ({ label: value, value })),
            },
          ]}
        />

        {data.items.length ? (
          <div className="grid gap-5 lg:grid-cols-2">
            {data.items.map((item) => (
              <ResourceCard
                key={item.id}
                href={`/notes/${item.slug}`}
                item={item}
                eyebrow={item.resourceType}
                showVerified
                downloadUrl={item.fileUrl}
                meta={[
                  item.subjectCode ?? "Subject code unavailable",
                  item.subjectName ?? "Subject unavailable",
                  item.departmentName ?? "Department unavailable",
                ]}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No notes or resources matched these filters"
            description="Try another resource type or remove the subject filter."
          />
        )}

        <Pagination basePath="/notes" pagination={data} params={{ ...params, limit: "6" }} />
      </section>
    </div>
  );
}
