import { EmptyState } from "@/components/common/empty-state";
import { FilterBar } from "@/components/common/filter-bar";
import { PageHero } from "@/components/common/page-hero";
import { Pagination } from "@/components/common/pagination";
import { ResourceCard } from "@/components/common/resource-card";
import { noticeCategories } from "@/features/catalog/config";
import { getLookups, getNotices } from "@/lib/api";
import { buildMetadata } from "@/lib/metadata";
import { readSearchParams } from "@/lib/query";

export const metadata = buildMetadata({
  title: "Notices",
  description: "Browse public NU notices with filters, search, published dates, and verification labels.",
});

export default async function NoticesPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = readSearchParams(await searchParams);
  const [lookups, data] = await Promise.all([getLookups(), getNotices({ ...params, limit: "6" })]);

  return (
    <div className="pb-16">
      <PageHero
        eyebrow="Notices"
        title="Latest NU notices organized for public browsing"
        description="Filter by category, course, department, academic year, date, or search by title."
      />

      <section className="container-shell space-y-6">
        <FilterBar
          action="/notices"
          values={{ ...params, limit: "6" }}
          fields={[
            { name: "search", label: "Search title", placeholder: "Search notice title" },
            {
              name: "category",
              label: "Category",
              type: "select",
              options: noticeCategories.map((value) => ({ label: value, value })),
            },
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
            { name: "date", label: "Published date", type: "date" },
          ]}
        />

        {data.items.length ? (
          <div className="grid gap-5 lg:grid-cols-2">
            {data.items.map((item) => (
              <ResourceCard
                key={item.id}
                href={`/notices/${item.slug}`}
                item={item}
                eyebrow={item.category}
                showVerified
                meta={[item.courseName ?? "All courses", item.departmentName ?? "All departments"]}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No notices matched these filters"
            description="Try a broader search term or remove one of the category and date filters."
          />
        )}

        <Pagination basePath="/notices" pagination={data} params={{ ...params, limit: "6" }} />
      </section>
    </div>
  );
}
