import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import axios from "axios"
import BACKEND_URL from '@/apiUrl';
import EditPropertyRequest from '@/components/Admin/RequestCards/RequestPages/Edit/EditProperty';
import { da } from 'date-fns/locale';
import { Typography } from '@material-tailwind/react';

const EditProperty = () => {

  const router = useRouter();
  const {push} = useRouter();
  const { propertyId, propertyRequestId } = router.query;
  console.log("propertyId:", propertyId, "propertyRequestId:", propertyRequestId)
  const [data, setData] = useState([]);

  const getPropertyData=async(propertyId)=>{
    console.log("p:", propertyId);
    try {
      const response = await axios.get(
        `${BACKEND_URL}/api/properties/view/${propertyId}`,
        {
          headers: {
            "Content-Type": "application/json", 
          },
        }
      );
      console.log("Response:", response.data);
      setData(response.data);
    }
    catch (error) {
      console.log("Error:", error);
    }
  }

  const getRequestedPropertyData=async(propertyRequestId, token)=>{
    console.log("pi:", propertyRequestId);
    try {
      const response = await axios.get(
        `${BACKEND_URL}/api/requests/edit`,
        {
          headers: {
            "Content-Type": "application/json", 
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Response of request edit:", response.data);
      setData(response.data);
    }
    catch (error) {
      console.log("Error:", error);
    }
  }


  useEffect(() => {
    let token = "";
    if (typeof window !== "undefined" && document.cookie) {
      const cookie = document.cookie
        .split(";")
        .find((c) => c.trim().startsWith("token="));
      if (cookie) {
        token = cookie.split("=")[1];
      }
    }
    else{
      // setTimeout(() => {
      //   // reload the page
        push("/admin");
      // },1/0);
    }
    if(propertyId){
      getPropertyData(propertyId);
    }
  
  }
  , [propertyId]);

  return (
    <>
    {/* {data && <EditPropertyRequest {...data} />} */}
    {data && <EditPropertyRequest {...data} />}
    {!data && <Typography className='text-center mt-[140px]'>No property details found.</Typography>}
    </>
  )
}

export default EditProperty