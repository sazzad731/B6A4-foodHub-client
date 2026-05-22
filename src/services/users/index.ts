"use server";

import { revalidatePath } from "next/cache";
import { apiFetch } from "@/services/api";
import { withFallbackData } from "@/services/response";
import { TApiResponse, TUser, TUserStatus } from "@/types";

export const getAllUsers = async () => {
  try {
    const result = await apiFetch<TApiResponse<TUser[]>>("/api/v1/admin/users", {
      auth: true,
      cache: "no-store",
    });

    return withFallbackData(result, [], "Unable to load users");
  } catch (error) {
    return {
      success: false,
      message: "Unable to load users",
      data: [],
      error,
    };
  }
};

export const updateUserStatus = async (id: string, status: TUserStatus) => {
  try {
    const result = await apiFetch<TApiResponse<TUser | null>>(
      `/api/v1/admin/users/${id}`,
      {
        method: "PATCH",
        auth: true,
        body: JSON.stringify({ status }),
      },
    );

    revalidatePath("/dashboard/users");

    return withFallbackData(result, null, "Unable to update user");
  } catch (error) {
    return {
      success: false,
      message: "Unable to update user",
      data: null,
      error,
    };
  }
};

export const updateOwnProfile = async (payload: Record<string, unknown>) => {
  try {
    const result = await apiFetch<TApiResponse<TUser | null>>("/api/v1/users/me", {
      method: "PATCH",
      auth: true,
      body: JSON.stringify(payload),
    });

    revalidatePath("/dashboard/profile");

    return withFallbackData(result, null, "Unable to update profile");
  } catch (error) {
    return {
      success: false,
      message: "Unable to update profile",
      data: null,
      error,
    };
  }
};
