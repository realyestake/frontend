
import PrimaryButton from "@/components/Buttons/PrimaryButton";
import { Button } from "@material-tailwind/react";
import Link from "next/link";
import React, { useState } from "react";
import axios from "axios";
import Demo from "@/components/Admin/RequestsFilters/Demo";
import Service from "@/components/Admin/RequestsFilters/Service";
import Transfer from "@/components/Admin/RequestsFilters/Transfer";
import Sale from "@/components/Admin/RequestsFilters/Sale";
import Delete from "@/components/Admin/RequestsFilters/Delete";
import Edit from "@/components/Admin/RequestsFilters/Edit";
import BACKEND_URL from "@/apiUrl";
import Enquire from "@/components/Admin/RequestsFilters/Enquire/Enquire";


export default function RequestPage (){
  const [selectedFilter, setSelectedFilter] = useState("demo");
  const [requests, setRequests] = useState([]);

  const handleFilter = (filter) => {
    console.log(filter);
    setSelectedFilter(filter);
  };


  const getData = async (token) => {
    try {
      // console.log('tokehhhhhn', token);
      const user = await axios.get(
        `${BACKEND_URL}/api/requests/demo`,
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result = user.data;
      setRequests(result);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(requests)

  return (
    <>
      <div className="container mx-auto lg:mt-[120px] mt-[60px] mb-8 px-4">
        <div className="lg:text-[32px] tex-[16px] Outfit font-medium leading-[48px]">
          {" "}
          <span>
            <Link href="/admin">&larr;</Link>
          </span>{" "}
          <span className="text-[#ffffff99]">Request</span> / All
        </div>
        {/* Search Request */}
        {/* <div className="relative w-full mt-6 items-center">
          <div className="relative grid h-full w-full  rounded-[41px] bg-[#3A0242]">
            <input
              rows="1"
              placeholder="Search for request"
              className="text-[16px]  h-full  min-h-full w-full resize-y rounded !border-0 border-t-transparent bg-transparent p-4 Outfit leading-[20.16px] font-normal text-white outline outline-0 transition-all placeholder:text-[#FFFFFF] placeholder-shown:border placeholder-shown:border-white placeholder-shown:border-t-[#FFFFFF]-200 focus:border-2 focus:border-gray-900 focus:border-transparent focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
            />
          </div>
          <PrimaryButton title="Search" customClassName="absolute top-[4px] right-[6px] lg:w-[180px] w-[120px] items-center text-[16px] py-[9px]"/>
        </div> */}


        <div className="flex lg:mt-10 mt-8 gap-2  no-scrollbar overflow-y-auto Outfit items-center ">
          <Button
            onClick={() => handleFilter("demo")}
            className={`py-[10px] px-8 items-center Outfit rounded-[47px] text-[16px] leading-[20.16px] ${
              selectedFilter === "demo"
                ? "bg-[#3A0242] text-white"
                : "bg-black text-white"
            }`}
          >
            Demo
          </Button>
          <Button
            onClick={() => handleFilter("service")}
            className={`py-[10px] px-8 items-center Outfit text-[16px] leading-[20.16px] rounded-[47px] ${
              selectedFilter === "service"
                ? "bg-[#3A0242] text-white"
                : "bg-black text-white"
            }`}
          >
            Services
          </Button>
          <Button
            onClick={() => handleFilter("transfer")}
            className={`py-[10px] px-8 items-center rounded-[47px] Outfit text-[16px] leading-[20.16px] ${
              selectedFilter === "transfer"
                ? "bg-[#3A0242] text-white"
                : "bg-black text-white"
            }`}
          >
            Transfer
          </Button>
          <Button
            onClick={() => handleFilter("sale")}
            className={`py-[10px] px-8 items-center rounded-[47px]  Outfit text-[16px] leading-[20.16px] ${
              selectedFilter === "sale"
                ? "bg-[#3A0242] text-white"
                : "bg-black text-white"
            }`}
          >
            Sale
          </Button>
          <Button
            onClick={() => handleFilter("delete")}
            className={`py-[10px] px-8 items-center rounded-[47px] Outfit text-[16px] leading-[20.16px] ${
              selectedFilter === "delete"
                ? "bg-[#3A0242] text-white"
                : "bg-black text-white"
            }`}
          >
            Delete
          </Button>
          {/* edit  */}
          <Button
            onClick={() => handleFilter("edit")}
            className={`py-[10px] px-8 items-center rounded-[47px] Outfit text-[16px] leading-[20.16px] ${
              selectedFilter === "edit"
                ? "bg-[#3A0242] text-white"
                : "bg-black text-white"
            }`}
          >
            Edit
          </Button>
          <Button
            onClick={() => handleFilter("enquire")}
            className={`py-[10px] px-8 items-center rounded-[47px] Outfit text-[16px] leading-[20.16px] ${
              selectedFilter === "enquire"
                ? "bg-[#3A0242] text-white"
                : "bg-black text-white"
            }`}
          >
            Enquire
          </Button>
        </div>

        {/* Request Listings */}

        <div className="mt-8">
        {selectedFilter === "demo" && <Demo/> }
        {selectedFilter === "service" && <Service />}
        {selectedFilter === "transfer" && <Transfer/> }
        {selectedFilter === "sale" && <Sale/> }
        {selectedFilter === "delete" && <Delete/>}
        {selectedFilter === "edit" && <Edit />}
        {selectedFilter==="enquire" && <Enquire/>}
        </div>
      </div>
    </>
  );
};

