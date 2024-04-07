import { CATEGORIES, POPULAR_PRODUCTS } from "@/data";
import { currentProduct } from "@/lib/utils";
import ProductCard from "@/components/ui/ProductCard";
import Promo from "@/components/promo";

export default async function Home() {

  const categoryHref = (id: any) => {
    return `${CATEGORIES
      .filter(category =>
        category.id === Number(id))[0].slug}/`
  }

  return (
    <>
      <Promo />

      <div className="mt-4 wrapper">

        <b>Popular products</b>

        <div className='productsGrid'>
          {POPULAR_PRODUCTS.map(
            (el) =>
              <ProductCard
                key={currentProduct(el).id}
                categoryHref={categoryHref(currentProduct(el).categoryId)}
                item={currentProduct(el)}
              />
          )}
        </div>
      </div>
    </>
  );
}
