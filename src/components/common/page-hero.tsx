import { cn } from "@/lib/utils";

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  description: string;
  className?: string;
};

export function PageHero({ eyebrow, title, description, className }: PageHeroProps) {
  return (
    <section className={cn("container-shell pt-10 pb-8 md:pt-14", className)}>
      <div className="surface-card rounded-[2rem] p-8 md:p-10">
        {eyebrow ? (
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">{eyebrow}</p>
        ) : null}
        <h1 className="mt-3 max-w-3xl font-display text-4xl font-semibold text-slate-900 md:text-5xl">
          {title}
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 md:text-base">{description}</p>
      </div>
    </section>
  );
}
