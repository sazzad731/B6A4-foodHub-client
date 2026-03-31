import Categories from '@/components/modules/home/Categories';
import SearchBar from '@/components/modules/home/SearchBar';
import MealCard from '@/components/shared/MealCard';
import { PaginationControls } from '@/components/shared/PaginationControls';
import { getAllMeals } from '@/services/meals';
import { TMeal } from '@/types';
import Link from 'next/link';
import React from 'react'

type TSearchParams = Promise<{ [key: string]: string | undefined }>;

export default async function MealsPage({searchParams}: {searchParams: TSearchParams}) {
  const query = await searchParams;
  const { data } = await getAllMeals({
    search: query.search,
    price_range: query.price_range,
    page: query.page,
    limit: query.limit,
    sortBy: query.sortBy,
    sortOrder: query.sortOrder
  });
  const { meals } = data;
  const { pagination } = data;

  const badgeColors = [
    "bg-blue-100 text-blue-700",
    "bg-green-100 text-green-700",
    "bg-sky-100 text-sky-700",
    "bg-purple-100 text-purple-700 ",
    "bg-red-100 text-red-700",
  ];

  return (
    <section className="pt-16 pb-20 bg-fh-cream-mid">
      <div className="bg-fh-green-deep py-12 px-4 sm:px-8">
        <h1 className="font-display text-4xl font-bold text-white text-center mb-2">
          Browse All Meals
        </h1>
        <p className="text-center text-white/50 font-light">
          Discover hundreds of dishes from the best restaurants
        </p>
      </div>
      <SearchBar />
      <Categories />
      <div className="container mx-auto px-4 xl:px-0 pt-20">
        <div className="flex sm:flex-row flex-col justify-between mb-10">
          <div>
            <span className="block text-[11px] font-bold tracking-[2px] uppercase text-fh-coral mb-2.5">
              All Meals
            </span>
            <h2 className="font-display text-[clamp(28px,3.5vw,44px)] font-bold tracking-tight">
              Browse <em className="font-light text-fh-green-muted">meals</em>
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {meals?.map((meal: TMeal, index: number) => {
            const randomColor = badgeColors[index % badgeColors.length];
            return (
              <Link href={`/meals/${meal.id}`} key={meal.id}>
                <MealCard meal={meal} badgeColor={randomColor} />
              </Link>
            );
          })}
        </div>
        <PaginationControls meta={pagination}/>
      </div>
    </section>
  );
}
