import React, { Suspense } from 'react'
import { CATEGORIES, PRODUCTS } from '@/data'
import Link from 'next/link'
import { Home, ChevronRight, Phone } from 'lucide-react'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Counter from './_components/Counter'

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

          {/* Breadcrumbs */}
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
            <b>{product.title}</b>
          </div>

          <div className='flex flex-col md:flex-row gap-4'>
            <div className='p-5 w-full md:w-3/4 bg-white rounded-xl flex flex-col md:flex-row gap-8'>
              <div className=' flex flex-col md:flex-row gap-4'>
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

              <div className='min-w-[200px]'>
                <h2 className='font-bold text-3xl'>{product.title}</h2>
                <p>EAN: {product.code}</p>

                {product.sizeOptions.length > 0 &&
                  <>
                    <b className='block mt-5'>Sizes</b>
                    <div className='mt-2 flex gap-3'>{product.sizeOptions.map(size => (
                      <Link
                        key={size.id}
                        href={{
                          pathname: categoryHref + currentProduct(size).slug + currentProduct(size).code, query: {
                            id: currentProduct(size).id
                          }
                        }}
                        className={cn("w-full flex items-center justify-center p-2 rounded-md",
                          product.id === size.productId ? "bg-orange-400 font-bold" : "bg-gray-200"
                        )}>
                        {size.size}
                      </Link>
                    ))}
                    </div>
                  </>
                }
              </div>
            </div>

            <div className='w-full md:w-1/4 bg-white h-fit p-5 rounded-xl '>
              <Counter price={product.price} />

              <button
                className="mt-4 w-full bg-green-600 text-white font-bold text-lg flex items-center justify-center px-2 py-4 rounded-xl">
                Add to cart
              </button>

              <a
                className='mt-4 flex gap-2 items-center'
                href="tel:+380672785349">
                <Phone /> <span>+38-067-278-53-49</span>
              </a>

            </div>
          </div>


          {product.analogues.length > 0 &&
            <>
              <b className='block mt-5'>Analogues</b>
              <div className='mt-2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3'>
                {product.analogues.map(analogue => (
                  <div key={analogue.id} className='w-full'>
                    <Link
                      href={{
                        pathname: categoryHref + currentProduct(analogue).slug + currentProduct(analogue).code, query: {
                          id: currentProduct(analogue).id
                        }
                      }}
                      className="flex flex-col h-full bg-white p-2 md:p-5 rounded-xl w-full shadow">
                      <Image
                        src={"/1.jpg"}
                        alt={"Img"}
                        width={408}
                        height={100}
                        className="w-full object-contain rounded-lg"
                        priority
                        quality={100}
                      />

                      <h3 className='mt-3 font-bold'>{currentProduct(analogue).title}</h3>
                      <p className='font-bold'>{currentProduct(analogue).price} zl</p>
                    </Link>

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