import React, { useContext, useState ,useEffect } from "react";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Button from "@mui/material/Button";
import { SelectedVariants } from "../pages/Product";
import { createCartAPI } from "../middlewave/cart/listAPI";
import { AddToCartAPI } from "../middlewave/products/listsAPI";
import { HandleSidebarCart } from "../App";

export default function ButtonAddToCart() {
  const theme = useContext(SelectedVariants);
  const siderbarCart = useContext(HandleSidebarCart)

 
  async function addToCartAPI(cartID,variantID) {
    let product = await AddToCartAPI(cartID,variantID);
  }
  

  async function createCart() {
    let cart = await createCartAPI();
    const data = JSON.stringify({
      checkoutUrl: cart.checkoutUrl,
      cartID: cart.id,
    });
    window.localStorage.setItem("shopify:cart", data);
    addToCartAPI(cart.id,theme.variant);
  }


  const addToCart = () => {
    let localCartData = JSON.parse(window.localStorage.getItem("shopify:cart"));
    if(!localCartData){
      createCart();   
    } else {
      addToCartAPI(localCartData.cartID,theme.variant);
    }
    setTimeout(() =>{
      siderbarCart.setOpen(true);
    }, 1000)
  };
  
  return (
    <Button
      onClick={addToCart}
      className="cursor-pointer w-full !py-[15px] !bg-dark-orange"
      variant="contained"
      endIcon={<AddShoppingCartIcon />}
    >
      Add to cart
    </Button>
  );
}
