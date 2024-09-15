import Link from "next/link";
import React from "react";

const SearchResults = ({ results }) => {
  console.log(results);
  return (
    <div className="px-2 mt-2 shadow-1 bg-[#3A0242] rounded-md resuts-lists overflow-y-auto">
      {results.map((result, index) => {
        return (
          <div key={index} className="py-2 px-2 hover:bg-gray-400  hover:text-black cursor-pointer Satoshi font-normal md:text-[16px] text-[12px] ">
            <Link href={`/properties/${result._id}`}>
              <h1>{result.name}</h1>

              <p>{result.location}</p>
              {/* <p>Rs. {result.price}</p> */}
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default SearchResults;
