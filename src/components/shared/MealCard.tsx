"use client"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import {TMeal} from "@/types/index"
import { ShoppingCart, Star } from "lucide-react";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { getUser } from "@/services/auth";


export default function MealCard({meal, badgeColor}: {meal: TMeal, badgeColor: string}) {
  const [user, setUser] = useState(null);
  const { id, providerName, categoryName, title, price, image, rating, tags } = meal;
  

  useEffect(() => {
      const getCurrentUser = async () => {
        try {
          const userdata = await getUser();
          setUser(userdata);
        } catch (error) {
          console.error("Failed to get user:", error);
        }
      };
      getCurrentUser();
    }, []);

  const handleAddToCard = (mealId: string)=>{
    const existingCart: string[] = JSON.parse(localStorage.getItem("cart") || "[]");

    if (!user) {
      toast.error("Please login first")
      return;
    }

    if (existingCart.includes(mealId)) {
      toast.warning("Meal already added")
      return
    }

    const updatedCart = [...existingCart, id];

    localStorage.setItem("cart", JSON.stringify(updatedCart));

    toast.success("Meal added to cart")
  }

  return (
    <Card className="relative mx-auto w-full max-w-sm pt-0">
      <div className="relative h-60">
        <Image
          src={image}
          alt="Event cover"
          fill
          className="relative z-20 w-full object-cover rounded-t-xl"
        />
      </div>
      <CardHeader>
        <CardAction>
          <Badge className={`${badgeColor} uppercase`}>{tags[0]}</Badge>
        </CardAction>
        <p className="text-[11px] font-bold text-fh-green-muted tracking-[1.5px] uppercase">
          {categoryName}
        </p>
        <CardTitle className="font-display text-[19px] font-bold text-fh-green-deep tracking-tight">
          {title.length > 15 ? title.slice(0, 15) + " ..." : title}
        </CardTitle>
        <CardDescription>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-fh-green-soft flex items-center justify-center text-[10px] font-bold text-white">
              {providerName[0]}
            </div>
            <span className="text-sm text-fh-green-muted">{providerName}</span>
          </div>
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-between items-center border-t border-fh-cream-dark">
          <span className="font-display text-xl font-bold text-fh-coral">
            ৳{price}{" "}
            <span className="font-sans text-sm font-medium text-fh-green-muted">
              / item
            </span>
          </span>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-sm font-semibold text-fh-green-deep">
              <Star className="h-3.5 w-3.5 fill-fh-amber text-fh-amber" />
              {rating}
            </span>
            <button
              onClick={(e)=>{
                e.preventDefault()
                handleAddToCard(id);
              }}
              className="w-9 h-9 rounded-full bg-fh-coral hover:bg-fh-coral-hover flex items-center justify-center text-white transition-all hover:scale-105 shadow-md shadow-fh-coral/30 cursor-pointer"
            >
              <ShoppingCart className="h-5 w-5"/>
            </button>
          </div>
      </CardFooter>
    </Card>
  );
}
