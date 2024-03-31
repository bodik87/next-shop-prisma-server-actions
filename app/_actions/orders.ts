"use server";

import { decrypt, encrypt } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

type LocalOrderProps = {
  userEmail: string;
  total: number;
};

export async function createLocalOrder(userEmail: string, total: number) {
  try {
    const order = await encrypt({ userEmail, total });
    cookies().set("cart", order, { httpOnly: true });

    // temp
    const parsed: LocalOrderProps = await decrypt(order);
    console.log(parsed.total);
  } catch (error: any) {
    return { error: error?.message || "Failed to create user." };
  } finally {
    revalidatePath("/cart");
  }
}
