"use client";

import { useState } from "react";
import Image from "next/image";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
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
import DashboardHeader from "@/components/modules/dashboard/DashboardHeader";
import { addCategory, deleteCategory, updateCategory } from "@/services/category";
import { TCategory } from "@/types";

type EditCategory = Partial<TCategory> & { isNew?: boolean };

export default function AdminCategoriesClient({
  initialCategories,
}: {
  initialCategories: TCategory[];
}) {
  const [categories, setCategories] = useState(initialCategories);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<EditCategory>({});
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const openAdd = () => {
    setEditing({ isNew: true, name: "", image: "" });
    setOpen(true);
  };

  const openEdit = (category: TCategory) => {
    setEditing(category);
    setOpen(true);
  };

  const save = async () => {
    if (!editing.name || !editing.image) {
      toast.error("Name and image are required.");
      return;
    }

    const result = editing.isNew
      ? await addCategory({ name: editing.name, image: editing.image })
      : await updateCategory(editing.id!, {
          name: editing.name,
          image: editing.image,
        });

    if (!result.success || !result.data) {
      toast.error(result.message || "Unable to save category.");
      return;
    }

    setCategories((current) =>
      editing.isNew
        ? [...current, result.data!]
        : current.map((category) =>
            category.id === editing.id ? result.data! : category,
          ),
    );
    setOpen(false);
    toast.success(editing.isNew ? "Category added." : "Category updated.");
  };

  const remove = async () => {
    if (!deleteId) {
      return;
    }

    const result = await deleteCategory(deleteId);

    if (!result.success) {
      toast.error(result.message || "Unable to delete category.");
      return;
    }

    setCategories((current) =>
      current.filter((category) => category.id !== deleteId),
    );
    setDeleteId(null);
    toast.success("Category deleted.");
  };

  return (
    <div>
      <DashboardHeader
        title="Categories"
        subtitle={`${categories.length} cuisine categories`}
        action={
          <Button
            onClick={openAdd}
            className="gap-1.5 bg-fh-green-deep text-white hover:bg-fh-green-mid"
          >
            <Plus className="h-4 w-4" />
            Add Category
          </Button>
        }
      />
      <div className="p-4 sm:p-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {categories.map((category) => (
            <div
              key={category.id}
              className="flex items-start gap-4 rounded-xl border border-fh-cream-dark bg-white p-5 transition-shadow hover:shadow-md"
            >
              <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-2xl bg-fh-cream">
                {category.image && (
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover"
                    sizes="56px"
                  />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-fh-green-deep">{category.name}</p>
                <p className="text-sm text-fh-green-muted">
                  {category.mealCount || 0} meals
                </p>
                <p className="mt-0.5 truncate font-mono text-xs text-fh-green-light">
                  {category.slug}
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-fh-green-muted hover:text-fh-green-deep"
                  onClick={() => openEdit(category)}
                >
                  <Pencil className="h-3.5 w-3.5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-red-400 hover:bg-red-50 hover:text-red-600"
                  onClick={() => setDeleteId(category.id)}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          ))}
          <button
            onClick={openAdd}
            className="flex flex-col items-center gap-2 rounded-xl border-2 border-dashed border-fh-cream-dark p-8 text-fh-green-muted transition-all hover:border-fh-green-soft hover:bg-fh-cream/50 hover:text-fh-green-deep"
          >
            <Plus className="h-7 w-7" />
            <p className="text-sm font-medium">Add Category</p>
          </button>
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>
              {editing.isNew ? "Add Category" : "Edit Category"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <Label>Category Name</Label>
              <Input
                className="mt-1.5 h-10"
                value={editing.name || ""}
                onChange={(event) =>
                  setEditing((current) => ({
                    ...current,
                    name: event.target.value,
                  }))
                }
              />
            </div>
            <div>
              <Label>Image URL</Label>
              <Input
                className="mt-1.5 h-10"
                value={editing.image || ""}
                onChange={(event) =>
                  setEditing((current) => ({
                    ...current,
                    image: event.target.value,
                  }))
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={save}
              className="bg-fh-green-deep text-white hover:bg-fh-green-mid"
            >
              {editing.isNew ? "Add" : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Delete Category?</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-fh-green-muted">
            This removes the category from the platform.
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
