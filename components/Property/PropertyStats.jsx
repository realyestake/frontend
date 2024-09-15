import { Typography } from "@material-tailwind/react";
import React from "react";
import { MdRoom } from "react-icons/md";
import {
  TbBath,
  TbBed,
  TbCar,
  TbDirection,
  TbFaceMask,
  TbRuler,
} from "react-icons/tb";

const PropertyStats = ({ data }) => {
  // console.log("dataa", data.facing);
  const facing = data?.facing ?? "Not specified";
  const area = data?.area ?? "Not specified";
  const carParking = data?.carParking ?? "Not specified";
  const bathrooms = data?.bathrooms ?? "Not specified";
  const bhk = data?.bhk ?? "Not specified";
  // console.log("bhk", bhk);
  return (
    <>
    
      <div className="mt-10 border-t pt-2 border-gray-900  grid md:grid-cols-4 grid-cols-3 gap-2">
      <div>
        <Typography variant="h6" color="white">
          Bhk
        </Typography>
        <div className="flex justify-start gap-3 items-center">
          
          <Typography variant="paragraph" color="white">
            {bhk}
          </Typography>
          <TbBed size={20} className="color-[#fffff99]" />
        </div>
      </div>
      <div>
        <Typography variant="h6" color="white">
          Bathrooms
        </Typography>
        <div className="flex justify-start gap-3 items-center">
          
          <Typography variant="paragraph" color="white">
            {bathrooms}
          </Typography>
          <TbBed size={20} className="color-[#fffff99]" />
        </div>
      </div>
      <div>
        <Typography variant="h6" color="white">
          Car Parking{" "}
         
        </Typography>
        <div className="flex justify-start gap-3 items-center">
        {/* <TbCar size={20} className="color-[#fffff99]" /> */}

          <Typography variant="paragraph" color="white" className="capitalize">
            {carParking}
          </Typography>
          <TbCar size={20} className="color-[#fffff99]" />

        </div>
      </div>
      <div>
        <Typography variant="h6" color="white">
          Facing
        </Typography>
        <div className="flex justify-start gap-3">
          <Typography variant="paragraph" color="white">
            {facing}
          </Typography>
        </div>
      </div>
      <div>
        <Typography variant="h6" color="white">
          Area
        </Typography>
        <div className="flex justify-start gap-3">
          <Typography variant="paragraph" color="white">
            {area}
            <sup>m2</sup>
          </Typography>
          {/* <TbRuler size={20} className="color-[#fffff99]" /> */}
        </div>
      </div>
    </div>
    
      {/* <div className=" flex md:flex-row flex-col justify-start   md:gap-[80px] gap-2"> */}
        {/* <div>
          <div className="md:py-2 px-4">
            <Typography variant="h6" color="white">
              BEDS
            </Typography>
            <div className="flex justify-start gap-3">
              <TbBed size={20} className="color-[#fffff99]" />
              <Typography variant="paragraph" color="white">
                {data.bhk}
              </Typography>
            </div>
          </div>
          <div className=" md:py-2 px-4">
            <Typography variant="h6" color="white">
              BATHS
            </Typography>
            <div className="flex justify-start gap-3">
              <TbBath size={20} className="color-[#fffff99]" />
              <Typography variant="paragraph" color="white">
                {data.baths}
              </Typography>
            </div>
          </div>
        </div> */}
        {/* <div> */}
          {/* <div className="md:py-2 px-4"> */}
          {/* <Typography variant="h6" color="white">
              SIZE
            </Typography> */}
          {/* <div className="flex justify-start gap-3">
              <TbRuler size={20} className="color-[#fffff99]" />
              <Typography variant="paragraph" color="white">
                {data.area}
                <sup>m2</sup>
              </Typography>
            </div> */}
          {/* </div> */}
          {/* <div className="md:py-2 px-4">
      <Typography variant="h6" color="white">Baloncies</Typography>
      <div className="flex justify-start gap-3">
        <TbCar size={20} className="font-normal" />
        <Typography variant="paragraph" color="white">2</Typography>
      </div>
      </div> */}
          {/* <div className="md:py-2 px-4">
            <Typography variant="h6" color="white">
              CAR PARKING
            </Typography>
            <div className="flex justify-start gap-3">
              <TbCar size={20} className="font-normal" />
              <Typography variant="paragraph" color="white">
                2
              </Typography>
            </div>
          </div>
        // </div> */}
      {/* </div> */}
      {/* <hr className="mt-10 mb-4 text-gray-700"/> */}

      
    </>
  );
};

export default PropertyStats;
