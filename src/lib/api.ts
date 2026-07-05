import {
  FilterParams,
  LookupBundle,
  Notice,
  PaginatedResponse,
  Question,
  Resource,
  Routine,
  SearchResults,
  StudentRequestPayload,
  Syllabus,
} from "@/types/models";
import {
  getHomeHighlights,
  getMockCollection,
  getMockDetail,
  getMockLookups,
  getRelatedQuestions,
  getRelatedResources,
  getMockSearch,
  submitMockStudentRequest,
} from "@/lib/mock-data";
import { buildQueryString } from "@/lib/query";
import { getFileUrl } from "@/lib/utils";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:5000/api";
const USE_MOCKS = process.env.NEXT_PUBLIC_USE_MOCKS === "true";

type RequestOptions = {
  params?: FilterParams;
  revalidate?: number;
};

function toCollectionKey(endpoint: string) {
  return endpoint.replace(/^\//, "").split("/")[0];
}

async function requestJson<T>(path: string, init?: RequestInit & { revalidate?: number }) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
    next: init?.revalidate ? { revalidate: init.revalidate } : { revalidate: 60 },
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return (await response.json()) as T;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object";
}

function unwrapData<T>(payload: unknown): T {
  if (isRecord(payload) && "data" in payload) {
    return payload.data as T;
  }

  return payload as T;
}

function getId(value: unknown): string | undefined {
  if (typeof value === "string") {
    return value;
  }

  if (isRecord(value)) {
    if (typeof value.id === "string") {
      return value.id;
    }

    if (typeof value._id === "string") {
      return value._id;
    }
  }

  return undefined;
}

function getName(value: unknown, fallbackKey = "name"): string | undefined {
  if (!isRecord(value)) {
    return undefined;
  }

  if (typeof value[fallbackKey] === "string") {
    return value[fallbackKey] as string;
  }

  if (typeof value.title === "string") {
    return value.title;
  }

  return undefined;
}

function getFirstFile(source: Record<string, unknown>) {
  const files = Array.isArray(source.fileIds) ? source.fileIds : Array.isArray(source.files) ? source.files : [];
  return files.find((file) => isRecord(file)) as Record<string, unknown> | undefined;
}

function normalizeLookupOption(item: unknown) {
  const source = isRecord(item) ? item : {};

  return {
    id: getId(source) ?? "",
    name: getName(source) ?? "",
    slug: typeof source.slug === "string" ? source.slug : "",
  };
}

function normalizeDepartment(item: unknown): LookupBundle["departments"][number] {
  const source = isRecord(item) ? item : {};
  return {
    ...normalizeLookupOption(source),
    code: typeof source.code === "string" ? source.code : "",
  };
}

function normalizeAcademicYear(item: unknown): LookupBundle["academicYears"][number] {
  const source = isRecord(item) ? item : {};
  return {
    ...normalizeLookupOption(source),
    order: typeof source.order === "number" ? source.order : 0,
  };
}

function normalizeSubject(item: unknown): LookupBundle["subjects"][number] {
  const source = isRecord(item) ? item : {};

  return {
    id: getId(source) ?? "",
    name: getName(source, "title") ?? "",
    slug: typeof source.slug === "string" ? source.slug : "",
    code: typeof source.code === "string" ? source.code : "",
    courseId: getId(source.courseId) ?? "",
    departmentId: getId(source.departmentId) ?? "",
    academicYearId: getId(source.academicYearId) ?? "",
  };
}

