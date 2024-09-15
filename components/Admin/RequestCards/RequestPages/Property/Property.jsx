import { HeartIcon, MapPinIcon } from "@heroicons/react/24/outline";
import { Avatar, Button, Typography } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import Photos from "./photos";
import Videos from "./videos";
import View from "./View";
import MapView from "./MapView";
import FloorView from "./FloorView";
import SimilarProperties from "@/common/Similar-properties";
import axios from "axios";
import PropertyStats from "@/components/Property/PropertyStats";
import Amenities from "@/components/Property/Amenities";
import { 
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import Author from "@/components/Property/Author";
import SecondaryButton from "@/components/Buttons/SecondaryButton";
import PrimaryButton from "@/components/Buttons/PrimaryButton";
import BACKEND_URL from "@/apiUrl";

export const getStaticPaths = async () => {
  const result = await axios.get('http://localhost:3000/api/properties');
  const paths = result.data.map((property) => {
    return {
      params: { id: property._id.toString() }
    }
  })
  return {
    paths,
    fallback: false
  }
}



export const getStaticProps = async (context) => {
  const id = context.params.id;
  const result = await axios.get(`${BACKEND_URL}/api/properties/view/${id}`);
  return {
    props: {
      property: result.data
    }
  }
}

const PropertySingle = ({property}) => {
  const [open, setOpen] = React.useState(false);
 
  const handleOpen = () => setOpen(!open);

  const [photos, setPhotos] = useState(1);

  const PhotosBtnHandle = () => {
    setPhotos(1);
  };
  const VideosBtnHandle = () => {
    setPhotos(2);
  };
  const WalkthroughBtnHandle = () => {
    setPhotos(3);
  };
  const FloorPlanBtnHandle = () => {
    setPhotos(4);
  };
  const MapViewBtnHandle = () => {
    setPhotos(5);
  };

  const [token,setToken]=useState("");
  console.log(property);

 const handleDeleteBtn =  () => {
  console.log("delete");
    // try {
    //   const res = await axios.delete(`${BACKEND_URL}/api/requests/delete/${property._id}`, {
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer ${token}`,
    //     },
    //   });
    //   console.log(res);
    // } catch (error) {
    //   console.log(error);
    // }
  };



   useEffect(() => {
    if(window!==undefined && document.cookie){
      setToken(document.cookie
        .split(";")
        .find((c) => c.includes("token"))
        .split("=")[1]);
    }
  }, [token]);

  return (
    <div className="container mx-auto px-4">
      {/* gallery */}
      <div className=" mt-[140px] flex flex-col p-200">
        <div className="flex md:flex-row flow-col justify-between items-center">
          <Typography className="Anton font-normal lg:text-[48px] md:text-[28px] text-[24px] leading-[48px]">
            {property.name}
          </Typography>
          <div>
            {" "}
            <Button className="normal-case bg-white text-[#FB3C98] py-[10px] px-4 rounded-[47px] border border-[#FB3C98] lg:text-[18px] text-[12px]  Outfit flex items-center gap-2">
              Add to Favourite{" "}
              <span>
                <HeartIcon className="h-6 w-6" />
              </span>
            </Button>
          </div>
        </div>
        <div className="flex flex-row items-center gap-2 py-2 leading-[15.12px]">
          <MapPinIcon className="h-6 w-6 Outfit font-normal text-[#C732FF]" />
          <Typography
            variant="p"
            className="lg:text-[20px]  text-[12px] Outfit font-normal"
          >
            {" "}
            Location: {property.location}
          </Typography>
        </div>
      </div>

      <div className="mt-5 flex flex-row gap-4">
        <SecondaryButton title="Edit Property" customClassName="py-[12px] px-16  Outfit text-[16px] leading-[20.16px] font-normal hover:bg-gray-300 " />
        <Button onClick ={handleDeleteBtn} className="bg-[#D8242F] capitalize rounded-[47px] text-white py-[12px] px-16  Outfit text-[16px] leading-[20.16px] font-normal">Delete Property</Button>
      </div>

      {/* Gallery */}
      <div className="container mx-auto mt-10 mb-10 ">
        <div className="grid md:grid-cols-1 w-full">
          <div className="">
            {photos === 1 && <Photos img = {property} />}
            {photos === 2 && <Videos />}
            {photos === 3 && <View />}
            {photos === 4 && <FloorView data={property} />}
            {photos === 5 && <MapView />}
          </div>
        </div>
      </div>

      {/* Desktop Buttons */}
      <div className="md:block hidden">
        <div className="container mx-auto grid md:grid-cols-3 items-center text-center Outfit font-normal text-[16px] leading-[20.16px] gap-2 cursor-pointer">
          <div
            className=" border border-gray-800 rounded-[16px] w-full py-3 bg-[#ffffff38]"
            onClick={PhotosBtnHandle}
          >
            Photos
          </div>
          <div
            className="border border-gray-800 rounded-[16px] w-full py-3 bg-[#ffffff38]"
            onClick={VideosBtnHandle}
          >
            Videos
          </div>
          <div
            className="border border-gray-800 rounded-[16px] w-full py-3 bg-[#ffffff38]"
            onClick={WalkthroughBtnHandle}
          >
            3d Walkthrough
          </div>
        </div>
        <div className="container mx-auto grid lg:grid-cols-2  items-center text-center Outfit font-normal text-[16px] leading-[20.16px] gap-2  m-3 cursor-pointer">
          <div
            className="border border-gray-800 w-full rounded-[16px] py-3 bg-[#ffffff38]"
            onClick={FloorPlanBtnHandle}
          >
            Floor Plan
          </div>
          <div
            className="border border-gray-800 w-full rounded-[16px] py-3 bg-[#ffffff38]"
            onClick={MapViewBtnHandle}
          >
            Map View
          </div>
        </div>
      </div>

      {/* Mobile Button */}
      <div className="md:hidden block container mx-auto ">
        <div className="grid grid-cols-2 items-center text-center Outfit font-normal lg:text-[16px] text-[14px] leading-[20.16px] gap-2 cursor-pointer">
          <div
            className=" border border-gray-800 rounded-[16px] w-full py-3 bg-[#ffffff38]"
            onClick={PhotosBtnHandle}
          >
            Photos
          </div>
          <div
            className="border border-gray-800 rounded-[16px] w-full py-3 bg-[#ffffff38]"
            onClick={VideosBtnHandle}
          >
            Videos
          </div>
          <div
            className="border border-gray-800 rounded-[16px] w-full py-3 bg-[#ffffff38]"
            onClick={WalkthroughBtnHandle}
          >
            3d Walkthrough
          </div>
          <div
            className="border border-gray-800 rounded-[16px] w-full py-3 bg-[#ffffff38]"
            onClick={FloorPlanBtnHandle}
          >
            Floor Plan
          </div>
        </div>
        <div className="grid grid-cols-1 items-center text-center Outfit font-normal lg:text-[16px] text-[14px] leading-[20.16px] gap-2 mt-3 cursor-pointer">
          <div
            className="border border-gray-800 rounded-[16px] w-full py-3 bg-[#ffffff38]"
            onClick={MapViewBtnHandle}
          >
            Map View
          </div>
        </div>
      </div>

      <div className="pt-10">
        <div className="pb-4">
          <Typography variant="h4">Overview: </Typography>
        </div>

        <div className="flex flex-row justify-between gap-[70px] border-t border-t-[#ffffff38] p-4 items-center">
          <div className="flex flex-row justify-between gap-16 w-4/12">
          <PropertyStats rooms={3} baths={2} price={property.price} sqSize={property.likesCount}/>
          </div>
          <div className="border-r border-[#ffffff38] h-[100px] "></div>

          <div className="flex flex-row justify-between  gap-16 w-1/2">
            <div className="flex flex-col gap-2 ">
              <div>
                <Typography>Super Built-up Area ( Sq ft ) : 2000</Typography>
              </div>
              <div>
                <Typography>Carpet Area Areas ( Sq ft ) : 1950</Typography>
              </div>
              <div className=""></div>
            </div>
            <div className="flex flex-col gap-2">
              <div>
                <Typography>Facing : East</Typography>
              </div>
              <div>
                <Typography>Floor No : 2</Typography>
              </div>
            </div>
          </div>
          {/* vertical line */}
          
        </div>
      </div>

      <Amenities />

      <div className="pt-16">
        <Typography
          variant="paragraph"
          className="Outfit font-normal md:text-[16px] text-[12px] text-[#ffffffcc] "
        >
          <span className="font-bold text-white">Description: </span> {property.details}
        </Typography>
        <Typography
          variant="paragraph"
          className="Outfit font-normal md:text-[16px] text-[12px] text-[#ffffffcc] pt-6"
        >
          {property.details}
        </Typography>
      </div>

      <div className=" pt-12">
        <div className="flex flex-row lg:justify-start justify-between gap-16 items-center">
          <div className="flex flex-col Outfit font-normal md:text-[24px] text-[14px]">
            <div className=" leading-[30.24px]">Price</div>
            <div className="leading-[60px] ">₹ {property.price}</div>
          </div>
          <div>
          <Button onClick={handleOpen} variant="outlined" className="bg-gradient-to-r from-[#3341D0] to-[#D032EA] m-0 text-white rounded-full">
        Chat with owner
      </Button>
            <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Its a simple dialog.</DialogHeader>
        <DialogBody>
          The key to more success is to have a lot of pillows. Put it this way,
          it took me twenty five years to get these plants, twenty five years of
          blood sweat and tears, and I&apos;m never giving up, I&apos;m just
          getting started. I&apos;m up to something. Fan luv.
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleOpen}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>

          </div>
        </div>
      </div>

      {/* About Owner */}

      {/* <PropertyOwner /> */}
      <Author p={property} />
     

      <SimilarProperties />
    </div>
  );
};

export default PropertySingle;
