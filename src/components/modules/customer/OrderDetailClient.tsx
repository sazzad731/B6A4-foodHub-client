"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { addMealReview } from "@/services/meals";
import { cancelOrder } from "@/services/orders";
import { TOrder } from "@/types";

export default function OrderDetailClient({
  order,
  onCancel,
}: {
  order: TOrder;
  onCancel?: () => void;
}) {
  const router = useRouter();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [mealId, setMealId] = useState(order.items[0]?.mealId || "");
  const [cancelling, setCancelling] = useState(false);

  const cancel = async () => {
    setCancelling(true);
    const result = await cancelOrder(order.id);
    setCancelling(false);

    if (!result.success) {
      toast.error(result.message || "Unable to cancel order.");
      return;
    }

    toast.success("Order cancelled.");
    onCancel?.();
    router.refresh();
  };

  const submitReview = async () => {
    if (!mealId) {
      toast.error("Select a meal to review.");
      return;
    }

    const result = await addMealReview(mealId, { rating, comment });
    if (result.success) {
      toast.success("Review submitted.");
    } else {
      toast.error(result.message || "Unable to submit review.");
    }
  };

  return (
    <div className="space-y-4">
      {order.status === "PLACED" && (
        <Button
          variant="outline"
          className="w-full border-red-300 text-red-600 hover:bg-red-50"
          onClick={cancel}
          disabled={cancelling}
        >
          {cancelling ? "Cancelling..." : "Cancel Order"}
        </Button>
      )}

      {order.status === "DELIVERED" && (
        <div className="rounded-xl border border-fh-cream-dark bg-white p-5">
          <h3 className="mb-3 font-semibold text-fh-green-deep">
            Leave a Review
          </h3>
          <div className="space-y-3">
            <select
              value={mealId}
              onChange={(event) => setMealId(event.target.value)}
              className="h-10 w-full rounded-md border border-fh-cream-dark bg-fh-cream px-3 text-sm"
            >
              {order.items.map((item) => (
                <option key={item.mealId} value={item.mealId}>
                  {item.mealName}
                </option>
              ))}
            </select>
            <Input
              type="number"
              min={1}
              max={5}
              value={rating}
              onChange={(event) => setRating(Number(event.target.value))}
            />
            <Textarea
              placeholder="How was the meal?"
              value={comment}
              onChange={(event) => setComment(event.target.value)}
            />
            <Button
              onClick={submitReview}
              className="w-full bg-fh-coral text-white hover:bg-fh-coral-hover"
            >
              Submit Review
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
