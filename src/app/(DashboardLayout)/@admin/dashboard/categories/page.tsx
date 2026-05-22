import AdminCategoriesClient from "@/components/modules/admin/AdminCategoriesClient";
import { getAllCategory } from "@/services/category";

export default async function AdminCategoriesPage() {
  const { data: categories } = await getAllCategory();

  return <AdminCategoriesClient initialCategories={categories || []} />;
}
