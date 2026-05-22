"use server";

import { revalidatePath } from "next/cache";
import { apiFetch } from "@/services/api";
import { TApiResponse, TCategory } from "@/types";

export const getAllCategory = async () => {
  try {
    return await apiFetch<TApiResponse<TCategory[]>>("/api/v1/category/get-all", {
      cache: "no-store",
    });
  } catch (error) {
    return {
      success: false,
      message: "Unable to load categories",
      data: [],
      error,
    };
  }
};

export const addCategory = async (payload: { name: string; image: string }) => {
  try {
    const result = await apiFetch<TApiResponse<TCategory>>(
      "/api/v1/category/add-one",
      {
        method: "POST",
        auth: true,
        body: JSON.stringify(payload),
      },
    );

    revalidatePath("/dashboard/categories");
    revalidatePath("/meals");

    return result;
  } catch (error) {
    return {
      success: false,
      message: "Unable to add category",
      data: null,
      error,
    };
  }
};

export const updateCategory = async (
  id: string,
  payload: Partial<Pick<TCategory, "name" | "image" | "sortOrder">>,
) => {
  try {
    const result = await apiFetch<TApiResponse<TCategory>>(
      `/api/v1/category/${id}`,
      {
        method: "PATCH",
        auth: true,
        body: JSON.stringify(payload),
      },
    );

    revalidatePath("/dashboard/categories");
    revalidatePath("/meals");

    return result;
  } catch (error) {
    return {
      success: false,
      message: "Unable to update category",
      data: null,
      error,
    };
  }
};

export const deleteCategory = async (id: string) => {
  try {
    const result = await apiFetch<TApiResponse<TCategory>>(
      `/api/v1/category/${id}`,
      {
        method: "DELETE",
        auth: true,
      },
    );

    revalidatePath("/dashboard/categories");
    revalidatePath("/meals");

    return result;
  } catch (error) {
    return {
      success: false,
      message: "Unable to delete category",
      data: null,
      error,
    };
  }
};
