"use client";
import { useSearchParams} from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getAllCategory } from "@/services/category";
import { toast } from "sonner";


interface TCategories {
  id: string;
  name: string;
  slug: string;
  image: string;
  mealCount: number;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date
}
export default function Categories() {
  const [categories, setCategories] = useState<TCategories[]>([]);
  const searchParams = useSearchParams();

  const category = searchParams.get("category")

  useEffect(() => {
    const allCategories = async () => {
      try {
        const categoryData = await getAllCategory();
        setCategories(categoryData.data)
      } catch (error: any) {
        toast.error(error.message)
      }
    }
    allCategories();
  }, [])
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
              href={`/meals?category=${item.id}`}
              className={`shrink-0 w-40 rounded-2xl border-[1.5px] px-3 pt-5 pb-4 flex flex-col items-center gap-3 cursor-pointer transition-all duration-200
              ${
                category === item.id
                  ? "bg-fh-coral border-fh-coral text-white shadow-lg shadow-fh-coral/30 -translate-y-1"
                  : "bg-white border-fh-cream-dark hover:border-fh-coral hover:bg-fh-coral/5 hover:-translate-y-1 hover:shadow-lg"
              }`}
            >
              <div className="relative h-20 w-20">
                <Image
                  src={item.image}
                  alt={item.slug}
                  fill
                  className="rounded-full object-cover"
                />
              </div>

              <span
                className={`text-[13px] font-semibold ${category === item.id ? "text-white" : "text-fh-green-deep"}`}
              >
                {item.name}
              </span>
              <span
                className={`text-[11px] ${category === item.id ? "text-white/70" : "text-fh-green-light"}`}
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
