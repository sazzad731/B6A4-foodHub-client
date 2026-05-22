import CheckoutClient from "@/components/modules/customer/CheckoutClient";
import { getCurrentUser } from "@/services/auth";

export default async function CheckoutPage() {
  const { data: user } = await getCurrentUser();

  return <CheckoutClient user={user} />;
}
