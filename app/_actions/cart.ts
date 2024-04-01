"use server";

import prisma from "@/lib/prisma";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { decrypt, encrypt } from "@/lib/crypt";
import { LocalOrderProps, ProductForOrderProps } from "@/lib/schema";

export async function deleteProductFromOrder(state: any, formData: FormData) {
  const id = formData.get("id") as string;
  try {
    const existedLocalOrder = cookies().get("order")?.value;
    if (!existedLocalOrder) {
      return;
    } else {
      const parsedOrder: LocalOrderProps = await decrypt(existedLocalOrder);
      const { products, total, ...spread } = parsedOrder;
      const updatedProducts = products.filter((order) => order.id !== id);

      const updatedTotal = updatedProducts.reduce(
        (acc: number, el: ProductForOrderProps) => {
          const res = acc + el.quantity * el.price;
          return res;
        },
        0
      );

      const order = await encrypt({
        products: updatedProducts,
        total: updatedTotal,
        ...spread,
      });

      if (updatedProducts.length === 0) {
        cookies().delete("order");
      } else {
        cookies().set("order", order, { httpOnly: true });
      }
    }
  } catch (error) {
    return { error };
  }
}

export async function incrementLocalOrder(state: any, formData: FormData) {
  console.log("increment");
}

export async function decrementLocalOrder(state: any, formData: FormData) {
  console.log("decrement");
}

export async function changeQuantityByInputInLocalOrder(
  state: any,
  formData: FormData
) {
  console.log("Input");
}
