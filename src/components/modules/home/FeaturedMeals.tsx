import Link from "next/link";
import MealCard from "@/components/shared/MealCard";

export default function Featuredmeals() {
  const meals = [
    {
      id: "1",
      providerId: "p1",
      providerName: "Pizza Palace",
      categoryId: "4",
      categoryName: "Italian · Pizza",
      title: "Wood-fired Margherita",
      description:
        "Classic tomato, fresh mozzarella, basil on a wood-fired crust.",
      price: 320,
      image:
        "https://plus.unsplash.com/premium_photo-1673439304183-8840bd0dc1bf?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      rating: 4.9,
      reviewCount: 128,
      isAvailable: true,
      isVegan: false,
      tags: ["popular"],
    },
    {
      id: "2",
      providerId: "p2",
      providerName: "Burger House",
      categoryId: "3",
      categoryName: "American · Burgers",
      title: "Double Smash Burger",
      description: "Two smashed beef patties, cheddar, caramelised onion.",
      price: 350,
      image:
        "https://plus.unsplash.com/premium_photo-1683619761492-639240d29bb5?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      rating: 4.8,
      reviewCount: 204,
      isAvailable: true,
      isVegan: false,
      tags: ["new"],
    },
    {
      id: "3",
      providerId: "p3",
      providerName: "Sakura Restaurant",
      categoryId: "6",
      categoryName: "Japanese · Sushi",
      title: "Premium Salmon Roll (8pcs)",
      description: "Fresh Atlantic salmon, cucumber, avocado, soy glaze.",
      price: 480,
      image:
        "https://images.unsplash.com/photo-1635526910429-051cf1ed127e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      rating: 4.7,
      reviewCount: 89,
      isAvailable: true,
      isVegan: false,
      tags: ["luxury"],
    },
    {
      id: "4",
      providerId: "p4",
      providerName: "Roma Kitchen",
      categoryId: "7",
      categoryName: "Italian · Pasta",
      title: "Creamy Carbonara",
      description: "Al dente spaghetti, guanciale, egg yolk, aged pecorino.",
      price: 290,
      image:
        "https://images.unsplash.com/photo-1633337474564-1d9478ca4e2e?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      rating: 4.6,
      reviewCount: 67,
      isAvailable: true,
      isVegan: false,
      tags: ["popular"],
    },
    {
      id: "5",
      providerId: "p5",
      providerName: "Noodle Bar CTG",
      categoryId: "5",
      categoryName: "Japanese · Ramen",
      title: "Rich Tonkotsu Ramen",
      description:
        "18-hour pork bone broth, chashu pork, soft-boiled egg, nori.",
      price: 360,
      image:
        "https://images.unsplash.com/photo-1755151022192-f63b45cfa651?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      rating: 4.5,
      reviewCount: 55,
      isAvailable: true,
      isVegan: false,
      tags: ["famous"],
    },
    {
      id: "6",
      providerId: "p6",
      providerName: "Green Garden",
      categoryId: "8",
      categoryName: "Healthy · Salads",
      title: "Greek Goddess Salad",
      description: "Romaine, cherry tomato, olives, feta, lemon-herb dressing.",
      price: 220,
      image:
        "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      rating: 4.8,
      reviewCount: 43,
      isAvailable: true,
      isVegan: true,
      tags: ["vegan"],
    },
  ];


  const badgeColors = [
    "bg-blue-100 text-blue-700",
    "bg-green-100 text-green-700",
    "bg-sky-100 text-sky-700",
    "bg-purple-100 text-purple-700 ",
    "bg-red-100 text-red-700",
  ];

  return (
    <section className="py-20 bg-fh-cream-mid">
      <div className="container mx-auto px-4 xl:px-0">
        <div className="flex sm:flex-row flex-col justify-between mb-10">
          <div>
            <span className="block text-[11px] font-bold tracking-[2px] uppercase text-fh-coral mb-2.5">
              Editor&apos;s Picks
            </span>
            <h2 className="font-display text-[clamp(28px,3.5vw,44px)] font-bold tracking-tight">
              Featured <em className="font-light text-fh-green-muted">meals</em>
            </h2>
          </div>
          <Link
            href="/meals"
            className="text-sm font-semibold text-fh-coral flex items-center gap-1 mt-5 sm:mt-0"
          >
            Browse all →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {meals.map((meal, index) => {
            const randomColor = badgeColors[index % badgeColors.length];
            return (
            <Link href={`/meals/${meal.id}`} key={meal.id}>
              <MealCard meal={meal} badgeColor={randomColor}/>
            </Link>
          )
          })}
        </div>
      </div>
    </section>
  );
}
