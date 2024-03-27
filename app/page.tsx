import Promo from "@/components/promo";
import { PRODUCTS } from "@/data";
// import { getItems } from "@/lib/items";

export default async function Home() {
  // const { items = [] } = await getItems()

  return (
    <section className="pb-4">
      <div className="wrapper">
        <Promo />
      </div>

      <div className="wrapper py-5">
        {PRODUCTS.map(
          (el) =>
            <div key={el.id}>
              <span>{el.title} {el.price}</span>
              {/* <DeleteForm id={el.id} /> */}
            </div>
        )}
      </div>
    </section>
  );
}
