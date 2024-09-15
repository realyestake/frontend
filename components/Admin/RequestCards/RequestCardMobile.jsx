import { Typography } from '@material-tailwind/react';
import React, { useEffect, useState } from 'react'
import axios from "axios";
import BACKEND_URL from '@/apiUrl';
import LineLoader from '@/common/LineLoader';
import Avatar from 'react-avatar';

const RequestCardMobile = ({firstName, lastName, profilePicture,title, name, date, time}) => {

  // console.log(userProfileId)


  // const [profile, setProfile] = useState([]);
  const [loading, setLoading] = useState(false)
  // // getuserprofile
  // if(userProfileId){
  //   const getUserProfile = async () => {
  //     setLoading(true); // Start loading
  //     try {
  //       const user = await axios.get(
  //         `${BACKEND_URL}/api/customers/profile/${userProfileId}`,
  //         {
  //           headers: {
  //             "Content-type": "application/json"
  //           },
  //         }
  //       );
  //       const result = user.data;
  //       setProfile(result);
  //     } catch (error) {
  //       console.log(error);
  //     } finally {
  //       setLoading(false); // End loading
  //     }
  //   };
  // }


    return (
      <>
      {loading ? (
        <LineLoader /> // Display loader while fetching
      ) : (
      <div className="flex flex-col my-3 bg-[#ffffff38] rounded-[10px] border-2 border-[#ffffff1a]">
        <div className="flex flex-row justify-start p-4 items-start cursor-pointer gap-2">
          <div className="flex items-center gap-4 ">
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
          </div>
          <div className="flex flex-col gap-[5px] w-full ">
            <div className="flex flex-row justify-between w-full">
              <div>
                <h6 className="block Outfit md:text-[24px] text-[16px] antialiased md:font-bold  font-normal text-inherit">
                  {firstName}{" "} {lastName}
                </h6>
                <p className="md:block hidden text-[16px] Outfit font-bold leading-normal text-whiet">
                <span>{name}</span> 
                  <span className="font-normal text-[#ffffff99] outfit">
                    {" "}
                    property{" "}
                    <span className="font-bold"></span>{" "}
                  </span>
                </p>
              </div>
              <div className="Outfit md:text-[14px] text-[10px] md:font-medium font-normal leading-[12.6px]">
                <Typography variant="paragraph" color="white" className='text-[10px] md:text-[14px] Outfit'>
                  {date} {" "} {time}
                </Typography>
              </div>
            </div>
            <p className=" text-[10px] Outfit font-[300] leading-normal text-whiet">
            <span>{name}</span>
              {title && (
                <span className="font-normal text-[#ffffff99] outfit">
                {" "}: {title} <span className="font-bold"></span>{" "}
              </span>
              )}
            </p>
            <div></div>
          </div>
        </div>
      </div>
      )}
      </>
    );
  };

export default RequestCardMobile