"use server";

import { cookies } from "next/headers";

type ApiFetchOptions = RequestInit & {
  auth?: boolean;
};

const getBaseUrl = () => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  if (!baseUrl) {
    throw new Error("NEXT_PUBLIC_BASE_URL is not configured");
  }

  return baseUrl;
};

export async function apiFetch<T>(
  path: string,
  { auth = false, headers, ...options }: ApiFetchOptions = {},
): Promise<T> {
  const requestHeaders = new Headers(headers);

  if (!requestHeaders.has("Content-Type") && options.body) {
    requestHeaders.set("Content-Type", "application/json");
  }

  if (auth) {
    const token = (await cookies()).get("token")?.value;

    if (token) {
      requestHeaders.set("Authorization", `Bearer ${token}`);
    }
  }

  const response = await fetch(`${getBaseUrl()}${path}`, {
    ...options,
    headers: requestHeaders,
    credentials: "include",
  });

  const result = await response.json().catch(() => ({
    success: false,
    message: "Unable to read server response",
  }));

  return result as T;
}
