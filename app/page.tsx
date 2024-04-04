import Promo from "@/components/promo";
import { CATEGORIES, PRODUCTS } from "@/data";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {

  const categoryHref = (id: any) => {
    return `${CATEGORIES
      .filter(category =>
        category.id === Number(id))[0].slug}/`
  }

  return (
    <section className="pb-4">
      <div className="wrapper">
        <Promo />
      </div>

      <div className="mt-4 wrapper pb-5">
        <div className='grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3'>
          {PRODUCTS.map(
            (el) =>
              <div key={el.id} className='w-full'>
                <Link
                  href={{ pathname: categoryHref(el.categoryId) + el.slug + el.code, query: { id: el.id } }}
                  className="bg-white flex flex-col h-full p-3 rounded-xl w-full shadow-md md:hover:shadow-xl transition-all relative"
                >
                  <Image
                    src={el.images[0]}
                    alt={"Img"}
                    width={408}
                    height={100}
                    className="w-full object-contain bg-gray-200 rounded-lg"
                    priority
                    quality={100}
                  />

                  {!el.isAvailable && <div className='absolute top-3 left-3 p-4 rounded-tl-lg rounded-br-lg w-fit bg-black text-white text-sm font-semibold'>
                    Is not available
                  </div>}

                  <h3 className='mt-4 font-bold text-xl'>{el.title}</h3>

                  <div className='mt-2 flex justify-between items-end'>
                    <p className='font-bold text-xl'>{el.price} zl</p>
                  </div>
                </Link>
              </div>
          )}
        </div>
      </div>
    </section>
  );
}
