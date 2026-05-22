import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import MealDetailActions from "@/components/modules/meals/MealDetailActions";
import { getMealDetail, getMealReviews } from "@/services/meals";
import { formatCurrency, formatDate, getInitials } from "@/lib/format";
import { Clock, ShieldCheck, Star, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function MealDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [{ data: meal }, { data: reviewsResponse }] = await Promise.all([
    getMealDetail(id),
    getMealReviews(id),
  ]);

  const reviews = reviewsResponse?.reviews || [];

  if (!meal) {
    return (
      <section className="bg-fh-cream px-4 py-32 text-center">
        <h1 className="font-display text-3xl font-bold text-fh-green-deep">
          Meal not found
        </h1>
        <Link className="mt-4 inline-block text-fh-coral" href="/meals">
          Back to meals
        </Link>
      </section>
    );
  }

  return (
    <div className="bg-fh-cream pt-32">
      <div className="container mx-auto px-4 pb-16 xl:px-0">
        <div className="mb-16 flex flex-col gap-10 lg:flex-row">
          <div className="relative h-80 w-full md:h-140 sm:h-120 lg:w-1/2">
            <Image
              src={meal.image}
              alt={meal.title}
              fill
              className="rounded-2xl object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>

          <div className="flex flex-col lg:w-1/2">
            <span className="mb-2 text-[11px] font-bold uppercase tracking-[2px] text-fh-coral">
              {meal.category?.name || "Meal"}
            </span>
            <h1 className="mb-3 font-display text-[clamp(28px,3vw,42px)] font-bold leading-tight tracking-tight text-fh-green-deep">
              {meal.title}
            </h1>

            <Link
              href={`/providers/${meal.providerId}`}
              className="group mb-4 flex w-fit items-center gap-2.5"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-fh-green-soft text-xs font-bold text-white">
                {meal.provider?.restaurantName?.[0] || "F"}
              </div>
              <span className="text-sm font-medium text-fh-green-muted transition-colors group-hover:text-fh-coral">
                {meal.provider?.restaurantName || "FoodHub"}
              </span>
            </Link>

            <div className="mb-5 flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-1.5">
                <Star className="h-4 w-4 fill-fh-amber text-fh-amber" />
                <span className="font-bold text-fh-green-deep">
                  {meal.avgRating || 0}
                </span>
                <span className="text-sm text-fh-green-muted">
                  ({meal.reviewCount || 0} reviews)
                </span>
              </div>
              <div className="h-1 w-1 rounded-full bg-fh-cream-dark" />
              <div className="flex items-center gap-1.5 text-sm text-fh-green-muted">
                <Clock className="h-4 w-4" />
                <span>{meal.prepTime} min prep</span>
              </div>
            </div>

            <p className="mb-6 text-[15px] font-light leading-relaxed text-fh-green-muted">
              {meal.description}
            </p>

            <div className="mb-6 flex flex-wrap gap-2">
              {meal.tags?.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="bg-fh-cream-dark text-xs capitalize"
                >
                  {tag}
                </Badge>
              ))}
              {meal.isVegan && (
                <Badge variant="secondary" className="bg-green-50 text-green-700">
                  Vegan
                </Badge>
              )}
            </div>

            <div className="mb-3 ml-auto sm:hidden">
              <p className="mb-0.5 text-xs text-fh-green-muted">Price per item</p>
              <p className="font-display text-3xl font-bold text-fh-coral">
                {formatCurrency(meal.price)}
              </p>
            </div>

            <MealDetailActions meal={meal} />

            <div className="grid grid-cols-3 gap-3">
              {[
                {
                  icon: <Truck className="h-6 w-6" />,
                  label: "Cash on Delivery",
                },
                {
                  icon: <Clock className="h-6 w-6" />,
                  label: `${meal.prepTime} min prep`,
                },
                {
                  icon: <ShieldCheck className="h-6 w-6" />,
                  label: "Quality guaranteed",
                },
              ].map((badge) => (
                <div
                  key={badge.label}
                  className="flex flex-col items-center gap-1.5 rounded-xl bg-fh-cream p-3 text-center"
                >
                  <div className="text-fh-green-soft">{badge.icon}</div>
                  <p className="text-[11px] font-medium leading-tight text-fh-green-muted">
                    {badge.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="mb-6 font-display text-2xl font-bold text-fh-green-deep">
            Customer Reviews{" "}
            <span className="text-xl font-light text-fh-green-light">
              ({reviews.length})
            </span>
          </h2>
          {!reviews.length ? (
            <div className="rounded-xl border border-fh-cream-dark bg-white py-12 text-center text-fh-green-muted">
              No reviews yet.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
              {reviews.map((review) => (
                <Card key={review.id} className="border-fh-cream-dark">
                  <CardContent className="p-5">
                    <div className="mb-3 flex gap-0.5 text-fh-amber">
                      {"*".repeat(review.rating)}
                    </div>
                    <p className="mb-4 font-display text-sm font-light italic leading-relaxed text-fh-green-muted">
                      &ldquo;{review.comment}&rdquo;
                    </p>
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-fh-green-soft text-xs font-bold text-white">
                        {getInitials(review.customer?.name)}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-fh-green-deep">
                          {review.customer?.name}
                        </p>
                        <p className="text-[11px] text-fh-green-light">
                          {formatDate(review.createdAt)}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
