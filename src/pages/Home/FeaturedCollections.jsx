import { useEffect, useState } from "react";
import { collectionsAPI } from "../../middlewave/collections/listsAPI";
import ItemCollection from "../../components/ItemCollection";

export default function FeaturedCollections() {
  const [collections, setCollections] = useState([]);
  useEffect(() => {
    async function fetchMyAPI() {
      let response = await collectionsAPI();
      setCollections(response);
    }

    fetchMyAPI();
  }, []);
  return (
    <section className="section--featured-collections mt-[100px] container mobile:mt-[50px]">
      <div className="grid grid-cols-3 gap-[30px] mobile:grid-cols-1 mobile:gap-[15px]">
        {collections.map(function (collection, index) {
          return (
            <ItemCollection key={index} collection={collection} />
          );
        })}
      </div>
    </section>
  );
}
