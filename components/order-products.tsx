import React from 'react'
import { getSession, getUserByEmail } from '@/app/_actions/user';
import { SessionProps } from '@/lib/schema';
import { currentProduct } from '@/lib/utils';
import ProductCard from './ui/ProductCard';
import { CATEGORIES } from '@/data';

type Props = {}

export default async function OrderProducts({ }: Props) {
  const session: SessionProps = await getSession();
  const { item }: any = await getUserByEmail(session?.email)

  const userUniqueProducts = item?.orders
    .map((order: { products: string; }) =>
      JSON.parse(order.products))
    .flat(1)
    .filter((product: { productId: any; }, index: any, self: any[]) =>
      index === self
        .findIndex((p: { productId: any; }) => (
          p.productId === product.productId
        ))
    );

  const categoryHref = (id: any) => {
    return `${CATEGORIES
      .filter(category =>
        category.id === Number(id))[0].slug}/`
  }

  return (
    <>
      {userUniqueProducts && (
        <>
          <b className='block mt-4'>Your purchased products</b>
          <div className='productsGrid'>
            {userUniqueProducts.map((product: any) => (
              <ProductCard
                key={product.id}
                categoryHref={categoryHref(currentProduct(product).categoryId)}
                item={currentProduct(product)}
              />
            ))}
          </div>
        </>
      )}

    </>
  )
}