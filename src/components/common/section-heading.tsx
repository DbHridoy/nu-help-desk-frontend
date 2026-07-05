type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <div className="space-y-3">
      {eyebrow ? (
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">{eyebrow}</p>
      ) : null}
      <h2 className="font-display text-3xl font-semibold text-slate-900 md:text-4xl">{title}</h2>
      {description ? <p className="max-w-2xl text-sm leading-7 text-slate-600">{description}</p> : null}
    </div>
  );
}
