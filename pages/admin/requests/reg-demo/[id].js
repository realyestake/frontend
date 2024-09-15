import DemoRequest from '@/components/Admin/RequestCards/RequestPages/DemoRequest/DemoReq'
import TransferRequest from '@/components/Admin/RequestCards/TransferRequest/TransferReq'
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import axios from "axios";
import BACKEND_URL from '@/apiUrl';

const DemoSingle = () => {
  const [data, setData] = useState(null);
  const router = useRouter();
  const {push} = useRouter();
  const { id, serviceId } = router.query;
  const [token, setToken] = useState("");

  const getData = async (id) => {
    console.log("Token:", token);
    console.log("ID:", id); // Check if id is correct here
    try {
      const response = await axios.get(
        `${BACKEND_URL}/api/requests/demo/${id}?reg=true`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Respoata:", response.data);
      setData(response.data.customer);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  useEffect(() => {
    if(window!==undefined && document.cookie){
      setToken(document.cookie
        .split(";")
        .find((c) => c.includes("token"))
        .split("=")[1]);
    }
    else{
      // setTimeout(() => {
      //   // reload the page
        push("/admin");
      // },1/0);
    }
    if(id){
      getData(id);
    }
  }, [id, token]);

  console.log('data', data);
  return (
    <div className='mt-6'>
        <DemoRequest demoId={id} {...data} />
    </div>
  )
}

export default DemoSingle