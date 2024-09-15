import React from "react";
import { Option, Select } from "@material-tailwind/react";


const SearchbarDropdown = (props) => {
  
  return (
    <Select   label={props.title} color="purple" className="bg-[#3A0242] p-[22px] text-[#FFFFFF]  px-4 rounded-[8px]  border-none "
    labelProps={{
      className: "text-[#FFFFFF] Satoshi font-normal text-[14px]",
    }}
    menuProps={{
      className: " bg-[#3A0242] border-none Satoshi font-normal text-[14px]"
    }} >
      <Option className="rounded-none  text-white " >{props.o1}</Option>
      <Option className="bg-[#3A0242] rounded-none hover:bg-[#3A0242] text-white">{props.o2}</Option>
      <Option className=" bg-[#3A0242] rounded-none hover:bg-[#3A0242] text-white ">{props.o1}</Option>
      <Option className="rounded-none hover:bg-[#3A0242] text-white ">{props.o1}</Option>
    </Select>
    
  );
};

export default SearchbarDropdown;