import PrimaryButton from "@/components/Buttons/PrimaryButton";
import SecondaryButton from "@/components/Buttons/SecondaryButton";
import { FavCard } from "@/components/Card/FavCard";
import { Typography } from "@material-tailwind/react";
import React, { use, useEffect, useState } from "react";
import axios from "axios";
import BACKEND_URL from "@/apiUrl";

export default function Library ({ properties }) {
  const [userProfile, setUserProfile] = useState([]);
  const [library, setLibrary] = useState([]);

  const getLibrary = async () => {
    const token = document.cookie
      .split(";")
      .find((c) => c.includes("token"))
      .split("=")[1];
    const response = await axios.get(
      `${BACKEND_URL}/api/customers/library`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setLibrary(response.data);
    console.log("lii", response.data);
  };

  useEffect(() => {
    getLibrary();
  }, []);

  return (
    <>
      <div className="md:mt-[140px] sm:mt-4 mt-16 container mx-auto px-6">
        <div className="flex flex-row justify-between my-2  items-center">
          <div></div>
          <div className="">
            <Typography
              variant="h1"
              className="text-[#FFFFFF] Anton text-center lg:text-[40px] text-[26px] lg:font-normal md:font-extralight	font-extralight	 md:leading-[60.13px] leading-3"
            >
              LIBRARY
            </Typography>
          </div>
          <div>
          <SecondaryButton
            title="Add"
            customClassName="py-[10px] px-16  Outfit text-[16px] leading-[20.16px] font-normal"
          />
          </div>
        </div>

        {/* Search */}
        <div className="relative w-full mt-6 items-center ">
          <div className="relative grid h-full w-full min-w-[200px] rounded-[41px] bg-[#3A0242]">
            <input
              rows="1"
              placeholder="Search for request"
              className="text-[16px]  h-full  min-h-full w-full resize-y rounded !border-0 border-t-transparent bg-transparent p-4 Outfit leading-[20.16px] font-normal text-white outline outline-0 transition-all placeholder:text-[#FFFFFF] placeholder-shown:border placeholder-shown:border-white placeholder-shown:border-t-[#FFFFFF]-200 focus:border-2 focus:border-gray-900 focus:border-transparent focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
            />
            {/* <label className="before:content[' '] after:content[' ']  pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all before:content-none after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all after:content-none peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"></label> */}
          </div>
          <div className="">
          <PrimaryButton
            title="Search"
            customClassName="lg:w-[200px] w-fit !absolute top-1 right-1 py-[10px] px-8 items-center Outfit text-[16px] leading-[20.16px]"
          />
          </div>
        </div>

        {/* cards */}
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
          {library &&
            library.map((property) => (
              <FavCard
                key={property._id}
                price={property.price}
                content={property.details}
                place={property.location}
                title={property.name}
                picture={property.pictures[0]}
                _id={property._id}
                isLiked={
                  userProfile &&
                  userProfile.favourites &&
                  userProfile.favourites.includes(property._id)
                }
              />
            ))}
          {library.length === 0 && (
            <div className="flex justify-between py-16 italic">
            <div></div>
            <div className="text-[30px]">
                No Library
            </div>
            <div></div>
          </div>
          )}
          {/* if api is not reachable */}
          {library === undefined && (
            <div className="text-center text-[#FFFFFF] text-[30px] my-12">
              Server Error
            </div>
          )}
        </div>
      </div>
    </>
  );
};
