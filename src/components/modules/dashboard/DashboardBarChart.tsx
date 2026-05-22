import { cn } from "@/lib/utils";
import { DashboardChartPoint } from "@/lib/dashboard";

interface DashboardBarChartProps {
  title: string;
  data?: DashboardChartPoint[];
  badge?: string;
  subtitle?: string;
  valueLabel?: string;
  emptyLabel?: string;
  className?: string;
}

export default function DashboardBarChart({
  title,
  data = [],
  badge,
  subtitle,
  valueLabel = "orders",
  emptyLabel = "No orders yet",
  className,
}: DashboardBarChartProps) {
  const maxValue = Math.max(...data.map((point) => point.value), 0);
  const hasData = maxValue > 0;
  const minWidth = Math.max(data.length * 44, 520);

  return (
    <section
      className={cn(
        "rounded-lg border border-fh-cream-dark bg-white p-6",
        className,
      )}
    >
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="font-semibold text-fh-green-deep">{title}</h2>
          {subtitle && (
            <p className="mt-1 text-sm text-fh-green-muted">{subtitle}</p>
          )}
        </div>
        {badge && (
          <span className="w-fit rounded-full bg-green-50 px-2.5 py-1 text-xs font-semibold text-green-600">
            {badge}
          </span>
        )}
      </div>

      <div className="overflow-x-auto pb-1">
        <div
          role="img"
          aria-label={`${title} chart`}
          className="relative flex h-56 items-end gap-2 border-b border-fh-cream-dark px-1 pt-3"
          style={{ minWidth }}
        >
          {!hasData && (
            <div className="absolute inset-0 flex items-center justify-center pb-8 text-sm font-medium text-fh-green-muted">
              {emptyLabel}
            </div>
          )}

          {data.map((point) => {
            const percentage = maxValue
              ? Math.max((point.value / maxValue) * 100, point.value ? 10 : 2)
              : 2;
            const label = point.description || point.label;

            return (
              <div
                key={`${label}-${point.label}`}
                className="flex h-full min-w-9 flex-1 flex-col items-center justify-end"
                title={`${label}: ${point.value} ${valueLabel}`}
              >
                <span className="mb-2 h-4 text-xs font-semibold text-fh-green-deep">
                  {point.value > 0 ? point.value : ""}
                </span>
                <div className="flex h-40 w-full items-end justify-center">
                  <div
                    aria-label={`${label}: ${point.value} ${valueLabel}`}
                    className={cn(
                      "w-full max-w-8 rounded-t-md transition-all duration-500",
                      point.value
                        ? "bg-linear-to-t from-fh-green-deep to-fh-green-muted hover:from-fh-coral hover:to-fh-coral-light"
                        : "bg-fh-cream-dark",
                    )}
                    style={{ height: `${percentage}%` }}
                  />
                </div>
                <span className="mt-2 h-4 text-xs text-fh-green-muted">
                  {point.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