function normalizeEntity<T extends Notice | Routine | Syllabus | Question | Resource>(item: unknown): T {
  const source = isRecord(item) ? item : {};
  const course = isRecord(source.courseId) ? source.courseId : undefined;
  const department = isRecord(source.departmentId) ? source.departmentId : undefined;
  const academicYear = isRecord(source.academicYearId) ? source.academicYearId : undefined;
  const subject = isRecord(source.subjectId) ? source.subjectId : undefined;
  const firstFile = getFirstFile(source);

  return {
    id: getId(source) ?? "",
    slug: typeof source.slug === "string" ? source.slug : "",
    title: typeof source.title === "string" ? source.title : "",
    summary:
      typeof source.description === "string"
        ? source.description
        : typeof source.title === "string"
          ? source.title
          : "",
    description: typeof source.description === "string" ? source.description : undefined,
    courseId: getId(source.courseId),
    departmentId: getId(source.departmentId),
    academicYearId: getId(source.academicYearId),
    subjectId: getId(source.subjectId),
    courseName: getName(course),
    departmentName: getName(department),
    academicYearName: getName(academicYear),
    subjectName: getName(subject, "title"),
    subjectCode:
      typeof source.subjectCode === "string"
        ? source.subjectCode
        : typeof subject?.code === "string"
          ? subject.code
          : undefined,
    verified: Boolean(source.isVerified),
    publishedAt: typeof source.publishedAt === "string" ? source.publishedAt : undefined,
    fileUrl: getFileUrl(typeof firstFile?.url === "string" ? firstFile.url : undefined),
    fileName:
      typeof firstFile?.originalName === "string"
        ? firstFile.originalName
        : typeof firstFile?.filename === "string"
          ? firstFile.filename
          : undefined,
    fileType: typeof firstFile?.mimeType === "string" ? firstFile.mimeType : undefined,
    category: typeof source.category === "string" ? source.category : undefined,
    officialSourceUrl:
      typeof source.officialSourceLink === "string" ? source.officialSourceLink : undefined,
    examType: typeof source.examType === "string" ? source.examType : undefined,
    examStartDate: typeof source.examStartDate === "string" ? source.examStartDate : undefined,
    examEndDate: typeof source.examEndDate === "string" ? source.examEndDate : undefined,
    subjectTitle: typeof source.subjectTitle === "string" ? source.subjectTitle : undefined,
    examYear: typeof source.examYear === "number" ? source.examYear : undefined,
    resourceType:
      typeof source.resourceType === "string" ? (source.resourceType as Resource["resourceType"]) : undefined,
  } as unknown as T;
}

function normalizePaginated<T>(payload: unknown): PaginatedResponse<T> {
  const unwrapped = unwrapData<unknown>(payload);

  if (Array.isArray(unwrapped)) {
    return {
      items: unwrapped as T[],
      page: 1,
      limit: unwrapped.length,
      total: unwrapped.length,
      totalPages: 1,
    };
  }

  const source = isRecord(payload) ? payload : {};
  const body = isRecord(unwrapped) ? unwrapped : {};
  const items =
    (body.items as T[]) ??
    (unwrapped as T[]) ??
    [];

  return {
    items,
    page: Number((source.meta as Record<string, unknown> | undefined)?.page ?? body.page ?? 1),
    limit: Number((source.meta as Record<string, unknown> | undefined)?.limit ?? body.limit ?? items.length),
    total: Number((source.meta as Record<string, unknown> | undefined)?.total ?? body.total ?? items.length),
    totalPages: Number((source.meta as Record<string, unknown> | undefined)?.totalPages ?? body.totalPages ?? 1),
  };
}

function normalizeDetail<T>(payload: unknown): T {
  return unwrapData<T>(payload);
}

export async function getLookups(): Promise<LookupBundle> {
  if (USE_MOCKS) {
    return getMockLookups();
  }

  const [coursesPayload, departmentsPayload, academicYearsPayload, subjectsPayload] = await Promise.all([
    requestJson<unknown>("/courses"),
    requestJson<unknown>("/departments"),
    requestJson<unknown>("/academic-years"),
    requestJson<unknown>("/subjects"),
  ]);

  return {
    courses: normalizePaginated<unknown>(coursesPayload).items.map(normalizeLookupOption),
    departments: normalizePaginated<unknown>(departmentsPayload).items.map(normalizeDepartment),
    academicYears: normalizePaginated<unknown>(academicYearsPayload).items.map(normalizeAcademicYear),
    subjects: normalizePaginated<unknown>(subjectsPayload).items.map(normalizeSubject),
  };
}

