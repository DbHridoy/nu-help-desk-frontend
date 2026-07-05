export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function formatDate(date: string | undefined, options?: Intl.DateTimeFormatOptions) {
  if (!date) {
    return "Date unavailable";
  }

  return new Intl.DateTimeFormat("en-BD", {
    day: "numeric",
    month: "short",
    year: "numeric",
    ...options,
  }).format(new Date(date));
}

export function titleCase(value: string) {
  return value
    .split(/[-_\s]+/)
    .map((chunk) => chunk.charAt(0).toUpperCase() + chunk.slice(1))
    .join(" ");
}

export function truncate(value: string, maxLength: number) {
  if (value.length <= maxLength) {
    return value;
  }

  return `${value.slice(0, maxLength - 1)}…`;
}

export function fileExtension(fileUrl: string | undefined) {
  if (!fileUrl) {
    return "";
  }

  return fileUrl.split(".").pop()?.toLowerCase() ?? "";
}

export function buildAbsoluteUrl(path: string) {
  if (path.startsWith("http")) {
    return path;
  }

  return path;
}

export function getFileUrl(fileUrlOrPath?: string) {
  if (!fileUrlOrPath) {
    return "";
  }

  if (/^https?:\/\//i.test(fileUrlOrPath)) {
    return fileUrlOrPath;
  }

  const backendBase = (process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:5000/api").replace(/\/api$/, "");
  return `${backendBase}${fileUrlOrPath.startsWith("/") ? "" : "/"}${fileUrlOrPath}`;
}
