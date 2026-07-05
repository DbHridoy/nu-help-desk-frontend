"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { LookupBundle } from "@/types/models";

type SearchHeroProps = {
  lookups: LookupBundle;
};

export function SearchHero({ lookups }: SearchHeroProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [courseId, setCourseId] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [academicYearId, setAcademicYearId] = useState("");
  const [subjectId, setSubjectId] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      return;
    }

    const params = new URLSearchParams();
    if (courseId) params.set("courseId", courseId);
    if (departmentId) params.set("departmentId", departmentId);
    if (academicYearId) params.set("academicYearId", academicYearId);
    if (subjectId) params.set("subjectId", subjectId);

    router.push(`/questions${params.toString() ? `?${params.toString()}` : ""}`);
  };

  return (
    <section className="container-shell pt-8 pb-12 md:pt-14 md:pb-18">
      <div className="grid gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:items-center">
        <div className="space-y-6">
          <div className="inline-flex rounded-full bg-sky-100 px-4 py-2 text-sm font-semibold text-sky-800">
            Public NU student support
          </div>
          <div className="space-y-4">
            <h1 className="max-w-4xl font-display text-5xl font-semibold leading-tight text-slate-900 md:text-6xl">
              Find National University notices, routines, syllabus, and past questions faster.
            </h1>
            <p className="max-w-2xl text-base leading-8 text-slate-600">
              Search first, filter quickly, and open verified resources without logging in. The
              MVP is focused on public browsing, viewing, and downloading.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="surface-card rounded-[2rem] p-5 md:p-6">
            <div className="grid gap-4">
              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-700">Main search</span>
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search notices, subject codes, question years, or notes"
                  className="w-full rounded-2xl border border-slate-200 bg-white px-5 py-4 text-base text-slate-900 outline-none transition focus:border-sky-400"
                />
              </label>

              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                <label className="space-y-2 text-sm font-medium text-slate-700">
                  <span>Course</span>
                  <select
                    value={courseId}
                    onChange={(event) => setCourseId(event.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-sky-400"
                  >
                    <option value="">All courses</option>
                    {lookups.courses.map((course) => (
                      <option key={course.id} value={course.id}>
                        {course.name}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="space-y-2 text-sm font-medium text-slate-700">
                  <span>Department</span>
                  <select
                    value={departmentId}
                    onChange={(event) => setDepartmentId(event.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-sky-400"
                  >
                    <option value="">All departments</option>
                    {lookups.departments.map((department) => (
                      <option key={department.id} value={department.id}>
                        {department.name}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="space-y-2 text-sm font-medium text-slate-700">
                  <span>Year</span>
                  <select
                    value={academicYearId}
                    onChange={(event) => setAcademicYearId(event.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-sky-400"
                  >
                    <option value="">All years</option>
                    {lookups.academicYears.map((year) => (
                      <option key={year.id} value={year.id}>
                        {year.name}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="space-y-2 text-sm font-medium text-slate-700">
                  <span>Subject</span>
                  <select
                    value={subjectId}
                    onChange={(event) => setSubjectId(event.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-sky-400"
                  >
                    <option value="">All subjects</option>
                    {lookups.subjects.map((subject) => (
                      <option key={subject.id} value={subject.id}>
                        {subject.code} · {subject.name}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  type="submit"
                  className="rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-700"
                >
                  Search or browse
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setQuery("");
                    setCourseId("");
                    setDepartmentId("");
                    setAcademicYearId("");
                    setSubjectId("");
                  }}
                  className="rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-white"
                >
                  Clear filters
                </button>
              </div>
            </div>
          </form>
        </div>

        <div className="surface-card rounded-[2rem] p-7">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">
            What students can do
          </p>
          <div className="mt-5 space-y-4">
            {[
              "Open latest NU notices with official source links.",
              "Preview routine, syllabus, question, and note files directly.",
              "Filter by course, department, academic year, and subject.",
              "Request a missing resource without creating an account.",
            ].map((item) => (
              <div key={item} className="rounded-2xl bg-slate-50 px-4 py-4 text-sm leading-7 text-slate-700">
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
