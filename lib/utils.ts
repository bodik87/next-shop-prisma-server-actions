import { PRODUCTS } from "@/data";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function currentProduct(item: any) {
  return PRODUCTS.filter((product) => product.id === Number(item.productId))[0];
}
