import Link from "next/link";
import { ArrowLeft, CheckCircle2, Clock, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import DashboardHeader from "@/components/modules/dashboard/DashboardHeader";
import OrderStatusBadge from "@/components/modules/dashboard/OrderStatusBadge";
import OrderDetailClient from "@/components/modules/customer/OrderDetailClient";
import { getOrderDetails } from "@/services/orders";
import { formatCurrency, formatDate } from "@/lib/format";
import { TOrderStatus } from "@/types";

const STEPS: TOrderStatus[] = ["PLACED", "PREPARING", "READY", "DELIVERED"];

export default async function CustomerOrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { data: order } = await getOrderDetails(id);

  if (!order) {
    return (
      <div>
        <DashboardHeader title="Order not found" />
        <div className="p-6">
          <Button asChild>
            <Link href="/dashboard/orders">Back to orders</Link>
          </Button>
        </div>
      </div>
    );
  }

  const stepIndex = STEPS.indexOf(order.status);

  return (
    <div>
      <DashboardHeader
        title={`Order ${order.id.slice(0, 8)}`}
        subtitle={`Placed on ${formatDate(order.createdAt)}`}
        action={
          <Button asChild variant="outline" size="sm" className="gap-1.5">
            <Link href="/dashboard/orders">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Link>
          </Button>
        }
      />
      <div className="grid grid-cols-1 gap-6 p-4 sm:p-6 lg:grid-cols-3">
        <div className="space-y-5 lg:col-span-2">
          <div className="rounded-xl border border-fh-cream-dark bg-white p-6">
            <h2 className="mb-6 font-semibold text-fh-green-deep">
              Order Progress
            </h2>
            <div className="flex items-center gap-0">
              {STEPS.map((status, index) => (
                <div key={status} className="flex flex-1 items-center last:flex-none">
                  <div className="flex flex-col items-center gap-2">
                    <div
                      className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold transition-colors ${
                        index < stepIndex
                          ? "bg-fh-green-soft text-white"
                          : index === stepIndex
                            ? "bg-fh-coral text-white ring-4 ring-fh-coral/20"
                            : "bg-fh-cream-dark text-fh-green-light"
                      }`}
                    >
                      {index < stepIndex ? (
                        <CheckCircle2 className="h-4 w-4" />
                      ) : (
                        index + 1
                      )}
                    </div>
                    <span
                      className={`text-xs font-medium capitalize ${
                        index <= stepIndex
                          ? "text-fh-green-deep"
                          : "text-fh-green-light"
                      }`}
                    >
                      {status.toLowerCase()}
                    </span>
                  </div>
                  {index < STEPS.length - 1 && (
                    <div
                      className={`mx-2 mb-5 h-0.5 flex-1 ${
                        index < stepIndex
                          ? "bg-fh-green-soft"
                          : "bg-fh-cream-dark"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
            {order.status === "CANCELLED" && (
              <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm font-medium text-red-600">
                This order was cancelled.
              </div>
            )}
          </div>

          <div className="overflow-hidden rounded-xl border border-fh-cream-dark bg-white">
            <div className="border-b border-fh-cream-dark px-6 py-4">
              <h2 className="font-semibold text-fh-green-deep">Order Items</h2>
            </div>
            <div className="divide-y divide-fh-cream-dark">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between px-6 py-4"
                >
                  <div>
                    <p className="font-medium text-fh-green-deep">
                      {item.mealName}
                    </p>
                    <p className="text-sm text-fh-green-muted">
                      {formatCurrency(item.priceAtOrder)} x {item.quantity}
                    </p>
                  </div>
                  <p className="font-display font-bold text-fh-green-deep">
                    {formatCurrency(item.subtotal)}
                  </p>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between border-t border-fh-cream-dark bg-fh-cream/50 px-6 py-4">
              <span className="font-semibold text-fh-green-deep">Total</span>
              <span className="font-display text-xl font-bold text-fh-coral">
                {formatCurrency(order.totalPrice)}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <div className="space-y-4 rounded-xl border border-fh-cream-dark bg-white p-5">
            <h3 className="font-semibold text-fh-green-deep">Order Info</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-fh-green-muted" />
                <div>
                  <p className="font-medium text-fh-green-muted">
                    Delivery Address
                  </p>
                  <p className="mt-0.5 text-fh-green-deep">
                    {order.deliveryAddress}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="h-4 w-4 text-fh-green-muted" />
                <div>
                  <p className="font-medium text-fh-green-muted">Ordered At</p>
                  <p className="text-fh-green-deep">
                    {new Date(order.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-fh-green-muted" />
                <div>
                  <p className="font-medium text-fh-green-muted">Payment</p>
                  <p className="text-fh-green-deep">Cash on Delivery</p>
                </div>
              </div>
            </div>
            <div className="border-t border-fh-cream-dark pt-2">
              <p className="mb-1.5 text-xs font-medium text-fh-green-muted">
                Status
              </p>
              <OrderStatusBadge status={order.status} />
            </div>
          </div>
          <div className="rounded-xl border border-fh-cream-dark bg-white p-5">
            <h3 className="mb-3 font-semibold text-fh-green-deep">
              Restaurant
            </h3>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-fh-green-soft text-base font-bold text-white">
                {order.provider?.restaurantName?.[0] || "F"}
              </div>
              <div>
                <p className="font-medium text-fh-green-deep">
                  {order.provider?.restaurantName || "FoodHub"}
                </p>
                <p className="text-xs text-fh-green-muted">Provider</p>
              </div>
            </div>
          </div>
          <OrderDetailClient order={order} />
        </div>
      </div>
    </div>
  );
}
