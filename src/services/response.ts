import { TApiResponse } from "@/types";

export function withFallbackData<T>(
  response: Partial<TApiResponse<T>> | undefined | null,
  fallbackData: T,
  fallbackMessage: string,
): TApiResponse<T> {
  return {
    success: Boolean(response?.success),
    message: response?.message || fallbackMessage,
    data: response?.data ?? fallbackData,
    error: response?.error,
  };
}
