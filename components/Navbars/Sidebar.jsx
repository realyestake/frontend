import React from "react";
import {
  IconButton,
  Typography,
  List,
  ListItem,
  Drawer,
  Card,
  Button,
} from "@material-tailwind/react";


import {
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
 
export default function Sidebar() {
  const [open, setOpen] = React.useState(0);
  const [openAlert, setOpenAlert] = React.useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
 
  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };
 
  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  
 
  return (
    <>
      <IconButton  variant="text" size="sm" onClick={openDrawer}>
        {isDrawerOpen ? (
          <XMarkIcon className="h-8 w-8 stroke-2 text-white "  />
        ) : (
          <Bars3Icon className=" h-8 w-8 stroke-2 text-white" />
        )}
      </IconButton>
      <Drawer   open={isDrawerOpen} onClose={closeDrawer} className="bg-[#160019] hover:text-white">
        <Card
          color="transparent"
          shadow={false}
          className="h-[calc(100vh-2rem)] w-full p-4 bg-[#160019]"
        >
          <div className="mb-1 ml-2 flex items-center pb-4">
            {/* <img
              src="https://docs.material-tailwind.com/img/logo-ct-dark.png"
              alt="brand"
              className="h-8 w-8"
            /> */}
            <Link href="/">
            <Typography
          className="cursor-pointer py-0   font-normal text-[28px] leading-[46.73px]  text-transparent bg-clip-text bg-gradient-to-r from-[#2934FE] to-[#BF32EC] Bauhaus-93"
        >
          RealYesTake
        </Typography>
            </Link>
          </div>
          
          <List>
        
            <hr className="mt-0 ml-0 mb-2 border-blue-gray-50" />
           
            <ListItem className="text-white">
              {/* <ListItemPrefix>
                <UserCircleIcon className="h-5 w-5" />
              </ListItemPrefix> */}
              Home
            </ListItem>
            <ListItem className="text-white">
              Properties
            </ListItem>
            <ListItem className="text-white">
              Services
            </ListItem>
            <ListItem className="text-white ">
              Contact Us
            </ListItem>
            <ListItem className="text-white ">
              Book a Demo
            </ListItem>
            {/* <ListItem className="text-white hover:text-black"> */}
            <Button
            variant="text"
            size="sm"
            className="md:hidden inline-block  text-[#C732FF] mt-8 mb-4 border border-[#C732FF] font-medium  rounded-[47px] px-[38px] py-[8px] bg-white"
          >
            <span className="normal-case text-[16px] Satoshi  leading-[18.9px]">Log In</span>
          </Button>
            {/* </ListItem> */}
            {/* <ListItem className="text-white"> */}
            <Button
            variant="text"
            size="sm"
            className="md:hidden inline-block text-white font-medium  rounded-[47px] px-[44px]  py-[10px]    bg-gradient-to-r from-[#2934FE] to-[#BF32EC]"
          >
            <span className="normal-case text-[16px] Satoshi leading-[18.9px]">Register</span>
          </Button>
            {/* </ListItem> */}
          </List>
          
        </Card>
      </Drawer>
      {/* </div> */}
    </>
  );
}