import { Button } from "@material-tailwind/react";
import { CardDefault } from "../components/Card/Card";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { useEffect, useState } from "react";
import axios from "axios";
import { GetStaticProps } from "next";
import TrendingPropSlider from "@/components/Sliders/TrendingPropSlider";
import CommericalPropSlider from "@/components/Sliders/CommericalPropSlider";
import ResidentialPropSlider from "@/components/Sliders/ResidentialPropSlider";
import PremiumPropSlider from "@/components/Sliders/PremiumPropSlider";

const BottomSection = () => {
  return (
    <>
      <div className="container mx-auto">
        <PremiumPropSlider />
        <TrendingPropSlider />
        <CommericalPropSlider />
        <ResidentialPropSlider />
      </div>
    </>
  );
};

export default BottomSection;
