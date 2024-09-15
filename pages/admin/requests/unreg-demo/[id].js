import UnReqDemo from '@/components/Admin/RequestCards/RequestPages/DemoRequest/UnReqDemo'
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import axios from "axios";
import BACKEND_URL from '@/apiUrl';

const DemoSingle = () => {
  const router = useRouter();
  let { id } = router.query;
  console.log("vanshul", id);
  let token = "";
  const {push} = useRouter();

  const [data, setData] = useState({});


  const getData = async (id) => {
    console.log("called", id)
    try {
      // axios
      const response = await axios.get(
        `${BACKEND_URL}/api/requests/demo/${id}`,
        {
          headers: {
            "Content-Type": "application",
            "Authorization": `Bearer ${token}`
          },
        }
      );
      console.log("raja", response.data);
      setData(response.data);
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
    // console.log("uss")
    if(id){
      getData(id);
    }
  }, [id]);


  return (
    <div className='mt-6'>
        {data && <UnReqDemo {...data} />}
    </div>
  )
}

export default DemoSingle