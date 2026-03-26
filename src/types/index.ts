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
  providerName: string;
  categoryId: string;
  categoryName: string;
  title: string;
  description: string;
  price: number;
  image: string;
  rating: number;
  reviewCount: number;
  isAvailable: boolean;
  isVegan: boolean;
  tags: string[];
}