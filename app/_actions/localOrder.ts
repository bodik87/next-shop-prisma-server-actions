"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { LocalOrderProps, ProductForOrderProps } from "@/lib/schema";
import { decrypt, encrypt } from "@/lib/crypt";

export async function getLocalOrder() {
  const order = cookies().get("order")?.value;
  if (!order) return null;
  return await decrypt(order);
}

export async function createLocalOrder(
  userEmail: string,
  product: ProductForOrderProps,
  info: string | undefined
) {
  try {
    const existedLocalOrder = cookies().get("order")?.value;

    if (!existedLocalOrder) {
      const order = await encrypt({
        userEmail,
        products: [product],
        info,
        total: product.price * product.quantity,
      });

      cookies().set("order", order, { httpOnly: true });
    } else {
      const parsedOrder: LocalOrderProps = await decrypt(existedLocalOrder);

      const existingItem = parsedOrder.products.find(
        (el: ProductForOrderProps) => el.productId === product.productId
      );

      if (existingItem) {
        existingItem.quantity += product.quantity;

        const total = parsedOrder.products.reduce(
          (acc: number, el: ProductForOrderProps) => {
            const res = acc + el.quantity * el.price;
            return res;
          },
          0
        );

        const order = await encrypt({
          userEmail,
          products: parsedOrder.products,
          info,
          total,
        });

        cookies().set("order", order, { httpOnly: true });
      } else {
        parsedOrder.products.push(product);

        const total = parsedOrder.products.reduce(
          (acc: number, el: ProductForOrderProps) => {
            return acc + el.quantity * el.price;
          },
          0
        );

        const order = await encrypt({
          userEmail,
          products: parsedOrder.products,
          total,
        });

        cookies().set("order", order, { httpOnly: true });
      }
    }
  } catch (error: any) {
    return { error: error?.message || "Failed to create order." };
  } finally {
    revalidatePath("/**");
  }
}
