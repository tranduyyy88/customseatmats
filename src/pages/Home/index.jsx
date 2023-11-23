import React from "react";
import Banner from "./Banner";
import LogoList from "./LogoList";
import FeaturedCollections from "./FeaturedCollections";
import ListProducts from "./ListProducts";
import Newsletter from "./Newsletter";
export default function Home() {
  return (
    <>
      <Banner />
      <LogoList />
      <FeaturedCollections />
      <ListProducts />
      <Newsletter />
    </>
  );
}
