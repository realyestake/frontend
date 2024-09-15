import { Button, Typography } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import PrimaryButton from "../../Buttons/PrimaryButton";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {

  const [role, setRole] = useState(null);
  useEffect(()=>{
    if(document.cookie && document.cookie.includes('token')){
      const token = document.cookie.split(';').find(c=>c.includes('token')).split('=')[1];
      // if role is in cookie then set role
      if(document.cookie.includes('role')){
        setRole(document.cookie.split(';').find(c=>c.includes('role')).split('=')[1]);
        console.log("_app",role);
      }
    }
  })

  let demoUrl = "/";
  if ( role === "customer") {
    demoUrl = "/book-a-demo";
  } else {
    demoUrl = "/demo";
  }


  return (
    <section className="bg-[#160019]  lg:mt-[0] mt-[60px] text-white flex lg:flex-row flex-col lg:gap-6 gap-0 items-center lg:justify-between overflow-hidden ">
      <div className="mx-14 md:mx-24 lg:ml-[80px]">
        <Typography
          variant="h1"
          className="lg:text-[60px] md:text-[44px] text-[30px]  lg:w-[495px] w-full Anton font-normal uppercase lg:leading-[88.8px] md:leading-[66.8px] leading-[148%]"
        >
          Capture Your World
          <br />{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2934FE] to-[#BF32EC]">
            in 3d Vision
          </span>
        </Typography>
        <Typography
          variant="small"
          className="lg:w-[524px] md:mt-[20px] mt-[16px] w-full md:text-[16px] text-[14px] font-normal lg:leading-[21.13px] Satoshi pb-[16px]  text-[#CDCDCD]"
        >
          Forget endless photo shoots and frustrating virtual tours. We&apos;re
          revolutionizing property presentation with lightning-fast 3D capture
          technology. Book a free demo and witness the magic!
        </Typography>
        <div>
       <div className="w-6/12">
       <Link href={`${demoUrl}`}>
       <PrimaryButton
          title="Book a demo"
          customClassName="lg:text-[16px] lg:py-4 lg:px-6 lg:mt-2"
        /></Link>
       </div>
        </div>
      </div>
      <div className="mx-auto  lg:mr-[-158px] md:mt-[-24px] mt-[0px] ">
        <Image
          alt="Hero Image"
          src="/assets/heroImg.png"
          className="md:h-[700px] h-[100%]"
          width={1000}
          height={500}
        />
      </div>
    </section>
  );
};

export default Hero;
