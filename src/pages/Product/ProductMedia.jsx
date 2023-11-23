import { useEffect, useState } from "react";
import Slider from "react-slick";
export default function ProductMedia({listMedia}) {
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  const [listImages, setListImages] = useState([]);
  const [slider1, setSlider1] = useState(null);
  const [slider2, setSlider2] = useState(null);
  useEffect(() => {
    setListImages(listMedia)
    setNav1(slider1);
    setNav2(slider2);
  }, [slider1, slider2,listMedia]);
  const settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    lazyLoad: true,
    adaptiveHeight: true,
    asNavFor: ".slider-nav",
    focusOnSelect: true,
  };
  const thumbnailSettings = {
    slidesToShow: 5,
    slidesToScroll: 1,
    asNavFor: ".slider-for",
    swipeToSlide: true,
    focusOnSelect: true,
    responsive: [
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1
        }
      }
    ]
  };
 
  return (
    <>
      <Slider
        {...settings}
        asNavFor={nav2}
        className="featured-image  mb-[10px]"
        ref={(slider) => setSlider1(slider)}
      >
        {listImages?.map((item) => (
          <div
            key={item.id}
            className="relative pb-[100%] rounded-[10px] overflow-hidden"
          >
            <img
              src={item.image.url}
              alt={item.image.alt}
              className="img absolute w-full h-full object-cover"
            />
          </div>
        ))}
      </Slider>
      <Slider
        {...thumbnailSettings}
        className="featured-thumbnail-image"
        asNavFor={nav1}
        ref={(slider) => setSlider2(slider)}
      >
        {listImages?.map((item) => (
          <div
            key={item.id}
            className="relative pb-[100%] rounded-[10px] overflow-hidden cursor-pointer"
          >
            <img
              src={item.image.url}
              alt={item.image.alt}
              className="img absolute w-full h-full object-cover"
            />
          </div>
        ))}
      </Slider>
    </>
  );
}
