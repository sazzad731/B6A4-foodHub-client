"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CheckCircle2, MapPin, Phone, User } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import DashboardHeader from "@/components/modules/dashboard/DashboardHeader";
import { createOrder } from "@/services/orders";
import { getMealDetail } from "@/services/meals";
import { asNumber, formatCurrency } from "@/lib/format";
import { clearCart, readCart, StoredCartItem, writeCart } from "@/lib/cart";
import { TOrder, TUser } from "@/types";

export default function CheckoutClient({ user }: { user: TUser | null }) {
  const router = useRouter();
  const [cart, setCart] = useState<StoredCartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [placing, setPlacing] = useState(false);
  const [order, setOrder] = useState<TOrder | null>(null);
  const [form, setForm] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    address: user?.address || "",
    note: "",
  });

  useEffect(() => {
    const hydrateCart = async () => {
      const stored = readCart();
      const hydrated = await Promise.all(
        stored.map(async (item) => {
          if (item.title && item.image && item.price !== undefined) {
            return item;
          }

          const result = await getMealDetail(item.mealId);
          const meal = result.data;

          if (!meal) {
            return item;
          }

          return {
            ...item,
            providerId: meal.providerId,
            providerName: meal.provider?.restaurantName,
            title: meal.title,
            image: meal.image,
            price: asNumber(meal.price),
          };
        }),
      );

      writeCart(hydrated);
      setCart(hydrated);
      setLoading(false);
    };

    hydrateCart();
  }, []);

  const subtotal = useMemo(
    () =>
      cart.reduce(
        (sum, item) => sum + asNumber(item.price) * item.quantity,
        0,
      ),
    [cart],
  );

  const placeOrder = async (event: React.FormEvent) => {
    event.preventDefault();

    const phone = form.phone.trim();
    const address = form.address.trim();

    if (!address || !phone) {
      toast.error("Phone and delivery address are required.");
      return;
    }

    if (!/^(?:\+?88)?01[3-9]\d{8}$/.test(phone.replace(/\s|-/g, ""))) {
      toast.error("Enter a valid Bangladeshi phone number.");
      return;
    }

    if (cart.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }

    setPlacing(true);
    const result = await createOrder({
      deliveryAddress: address,
      phone,
      deliveryNote: form.note.trim(),
      items: cart.map((item) => ({
        mealId: item.mealId,
        quantity: item.quantity,
      })),
    });
    setPlacing(false);

    if (!result.success || !result.data) {
      toast.error(result.message || "Unable to place order.");
      return;
    }

    clearCart();
    setCart([]);
    setOrder(result.data);
    toast.success("Order placed successfully.");
  };

  if (order) {
    return (
      <div>
        <DashboardHeader title="Order Placed" />
        <div className="flex min-h-[calc(100vh-136px)] items-center justify-center p-6">
          <div className="w-full max-w-md rounded-2xl border border-fh-cream-dark bg-white p-10 text-center">
            <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-green-50">
              <CheckCircle2 className="h-10 w-10 text-green-500" />
            </div>
            <h2 className="mb-2 font-display text-2xl font-bold text-fh-green-deep">
              Order confirmed
            </h2>
            <p className="mb-2 text-fh-green-muted">
              Your order{" "}
              <span className="font-mono font-bold text-fh-green-deep">
                {order.id.slice(0, 8)}
              </span>{" "}
              has been placed.
            </p>
            <p className="mb-7 text-sm text-fh-green-muted">
              The restaurant will start preparing your food shortly.
            </p>
            <div className="mb-7 space-y-2 rounded-xl bg-fh-cream p-4 text-left text-sm">
              <div className="flex justify-between">
                <span className="text-fh-green-muted">Subtotal</span>
                <span className="font-medium">{formatCurrency(order.subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-fh-green-muted">Delivery</span>
                <span className="font-medium">
                  {formatCurrency(order.deliveryFee)}
                </span>
              </div>
              <div className="flex justify-between border-t border-fh-cream-dark pt-2">
                <span className="font-bold text-fh-green-deep">Total</span>
                <span className="font-display text-lg font-bold text-fh-coral">
                  {formatCurrency(order.totalPrice)}
                </span>
              </div>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => router.push(`/dashboard/orders/${order.id}`)}
              >
                Track Order
              </Button>
              <Button
                className="flex-1 bg-fh-coral text-white hover:bg-fh-coral-hover"
                onClick={() => router.push("/meals")}
              >
                Order More
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <DashboardHeader
        title="Checkout"
        subtitle="Confirm your delivery details"
      />
      <div className="grid grid-cols-1 gap-6 p-4 sm:p-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <form
            onSubmit={placeOrder}
            className="space-y-5 rounded-xl border border-fh-cream-dark bg-white p-6"
          >
            <h2 className="border-b border-fh-cream-dark pb-3 text-base font-semibold text-fh-green-deep">
              Delivery Information
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <Label className="flex items-center gap-1.5 font-medium text-fh-green-deep">
                  <User className="h-3.5 w-3.5" />
                  Full Name
                </Label>
                <Input
                  className="mt-1.5 h-11"
                  value={form.name}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      name: event.target.value,
                    }))
                  }
                />
              </div>
              <div>
                <Label className="flex items-center gap-1.5 font-medium text-fh-green-deep">
                  <Phone className="h-3.5 w-3.5" />
                  Phone Number
                </Label>
                <Input
                  className="mt-1.5 h-11"
                  value={form.phone}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      phone: event.target.value,
                    }))
                  }
                />
              </div>
            </div>
            <div>
              <Label className="flex items-center gap-1.5 font-medium text-fh-green-deep">
                <MapPin className="h-3.5 w-3.5" />
                Delivery Address
              </Label>
              <Input
                className="mt-1.5 h-11"
                placeholder="House no., road, area, city"
                value={form.address}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    address: event.target.value,
                  }))
                }
              />
            </div>
            <div>
              <Label className="font-medium text-fh-green-deep">
                Special Instructions
              </Label>
              <Textarea
                className="mt-1.5"
                placeholder="Call before delivery, extra napkins, etc."
                value={form.note}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    note: event.target.value,
                  }))
                }
              />
            </div>
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
              <p className="mb-1 text-sm font-semibold text-amber-800">
                Payment: Cash on Delivery
              </p>
              <p className="text-xs text-amber-700">
                Delivery fee is calculated by the restaurant when the order is
                created.
              </p>
            </div>
            <Button
              type="submit"
              disabled={placing || loading || cart.length === 0}
              className="h-12 w-full bg-fh-coral text-base font-semibold text-white hover:bg-fh-coral-hover"
            >
              {placing ? "Placing Order..." : `Place Order - ${formatCurrency(subtotal)}`}
            </Button>
          </form>
        </div>

        <div className="h-fit rounded-xl border border-fh-cream-dark bg-white p-5">
          <h2 className="mb-4 font-semibold text-fh-green-deep">
            Order Summary
          </h2>
          {loading ? (
            <div className="h-32 animate-pulse rounded-lg bg-fh-cream" />
          ) : cart.length === 0 ? (
            <div className="py-8 text-center text-sm text-fh-green-muted">
              Your cart is empty.{" "}
              <Link className="text-fh-coral" href="/meals">
                Browse meals
              </Link>
            </div>
          ) : (
            <>
              <div className="mb-4 space-y-3">
                {cart.map((item) => (
                  <div key={item.mealId} className="flex items-center gap-3">
                    <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-fh-cream">
                      {item.image && (
                        <Image
                          src={item.image}
                          alt={item.title || "Meal"}
                          fill
                          className="object-cover"
                          sizes="40px"
                        />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-fh-green-deep">
                        {item.title}
                      </p>
                      <p className="text-xs text-fh-green-muted">
                        x{item.quantity}
                      </p>
                    </div>
                    <p className="text-sm font-bold text-fh-green-deep">
                      {formatCurrency(asNumber(item.price) * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>
              <div className="space-y-1.5 border-t border-fh-cream-dark pt-3 text-sm">
                <div className="flex justify-between text-fh-green-muted">
                  <span>Subtotal</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between pt-1.5">
                  <span className="font-bold text-fh-green-deep">Payable</span>
                  <span className="font-display text-lg font-bold text-fh-coral">
                    {formatCurrency(subtotal)}
                  </span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
