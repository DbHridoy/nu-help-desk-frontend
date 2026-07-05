import { FilterParams } from "@/types/models";

export type SearchParamInput =
  | Record<string, string | string[] | undefined>
  | URLSearchParams;

export function readSearchParams(input: SearchParamInput): FilterParams {
  const getValue = (key: string) => {
    if (input instanceof URLSearchParams) {
      return input.get(key) ?? undefined;
    }

    const value = input[key];
    return Array.isArray(value) ? value[0] : value;
  };

  return {
    courseId: getValue("courseId"),
    departmentId: getValue("departmentId"),
    academicYearId: getValue("academicYearId"),
    subjectId: getValue("subjectId"),
    category: getValue("category"),
    resourceType: getValue("resourceType"),
    examType: getValue("examType"),
    examYear: getValue("examYear"),
    search: getValue("search") ?? getValue("q"),
    date: getValue("date"),
    page: getValue("page"),
    limit: getValue("limit"),
  };
}

export function buildQueryString(params: Record<string, string | number | undefined>) {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== "") {
      searchParams.set(key, String(value));
    }
  });

  const query = searchParams.toString();
  return query ? `?${query}` : "";
}
