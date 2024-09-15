import React from "react";
import { HeaderNavigation } from "@/components/HeaderNavigation";
import { Inter } from "next/font/google";
import { Typography } from "@material-tailwind/react";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

const UnReqDemo = ({
  firstName,
  lastName,
  email,
  phoneNo,
  companyName,
  industry,
  date,
}) => {
  const dateInFormat = new Date(date).toLocaleDateString();
  const timeInFormat = new Date(date).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
    timeZone: "Asia/Kolkata",
  });


  return (
    <main
      className={`mt-4 container mx-auto min-h-screen items-center justify-between bg-[#160019] py-20 px-10 ${inter.className}`}
    >
      <div className="flex flex-col text-start w-full h-full rounded-2xl">
        {/* <HeaderNavigation
          title={"New Demo Request from John Doe"}
          showBackButton={true}
        /> */}
        <div className="flex items-center gap-2 py-2">
          <Link
            href="/admin/requests"
            className="border border-black p-2 rounded-full hover:border-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="white"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
              />
            </svg>
          </Link>

          <Typography className="text-white  lg:text-[32px] text-[24px]  font-normal Outfit">
            New demo request from{" "}
            <span className="capitalize">
              {firstName} {lastName}
            </span>
          </Typography>
        </div>
      </div>
      <div className=" items-center flex flex-row justify-between mt-12">
        <div></div>
        <div className="border border-gray-800 rounded-[8px]  bg-[#ffffff38] lg:px-14 px-10 py-10  w-full max-w-[500px] flex lg:flex-wrap lg:flex-row flex-col lg:gap-12 gap-8">
          <div className="flex flex-col gap-2 ">
            <Typography className="text-white text-[16px] font-light Outfit leading-[20.16px]">
              First Name:
            </Typography>
            <Typography className="text-white font-bold text-[16px]  Outfit leading-[20.16px]">
              {firstName}
            </Typography>
          </div>
          <div className="flex flex-col gap-1 ">
            <Typography className="text-white text-[16px] font-light Outfit leading-[20.16px]">
              Last Name:
            </Typography>
            <Typography className="text-white text-[16px] font-bold Outfit leading-[20.16px]">
              {lastName}
            </Typography>
          </div>
          {companyName && (
            <div className="flex flex-col gap-1 ">
            <Typography className="text-white text-[16px] font-light Outfit">
              Business Type:
            </Typography>
            <Typography className="text-white text-[16px] font-bold Outfit">
              {companyName}
            </Typography>
          </div>
          )}
          <div className="flex flex-col gap-1 ">
            <Typography className="text-white text-[16px] font-light Outfit leading-[20.16px]">
              Phone No:
            </Typography>
            <Typography className="text-white text-[16px] font-bold Outfit leading-[20.16px]">
              {phoneNo}
            </Typography>
          </div>
          <div className="flex flex-col gap-1 ">
            <Typography className="text-white text-[16px] font-light Outfit leading-[20.16px]">
              Email Address:
            </Typography>
            <Typography className="text-white text-[16px] font-bold Outfit leading-[20.16px]">
              {email}
            </Typography>
          </div>

          {industry && (
            <div className="flex flex-col gap-1 ">
            <Typography className="text-white text-[16px] font-light Outfit">
              Industry:
            </Typography>
            <Typography className="text-white text-[16px] font-bold Outfit">
              {industry}
            </Typography>
          </div>
          )}
          <div className="flex flex-col gap-1 ">
            <Typography className="text-white text-[16px] font-light Outfit">
              Date:
            </Typography>
            <Typography className="text-white text-[16px] font-bold Outfit">
              {dateInFormat}
            </Typography>
          </div>
          <div className="flex flex-col gap-1 ">
            <Typography className="text-white text-[16px] font-light Outfit">
              Time:
            </Typography>
            <Typography className="text-white text-[16px] font-bold Outfit">
              {timeInFormat}
            </Typography>
          </div>
        </div>
        <div></div>
      </div>
    </main>
  );
};

export default UnReqDemo;
