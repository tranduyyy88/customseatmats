import { useEffect, useState } from "react";
import ProductMedia from "./ProductMedia";
import Variants from "../../components/Variants";
import ButtonAddToCart from "../../components/ButtonAddToCart";
import DOMPurify from "dompurify";

export default function SingleProduct({ product }) {
  const [my_product , setProduct] = useState({
    id: "",
    title: "",
    vendor: "",
    description: "",
    media: [],
    variants: [],  
    options: []
  })
  useEffect(() => {
    async function loadProduct() {
      const this_product = await product;
      setProduct({
        id: this_product?.id,
        title: this_product?.title,
        description: this_product?.descriptionHtml,
        media: this_product?.media?.nodes,
        variants: this_product?.variants?.nodes,
        options: this_product?.options
      })
    }
    loadProduct();
  }, [product]);
  const cleanHTML = DOMPurify.sanitize(my_product.description, {
    USE_PROFILES: { html: true },
  });

  return (
    <section className="section--product py-[50px]">
      <div className="container">
        <div className="grid grid-cols-2 gap-[20px] mobile:grid-cols-1">
          <div className="box-image">
            <div className=" sticky top-[90px]">
              <ProductMedia listMedia={my_product.media} />
            </div>
          </div>
          <div className="box-info">
            <span className="vendor font-poppins text-[#898989]">
              {my_product.vendor}
            </span>
            <h1 className="title font-poppins font-bold text-[35px] mb-[25px]">
              {my_product.title}
            </h1>

            <Variants options={my_product.options} variants={my_product.variants}/>
            
            <ButtonAddToCart />
            <div
              className="description mt-[20px]"
              dangerouslySetInnerHTML={{ __html: cleanHTML }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
