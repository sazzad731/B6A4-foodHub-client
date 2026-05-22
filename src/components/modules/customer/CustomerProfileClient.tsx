"use client";

import { useState } from "react";
import { Camera, Save } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import DashboardHeader from "@/components/modules/dashboard/DashboardHeader";
import { getInitials } from "@/lib/format";
import { updateOwnProfile } from "@/services/users";
import { TUser } from "@/types";

export default function CustomerProfileClient({ user }: { user: TUser }) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: user.name || "",
    phone: user.phone || "",
    address: user.address || "",
    image: user.image || "",
  });

  const save = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    const result = await updateOwnProfile(form);
    setLoading(false);

    if (result.success) {
      toast.success("Profile updated successfully.");
    } else {
      toast.error(result.message || "Unable to update profile.");
    }
  };

  const field = (key: keyof typeof form) => ({
    value: form[key],
    onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
      setForm((current) => ({ ...current, [key]: event.target.value })),
  });

  return (
    <div>
      <DashboardHeader
        title="My Profile"
        subtitle="Manage your personal information"
      />
      <div className="max-w-2xl p-4 sm:p-6">
        <form onSubmit={save} className="space-y-5">
          <div className="flex items-center gap-5 rounded-xl border border-fh-cream-dark bg-white p-6">
            <div className="relative">
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-fh-green-soft text-3xl font-bold text-white">
                {getInitials(form.name)}
              </div>
              <button
                type="button"
                className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-fh-coral text-white transition-colors hover:bg-fh-coral-hover"
              >
                <Camera className="h-3.5 w-3.5" />
              </button>
            </div>
            <div>
              <p className="text-lg font-bold text-fh-green-deep">
                {form.name || "FoodHub Customer"}
              </p>
              <p className="text-sm text-fh-green-muted">Customer account</p>
              <p className="mt-1 text-xs text-fh-green-light">{user.email}</p>
            </div>
          </div>

          <div className="space-y-5 rounded-xl border border-fh-cream-dark bg-white p-6">
            <h2 className="border-b border-fh-cream-dark pb-3 font-semibold text-fh-green-deep">
              Personal Information
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <Label className="font-medium text-fh-green-deep">Full Name</Label>
                <Input className="mt-1.5 h-11" {...field("name")} />
              </div>
              <div>
                <Label className="font-medium text-fh-green-deep">
                  Email Address
                </Label>
                <Input
                  type="email"
                  className="mt-1.5 h-11"
                  value={user.email}
                  disabled
                />
              </div>
              <div>
                <Label className="font-medium text-fh-green-deep">
                  Phone Number
                </Label>
                <Input className="mt-1.5 h-11" {...field("phone")} />
              </div>
              <div className="sm:col-span-2">
                <Label className="font-medium text-fh-green-deep">
                  Default Delivery Address
                </Label>
                <Input className="mt-1.5 h-11" {...field("address")} />
              </div>
              <div className="sm:col-span-2">
                <Label className="font-medium text-fh-green-deep">
                  Profile Image URL
                </Label>
                <Input className="mt-1.5 h-11" {...field("image")} />
              </div>
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="h-11 bg-fh-coral px-8 font-semibold text-white hover:bg-fh-coral-hover"
          >
            <Save className="mr-2 h-4 w-4" />
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </form>
      </div>
    </div>
  );
}
