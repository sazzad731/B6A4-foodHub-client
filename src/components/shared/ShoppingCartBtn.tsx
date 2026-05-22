"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ShoppingCart } from "lucide-react";
import { Button } from "../ui/button";
import { getCartCount, subscribeToCart } from "@/lib/cart";

export default function ShoppingCartBtn() {
  const [itemNumber, setItemNumber] = useState(0);

  useEffect(() => {
    const sync = () => setItemNumber(getCartCount());
    sync();

    return subscribeToCart(sync);
  }, []);

  return (
    <Link href="/dashboard/cart" className="cursor-pointer">
      <Button
        variant="ghost"
        className="relative size-10 cursor-pointer p-0 hover:bg-fh-cream-mid"
      >
        <ShoppingCart className="size-5 text-fh-green-deep" strokeWidth={2.5} />
        {itemNumber !== 0 && (
          <span className="absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-fh-coral text-[10px] font-bold text-white">
            {itemNumber}
          </span>
        )}
      </Button>
    </Link>
  );
}