async function getList<T>(endpoint: string, options: RequestOptions = {}): Promise<PaginatedResponse<T>> {
  if (USE_MOCKS) {
    return getMockCollection<T>(toCollectionKey(endpoint), options.params);
  }

  const path = `${endpoint}${buildQueryString(options.params ?? {})}`;
  const payload = await requestJson<unknown>(path, { revalidate: options.revalidate ?? 60 });
  const normalized = normalizePaginated<unknown>(payload);
  return {
    ...normalized,
    items: normalized.items.map((item) => normalizeEntity<T & (Notice | Routine | Syllabus | Question | Resource)>(item)),
  };
}

async function getDetail<T>(endpoint: string, slug: string): Promise<T | null> {
  if (USE_MOCKS) {
    return getMockDetail<T>(toCollectionKey(endpoint), slug);
  }

  try {
    const payload = await requestJson<unknown>(`${endpoint}/${slug}`, { revalidate: 120 });
    return normalizeEntity<T & (Notice | Routine | Syllabus | Question | Resource)>(normalizeDetail(payload));
  } catch {
    return null;
  }
}

export async function getNotices(params?: FilterParams) {
  return getList<Notice>("/notices", { params });
}

export async function getNotice(slug: string) {
  return getDetail<Notice>("/notices", slug);
}

export async function getRoutines(params?: FilterParams) {
  return getList<Routine>("/routines", { params });
}

export async function getRoutine(slug: string) {
  return getDetail<Routine>("/routines", slug);
}

export async function getSyllabus(params?: FilterParams) {
  return getList<Syllabus>("/syllabus", { params });
}

export async function getSyllabusDetail(slug: string) {
  return getDetail<Syllabus>("/syllabus", slug);
}

export async function getQuestions(params?: FilterParams) {
  return getList<Question>("/questions", { params });
}

export async function getQuestion(slug: string) {
  return getDetail<Question>("/questions", slug);
}

export async function getResources(params?: FilterParams) {
  return getList<Resource>("/resources", { params });
}

export async function getResource(slug: string) {
  return getDetail<Resource>("/resources", slug);
}

export async function getSearchResults(query: string): Promise<SearchResults> {
  if (USE_MOCKS) {
    return getMockSearch(query);
  }

  const payload = await requestJson<unknown>(`/search${buildQueryString({ q: query })}`, { revalidate: 0 });
  const source = unwrapData<unknown>(payload);
  const results = Array.isArray(source) ? source : [];
  const grouped: SearchResults = {
    notices: [],
    routines: [],
    syllabus: [],
    questions: [],
    resources: [],
  };

  results.forEach((entry) => {
    if (!isRecord(entry) || typeof entry.type !== "string") {
      return;
    }

    const item = normalizeEntity(entry.item);
    if (entry.type === "notice") grouped.notices.push(item as Notice);
    if (entry.type === "routine") grouped.routines.push(item as Routine);
    if (entry.type === "syllabus") grouped.syllabus.push(item as Syllabus);
    if (entry.type === "question") grouped.questions.push(item as Question);
    if (entry.type === "resource") grouped.resources.push(item as Resource);
  });

  return grouped;
}

export async function createStudentRequest(payload: StudentRequestPayload) {
  if (USE_MOCKS) {
    return submitMockStudentRequest(payload);
  }

  return requestJson<{ success: boolean; message?: string }>("/student-requests", {
    method: "POST",
    body: JSON.stringify(payload),
    revalidate: 0,
  });
}

export async function getHomepageData() {
  if (USE_MOCKS) {
    return getHomeHighlights();
  }

  const [latestNotices, latestQuestions, lookups] = await Promise.all([
    getNotices({ page: "1", limit: "3" }),
    getQuestions({ page: "1", limit: "3" }),
    getLookups(),
  ]);

  const popularDepartments = lookups.departments.map((department) => ({
    ...department,
    totalItems: 0,
  }));

  return {
    latestNotices: latestNotices.items,
    latestQuestions: latestQuestions.items,
    popularDepartments,
  };
}

export function getMockRelatedQuestions(slug: string) {
  return getRelatedQuestions(slug);
}

export function getMockRelatedResources(slug: string) {
  return getRelatedResources(slug);
}
