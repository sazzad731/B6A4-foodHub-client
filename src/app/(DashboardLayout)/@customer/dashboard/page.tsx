import Link from "next/link";
import { Clock, ShoppingBag, Star, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import DashboardHeader from "@/components/modules/dashboard/DashboardHeader";
import StatCard from "@/components/modules/dashboard/StatCard";
import OrderStatusBadge from "@/components/modules/dashboard/OrderStatusBadge";
import { getCurrentUser } from "@/services/auth";
import { getOrders } from "@/services/orders";
import { formatCurrency, formatDate } from "@/lib/format";

export default async function CustomerDashboardPage() {
  const [{ data: user }, { data: orders }] = await Promise.all([
    getCurrentUser(),
    getOrders(),
  ]);
  const delivered = (orders || []).filter((order) => order.status === "DELIVERED");
  const active = (orders || []).filter((order) =>
    ["PLACED", "PREPARING", "READY"].includes(order.status),
  );
  const totalSpent = delivered.reduce(
    (sum, order) => sum + Number(order.totalPrice || 0),
    0,
  );

  return (
    <div>
      <DashboardHeader
        title={`Welcome${user?.name ? `, ${user.name.split(" ")[0]}` : ""}`}
        subtitle="Your FoodHub ordering workspace"
        action={
          <Button asChild className="bg-fh-coral text-white hover:bg-fh-coral-hover">
            <Link href="/meals">Browse Meals</Link>
          </Button>
        }
      />
      <div className="space-y-6 p-4 sm:p-6">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatCard label="Total Orders" value={orders?.length || 0} icon={ShoppingBag} sub="All time" />
          <StatCard label="Active Orders" value={active.length} icon={Clock} iconBg="bg-amber-50" iconColor="text-amber-600" sub="Being prepared" />
          <StatCard label="Total Spent" value={formatCurrency(totalSpent)} icon={Wallet} iconBg="bg-green-50" iconColor="text-green-600" sub="Delivered orders" />
          <StatCard label="Avg. Rating" value="4.8" icon={Star} iconBg="bg-yellow-50" iconColor="text-yellow-500" sub="Your reviews" />
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="overflow-hidden rounded-xl border border-fh-cream-dark bg-white lg:col-span-2">
            <div className="flex items-center justify-between border-b border-fh-cream-dark px-6 py-4">
              <h2 className="font-semibold text-fh-green-deep">Recent Orders</h2>
              <Link className="text-sm font-semibold text-fh-coral" href="/dashboard/orders">
                View all
              </Link>
            </div>
            {(orders || []).length === 0 ? (
              <div className="py-12 text-center text-fh-green-muted">
                No orders yet.
              </div>
            ) : (
              <div className="divide-y divide-fh-cream-dark">
                {(orders || []).slice(0, 5).map((order) => (
                  <Link
                    key={order.id}
                    href={`/dashboard/orders/${order.id}`}
                    className="flex items-center justify-between gap-4 px-6 py-4 transition-colors hover:bg-fh-cream/50"
                  >
                    <div>
                      <p className="font-mono text-xs font-semibold text-fh-green-deep">
                        {order.id.slice(0, 8)}
                      </p>
                      <p className="mt-1 text-sm text-fh-green-muted">
                        {order.provider?.restaurantName || "FoodHub"} - {formatDate(order.createdAt)}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-display font-bold text-fh-coral">
                        {formatCurrency(order.totalPrice)}
                      </span>
                      <OrderStatusBadge status={order.status} />
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="rounded-xl bg-fh-green-deep p-6 text-white">
            <p className="text-sm font-medium text-white/60">Next step</p>
            <h2 className="mt-2 font-display text-3xl font-bold">
              Build your next order
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-white/55">
              Browse meals from local providers, keep your cart organized, and
              pay with cash on delivery.
            </p>
            <Button asChild className="mt-6 bg-fh-coral text-white hover:bg-fh-coral-hover">
              <Link href="/meals">Find Food</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
