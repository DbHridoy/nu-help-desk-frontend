import {
  AcademicYear,
  Course,
  Department,
  FilterParams,
  LookupBundle,
  Notice,
  PaginatedResponse,
  Question,
  Resource,
  Routine,
  SearchResults,
  StudentRequestPayload,
  Subject,
  Syllabus,
} from "@/types/models";

const courses: Course[] = [
  { id: "course-honours", name: "Honours", slug: "honours" },
];

const departments: Department[] = [
  { id: "dept-accounting", name: "Accounting", slug: "accounting", code: "ACC" },
  { id: "dept-management", name: "Management", slug: "management", code: "MGT" },
  { id: "dept-english", name: "English", slug: "english", code: "ENG" },
];

const academicYears: AcademicYear[] = [
  { id: "year-1", name: "1st Year", slug: "1st-year", order: 1 },
  { id: "year-2", name: "2nd Year", slug: "2nd-year", order: 2 },
];

const subjects: Subject[] = [
  {
    id: "subject-principles-of-accounting",
    name: "Principles of Accounting",
    slug: "principles-of-accounting",
    code: "ACC-111",
    courseId: "course-honours",
    departmentId: "dept-accounting",
    academicYearId: "year-1",
  },
  {
    id: "subject-business-math",
    name: "Business Mathematics",
    slug: "business-mathematics",
    code: "ACC-123",
    courseId: "course-honours",
    departmentId: "dept-accounting",
    academicYearId: "year-1",
  },
  {
    id: "subject-management-principles",
    name: "Principles of Management",
    slug: "principles-of-management",
    code: "MGT-211",
    courseId: "course-honours",
    departmentId: "dept-management",
    academicYearId: "year-2",
  },
  {
    id: "subject-human-resource-management",
    name: "Human Resource Management",
    slug: "human-resource-management",
    code: "MGT-225",
    courseId: "course-honours",
    departmentId: "dept-management",
    academicYearId: "year-2",
  },
  {
    id: "subject-history-of-english-literature",
    name: "History of English Literature",
    slug: "history-of-english-literature",
    code: "ENG-121",
    courseId: "course-honours",
    departmentId: "dept-english",
    academicYearId: "year-1",
  },
  {
    id: "subject-poetry-and-prose",
    name: "Poetry and Prose",
    slug: "poetry-and-prose",
    code: "ENG-214",
    courseId: "course-honours",
    departmentId: "dept-english",
    academicYearId: "year-2",
  },
];

const notices: Notice[] = [
  {
    id: "notice-honours-form-fill-up-july-2026",
    slug: "honours-form-fill-up-july-2026",
    title: "Honours 2nd Year form fill-up opens from 12 July 2026",
    summary: "National University has published the Honours 2nd Year form fill-up notice for affiliated colleges.",
    description:
      "Students of Honours 2nd Year should complete form fill-up between 12 July and 24 July 2026. College-level verification must be completed before final submission.",
    category: "Form Fill-up",
    courseId: "course-honours",
    departmentId: "dept-management",
    academicYearId: "year-2",
    verified: true,
    publishedAt: "2026-07-02",
    fileUrl: "/mock-files/notice-board.svg",
    fileName: "form-fill-up-notice.svg",
    fileType: "image/svg+xml",
    officialSourceUrl: "https://www.nu.ac.bd/",
  },
  {
    id: "notice-accounting-incourse-schedule",
    slug: "accounting-incourse-schedule",
    title: "Accounting in-course assessment schedule published",
    summary: "Updated assessment dates for Accounting 1st Year regular students.",
    description:
      "The department assessment notice includes viva and tutorial submission dates for ACC-111 and ACC-123.",
    category: "Academic",
    courseId: "course-honours",
    departmentId: "dept-accounting",
    academicYearId: "year-1",
    verified: true,
    publishedAt: "2026-06-28",
    fileUrl: "/mock-files/notice-board.svg",
    fileName: "accounting-assessment.svg",
    fileType: "image/svg+xml",
    officialSourceUrl: "https://www.nu.ac.bd/",
  },
  {
    id: "notice-english-library-hours",
    slug: "english-library-hours",
    title: "English department extended library reading hours",
    summary: "The college library has extended reading room support for English Honours students.",
    description:
      "Reading room access is available until 7:00 PM on weekdays for English Honours students preparing for term assessments.",
    category: "General",
    courseId: "course-honours",
    departmentId: "dept-english",
    academicYearId: "year-1",
    verified: false,
    publishedAt: "2026-06-21",
    fileUrl: "/mock-files/library-hours.svg",
    fileName: "library-hours.svg",
    fileType: "image/svg+xml",
  },
];

