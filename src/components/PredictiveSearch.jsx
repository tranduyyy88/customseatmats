import PropTypes from "prop-types";
import { useState } from "react";
import { Link } from "react-router-dom";
import { searchAPI } from "../middlewave/search/listAPI";
PredictiveSearch.propTypes = {
  isActive: PropTypes.bool,
  setIsActive: PropTypes.func,
};
export default function PredictiveSearch({ isActive, setIsActive }) {
  const [text, setText] = useState("");
  const [result, setIsResult] = useState([]);
  const closeSearch = () => {
    setIsActive(false);
    setText("");
  };
  const handleSearch = (e) => {
    setText(e.target.value);
    async function search(text) {
      const response = await searchAPI(text);
      setIsResult(response);
    }
    if(e.target.value != ""){
      search(e.target.value);
    } else {
      setIsResult([]);
    }
    
  };
  // useEffect(() => {
  //   async function search(text) {
  //     const response = await searchAPI(text);
  //     setIsResult(response);
  //     console.log(response);
  //   }
  //   search(text);
  // }, [text,search])
  
  return (
    <>
      <div
        className={
          isActive
            ? "drawer fixed top-0 bottom-0 left-0 right-0 z-[999] visible opacity-1 transition-opacity overflow-auto"
            : "drawer fixed top-0 bottom-0 left-0 right-0 z-[999] invisible opacity-0 transition-opacity"
        }
      >
        <div
          className="overlay fixed top-0 bottom-0 left-0 right-0 z-[999] bg-black opacity-[0.5]"
          onClick={closeSearch}
        ></div>
        <div
          className={
            isActive
              ? "relative z-[9999] shadow-[0_0_40px_#00000012] translate-y-[0px] transition-transform delay-200"
              : "relative z-[9999] shadow-[0_0_40px_#00000012] translate-y-[-100px] transition-transform delay-200"
          }
        >
          <div className="flex w-full justify-between gap-[30px] p-[30px]  bg-black">
            <form className="w-full flex-[1_1_100%]">
              <div className="flex flex-nowrap">
                <input
                  type="search"
                  id="default-search"
                  className="block w-full py-3 px-[20px] text-sm text-white  rounded-lg rounded-r-none bg-[#212529]"
                  placeholder="Search our store"
                  defaultValue={text}
                  required=""
                  onChange={handleSearch}
                />
                <button
                  type="submit"
                  className="bg-[#212529] py-3 px-[20px] rounded-r-lg"
                >
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </button>
              </div>
            </form>
            <button
              type="button"
              className="flex-[0_0_auto] bg-[#212529] rounded-lg w-[44px]"
              aria-label="Close menu"
              title="Close menu"
              onClick={closeSearch}
            >
              <span
                className="material-icons-round text-white"
                aria-hidden="true"
              >
                close
              </span>
            </button>
          </div>
          {result.length > 0 ? (
            <div className="search-result bg-black">
              <div className="list-result">
                {result?.map((item) => {
                  return (
                    <div className="item border-b-[1px] border-solid border-white" key={item?.node?.id}>
                      <Link
                        to={`/${item?.node?.handle}`}
                        className="flex items-center py-[16px] px-[30px] gap-[16px]"
                      >
                        <div className="image">
                          <img className="w-[60px] rounded-[8px] h-[60px] object-cover"  src={item?.node?.images.nodes[0].url} />
                        </div>
                        <div className="info">
                          <h3 className="font-poppins font-bold text-white text-[12px]">{item?.node?.title}</h3>
                          <span className="price flex gap-[4px]">
                            <span className="text-sale text-red-600 font-poppins text-[11px] font-semibold">
                              ${item?.node?.variants?.nodes[0].price.amount}
                            </span>
                            <span className="text-sale font-poppins text-[#666] line-through text-[11px] font-semibold">
                              ${item?.node?.variants?.nodes[0].compareAtPrice.amount}
                            </span>
                          </span>
                        </div>
                      </Link>
                    </div>
                  );
                })}
              </div>
              <div className="showall-result">
                <Link
                  to="#"
                  className="flex justify-center items-center py-[10px] bg-[#212529] text-white font-poppins transition-all hover:shadow-[0_0_0_0.2rem_#4e5862] hover:bg-[#101214]"
                >
                  Show all results for "{text}"
                </Link>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}
