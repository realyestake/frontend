import { Collapse, IconButton, Navbar, Typography } from "@material-tailwind/react";
import { Button } from "react-day-picker";
import PrimaryButton from "../Buttons/PrimaryButton";

export default function Demo() {
  return (
    <Navbar className="w-full rounded-none px-4 py-1 lg:px-8 lg:py-4 bg-[#160019] border-none">
      <div className="container mx-auto flex items-center justify-between text-white">
        <Typography
          as="a"
          href="#"
          className="mr-4 cursor-pointer font-normal Bauhaus-93 lg:text-[28px] md:text-[24px] text-[20px] text-transparent bg-clip-text bg-gradient-to-r from-[#2934FE] to-[#BF32EC]"
        >
          RealYesTake
        </Typography>
        <div className="hidden lg:block">{navList}</div>
        <div className="flex items-center gap-x-2">
          <Button variant="text" size="sm" className="hidden lg:inline-block text-white normal-case px-6 Outfit hover:border rounded-[47px]">
            <span>Log In</span>
          </Button>
          <Button
            variant="gradient"
            size="sm"
            className="hidden lg:inline-block normal-case text-[#FFFFFF] rounded-[47px]  bg-gradient-to-r from-[#2934FE] to-[#BF32EC] px-12 Outfit"
          >
            <span>Sign in</span>
          </Button>
        </div>
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
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
          {navList}
          <div className="flex items-start gap-y-2 flex-col w-full">
            <Button variant="text" className="w-full text-white Outfit normal-case hover:border hover:rounded-[47px]">Log In</Button>
            <PrimaryButton title="Sign Up" customClassName="w-full  Outfit" />
          </div>
        </div>
      </Collapse>
    </Navbar>
  )
}