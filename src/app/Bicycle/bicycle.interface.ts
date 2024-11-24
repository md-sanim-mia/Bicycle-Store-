export interface Bicycle {
  name: string;
  brand: string;
  price: number;
  type: "Mountain" | "Road" | "BMX" | "Hybrid" | "Electric";
  description: string;
  quantity: number;
  inStock: boolean;
}

export interface BicycleOrder {
  email: string;
  product: object;
  quantity: number;
  totalPrice: number;
}
