import { Typography } from "@material-tailwind/react";
import { get } from "http";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import BACKEND_URL from "@/apiUrl";
import Loader from "@/common/Loader";
import LineLoader from "@/common/LineLoader";
import Avatar from "react-avatar";

const RequestCard = ({
  firstName,
  lastName,
  profilePicture,
  title,
  date,
  time,
  name,
}) => {
  // console.log('userProfileId', userProfileId);

  const [profile, setProfile] = useState([]);
  const [loading, setLoading] = useState(false);

  // getuserprofile
  // if(userProfileId){
  // const getUserProfile = async () => {
  //   setLoading(true); // Start loading
  //   try {
  //     const user = await axios.get(
  //       `${BACKEND_URL}/api/customers/profile/${userProfileId}`,
  //       {
  //         headers: {
  //           "Content-type": "application/json"
  //         },
  //       }
  //     );
  //     const result = user.data;
  //     setProfile(result);
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     setLoading(false); // End loading
  //   }
  // };
  // }

  // console.log('profilyyye', profile);

  // useEffect(() => {
  //   // getUserProfile();
  // }, []);

  return (
    <>
      {loading ? (
        <LineLoader /> // Display loader while fetching
      ) : (
        <div className="flex flex-col my-3 bg-[#ffffff38] rounded-[10px] border-2 border-[#ffffff1a]">
          <div className="flex flex-row justify-between p-4 items-center cursor-pointer">
            <div class="flex items-center gap-4 ">
              
              
              {profilePicture && (
                  <img
                    src={
                      profilePicture
                        ? profilePicture
                        : "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                    }
                    alt="avatar"
                    className="inline-block relative object-cover object-center !rounded-full w-12 h-12"
                  />
              )}
              {!profilePicture && (
                <Avatar name={`${firstName} ${lastName}`} size="48" color={Avatar.getRandomColor('sitebase', ['red', 'green'])} round="100px" />
                )}
              <div className="">
                <h6 class="block Outfit md:text-[24px] text-[16px]  md:font-bold  font-medium text-inherit">
                  {firstName} {lastName}
                </h6>
                <p className="md:block hidden text-[16px] Outfit font-meduim leading-normal text-whiet">
                  {name}
                  {title && (
                    <span className="font-normal text-[#ffffff99] outfit">
                      {" "}
                      : {title}
                      {/* <span className="font-bold">to</span>{" "} */}
                    </span>
                  )}
                </p>
              </div>
            </div>
            <div className="">
              <Typography
                variant="paragraph"
                color="white"
                className="Outfit md:text-[16px] text-[10px] leading-[12.6px] md:font-medium font-normal"
              >
                <span className="text-[#ffffff99] pr-2">{date} </span>
                <span className="font-bold ">
                  {"  "} {time}
                </span>
              </Typography>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RequestCard;
