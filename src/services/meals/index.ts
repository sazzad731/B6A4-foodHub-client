"use server";

import { revalidatePath } from "next/cache";
import { apiFetch } from "@/services/api";
import { withFallbackData } from "@/services/response";
import { TApiResponse, TMeal, TPagination, TReview } from "@/types";

type AllMealsParams = {
  search?: string;
  price_range?: string;
  minPrice?: string;
  maxPrice?: string;
  page?: string;
  limit?: string;
  sortBy?: string;
  sortOrder?: string;
  category?: string;
  dietaryPreference?: string;
  isVegan?: string;
};

type MealsPayload = {
  meals: TMeal[];
  pagination: TPagination;
};

const emptyMeals: MealsPayload = {
  meals: [],
  pagination: {
    total: 0,
    page: 1,
    limit: 9,
    totalPage: 0,
  },
};

const buildQuery = (params?: Record<string, string | undefined>) => {
  const query = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      query.set(key, value);
    }
  });

  return query.toString();
};

export const getAllMeals = async (params?: AllMealsParams) => {
  try {
    const query = buildQuery(params);

    const result = await apiFetch<TApiResponse<MealsPayload>>(
      `/api/v1/meals${query ? `?${query}` : ""}`,
      { cache: "no-store" },
    );

    return withFallbackData(result, emptyMeals, "Unable to load meals");
  } catch (error) {
    return {
      success: false,
      message: "Unable to load meals",
      data: emptyMeals,
      error,
    };
  }
};

export const getFeaturedMeals = async () => {
  try {
    const result = await apiFetch<TApiResponse<TMeal[]>>("/api/v1/meals/featured", {
      cache: "no-store",
    });

    return withFallbackData(result, [], "Unable to load featured meals");
  } catch (error) {
    return {
      success: false,
      message: "Unable to load featured meals",
      data: [],
      error,
    };
  }
};

export const getMealDetail = async (id: string) => {
  try {
    const result = await apiFetch<TApiResponse<TMeal | null>>(`/api/v1/meals/${id}`, {
      cache: "no-store",
    });

    return withFallbackData(result, null, "Unable to load meal details");
  } catch (error) {
    return {
      success: false,
      message: "Unable to load meal details",
      data: null,
      error,
    };
  }
};

export const getMealReviews = async (id: string) => {
  try {
    const result = await apiFetch<TApiResponse<{ meal: Pick<TMeal, "id" | "title">; reviews: TReview[] }>>(
      `/api/v1/meals/${id}/reviews`,
      { cache: "no-store" },
    );

    return withFallbackData(result, { meal: { id, title: "" }, reviews: [] }, "Unable to load reviews");
  } catch (error) {
    return {
      success: false,
      message: "Unable to load reviews",
      data: { meal: { id, title: "" }, reviews: [] },
      error,
    };
  }
};

export const addMealToMenu = async (payload: Record<string, unknown>) => {
  try {
    const result = await apiFetch<TApiResponse<TMeal | null>>("/api/v1/meals/provider", {
      method: "POST",
      auth: true,
      body: JSON.stringify(payload),
    });

    revalidatePath("/dashboard/menu");
    revalidatePath("/meals");

    return withFallbackData(result, null, "Unable to add meal");
  } catch (error) {
    return {
      success: false,
      message: "Unable to add meal",
      data: null,
      error,
    };
  }
};

export const updateMeal = async (id: string, payload: Record<string, unknown>) => {
  try {
    const result = await apiFetch<TApiResponse<TMeal | null>>(
      `/api/v1/meals/provider/${id}`,
      {
        method: "PUT",
        auth: true,
        body: JSON.stringify(payload),
      },
    );

    revalidatePath("/dashboard/menu");
    revalidatePath(`/meals/${id}`);

    return withFallbackData(result, null, "Unable to update meal");
  } catch (error) {
    return {
      success: false,
      message: "Unable to update meal",
      data: null,
      error,
    };
  }
};

export const deleteMeal = async (id: string) => {
  try {
    const result = await apiFetch<TApiResponse<TMeal | null>>(
      `/api/v1/meals/provider/${id}`,
      {
        method: "DELETE",
        auth: true,
      },
    );

    revalidatePath("/dashboard/menu");
    revalidatePath("/meals");

    return withFallbackData(result, null, "Unable to delete meal");
  } catch (error) {
    return {
      success: false,
      message: "Unable to delete meal",
      data: null,
      error,
    };
  }
};

export const addMealReview = async (
  id: string,
  payload: { rating: number; comment: string },
) => {
  try {
    const result = await apiFetch<TApiResponse<TReview | null>>(
      `/api/v1/meals/${id}/reviews`,
      {
        method: "POST",
        auth: true,
        body: JSON.stringify(payload),
      },
    );

    revalidatePath(`/meals/${id}`);
    revalidatePath("/dashboard/orders");

    return withFallbackData(result, null, "Unable to submit review");
  } catch (error) {
    return {
      success: false,
      message: "Unable to submit review",
      data: null,
      error,
    };
  }
};