const routines: Routine[] = [
  {
    id: "routine-honours-second-year-final-2026",
    slug: "honours-second-year-final-2026",
    title: "Honours 2nd Year Final Examination Routine 2026",
    summary: "Routine for Honours 2nd Year final examinations across NU affiliated colleges.",
    courseId: "course-honours",
    academicYearId: "year-2",
    departmentId: "dept-management",
    examType: "Final",
    examStartDate: "2026-08-03",
    examEndDate: "2026-08-17",
    verified: true,
    publishedAt: "2026-06-25",
    fileUrl: "/mock-files/sample-document.pdf",
    fileName: "honours-2nd-year-final-routine.pdf",
    fileType: "application/pdf",
  },
  {
    id: "routine-english-tutorial-july-2026",
    slug: "english-tutorial-july-2026",
    title: "English 1st Year tutorial routine for July 2026",
    summary: "Internal tutorial assessment routine for Poetry and Prose preparation.",
    courseId: "course-honours",
    academicYearId: "year-1",
    departmentId: "dept-english",
    examType: "Tutorial",
    examStartDate: "2026-07-10",
    examEndDate: "2026-07-15",
    verified: false,
    publishedAt: "2026-07-01",
    fileUrl: "/mock-files/routine-sheet.svg",
    fileName: "english-tutorial-routine.svg",
    fileType: "image/svg+xml",
  },
];

const syllabusItems: Syllabus[] = [
  {
    id: "syllabus-acc-111",
    slug: "syllabus-acc-111",
    title: "Principles of Accounting syllabus",
    summary: "Detailed unit-wise syllabus for ACC-111.",
    courseId: "course-honours",
    departmentId: "dept-accounting",
    academicYearId: "year-1",
    subjectId: "subject-principles-of-accounting",
    subjectCode: "ACC-111",
    subjectTitle: "Principles of Accounting",
    verified: true,
    publishedAt: "2026-02-05",
    fileUrl: "/mock-files/sample-document.pdf",
    fileName: "acc-111-syllabus.pdf",
    fileType: "application/pdf",
  },
  {
    id: "syllabus-mgt-211",
    slug: "syllabus-mgt-211",
    title: "Principles of Management syllabus",
    summary: "Core concepts, theories, and case-based units for MGT-211.",
    courseId: "course-honours",
    departmentId: "dept-management",
    academicYearId: "year-2",
    subjectId: "subject-management-principles",
    subjectCode: "MGT-211",
    subjectTitle: "Principles of Management",
    verified: true,
    publishedAt: "2026-02-11",
    fileUrl: "/mock-files/sample-document.pdf",
    fileName: "mgt-211-syllabus.pdf",
    fileType: "application/pdf",
  },
  {
    id: "syllabus-eng-121",
    slug: "syllabus-eng-121",
    title: "History of English Literature syllabus",
    summary: "Coverage plan for English literary periods and major texts.",
    courseId: "course-honours",
    departmentId: "dept-english",
    academicYearId: "year-1",
    subjectId: "subject-history-of-english-literature",
    subjectCode: "ENG-121",
    subjectTitle: "History of English Literature",
    verified: false,
    publishedAt: "2026-01-30",
    fileUrl: "/mock-files/syllabus-page.svg",
    fileName: "eng-121-syllabus.svg",
    fileType: "image/svg+xml",
  },
];

const questions: Question[] = [
  {
    id: "question-acc-111-2024",
    slug: "acc-111-2024",
    title: "ACC-111 Principles of Accounting question 2024",
    summary: "Previous year question paper for Honours 1st Year Accounting.",
    courseId: "course-honours",
    departmentId: "dept-accounting",
    academicYearId: "year-1",
    subjectId: "subject-principles-of-accounting",
    examYear: 2024,
    verified: true,
    publishedAt: "2026-05-12",
    fileUrl: "/mock-files/sample-document.pdf",
    fileName: "acc-111-question-2024.pdf",
    fileType: "application/pdf",
  },
  {
    id: "question-acc-123-2023",
    slug: "acc-123-2023",
    title: "ACC-123 Business Mathematics question 2023",
    summary: "Solved-friendly scan of the 2023 Business Mathematics final paper.",
    courseId: "course-honours",
    departmentId: "dept-accounting",
    academicYearId: "year-1",
    subjectId: "subject-business-math",
    examYear: 2023,
    verified: true,
    publishedAt: "2026-04-18",
    fileUrl: "/mock-files/question-paper.svg",
    fileName: "acc-123-question-2023.svg",
    fileType: "image/svg+xml",
  },
  {
    id: "question-mgt-211-2024",
    slug: "mgt-211-2024",
    title: "MGT-211 Principles of Management question 2024",
    summary: "NU Honours 2nd Year question paper for management theory and concepts.",
    courseId: "course-honours",
    departmentId: "dept-management",
    academicYearId: "year-2",
    subjectId: "subject-management-principles",
    examYear: 2024,
    verified: false,
    publishedAt: "2026-05-27",
    fileUrl: "/mock-files/sample-document.pdf",
    fileName: "mgt-211-question-2024.pdf",
    fileType: "application/pdf",
  },
  {
    id: "question-eng-121-2022",
    slug: "eng-121-2022",
    title: "ENG-121 History of English Literature question 2022",
    summary: "Archived question paper for period-based literature topics.",
    courseId: "course-honours",
    departmentId: "dept-english",
    academicYearId: "year-1",
    subjectId: "subject-history-of-english-literature",
    examYear: 2022,
    verified: true,
    publishedAt: "2026-03-21",
    fileUrl: "/mock-files/question-paper.svg",
    fileName: "eng-121-question-2022.svg",
    fileType: "image/svg+xml",
  },
];

