import { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
ItemProduct.propTypes = {
  product: PropTypes.object,
};
export default function ItemProduct({ product }) {
  const [active, setActive] = useState("");

  const selectedVariant = (id) => {
    product.variants.nodes.map((variant) => {
      if (id == variant.id) {
        setActive(variant.id);
      }
    });
  };
  return (
    <div className="bg-[#f6f5f7] rounded-[6px] card">
      <Link
        to={`products/${product.handle}`}
        className="block box-card group relative"
      >
        {product.images.nodes.map((image, i) => {
          return (
            <div
              key={i}
              className={
                i > 0
                  ? "relative pb-[100%] card-image product-hover-image hidden animate-[fadeIn_.6s] group-hover:block"
                  : "relative pb-[100%] card-image animate-[fadeIn_.6s]  group-hover:hidden"
              }
            >
              <img
                className="absolute left-0 right-0 top-0 bottom-0 object-cover w-[100%] h-[100%]"
                src={image.url}
              ></img>
            </div>
          );
        })}
        <span className="text-[12px] p-[5px_12px] rounded-[10px_0px] font-bold font-sans bg-[#c39b30] text-white badge absolute left-[10px] top-[10px]">
          Save{" "}
          <span className="product-badge-discount">
            {((product.variants.nodes[0].price.amount * 100) / product.variants.nodes[0].compareAtPrice.amount).toFixed()}%
          </span>
        </span>
      </Link>
      <div className="card-body p-[16px] text-center">
        <ul className="swatch flex gap-[8px] justify-center mb-[10px] items-center">
          {product.variants.nodes.map((variant, i) => {
            if (i < 3) {
              return (
                <li
                  key={i}
                  className={active == variant.id ? "group active" : ""}
                >
                  <span
                    onClick={() => selectedVariant(variant.id)}
                    className="cursor-pointer block w-[35px] h-[35px] swatch-element rounded-[50%] p-[4px] border-[1px] border-solid border-[#e5e5e5] group-[.active]:border-[#333]"
                  >
                    <img
                      className="w-[100%] h-[100%] object-cover rounded-[50%]"
                      src={variant.image.url}
                    ></img>
                  </span>
                </li>
              );
            }
          })}
          <li>
            <a
              href={`products/${product.handle}`}
              className="underline small-link text-[#212529] text-[12px]"
            >
              {product.variants.nodes.length > 3
                ? `+${product.variants.nodes.length - 3}`
                : ""}
            </a>
          </li>
        </ul>
        <h3 className="text-[#212529] font-sans font-bold text-[16px] mb-[10px] truncate ...">
          {product.title}
        </h3>
        <div className="box-price font-sans font-bold">
          <span className="price text-[#c39b30]">
            ${product.variants.nodes[0].price.amount}
          </span>
          <span className="comparePrice ml-[8px] text-[#a6a7a9] line-through">
            ${product.variants.nodes[0].compareAtPrice.amount}
          </span>
        </div>
      </div>
    </div>
  );
}
