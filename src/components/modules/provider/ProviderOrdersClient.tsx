"use client";

import { useMemo, useState } from "react";
import { Check, Clock, Truck } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import DashboardHeader from "@/components/modules/dashboard/DashboardHeader";
import OrderStatusBadge from "@/components/modules/dashboard/OrderStatusBadge";
import { formatCurrency } from "@/lib/format";
import { updateOrderStatus } from "@/services/orders";
import { TOrder, TOrderStatus } from "@/types";

const TRANSITIONS: Partial<Record<TOrderStatus, TOrderStatus>> = {
  PLACED: "PREPARING",
  PREPARING: "READY",
  READY: "DELIVERED",
};

const NEXT_LABELS: Partial<Record<TOrderStatus, string>> = {
  PLACED: "Start Preparing",
  PREPARING: "Mark Ready",
  READY: "Mark Delivered",
};

export default function ProviderOrdersClient({
  initialOrders,
}: {
  initialOrders: TOrder[];
}) {
  const [orders, setOrders] = useState(initialOrders);

  const grouped = useMemo(
    () => ({
      PLACED: orders.filter((order) => order.status === "PLACED"),
      PREPARING: orders.filter((order) => order.status === "PREPARING"),
      READY: orders.filter((order) => order.status === "READY"),
      DELIVERED: orders.filter((order) => order.status === "DELIVERED"),
      CANCELLED: orders.filter((order) => order.status === "CANCELLED"),
    }),
    [orders],
  );

  const advance = async (id: string, current: TOrderStatus) => {
    const next = TRANSITIONS[current];

    if (!next) {
      return;
    }

    const result = await updateOrderStatus(id, next);

    if (!result.success || !result.data) {
      toast.error(result.message || "Unable to update order.");
      return;
    }

    setOrders((items) =>
      items.map((order) => (order.id === id ? result.data! : order)),
    );
    toast.success("Order status updated.");
  };

  return (
    <div>
      <DashboardHeader
        title="Manage Orders"
        subtitle="Update order status in real time"
      />
      <div className="space-y-6 p-4 sm:p-6">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
          {[
            ["Placed", "PLACED", "bg-blue-50 text-blue-700"],
            ["Preparing", "PREPARING", "bg-amber-50 text-amber-700"],
            ["Ready", "READY", "bg-purple-50 text-purple-700"],
            ["Delivered", "DELIVERED", "bg-green-50 text-green-700"],
            ["Cancelled", "CANCELLED", "bg-red-50 text-red-600"],
          ].map(([label, key, className]) => (
            <div key={key} className={`rounded-xl p-3.5 text-center ${className}`}>
              <p className="font-display text-2xl font-bold">
                {grouped[key as TOrderStatus]?.length ?? 0}
              </p>
              <p className="mt-0.5 text-xs font-semibold uppercase tracking-wide">
                {label}
              </p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          {(["PLACED", "PREPARING", "READY"] as TOrderStatus[]).map((status) => (
            <div
              key={status}
              className="overflow-hidden rounded-xl border border-fh-cream-dark bg-white"
            >
              <div className="flex items-center justify-between border-b border-fh-cream-dark px-5 py-3.5">
                <OrderStatusBadge status={status} />
                <span className="text-sm font-bold text-fh-green-deep">
                  {grouped[status]?.length ?? 0}
                </span>
              </div>
              <div className="min-h-30 space-y-3 p-3">
                {(grouped[status] ?? []).length === 0 && (
                  <div className="py-8 text-center text-sm text-fh-green-light">
                    No orders
                  </div>
                )}
                {(grouped[status] ?? []).map((order) => (
                  <div
                    key={order.id}
                    className="space-y-3 rounded-xl border border-fh-cream-dark p-4 transition-colors hover:border-fh-green-light"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-fh-green-deep">
                        {order.id.slice(0, 8)}
                      </span>
                      <span className="text-xs text-fh-green-muted">
                        {new Date(order.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-fh-green-deep">
                      {order.customer?.name || "Customer"}
                    </p>
                    <div className="space-y-0.5">
                      {order.items.map((item) => (
                        <p key={item.id} className="text-xs text-fh-green-muted">
                          {item.mealName} x{item.quantity}
                        </p>
                      ))}
                    </div>
                    <div className="flex items-center justify-between border-t border-fh-cream-dark pt-1">
                      <span className="font-display text-base font-bold text-fh-coral">
                        {formatCurrency(order.totalPrice)}
                      </span>
                      <Button
                        size="sm"
                        className="h-7 gap-1 bg-fh-green-deep text-xs text-white hover:bg-fh-green-mid"
                        onClick={() => advance(order.id, status)}
                      >
                        {status === "PLACED" ? (
                          <Clock className="h-3 w-3" />
                        ) : status === "PREPARING" ? (
                          <Check className="h-3 w-3" />
                        ) : (
                          <Truck className="h-3 w-3" />
                        )}
                        {NEXT_LABELS[status]}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="overflow-hidden rounded-xl border border-fh-cream-dark bg-white">
          <div className="border-b border-fh-cream-dark px-5 py-4">
            <h2 className="font-semibold text-fh-green-deep">Completed Orders</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-fh-cream-dark bg-fh-cream/50">
                  {["Order", "Customer", "Items", "Total", "Status", "Time"].map(
                    (heading) => (
                      <th
                        key={heading}
                        className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-fh-green-muted"
                      >
                        {heading}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody>
                {[...grouped.DELIVERED, ...grouped.CANCELLED].map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-fh-cream-dark transition-colors hover:bg-fh-cream/30"
                  >
                    <td className="px-5 py-3.5 font-mono text-xs font-medium text-fh-green-deep">
                      {order.id.slice(0, 8)}
                    </td>
                    <td className="px-5 py-3.5 font-medium text-fh-green-deep">
                      {order.customer?.name || "Customer"}
                    </td>
                    <td className="px-5 py-3.5 text-fh-green-muted">
                      {order.items
                        .map((item) => `${item.mealName} x${item.quantity}`)
                        .join(", ")}
                    </td>
                    <td className="px-5 py-3.5 font-display font-bold text-fh-green-deep">
                      {formatCurrency(order.totalPrice)}
                    </td>
                    <td className="px-5 py-3.5">
                      <OrderStatusBadge status={order.status} />
                    </td>
                    <td className="px-5 py-3.5 text-xs text-fh-green-muted">
                      {new Date(order.updatedAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
