"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DashboardHeader from "@/components/modules/dashboard/DashboardHeader";
import OrderStatusBadge from "@/components/modules/dashboard/OrderStatusBadge";
import { formatCurrency, formatDate, getInitials } from "@/lib/format";
import { TOrder, TOrderStatus } from "@/types";

export default function AdminOrdersClient({
  initialOrders,
}: {
  initialOrders: TOrder[];
}) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const filtered = useMemo(
    () =>
      initialOrders.filter((order) => {
        const matchesSearch =
          order.id.toLowerCase().includes(search.toLowerCase()) ||
          (order.customer?.name || "")
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          (order.provider?.restaurantName || "")
            .toLowerCase()
            .includes(search.toLowerCase());
        const matchesStatus =
          statusFilter === "ALL" || order.status === statusFilter;

        return matchesSearch && matchesStatus;
      }),
    [initialOrders, search, statusFilter],
  );

  const totalRevenue = initialOrders
    .filter((order) => order.status === "DELIVERED")
    .reduce((sum, order) => sum + Number(order.totalPrice || 0), 0);

  return (
    <div>
      <DashboardHeader
        title="All Orders"
        subtitle="Platform-wide order monitoring"
      />
      <div className="space-y-5 p-4 sm:p-6">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
          {(["PLACED", "PREPARING", "READY", "DELIVERED", "CANCELLED"] as TOrderStatus[]).map(
            (status) => {
              const count = initialOrders.filter(
                (order) => order.status === status,
              ).length;

              return (
                <button
                  key={status}
                  onClick={() =>
                    setStatusFilter(status === statusFilter ? "ALL" : status)
                  }
                  className={`rounded-xl border-2 p-4 text-center capitalize transition-all ${
                    statusFilter === status
                      ? "border-fh-coral bg-fh-coral/5"
                      : "border-transparent bg-white hover:border-fh-cream-dark"
                  }`}
                >
                  <OrderStatusBadge status={status} />
                  <p className="mt-2 font-display text-2xl font-bold text-fh-green-deep">
                    {count}
                  </p>
                </button>
              );
            },
          )}
        </div>

        <div className="flex items-center justify-between rounded-xl bg-fh-green-deep px-6 py-4 text-white">
          <p className="text-sm font-medium text-white/70">
            Delivered order revenue
          </p>
          <p className="font-display text-2xl font-bold">
            {formatCurrency(totalRevenue)}
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-fh-green-light" />
            <Input
              className="h-10 pl-9"
              placeholder="Search by order ID, customer, or restaurant"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="h-10 w-44 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Statuses</SelectItem>
              <SelectItem value="PLACED">Placed</SelectItem>
              <SelectItem value="PREPARING">Preparing</SelectItem>
              <SelectItem value="READY">Ready</SelectItem>
              <SelectItem value="DELIVERED">Delivered</SelectItem>
              <SelectItem value="CANCELLED">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="overflow-hidden rounded-xl border border-fh-cream-dark bg-white">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-fh-cream-dark bg-fh-cream/50">
                  {["Order ID", "Customer", "Restaurant", "Items", "Total", "Status", "Date"].map(
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
                {filtered.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-fh-cream-dark transition-colors hover:bg-fh-cream/30"
                  >
                    <td className="px-5 py-4 font-mono text-xs font-medium text-fh-green-deep">
                      {order.id.slice(0, 8)}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-fh-green-soft text-[10px] font-bold text-white">
                          {getInitials(order.customer?.name)}
                        </div>
                        <span className="font-medium text-fh-green-deep">
                          {order.customer?.name || "Customer"}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-fh-green-muted">
                      {order.provider?.restaurantName || "FoodHub"}
                    </td>
                    <td className="px-5 py-4 text-fh-green-muted">
                      {order.items
                        .map((item) => `${item.mealName} x${item.quantity}`)
                        .join(", ")}
                    </td>
                    <td className="px-5 py-4 font-display font-bold text-fh-green-deep">
                      {formatCurrency(order.totalPrice)}
                    </td>
                    <td className="px-5 py-4">
                      <OrderStatusBadge status={order.status} />
                    </td>
                    <td className="px-5 py-4 text-xs text-fh-green-muted">
                      {formatDate(order.createdAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 && (
            <div className="py-12 text-center text-fh-green-muted">
              No orders match your search.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
