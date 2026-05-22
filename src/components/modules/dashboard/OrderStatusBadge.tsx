import { cn } from "@/lib/utils";
import { TOrderStatus } from "@/types";

const STATUS_STYLES: Record<TOrderStatus, string> = {
  PLACED: "border-blue-200 bg-blue-50 text-blue-700",
  PREPARING: "border-amber-200 bg-amber-50 text-amber-700",
  READY: "border-purple-200 bg-purple-50 text-purple-700",
  DELIVERED: "border-green-200 bg-green-50 text-green-700",
  CANCELLED: "border-red-200 bg-red-50 text-red-600",
};

const STATUS_LABELS: Record<TOrderStatus, string> = {
  PLACED: "Placed",
  PREPARING: "Preparing",
  READY: "Ready",
  DELIVERED: "Delivered",
  CANCELLED: "Cancelled",
};

export default function OrderStatusBadge({ status }: { status: TOrderStatus }) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold",
        STATUS_STYLES[status],
      )}
    >
      {STATUS_LABELS[status]}
    </span>
  );
}
