import { EmptyState } from "@/components/common/empty-state";
import { FilterBar } from "@/components/common/filter-bar";
import { PageHero } from "@/components/common/page-hero";
import { Pagination } from "@/components/common/pagination";
import { ResourceCard } from "@/components/common/resource-card";
import { examTypes } from "@/features/catalog/config";
import { getLookups, getRoutines } from "@/lib/api";
import { buildMetadata } from "@/lib/metadata";
import { readSearchParams } from "@/lib/query";
import { formatDate } from "@/lib/utils";

export const metadata = buildMetadata({
  title: "Routines",
  description: "Browse NU exam routines with filters, preview support, and direct downloads.",
});

export default async function RoutinesPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = readSearchParams(await searchParams);
  const [lookups, data] = await Promise.all([getLookups(), getRoutines({ ...params, limit: "6" })]);

  return (
    <div className="pb-16">
      <PageHero
        eyebrow="Routines"
        title="Exam routines with quick preview and download"
        description="Filter routines by course, department, academic year, and exam type."
      />

      <section className="container-shell space-y-6">
        <FilterBar
          action="/routines"
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
              name: "examType",
              label: "Exam type",
              type: "select",
              options: examTypes.map((value) => ({ label: value, value })),
            },
          ]}
        />

        {data.items.length ? (
          <div className="grid gap-5 lg:grid-cols-2">
            {data.items.map((item) => (
              <ResourceCard
                key={item.id}
                href={`/routines/${item.slug}`}
                item={item}
                eyebrow={item.examType}
                downloadUrl={item.fileUrl}
                meta={[
                  item.departmentName ?? "All departments",
                  `${formatDate(item.examStartDate)} - ${formatDate(item.examEndDate)}`,
                ]}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No routines matched these filters"
            description="Try a different department or remove the exam type filter."
          />
        )}

        <Pagination basePath="/routines" pagination={data} params={{ ...params, limit: "6" }} />
      </section>
    </div>
  );
}
