"use server";

import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
// import jwt from "jsonwebtoken";

import { revalidatePath } from "next/cache";

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

export async function updateUser(state: any, formData: FormData) {
  const name = formData.get("name") as string;
  const address = formData.get("address") as string;
  const email = formData.get("email") as string;

  const existedUser = await prisma.user.findUnique({ where: { email } });

  if (existedUser) {
    try {
      await prisma.user.update({
        where: { email },
        data: { email, name, address },
      });
      const expires = new Date(Date.now() + 3600 * 1000 * 24);
      const session = await encrypt({ email, name, address, expires });
      cookies().set("session", session, { expires, httpOnly: true });
    } catch (error) {
      return { error };
    }
  } else {
    return { message: "This user is not exist" };
  }

  revalidatePath("/user");
}

const secretKey = "secret";
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1 day from now")
    .sign(key);
}

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload;
}

export async function login(state: any, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (password.length < 3) return { message: "Min 3 symbol" };

  const existedUser = await prisma.user.findUnique({ where: { email } });

  if (!existedUser) {
    // create user
    createUser(email, password);
    const expires = new Date(Date.now() + 3600 * 1000 * 24);
    const session = await encrypt({ email, expires });
    cookies().set("session", session, { expires, httpOnly: true });
  }

  if (existedUser?.password === password) {
    const expires = new Date(Date.now() + 3600 * 1000 * 24);
    const existedName = existedUser?.name;
    const existedAddress = existedUser?.address;
    const session = await encrypt({
      email,
      name: existedName,
      address: existedAddress,
      expires,
    });
    cookies().set("session", session, { expires, httpOnly: true });
  } else {
    return { message: "Invalid password" };
  }

  // update local order
  const existedLocalOrder = cookies().get("order")?.value;
  if (existedLocalOrder) {
    const parsedOrder = await decrypt(existedLocalOrder);

    const order = await encrypt({
      userEmail: email,
      products: parsedOrder.products,
      total: parsedOrder.total,
    });

    cookies().set("order", order, { httpOnly: true });
  }
}

export async function logout() {
  // Destroy the session
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
