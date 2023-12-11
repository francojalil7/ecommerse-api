export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail?: string;
  code: string;
  stock: number;
}
export interface Cart {
  id: number;
  products: Product[];
}
export interface ProductCart {
  id: number;
  quantity: number;
}
