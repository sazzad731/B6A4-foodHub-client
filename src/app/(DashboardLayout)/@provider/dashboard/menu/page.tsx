import ProviderMenuClient from "@/components/modules/provider/ProviderMenuClient";
import { getAllCategory } from "@/services/category";
import { getCurrentProviderProfile } from "@/services/providers";
import { TMeal } from "@/types";

export default async function MenuPage() {
  const [{ data: provider }, { data: categories }] = await Promise.all([
    getCurrentProviderProfile(),
    getAllCategory(),
  ]);
  const meals = ((provider?.meals || []).map((meal) => ({
    ...meal,
    provider: provider!,
    category: {
      id: meal.categoryId,
      name: meal.category?.name || "Meal",
      slug: meal.category?.slug || "meal",
      image: meal.category?.image || provider?.image || "",
    },
  })) || []) as TMeal[];

  return <ProviderMenuClient initialMeals={meals} categories={categories || []} />;
}
