import ProviderProfileClient from "@/components/modules/provider/ProviderProfileClient";
import { getCurrentUser } from "@/services/auth";

export default async function ProfilePage() {
  const { data: user } = await getCurrentUser();

  if (!user) {
    return null;
  }

  return <ProviderProfileClient user={user} />;
}
