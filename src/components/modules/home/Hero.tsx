import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const FLOAT_CARDS = [
  {
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Wood-fired Margherita",
    provider: "Pizza Palace · 25 min",
    price: "৳320",
    rating: "4.9",
    pos: "-top-4 2xl:left-30 xl:left-20 animate-float-a",
  },
  {
    image:
      "https://images.unsplash.com/photo-1583623025817-d180a2221d0a?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Salmon Sushi Set",
    provider: "Sakura · 35 min",
    price: "৳480",
    rating: "4.7",
    pos: "-top-5 2xl:right-30 xl:right-20 right-0 animate-float-b",
  },
  {
    image:
      "https://images.unsplash.com/photo-1639020715088-e7afebe6cb25?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Classic Smash Burger",
    provider: "Burger House · 20 min",
    price: "৳280",
    rating: "4.8",
    pos: "bottom-4 2xl:left-30 xl:left-20 animate-float-c",
  },
  {
    image:
      "https://images.unsplash.com/photo-1756620964731-a6b8cab05fdd?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Tonkotsu Ramen",
    provider: "Noodle Bar · 30 min",
    price: "৳360",
    rating: "4.6",
    pos: "bottom-4 2xl:right-30 xl:right-20 right-0 animate-float-d",
  },
];

export default function Hero() {
  return (
    <section className="bg-fh-green-deep">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 items-center gap-12 xl:px-0 px-4 lg:py-40 pt-30 pb-45 relative overflow-hidden">
        {/* bg glows */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-1/2 left-[65%] -translate-x-1/2 -translate-y-1/2 w-150 h-125 rounded-full"
            style={{
              background:
                "radial-gradient(ellipse,rgba(240,165,0,0.07) 0%,transparent 60%)",
            }}
          />
          <div
            className="absolute bottom-0 left-[10%] w-100 h-100 rounded-full"
            style={{
              background:
                "radial-gradient(ellipse,rgba(232,75,42,0.07) 0%,transparent 55%)",
            }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 mb-7 rounded-full border px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-fh-amber-light bg-fh-amber-light/12 border-fh-amber-light/25">
            <span className="w-1.5 h-1.5 rounded-full bg-fh-amber animate-pulse2" />
            Now live in Chattogram &amp; beyond
          </div>
          <h1 className="font-display text-[clamp(46px,5.5vw,80px)] font-bold leading-[1.02] tracking-[-2px] mb-7 text-fh-cream">
            Discover
            <br />
            <em className="font-light text-fh-coral-light">delicious</em>
            <br />
            meals near you
          </h1>
          <p className="text-base font-light leading-relaxed mb-10 max-w-md text-fh-cream/55">
            Order from your favourite restaurants, track your delivery in real
            time, and enjoy exceptional food delivered straight to your door.
          </p>
          <div className="flex flex-wrap gap-3.5">
            <Link href="/meals">
              <Button
                size="lg"
                className="bg-fh-coral hover:bg-fh-coral-hover text-white px-7 h-12 text-base font-semibold cursor-pointer"
              >
                Order Now →
              </Button>
            </Link>
            <Link href="/register">
              <Button
                size="lg"
                variant="outline"
                className="h-12 px-7 text-base cursor-pointer border-fh-cream/25 text-fh-cream/75 bg-transparent"
              >
                Become a Provider
              </Button>
            </Link>
          </div>
          {/* Stats */}
          <div className="flex flex-wrap gap-8 mt-14 pt-10 border-t border-fh-cream/10">
            {[
              ["340+", "Menu items"],
              ["80+", "Restaurants"],
              ["4.8★", "Avg. rating"],
            ].map(([num, label]) => (
              <div key={label}>
                <div className="font-display text-3xl font-bold text-fh-cream">
                  {num}
                </div>
                <div className="text-[13px] mt-1 text-fh-cream/45">{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Floating cards */}
        <div className="relative hidden lg:block h-140 z-10">
          {FLOAT_CARDS.map((card) => (
            <div
              key={card.name}
              className={`absolute w-52 rounded-2xl overflow-hidden ${card.pos} bg-white/6 backdrop-blur-md border border-white/10 shadow-2xl/50`}
            >
              <div className={`relative h-32 w-full`}>
                <Image
                  src={card.image}
                  alt={card.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-3.5 pb-4">
                <p className="font-display text-sm font-semibold mb-1 text-fh-cream">
                  {card.name}
                </p>
                <p className="text-[11px] mb-2.5 text-fh-cream/50">
                  {card.provider}
                </p>
                <div className="flex items-center justify-between">
                  <span className="font-display text-lg font-bold text-fh-amber-light">
                    {card.price}
                  </span>
                  <span className="text-xs text-fh-cream">
                    ⭐ {card.rating}
                  </span>
                </div>
              </div>
            </div>
          ))}
          <div className="absolute top-60 2xl:left-60 xl:left-45 left-25 rounded-xl px-3.5 py-3 flex items-center gap-2.5 text-[13px] font-semibold animate-float-b mb-7 border text-xs tracking-wider text-fh-coral-light bg-fh-coral-light/12 border-fh-coral-light/25 shadow-lg shadow-fh-coral/20">
            <span className="w-2 h-2 rounded-full bg-fh-coral animate-pulse2" />
            Order just delivered to Agrabad!
          </div>
        </div>
      </div>
    </section>
  );
}