const resources: Resource[] = [
  {
    id: "resource-acc-111-short-questions",
    slug: "acc-111-short-questions",
    title: "ACC-111 short questions collection",
    summary: "Important short questions for ledger, journal, and trial balance.",
    description:
      "A concise list of frequently repeated short questions prepared from previous NU exam patterns.",
    courseId: "course-honours",
    departmentId: "dept-accounting",
    academicYearId: "year-1",
    subjectId: "subject-principles-of-accounting",
    resourceType: "short_questions",
    verified: true,
    publishedAt: "2026-06-08",
    fileUrl: "/mock-files/sample-document.pdf",
    fileName: "acc-111-short-questions.pdf",
    fileType: "application/pdf",
  },
  {
    id: "resource-mgt-211-model-questions",
    slug: "mgt-211-model-questions",
    title: "MGT-211 model questions set",
    summary: "Model questions covering planning, organizing, and motivation theories.",
    description:
      "Useful before finals. Includes chapter-wise long and short question prompts based on recurring topics.",
    courseId: "course-honours",
    departmentId: "dept-management",
    academicYearId: "year-2",
    subjectId: "subject-management-principles",
    resourceType: "model_questions",
    verified: false,
    publishedAt: "2026-06-18",
    fileUrl: "/mock-files/model-question.svg",
    fileName: "mgt-211-model-question.svg",
    fileType: "image/svg+xml",
  },
  {
    id: "resource-eng-121-notes",
    slug: "eng-121-notes",
    title: "ENG-121 class notes bundle",
    summary: "Topic-wise notes on Old English to Victorian literary periods.",
    description:
      "Curated notes collected from teachers and verified student contributors for faster revision.",
    courseId: "course-honours",
    departmentId: "dept-english",
    academicYearId: "year-1",
    subjectId: "subject-history-of-english-literature",
    resourceType: "notes",
    verified: true,
    publishedAt: "2026-05-30",
    fileUrl: "/mock-files/notes-pack.svg",
    fileName: "eng-121-notes.svg",
    fileType: "image/svg+xml",
  },
];

type EnrichedFields = {
  courseName: string | undefined;
  departmentName: string | undefined;
  academicYearName: string | undefined;
  subjectName: string | undefined;
  subjectCode: string | undefined;
};

function enrich<
  T extends {
    courseId?: string;
    departmentId?: string;
    academicYearId?: string;
    subjectId?: string;
    subjectCode?: string;
  },
>(item: T): T & EnrichedFields {
  const course = courses.find(({ id }) => id === item.courseId);
  const department = departments.find(({ id }) => id === item.departmentId);
  const year = academicYears.find(({ id }) => id === item.academicYearId);
  const subject = subjects.find(({ id }) => id === item.subjectId);

  return {
    ...item,
    courseName: course?.name,
    departmentName: department?.name,
    academicYearName: year?.name,
    subjectName: subject?.name,
    subjectCode: item.subjectCode ?? subject?.code,
  };
}

function matchesText(value: string | undefined, search: string | undefined) {
  if (!search) {
    return true;
  }

  return value?.toLowerCase().includes(search.toLowerCase()) ?? false;
}

function filterCollection<T extends Record<string, unknown>>(items: T[], filters: FilterParams) {
  return items.filter((item) => {
    const itemRecord = item as Record<string, string | number | boolean | undefined>;

    if (filters.courseId && itemRecord.courseId !== filters.courseId) return false;
    if (filters.departmentId && itemRecord.departmentId !== filters.departmentId) return false;
    if (filters.academicYearId && itemRecord.academicYearId !== filters.academicYearId) return false;
    if (filters.subjectId && itemRecord.subjectId !== filters.subjectId) return false;
    if (filters.category && itemRecord.category !== filters.category) return false;
    if (filters.resourceType && itemRecord.resourceType !== filters.resourceType) return false;
    if (filters.examType && itemRecord.examType !== filters.examType) return false;
    if (filters.examYear && String(itemRecord.examYear) !== filters.examYear) return false;
    if (filters.date && String(itemRecord.publishedAt) !== filters.date) return false;
    if (
      filters.search &&
      ![
        itemRecord.title,
        itemRecord.summary,
        itemRecord.subjectName,
        itemRecord.subjectCode,
        itemRecord.examYear,
      ]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(filters.search!.toLowerCase()))
    ) {
      return false;
    }

    return true;
  });
}

