import { cn } from "@/lib/utils";

type VerifiedBadgeProps = {
  verified?: boolean;
  className?: string;
};

export function VerifiedBadge({ verified, className }: VerifiedBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold",
        verified
          ? "bg-emerald-100 text-emerald-700"
          : "bg-amber-100 text-amber-700",
        className,
      )}
    >
      {verified ? "Verified" : "Unverified"}
    </span>
  );
}
