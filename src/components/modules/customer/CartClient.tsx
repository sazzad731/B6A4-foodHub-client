"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import DashboardHeader from "@/components/modules/dashboard/DashboardHeader";
import {
  readCart,
  removeFromCart,
  StoredCartItem,
  updateCartQuantity,
  writeCart,
} from "@/lib/cart";
import { asNumber, formatCurrency } from "@/lib/format";
import { getMealDetail } from "@/services/meals";

interface CartClientProps {
  canCheckout?: boolean;
  checkoutHref?: string;
  checkoutUnavailableMessage?: string;
}

export default function CartClient({
  canCheckout = true,
  checkoutHref = "/dashboard/checkout",
  checkoutUnavailableMessage = "Only customer accounts can place orders.",
}: CartClientProps = {}) {
  const [cart, setCart] = useState<StoredCartItem[]>([]);
  const [loading, setLoading] = useState(true);

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
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const canProceedToCheckout = canCheckout && !loading && cart.length > 0;

  const update = (mealId: string, quantity: number) => {
    updateCartQuantity(mealId, quantity);
    setCart(readCart());
  };

  const remove = (mealId: string) => {
    removeFromCart(mealId);
    setCart(readCart());
  };

  return (
    <div>
      <DashboardHeader
        title="My Cart"
        subtitle={loading ? "Loading cart" : `${itemCount} items in your cart`}
      />
      <div className="p-4 sm:p-6">
        {!loading && cart.length === 0 ? (
          <div className="py-24 text-center">
            <ShoppingBag className="mx-auto mb-4 h-14 w-14 text-fh-green-light/50" />
            <h2 className="mb-2 font-display text-xl font-bold text-fh-green-deep">
              Your cart is empty
            </h2>
            <p className="mb-6 text-fh-green-muted">
              Discover delicious meals and add them to your cart.
            </p>
            <Button asChild className="bg-fh-coral text-white hover:bg-fh-coral-hover">
              <Link href="/meals">Browse Meals</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="space-y-3 lg:col-span-2">
              {loading
                ? Array.from({ length: 3 }).map((_, index) => (
                    <div
                      key={index}
                      className="h-28 animate-pulse rounded-xl border border-fh-cream-dark bg-white"
                    />
                  ))
                : cart.map((item) => (
                    <div
                      key={item.mealId}
                      className="flex flex-col gap-4 rounded-xl border border-fh-cream-dark bg-white p-4 sm:flex-row sm:items-center"
                    >
                      <div className="relative h-24 w-full shrink-0 overflow-hidden rounded-xl bg-fh-cream sm:h-16 sm:w-16">
                        {item.image ? (
                          <Image
                            src={item.image}
                            alt={item.title || "Meal"}
                            fill
                            className="object-cover"
                            sizes="96px"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center font-display text-xl font-bold text-fh-green-muted">
                            FH
                          </div>
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-semibold text-fh-green-deep">
                          {item.title || "Meal"}
                        </p>
                        <p className="text-sm text-fh-green-muted">
                          {item.providerName || "FoodHub"}
                        </p>
                        <p className="mt-1 font-display font-bold text-fh-coral">
                          {formatCurrency(item.price)}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => update(item.mealId, item.quantity - 1)}
                          className="flex h-8 w-8 items-center justify-center rounded-full border border-fh-cream-dark transition-colors hover:bg-fh-cream"
                        >
                          <Minus className="h-3.5 w-3.5 text-fh-green-muted" />
                        </button>
                        <span className="w-7 text-center font-bold text-fh-green-deep">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => update(item.mealId, item.quantity + 1)}
                          className="flex h-8 w-8 items-center justify-center rounded-full bg-fh-coral text-white transition-colors hover:bg-fh-coral-hover"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <p className="w-24 text-right font-display font-bold text-fh-green-deep">
                        {formatCurrency(asNumber(item.price) * item.quantity)}
                      </p>
                      <button
                        onClick={() => remove(item.mealId)}
                        className="text-red-400 transition-colors hover:text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
              <Button
                asChild
                variant="outline"
                className="h-11 w-full border-dashed border-fh-cream-dark text-fh-green-muted hover:border-fh-coral hover:text-fh-coral"
              >
                <Link href="/meals">Add more items</Link>
              </Button>
            </div>

            <div className="space-y-4">
              <div className="space-y-3.5 rounded-xl border border-fh-cream-dark bg-white p-5">
                <h2 className="font-semibold text-fh-green-deep">
                  Order Summary
                </h2>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-fh-green-muted">
                    <span>Subtotal ({itemCount} items)</span>
                    <span className="font-medium text-fh-green-deep">
                      {formatCurrency(subtotal)}
                    </span>
                  </div>
                  <div className="flex justify-between text-fh-green-muted">
                    <span>Delivery fee</span>
                    <span className="font-medium text-fh-green-deep">
                      Calculated by restaurant
                    </span>
                  </div>
                  <div className="flex justify-between border-t border-fh-cream-dark pt-2">
                    <span className="font-bold text-fh-green-deep">Payable</span>
                    <span className="font-display text-xl font-bold text-fh-coral">
                      {formatCurrency(subtotal)}
                    </span>
                  </div>
                </div>
                <div className="rounded-lg border border-green-200 bg-green-50 p-3">
                  <p className="text-xs font-medium text-green-700">
                    Cash on Delivery. No card needed.
                  </p>
                </div>
                {canProceedToCheckout ? (
                  <Button
                    asChild
                    className="h-11 w-full bg-fh-coral font-semibold text-white hover:bg-fh-coral-hover"
                  >
                    <Link href={checkoutHref}>Proceed to Checkout</Link>
                  </Button>
                ) : (
                  <Button
                    disabled
                    className="h-11 w-full bg-fh-coral font-semibold text-white hover:bg-fh-coral-hover"
                  >
                    Proceed to Checkout
                  </Button>
                )}
                {!canCheckout && (
                  <p className="text-center text-xs text-fh-green-muted">
                    {checkoutUnavailableMessage}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
