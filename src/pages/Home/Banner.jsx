import { NavLink } from "react-router-dom";
import image from "../../assets/images/img-banner.jpeg";
export default function Banner() {
  const content = {
    image: image,
    title: "Custom built for your vehicle",
    text:
      "Free shipping, 100% quality assurance, Strong durable and made to last",
    button_label: "Shop now",
    button_link: "/products",
  };
  return (
    <section className="section--banner">
      <div className="hero min-h-[calc(100vh_-_132px)] flex items-center justify-center text-center relative">
        <div className="hero--image absolute left-0 right-0 top-0 bottom-0">
          <img className="w-full h-full object-cover" src={content.image}></img>
        </div>
        <div className="hero--text relative z-10 px-[10px]">
            <h2 className="text-white text-[55px] font-bold">{content.title}</h2>
            <div className="rte hero__text text-[19px] text-[#fff] font-sans">
              <p>{content.text}</p>
            </div>
            <div className="hero__cta mt-[30px]">
              <NavLink
                to={content.button_link}
                className="pt-[8px] pb-[8px] pl-[24px] pr-[24px] inline-block bg-[#c39b30] text-white rounded-[8px] font-normal font-sans leading-normal hover:bg-[#a48328] hover:shadow-[0_0_0_0.2rem_#b4b4b4] transition-shadow"
              >
                {content.button_label}
              </NavLink>
            </div>
        </div>
      </div>
    </section>
  );
}
