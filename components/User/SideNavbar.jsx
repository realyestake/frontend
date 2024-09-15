import React from "react";
import {
  IconButton,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Alert,
  Input,
  Drawer,
  Card,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import {
  ChevronRightIcon,
  ChevronDownIcon,
  CubeTransparentIcon,
  MagnifyingGlassIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/router";
import LogoutUser from "./LogoutUser";
import LoginUser from "./LoginUser";
import Login from "@/pages/login";
import MobileLoginUser from "./MobileLogin";

export function SideNavBar({ logout, user, role }) {
  const [open, setOpen] = React.useState(0);
  const [openAlert, setOpenAlert] = React.useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  const router = useRouter();
  // console.log(router.pathname);
  const pathname = router.pathname;
  let path = pathname.split("/")[1];
  console.log("path", path);

  let demoUrl = "/";
  if (user.value && role === "customer") {
    demoUrl = "/book-a-demo";
  } else {
    demoUrl = "/demo";
  }

  const LinknessHome = (type = null) => {
    if (path === undefined || path === "") {
      path = "home";
    }
    let classes = "flex items-center hover:text-[#C732FF] cursor-pointer";
    if (type === path) {
      classes += " text-[#C732FF] font-bold Outfit";
    } else if (path.includes("requests")) {
      if (type === "request-page") {
        classes += " text-[#C732FF] font-bold Outfit";
      }
    } else {
      classes += " text-white Outfit";
    }
    return classes;
  };

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  return (
    <>
    <div className="fixed top-0 z-50">
    <IconButton
        variant="text"
        size="lg"
        onClick={openDrawer}
        className="text-white "
      >
        {isDrawerOpen ? (
          <XMarkIcon className="h-8 w-8 stroke-2" />
        ) : (
          <Bars3Icon className="h-8 w-8 stroke-2" />
        )}
      </IconButton>
      {/* </div> */}
      <Drawer
        open={isDrawerOpen}
        onClose={closeDrawer}
        className="bg-[#160019] "
      >
        <Card
          color="transparent"
          shadow={false}
          className="h-[calc(100vh-2rem)] w-full p-4"
        >
          <div className="mb-2 flex items-center gap-4 p-2">
            {/* <img
              src="https://docs.material-tailwind.com/img/logo-ct-dark.png"
              alt="brand"
              className="h-8 w-8"
            /> */}
            <Typography
              as="a"
              href="#"
              className="mr-4 cursor-pointer font-normal Bauhaus-93 lg:text-[28px] md:text-[24px] text-[20px] text-transparent bg-clip-text bg-gradient-to-r from-[#2934FE] to-[#BF32EC]"
            >
              RealYesTake
            </Typography>
          </div>

          <List className="hover:bg-transparent active:bg-transparent focus:bg-transparent">
            <hr className="my-1 border-blue-gray-50" />
            <ListItem className="text-white hover:bg-transparent active:bg-transparent focus:bg-transparent">
              <Link 
              href="/" className={LinknessHome("home")}>Home</Link>
            </ListItem>

            <ListItem className="text-white hover:bg-transparent active:bg-transparent focus:bg-transparent">
              <Link href="/properties" className={LinknessHome("properties")}>Properties</Link>
            </ListItem>
            <ListItem className="text-white hover:bg-transparent active:bg-transparent focus:bg-transparent">
              <Link href="/services" className={LinknessHome("services")}>Services</Link>
          
            </ListItem>
            {user.value && role === "customer" && (
              <ListItem className="text-white hover:bg-transparent active:bg-transparent focus:bg-transparent">
                <Link href="/library" className={LinknessHome("library")}>Library</Link>
              </ListItem>
            )}
            {user.value && role === "customer" && (
              
              <ListItem className="text-white hover:bg-transparent active:bg-transparent focus:bg-transparent">
                <Link href="/favourites" className={LinknessHome("favourites")}>Favourites</Link>
              </ListItem>
             
            )}
            <ListItem className="text-white hover:bg-transparent active:bg-transparent focus:bg-transparent">
              <Link href="/contact-us" className={LinknessHome("contact-us")}>Contact Us</Link>
              
            </ListItem>
            <ListItem className="text-white hover:bg-transparent active:bg-transparent focus:bg-transparent">
              <Link
              href={demoUrl}
              className={
                demoUrl === "/demo"
                  ? LinknessHome("demo")
                  : LinknessHome("book-a-demo")
              }
              >Book A Demo</Link>
            </ListItem>
             
            <hr className="my-1 border-gray-900" />
            {user.value && role !== "customer" &&
            (
              <>
              <Link href="/login">
              <ListItem className="text-white hover:bg-transparent active:bg-transparent focus:bg-transparent">
              <ListItemPrefix>
                <PowerIcon className="h-5 w-5" />
              </ListItemPrefix>
              Login
            </ListItem>
            </Link>
            
            <Link href="/signup">
            <ListItem className="text-white hover:bg-transparent active:bg-transparent focus:bg-transparent">
              <ListItemPrefix>
                <PowerIcon className="h-5 w-5" />
              </ListItemPrefix>
              Sign Up
            </ListItem>
            </Link>
            </>
            )}
            {user.value && role === "customer" && 
          (
            <>
             
            <div className="relative bottom-0 ">
              <MobileLoginUser logout={logout} />
            </div>
            </>
          ) }
            {!user.value && (
              <>
              <Link href="/login">
              <ListItem className="text-white hover:bg-transparent active:bg-transparent focus:bg-transparent">
              <ListItemPrefix>
                <PowerIcon className="h-5 w-5" />
              </ListItemPrefix>
              Login
            </ListItem>
            </Link>
            
            <Link href="/signup">
            <ListItem className="text-white hover:bg-transparent active:bg-transparent focus:bg-transparent">
              <ListItemPrefix>
                <PowerIcon className="h-5 w-5" />
              </ListItemPrefix>
              Sign Up
            </ListItem>
            </Link>
            </>
            )}
           
          </List>
        </Card>
      </Drawer>
    </div>
      {/* <div className="flex justify-end"> */}
      
    </>
  );
}
