import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getMealDetail } from "@/services/meals";
import { Clock, Minus, Plus, ShieldCheck, Star, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function MealDetail({ params }: {params: Promise<{id: string}>}) {
  const {id} = await params;
  const {data: meal} = await getMealDetail(id);
  return (
    <div className="pt-32 bg-fh-cream">
      <div className="container mx-auto px-4 xl:px-0 pb-16">
        <div className="flex flex-col lg:flex-row gap-10 mb-16">
          {/* Image */}
          <div className="relative w-full lg:w-1/2 md:h-140 sm:h-120 h-80">
            <Image
              src={meal.image}
              alt={meal.title}
              fill
              className="object-cover rounded-2xl"
            />
          </div>

          {/* Details */}
          <div className="flex flex-col lg:w-1/2">
            <div className="mb-2">
              <span className="text-[11px] font-bold tracking-[2px] uppercase text-fh-coral">
                {meal.category.name}
              </span>
            </div>
            <h1 className="font-display text-[clamp(28px,3vw,42px)] font-bold text-fh-green-deep leading-tight tracking-tight mb-3">
              {meal.title}
            </h1>

            {/* Provider link */}
            <Link
              href={`/providers/${meal.providerId}`}
              className="flex items-center gap-2.5 mb-4 w-fit group"
            >
              <div className="w-8 h-8 rounded-full bg-fh-green-soft flex items-center justify-center text-white text-xs font-bold">
                {meal.provider.restaurantName[0]}
              </div>
              <span className="text-sm font-medium text-fh-green-muted group-hover:text-fh-coral transition-colors">
                {meal.provider.restaurantName}
              </span>
            </Link>

            {/* Rating & time */}
            <div className="flex items-center gap-4 mb-5">
              <div className="flex items-center gap-1.5">
                <Star className="h-4 w-4 fill-fh-amber text-fh-amber" />
                <span className="font-bold text-fh-green-deep">
                  {meal.avgRating}
                </span>
                <span className="text-sm text-fh-green-muted">
                  ({meal.reviewCount} reviews)
                </span>
              </div>
              <div className="w-1 h-1 rounded-full bg-fh-cream-dark" />
              <div className="flex items-center gap-1.5 text-sm text-fh-green-muted">
                <Clock className="h-4 w-4" />
                <span>{meal.prepTime} min prep</span>
              </div>
            </div>

            <p className="text-[15px] text-fh-green-muted leading-relaxed mb-6 font-light">
              {meal.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {meal.tags.map((t: string) => (
                <Badge
                  key={t}
                  variant="secondary"
                  className="capitalize text-xs bg-fh-cream-dark"
                >
                  {t}
                </Badge>
              ))}
            </div>
            <div className="ml-auto sm:hidden mb-3">
              <p className="text-xs text-fh-green-muted mb-0.5">
                Price per item
              </p>
              <p className="font-display text-3xl font-bold text-fh-coral">
                ৳{meal.price}
              </p>
            </div>

            {/* Price + qty */}
            <div className="flex justify-between flex-row-reverse sm:flex-row gap-4 mb-6 p-4 bg-fh-cream rounded-2xl border border-fh-cream-dark">
              <div className="hidden sm:block">
                <p className="text-xs text-fh-green-muted mb-0.5">
                  Price per item
                </p>
                <p className="font-display text-3xl font-bold text-fh-coral">
                  ৳{meal.price}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button className="w-9 h-9 rounded-full border-2 border-fh-cream-dark flex items-center justify-center hover:border-fh-coral transition-colors">
                  <Minus className="h-4 w-4" />
                </button>
                <span className="text-xl font-bold text-fh-green-deep w-6 text-center">
                  1
                </span>
                <button className="w-9 h-9 rounded-full bg-fh-coral text-white flex items-center justify-center hover:bg-fh-coral-hover transition-colors">
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <div className="ml-4">
                <p className="text-xs text-fh-green-muted mb-0.5">Total</p>
                <p className="font-display text-2xl font-bold text-fh-green-deep">
                  ৳{meal.price}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex sm:flex-row flex-col gap-3 mb-6">
              <Button
                className={`flex-1 h-12 text-base font-semibold gap-2 transition-all`}
              >
                Add to Cart · ৳{meal.price}
              </Button>
              <Link href="/customer/checkout" className="flex-1">
                <Button
                  variant="outline"
                  className="w-full h-12 text-base font-semibold border-fh-green-deep text-fh-green-deep hover:bg-fh-green-deep hover:text-white transition-colors"
                >
                  Order Now
                </Button>
              </Link>
            </div>

            {/* Trust badges */}
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
              ].map((b) => (
                <div
                  key={b.label}
                  className="flex flex-col items-center gap-1.5 p-3 bg-fh-cream rounded-xl text-center"
                >
                  <div className="text-fh-green-soft">{b.icon}</div>
                  <p className="text-[11px] font-medium text-fh-green-muted leading-tight">
                    {b.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
