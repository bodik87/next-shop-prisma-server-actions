import React, { Suspense } from 'react'
import { CATEGORIES, PRODUCTS } from '@/data'
import Link from 'next/link'
import { Home, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import Image from 'next/image'

type PageSearchParams = {
  id: string
}

type Props = {
  searchParams: PageSearchParams
}

function SearchBarFallback() {
  return <div className='wrapper py-5'>Loading...</div>
}

export default function Product({ searchParams }: Props) {
  const id = searchParams.id

  const product = PRODUCTS
    .filter(product =>
      product.id === Number(id))[0]

  const categoryHref = `${CATEGORIES
    .filter(category =>
      category.id === Number(product.categoryId))[0].slug}/`

  const currentProduct = (parametr: any) => {
    return PRODUCTS
      .filter(product =>
        product.id === Number(parametr.productId))[0]
  }

  return (
    <section className=''>
      <Suspense fallback={<SearchBarFallback />}>
        <div className="wrapper py-5">

          <div className='mb-4 flex gap-2 items-center text-sm'>
            <Link href={`/`}><Home size={18} className='text-gray-500' /></Link>
            <ChevronRight size={18} className='text-gray-500' />
            <Link
              className='text-gray-500'
              href={{ pathname: categoryHref, query: { id: product.categoryId } }}>
              {CATEGORIES
                .filter(category =>
                  category.id === Number(product.categoryId))[0].title}
            </Link>
            <ChevronRight size={18} className='text-gray-500' />
            <p>{product.title}</p>
          </div>

          <h2 className='font-bold text-3xl'>{product.title}</h2>
          <p>EAN: {product.code}</p>

          <Image
            src={"/1.jpg"}
            alt={"Img"}
            width={408}
            height={100}
            className="w-full object-contain rounded-lg"
            priority
            quality={100}
          />

          <p>Price: {product.price}</p>

          {product.sizeOptions.length > 0 &&
            <>
              <b className='block mt-5'>Sizes</b>
              <div className='flex gap-3'>{product.sizeOptions.map(size => (
                <Link
                  key={size.id}
                  href={{
                    pathname: categoryHref + currentProduct(size).slug + currentProduct(size).code, query: {
                      id: currentProduct(size).id
                    }
                  }}
                  className={cn("p-2 rounded-md",
                    product.id === size.productId ? "bg-red-300" : "bg-blue-300"
                  )}>
                  {size.size}
                </Link>
              ))}
              </div>
            </>
          }

          {product.analogues.length > 0 &&
            <>
              <b className='block mt-5'>Analogues</b>
              <div className='flex gap-3'>{product.analogues.map(analogue => (
                <div key={analogue.id} className='w-full'>
                  <Link
                    href={{
                      pathname: categoryHref + currentProduct(analogue).slug + currentProduct(analogue).code, query: {
                        id: currentProduct(analogue).id
                      }
                    }}
                    className="p-2 rounded-md bg-gray-200">
                    {currentProduct(analogue).title}
                  </Link>
                  <Image
                    src={"/1.jpg"}
                    alt={"Img"}
                    width={408}
                    height={100}
                    className="w-full object-contain rounded-lg"
                    priority
                    quality={100}
                  />
                </div>
              ))}
              </div>
            </>
          }
        </div>
      </Suspense>
    </section>
  )
}