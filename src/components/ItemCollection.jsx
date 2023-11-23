import { Link } from "react-router-dom";
import PropTypes from "prop-types";
ItemCollection.propTypes = {
  collection: PropTypes.object,
};
export default function ItemCollection({ collection }) {
  return (
    <div className="grid-item rounded-[5px] overflow-hidden relative group">
      <Link to="/collections">
        <div className="group-hover:before:opacity-[0.5] before:z-10 box-image relative before:absolute before:content-[''] before:top-0 before:bottom-0 before:left-0 before:right-0 before:w-full before:h-full before:bg-white before:opacity-0">
          <img
            src={collection.node.image.src}
            className="aspect-[4/3] object-cover transition-all group-hover:scale-[1.25]"
          ></img>
        </div>
        <div className="box-content z-[20] p-[20px] absolute left-0 right-0 top-[50%] translate-y-[-50%] text-center">
          <h3 className="text-white font-poppins mb-[15px] text-[27px]">
            {collection.node.title}
          </h3>
          <button className="pt-[8px] pb-[8px] pl-[24px] pr-[24px] inline-block bg-[#c39b30] text-white rounded-[8px] font-normal font-sans leading-normal hover:bg-[#a48328] hover:shadow-[0_0_0_0.2rem_#b4b4b4] transition-shadow">
            shop now
          </button>
        </div>
      </Link>
    </div>
  );
}