function paginate<T>(items: T[], page = 1, limit = 6): PaginatedResponse<T> {
  const start = (page - 1) * limit;
  const paginated = items.slice(start, start + limit);

  return {
    items: paginated,
    page,
    limit,
    total: items.length,
    totalPages: Math.max(1, Math.ceil(items.length / limit)),
  };
}

export function getMockLookups(): LookupBundle {
  return {
    courses,
    departments,
    academicYears,
    subjects,
  };
}

export function getMockCollection<T>(kind: string, filters: FilterParams = {}): PaginatedResponse<T> {
  const page = Number(filters.page ?? "1");
  const limit = Number(filters.limit ?? "6");

  const collections: Record<string, unknown[]> = {
    notices: notices.map(enrich),
    routines: routines.map(enrich),
    syllabus: syllabusItems.map(enrich),
    questions: questions.map(enrich),
    resources: resources.map(enrich),
  };

  const collection = collections[kind] ?? [];
  const filtered = filterCollection(collection as Record<string, unknown>[], filters);
  return paginate(filtered as T[], page, limit);
}

export function getMockDetail<T>(kind: string, slug: string): T | null {
  const collections: Record<string, unknown[]> = {
    notices: notices.map(enrich),
    routines: routines.map(enrich),
    syllabus: syllabusItems.map(enrich),
    questions: questions.map(enrich),
    resources: resources.map(enrich),
  };

  return ((collections[kind] ?? []) as Array<{ slug: string }>).find((item) => item.slug === slug) as T | null;
}

export function getMockSearch(query: string): SearchResults {
  const normalizedQuery = query.toLowerCase();

  const pick = <T extends { title: string; summary: string; subjectName?: string; subjectCode?: string }>(
    items: T[],
  ) =>
    items.filter((item) =>
      [item.title, item.summary, item.subjectName, item.subjectCode]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(normalizedQuery)),
    );

  return {
    notices: pick(notices.map(enrich)),
    routines: pick(routines.map(enrich)),
    syllabus: pick(syllabusItems.map(enrich)),
    questions: pick(questions.map(enrich)),
    resources: pick(resources.map(enrich)),
  };
}

export function getHomeHighlights() {
  const latestNotices = [...notices.map(enrich)].sort((a, b) =>
    String(b.publishedAt).localeCompare(String(a.publishedAt)),
  );
  const latestQuestions = [...questions.map(enrich)].sort((a, b) =>
    String(b.publishedAt).localeCompare(String(a.publishedAt)),
  );

  const popularDepartments = departments.map((department) => {
    const totalItems =
      notices.filter((item) => item.departmentId === department.id).length +
      questions.filter((item) => item.departmentId === department.id).length +
      resources.filter((item) => item.departmentId === department.id).length;

    return {
      ...department,
      totalItems,
    };
  });

  return {
    latestNotices: latestNotices.slice(0, 3),
    latestQuestions: latestQuestions.slice(0, 3),
    popularDepartments: popularDepartments.sort((a, b) => b.totalItems - a.totalItems),
  };
}

export async function submitMockStudentRequest(payload: StudentRequestPayload) {
  return {
    success: true,
    message: `Request received for ${payload.subjectText ?? payload.subjectId ?? "the selected subject"}.`,
  };
}

export function getRelatedQuestions(slug: string): Array<Question & EnrichedFields> {
  const source = questions.map(enrich);
  const current = source.find((item) => item.slug === slug);

  if (!current) {
    return [];
  }

  return source
    .filter((item) => item.slug !== slug)
    .filter(
      (item) =>
        item.departmentId === current.departmentId ||
        item.subjectId === current.subjectId ||
        matchesText(item.title, current.subjectName),
    )
    .slice(0, 3);
}

export function getRelatedResources(slug: string): Array<Resource & EnrichedFields> {
  const source = resources.map(enrich);
  const current = source.find((item) => item.slug === slug);

  if (!current) {
    return [];
  }

  return source
    .filter((item) => item.slug !== slug)
    .filter(
      (item) =>
        item.departmentId === current.departmentId ||
        item.subjectId === current.subjectId ||
        matchesText(item.title, current.subjectName),
    )
    .slice(0, 3);
}
