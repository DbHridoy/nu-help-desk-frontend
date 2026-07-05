import { EmptyState } from "@/components/common/empty-state";
import { FilterBar } from "@/components/common/filter-bar";
import { PageHero } from "@/components/common/page-hero";
import { Pagination } from "@/components/common/pagination";
import { ResourceCard } from "@/components/common/resource-card";
import { getLookups, getSyllabus } from "@/lib/api";
import { buildMetadata } from "@/lib/metadata";
import { readSearchParams } from "@/lib/query";

export const metadata = buildMetadata({
  title: "Syllabus",
  description: "Browse syllabus files by course, department, academic year, and subject.",
});

export default async function SyllabusPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = readSearchParams(await searchParams);
  const [lookups, data] = await Promise.all([getLookups(), getSyllabus({ ...params, limit: "6" })]);

  return (
    <div className="pb-16">
      <PageHero
        eyebrow="Syllabus"
        title="Syllabus files students can open without friction"
        description="Filter by course, department, academic year, or subject to find the right syllabus quickly."
      />

      <section className="container-shell space-y-6">
        <FilterBar
          action="/syllabus"
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
          ]}
        />

        {data.items.length ? (
          <div className="grid gap-5 lg:grid-cols-2">
            {data.items.map((item) => (
              <ResourceCard
                key={item.id}
                href={`/syllabus/${item.slug}`}
                item={item}
                downloadUrl={item.fileUrl}
                meta={[
                  item.subjectCode ?? "Subject code unavailable",
                  item.subjectTitle ?? item.subjectName ?? "Subject unavailable",
                ]}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No syllabus files matched these filters"
            description="Try a different subject or browse without the academic year filter."
          />
        )}

        <Pagination basePath="/syllabus" pagination={data} params={{ ...params, limit: "6" }} />
      </section>
    </div>
  );
}
