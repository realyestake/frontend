import { Button } from "@material-tailwind/react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { useEffect, useState } from "react";
import axios from "axios";
import { GetStaticProps } from "next";
import { CardDefault } from "../Card/Card";
import { toast } from "react-toastify";
import ViewAll from "../Buttons/ViewAll";
import BACKEND_URL from "@/apiUrl";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const PremiumPropSlider = () => {
  // Card
  const [cardItems, setCardItems] = useState([]);

  // getCardItems function api call with axios and ahndle error with taostify
  const getCardItems = async () => {
    try {
      const res = await axios.get(
        `${BACKEND_URL}/api/properties/premium-cards?limit=9`
      );
      setCardItems(res.data);
      console.log("preimm", res.data);
    } catch (err) {
      toast.error(err.response);
    }
  };

  const [windowWidth, setWindowWidth] = useState(0);
  useEffect(() => {
    getCardItems();
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    setWindowWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const getNoOfSlides = () => {
    return windowWidth >= 840
      ? 3
      : windowWidth < 840 && windowWidth >= 640
      ? 2
      : 1;
  };

  const PrevArrow = ({ onClick }) => (
    <div
      className="custom-arrow custom-prev rounded-full p-2 bg-white/40 cursor-pointer hover:bg-white/80"
      onClick={onClick}
    >
      <FaChevronLeft className="h-6 w-6 text-white" />
    </div>
  );

  const NextArrow = ({ onClick }) => (
    <div
      className="custom-arrow custom-next rounded-full p-2 bg-white/40 cursor-pointer hover:bg-white/80"
      onClick={onClick}
    >
      <FaChevronRight className="h-6 w-6 text-white" />
    </div>
  );

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: getNoOfSlides(),
    slidesToScroll: getNoOfSlides(),
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };

  return (
    <>
      {cardItems && cardItems.length===0 ? null : (
        <div>
          <div className="flex justify-center items-center pt-10 pb-20">
            <h1 className="text-4xl Anton font-normal text-white">
              PREMIUM{" "}
              <span className="bg-gradient-to-r from-[#4440D2] to-[#C432E5] text-transparent text-4xl bg-clip-text">
                PROPERTIES
              </span>
            </h1>
          </div>
          <Slider {...settings}>
            {cardItems != undefined &&
              cardItems.map((item, index) => (
                <CardDefault
                  key={index}
                  isNew="true"
                  {...item}
                  isLiked="undefined"
                />
              ))}
          </Slider>
          <div className="flex justify-center items-center mt-10">
            <ViewAll link="/properties/premium" title="VIEW All" />
          </div>
        </div>
      )}
    </>
  );
};

export default PremiumPropSlider;
