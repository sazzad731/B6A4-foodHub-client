"use client";

import { useState } from "react";
import Image from "next/image";
import { Pencil, Plus, Trash2, ToggleLeft, ToggleRight } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import DashboardHeader from "@/components/modules/dashboard/DashboardHeader";
import { addMealToMenu, deleteMeal, updateMeal } from "@/services/meals";
import { formatCurrency } from "@/lib/format";
import { TCategory, TMeal } from "@/types";

type EditingMeal = {
  id?: string;
  title: string;
  description: string;
  price: string;
  image: string;
  prepTime: string;
  categoryId: string;
  tags: string;
  isAvailable: boolean;
  isVegan: boolean;
};

const blankMeal = (categoryId = ""): EditingMeal => ({
  title: "",
  description: "",
  price: "",
  image: "",
  prepTime: "20",
  categoryId,
  tags: "",
  isAvailable: true,
  isVegan: false,
});

export default function ProviderMenuClient({
  initialMeals,
  categories,
}: {
  initialMeals: TMeal[];
  categories: TCategory[];
}) {
  const [meals, setMeals] = useState(initialMeals);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<EditingMeal>(
    blankMeal(categories[0]?.id),
  );
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const openAdd = () => {
    setEditing(blankMeal(categories[0]?.id));
    setOpen(true);
  };

  const openEdit = (meal: TMeal) => {
    setEditing({
      id: meal.id,
      title: meal.title,
      description: meal.description || "",
      price: String(meal.price || ""),
      image: meal.image || "",
      prepTime: String(meal.prepTime || 20),
      categoryId: meal.categoryId,
      tags: (meal.tags || []).join(", "),
      isAvailable: meal.isAvailable,
      isVegan: meal.isVegan,
    });
    setOpen(true);
  };

  const payload = {
    title: editing.title,
    description: editing.description,
    price: editing.price,
    image: editing.image,
    prepTime: Number(editing.prepTime) || 20,
    categoryId: editing.categoryId,
    tags: editing.tags,
    isAvailable: editing.isAvailable,
    isVegan: editing.isVegan,
  };

  const save = async () => {
    if (!editing.title || !editing.categoryId || !editing.price || !editing.image) {
      toast.error("Title, category, price and image are required.");
      return;
    }

    setSaving(true);
    const result = editing.id
      ? await updateMeal(editing.id, payload)
      : await addMealToMenu(payload);
    setSaving(false);

    if (!result.success || !result.data) {
      toast.error(result.message || "Unable to save meal.");
      return;
    }

    setMeals((current) =>
      editing.id
        ? current.map((meal) => (meal.id === editing.id ? result.data! : meal))
        : [result.data!, ...current],
    );
    setOpen(false);
    toast.success(editing.id ? "Meal updated." : "Meal added.");
  };

  const toggle = async (meal: TMeal) => {
    const result = await updateMeal(meal.id, {
      isAvailable: !meal.isAvailable,
    });

    if (!result.success || !result.data) {
      toast.error(result.message || "Unable to update meal.");
      return;
    }

    setMeals((current) =>
      current.map((item) => (item.id === meal.id ? result.data! : item)),
    );
  };

  const remove = async () => {
    if (!deleteId) {
      return;
    }

    const result = await deleteMeal(deleteId);

    if (!result.success) {
      toast.error(result.message || "Unable to delete meal.");
      return;
    }

    setMeals((current) => current.filter((meal) => meal.id !== deleteId));
    setDeleteId(null);
    toast.success("Meal deleted.");
  };

  return (
    <div>
      <DashboardHeader
        title="My Menu"
        subtitle={`${meals.length} items - ${meals.filter((meal) => meal.isAvailable).length} active`}
        action={
          <Button
            onClick={openAdd}
            className="gap-1.5 bg-fh-green-deep text-white hover:bg-fh-green-mid"
          >
            <Plus className="h-4 w-4" />
            Add Meal
          </Button>
        }
      />
      <div className="p-4 sm:p-6">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {meals.map((meal) => (
            <div
              key={meal.id}
              className={`overflow-hidden rounded-xl border-[1.5px] bg-white transition-all ${
                meal.isAvailable ? "border-fh-cream-dark" : "border-fh-cream-dark opacity-60"
              }`}
            >
              <div className="relative h-40 bg-fh-green-deep">
                <Image
                  src={meal.image}
                  alt={meal.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-black/10" />
                <button
                  onClick={() => toggle(meal)}
                  className="absolute right-3 top-3 text-white/90 transition-colors hover:text-white"
                >
                  {meal.isAvailable ? (
                    <ToggleRight className="h-7 w-7" />
                  ) : (
                    <ToggleLeft className="h-7 w-7" />
                  )}
                </button>
                {!meal.isAvailable && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <Badge variant="secondary" className="text-sm font-bold">
                      Unavailable
                    </Badge>
                  </div>
                )}
              </div>
              <div className="p-4">
                <div className="mb-1.5 flex items-start justify-between">
                  <h3 className="text-base font-semibold leading-tight text-fh-green-deep">
                    {meal.title}
                  </h3>
                  <span className="ml-2 shrink-0 font-display text-lg font-bold text-fh-coral">
                    {formatCurrency(meal.price)}
                  </span>
                </div>
                <p className="mb-3 line-clamp-2 text-xs text-fh-green-muted">
                  {meal.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-amber-600">
                      Star {meal.avgRating || 0}
                    </span>
                    <span className="text-xs text-fh-green-light">
                      ({meal.reviewCount || 0})
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-fh-green-muted hover:text-fh-green-deep"
                      onClick={() => openEdit(meal)}
                    >
                      <Pencil className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-red-400 hover:bg-red-50 hover:text-red-600"
                      onClick={() => setDeleteId(meal.id)}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <button
            onClick={openAdd}
            className="flex flex-col items-center gap-3 rounded-xl border-2 border-dashed border-fh-cream-dark p-8 text-fh-green-muted transition-all hover:border-fh-green-soft hover:bg-fh-cream/50 hover:text-fh-green-deep"
          >
            <Plus className="h-8 w-8" />
            <p className="text-sm font-medium">Add New Meal</p>
          </button>
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editing.id ? "Edit Meal" : "Add New Meal"}</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 gap-4 py-2 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <Label>Meal Name</Label>
              <Input
                className="mt-1.5 h-10"
                value={editing.title}
                onChange={(event) =>
                  setEditing((current) => ({
                    ...current,
                    title: event.target.value,
                  }))
                }
              />
            </div>
            <div className="sm:col-span-2">
              <Label>Description</Label>
              <Textarea
                className="mt-1.5"
                value={editing.description}
                onChange={(event) =>
                  setEditing((current) => ({
                    ...current,
                    description: event.target.value,
                  }))
                }
              />
            </div>
            <div>
              <Label>Category</Label>
              <select
                className="mt-1.5 h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                value={editing.categoryId}
                onChange={(event) =>
                  setEditing((current) => ({
                    ...current,
                    categoryId: event.target.value,
                  }))
                }
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Label>Image URL</Label>
              <Input
                className="mt-1.5 h-10"
                value={editing.image}
                onChange={(event) =>
                  setEditing((current) => ({
                    ...current,
                    image: event.target.value,
                  }))
                }
              />
            </div>
            <div>
              <Label>Price</Label>
              <Input
                type="number"
                className="mt-1.5 h-10"
                value={editing.price}
                onChange={(event) =>
                  setEditing((current) => ({
                    ...current,
                    price: event.target.value,
                  }))
                }
              />
            </div>
            <div>
              <Label>Prep Time (min)</Label>
              <Input
                type="number"
                className="mt-1.5 h-10"
                value={editing.prepTime}
                onChange={(event) =>
                  setEditing((current) => ({
                    ...current,
                    prepTime: event.target.value,
                  }))
                }
              />
            </div>
            <div className="sm:col-span-2">
              <Label>Tags</Label>
              <Input
                className="mt-1.5 h-10"
                placeholder="burger, fast-food, popular"
                value={editing.tags}
                onChange={(event) =>
                  setEditing((current) => ({
                    ...current,
                    tags: event.target.value,
                  }))
                }
              />
            </div>
            <label className="flex items-center gap-2 text-sm text-fh-green-muted">
              <input
                type="checkbox"
                checked={editing.isAvailable}
                onChange={(event) =>
                  setEditing((current) => ({
                    ...current,
                    isAvailable: event.target.checked,
                  }))
                }
              />
              Available
            </label>
            <label className="flex items-center gap-2 text-sm text-fh-green-muted">
              <input
                type="checkbox"
                checked={editing.isVegan}
                onChange={(event) =>
                  setEditing((current) => ({
                    ...current,
                    isVegan: event.target.checked,
                  }))
                }
              />
              Vegan
            </label>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={save}
              disabled={saving}
              className="bg-fh-green-deep text-white hover:bg-fh-green-mid"
            >
              {saving ? "Saving..." : editing.id ? "Save Changes" : "Add Meal"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Delete Meal?</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-fh-green-muted">
            This will permanently remove the meal from your menu.
          </p>
          <DialogFooter className="mt-2">
            <Button variant="outline" onClick={() => setDeleteId(null)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={remove}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
