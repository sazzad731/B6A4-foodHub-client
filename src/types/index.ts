export interface ERole {
  ADMIN: "ADMIN";
  PROVIDER: "PROVIDER";
  CUSTOMER: "CUSTOMER";
}




export interface Route {
  title: string;
  url: string;
}
[];

export interface TMeal {
  id: string;
  providerId: string;
  provider: { restaurantName: string; image: string };
  categoryId: string;
  category: { name: string };
  title: string;
  description: string;
  price: number;
  image: string;
  avgRating: number;
  prepTime: number;
  reviewCount: number;
  isAvailable: boolean;
  isVegan: boolean;
  tags: string[];
}