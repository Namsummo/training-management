import { Badge } from "@/components/ui/badge";
import clsx from "clsx";

export function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    available: "bg-green-100 text-green-700 border-green-200",
    active: "bg-green-100 text-green-700 border-green-200",
    limited: "bg-orange-100 text-orange-700 border-orange-200",
    unavailable: "bg-red-100 text-red-700 border-red-200",
    inactive: "bg-red-100 text-red-700 border-red-200",
    no_response: "bg-slate-100 text-slate-700 border-slate-200",
  };

  const label: Record<string, string> = {
    available: "Available",
    active: "Active",
    inactive: "Inactive",
    limited: "Limited (Injury)",
    unavailable: "Unavailable",
    no_response: "No Response",
  };

  return (
    <Badge
      variant="outline"
      className={clsx("rounded-full px-3 py-1", map[status])}
    >
      {label[status]}
    </Badge>
  );
}
