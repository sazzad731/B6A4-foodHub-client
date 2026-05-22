"use client";

import { useState } from "react";
import { Camera, Save, ToggleLeft, ToggleRight } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import DashboardHeader from "@/components/modules/dashboard/DashboardHeader";
import { updateOwnProfile } from "@/services/users";
import { getInitials } from "@/lib/format";
import { TUser } from "@/types";

export default function ProviderProfileClient({ user }: { user: TUser }) {
  const provider = user.providerProfile;
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    restaurantName: provider?.restaurantName || "",
    description: provider?.description || "",
    address: provider?.address || user.address || "",
    phone: provider?.phone || user.phone || "",
    image: provider?.image || user.image || "",
    deliveryFee: String(provider?.deliveryFee || ""),
    cuisineTypes: (provider?.cuisineTypes || []).join(", "),
    isOpen: provider?.isOpen ?? true,
  });

  const save = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    const result = await updateOwnProfile({
      ...form,
      cuisineTypes: form.cuisineTypes,
    });
    setLoading(false);

    if (result.success) {
      toast.success("Restaurant profile updated.");
    } else {
      toast.error(result.message || "Unable to update profile.");
    }
  };

  const field = (key: keyof typeof form) => ({
    value: String(form[key]),
    onChange: (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => setForm((current) => ({ ...current, [key]: event.target.value })),
  });

  return (
    <div>
      <DashboardHeader
        title="Restaurant Profile"
        subtitle="Manage your provider settings"
      />
      <div className="max-w-3xl space-y-5 p-4 sm:p-6">
        <form onSubmit={save} className="space-y-5">
          <div className="rounded-xl border border-fh-cream-dark bg-white p-6">
            <div className="flex items-center justify-between rounded-xl border border-fh-cream-dark bg-fh-cream p-4">
              <div>
                <p
                  className={`text-sm font-semibold ${
                    form.isOpen ? "text-green-700" : "text-gray-600"
                  }`}
                >
                  {form.isOpen
                    ? "Your store is currently open"
                    : "Your store is currently closed"}
                </p>
                <p className="mt-0.5 text-xs text-fh-green-muted">
                  {form.isOpen
                    ? "Customers can place orders right now"
                    : "Customers cannot order until you reopen"}
                </p>
              </div>
              <Button
                type="button"
                onClick={() =>
                  setForm((current) => ({ ...current, isOpen: !current.isOpen }))
                }
                variant="outline"
                className={`gap-2 ${
                  form.isOpen
                    ? "border-red-200 text-red-600 hover:bg-red-50"
                    : "border-green-200 text-green-700 hover:bg-green-50"
                }`}
              >
                {form.isOpen ? (
                  <ToggleRight className="h-4 w-4" />
                ) : (
                  <ToggleLeft className="h-4 w-4" />
                )}
                {form.isOpen ? "Close Store" : "Open Store"}
              </Button>
            </div>
          </div>

          <div className="space-y-5 rounded-xl border border-fh-cream-dark bg-white p-6">
            <div className="flex items-center gap-4">
              <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-fh-green-soft text-2xl font-bold text-white">
                {getInitials(form.restaurantName || user.name)}
                <button
                  type="button"
                  className="absolute -bottom-1.5 -right-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-fh-coral text-white"
                >
                  <Camera className="h-3 w-3" />
                </button>
              </div>
              <div>
                <p className="text-sm font-semibold text-fh-green-deep">
                  Restaurant Profile
                </p>
                <p className="text-xs text-fh-green-muted">
                  Update restaurant details shown to customers.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <Label>Restaurant Name</Label>
                <Input className="mt-1.5 h-11" {...field("restaurantName")} />
              </div>
              <div className="sm:col-span-2">
                <Label>Description</Label>
                <Textarea className="mt-1.5" {...field("description")} />
              </div>
              <div>
                <Label>Phone Number</Label>
                <Input className="mt-1.5 h-11" {...field("phone")} />
              </div>
              <div>
                <Label>Delivery Fee</Label>
                <Input
                  type="number"
                  className="mt-1.5 h-11"
                  {...field("deliveryFee")}
                />
              </div>
              <div className="sm:col-span-2">
                <Label>Cuisine Types</Label>
                <Input
                  className="mt-1.5 h-11"
                  placeholder="Bangla, fast-food, fusion"
                  {...field("cuisineTypes")}
                />
              </div>
              <div className="sm:col-span-2">
                <Label>Address</Label>
                <Input className="mt-1.5 h-11" {...field("address")} />
              </div>
              <div className="sm:col-span-2">
                <Label>Image URL</Label>
                <Input className="mt-1.5 h-11" {...field("image")} />
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="gap-2 bg-fh-coral text-white hover:bg-fh-coral-hover"
            >
              <Save className="h-4 w-4" />
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
