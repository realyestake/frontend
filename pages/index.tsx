"use client";

import HomePage from "./HomePage";
import Hero from "@/components/HomePage/Hero/Hero";
import Searchbar from "@/components/HomePage/SearchBar/Searchbar";
import Services from "@/components/HomePage/Services/Services";
import { Typography } from "@material-tailwind/react";
import { ToastContainer } from "react-toastify";

export default function Home() {
  return (
    <div>
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Hero />
      <Services />
      <div className="bg-[#0D0D0D] pb-12 pt-16" id="search">
        <Typography
          placeholder={"search"}
          className="text-[#FFFFFF] lg:mx-0 mx-14  Anton text-center md:text-[40px] text-[32px] lg:font-normal md:font-extralight	font-extralight	 md:leading-[60.13px] leading-[48.1px] "
        >
          SEARCH YOUR
          <span className=" text-transparent bg-clip-text bg-gradient-to-r from-[#2934FE] to-[#BF32EC]">
            {" "}
            DIGITAL PROPERTY
          </span>
        </Typography>
        <div className="mx-[24px] lg:mt-12 mt-8">
          {" "}
          <Searchbar />
        </div>
      </div>
      <HomePage />
    </div>
  );
}
