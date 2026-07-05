import Link from "next/link";
import { buildQueryString } from "@/lib/query";

type FilterOption = {
  label: string;
  value: string;
};

type FilterField = {
  name: string;
  label: string;
  type?: "text" | "select" | "date" | "number";
  placeholder?: string;
  options?: FilterOption[];
};

type FilterBarProps = {
  action: string;
  fields: FilterField[];
  values: Record<string, string | undefined>;
};

export function FilterBar({ action, fields, values }: FilterBarProps) {
  return (
    <form action={action} className="surface-card rounded-[2rem] p-5 md:p-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {fields.map((field) => {
          const value = values[field.name] ?? "";

          if (field.type === "select") {
            return (
              <label key={field.name} className="space-y-2 text-sm font-medium text-slate-700">
                <span>{field.label}</span>
                <select
                  name={field.name}
                  defaultValue={value}
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-400"
                >
                  <option value="">All</option>
                  {field.options?.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
            );
          }

          return (
            <label key={field.name} className="space-y-2 text-sm font-medium text-slate-700">
              <span>{field.label}</span>
              <input
                type={field.type ?? "text"}
                name={field.name}
                defaultValue={value}
                placeholder={field.placeholder}
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-400"
              />
            </label>
          );
        })}
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <button
          type="submit"
          className="rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-700"
        >
          Apply filters
        </button>
        <Link
          href={`${action}${buildQueryString({ limit: values.limit ?? "6" })}`}
          className="rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
        >
          Reset
        </Link>
      </div>
    </form>
  );
}
