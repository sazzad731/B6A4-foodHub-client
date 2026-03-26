import Link from "next/link";
import MealCard from "@/components/shared/MealCard";
import { getAllMeals } from "@/services/meals";
import { TMeal } from "@/types";

export default async function FeaturedMeals() {
  const { data: meals } = await getAllMeals();


  const badgeColors = [
    "bg-blue-100 text-blue-700",
    "bg-green-100 text-green-700",
    "bg-sky-100 text-sky-700",
    "bg-purple-100 text-purple-700 ",
    "bg-red-100 text-red-700",
  ];

  return (
    <section className="py-20 bg-fh-cream-mid">
      <div className="container mx-auto px-4 xl:px-0">
        <div className="flex sm:flex-row flex-col justify-between mb-10">
          <div>
            <span className="block text-[11px] font-bold tracking-[2px] uppercase text-fh-coral mb-2.5">
              Editor&apos;s Picks
            </span>
            <h2 className="font-display text-[clamp(28px,3.5vw,44px)] font-bold tracking-tight">
              Featured <em className="font-light text-fh-green-muted">meals</em>
            </h2>
          </div>
          <Link
            href="/meals"
            className="text-sm font-semibold text-fh-coral flex items-center gap-1 mt-5 sm:mt-0"
          >
            Browse all →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {meals?.map((meal: TMeal, index: number) => {
            const randomColor = badgeColors[index % badgeColors.length];
            return (
            <Link href={`/meals/${meal.id}`} key={meal.id}>
              <MealCard meal={meal} badgeColor={randomColor}/>
            </Link>
          )
          })}
        </div>
      </div>
    </section>
  );
}
