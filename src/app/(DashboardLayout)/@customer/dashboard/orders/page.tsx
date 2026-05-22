import CustomerOrdersClient from "@/components/modules/customer/CustomerOrdersClient";
import { getOrders } from "@/services/orders";

export default async function CustomerOrdersPage() {
  const { data: orders } = await getOrders();

  return <CustomerOrdersClient initialOrders={orders || []} />;
}
