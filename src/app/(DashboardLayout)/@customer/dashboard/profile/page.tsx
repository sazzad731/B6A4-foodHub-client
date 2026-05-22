import CustomerProfileClient from "@/components/modules/customer/CustomerProfileClient";
import { getCurrentUser } from "@/services/auth";

export default async function CustomerProfilePage() {
  const { data: user } = await getCurrentUser();

  if (!user) {
    return null;
  }

  return <CustomerProfileClient user={user} />;
}
