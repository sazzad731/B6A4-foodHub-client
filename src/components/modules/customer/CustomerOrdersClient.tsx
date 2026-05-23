"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Eye, ShoppingBag, Star, TrendingUp, Wallet } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DashboardHeader from "@/components/modules/dashboard/DashboardHeader";
import StatCard from "@/components/modules/dashboard/StatCard";
import OrderStatusBadge from "@/components/modules/dashboard/OrderStatusBadge";
import { formatCurrency, formatDate } from "@/lib/format";
import { cancelOrder as cancelCustomerOrder } from "@/services/orders";
import { TOrder } from "@/types";

export default function CustomerOrdersClient({
  initialOrders,
}: {
  initialOrders: TOrder[];
}) {
  const [orders, setOrders] = useState(initialOrders);
  const [filter, setFilter] = useState("ALL");

  const filtered = useMemo(
    () =>
      filter === "ALL"
        ? orders
        : orders.filter((order) => order.status === filter),
    [filter, orders],
  );
  const delivered = orders.filter((order) => order.status === "DELIVERED");
  const totalSpent = delivered.reduce(
    (sum, order) => sum + Number(order.totalPrice || 0),
    0,
  );

  const cancelOrder = async (id: string) => {
    const result = await cancelCustomerOrder(id);

    if (!result.success || !result.data) {
      toast.error(result.message || "Unable to cancel order.");
      return;
    }

    setOrders((current) =>
      current.map((order) => (order.id === id ? result.data! : order)),
    );
    toast.success("Order cancelled.");
  };

  return (
    <div>
      <DashboardHeader
        title="My Orders"
        subtitle="Track and manage all your food orders"
        action={
          <Button asChild className="bg-fh-coral text-white hover:bg-fh-coral-hover">
            <Link href="/meals">New Order</Link>
          </Button>
        }
      />
      <div className="space-y-6 p-4 sm:p-6">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatCard
            label="Total Orders"
            value={orders.length}
            sub="All time"
            icon={ShoppingBag}
          />
          <StatCard
            label="Delivered"
            value={delivered.length}
            sub="Successful orders"
            icon={TrendingUp}
            iconBg="bg-green-50"
            iconColor="text-green-600"
          />
          <StatCard
            label="Avg. Rating"
            value="4.8"
            sub="After reviews"
            icon={Star}
            iconBg="bg-amber-50"
            iconColor="text-amber-600"
          />
          <StatCard
            label="Total Spent"
            value={formatCurrency(totalSpent)}
            sub="Delivered orders"
            icon={Wallet}
            iconBg="bg-purple-50"
            iconColor="text-purple-600"
          />
        </div>

        <div className="overflow-hidden rounded-xl border border-fh-cream-dark bg-white">
          <div className="flex items-center justify-between gap-4 border-b border-fh-cream-dark p-5">
            <h2 className="font-semibold text-fh-green-deep">Order History</h2>
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="h-9 w-40 text-sm">
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
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-fh-cream-dark bg-fh-cream/50">
                  {[
                    "Order ID",
                    "Restaurant",
                    "Items",
                    "Total",
                    "Status",
                    "Date",
                    "Action",
                  ].map((heading) => (
                    <th
                      key={heading}
                      className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-fh-green-muted"
                    >
                      {heading}
                    </th>
                  ))}
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
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-fh-green-soft text-xs font-bold text-white">
                          {order.provider?.restaurantName?.[0] || "F"}
                        </div>
                        <span className="font-medium text-fh-green-deep">
                          {order.provider?.restaurantName || "FoodHub"}
                        </span>
                      </div>
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
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <Button
                          asChild
                          variant="ghost"
                          size="sm"
                          className="h-8 gap-1.5 text-fh-green-muted hover:text-fh-green-deep"
                        >
                          <Link href={`/dashboard/orders/${order.id}`}>
                            <Eye className="h-3.5 w-3.5" />
                            View
                          </Link>
                        </Button>
                        {order.status === "PLACED" && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 border-red-200 text-red-500 hover:bg-red-50"
                            onClick={() => cancelOrder(order.id)}
                          >
                            Cancel
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 && (
            <div className="py-14 text-center text-fh-green-muted">
              <ShoppingBag className="mx-auto mb-3 h-10 w-10 opacity-30" />
              <p className="font-medium">No orders found</p>
              <p className="mt-1 text-sm">
                Try changing the filter or place a new order.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
