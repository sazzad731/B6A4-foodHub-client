"use client";
import { usePathname} from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function Categories() {
  const pathName = usePathname();

  const categories = [
    {
      id: "1",
      name: "Bengali",
      image:
        "https://images.unsplash.com/photo-1588644525273-f37b60d78512?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      mealCount: 90,
      slug: "bengali",
    },
    {
      id: "2",
      name: "Burgers",
      image:
        "https://plus.unsplash.com/premium_vector-1721890180863-f518975cd5a0?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      mealCount: 62,
      slug: "burgers",
    },
    {
      id: "3",
      name: "Pizza",
      image:
        "https://plus.unsplash.com/premium_vector-1730515692314-ba66a6869cc2?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      mealCount: 48,
      slug: "pizza",
    },
    {
      id: "4",
      name: "Chinese",
      image:
        "https://img.freepik.com/premium-photo/time-lunch-chinese-food-lunchtime-illustration_641503-88453.jpg?w=1060",
      mealCount: 55,
      slug: "chinese",
    },
    {
      id: "5",
      name: "Sushi",
      image:
        "https://img.freepik.com/free-vector/hand-drawn-sushi-illustration_52683-89537.jpg?t=st=1774388050~exp=1774391650~hmac=ccf854332e9e6e33f401f7b9c06c3505c26612fb93f8185a2f38746b418d8110&w=1480",
      mealCount: 34,
      slug: "sushi",
    },
    {
      id: "6",
      name: "Pasta",
      image:
        "https://plus.unsplash.com/premium_vector-1731205147480-f63a955fce56?q=80&w=919&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      mealCount: 40,
      slug: "pasta",
    },
    {
      id: "7",
      name: "Salads",
      image:
        "https://img.freepik.com/free-vector/colorful-drawing-vegetable-salad_1284-40928.jpg?t=st=1774387430~exp=1774391030~hmac=24d0159d388e7edc2e6a7474239e4e5cd6084341e7e849d9bdfa414437480abc&w=1480",
      mealCount: 28,
      slug: "salads",
    },
    {
      id: "8",
      name: "Desserts",
      image:
        "https://img.freepik.com/free-vector/hand-drawn-american-cuisine-illustration_23-2149330334.jpg?t=st=1774387496~exp=1774391096~hmac=4fe0d697a0923adc722a949e4acc3a5b5f341e3867b165f4d76f1653ca6a701e&w=1060",
      mealCount: 44,
      slug: "desserts",
    },
    {
      id: "9",
      name: "Drinks",
      image:
        "https://img.freepik.com/premium-vector/vibrant-colorful-toast-illustration-perfect-new-year-celebrations-showcasing-festive-drinks-fruit-new-year-toast-customizable-semi-flat-illustration_538213-149203.jpg?w=1060",
      mealCount: 30,
      slug: "drinks",
    },
  ];

  return (
    <section className="bg-fh-cream">
      <div className="container mx-auto px-4 lg:px-0 sm:py-30 pt-45 pb-20">
        <div className="flex justify-between mb-10 sm:flex-row flex-col">
          <div>
            <span className="block text-xs font-bold tracking-[2px] uppercase text-fh-coral mb-2.5">
              Explore by Cuisine
            </span>
            <h2 className="font-display text-[clamp(28px,3.5vw,44px)] font-bold tracking-tight leading-tight">
              What are you{" "}
              <em className="font-light text-fh-green-muted">craving today?</em>
            </h2>
          </div>
          <a
            href="/meals"
            className="text-sm font-semibold text-fh-coral hover:gap-2 sm:mt-0 mt-10 flex items-center gap-1 transition-all"
          >
            All cuisines →
          </a>
        </div>
        <div className="flex gap-3.5 overflow-x-auto py-2 scrollbar-hide">
          {categories.map((item) => (
            <Link
              key={item.id}
              href={`/meals?category=${item.slug}`}
              className={`shrink-0 w-40 rounded-2xl border-[1.5px] px-3 pt-5 pb-4 flex flex-col items-center gap-3 cursor-pointer transition-all duration-200
              ${
                pathName === `/meals?category=${item.slug}`
                  ? "bg-fh-coral border-fh-coral text-white shadow-lg shadow-fh-coral/30 -translate-y-1"
                  : "bg-white border-fh-cream-dark hover:border-fh-coral hover:bg-fh-coral/5 hover:-translate-y-1 hover:shadow-lg"
              }`}
            >
              <div className="relative h-20 w-20">
                <Image
                  src={item.image}
                  alt={item.slug}
                  fill
                  className="rounded-full object-cover"
                />
              </div>

              <span
                className={`text-[13px] font-semibold ${pathName === `/meals?category=${item.slug}` ? "text-white" : "text-fh-green-deep"}`}
              >
                {item.name}
              </span>
              <span
                className={`text-[11px] ${pathName === `/meals?category=${item.slug}` ? "text-white/70" : "text-fh-green-light"}`}
              >
                {item.mealCount}+ items
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
