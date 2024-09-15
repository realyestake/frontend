import PrimaryButton from "@/components/Buttons/PrimaryButton";
import React, { use, useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@material-tailwind/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import Link from "next/link";
import BACKEND_URL from "@/apiUrl";


const BookDemo =  () => { 
  const { push } = useRouter();
  const [book, setBook] = useState("Book a Demo");

  const [token, setToken] = useState("");
  useEffect(() => {
    if (typeof window !== "undefined") {
      setToken(document.cookie.split(';').find(c=>c.includes('token')).split('=')[1]);
      // console.log(token);
    }
  }, []);


  const handleSubmit = async (e) => {
    if(book === "Demo Booked"){
      alert("Demo Request Already Sent!");
      return;
    }
    // console all data
    e.preventDefault();
    
  try{
    const response = await axios.post(
      `${BACKEND_URL}/api/requests/demo`,
     {
  
     },
      {
          headers: {
              "Content-type": "application/json",
              "Authorization": `Bearer ${token}`,
          },
      }
  );
      console.log(response.status);
      if(response.status === 200) {
        toast.success("Demo Request Sent Successfully!", {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setBook("Demo Booked");
      }
      else if(response.status === 400)
      {
        const  res= response.data;
        toast.error(`${res}`, {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
      else
      {
        toast.error("Login Failed!", {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
  }
  catch{
    console.log("error");
        toast.error(`Demo Request Already Sent!`, {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
  }
    
  };

  return (
    <>
    <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="container mx-auto lg:mt-[150px] mb-12 px-4 mt-[56px]">
        <div className="lg:text-[32px] tex-[16px] Outfit leading-[48px] font-medium">
          {" "}
          <span className="pointer-cursor hover:text-gray-700"><Link href="/">&larr;</Link></span> <span className="text-[#ffffff99]  font-medium"></span>Request a demo
          from REALYESTAKE
        </div>

        <div className="lg:mt-14 mt-6 flex flex-row justify-center">
          <div></div>
          <div className="border  border-gray-800 bg-[#ffffff38] lg:text-[16px] text-[14px] font-normal Outfit leading-[20.16px] lg:p-10 p-6 lg:w-1/2 w-9/12 pb-[100px] rounded-[8px]">
            <span className="font-bold">Details:</span> Personalized demo of our advanced level of real estate services for you to experience and feel our commitment to serving you. From the buying , selling and marketing of residential and commercial property to ready-to-market packages and expert advice, every aspect will be customized just for your success. Book your demo now.
          </div>
          <div></div>
        </div>
        <div className="mt-8 flex flex-row justify-center">
          <div></div>
          <Button onClick={handleSubmit} className="normal-case text-[#FFFFFF] rounded-[47px]   bg-gradient-to-r from-[#2934FE] to-[#BF32EC] px-14 lg:text-[16px] text-[14px]">{book}</Button>
          <div></div>
        </div>
      </div>
    </>
  );
};

export default BookDemo;
