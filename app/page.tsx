import Promo from "@/components/promo";
import { getItems } from "@/lib/items";

export default async function Home() {
  const { items = [] } = await getItems()

  return (
    <section className="pb-4">
      <div className="wrapper">
        <Promo />
      </div>

      <div className="wrapper py-5">
        {items?.map(
          (el, i) =>
            <div key={el.id}>
              <span>{i + 1}. {el.title} {el.price}</span>
              {/* <DeleteForm id={el.id} /> */}
            </div>
        )}
      </div>
    </section>
  );
}
