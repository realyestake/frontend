
import React from 'react'
import {

  Typography,
 
} from "@material-tailwind/react";
import axios from 'axios';
import ServiceCard from '@/components/Card/ServiceCard';
import BACKEND_URL from '@/apiUrl';

// complete data 
export const getStaticProps = async () => {
  try{
    const result = await axios.get(`${BACKEND_URL}/api/requests/services`);
  return {
    props: {
      service: result.data
    }
  }
  }
  catch(error){
    return {
      props: {
        service: null
      }
    }
  
  }
}


const Services = ({service}) => {

  console.log("serr", service);
  return (
    <>
    <div className="container mx-auto  lg:px-0 px-6 lg:mt-[0px] mt-[40px]">
    <div className="lg:mt-[80px] lg:pt-12 pt-6">
          <Typography
            variant="h1"
            className="text-[#FFFFFF] Anton text-center lg:text-[60px] md:text-[40px] text-[26px] lg:font-normal md:font-extralight	font-extralight	 md:leading-[88.8px] leading-3"
          >
           SERVICES
          </Typography>
      </div>
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
        {service && service.map((item, index) => (
          <ServiceCard key={index} {...item} />
        ))}
        {service && service.length === 0 && (
          <div className="text-center text-[#FFFFFF] text-lg">No services found</div>
        )}
        {service === null && (
          <div className="text-center text-[#FFFFFF] text-lg">Server Error</div>
        )}
      </div>
      </div>
    </>
  )
}

export default Services