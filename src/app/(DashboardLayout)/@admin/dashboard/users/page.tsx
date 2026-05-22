import AdminUsersClient from "@/components/modules/admin/AdminUsersClient";
import { getAllUsers } from "@/services/users";

export default async function AdminUsersPage() {
  const { data: users } = await getAllUsers();

  return <AdminUsersClient initialUsers={users || []} />;
}
