import { Search, ShoppingCart, Package } from "lucide-react";
export default function HowItWorks() {
  const steps = [
    {
      n: "01",
      icon: Search,
      title: "Browse & Discover",
      desc: "Explore hundreds of meals from local restaurants. Filter by cuisine, dietary preference, price range, and delivery time.",
      color: "bg-fh-coral/15",
    },
    {
      n: "02",
      icon: ShoppingCart,
      title: "Add to Cart & Checkout",
      desc: "Build your perfect order, review your cart, and place it with your delivery address. We use Cash on Delivery — no payment hassle.",
      color: "bg-fh-amber/12",
    },
    {
      n: "03",
      icon: Package,
      title: "Track & Enjoy",
      desc: "Follow your order from preparation to your doorstep in real time. Once delivered, leave a review to help others discover great food.",
      color: "bg-fh-green-light/12",
    },
  ];
  return (
    <section id="how" className="relative overflow-hidden bg-fh-green-deep">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 80% at 80% 50%,rgba(240,165,0,0.06) 0%,transparent 60%)",
        }}
      />
      <div className="container mx-auto px-4 lg:px-0 pt-20 pb-0">
        <div className="mb-14">
          <span className="block text-[11px] font-bold tracking-[2px] uppercase mb-2.5 text-fh-amber-light">
            Simple &amp; Fast
          </span>
          <h2 className="font-display text-[clamp(28px,3.5vw,44px)] font-bold tracking-tight text-fh-cream">
            Order in three{" "}
            <em className="font-light text-fh-cream/30">easy steps</em>
          </h2>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 border-t border-fh-cream/8">
        {steps.map((s, i) => (
          <div
            key={s.n}
            className={`px-10 py-14 relative ${i < 2 ? "lg:border-r" : ""} border-fh-cream/8`}
          >
            <span className="absolute top-8 right-8 font-display text-[80px] font-black leading-none select-none text-fh-cream/6 tracking-tighter">
              {s.n}
            </span>
            <div
              className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-6 ${s.color} text-fh-cream`}
            >
              <s.icon/>
            </div>
            <h3
              className="font-display text-2xl font-bold mb-3 tracking-tight text-fh-cream"
            >
              {s.title}
            </h3>
            <p
              className="text-[15px] font-light leading-relaxed text-fh-cream/50"
            >
              {s.desc}
            </p>
          </div>
        ))}
      </div>
      <div className="pb-20" />
    </section>
  );
}
