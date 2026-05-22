"use client";

import { useMemo, useState } from "react";
import { Eye, Search, ShieldBan, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DashboardHeader from "@/components/modules/dashboard/DashboardHeader";
import { formatDate, getInitials } from "@/lib/format";
import { updateUserStatus } from "@/services/users";
import { TRole, TUser } from "@/types";

const ROLE_COLORS: Record<TRole, string> = {
  CUSTOMER: "bg-blue-50 text-blue-700",
  PROVIDER: "bg-green-50 text-green-700",
  ADMIN: "bg-purple-50 text-purple-700",
};

export default function AdminUsersClient({
  initialUsers,
}: {
  initialUsers: TUser[];
}) {
  const [users, setUsers] = useState(initialUsers);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("ALL");

  const filtered = useMemo(
    () =>
      users.filter((user) => {
        const matchesSearch =
          user.name.toLowerCase().includes(search.toLowerCase()) ||
          user.email.toLowerCase().includes(search.toLowerCase());
        const matchesRole = roleFilter === "ALL" || user.role === roleFilter;

        return matchesSearch && matchesRole;
      }),
    [roleFilter, search, users],
  );

  const toggle = async (user: TUser) => {
    const status = user.status === "ACTIVE" ? "SUSPENDED" : "ACTIVE";
    const result = await updateUserStatus(user.id, status);

    if (!result.success || !result.data) {
      toast.error(result.message || "Unable to update user.");
      return;
    }

    setUsers((current) =>
      current.map((item) => (item.id === user.id ? result.data! : item)),
    );
    toast.success("User status updated.");
  };

  return (
    <div>
      <DashboardHeader
        title="User Management"
        subtitle={`${users.length} total users on the platform`}
      />
      <div className="space-y-5 p-4 sm:p-6">
        <div className="grid grid-cols-3 gap-4">
          {[
            ["Customers", users.filter((user) => user.role === "CUSTOMER").length, "bg-blue-50 text-blue-700"],
            ["Providers", users.filter((user) => user.role === "PROVIDER").length, "bg-green-50 text-green-700"],
            ["Suspended", users.filter((user) => user.status === "SUSPENDED").length, "bg-red-50 text-red-600"],
          ].map(([label, value, className]) => (
            <div key={label} className={`rounded-xl p-4 ${className}`}>
              <p className="font-display text-3xl font-bold">{value}</p>
              <p className="mt-0.5 text-sm font-semibold">{label}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-fh-green-light" />
            <Input
              className="h-10 pl-9"
              placeholder="Search by name or email"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="h-10 w-40 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Roles</SelectItem>
              <SelectItem value="CUSTOMER">Customers</SelectItem>
              <SelectItem value="PROVIDER">Providers</SelectItem>
              <SelectItem value="ADMIN">Admins</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="overflow-hidden rounded-xl border border-fh-cream-dark bg-white">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-fh-cream-dark bg-fh-cream/50">
                  {["User", "Email", "Role", "Phone", "Status", "Joined", "Actions"].map(
                    (heading) => (
                      <th
                        key={heading}
                        className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-fh-green-muted"
                      >
                        {heading}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody>
                {filtered.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b border-fh-cream-dark transition-colors hover:bg-fh-cream/30"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-fh-green-soft text-xs font-bold text-white">
                          {getInitials(user.name)}
                        </div>
                        <span className="font-medium text-fh-green-deep">
                          {user.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-xs text-fh-green-muted">
                      {user.email}
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${ROLE_COLORS[user.role]}`}
                      >
                        {user.role.toLowerCase()}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-xs text-fh-green-muted">
                      {user.phone || "N/A"}
                    </td>
                    <td className="px-5 py-4">
                      <Badge
                        className={
                          user.status === "ACTIVE"
                            ? "bg-green-50 text-green-700"
                            : "bg-red-50 text-red-600"
                        }
                      >
                        {user.status === "ACTIVE" ? "Active" : "Suspended"}
                      </Badge>
                    </td>
                    <td className="px-5 py-4 text-xs text-fh-green-muted">
                      {formatDate(user.createdAt)}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-fh-green-muted"
                        >
                          <Eye className="h-3.5 w-3.5" />
                        </Button>
                        {user.role !== "ADMIN" && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className={`h-8 w-8 ${
                              user.status === "ACTIVE"
                                ? "text-red-400 hover:bg-red-50 hover:text-red-600"
                                : "text-green-500 hover:bg-green-50 hover:text-green-700"
                            }`}
                            onClick={() => toggle(user)}
                          >
                            {user.status === "ACTIVE" ? (
                              <ShieldBan className="h-3.5 w-3.5" />
                            ) : (
                              <ShieldCheck className="h-3.5 w-3.5" />
                            )}
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 && (
            <div className="py-12 text-center text-fh-green-muted">
              No users match your search.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
