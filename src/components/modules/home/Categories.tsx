"use client";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

export default function Categories() {
  const pathName = usePathname();

  const categories = [
  { id: "1", name: "All",      image: "🍽️", mealCount: 340, slug: "all" },
  { id: "2", name: "Bengali",  image: "🍛", mealCount: 90,  slug: "bengali" },
  { id: "3", name: "Burgers",  image: "🍔", mealCount: 62,  slug: "burgers" },
  { id: "4", name: "Pizza",    image: "🍕", mealCount: 48,  slug: "pizza" },
  { id: "5", name: "Chinese",  image: "🥡", mealCount: 55,  slug: "chinese" },
  { id: "6", name: "Sushi",    image: "🍣", mealCount: 34,  slug: "sushi" },
  { id: "7", name: "Pasta",    image: "🍝", mealCount: 40,  slug: "pasta" },
  { id: "8", name: "Salads",   image: "🥗", mealCount: 28,  slug: "salads" },
  { id: "9", name: "Desserts", image: "🍰", mealCount: 44,  slug: "desserts" },
  { id: "10",name: "Drinks",   image: "🧋", mealCount: 30,  slug: "drinks" },
];

  return (
    <section className="bg-fh-cream">
      <div className="container mx-auto px-4 lg:px-0 sm:py-30 pt-45 pb-20">
        <div className="flex justify-between mb-10 sm:flex-row flex-col">
          <div>
            <span className="block text-xs font-bold tracking-[2px] uppercase text-fh-coral mb-2.5">
              Explore by Cuisine
            </span>
            <h2 className="font-display text-[clamp(28px,3.5vw,44px)] font-bold tracking-tight leading-tight">
              What are you{" "}
              <em className="font-light text-fh-green-muted">craving today?</em>
            </h2>
          </div>
          <a
            href="/meals"
            className="text-sm font-semibold text-fh-coral hover:gap-2 sm:mt-0 mt-10 flex items-center gap-1 transition-all"
          >
            All cuisines →
          </a>
        </div>
        <div className="flex gap-3.5 overflow-x-auto py-2 scrollbar-hide">
          {categories.map((item) => (
            <Link
              key={item.id}
              href={`/meals?category=${item.slug}`}
              className={`shrink-0 w-29.5 rounded-2xl border-[1.5px] px-3 pt-5 pb-4 flex flex-col items-center gap-3 cursor-pointer transition-all duration-200
              ${
                pathName === `/meals?category=${item.slug}`
                  ? "bg-fh-coral border-fh-coral text-white shadow-lg shadow-fh-coral/30 -translate-y-1"
                  : "bg-white border-fh-cream-dark hover:border-fh-coral hover:bg-fh-coral/5 hover:-translate-y-1 hover:shadow-lg"
              }`}
            >
              <span className="text-[32px] leading-none">{item.image}</span>
              <span
                className={`text-[13px] font-semibold ${pathName === `/meals?category=${item.slug}` ? "text-white" : "text-fh-green-deep"}`}
              >
                {item.name}
              </span>
              <span
                className={`text-[11px] ${pathName === `/meals?category=${item.slug}` ? "text-white/70" : "text-fh-green-light"}`}
              >
                {item.mealCount}+ items
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
