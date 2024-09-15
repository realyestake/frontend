import { Typography } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import ServiceCard from "./ServiceCard";


const Services = () => {
  

  return (
    <section className="bg-[#160019]  py-20 pt-6">
      <Typography
        variant="h1"
        className="text-[#FFF] Anton text-center md:text-[40px] text-[32px]  font-normal 	 md:leading-[60.13px] leading-[150.334%]"
      >
        EXPLORE YOUR
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2934FE] to-[#BF32EC]">
          {" "}
          SERVICES
        </span>
      </Typography>

      <div className="container Satoshi  mx-auto  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16 items-center lg:px-6 px-5">
        <ServiceCard
          title="Digital Twinning"
          urlImage="assets/twinning-service.jpg"
        />
        <ServiceCard title="Buy/Rent" urlImage="assets/buy-service.jpg" />
        <ServiceCard title="Services" urlImage="assets/services-service.jpg" />
        <ServiceCard
          title="Investment"
          urlImage="assets/investment-service.jpg"
        />
      </div>
    </section>
  );
};

export default Services;
