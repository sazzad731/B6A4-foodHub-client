export interface ERole {
  ADMIN: "ADMIN";
  PROVIDER: "PROVIDER";
  CUSTOMER: "CUSTOMER";
}

export type TRole = "ADMIN" | "PROVIDER" | "CUSTOMER";
export type TUserStatus = "ACTIVE" | "SUSPENDED";
export type TOrderStatus =
  | "PLACED"
  | "PREPARING"
  | "READY"
  | "DELIVERED"
  | "CANCELLED";

export interface Route {
  title: string;
  url: string;
}

export interface TApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  error?: unknown;
}

export interface TPagination {
  total: number;
  page: number;
  limit: number;
  totalPage: number;
}

export interface TCategory {
  id: string;
  name: string;
  slug: string;
  image: string;
  mealCount?: number;
  sortOrder?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface TProviderSummary {
  id: string;
  restaurantName: string;
  description?: string;
  address?: string;
  phone?: string;
  image?: string;
  deliveryFee?: number | string;
  isOpen?: boolean;
  cuisineTypes?: string[];
  avgRating?: number;
  totalOrders?: number;
  totalRevenue?: number | string;
}

export interface TProvider extends TProviderSummary {
  userId: string;
  user?: Pick<TUser, "id" | "name" | "email" | "phone" | "image" | "status"> & {
    createdAt?: string;
  };
  mealCount?: number;
  orderCount?: number;
  meals?: TMeal[];
  createdAt?: string;
  updatedAt?: string;
}

export interface TUser {
  id: string;
  name: string;
  email: string;
  role: TRole;
  status: TUserStatus;
  phone?: string;
  address?: string;
  image?: string;
  providerProfile?: TProvider | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface TDecodedUser {
  id: string;
  name: string;
  email: string;
  role: TRole;
  status: TUserStatus;
  exp?: number;
  iat?: number;
}

export interface TMeal {
  id: string;
  providerId: string;
  provider: TProviderSummary;
  categoryId: string;
  category: Pick<TCategory, "id" | "name" | "slug" | "image">;
  title: string;
  description: string;
  price: number | string;
  image: string;
  avgRating: number;
  prepTime: number;
  reviewCount: number;
  isAvailable: boolean;
  isVegan: boolean;
  tags: string[];
  reviews?: TReview[];
  createdAt?: string;
  updatedAt?: string;
}

export interface TReview {
  id: string;
  customerId: string;
  mealId: string;
  orderId?: string | null;
  rating: number;
  comment: string;
  customer: Pick<TUser, "id" | "name" | "email" | "image">;
  createdAt: string;
  updatedAt?: string;
}

export interface TOrderItem {
  id: string;
  orderId: string;
  mealId: string;
  mealName: string;
  image: string;
  priceAtOrder: number | string;
  quantity: number;
  subtotal: number | string;
  meal?: Pick<TMeal, "id" | "title" | "image" | "price">;
}

export interface TOrder {
  id: string;
  customerId: string;
  providerId: string;
  status: TOrderStatus;
  deliveryAddress: string;
  phone: string;
  deliveryNote?: string | null;
  subtotal: number | string;
  deliveryFee: number | string;
  totalPrice: number | string;
  paymentMethod: string;
  isPaid: boolean;
  items: TOrderItem[];
  customer?: Pick<TUser, "id" | "name" | "email" | "phone" | "image" | "role" | "status">;
  provider?: TProviderSummary;
  createdAt: string;
  updatedAt: string;
}
