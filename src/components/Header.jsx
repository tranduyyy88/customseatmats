import logo from "../assets/images/logo.png";
import { useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import { HandleSidebarCart } from "../App";
import { loadCartAPI } from "../middlewave/cart/listAPI";
import { getCookie } from "../constants/getCookies";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { deleteCookie } from "../constants/deleteCookie";
import PredictiveSearch from "./PredictiveSearch";
const menu = [
  {
    title: "Home",
    path: "/",
    children: [],
    id: "1",
  },
  {
    title: "Shop",
    path: "/collections",
    children: [],
    id: "2",
  },
  {
    title: "FAQs",
    path: "/faqs",
    children: [],
    id: "3",
  },
  {
    title: "Contact",
    path: "/contact",
    children: [],
    id: "4",
  },
];
export default function Header() {
  const theme = useContext(HandleSidebarCart);
  const [isActive, setIsActive] = useState(false);
  const [isActiveNav, setIsActiveNav] = useState(false);
  const [count, setCount] = useState("");
  const [login, setLogin] = useState(false);
  async function getCartData(cartID) {
    const response = await loadCartAPI(cartID);
    const count = response.lines.edges.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.node.quantity;
    }, 0);
    if (response) {
      setCount(count);
    } else {
      setCount(0);
    }
  }
  let localCartData = JSON.parse(window.localStorage.getItem("shopify:cart"));
  if (localCartData) getCartData(localCartData.cartID);

  useEffect(() => {
    const AccessToken = getCookie("AccessTokenShopify");
    if (AccessToken !== null) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  }, []);

  const Logout = (e) => {
    e.preventDefault();
    deleteCookie("AccessTokenShopify");
    toast.success("You are successfully logged out");
    setLogin(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setIsActive(true);
  };
  const handleNavigation = () => {
    setIsActiveNav(!isActiveNav);
  };
  return (
    <header className="section--header bg-[#121212] py-[10px] sticky top-0 left-0 right-0 z-[99]">
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
        theme="light"
      />
      <PredictiveSearch isActive={isActive} setIsActive={setIsActive} />
      <div className="container">
        <div className="grid grid-cols-[1fr_3fr_1fr] mobile:flex mobile:justify-between">
          <div className="grid__item grid__item--logo">
            <Link to="/">
              <img src={logo} className="mobile:w-[100px]" alt="logo"></img>
            </Link>
          </div>
          <nav
            className={
              isActiveNav
                ? "grid__item grid__item--menu is-active"
                : "grid__item grid__item--menu"
            }
          >
            <ul className="menu flex items-center justify-center gap-[30px] h-[100%]">
              {menu.map(function (item) {
                return (
                  <li key={item.id} className="menu-item relative group">
                    <NavLink
                      to={item.path}
                      onClick={handleNavigation}
                      className={({ isActive }) =>
                        isActive
                          ? "flex items-center gap-[5px] uppercase hover:opacity-[.6] text-[#fff] opacity-[.6] active"
                          : "flex items-center gap-[5px] uppercase hover:opacity-[.6] text-[#fff]"
                      }
                    >
                      {item.title}
                      {item.children.length > 0 && (
                        <i className="text-[9px] fa-solid fa-chevron-down"></i>
                      )}
                    </NavLink>
                    {item.children.length > 0 && (
                      <ul className="opacity-[0] invisible translate-y-[20px] transition-all absolute left-0 bg-white rounded-[6px] z-[3] w-[max-content] max-w-[250px] min-w-[175px] p-[8px] dropdown-menu group-hover:opacity-[1] group-hover:visible group-hover:translate-y-[0px]">
                        {item.children.map(function (item_children) {
                          return (
                            <li
                              key={item_children.id}
                              className="dropdown-item"
                            >
                              <a
                                href={item_children.path}
                                className="flex uppercase hover:opacity-[.6] text-[#333] p-[8px]"
                              >
                                {item_children.title}
                              </a>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
            <svg
              onClick={handleNavigation}
              className="hidden absolute right-[20px] top-[20px] mobile:block"
              height="30px"
              viewBox="0 0 32 32"
              width="30px"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="Layer_22" data-name="Layer 22">
                <path d="m21 12.46-3.59 3.54 3.59 3.54a1 1 0 0 1 0 1.46 1 1 0 0 1 -.71.29 1 1 0 0 1 -.7-.29l-3.59-3.59-3.54 3.59a1 1 0 0 1 -.7.29 1 1 0 0 1 -.71-.29 1 1 0 0 1 0-1.41l3.54-3.59-3.54-3.54a1 1 0 0 1 1.41-1.41l3.54 3.54 3.54-3.54a1 1 0 0 1 1.46 1.41zm4.9 13.44a14 14 0 1 1 0-19.8 14 14 0 0 1 0 19.8zm-1.41-18.39a12 12 0 1 0 0 17 12 12 0 0 0 0-17z" />
              </g>
            </svg>
          </nav>
          <div className="grid__item grid__item--icons">
            <ul className="nav-icons flex items-center justify-end gap-[25px] h-[100%] mobile:gap-[10px]">
              <li className="site-nav__item flex">
                {login ? (
                  <Link
                    onClick={Logout}
                    className="site-nav__link--icon relative"
                    to="/"
                  >
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      role="presentation"
                      className="w-[28px] h-[28px] icon icon-user"
                      viewBox="0 0 64 64"
                    >
                      <path d="M35 39.84v-2.53c3.3-1.91 6-6.66 6-11.41 0-7.63 0-13.82-9-13.82s-9 6.19-9 13.82c0 4.75 2.7 9.51 6 11.41v2.53c-10.18.85-18 6-18 12.16h42c0-6.19-7.82-11.31-18-12.16z"></path>
                    </svg>
                  </Link>
                ) : (
                  <Link className="site-nav__link--icon relative" to="/login">
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      role="presentation"
                      className="w-[28px] h-[28px] icon icon-user"
                      viewBox="0 0 64 64"
                    >
                      <path d="M35 39.84v-2.53c3.3-1.91 6-6.66 6-11.41 0-7.63 0-13.82-9-13.82s-9 6.19-9 13.82c0 4.75 2.7 9.51 6 11.41v2.53c-10.18.85-18 6-18 12.16h42c0-6.19-7.82-11.31-18-12.16z"></path>
                    </svg>
                  </Link>
                )}
              </li>
              <li className="site-nav__item flex">
                <Link
                  className="site-nav__link--icon relative"
                  to="/search"
                  onClick={handleSearch}
                >
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    role="presentation"
                    className="w-[28px] h-[28px] icon icon-search"
                    viewBox="0 0 64 64"
                  >
                    <path d="M47.16 28.58A18.58 18.58 0 1 1 28.58 10a18.58 18.58 0 0 1 18.58 18.58zM54 54L41.94 42"></path>
                  </svg>
                </Link>
              </li>
              <li className="site-nav__item flex">
                <button
                  className="site-nav__link--icon relative"
                  onClick={() => theme.setOpen(true)}
                >
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    role="presentation"
                    className="w-[28px] h-[28px] icon icon-bag"
                    viewBox="0 0 64 64"
                  >
                    <g fill="none" stroke="#fff" strokeWidth={4}>
                      <path d="M25 26c0-15.79 3.57-20 8-20s8 4.21 8 20"></path>
                      <path d="M14.74 18h36.51l3.59 36.73h-43.7z"></path>
                    </g>
                  </svg>
                  <span className="cart-count text-[#fff] absolute top-[-9px] right-[-1px] text-[13px]">
                    {count}
                  </span>
                </button>
              </li>
              <li className="site-nav__item hidden mobile:block">
                <svg
                  fill="#fff"
                  className="w-[28px] h-[28px] icon-menu"
                  height="20"
                  viewBox="0 0 20 20"
                  width="20"
                  xmlns="http://www.w3.org/2000/svg"
                  onClick={handleNavigation}
                >
                  <path
                    clipRule="evenodd"
                    d="m9 15c0-.5523.44772-1 1-1h6c.5523 0 1 .4477 1 1s-.4477 1-1 1h-6c-.55228 0-1-.4477-1-1zm-6-10c0-.55229.44771-1 1-1h12c.5523 0 1 .44771 1 1 0 .55228-.4477 1-1 1h-12c-.55229 0-1-.44772-1-1zm0 5c0-.55228.44771-1 1-1h12c.5523 0 1 .44772 1 1 0 .5523-.4477 1-1 1h-12c-.55229 0-1-.4477-1-1z"
                    fillRule="evenodd"
                  />
                </svg>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}
