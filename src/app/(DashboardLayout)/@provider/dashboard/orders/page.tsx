import ProviderOrdersClient from "@/components/modules/provider/ProviderOrdersClient";
import { getOrders } from "@/services/orders";

export default async function ProviderOrdersPage() {
  const { data: orders } = await getOrders();

  return <ProviderOrdersClient initialOrders={orders || []} />;
}
