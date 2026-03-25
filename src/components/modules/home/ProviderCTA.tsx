import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChartColumn, Pencil, Rocket, UserStar } from "lucide-react";

const FEATURES = [
  {
    icon: ChartColumn,
    title: "Real-time dashboard",
    desc: "track every order as it happens",
  },
  {
    icon: Pencil,
    title: "Easy menu management",
    desc: "add, edit, or remove items anytime",
  },
  {
    icon: Rocket,
    title: "Instant visibility",
    desc: "reach thousands of active customers",
  },
  {
    icon: UserStar,
    title: "Customer reviews",
    desc: "build your reputation and trust",
  },
];

export default function ProviderCTA() {
  return (
    <section className="container mx-auto px-4 lg:px-0 py-20">
      <div className="rounded-[2rem] px-8 sm:px-14 py-16 sm:py-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative overflow-hidden bg-fh-green-mid">
        <div className="absolute -right-20 -top-20 w-100 h-100 rounded-full pointer-events-none bg-fh-amber/6" />
        <div className="absolute -bottom-15 left-[60%] w-70 h-70 rounded-full pointer-events-none bg-fh-coral/7" />
        <div className="relative z-10">
          <span className="block text-[11px] font-bold tracking-[2px] text-fh-amber-light uppercase mb-4">
            For Restaurants &amp; Food Vendors
          </span>
          <h2 className="font-display text-[clamp(28px,3vw,44px)] text-fh-cream font-bold tracking-tight leading-tight mb-5">
            Grow your{" "}
            <em className="font-light text-fh-cream/50">restaurant business</em>{" "}
            with FoodHub
          </h2>
          <p className="text-base font-light leading-relaxed mb-9 max-w-md text-fh-cream/55">
            Join our growing network of food providers and reach thousands of
            hungry customers in Chattogram. Manage your menu, track orders, and
            grow your revenue.
          </p>
          <div className="flex flex-wrap gap-3.5">
            <Link href="/register">
              <Button
                size="lg"
                className="h-12 px-7 text-base bg-fh-cream hover:bg-fh-cream-dark text-fh-green-deep cursor-pointer"
              >
                Start for Free →
              </Button>
            </Link>
            <Link href="/">
              <Button
                size="lg"
                variant="outline"
                className="h-12 px-7 text-base border-fh-cream/20 text-fh-cream/80 bg-transparent hover:bg-transparent hover:text-fh-cream/80 cursor-pointer"
              >
                Learn More
              </Button>
            </Link>
          </div>
        </div>
        <div className="relative z-10 flex flex-col gap-4">
          {FEATURES.map((f) => (
            <div key={f.title} className="flex items-center gap-4">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-lg text-fh-cream shrink-0 bg-fh-cream/7"
              >
                <f.icon/>
              </div>
              <p
                className="text-[15px] text-fh-cream/70"
              >
                <strong className="font-semibold text-fh-cream">
                  {f.title}
                </strong>{" "}
                — {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
