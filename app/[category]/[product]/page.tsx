import React, { Suspense } from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Phone } from 'lucide-react'
import { getLocalOrder } from '@/app/_actions/localOrder'
import { getSession } from '@/app/_actions/user'
import { LocalOrderProps, PageSearchParams, SessionProps } from '@/lib/schema'
import { cn, currentProduct } from '@/lib/utils'
import ProductBreadcrumbs from './_components/ProductBreadcrumbs'
import Description from './_components/Description'
import AddToCart from './_components/AddToCart'
import Fallback from '@/components/ui/Fallback'
import ProductCard from '@/components/ui/ProductCard'
import { CATEGORIES, PRODUCTS } from '@/data'

type Props = { searchParams: PageSearchParams }

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const id = searchParams.id

  return {
    title: PRODUCTS
      .filter(product =>
        product.id === Number(id))[0].title + PRODUCTS
          .filter(product =>
            product.id === Number(id))[0].code,
    description: PRODUCTS
      .filter(product =>
        product.id === Number(id))[0].title + PRODUCTS
          .filter(product =>
            product.id === Number(id))[0].code,
    // openGraph: {
    //   images: '/products/1.png',
    // },
  }
}

export default async function Product({ searchParams }: Props) {
  const session: SessionProps = await getSession();
  const localOrder: LocalOrderProps = await getLocalOrder();

  const id = searchParams.id

  const product = PRODUCTS
    .filter(product =>
      product.id === Number(id))[0]

  const categoryHref = `${CATEGORIES
    .filter(category =>
      category.id === Number(product.categoryId))[0].slug}/`

  return (
    <>
      <Suspense fallback={<Fallback />}>
        <div className="wrapper">

          <ProductBreadcrumbs
            categoryHref={categoryHref}
            categoryId={product.categoryId}
            title={product.title}
          />

          <section className='mt-4 flex flex-col lg:flex-row gap-3'>
            <div className='p-3 bg-white rounded flex flex-col md:flex-row gap-3 shadow'>
              <div>
                <Image
                  src={product.images[0]}
                  alt={"Img"}
                  width={408}
                  height={100}
                  className="w-full object-contain bg-gray-200 rounded"
                  priority
                  quality={100}
                />
              </div>

              <div className='md:min-w-[300px]'>
                <h1 className='font-bold text-3xl'>{product.title}</h1>
                <small>EAN: {product.code}</small>

                {product.sizeOptions.length > 0 &&
                  <>
                    <b className='block mt-2'>Sizes</b>
                    <div className='mt-1 flex gap-3'>{product.sizeOptions.map(size => (
                      <Link
                        key={size.id}
                        href={{
                          pathname: categoryHref + currentProduct(size).slug + currentProduct(size).code, query: {
                            id: currentProduct(size).id
                          }
                        }}
                        className={cn("w-full flex items-center justify-center p-2 rounded",
                          product.id === size.productId ? "bg-green-600 text-white font-bold" : "bg-gray-200"
                        )}>
                        {size.size}
                      </Link>
                    ))}
                    </div>
                  </>
                }

                <Description description={product.description} />
              </div>
            </div>

            <div className='w-full md:w-1/4 min-w-[300px] bg-white h-fit p-3 rounded shadow'>
              {product.isAvailable ?
                <AddToCart
                  isAvailable={product.isAvailable}
                  userEmail={session?.email}
                  productId={product.id}
                  price={product.price}
                  inCart={localOrder?.products?.some((item) => item.productId === product.id)}
                  info={session?.info}
                /> :
                <button
                  type='button'
                  className="w-full bg-gray-400 text-white font-bold text-lg flex items-center justify-center px-2 py-4 rounded">
                  No product
                </button>
              }
              <a className='mt-3 flex gap-4 justify-center items-center bg-gray-100 w-full p-3 rounded'
                href="tel:+380672785349">
                <Phone
                  size={18}
                  className='fill-green-600 stroke-green-600' />
                <span>+38-067-278-53-49</span>
              </a>
            </div>
          </section>

          {product.analogues.length > 0 &&
            <>
              <b className='block mt-3'>Analogues</b>

              <div className='productsGrid'>
                {product.analogues.map(analogue => (
                  <ProductCard
                    key={analogue.id}
                    categoryHref={categoryHref}
                    item={currentProduct(analogue)}
                  />
                ))}
              </div>
            </>
          }
        </div>
      </Suspense>
    </>
  )
}