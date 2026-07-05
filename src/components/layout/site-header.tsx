import Link from "next/link";
import { quickLinks } from "@/features/catalog/config";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/70 bg-white/85 backdrop-blur-xl">
      <div className="container-shell flex items-center justify-between gap-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-700 text-sm font-bold text-white shadow-lg shadow-sky-200">
            NU
          </div>
          <div>
            <p className="text-sm font-semibold tracking-[0.16em] text-sky-700 uppercase">
              Student Help
            </p>
            <p className="font-display text-lg font-semibold text-slate-900">
              Public Resource Desk
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-5 text-sm font-medium text-slate-600 lg:flex">
          {quickLinks.slice(0, 5).map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-sky-700">
              {item.label}
            </Link>
          ))}
          <Link
            href="/request-resource"
            className="rounded-full bg-slate-900 px-4 py-2 text-white transition hover:bg-sky-700"
          >
            Request Resource
          </Link>
        </nav>
      </div>
    </header>
  );
}
