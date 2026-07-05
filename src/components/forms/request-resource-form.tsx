"use client";

import { FormEvent, useState } from "react";
import { LookupBundle, StudentRequestPayload } from "@/types/models";
import { useResourceRequest } from "@/hooks/use-resource-request";

type RequestResourceFormProps = {
  lookups: LookupBundle;
};

const initialForm: StudentRequestPayload = {
  name: "",
  courseId: "",
  departmentId: "",
  academicYearId: "",
  subjectId: "",
  whatTheyNeed: "",
  message: "",
};

export function RequestResourceForm({ lookups }: RequestResourceFormProps) {
  const [form, setForm] = useState(initialForm);
  const { state, submit } = useResourceRequest();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const course = lookups.courses.find((item) => item.id === form.courseId);
    const department = lookups.departments.find((item) => item.id === form.departmentId);
    const academicYear = lookups.academicYears.find((item) => item.id === form.academicYearId);
    const subject = lookups.subjects.find((item) => item.id === form.subjectId);

    const success = await submit({
      ...form,
      courseText: course?.name,
      departmentText: department?.name,
      yearText: academicYear?.name,
      subjectText: subject ? `${subject.code} - ${subject.name}` : undefined,
    });
    if (success) {
      setForm(initialForm);
    }
  };

  const updateField = (key: keyof StudentRequestPayload, value: string) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="surface-card rounded-[2rem] p-6 md:p-8">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-2 text-sm font-medium text-slate-700">
          <span>Name (optional)</span>
          <input
            value={form.name}
            onChange={(event) => updateField("name", event.target.value)}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-sky-400"
          />
        </label>

        <label className="space-y-2 text-sm font-medium text-slate-700">
          <span>Course</span>
          <select
            required
            value={form.courseId ?? ""}
            onChange={(event) => updateField("courseId", event.target.value)}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-sky-400"
          >
            <option value="">Select course</option>
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
            required
            value={form.departmentId ?? ""}
            onChange={(event) => updateField("departmentId", event.target.value)}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-sky-400"
          >
            <option value="">Select department</option>
            {lookups.departments.map((department) => (
              <option key={department.id} value={department.id}>
                {department.name}
              </option>
            ))}
          </select>
        </label>

        <label className="space-y-2 text-sm font-medium text-slate-700">
          <span>Academic year</span>
          <select
            required
            value={form.academicYearId ?? ""}
            onChange={(event) => updateField("academicYearId", event.target.value)}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-sky-400"
          >
            <option value="">Select year</option>
            {lookups.academicYears.map((year) => (
              <option key={year.id} value={year.id}>
                {year.name}
              </option>
            ))}
          </select>
        </label>

        <label className="space-y-2 text-sm font-medium text-slate-700 md:col-span-2">
          <span>Subject</span>
          <select
            required
            value={form.subjectId ?? ""}
            onChange={(event) => updateField("subjectId", event.target.value)}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-sky-400"
          >
            <option value="">Select subject</option>
            {lookups.subjects.map((subject) => (
              <option key={subject.id} value={subject.id}>
                {subject.code} · {subject.name}
              </option>
            ))}
          </select>
        </label>

        <label className="space-y-2 text-sm font-medium text-slate-700 md:col-span-2">
          <span>What they need</span>
          <input
            required
            value={form.whatTheyNeed}
            onChange={(event) => updateField("whatTheyNeed", event.target.value)}
            placeholder="Example: 2024 ACC-111 final question or ENG-121 notes"
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-sky-400"
          />
        </label>

        <label className="space-y-2 text-sm font-medium text-slate-700 md:col-span-2">
          <span>Message</span>
          <textarea
            required
            rows={5}
            value={form.message}
            onChange={(event) => updateField("message", event.target.value)}
            placeholder="Add context so the admin team knows exactly which resource is missing."
            className="w-full rounded-3xl border border-slate-200 px-4 py-3 outline-none focus:border-sky-400"
          />
        </label>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <button
          type="submit"
          disabled={state.status === "loading"}
          className="rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {state.status === "loading" ? "Submitting..." : "Submit request"}
        </button>
        {state.message ? (
          <p
            className={`text-sm ${
              state.status === "error" ? "text-rose-700" : "text-emerald-700"
            }`}
          >
            {state.message}
          </p>
        ) : null}
      </div>
    </form>
  );
}
