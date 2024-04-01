import { cn } from '@/lib/utils'
import Image from 'next/image'
import React from 'react'
import { X } from 'lucide-react';
import { CATEGORIES, PRODUCTS } from '@/data';
import Link from 'next/link';
import { LocalOrderProps, ProductForOrderProps, SessionProps } from '@/lib/schema';
import { getSession } from '../_actions/user';
import { getLocalOrder } from '../_actions/localOrder';
import DeleteProduct from './_components/DeleteProduct';

type Props = {}

export default async function Cart({ }: Props) {

  const session: SessionProps = await getSession();
  const localOrder: LocalOrderProps = await getLocalOrder();

  const currentProduct = (id: string) => {
    return PRODUCTS.filter(product => product.id.toString() === id)[0]
  }

  // const categoryHref = `${CATEGORIES
  //   .filter(category =>
  //     category.id === Number(product.categoryId))[0].slug}/`

  return (
    <section>
      <div className="wrapper pb-5">
        <h2>Cart</h2>

        {localOrder ?
          <section className='mt-4 flex flex-col lg:flex-row rounded-lg shadow-md'>
            <div className='p-4 w-full lg:w-2/3 bg-white rounded-t-lg lg:rounded-r-none lg:rounded-l-lg flex flex-col items-start md:flex-row gap-8'>
              <div className='w-full'>

                <div className='flex flex-col gap-3'>
                  {localOrder.products.map((el, index) => (
                    <div key={el.id} className='flex flex-col md:flex-row gap-4 items-center border-b pb-3 last:pb-0 last:border-none'>
                      <div className='w-full flex gap-4 md:items-center'>
                        <Link
                          href={'/'}
                          className='w-32 h-32 aspect-square'
                        // href={{
                        //   pathname: categoryHref + currentProduct(analogue).slug + currentProduct(analogue).code, query: {
                        //     id: currentProduct(analogue).id
                        //   }
                        // }}
                        >
                          <Image
                            src={currentProduct(el.productId.toString()).images[0]}
                            alt={"Img"}
                            width={408}
                            height={100}
                            className="w-full h-full object-contain bg-gray-200 rounded-lg"
                            priority
                            quality={100}
                          />
                        </Link>

                        <div className='w-full'>
                          <b>{index + 1}. {currentProduct(el.productId.toString()).title}</b>
                          <p>{currentProduct(el.productId.toString()).price} zl/szt</p>
                        </div>
                      </div>

                      <div className='w-full flex gap-4 items-center justify-between'>

                        <div className='max-w-44 w-full flex justify-between border-2 rounded-xl'>
                          <button
                            // onClick={() => setCount(count - 1)}
                            className='h-12 w-12 aspect-square font-bold'>
                            -
                          </button>

                          <input
                            type='number'
                            value={el.quantity}
                            readOnly
                            min={1}
                            step={1}
                            // onPaste={(e) => {
                            //   e.preventDefault()
                            //   return false
                            // }}
                            // value={count}
                            // onChange={(e: any) => setCount(e.target.value)}
                            className='w-full text-center font-bold border-x-2 flex items-center justify-center' />

                          <button
                            // onClick={() => setCount(count + 1)}
                            className='h-12 w-12 aspect-square font-bold'>
                            +
                          </button>
                        </div>

                        <b className='px-4 whitespace-nowrap'>
                          {el.quantity * currentProduct(el.productId.toString()).price}
                        </b>

                        <DeleteProduct id={el.id} />
                      </div>
                    </div>
                  ))}
                </div>

              </div>

            </div>

            <div className='w-full lg:w-1/3 min-w-[300px] bg-gray-100 p-4 rounded-b-lg lg:rounded-r-lg lg:rounded-l-none'>
              <div className='w-full flex items-center justify-between'>
                <b className='text-lg'>Summary</b>
                <span>{localOrder.products.reduce(
                  (acc: number, el: ProductForOrderProps) => {
                    const res = acc + el.quantity;
                    return res;
                  },
                  0
                )} items</span>
              </div>

              <p className='font-bold mt-4 text-xs'>Customer</p>
              <p>{localOrder.userEmail}</p>

              <p className='font-bold mt-4 text-xs'>Address</p>
              <p>{localOrder.info}</p>

              <div className='flex justify-between items-center'>
                <h2>Total:</h2>
                <h2>{localOrder.total} zl</h2>
              </div>

              <button
                className={cn("w-full bg-black disabled:bg-gray-400 text-white font-bold text-lg flex items-center justify-center px-2 py-4 rounded-lg",
                  true && "mt-4")}
              >
                Buy
              </button>
            </div>
          </section>
          : (<div className='mt-4'>No items</div>)}


      </div>
    </section>
  )
}