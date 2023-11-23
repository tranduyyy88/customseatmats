import { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Cart } from "../App";
import { updateCartLines } from "../middlewave/cart/listAPI";

Quantity.propTypes = {
  quantity: PropTypes.number,
  id: PropTypes.string,
};

export default function Quantity({ quantity, id }) {
  const [tmp_quantity, setQuantity] = useState(quantity);
  const [cartID, setCartID] = useState("");
  const getCart = useContext(Cart);
  useEffect(() => {
    let localCartData = JSON.parse(window.localStorage.getItem("shopify:cart"));
    setCartID(localCartData.cartID);
  }, []);
  useEffect(() => {
    async function changeQuantity(cartID, id, tmp_quantity) {
      const response = await updateCartLines(cartID, id, tmp_quantity);
      getCart.setCart({
        checkoutUrl: response.cart.checkoutUrl,
        estimatedCost: response.cart.estimatedCost,
        lines: response.cart.lines.edges,
      });
    }
    changeQuantity(cartID, id, tmp_quantity);
  }, [tmp_quantity]);
  const handlePlus = () => {
    const newQuantity = tmp_quantity + 1;
    setQuantity(newQuantity);
  };
  const handleMinus = () => {
    const newQuantity = tmp_quantity - 1;
    setQuantity(newQuantity);
  };
  return (
    <div className="flex items-center border-gray-100">
      <span className="cursor-pointer rounded-l bg-gray-100 py-[6px] px-3.5 duration-100 hover:bg-dark-orange hover:text-blue-50"
      onClick={() => handleMinus()}>
        -
      </span>
      <input
        className="h-8 w-8 border bg-white text-center text-xs outline-none"
        type="number"
        value={tmp_quantity}
        min={0}
      />
      <span
        className="cursor-pointer rounded-r bg-gray-100 py-[6px] px-3 duration-100 hover:bg-dark-orange hover:text-blue-50"
        onClick={() => handlePlus()}
      >
        +
      </span>
    </div>
  );
}
