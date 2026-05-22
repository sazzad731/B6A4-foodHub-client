"use server";

import { revalidatePath } from "next/cache";
import { apiFetch } from "@/services/api";
import { TApiResponse, TUser, TUserStatus } from "@/types";

export const getAllUsers = async () => {
  try {
    return await apiFetch<TApiResponse<TUser[]>>("/api/v1/admin/users", {
      auth: true,
      cache: "no-store",
    });
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
    const result = await apiFetch<TApiResponse<TUser>>(
      `/api/v1/admin/users/${id}`,
      {
        method: "PATCH",
        auth: true,
        body: JSON.stringify({ status }),
      },
    );

    revalidatePath("/dashboard/users");

    return result;
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
    const result = await apiFetch<TApiResponse<TUser>>("/api/v1/users/me", {
      method: "PATCH",
      auth: true,
      body: JSON.stringify(payload),
    });

    revalidatePath("/dashboard/profile");

    return result;
  } catch (error) {
    return {
      success: false,
      message: "Unable to update profile",
      data: null,
      error,
    };
  }
};
