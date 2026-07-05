import Link from "next/link";
import { buildQueryString } from "@/lib/query";
import { PaginationMeta } from "@/types/models";

type PaginationProps = {
  basePath: string;
  pagination: PaginationMeta;
  params: Record<string, string | undefined>;
};

export function Pagination({ basePath, pagination, params }: PaginationProps) {
  if (pagination.totalPages <= 1) {
    return null;
  }

  const pages = Array.from({ length: pagination.totalPages }, (_, index) => index + 1);

  return (
    <div className="mt-8 flex flex-wrap items-center gap-3">
      {pages.map((page) => {
        const active = page === pagination.page;

        return (
          <Link
            key={page}
            href={`${basePath}${buildQueryString({ ...params, page })}`}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              active
                ? "bg-slate-900 text-white"
                : "border border-slate-200 bg-white text-slate-700 hover:border-slate-300"
            }`}
          >
            {page}
          </Link>
        );
      })}
    </div>
  );
}
