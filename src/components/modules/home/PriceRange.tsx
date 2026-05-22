"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useNavigate } from "@/hooks/useNavigate";

export function PriceRange() {
  const searchParams = useSearchParams();
  const priceRange = searchParams.get("price_range");
  const [value, setValue] = useState(() =>
    priceRange
      ? priceRange.split(",").map((number) => Number(number.trim()))
      : [0, 1000],
  );
  const { navigateToPage } = useNavigate();

  return (
    <div className="flex justify-end sm:w-[80%]">
      <div className="w-full max-w-xs">
        <div className="mb-5 flex items-center justify-between gap-2">
          <Label htmlFor="price_range">Price range</Label>
          <span className="text-sm text-muted-foreground">
            {value[0]} - {value[1]}
          </span>
        </div>
        <Slider
          id="price_range"
          value={value}
          onValueChange={(nextValue) => {
            setValue(nextValue);
          }}
          onValueCommit={(nextValue) => {
            navigateToPage("price_range", nextValue.join(","));
          }}
          min={0}
          max={1000}
          step={1}
        />
      </div>
    </div>
  );
}
