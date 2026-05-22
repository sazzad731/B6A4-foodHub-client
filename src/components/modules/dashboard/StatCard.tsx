import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string | number;
  sub?: string;
  icon: LucideIcon;
  trend?: { value: string; up: boolean };
  iconBg?: string;
  iconColor?: string;
}

export default function StatCard({
  label,
  value,
  sub,
  icon: Icon,
  trend,
  iconBg = "bg-fh-coral/10",
  iconColor = "text-fh-coral",
}: StatCardProps) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-xl border border-fh-cream-dark bg-white p-5">
      <div>
        <p className="mb-1 text-sm font-medium text-fh-green-muted">{label}</p>
        <p className="font-display text-3xl font-bold tracking-tight text-fh-green-deep">
          {value}
        </p>
        {sub && <p className="mt-1 text-xs text-fh-green-light">{sub}</p>}
        {trend && (
          <p
            className={cn(
              "mt-2 text-xs font-medium",
              trend.up ? "text-green-600" : "text-red-500",
            )}
          >
            {trend.up ? "Up" : "Down"} {trend.value}
          </p>
        )}
      </div>
      <div
        className={cn(
          "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl",
          iconBg,
        )}
      >
        <Icon className={cn("h-5 w-5", iconColor)} />
      </div>
    </div>
  );
}
