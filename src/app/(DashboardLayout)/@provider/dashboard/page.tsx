import Link from "next/link";
import { DollarSign, ShoppingBag, Star, UtensilsCrossed } from "lucide-react";
import { Button } from "@/components/ui/button";
import DashboardHeader from "@/components/modules/dashboard/DashboardHeader";
import StatCard from "@/components/modules/dashboard/StatCard";
import OrderStatusBadge from "@/components/modules/dashboard/OrderStatusBadge";
import { getOrders } from "@/services/orders";
import { getCurrentProviderProfile } from "@/services/providers";
import { formatCurrency } from "@/lib/format";

export default async function ProviderDashboardPage() {
  const [{ data: provider }, { data: orders }] = await Promise.all([
    getCurrentProviderProfile(),
    getOrders(),
  ]);
  const meals = provider?.meals || [];
  const activeOrders = (orders || []).filter((order) =>
    ["PLACED", "PREPARING", "READY"].includes(order.status),
  );
  const deliveredRevenue = (orders || [])
    .filter((order) => order.status === "DELIVERED")
    .reduce((sum, order) => sum + Number(order.totalPrice || 0), 0);

  return (
    <div>
      <DashboardHeader
        title="Restaurant Dashboard"
        subtitle={`${provider?.restaurantName || "FoodHub Provider"} - ${provider?.address || "Bangladesh"}`}
        action={
          <Button asChild className="bg-fh-green-deep text-white hover:bg-fh-green-mid">
            <Link href="/dashboard/menu">Add Meal</Link>
          </Button>
        }
      />
      <div className="space-y-6 p-4 sm:p-6">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatCard
            label="Revenue"
            value={formatCurrency(deliveredRevenue)}
            sub="Delivered orders"
            icon={DollarSign}
            iconBg="bg-green-50"
            iconColor="text-green-600"
          />
          <StatCard
            label="Total Orders"
            value={orders?.length || 0}
            sub={`${activeOrders.length} active`}
            icon={ShoppingBag}
          />
          <StatCard
            label="Menu Items"
            value={meals.length}
            sub={`${meals.filter((meal) => meal.isAvailable).length} active`}
            icon={UtensilsCrossed}
            iconBg="bg-amber-50"
            iconColor="text-amber-600"
          />
          <StatCard
            label="Average Rating"
            value={`${provider?.avgRating || 0}`}
            sub="Customer reviews"
            icon={Star}
            iconBg="bg-yellow-50"
            iconColor="text-yellow-500"
          />
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="overflow-hidden rounded-xl border border-fh-cream-dark bg-white lg:col-span-2">
            <div className="flex items-center justify-between border-b border-fh-cream-dark p-5">
              <h2 className="font-semibold text-fh-green-deep">Live Orders</h2>
              <div className="flex items-center gap-1.5 text-xs font-medium text-green-600">
                <span className="h-2 w-2 rounded-full bg-green-500" />
                {provider?.isOpen ? "Restaurant is open" : "Restaurant is closed"}
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-fh-cream-dark bg-fh-cream/50">
                    {["Order", "Customer", "Items", "Total", "Status"].map(
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
                  {activeOrders.slice(0, 6).map((order) => (
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
                    </tr>
                  ))}
                </tbody>
              </table>
              {activeOrders.length === 0 && (
                <div className="py-12 text-center text-fh-green-muted">
                  No live orders right now.
                </div>
              )}
            </div>
          </div>

          <div className="rounded-xl border border-fh-cream-dark bg-white p-5">
            <h2 className="mb-4 font-semibold text-fh-green-deep">
              Quick Metrics
            </h2>
            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="rounded-xl bg-fh-cream p-3">
                <p className="font-display text-lg font-bold text-fh-green-deep">
                  {meals[0]?.prepTime || 20}m
                </p>
                <p className="text-xs text-fh-green-muted">Avg. prep time</p>
              </div>
              <div className="rounded-xl bg-fh-cream p-3">
                <p className="font-display text-lg font-bold text-fh-green-deep">
                  {provider?.mealCount || meals.length}
                </p>
                <p className="text-xs text-fh-green-muted">Published meals</p>
              </div>
              <div className="rounded-xl bg-fh-cream p-3">
                <p className="font-display text-lg font-bold text-fh-green-deep">
                  {provider?.orderCount || orders?.length || 0}
                </p>
                <p className="text-xs text-fh-green-muted">Total orders</p>
              </div>
              <div className="rounded-xl bg-fh-cream p-3">
                <p className="font-display text-lg font-bold text-fh-green-deep">
                  {provider?.isOpen ? "Open" : "Closed"}
                </p>
                <p className="text-xs text-fh-green-muted">Store status</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
