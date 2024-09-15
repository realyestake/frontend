
import React from "react";
import {
  Navbar,
  Typography,
  Button,
  IconButton,
  Collapse,
} from "@material-tailwind/react";
import Link from "next/link";
import { useRouter } from "next/router";
import AdminUser from "./AdminUser";

export default function AdminNavbar({logout, role}) {

    const router = useRouter()
  // console.log(router.pathname);
  const pathname = router.pathname;
  let path = pathname.split("/")[2];

  // change the color of the link when the page is active
 
  const LinknessHome = (type=null) => {
    if (path === undefined) {
      path = "home";
    }
    let classes = 'flex items-center hover:text-[#C732FF] cursor-pointer';
    if (type === path) {
      classes += " text-[#C732FF] font-bold Outfit";
    } else if (path.includes("requests")) {
      if (type === "request-page") {
        classes += " text-[#C732FF] font-bold Outfit";
      }
      else{
        classes += " text-white Outfit";
      }
    }
     else {
      classes += " text-white Outfit";
    }
    return classes;
  }

  const [openNav, setOpenNav] = React.useState(false);
 
  React.useEffect(() => {
  

    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false),
    );
  }, []);
 
  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
    
    <Typography
        as="li"
        variant="small"
        color="white"
        className="flex items-center gap-x-2 p-1  text-[16px]"
      >
        <Link href="/admin/" className={LinknessHome("home")}>
          Home
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="white"
        className="flex items-center gap-x-2 p-1 text-[16px]"
      >
        <Link href="/admin/add-new-service" className={LinknessHome("add-new-service")}>
          Services
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="white"
        className="flex items-center gap-x-2 p-1 text-[16px]"
      >
        <Link href="/admin/add-a-new-property" className={LinknessHome("add-a-new-property")}>
          Properties
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="white"
        className="flex items-center gap-x-2 p-1 text-[16px]"
      >
        <Link href="/admin/requests" className={LinknessHome("request-page")}>
          Requests
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="white"
        className="flex items-center gap-x-2 p-1 text-[16px]"
      >
        
          <Link href="/admin/manage" className={LinknessHome("admins")}>
            Manage
          </Link>
      </Typography>
    </ul>
  );


  return (
    <Navbar className="fixed top-0 z-50  max-w-full rounded-none  bg-[#160019] border-none py-2">
      <div className="flex items-center justify-between text-white">
        <Typography
          as="a"
          href="#"
            className="mr-4 cursor-pointer font-normal Bauhaus-93 lg:text-[28px] md:text-[24px] text-[20px] text-transparent bg-clip-text bg-gradient-to-r from-[#2934FE] to-[#BF32EC]"
        >
          RealYesTake
        </Typography>
        <div className="hidden lg:block">{navList}</div>
        <div className="flex items-center gap-x-2">
            <AdminUser logout={logout} />
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
            <AdminUser logout={logout} />
          </div>
        </div>
      </Collapse>
    </Navbar>
  )
}

