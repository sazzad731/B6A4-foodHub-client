import AdminOrdersClient from "@/components/modules/admin/AdminOrdersClient";
import { getOrders } from "@/services/orders";

export default async function AdminOrdersPage() {
  const { data: orders } = await getOrders();

  return <AdminOrdersClient initialOrders={orders || []} />;
}
