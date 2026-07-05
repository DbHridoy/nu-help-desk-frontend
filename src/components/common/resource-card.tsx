import Link from "next/link";
import { BaseEntity } from "@/types/models";
import { formatDate, truncate } from "@/lib/utils";
import { VerifiedBadge } from "@/components/common/verified-badge";

type ResourceCardProps = {
  href: string;
  item: BaseEntity;
  meta: string[];
  eyebrow?: string;
  showVerified?: boolean;
  downloadUrl?: string;
};

export function ResourceCard({
  href,
  item,
  meta,
  eyebrow,
  showVerified = false,
  downloadUrl,
}: ResourceCardProps) {
  return (
    <article className="surface-card rounded-[2rem] p-6 transition duration-200 hover:-translate-y-0.5">
      <div className="flex items-start justify-between gap-4">
        <div>
          {eyebrow ? (
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">{eyebrow}</p>
          ) : null}
          <h3 className="mt-2 text-xl font-semibold text-slate-900">
            <Link href={href} className="transition hover:text-sky-700">
              {item.title}
            </Link>
          </h3>
        </div>
        {showVerified ? <VerifiedBadge verified={item.verified} /> : null}
      </div>

      <p className="mt-4 text-sm leading-7 text-slate-600">{truncate(item.summary, 150)}</p>

      <div className="mt-5 flex flex-wrap gap-2">
        {meta.map((entry) => (
          <span key={entry} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
            {entry}
          </span>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
        <p className="text-sm text-slate-500">{formatDate(item.publishedAt)}</p>
        <div className="flex flex-wrap gap-3">
          {downloadUrl ? (
            <a
              href={downloadUrl}
              download
              className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-sky-200 hover:text-sky-700"
            >
              Download
            </a>
          ) : null}
          <Link href={href} className="rounded-full bg-sky-700 px-4 py-2 text-sm font-semibold text-white">
            View details
          </Link>
        </div>
      </div>
    </article>
  );
}
