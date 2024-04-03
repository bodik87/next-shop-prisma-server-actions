"use server";

import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { decrypt, encrypt } from "@/lib/crypt";

export async function createUser(email: string, password: string) {
  try {
    const item = await prisma.user.create({
      data: { email, password },
    });
    return { item };
  } catch (error: any) {
    return { error: error?.message || "Failed to create user." };
  } finally {
    revalidatePath("/user");
  }
}

export async function getUserByEmail(email: string) {
  try {
    const item = await prisma.user.findUnique({
      where: { email },
      include: {
        orders: true, // Включить все заказы пользователя
      },
    });
    return { item };
  } catch (error) {
    return { error };
  }
}

export async function updateUser(state: any, formData: FormData) {
  const email = formData.get("email") as string;
  const info = formData.get("info") as string;

  const existedUser = await prisma.user.findUnique({ where: { email } });

  if (existedUser) {
    try {
      await prisma.user.update({
        where: { email },
        data: { email, info },
      });
      const expires = new Date(Date.now() + 3600 * 1000 * 24);
      const session = await encrypt({ email, info, expires });
      cookies().set("session", session, { expires, httpOnly: true });
    } catch (error) {
      return { error };
    } finally {
      // Update local order
      const existedLocalOrder = cookies().get("order")?.value;
      if (existedLocalOrder) {
        const parsedOrder = await decrypt(existedLocalOrder);

        const order = await encrypt({
          userEmail: email,
          products: parsedOrder.products,
          info,
          total: parsedOrder.total,
        });

        cookies().set("order", order, { httpOnly: true });
      }
    }
  } else {
    return { message: "This user is not exist" };
  }

  revalidatePath("/user");
}

export async function enter(state: any, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (password.length < 3) return { message: "Min 3 symbol" };

  const existedUser = await prisma.user.findUnique({ where: { email } });

  try {
    // Create user
    if (!existedUser) {
      createUser(email, password);
      const expires = new Date(Date.now() + 3600 * 1000 * 24);
      const session = await encrypt({ email, expires });
      cookies().set("session", session, { expires, httpOnly: true });
    } else {
      // Login
      if (existedUser.password === password) {
        const expires = new Date(Date.now() + 3600 * 1000 * 24);
        const info = existedUser?.info;
        const session = await encrypt({ email, info, expires });
        cookies().set("session", session, { expires, httpOnly: true });
      } else {
        return { message: "Invalid password" };
      }
    }
  } catch (error) {
    return { message: "Error" };
  } finally {
    // Update local order
    const existedLocalOrder = cookies().get("order")?.value;
    if (existedLocalOrder) {
      const parsedOrder = await decrypt(existedLocalOrder);

      const order = await encrypt({
        userEmail: email,
        products: parsedOrder.products,
        info: existedUser?.info,
        total: parsedOrder.total,
      });

      cookies().set("order", order, { httpOnly: true });
    }
  }
}

export async function logout() {
  cookies().set("order", "", { expires: new Date(0) });
  cookies().set("session", "", { expires: new Date(0) });
}

export async function getSession() {
  const session = cookies().get("session")?.value;
  if (!session) return null;
  return await decrypt(session);
}

export async function updateSession(request: NextRequest) {
  const session = request.cookies.get("session")?.value;
  if (!session) return;

  // Refresh the session so it doesn't expire
  const parsed = await decrypt(session);
  parsed.expires = new Date(Date.now() + 3600 * 1000 * 24);
  const res = NextResponse.next();
  res.cookies.set({
    name: "session",
    value: await encrypt(parsed),
    httpOnly: true,
    expires: parsed.expires,
  });
  return res;
}
