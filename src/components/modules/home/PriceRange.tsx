"use client";

import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useNavigate } from "@/hooks/useNavigate";
import { useSearchParams } from "next/navigation";

export function PriceRange() {
  const searchParams = useSearchParams()
  const [value, setValue] = useState([0, 1000]);
  const { navigateToPage } = useNavigate();

  const priceRange = searchParams.get("price_range");
  useEffect(()=>{
    if(priceRange){
      const numberArr = priceRange.split(",").map(number => Number(number.trim()))
      setValue(numberArr);
    }else{
      setValue([0, 1000])
    }
  }, [priceRange])

  return (
    <div className="flex justify-end sm:w-[80%]">
      <div className="w-full max-w-xs">
        <div className="flex items-center justify-between gap-2 mb-5">
          <Label htmlFor="price_range">Price range</Label>
          <span className="text-sm text-muted-foreground">
            {value[0]} - {value[1]}
          </span>
        </div>
        <Slider
          id="price_range"
          value={value}
          onValueChange={(e) => {
            setValue(e);
          }}
          onValueCommit={(e) => {
            navigateToPage("price_range", e.join(", ").toString());
          }}
          min={0}
          max={1000}
          step={1}
        />
      </div>
    </div>
  );
}
