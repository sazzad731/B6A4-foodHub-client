import { DollarSign, ShoppingBag, Users, UtensilsCrossed } from "lucide-react";
import DashboardHeader from "@/components/modules/dashboard/DashboardHeader";
import StatCard from "@/components/modules/dashboard/StatCard";
import OrderStatusBadge from "@/components/modules/dashboard/OrderStatusBadge";
import DashboardBarChart from "@/components/modules/dashboard/DashboardBarChart";
import { getOrders } from "@/services/orders";
import { getAllUsers } from "@/services/users";
import { getAllProviders } from "@/services/providers";
import { asNumber, formatCurrency, formatDate } from "@/lib/format";
import { buildCurrentMonthDailyOrderData } from "@/lib/dashboard";

export default async function AdminDashboardPage() {
  const [{ data: users }, { data: orders }, { data: providerData }] =
    await Promise.all([getAllUsers(), getOrders(), getAllProviders({ limit: "100" })]);
  const orderList = orders || [];
  const providers = providerData?.providers || [];
  const providerCount = providerData?.pagination?.total ?? providers.length;
  const deliveredOrders = orderList.filter(
    (order) => order.status === "DELIVERED",
  );
  const cancelledOrders = orderList.filter(
    (order) => order.status === "CANCELLED",
  );
  const activeOrders = orderList.filter((order) =>
    ["PLACED", "PREPARING", "READY"].includes(order.status),
  );
  const completedOrders = deliveredOrders.length + cancelledOrders.length;
  const successRate = completedOrders
    ? Math.round((deliveredOrders.length / completedOrders) * 100)
    : 0;
  const deliveredMinutes = deliveredOrders
    .map((order) => {
      const createdAt = new Date(order.createdAt).getTime();
      const updatedAt = new Date(order.updatedAt).getTime();
      const diff = (updatedAt - createdAt) / 60000;

      return Number.isFinite(diff) && diff >= 0 ? diff : null;
    })
    .filter((value): value is number => value !== null);
  const averageFulfillmentMinutes = deliveredMinutes.length
    ? Math.round(
        deliveredMinutes.reduce((sum, minutes) => sum + minutes, 0) /
          deliveredMinutes.length,
      )
    : 0;
  const revenue = deliveredOrders.reduce(
    (sum, order) => sum + asNumber(order.totalPrice),
    0,
  );
  const dailyOrderData = buildCurrentMonthDailyOrderData(orderList);
  const monthlyOrders = dailyOrderData.reduce(
    (sum, point) => sum + point.value,
    0,
  );
  const chartMonth = new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
  }).format(new Date());

  return (
    <div>
      <DashboardHeader
        title="Admin Dashboard"
        subtitle="Platform overview and management"
      />
      <div className="space-y-6 p-4 sm:p-6">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatCard
            label="Total Users"
            value={users?.length || 0}
            sub={`${users?.filter((user) => user.role === "CUSTOMER").length || 0} customers - ${users?.filter((user) => user.role === "PROVIDER").length || 0} providers`}
            icon={Users}
            iconBg="bg-purple-50"
            iconColor="text-purple-600"
          />
          <StatCard
            label="Total Orders"
            value={orderList.length}
            sub="All time"
            icon={ShoppingBag}
          />
          <StatCard
            label="Platform Revenue"
            value={formatCurrency(revenue)}
            sub="Delivered orders"
            icon={DollarSign}
            iconBg="bg-green-50"
            iconColor="text-green-600"
          />
          <StatCard
            label="Restaurants"
            value={providerCount}
            sub="Active providers"
            icon={UtensilsCrossed}
            iconBg="bg-amber-50"
            iconColor="text-amber-600"
          />
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <DashboardBarChart
            title="Daily Orders"
            subtitle={`Order volume by day for ${chartMonth}`}
            badge={`${monthlyOrders} this month`}
            data={dailyOrderData}
            className="lg:col-span-2"
          />

          <div className="space-y-4">
            <div className="rounded-xl bg-fh-green-deep p-5 text-white">
              <p className="mb-1 text-sm font-medium text-white/60">
                Today&apos;s Orders
              </p>
              <p className="font-display text-4xl font-bold">
                {
                  orderList.filter(
                    (order) =>
                      new Date(order.createdAt).toDateString() ===
                      new Date().toDateString(),
                  ).length
                }
              </p>
            </div>
            <div className="rounded-xl border border-fh-cream-dark bg-white p-5">
              <p className="mb-3 text-sm font-medium text-fh-green-muted">
                Platform Health
              </p>
              {[
                ["Order Success Rate", `${successRate}%`, "text-green-600"],
                ["Active Orders", activeOrders.length, "text-amber-600"],
                [
                  "Avg. Fulfillment",
                  deliveredMinutes.length
                    ? `${averageFulfillmentMinutes} min`
                    : "No deliveries",
                  "text-fh-green-deep",
                ],
              ].map(([label, value, color]) => (
                <div
                  key={label}
                  className="flex items-center justify-between border-b border-fh-cream-dark py-2.5 last:border-0"
                >
                  <span className="text-sm text-fh-green-muted">{label}</span>
                  <span className={`text-sm font-bold ${color}`}>{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-fh-cream-dark bg-white">
          <div className="border-b border-fh-cream-dark px-6 py-4">
            <h2 className="font-semibold text-fh-green-deep">Recent Orders</h2>
          </div>
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
                {orderList.slice(0, 8).map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-fh-cream-dark transition-colors hover:bg-fh-cream/30"
                  >
                    <td className="px-5 py-4 font-mono text-xs font-medium text-fh-green-deep">
                      {order.id.slice(0, 8)}
                    </td>
                    <td className="px-5 py-4 font-medium text-fh-green-deep">
                      {order.customer?.name || "Customer"}
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
        </div>
      </div>
    </div>
  );
}
