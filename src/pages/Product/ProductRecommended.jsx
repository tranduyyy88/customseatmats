import { useEffect, useState } from "react";
import { ProductRecommendations } from "../../middlewave/products/listsAPI";
import ItemProduct from "../../components/ItemProduct";
import PropTypes from "prop-types";
ProductRecommended.propTypes = {
  productID: PropTypes.string,
};
export default function ProductRecommended({ productID }) {
  console.log(productID);
  const [listProducts, setListProducts] = useState([]);
  useEffect(() => {
    async function loadAPI() {
      let response = await ProductRecommendations(productID);
      setListProducts(response);
    }
    if (typeof myVariable != "undefined") {
      loadAPI();
    }
  }, [productID]);
  return (
    <section className="section--product-recommendations mb-[100px]">
      <div className="container">
        <h3 className="title text-center font-poppins text-[35px] font-bold mb-[30px]">
          Recommended for you
        </h3>
        <ul className="m-0 p-0 grid grid-cols-3 gap-[30px]">
          {listProducts.map((products, index) => {
            return <ItemProduct key={index} product={products} />;
          })}
        </ul>
      </div>
    </section>
  );
}
