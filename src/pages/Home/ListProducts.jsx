import { useEffect, useState } from "react";
import { collectionsbyhandleAPI } from "../../middlewave/collections/listsAPI";
import ItemProduct from "../../components/ItemProduct";

export default function ListProducts() {
  const [listProducts, setListProducts] = useState([]);
  const [title, setTitle] = useState("");
  useEffect(() => {
    async function fetchMyAPI() {
      let response = await collectionsbyhandleAPI("best-sellers");
      setListProducts(response.products.edges);
      setTitle(response.title)
    }

    fetchMyAPI();
  }, []);
  return (
    <section className='section--featured-products mt-[60px] mobile:mt-[50px]'>
        <div className="container">
            <h2 className='text-center text-[40px] font-sans font-bold mb-[40px]'>{title}</h2>
            <ul className='m-0 p-0 grid grid-cols-3 gap-[30px] mobile:grid-cols-1 mobile:gap-[15px]'>
              {
                listProducts.map((products,index) => {
                  return (
                    <ItemProduct key={index} product={products.node} />
                  )
                })
              }
            </ul>
        </div>
    </section>
  );
}
