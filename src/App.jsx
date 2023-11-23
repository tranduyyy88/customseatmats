import "./App.css";
import Header from "./components/header";
import Announcement from "./pages/Home/Announcement";
import Footer from "./components/Footer";
import Router from "./router";
import SidebarCart from "./components/SidebarCart";
import { createContext, useState } from "react";

export const HandleSidebarCart = createContext(null);
export const Cart = createContext(null);

function App() {
  const [open, setOpen] = useState(false);
  const [cart, setCart] = useState({
    checkoutUrl: "",
    estimatedCost: {},
    lines: [],
  });
  return (
    <HandleSidebarCart.Provider value={{ open, setOpen }}>
      <Cart.Provider value={{cart,setCart}}>
        <Announcement />
        <SidebarCart />
        <Header />
        <Router />
        <Footer />
      </Cart.Provider>
    </HandleSidebarCart.Provider>
  );
}

export default App;
