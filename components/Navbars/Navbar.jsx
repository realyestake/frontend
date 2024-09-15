import React from "react";
import {
  Navbar,
  Typography,
  Button,
  IconButton,
  Collapse,
} from "@material-tailwind/react";

import Link from "next/link";



export default function StickyNavbar() {
  const [openNav, setOpenNav] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-3 md:mb-0 md:mt-0 md:flex-row md:items-center lg:gap-6 text-white">
      <Typography
        as="li"
        variant="small"
        className="flex items-center lg:gap-x-4 gap-x-2 p-1 hover:text-[#C732FF] lg:text-[16px]  text-[12px] font-normal Satoshi  leading-[21.6px]"
      >
        <Link href="/" className="flex items-center ">
          Home
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        className="flex items-center lg:gap-x-4 gap-x-2 p-1 hover:text-[#C732FF] lg:text-[16px]  text-[12px] font-normal Satoshi  leading-[21.6px]"
      >
        <Link href="/properties" className="flex items-center">
          Properties
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        className="flex items-center lg:gap-x-4 gap-x-2 p-1  hover:text-[#C732FF] lg:text-[16px]  text-[12px] font-normal Satoshi  leading-[21.6px]"
      >
        <Link href="/services" className="flex items-center">
          Services
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        className="flex items-center lg:gap-x-4 gap-x-2 p-1    hover:text-[#C732FF] lg:text-[16px]  text-[12px] font-normal Satoshi leading-[21.6px]"
      >
        <Link href="/contact-us" className="flex items-center">
          Contact Us
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        className="flex items-center lg:gap-x-4 gap-x-2 p-1    hover:text-[#C732FF] lg:text-[16px]  text-[12px] font-normal Satoshi leading-[21.6px]"
      >
        <Link href="/Demo" className="flex items-center">
          Book a Demo
        </Link>
      </Typography>
    </ul>
  );

  return (
    <Navbar className="mx-auto px-2 py-1 md:px-[40px] md:py-1  rounded-none bg-[#160019] border-none "> 
      <div className="container mx-auto md:mx-0 flex items-center justify-between text-white">
        <Link href="/">
        <Typography
          as="a"
          href="#"
          className="lg:mr-4 mr-3 cursor-pointer py-1.5 font-normal lg:text-[32px] text-[24px] text-transparent bg-clip-text bg-gradient-to-r from-[#2934FE] to-[#BF32EC] Bauhaus-93"
        >
          RealYesTake
        </Typography>
        </Link>
        <div className="hidden md:block">{navList}</div>
        <div className="flex items-center gap-x-[10px]">
          <Button
            variant="text"
            size="sm"
            className="hidden md:inline-block  text-[#C732FF] border border-[#C732FF] font-normal  rounded-[47px] lg:px-[38px] px-[24px] lg:py-[8px] py-[4px] bg-white"
          >
            <span className="normal-case lg:text-[16px] text-[13px] Satoshi  leading-[18.9px]"><Link href="/login" >Log In</Link></span>
          </Button>
          {/* <SecondaryButton /> */}
          <Button 
            variant="text"
            size="sm"
            className="hidden md:inline-block text-white font-normal  rounded-[47px] lg:px-[44px] px[-33px] lg:py-[10px] py-[5px]  bg-gradient-to-r from-[#2934FE] to-[#BF32EC]"
          >
            <span className="normal-case lg:text-[16px] text-[13px] Satoshi leading-[18.9px]"><Link href="/signup" >Register</Link></span>
          </Button>
          {/* <PrimaryButton title="Register" /> */}
        </div>
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent  leading-[18.9px] font-bold focus:bg-transparent active:bg-transparent md:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        <div className="container mx-auto">
          {/* {navList} */}
          {/* <Sidebar /> */}
          <div className="flex items-center gap-x-1">
            <Button
              fullWidth
              variant="outlined"
              
              className="normal-case text-[14px] border-white  rounded-[53px] font-medium text-white Satoshi px-[25px] py-[10px] hover:text-[#C732FF] hover:border-[#C732FF]"
            >
              <span><Link href="/login" >Log In</Link></span>
            </Button>
            <Button fullWidth variant="text"  className="normal-case text-[14px]  font-medium  Satoshi  rounded-[53px] text-white bg-gradient-to-r from-[#2934FE] to-[#BF32EC] px-[42px] py-[12px]">
              <span><Link href="/signup" >Register</Link></span>
            </Button>
          </div>
        </div>
      </Collapse>
    </Navbar>
  );
}
