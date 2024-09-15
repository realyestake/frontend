import SaleRequest from '@/components/Admin/RequestCards/RequestPages/Sale/Sale'
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import BACKEND_URL from '@/apiUrl';

const SaleSingle = () => {

  const [data, setData] = useState(null);
  const router = useRouter();
   const {push} = useRouter();
  const { id} = router.query; 
  const [token, setToken] = useState("");

  const getData = async (id) => {
    
    console.log("ID:", id); // Check if id is correct here
    try {
      const response = await axios.get(
        `${BACKEND_URL}/api/requests/sale/${id}`,
        {
          headers: {
            "Content-Type": "application/json", 
            Authorization: `Bearer ${token}`
          },
        }
      );
      console.log("Respoata:", response.data);
      setData(response.data);
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

  console.log("Data:", data);


  return (
    <div className='mt-6'>
        {data && <SaleRequest saleId={id} {...data} />}
    </div>
  )
}

export default SaleSingle