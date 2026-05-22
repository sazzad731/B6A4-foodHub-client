"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Minus, Plus } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { addMealToCart } from "@/lib/cart";
import { formatCurrency } from "@/lib/format";
import { getUser } from "@/services/auth";
import { TDecodedUser, TMeal } from "@/types";

export default function MealDetailActions({ meal }: { meal: TMeal }) {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [user, setUser] = useState<TDecodedUser | null>(null);

  useEffect(() => {
    getUser().then(setUser).catch(() => setUser(null));
  }, []);

  const total = Number(meal.price) * quantity;

  const addToCart = () => {
    if (!user) {
      toast.error("Please login first");
      router.push("/login");
      return false;
    }

    const result = addMealToCart(meal, quantity);
    if (result.ok) {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }

    return result.ok;
  };

  return (
    <>
      <div className="mb-6 flex flex-row-reverse justify-between gap-4 rounded-2xl border border-fh-cream-dark bg-fh-cream p-4 sm:flex-row">
        <div className="hidden sm:block">
          <p className="mb-0.5 text-xs text-fh-green-muted">Price per item</p>
          <p className="font-display text-3xl font-bold text-fh-coral">
            {formatCurrency(meal.price)}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setQuantity((current) => Math.max(1, current - 1))}
            className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-fh-cream-dark transition-colors hover:border-fh-coral"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="w-6 text-center text-xl font-bold text-fh-green-deep">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity((current) => current + 1)}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-fh-coral text-white transition-colors hover:bg-fh-coral-hover"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
        <div className="ml-4">
          <p className="mb-0.5 text-xs text-fh-green-muted">Total</p>
          <p className="font-display text-2xl font-bold text-fh-green-deep">
            {formatCurrency(total)}
          </p>
        </div>
      </div>

      <div className="mb-6 flex flex-col gap-3 sm:flex-row">
        <Button
          onClick={addToCart}
          className="h-12 flex-1 gap-2 text-base font-semibold transition-all"
        >
          Add to Cart - {formatCurrency(total)}
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            if (addToCart()) {
              router.push("/dashboard/checkout");
            }
          }}
          className="h-12 flex-1 border-fh-green-deep text-base font-semibold text-fh-green-deep transition-colors hover:bg-fh-green-deep hover:text-white"
        >
          Order Now
        </Button>
      </div>
    </>
  );
}
