import { Typography } from "@material-tailwind/react";
import React from "react";

const Amenities = ({ amenities}) => {
  return (
    <>
      <div className=" mt-10">
          <Typography  color="white" className="text-[24px] font-bold border-b border-gray-900">
          Amenities:
        </Typography>
        {/* <hr className="border border-opacity-50" /> */}
        {/* list down all amenities size by side like gym, swimming pool, furnished etc */}
        <div className="flex flex-row gap-[50px] mt-5 md:text-[16px] text-[12px]">
          <div className="flex flex-col gap-2 ">
            {/* <li className="text-white">Gym</li>
            <li className="text-white">Swimming Pool</li>
            <li className="text-white">Furnished</li>
            <li className="text-white">Security Staff</li>
            <li className="text-white">Conditioned</li>
            <li className="text-white">Elevator</li>
            <li className="text-white">Parking</li> */}
            {amenities.map((amenity, index) => (
          <li key={index} className="Outfit capitalize font-normal md:text-[16px] text-[12px]">
            {amenity}
          </li>
        ))}

            {/* security staff, conditioned */}
          </div>
          {/* <div className="flex flex-col gap-2">
            <li className="text-white">Furnished</li>
            <li className="text-white">Security Staff</li>
            <li className="text-white">Conditioned</li>
            <li className="text-white">Elevator</li>
            <li className="text-white">Parking</li>
            <li className="text-white">Gym</li> */}

            {/* security staff, conditioned */}
          {/* </div> */}
         
        </div>
      </div>
    </>
  );
};

export default Amenities;
