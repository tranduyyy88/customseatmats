import { useEffect, useState } from "react";
import { menuAPI } from "../middlewave/menu/listsAPI";

export default function Footer() {
  const [menuFooter1, setMenuFooter1] = useState([]);
  const [menuFooter2, setMenuFooter2] = useState([]);
  useEffect(() => {
    async function fetchMyAPI() {
      let menu_footer_1 = await menuAPI("footer");
      let menu_footer_2 = await menuAPI("other-resources");
      setMenuFooter1(menu_footer_1.items);
      setMenuFooter2(menu_footer_2.items);
    }
    fetchMyAPI();
  }, []);
  return (
    <footer className="relative bg-[#121212] pt-8 pb-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap text-left lg:text-left mobile:gap-[20px]">
          <div className="w-full lg:w-6/12 px-4 mobile:w-full">
            <h4 className="text-3xl fonat-semibold text-white">
              Let's keep in touch!
            </h4>
            <h5 className="text-lg mt-0 mb-2 text-white">
              Find us on any of these platforms, we respond 1-2 business days.
            </h5>
            <div className="mt-6 lg:mb-0 mb-6">
              <button
                className="bg-white text-[#121212] shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                type="button"
              >
                <i className="fab fa-twitter" />
              </button>
              <button
                className="bg-white text-lightBlue-600 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                type="button"
              >
                <i className="fab fa-facebook-square" />
              </button>
              <button
                className="bg-white text-pink-400 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                type="button"
              >
                <i className="fab fa-dribbble" />
              </button>
              <button
                className="bg-white text-blueGray-800 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                type="button"
              >
                <i className="fab fa-github" />
              </button>
            </div>
          </div>
          <div className="w-full lg:w-6/12 px-4 mobile:w-full">
            <div className="flex flex-wrap items-top mb-6 mobile:m-0 mobile:gap-[20px]">
              <div className="w-full lg:w-4/12 px-4 ml-auto mobile:w-full mobile:m-0 mobile:p-0">
                <span className="block uppercase text-white text-sm font-semibold mb-2">
                  Useful Links
                </span>
                <ul className="list-unstyled">
                  {menuFooter1.map((item , index) => {
                    if (!item.url) return null;

                    // if the url is internal, we strip the domain
                    const url =
                      item.url.includes("myshopify.com")
                        ? new URL(item.url).pathname
                        : item.url;
                    return (
                      <li key={index}>
                        <a
                          className="text-white hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                          href={url}
                        >
                          {item.title}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="w-full lg:w-4/12 px-4 mobile:w-full mobile:p-0">
                <span className="block uppercase text-white text-sm font-semibold mb-2">
                  Other Resources
                </span>
                <ul className="list-unstyled">
                {menuFooter2.map((item , index) => {
                    if (!item.url) return null;

                    // if the url is internal, we strip the domain
                    const url =
                      item.url.includes("myshopify.com")
                        ? new URL(item.url).pathname
                        : item.url;
                    return (
                      <li key={index}>
                        <a
                          className="text-white hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                          href={url}
                        >
                          {item.title}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <hr className="my-6 border-blueGray-300" />
        <div className="flex flex-wrap items-center md:justify-between justify-center">
          <div className="w-full md:w-4/12 px-4 mx-auto text-center mobile:w-full">
            <div className="text-sm text-white font-semibold py-1">
              Copyright © <span id="get-current-year">2021</span>
              <a
                href="https://www.creative-tim.com/product/notus-js"
                className="text-blueGray-500 hover:text-gray-800"
              >
                {" "}
                Notus JS by
              </a>
              <a
                href="https://www.creative-tim.com?ref=njs-profile"
                className="text-blueGray-500 hover:text-blueGray-800"
              >
                Creative Tim
              </a>
              .
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
