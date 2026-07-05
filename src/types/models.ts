export type Option = {
  id: string;
  name: string;
  slug: string;
};

export type Course = Option;

export type Department = Option & {
  code: string;
};

export type AcademicYear = Option & {
  order: number;
};

export type Subject = Option & {
  code: string;
  courseId: string;
  departmentId: string;
  academicYearId: string;
};

export type PaginationMeta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type PaginatedResponse<T> = PaginationMeta & {
  items: T[];
};

export type BaseEntity = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  description?: string;
  courseId?: string;
  departmentId?: string;
  academicYearId?: string;
  subjectId?: string;
  courseName?: string;
  departmentName?: string;
  academicYearName?: string;
  subjectName?: string;
  subjectCode?: string;
  verified?: boolean;
  publishedAt?: string;
  fileUrl?: string;
  fileName?: string;
  fileType?: string;
};

export type Notice = BaseEntity & {
  category: string;
  officialSourceUrl?: string;
};

export type Routine = BaseEntity & {
  examType: string;
  examStartDate: string;
  examEndDate: string;
};

export type Syllabus = BaseEntity & {
  subjectTitle?: string;
};

export type Question = BaseEntity & {
  examYear: number;
};

export type ResourceType =
  | "notes"
  | "suggestions"
  | "short_questions"
  | "important_topics"
  | "model_questions";

export type Resource = BaseEntity & {
  resourceType: ResourceType;
};

export type SearchResults = {
  notices: Notice[];
  routines: Routine[];
  syllabus: Syllabus[];
  questions: Question[];
  resources: Resource[];
};

export type FilterParams = {
  courseId?: string;
  departmentId?: string;
  academicYearId?: string;
  subjectId?: string;
  category?: string;
  resourceType?: string;
  examType?: string;
  examYear?: string;
  search?: string;
  date?: string;
  page?: string;
  limit?: string;
};

export type StudentRequestPayload = {
  name?: string;
  courseId?: string;
  departmentId?: string;
  academicYearId?: string;
  subjectId?: string;
  courseText?: string;
  departmentText?: string;
  yearText?: string;
  subjectText?: string;
  whatTheyNeed: string;
  message: string;
};

export type LookupBundle = {
  courses: Course[];
  departments: Department[];
  academicYears: AcademicYear[];
  subjects: Subject[];
};
