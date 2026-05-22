import Image from "next/image";
import { Clock, MapPin, Phone, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import MealCard from "@/components/shared/MealCard";
import { getProviderById } from "@/services/providers";
import { formatCurrency } from "@/lib/format";
import { TMeal } from "@/types";
import Link from "next/link";

export default async function ProviderProfile({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { data: provider } = await getProviderById(id);

  if (!provider) {
    return (
      <section className="bg-fh-cream px-4 py-32 text-center">
        <h1 className="font-display text-3xl font-bold text-fh-green-deep">
          Restaurant not found
        </h1>
        <Link className="mt-4 inline-block text-fh-coral" href="/providers">
          Back to restaurants
        </Link>
      </section>
    );
  }

  const meals = (provider.meals || []).map((meal) => ({
    ...meal,
    provider,
    category: {
      id: meal.categoryId,
      name: meal.category?.name || "Meal",
      slug: meal.category?.slug || "meal",
      image: meal.category?.image || provider.image || "",
    },
  })) as TMeal[];

  const badgeColors = [
    "bg-blue-100 text-blue-700",
    "bg-green-100 text-green-700",
    "bg-sky-100 text-sky-700",
    "bg-purple-100 text-purple-700",
    "bg-red-100 text-red-700",
  ];

  return (
    <section className="bg-fh-cream pt-16">
      <div className="relative h-64 bg-fh-green-deep">
        {provider.image && (
          <Image
            src={provider.image}
            alt={provider.restaurantName}
            fill
            className="object-cover"
            sizes="100vw"
          />
        )}
        <div className="absolute inset-0 bg-black/35" />
        <div className="container absolute inset-x-0 bottom-0 mx-auto flex items-end gap-5 px-4 xl:px-0">
          <div className="flex h-24 w-24 translate-y-8 items-center justify-center rounded-2xl border-4 border-white bg-white shadow-xl">
            {provider.image ? (
              <Image
                src={provider.image}
                alt={provider.restaurantName}
                width={96}
                height={96}
                className="h-full w-full rounded-xl object-cover"
              />
            ) : (
              <span className="font-display text-5xl font-bold text-fh-green-deep">
                {provider.restaurantName[0]}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="border-b border-fh-cream-dark bg-white">
        <div className="container mx-auto px-4 pb-6 pt-12 xl:px-0">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
            <div>
              <div className="mb-1 flex flex-wrap items-center gap-3">
                <h1 className="font-display text-3xl font-bold text-fh-green-deep">
                  {provider.restaurantName}
                </h1>
                <div
                  className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${
                    provider.isOpen
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  <div
                    className={`h-1.5 w-1.5 rounded-full ${
                      provider.isOpen ? "bg-green-500" : "bg-gray-400"
                    }`}
                  />
                  {provider.isOpen ? "Open Now" : "Closed"}
                </div>
              </div>
              <div className="mb-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-fh-green-muted">
                <span className="flex items-center gap-1.5 font-semibold text-fh-green-deep">
                  <Star className="h-4 w-4 fill-fh-amber text-fh-amber" />
                  {provider.avgRating || 0} rating
                </span>
                <span>{provider.totalOrders || 0} orders</span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  {meals[0]?.prepTime || 20} min avg
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5 text-fh-coral" />
                  {provider.address}
                </span>
                <span className="flex items-center gap-1">
                  <Phone className="h-3.5 w-3.5" />
                  {provider.phone}
                </span>
                <span>{formatCurrency(provider.deliveryFee || 0)} delivery</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {(provider.cuisineTypes || []).map((type) => (
                  <Badge key={type} variant="secondary" className="text-xs">
                    {type}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          <p className="mt-4 max-w-2xl text-[15px] font-light leading-relaxed text-fh-green-muted">
            {provider.description || "Fresh meals prepared for FoodHub customers."}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10 xl:px-0">
        <h2 className="mb-6 font-display text-2xl font-bold text-fh-green-deep">
          Menu{" "}
          <span className="text-xl font-light text-fh-green-muted">
            ({meals.length} items)
          </span>
        </h2>
        {meals.length === 0 ? (
          <div className="rounded-xl border border-fh-cream-dark bg-white py-16 text-center text-fh-green-muted">
            No menu items are available yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {meals.map((meal, index) => (
              <Link href={`/meals/${meal.id}`} key={meal.id}>
                <MealCard
                  meal={meal}
                  badgeColor={badgeColors[index % badgeColors.length]}
                />
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
