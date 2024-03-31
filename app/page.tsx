import Promo from "@/components/promo";
import { PRODUCTS } from "@/data";

export default async function Home() {

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
