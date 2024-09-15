import BACKEND_URL from '@/apiUrl';
import { Avatar, Typography } from '@material-tailwind/react'
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';


  

const Author = ({p}) => {

  // console.log("proper auto", p.owner._id);
  let userId=p.owner && p.owner._id ;
  

  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/customers/profile/${userId}`);
      const result = await response.json();
      setData(result);
      console.log("autoorr", result);
    } 
    catch (error) {
      console.error(error);
    }
  }
  
  useEffect(() => {
    console.log("useEffect");
    getData();
  }
  , []);

  // console.log("data", data.profilePicture)

  return (
    
    <div className="lg:my-6  my-2 shadow-lg shadow-black  md:pt-4 pb-6">
        <Typography
          variant="h1"
          className="Outfit font-bold md:text-[24px] text-[18px] text-[#ffffff] leading-[30.24px] md:pb-4"
        >
          About the Owner
        </Typography>
        <div className="flex flex-col py-0">
          <div className="Outfit font-normal md:text-[20px] text-[16px] leading-[25.2px] py-4">
            <div className="flex items-center gap-4">
              {/* <Link href={`/user-profile/${userId}`}> */}
              <Avatar
                src={data.profilePicture}
                alt="avatar"
                className='w-14 h-14 '
              />
              {/* </Link> */}
              <div>
                <Typography variant="h6">{data.name}</Typography>
                <Typography
                  variant="small"
                  // color="white"
                  className="font-bold Outfit md:text-[14px] text-[12px] leading-[25.2px] text-[#ffffffcc]"
                >
                {data.email}
                </Typography>
              </div>
            </div>
          </div>
          <div className="lg:block hidden">
            <div className="flex flex-row items-center justify-between gap-1   Outfit font-normal md:text-[16px] text-[12px] leading-[25.2px] pt-2">
              <div>Phone No : {data.phoneNo==false ? "Not Visible" : data.phoneNo}</div>
              <div>Company Name : {data.company===undefined ? "Not Specified" : data.company}</div>
              <div>Industry : {data.industry===undefined ? "Not Specified" : data.industry}</div>
              <div>Address : {data.address==false?"Not Visible": data.address}</div>
            </div>
          </div>
          <div className="lg:hidden block">
            <div className="flex flex-row items-center justify-between gap-0  Outfit font-normal md:text-[16px] text-[9px] leading-[25.2px] pt-0">
              <div>Email: {data.email}</div>
              <div>Phone No : {data.phoneNo==false ? "Not Visible" : data.phoneNo}</div>
            </div>
            <div className="flex flex-row items-center justify-between gap-0  Outfit font-normal md:text-[16px] text-[9px] leading-[25.2px] pt-2">
              <div>Company Name : {data.company===undefined ? "Not Specified" : data.company}</div>
              <div>Industry : {data.industry===undefined ? "Not Specified" : data.industry}</div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default Author