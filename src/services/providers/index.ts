"use server";

import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/services/auth";
import { apiFetch } from "@/services/api";
import { withFallbackData } from "@/services/response";
import { TApiResponse, TProvider, TPagination } from "@/types";

type ProviderListPayload = {
  providers: TProvider[];
  pagination: TPagination;
};

const emptyProviders: ProviderListPayload = {
  providers: [],
  pagination: { total: 0, page: 1, limit: 9, totalPage: 0 },
};

type ProviderParams = {
  location?: string;
  page?: string;
  limit?: string;
  sortBy?: string;
  sortOrder?: string;
};

const buildQuery = (params?: ProviderParams) => {
  const query = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {
    if (value) {
      query.set(key, value);
    }
  });

  return query.toString();
};

export const getAllProviders = async (params?: ProviderParams) => {
  try {
    const query = buildQuery(params);

    const result = await apiFetch<TApiResponse<ProviderListPayload>>(
      `/api/v1/providers${query ? `?${query}` : ""}`,
      { cache: "no-store" },
    );

    return withFallbackData(result, emptyProviders, "Unable to load restaurants");
  } catch (error) {
    return {
      success: false,
      message: "Unable to load restaurants",
      data: emptyProviders,
      error,
    };
  }
};

export const getProviderById = async (id: string) => {
  try {
    const result = await apiFetch<TApiResponse<TProvider | null>>(`/api/v1/providers/${id}`, {
      cache: "no-store",
    });

    return withFallbackData(result, null, "Unable to load restaurant");
  } catch (error) {
    return {
      success: false,
      message: "Unable to load restaurant",
      data: null,
      error,
    };
  }
};

export const getCurrentProviderProfile = async () => {
  const currentUser = await getCurrentUser();
  const provider = currentUser.data?.providerProfile;

  if (!currentUser.success || !provider?.id) {
    return {
      success: false,
      message: "Provider profile not found",
      data: null,
    };
  }

  return getProviderById(provider.id);
};

export const createOrUpdateProviderProfile = async (
  payload: Record<string, unknown>,
) => {
  try {
    const result = await apiFetch<TApiResponse<TProvider | null>>("/api/v1/providers", {
      method: "POST",
      auth: true,
      body: JSON.stringify(payload),
    });

    revalidatePath("/dashboard/profile");
    revalidatePath("/providers");

    return withFallbackData(result, null, "Unable to save provider profile");
  } catch (error) {
    return {
      success: false,
      message: "Unable to save provider profile",
      data: null,
      error,
    };
  }
};
