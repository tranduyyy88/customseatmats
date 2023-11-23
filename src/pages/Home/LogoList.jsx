import {Swiper, SwiperSlide} from 'swiper/react';
import {Navigation, Autoplay} from 'swiper/modules';
import audi from "../../assets/images/Audi.png";
import buik from "../../assets/images/buik.png";
import chevrolet from "../../assets/images/chevrolet.png";
import dodge from "../../assets/images/dodge.png";
import ford from "../../assets/images/ford.png";
import honda from "../../assets/images/honda.png";
import hundai from "../../assets/images/hundai.png";
import lexus from "../../assets/images/Lexus.png";
export default function LogoList() {
    const images = [
        audi,
        buik,
        chevrolet,
        dodge,
        ford,
        honda,
        hundai,
        lexus
      ];

  return (
    <section className="logoList-section relative mt-[-180px] mobile:mt-[20px]">
      <div display="flex" className="container main-section">
        <div className="main-header w-full">
          <h2 className="logo-list-title gap-[20px] font-sans font-bold uppercase text-white flex justify-center items-center relative after:content-[''] after:bg-[#f9f9f9] after:grow after:h-[1px] before:content-[''] before:bg-[#f9f9f9] before:grow before:h-[1px] mobile:text-black">
            POPULAR MODELS
          </h2>
        </div>
        <div className="main-slider w-full relative mt-[20px]">
          <Swiper
            spaceBetween={8}
            slidesPerView={6}
            navigation={true}
            loop={true}
            autoplay={{
              delay: 2500,
            }}
            modules={[Navigation, Autoplay]}
            breakpoints={{
              0: {
                slidesPerView: 3,
              },
              768: {
                slidesPerView: 5,
              }
            }}
          >
            {images.map((image, i) => {
              return (
                <SwiperSlide key={i} className="bg-transparent">
                  <div className="w-full card flex justify-center items-center p-[10px] bg-[#f6f5f7bd] rounded-[10px]">
                    <img
                      src={image}
                      className="object-contain max-w-[100px] min-h-[68px]"
                    />
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </section>
  )
}
