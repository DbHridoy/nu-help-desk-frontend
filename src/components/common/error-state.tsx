type ErrorStateProps = {
  title?: string;
  description: string;
};

export function ErrorState({
  title = "Something went wrong",
  description,
}: ErrorStateProps) {
  return (
    <div className="rounded-[2rem] border border-rose-200 bg-rose-50 p-8 text-center">
      <h3 className="text-xl font-semibold text-rose-900">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-rose-700">{description}</p>
    </div>
  );
}
