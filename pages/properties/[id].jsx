import { HeartIcon, MapPinIcon } from "@heroicons/react/24/outline";
import { Avatar, Button, Typography } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import Photos from "./photos";
import Videos from "./videos";
import View from "./View";
import MapView from "./MapView";
import SimilarProperties from "@/common/Similar-properties";
import axios from "axios";
import PropertyStats from "@/components/Property/PropertyStats";
import Amenities from "@/components/Property/Amenities";
import Author from "@/components/Property/Author";
import BACKEND_URL from "@/apiUrl";
import { useRouter } from "next/router";
import PropFloorView from "@/components/Property/propFloorView";
import amenityPhrases from "@/common/AmenityPhrases";

const PropertySingle = () => {
  const [property, setProperty] = useState([]);
  const [liked, setLiked] = useState(property && property.isLiked);
  const [token, setToken] = useState();
  const [photos, setPhotos] = useState(1);
  const router = useRouter();
  const { id } = router.query;

  const getData = async (id) => {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/api/properties/view/${id}`
      );
      setProperty(response.data);
      console.log("daaaaa", response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddFavourite = async () => {
    if (!token) {
      router.push("/login");
      return;
    }

    try {
      const url = liked
        ? `${BACKEND_URL}/api/properties/unfavourite/${property._id}`
        : `${BACKEND_URL}/api/properties/favourite/${property._id}`;
      const res = await axios.put(
        url,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLiked(!liked);
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  const handleOpen = () => setOpen(!open);

  useEffect(() => {
    if (id) {
      getData(id);
    }
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];
    setToken(token || null);
  }, [id]);

  const normalizeText = (text) =>
    text.toLowerCase().replace(/[^a-z0-9\s]/g, "");

  const extractAmenities = (details) => {
    // const amenityPhrases = [
    //   "garden",
    //   "house keeping",
    //   "air conditioner",
    //   "waste treatment plant",
    //   "battery back up",
    //   "elevator",
    //   "wifi",
    //   "swimming pool",
    //   "furnished",
    //   "gym",
    //   "car parking",
    //   "parking space",
    //   "near to metro and airport",
    //   "power backup",
    //   "security",
    //   "pet friendly",
    //   "parking",
    //   "drinking water",
    //   "air conditioning",
    //   "luggage storage",
    //   "near to metro station",
    //   "In-unit Laundry",
    //   "Air conditioning",
    //   "Storage Space or Large Closets",
    //   "Patio or Balcony Space",
    //   "Dishwasher",
    //   "Energy-efficient Appliances",
    //   "High-speed Internet Access",
    //   "Large Windows with Natural Light",
    //   "Views",
    //   "Fireplace",
    //   "Hardwood Floors",

    //   "Laundry Facilities",
    //   "Laundry Services",
    //   "Package Lockers",
    //   "Gated Community",
    //   "Security Guards/Doormen",
    //   "Community Events/Classes",
    //   "Extra Storage Space",

    //   "Secured Garage",
    //   "Assigned Parking Spaces, Carport, Covered Parking Spaces",
    //   "Access to Public Transportation",
    //   "Electric Vehicle Charging Stations",
    //   "Guest Parking",

    //   "Pet-friendly Units",

    //   "Swimming Pool",
    //   "Barbecue Areas",
    //   "Firepits",
    //   "Gym/Fitness Centers",
    //   "Yoga/Cardio Rooms",
    //   "Community Clubhouse",
    //   "Playground",
    //   "Rooftop Lounge Areas",
    //   "Community Garden",
    //   "Media Rooms",
    //   "Church/Mosque/Temple/prayer hall ",
    //   "Common Areas",
    // ];

    const normalizedDetails = normalizeText(details);
    // console.log("okk", normalizedDetails)
    const amenitiesSection = normalizedDetails.split("amentities")[1] || "";
    // console.log("pl",amenitiesSection)

    return amenityPhrases.filter((phrase) =>
      amenitiesSection.includes(normalizeText(phrase))
    );
  };

  const handleScrollToGallery = (photoType) => {
    setPhotos(photoType);
    const gallery = document.getElementById("gallery");
    if (gallery) {
        gallery.scrollIntoView({ behavior: "smooth" });
    }
};


  const amenities = extractAmenities((property && property.details) || "");
  // console.log(amenities);

  return (
    <>
      {property && (
        <div id="gallery" className="container mx-auto px-4">
          <div  className="lg:mt-[140px] mt-[60px] flex flex-col p-200">
            <div className="flex md:flex-row flex-col justify-between">
              <Typography className="Anton font-normal w-[80%]  lg:text-[48px] md:text-[28px] text-[24px] leading-[48px]">
                {property.name}{" "}
                <span className="lg:text-[24px] md:text-[20px] text-[16px] Outfit">
                  {"["} Price:{" "}
                  <span className="font-bold">₹{property.price}</span> {"]"}
                </span>
              </Typography>
              
              <div className="flex flex-col justify-start lg:w-100 w-fit">
                <div
                  // onClick={handleAddFavourite}
                  className="normal-case bg-transparent text-[#FB3C98]  py-[10px] md:px-4 px-2 rounded-[27px] border border-[#FB3C98] lg:text-[16px] text-[12px] Outfit flex items-center gap-2"
                >
                  Favorited by {property.likesCount}
                </div>
                <div></div>
                <div></div>
              </div>
            </div>
            <div  className="flex flex-row items-center gap-2 py-2 leading-[15.12px]">
              <MapPinIcon className="h-6 w-6 Outfit font-normal text-[#C732FF]" />
              <Typography className="lg:text-[20px] text-[12px] Outfit font-normal">
                Location: {property.location}
              </Typography>
            </div>
          </div>

          <div  className="md:mt-8 mt-4 mb-10">
            <div className="w-full">
              {photos === 1 && <Photos data={property.pictures} />}
              {photos === 2 && <Videos data={property.videos} />}
              {photos === 3 && <View threeDView={property.threeDView} />}
              {photos === 4 && <PropFloorView data={property.floorPlan} />}
              {photos === 5 && <MapView address={property.mapView} />}
            </div>
          </div>

          <div className="md:block hidden">
            <div className="container mx-auto grid md:grid-cols-3 items-center text-center Outfit font-normal text-[16px] leading-[20.16px] gap-2 cursor-pointer">
              <div
                className={`border border-black rounded-[16px] w-full py-3 ${
                  photos === 1
                    ? "bg-black border border-gray-800 text-white"
                    : "bg-[#ffffff38]"
                }`}
                onClick={() => handleScrollToGallery(1)}
              >
                Photos
              </div>
              <div
                className={`border border-black rounded-[16px] w-full py-3 ${
                  photos === 2
                    ? "bg-black border-gray-800 text-white"
                    : "bg-[#ffffff38]"
                }`}
                onClick={() => handleScrollToGallery(2)}
              >
                Videos
              </div>
              <div
                className={`border border-black rounded-[16px] w-full py-3 ${
                  photos === 3
                    ? "bg-black border-gray-800 text-white"
                    : "bg-[#ffffff38]"
                }`}
                onClick={() => setPhotos(3)}
              >
                3D Walkthrough
              </div>
            </div>
            <div className="container mx-auto grid lg:grid-cols-2 items-center text-center Outfit font-normal text-[16px] leading-[20.16px] gap-2 m-3 cursor-pointer">
              <div
                className={`border border-gray-800 w-full rounded-[16px] py-3 ${
                  photos === 4
                    ? "bg-black border-gray-800 text-white"
                    : "bg-[#ffffff38]"
                }`}
                onClick={() => setPhotos(4)}
              >
                Floor Plan
              </div>
              <div
                className={`border border-gray-800 w-full rounded-[16px] py-3 ${
                  photos === 5
                    ? "bg-black border-gray-800 text-white"
                    : "bg-[#ffffff38]"
                }`}
                onClick={() => setPhotos(5)}
              >
                Map View
              </div>
            </div>
          </div>

          <div className="md:hidden block container mx-auto">
            <div className="grid grid-cols-2 items-center text-center Outfit font-normal lg:text-[16px] text-[14px] leading-[20.16px] gap-2 cursor-pointer">
              <div
                className="border border-gray-800 rounded-[16px] w-full py-3 bg-[#ffffff38]"
                onClick={() => setPhotos(1)}
              >
                Photos
              </div>
              <div
                className="border border-gray-800 rounded-[16px] w-full py-3 bg-[#ffffff38]"
                onClick={() => setPhotos(2)}
              >
                Videos
              </div>
              <div
                className="border border-gray-800 rounded-[16px] w-full py-3 bg-[#ffffff38]"
                onClick={() => setPhotos(3)}
              >
                3D Walkthrough
              </div>
              <div
                className="border border-gray-800 rounded-[16px] w-full py-3 bg-[#ffffff38]"
                onClick={() => setPhotos(4)}
              >
                Floor Plan
              </div>
            </div>
            <div className="grid grid-cols-1 items-center text-center Outfit font-normal lg:text-[16px] text-[14px] leading-[20.16px] gap-2 mt-3 cursor-pointer">
              <div
                className="border border-gray-800 rounded-[16px] w-full py-3 bg-[#ffffff38]"
                onClick={() => setPhotos(5)}
              >
                Map View
              </div>
            </div>
          </div>

          <PropertyStats data={property} />
          {amenities.length > 0 && <Amenities amenities={amenities} />}

          <div className="pt-8">
            <Typography className="Outfit font-normal md:text-[16px] text-[12px] text-[#ffffffcc]">
              <span className="font-bold text-white md:text-[20px] text-[16px]">
                Full Address:{" "}
              </span>{" "}
              {property.address === undefined
                ? "Not Specified"
                : property.address}
            </Typography>
          </div>

          <div className="pt-8">
            <Typography className="Outfit font-normal md:text-[16px] text-[12px] text-[#ffffffcc]">
              <span className="font-bold text-white md:text-[20px] text-[16px]">
                Description:{" "}
              </span>
            </Typography>
            <Typography className="Outfit font-normal md:text-[16px] text-[12px] text-[#ffffffcc] pt-2">
              {property.details}
            </Typography>
          </div>

          <div className="pt-2">
            <div className="flex flex-row lg:justify-start justify-between gap-16 items-center">
              <div className="flex flex-col Outfit font-normal md:text-[24px] text-[14px]">
                <div className="leading-[30.24px]">
                  Price:{" "}
                  <span className="leading-[60px] font-bold">
                    ₹ {property.price}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {property.owner && <Author p={property} />}
          <div className="mt-12">
            <SimilarProperties id={property._id} />
          </div>
        </div>
      )}
      {!property && (
        <div className="lg:mt-[140px] mt-[80px] text-center">
          No property Details are found
        </div>
      )}
    </>
  );
};

export default PropertySingle;
