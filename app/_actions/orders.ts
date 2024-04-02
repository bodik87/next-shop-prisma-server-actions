"use server";

import prisma from "@/lib/prisma";
import { LocalOrderProps } from "@/lib/schema";
import { cookies } from "next/headers";

export async function addOrderToDatabase(state: any, order: LocalOrderProps) {
  try {
    if (!order) return;
    const products = order.products.map((product) => JSON.stringify(product));
    const item = await prisma.order.create({
      data: {
        total: order.total,
        userEmail: order.userEmail,
        info: order.info as string,
        products,
      },
    });
    cookies().delete("order");
    return { item };
  } catch (error) {
    return { error };
  }
}
