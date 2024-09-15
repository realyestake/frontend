import {
  EnvelopeIcon,
  MapPinIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";
import { Typography } from "@material-tailwind/react";
import React from "react";

const ContactUs = () => {
  return (
    <>
      <div className="container mx-auto lg:my-[140px] lg:pt-8 lg:pb-0 pb-10 pt-12 px-4">
        <div className="">
          <div className=" text-center md:pb-14 pb-10 ">
            <Typography className="font-normal lg:text-[48px] text-[28px] leading-[71.04px]  uppercase  text-white font-anton">
              We Would love to hear{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2934FE] to-[#BF32EC]">
                from you
              </span>
            </Typography>
          </div>
          {/* <div className="w-[310px] ml-[84px] lg:mt-[40px] mt-[20px]">
            <Typography
              variant="paragraph"
              className="font-light lg:text-[15px] text-[18p]    text-[#CDCDCD] font-raleway"
            >
              We’re always ready to help. Fill out the form or write an email to
           
              <span className="text-white Outfit">@realyestatemail.com</span>
            </Typography>
            <Typography
              variant="paragraph"
              className="font-light lg:text-[15px] text-[18p]  text-[#CDCDCD] font-raleway"
            >
              Contact Us:
              <span className="text-white Outfit">+91 8943848784 </span>
            </Typography>
          </div> */}
        </div>

        <div className="flex lg:flex-row flex-col gap-8 place-items-start Outfit items-stretch">
          <div className="w-full flex flex-col items-center gap-2 shadow-lg shadow-black p-4 Outfit">
            <EnvelopeIcon className="h-10 w-10" />
            <Typography
              variant="h6"
              className="text-white md:text-[28px] text-[24px] font-bold Outfit"
            >
              Email
            </Typography>
            <Typography
              variant="small"
              className="text-white text-center Outfit"
            >
              Email us for general queries, including marketing and partnership
              opportunities.
            </Typography>
            <Typography
              variant="large"
              className="Outfit md:text-[22px] text-[20px] bg-gradient-to-r from-[#2934FE] to-[#BF32EC] text-transparent bg-clip-text pl-3 font-bold"
            >
              info@realyestake.com
            </Typography>
          </div>
          <div className="w-full flex flex-col items-center gap-2 shadow-lg shadow-black p-4">
            <MapPinIcon className="h-10 w-10" />
            <Typography
              variant="h6"
              className="text-white md:text-[28px] text-[24px] font-bold Outfit"
            >
              Address
            </Typography>
            <Typography
              variant="small"
              className="text-white text-center Outfit"
            >
              REALYESTAKE CONSULTING SERVICES PVT LTD., CORAZONE, PANADAN
              VENTURES,
              <br /> CUSAT POST , KALAMASSERRY 682022
            </Typography>
            {/* <Typography variant="large" className="text-white font-bold">
              @realyestatemail.com
            </Typography> */}
          </div>
          <div className="w-full flex flex-col items-center gap-2 shadow-lg shadow-black p-4">
            <PhoneIcon className="h-10 w-10" />
            <Typography
              variant="h6"
              className="text-white md:text-[28px] text-[24px] font-bold Outfit"
            >
              Call Us
            </Typography>
            <Typography
              variant="small"
              className="text-white text-center Outfit"
            >
              Call us to speak to a member of our team. We are always happy to
              help.
            </Typography>
            <Typography
              variant="large"
              className="Outfit md:text-[22px] text-[20px] bg-gradient-to-r from-[#2934FE] to-[#BF32EC] text-transparent bg-clip-text pl-3 font-bold"
            >
              +91 89438 48784
            </Typography>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
