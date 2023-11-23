import * as React from "react";
import { useEffect, useState } from "react";
import { ProductsAPI } from "../../middlewave/products/listsAPI";
import ItemProduct from "../../components/ItemProduct";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import ReactPaginate from "react-paginate";

export default function Collections() {
  const [products, setProducts] = useState([]);

  // sort
  const [sort, setSort] = useState("manual");
  const [totalPages, setTotalPages] = useState(0);

  // paginate
  const itemsPerPage = 4;
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  const currentProducts = products.slice(itemOffset, endOffset);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % products.length;
    setItemOffset(newOffset);
  };

  useEffect(() => {
    async function fetchMyAPI() {
      let response = await ProductsAPI();
      setProducts(response);
      setTotalPages(Math.ceil(products.length / itemsPerPage));
    }
    fetchMyAPI();
  }, [products.length]);

  const handleChange = (event) => {
    setSort(event.target.value);
    const value = event.target.value;
    switch (value) {
      case "manual":
        async function fetchMyAPI() {
          let response = await ProductsAPI();
          setProducts(response);
        }
        fetchMyAPI();
        break;
      case "title-ascending":
        products.sort((a, b) => {
          const first = a.node.title.toUpperCase(); // ignore upper and lowercase
          const next = b.node.title.toUpperCase(); // ignore upper and lowercase
          if (first < next) {
            return -1;
          }
          if (first > next) {
            return 1;
          }

          // names must be equal
          return 0;
        });
        break;
      case "title-descending":
        products.sort((a, b) => {
          const first = a.node.title.toUpperCase();
          const next = b.node.title.toUpperCase();
          if (first > next) {
            return -1;
          }
          if (first < next) {
            return 1;
          }

          // names must be equal
          return 0;
        });
        break;
      case "price-ascending":
        products.sort((a, b) => {
          const first = a.node.variants.nodes[0].price.amount;
          const next = b.node.variants.nodes[0].price.amount;
          return first - next;
        });
        break;
      case "price-descending":
        products.sort((a, b) => {
          const first = a.node.variants.nodes[0].price.amount;
          const next = b.node.variants.nodes[0].price.amount;
          return next - first;
        });
        break;
      default:
    }
  };

  return (
    <section className="section--collections py-[50px]">
      <div className="container">
        <h1 className="text-center text-[50px] font-poppins font-bold">
          Products
        </h1>
        <div className="box-product">
          <div className="collection-controls flex justify-end mt-[30px]">
            <div className="w-72">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Sort by</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={sort}
                  label="Sort by"
                  onChange={handleChange}
                >
                  <MenuItem value="manual">Featured</MenuItem>
                  <MenuItem value="title-ascending">
                    Alphabetically, A-Z
                  </MenuItem>
                  <MenuItem value="title-descending">
                    Alphabetically, Z-A
                  </MenuItem>
                  <MenuItem value="price-ascending">
                    Price, low to high
                  </MenuItem>
                  <MenuItem value="price-descending">
                    Price, high to low
                  </MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
          <ul className="list-product grid grid-cols-4 gap-[30px] mt-[20px] mobile:grid-cols-2 mobile:gap-[15px]">
            {currentProducts.map((products, index) => {
              return (
                <li key={index}>
                  <ItemProduct product={products.node} />
                </li>
              );
            })}
          </ul>
          <ReactPaginate
            breakLabel="..."
            nextLabel=">"
            className="pagination"
            nextClassName="button next"
            previousClassName = "button previous"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={totalPages}
            previousLabel="<"
            renderOnZeroPageCount={null}
          />
        </div>
      </div>
    </section>
  );
}
