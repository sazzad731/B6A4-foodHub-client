import Link from "next/link";
import { Search, Zap, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";

export function Hero() {
  return (
    <section className="py-12 sm:py-16">
        <div className="flex justify-between flex-col-reverse lg:flex-row gap-8 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">
                Discover & Order Delicious Meals
              </h1>
              <p className="text-lg text-gray-600">
                Food delivery at your doorstep. Fresh, fast, and always
                delicious.
              </p>
            </div>

            {/* Search Bar (Static UI) */}
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Search meals, cuisines..."
                  className="pl-10 h-12 rounded-lg border-gray-300 bg-white"
                />
              </div>
              <Link href="/meals">
                <Button className="w-full sm:w-auto h-12 bg-red-600 hover:bg-red-700 px-6 text-white">
                  Browse All
                </Button>
              </Link>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="flex gap-3">
                <div className="h-10 w-10 flex items-center justify-center rounded-full bg-red-100 shrink-0">
                  <Zap className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Fast Delivery</p>
                  <p className="text-sm text-gray-600">20-40 minutes</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="h-10 w-10 flex items-center justify-center rounded-full bg-red-100 shrink-0">
                  <MapPin className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Wide Range</p>
                  <p className="text-sm text-gray-600">100+ restaurants</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Image Placeholder */}
          <div className="relative h-80 lg:h-96">
            <div className="absolute inset-0 bg-linear-to-br from-red-400 to-orange-400 rounded-2xl opacity-10 z-0" />
            <div className="w-full h-full bg-gray-200 rounded-2xl flex items-center justify-center overflow-hidden border border-gray-100">
              <Image
                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80"
                alt="Delicious food"
                className="w-full h-full object-cover rounded-2xl"
                width={500}
                height={500}
              />
            </div>
          </div>
        </div>
    </section>
  );
}
