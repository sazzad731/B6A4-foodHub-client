import Image from "next/image";
import Link from "next/link";
import { Clock, MapPin, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getAllProviders } from "@/services/providers";
import { formatCurrency } from "@/lib/format";

type SearchParams = Promise<{ [key: string]: string | undefined }>;

export default async function ProvidersPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const query = await searchParams;
  const { data } = await getAllProviders({
    location: query.location,
    page: query.page,
    limit: query.limit || "12",
    sortBy: query.sortBy,
    sortOrder: query.sortOrder,
  });
  const providers = data?.providers || [];

  return (
    <section className="bg-fh-cream pt-16">
      <div className="relative overflow-hidden bg-fh-green-deep px-4 py-20 text-center sm:px-8">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 50% 80% at 50% 50%,rgba(232,75,42,0.08) 0%,transparent 60%)",
          }}
        />
        <div className="relative z-10">
          <span className="mb-3 inline-block text-[11px] font-bold uppercase tracking-[2px] text-fh-amber">
            All Restaurants
          </span>
          <h1 className="font-display text-[clamp(32px,4vw,56px)] font-bold tracking-tight text-white">
            Our{" "}
            <em className="font-light text-fh-coral">restaurant</em> partners
          </h1>
          <p className="mx-auto mt-3 max-w-md font-light text-white/50">
            Browse FoodHub providers and explore full menus from local kitchens.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-14 xl:px-0">
        {providers.length === 0 ? (
          <div className="rounded-xl border border-fh-cream-dark bg-white py-16 text-center">
            <h2 className="font-display text-2xl font-bold text-fh-green-deep">
              No restaurants found
            </h2>
            <p className="mt-2 text-fh-green-muted">
              Try another location or come back later.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {providers.map((provider) => (
              <Link
                key={provider.id}
                href={`/providers/${provider.id}`}
                className="group block overflow-hidden rounded-2xl border border-fh-cream-dark bg-white transition-all duration-200 hover:-translate-y-1.5 hover:shadow-2xl"
              >
                <div className="relative h-44 bg-fh-green-deep">
                  {provider.image ? (
                    <Image
                      src={provider.image}
                      alt={provider.restaurantName}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-fh-green-soft font-display text-6xl font-bold text-white">
                      {provider.restaurantName[0]}
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/15" />
                  <div
                    className={`absolute right-3 top-3 flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold ${
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
                    {provider.isOpen ? "Open" : "Closed"}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-display text-[19px] font-bold text-fh-green-deep transition-colors group-hover:text-fh-coral">
                    {provider.restaurantName}
                  </h3>
                  <p className="mb-3 mt-1 text-[11px] font-bold uppercase tracking-[1.5px] text-fh-green-muted">
                    {(provider.cuisineTypes || []).join(" / ") || "Local kitchen"}
                  </p>
                  <div className="mb-3 flex flex-wrap items-center gap-3 text-sm">
                    <span className="flex items-center gap-1 font-semibold text-fh-green-deep">
                      <Star className="h-3.5 w-3.5 fill-fh-amber text-fh-amber" />
                      {provider.avgRating || 0}
                    </span>
                    <span className="flex items-center gap-1 text-fh-green-muted">
                      <Clock className="h-3.5 w-3.5" />
                      {provider.mealCount || 0} meals
                    </span>
                    <span className="text-fh-green-muted">
                      {formatCurrency(provider.deliveryFee || 0)} delivery
                    </span>
                  </div>
                  <div className="mb-3 flex items-center gap-1.5 text-xs text-fh-green-muted">
                    <MapPin className="h-3.5 w-3.5 shrink-0 text-fh-coral" />
                    <span>{provider.address || "Bangladesh"}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {(provider.cuisineTypes || []).slice(0, 3).map((type) => (
                      <Badge key={type} variant="secondary" className="text-[10px]">
                        {type}
                      </Badge>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
