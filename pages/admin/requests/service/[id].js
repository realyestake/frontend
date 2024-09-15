import BACKEND_URL from '@/apiUrl'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import axios from "axios"
import ServiceRequest from '@/components/Admin/RequestCards/RequestPages/Service/Service'
import { get } from 'http'

const ServiceSingle = () => {

  const router = useRouter();
  const {push } = useRouter();  
  let { id } = router.query;
  // console.log("vanshul", id);
  let token = "";
  // get serviceName from router.query
  let { serviceName } = router.query;
  // console.log("vanshul", serviceName);

  const [user, setUser] = useState([]);
  const [customer, setCutomer] = useState([]);

  const getData = async (id) => {
    console.log("called", id)
    try {
      // axios
      const response = await axios.get(
        `${BACKEND_URL}/api/customers/view/${id}`,
        {
          headers: {
            "Content-Type": "application",
            "Authorization": `Bearer ${token}`
          },
        }
      );
      console.log("raja", response.data);
      setUser(response.data.user);
      setCutomer(response.data.customer[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const getService = async (id) => {
    console.log("called", id)
    try {
      // axios
      const response = await axios.get(
        `${BACKEND_URL}/api/requests/service/${id}`,
        {
          headers: {
            "Content-Type": "application",
            "Authorization": `Bearer ${token}`
          },
        }
      );
      console.log("raja", response.data);
      setUser(response.data.user);
      setCutomer(response.data.customer[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (window !== undefined && document.cookie) {
      token = document.cookie
        .split(";")
        .find((c) => c.includes("token"))
        .split("=")[1];
    }
    else{
      // setTimeout(() => {
      //   // reload the page
        push("/admin");
      // },1/0);
    }
    if(id){
      getData(id);
      getService(id);
    }
  }, [id]);

  return (
    <div className='mt-6'>
        <ServiceRequest serviceId={id} {...user} custType={customer.custType} serviceName={serviceName} bio={customer.bio}/>
    </div>
  )
}

export default ServiceSingle