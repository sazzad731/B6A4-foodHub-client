"use client";

import { asNumber } from "@/lib/format";
import { TMeal } from "@/types";

export interface StoredCartItem {
  mealId: string;
  providerId?: string;
  providerName?: string;
  title?: string;
  image?: string;
  price?: number;
  quantity: number;
}

const CART_KEY = "cart";
const CART_EVENT = "foodhub-cart-updated";

const normalizeCart = (items: unknown): StoredCartItem[] => {
  if (!Array.isArray(items)) {
    return [];
  }

  return items
    .map((item) => {
      if (typeof item === "string") {
        return { mealId: item, quantity: 1 };
      }

      if (item && typeof item === "object") {
        const cartItem = item as Partial<StoredCartItem>;
        const mealId = cartItem.mealId;

        if (!mealId) {
          return null;
        }

        return {
          ...cartItem,
          mealId,
          quantity: Math.max(1, Number(cartItem.quantity) || 1),
        } as StoredCartItem;
      }

      return null;
    })
    .filter(Boolean) as StoredCartItem[];
};

export const readCart = () => {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    return normalizeCart(JSON.parse(localStorage.getItem(CART_KEY) || "[]"));
  } catch {
    return [];
  }
};

export const writeCart = (items: StoredCartItem[]) => {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event(CART_EVENT));
};

export const clearCart = () => writeCart([]);

export const getCartCount = () =>
  readCart().reduce((total, item) => total + item.quantity, 0);

export const addMealToCart = (meal: TMeal, quantity = 1) => {
  const cart = readCart();
  const existing = cart.find((item) => item.mealId === meal.id);

  if (cart.length > 0) {
    const firstProviderId = cart[0]?.providerId;

    if (firstProviderId && firstProviderId !== meal.providerId) {
      return {
        ok: false,
        message: "Please order from one restaurant at a time.",
      };
    }
  }

  if (existing) {
    writeCart(
      cart.map((item) =>
        item.mealId === meal.id
          ? { ...item, quantity: item.quantity + quantity }
          : item,
      ),
    );

    return { ok: true, message: "Meal quantity updated." };
  }

  writeCart([
    ...cart,
    {
      mealId: meal.id,
      providerId: meal.providerId,
      providerName: meal.provider?.restaurantName,
      title: meal.title,
      image: meal.image,
      price: asNumber(meal.price),
      quantity,
    },
  ]);

  return { ok: true, message: "Meal added to cart." };
};

export const updateCartQuantity = (mealId: string, quantity: number) =>
  writeCart(
    readCart().map((item) =>
      item.mealId === mealId ? { ...item, quantity: Math.max(1, quantity) } : item,
    ),
  );

export const removeFromCart = (mealId: string) =>
  writeCart(readCart().filter((item) => item.mealId !== mealId));

export const subscribeToCart = (callback: () => void) => {
  window.addEventListener(CART_EVENT, callback);
  window.addEventListener("storage", callback);

  return () => {
    window.removeEventListener(CART_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
};
