
import React, { useEffect, useState } from "react";
import { GetStaticProps } from "next";
import axios from "axios";
import { Typography } from "@material-tailwind/react";
import BACKEND_URL from "@/apiUrl";
import { FavCard } from "@/components/Property/Card/FavCard";


export const getStaticProps = async () => {
  const result = await axios.get(`${BACKEND_URL}/api/properties/premium`);


  return {
    props: {
      properties: result.data,
    },
  };
};


export default function Premium({ properties }) {
  console.log("preeee", properties);


  const [userProfile, setUserProfile] = useState([]);
  const [token, setToken] = useState("");


  useEffect(() => {
    let token = "";
    if (typeof window !== "undefined" && document.cookie) {
      setToken(
        document.cookie
          .split(";")
          .find((c) => c.includes("token"))
          .split("=")[1]
      );
    }

    getData(token);

  }, [token]);

  const getData = async () => {
    try {
      console.log("tokehhhhhn", token);

      const user = await axios.get(
        `${BACKEND_URL}/api/customers/user-profile`,
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result = user.data;
      console.log(result);
      setUserProfile(result);
    } catch (error) {

      console.log(error);
    }
  };


  return (
    <div className="container mx-auto lg:mt-[140px] lg:mb-16">

      <Typography
        variant="h1"
        className="text-[#FFFFFF] Anton text-center lg:text-[40px] text-[26px] lg:font-normal md:font-extralight	font-extralight	 md:leading-[60.13px] leading-3 py-4"
      >
        PREMIUM PROPERTIES
      </Typography>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">

        {properties &&
          properties.map((property) => {
            const propertyId = property.propertyId;
            if (!propertyId) {
              return (
                // <div key={property._id} className="text-center text-[#FFFFFF] text-lg">
                //   Invalid property data
                // </div>
                null
              );
            }
            return (
              <FavCard
                key={propertyId._id}
                favouriteBy={propertyId.favouritedBy}
                userId={userProfile?.propertyId?._id}
                price={propertyId.price}
                content={propertyId.details}
                place={propertyId.location}
                title={propertyId.name}
                picture={propertyId.pictures[0]}
                _id={propertyId._id}
              />
            );
          })}


        {properties.length === 0 && (
          <div className="text-center text-[#FFFFFF] text-lg">
            No properties found
          </div>
        )}
        {/* if api is not reachable */}
        {properties === undefined && (
          <div className="text-center text-[#FFFFFF] text-lg">Server Error</div>
        )}
      </div>
    </div>
  );
}
