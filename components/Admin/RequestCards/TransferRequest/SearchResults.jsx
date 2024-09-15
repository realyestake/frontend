import Link from "next/link";
import React from "react";

const SearchResults = ({ results }) => {
  console.log("mydata", results);
  return (
    <div className=" mt-1 shadow-1 bg-black  resuts-lists overflow-y-auto mb-4">
      {results.map((result, index) => {
        return (
          <div key={index} className="py-2 px-2   hover:bg-[#3A0242]   hover:text-white cursor-pointer Satoshi font-normal md:text-[16px] text-[12px] ">
              <h1>{result.user.firstName} {" "} {result.user.lastName} {"["} {result.user.email} {"]"} </h1>

              <p>{result.location}</p>
              {/* <p>Rs. {result.price}</p> */}
          </div>
        );
      })}
      {
        results.length === 0 && <div className="py-2 px-2   hover:bg-[#3A0242]   hover:text-white cursor-pointer Satoshi font-normal md:text-[16px] text-[12px] ">
          <h1>No Results Found</h1>
        </div>
      }
    </div>
  );
};

export default SearchResults;
