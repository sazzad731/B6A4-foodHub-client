"use server";

import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";
import { apiFetch } from "@/services/api";
import { TApiResponse, TDecodedUser, TUser } from "@/types";

export type TRegisterPayload = {
  role: string;
  name: string;
  email: string;
  password: string;
  phone?: string;
  address?: string;
  image?: string;
  restaurantName?: string;
  description?: string;
  deliveryFee?: number | string;
  cuisineTypes?: string[] | string;
};

type TLoginResponse = {
  token: string;
  user: TUser;
};

export const registerUser = async (userData: TRegisterPayload) => {
  try {
    return await apiFetch<TApiResponse<TUser>>("/api/v1/auth/register", {
      method: "POST",
      body: JSON.stringify(userData),
    });
  } catch (error) {
    return {
      success: false,
      message: "Registration failed",
      data: null,
      error,
    };
  }
};

export const loginUser = async (userData: FieldValues) => {
  try {
    const result = await apiFetch<TApiResponse<TLoginResponse>>(
      "/api/v1/auth/login",
      {
        method: "POST",
        body: JSON.stringify(userData),
      },
    );

    if (result.success && result.data?.token) {
      (await cookies()).set("token", result.data.token, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: 7 * 24 * 60 * 60,
        path: "/",
      });
    }

    return result;
  } catch (error) {
    return {
      success: false,
      message: "Login failed",
      data: null,
      error,
    };
  }
};

export const getUser = async () => {
  const storeCookie = await cookies();
  const token = storeCookie.get("token")?.value;

  if (!token) {
    return null;
  }

  try {
    const decoded = jwtDecode<TDecodedUser>(token);
    const currentTime = Date.now() / 1000;

    if (decoded.exp && decoded.exp < currentTime) {
      storeCookie.delete("token");
      return null;
    }

    return decoded;
  } catch {
    storeCookie.delete("token");
    return null;
  }
};

export const getCurrentUser = async () => {
  try {
    return await apiFetch<TApiResponse<TUser>>("/api/v1/auth/me", {
      auth: true,
      cache: "no-store",
    });
  } catch (error) {
    return {
      success: false,
      message: "Unable to load current user",
      data: null,
      error,
    };
  }
};

export const userLogOut = async () => {
  (await cookies()).delete("token");
};
