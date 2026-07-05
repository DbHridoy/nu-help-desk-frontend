import Link from "next/link";
import { SectionHeading } from "@/components/common/section-heading";
import { ResourceCard } from "@/components/common/resource-card";
import { SearchHero } from "@/components/common/search-hero";
import { getHomepageData, getLookups } from "@/lib/api";
import { buildMetadata } from "@/lib/metadata";
import { quickLinks } from "@/features/catalog/config";

export const metadata = buildMetadata({
  title: "Home",
  description:
    "Search notices, routines, syllabus, previous year questions, and notes for National University students.",
});

export default async function HomePage() {
  const [lookups, homepage] = await Promise.all([getLookups(), getHomepageData()]);

  return (
    <div className="pb-16">
      <SearchHero lookups={lookups} />

      <section className="container-shell grid gap-6 pb-10 md:grid-cols-2 xl:grid-cols-6">
        {quickLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="surface-card rounded-[2rem] px-5 py-5 text-base font-semibold text-slate-800 transition hover:-translate-y-0.5 hover:text-sky-700"
          >
            {link.label}
          </Link>
        ))}
      </section>

      <section className="container-shell py-10">
        <SectionHeading
          eyebrow="Latest Notices"
          title="Fresh updates students usually need first"
          description="Recent public notices with direct detail pages, verified labels, and official source links when available."
        />
        <div className="mt-6 grid gap-5 lg:grid-cols-3">
          {homepage.latestNotices.map((item) => (
            <ResourceCard
              key={item.id}
              href={`/notices/${item.slug}`}
              item={item}
              eyebrow={item.category}
              showVerified
              meta={[item.departmentName ?? "All departments", item.academicYearName ?? "All years"]}
            />
          ))}
        </div>
      </section>

      <section className="container-shell py-10">
        <SectionHeading
          eyebrow="Latest Questions"
          title="Recent uploads from the question bank"
          description="Quick access to previous year papers by subject, department, and exam year."
        />
        <div className="mt-6 grid gap-5 lg:grid-cols-3">
          {homepage.latestQuestions.map((item) => (
            <ResourceCard
              key={item.id}
              href={`/questions/${item.slug}`}
              item={item}
              showVerified
              downloadUrl={item.fileUrl}
              meta={[
                item.subjectCode ?? "Subject code unavailable",
                item.departmentName ?? "Department unavailable",
                `Exam year ${item.examYear}`,
              ]}
            />
          ))}
        </div>
      </section>

      <section className="container-shell py-10">
        <SectionHeading
          eyebrow="Popular Departments"
          title="Start from the department you belong to"
          description="Useful when you want to jump straight into the most active content buckets in the MVP."
        />
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {homepage.popularDepartments.map((department) => (
            <Link
              key={department.id}
              href={`/questions?departmentId=${department.id}`}
              className="surface-card rounded-[2rem] p-6 transition hover:-translate-y-0.5"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-sky-700">
                {department.code}
              </p>
              <h3 className="mt-3 text-2xl font-semibold text-slate-900">{department.name}</h3>
              <p className="mt-2 text-sm leading-7 text-slate-600">
                Browse questions, notices, and notes for {department.name}.
              </p>
              <p className="mt-4 text-sm font-semibold text-slate-800">
                {department.totalItems} highlighted items
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
