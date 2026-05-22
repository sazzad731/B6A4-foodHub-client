"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Clock3, ShoppingCart, Star } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getUser } from "@/services/auth";
import { addMealToCart } from "@/lib/cart";
import { formatCurrency } from "@/lib/format";
import { TDecodedUser, TMeal } from "@/types";

export default function MealCard({
  meal,
  badgeColor,
}: {
  meal: TMeal;
  badgeColor: string;
}) {
  const [user, setUser] = useState<TDecodedUser | null>(null);
  const {
    provider,
    category,
    title,
    price,
    image,
    avgRating,
    tags,
    prepTime,
  } = meal;


  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const userData = await getUser();
        setUser(userData);
      } catch (error) {
        console.error("Failed to get user:", error);
      }
    };

    getCurrentUser();
  }, []);

  const handleAddToCart = () => {
    if (!user) {
      toast.error("Please login first");
      return;
    }

    const result = addMealToCart(meal);

    if (result.ok) {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
  };

  return (
    <Card className="relative mx-auto w-full max-w-lg pt-0">
      <div className="relative h-60">
        <Image
          src={image}
          alt={title}
          fill
          className="relative z-20 w-full rounded-t-xl object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <CardHeader>
        <CardAction>
          <Badge className={`${badgeColor} uppercase`}>
            {tags?.[0] || "Fresh"}
          </Badge>
        </CardAction>
        <p className="text-[11px] font-bold uppercase tracking-[1.5px] text-fh-green-muted">
          {category?.name || "Meal"}
        </p>
        <CardTitle className="font-display text-[19px] font-bold tracking-tight text-fh-green-deep">
          {title.length > 24 ? `${title.slice(0, 24)}...` : title}
        </CardTitle>
        <CardDescription>
          <div className="flex items-center gap-2">
            <div className="relative flex h-5 w-5 items-center justify-center rounded-full bg-fh-green-soft text-[10px] font-bold text-white">
              {provider?.restaurantName?.[0] || "F"}
            </div>
            <span className="text-sm text-fh-green-muted">
              {provider?.restaurantName || "FoodHub"}
            </span>
          </div>
          <span className="mt-3 flex items-center gap-1 text-sm font-semibold text-fh-green-deep">
            <Star className="h-3.5 w-3.5 fill-fh-amber text-fh-amber" />
            {avgRating || 0}
          </span>
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex items-center justify-between border-t border-fh-cream-dark">
        <span className="font-display text-xl font-bold text-fh-coral">
          {formatCurrency(price)}{" "}
          <span className="font-sans text-sm font-medium text-fh-green-muted">
            / item
          </span>
        </span>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-sm font-semibold text-fh-green-muted">
            <Clock3 className="h-3.5 w-3.5" />
            {prepTime}m
          </span>
          <button
            onClick={(event) => {
              event.preventDefault();
              handleAddToCart();
            }}
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-fh-coral text-white shadow-md shadow-fh-coral/30 transition-all hover:scale-105 hover:bg-fh-coral-hover"
          >
            <ShoppingCart className="h-5 w-5" />
          </button>
        </div>
      </CardFooter>
    </Card>
  );
}
