import { BaseEntity } from "@/types/models";
import { formatDate } from "@/lib/utils";
import { VerifiedBadge } from "@/components/common/verified-badge";

type DetailSidebarProps = {
  item: BaseEntity;
  extra?: Array<{ label: string; value: string | undefined }>;
};

export function DetailSidebar({ item, extra = [] }: DetailSidebarProps) {
  const rows = [
    { label: "Course", value: item.courseName },
    { label: "Department", value: item.departmentName },
    { label: "Academic year", value: item.academicYearName },
    { label: "Subject", value: item.subjectName },
    { label: "Published", value: formatDate(item.publishedAt) },
    ...extra,
  ].filter((entry) => entry.value);

  return (
    <aside className="surface-card rounded-[2rem] p-6">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold text-slate-900">Details</h2>
        {"verified" in item ? <VerifiedBadge verified={item.verified} /> : null}
      </div>
      <div className="mt-5 space-y-4">
        {rows.map((row) => (
          <div key={`${row.label}-${row.value}`} className="border-b border-slate-100 pb-4 last:border-b-0 last:pb-0">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">{row.label}</p>
            <p className="mt-1 text-sm leading-7 text-slate-700">{row.value}</p>
          </div>
        ))}
      </div>
    </aside>
  );
}
