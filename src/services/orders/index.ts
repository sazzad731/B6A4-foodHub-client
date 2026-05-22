"use server";

import { revalidatePath } from "next/cache";
import { apiFetch } from "@/services/api";
import { TApiResponse, TOrder, TOrderStatus } from "@/types";

export const getOrders = async () => {
  try {
    return await apiFetch<TApiResponse<TOrder[]>>("/api/v1/orders", {
      auth: true,
      cache: "no-store",
    });
  } catch (error) {
    return {
      success: false,
      message: "Unable to load orders",
      data: [],
      error,
    };
  }
};

export const getOrderDetails = async (id: string) => {
  try {
    return await apiFetch<TApiResponse<TOrder>>(`/api/v1/orders/${id}`, {
      auth: true,
      cache: "no-store",
    });
  } catch (error) {
    return {
      success: false,
      message: "Unable to load order",
      data: null,
      error,
    };
  }
};

export const createOrder = async (payload: {
  deliveryAddress: string;
  phone: string;
  deliveryNote?: string;
  items: { mealId: string; quantity: number }[];
}) => {
  try {
    const result = await apiFetch<TApiResponse<TOrder>>("/api/v1/orders", {
      method: "POST",
      auth: true,
      body: JSON.stringify(payload),
    });

    revalidatePath("/dashboard/orders");

    return result;
  } catch (error) {
    return {
      success: false,
      message: "Unable to place order",
      data: null,
      error,
    };
  }
};

export const updateOrderStatus = async (id: string, status: TOrderStatus) => {
  try {
    const result = await apiFetch<TApiResponse<TOrder>>(
      `/api/v1/orders/provider/${id}`,
      {
        method: "PATCH",
        auth: true,
        body: JSON.stringify({ status }),
      },
    );

    revalidatePath("/dashboard/orders");

    return result;
  } catch (error) {
    return {
      success: false,
      message: "Unable to update order",
      data: null,
      error,
    };
  }
};
