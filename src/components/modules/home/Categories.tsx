"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { useNavigate } from "@/hooks/useNavigate";
import { getAllCategory } from "@/services/category";
import { TCategory } from "@/types";

export default function Categories() {
  const [categories, setCategories] = useState<TCategory[]>([]);
  const searchParams = useSearchParams();
  const { navigateToPage } = useNavigate();
  const category = searchParams.get("category");

  useEffect(() => {
    const allCategories = async () => {
      try {
        const categoryData = await getAllCategory();
        setCategories(categoryData.data);
      } catch (error: unknown) {
        toast.error(
          error instanceof Error ? error.message : "Unable to load categories",
        );
      }
    };

    allCategories();
  }, []);

  return (
    <section className="bg-fh-cream">
      <div className="container mx-auto px-4 pb-20 pt-45 sm:py-30 lg:px-0">
        <div className="mb-10 flex flex-col justify-between sm:flex-row">
          <div>
            <span className="mb-2.5 block text-xs font-bold uppercase tracking-[2px] text-fh-coral">
              Explore by Cuisine
            </span>
            <h2 className="font-display text-[clamp(28px,3.5vw,44px)] font-bold leading-tight tracking-tight">
              What are you{" "}
              <em className="font-light text-fh-green-muted">
                craving today?
              </em>
            </h2>
          </div>
          <Link
            href="/meals"
            className="mt-10 flex items-center gap-1 text-sm font-semibold text-fh-coral transition-all hover:gap-2 sm:mt-0"
          >
            All cuisines
          </Link>
        </div>
        <div className="scrollbar-hide flex gap-3.5 overflow-x-auto py-2">
          {categories.map((item) => (
            <button
              key={item.id}
              onClick={() => navigateToPage("category", item.id)}
              className={`flex w-40 shrink-0 cursor-pointer flex-col items-center gap-3 rounded-2xl border-[1.5px] px-3 pb-4 pt-5 transition-all duration-200 ${
                category === item.id
                  ? "border-fh-coral bg-fh-coral text-white shadow-lg shadow-fh-coral/30 -translate-y-1"
                  : "border-fh-cream-dark bg-white hover:-translate-y-1 hover:border-fh-coral hover:bg-fh-coral/5 hover:shadow-lg"
              }`}
            >
              <div className="relative h-20 w-20 flex items-center justify-center bg-fh-cream-dark rounded-full">
                {item.image && (item.image.startsWith("http://") || item.image.startsWith("https://") || item.image.startsWith("/")) ? (
                  <Image
                    src={item.image}
                    alt={item.slug}
                    fill
                    className="rounded-full object-cover"
                    sizes="80px"
                  />
                ) : (
                  <span className="text-3xl">{item.image}</span>
                )}
              </div>

              <span
                className={`text-[13px] font-semibold ${
                  category === item.id ? "text-white" : "text-fh-green-deep"
                }`}
              >
                {item.name}
              </span>
              <span
                className={`text-[11px] ${
                  category === item.id ? "text-white/70" : "text-fh-green-light"
                }`}
              >
                {item.mealCount || 0}+ items
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
