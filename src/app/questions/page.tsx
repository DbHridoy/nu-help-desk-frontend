import { EmptyState } from "@/components/common/empty-state";
import { FilterBar } from "@/components/common/filter-bar";
import { PageHero } from "@/components/common/page-hero";
import { Pagination } from "@/components/common/pagination";
import { ResourceCard } from "@/components/common/resource-card";
import { getLookups, getQuestions } from "@/lib/api";
import { buildMetadata } from "@/lib/metadata";
import { readSearchParams } from "@/lib/query";

export const metadata = buildMetadata({
  title: "Previous Questions",
  description:
    "Browse previous year question papers by course, department, academic year, subject, and exam year.",
});

export default async function QuestionsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = readSearchParams(await searchParams);
  const [lookups, data] = await Promise.all([getLookups(), getQuestions({ ...params, limit: "6" })]);

  return (
    <div className="pb-16">
      <PageHero
        eyebrow="Previous Questions"
        title="Searchable question bank for fast revision"
        description="Search by subject name, code, or exam year, then filter down to the exact paper you need."
      />

      <section className="container-shell space-y-6">
        <FilterBar
          action="/questions"
          values={{ ...params, limit: "6" }}
          fields={[
            {
              name: "search",
              label: "Search",
              placeholder: "Subject name, subject code, or question year",
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
            {
              name: "subjectId",
              label: "Subject",
              type: "select",
              options: lookups.subjects.map((subject) => ({
                label: `${subject.code} · ${subject.name}`,
                value: subject.id,
              })),
            },
            { name: "examYear", label: "Exam year", type: "number", placeholder: "2024" },
          ]}
        />

        {data.items.length ? (
          <div className="grid gap-5 lg:grid-cols-2">
            {data.items.map((item) => (
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
        ) : (
          <EmptyState
            title="No question papers matched these filters"
            description="Try removing the subject filter or using a broader search term."
          />
        )}

        <Pagination basePath="/questions" pagination={data} params={{ ...params, limit: "6" }} />
      </section>
    </div>
  );
}
