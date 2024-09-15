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
 
export function SideNavBar() {
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
      {/* <div className="flex justify-end"> */}
      <IconButton variant="text" size="lg" onClick={openDrawer} className="text-white">
        {isDrawerOpen ? (
          <XMarkIcon className="h-8 w-8 stroke-2" />
        ) : (
          <Bars3Icon className="h-8 w-8 stroke-2" />
        )}
      </IconButton>
      {/* </div> */}
      <Drawer open={isDrawerOpen} onClose={closeDrawer} className="bg-[#160019]">
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
          
          <List>
            <hr className="my-1 border-blue-gray-50" />
            <ListItem className="text-white">
              Home
              <ListItemSuffix>
                {/* <Chip
                  value="14"
                  size="sm"
                  variant="ghost"
                  color="blue-gray"
                  className="rounded-full"
                /> */}
              </ListItemSuffix>
            </ListItem>
            <ListItem className="text-white">
            <Link href="/user/services/" >Services</Link>
              <ListItemSuffix>
                {/* <Chip
                  value="14"
                  size="sm"
                  variant="ghost"
                  color="blue-gray"
                  className="rounded-full"
                /> */}
              </ListItemSuffix>
            </ListItem>
            <ListItem className="text-white">
            <Link href="/user/services/" >Services</Link>
              <ListItemSuffix>
                {/* <Chip
                  value="14"
                  size="sm"
                  variant="ghost"
                  color="blue-gray"
                  className="rounded-full"
                /> */}
              </ListItemSuffix>
            </ListItem>
            <ListItem className="text-white">
            <Link href="/user/services/" >Services</Link>
              <ListItemSuffix>
                {/* <Chip
                  value="14"
                  size="sm"
                  variant="ghost"
                  color="blue-gray"
                  className="rounded-full"
                /> */}
              </ListItemSuffix>
            </ListItem>
            <ListItem className="text-white">
              <ListItemPrefix>
                <PowerIcon className="h-5 w-5" />
              </ListItemPrefix >
              Log Out
            </ListItem>
          </List>
          
        </Card>
      </Drawer>
    </>
  );
}