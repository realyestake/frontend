import React, { useEffect, useState } from "react";
import axios from "axios";
import { Typography } from "@material-tailwind/react";
import BACKEND_URL from "@/apiUrl";
import { FavCard } from "@/components/Property/Card/FavCard";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import Loader from "@/common/Loader";
import PrimaryButton from "@/components/Buttons/PrimaryButton";
import Link from "next/link";

export default function Properties() {
  const [token, setToken] = useState("");
  const [userProfile, setUserProfile] = useState([]);
  const [properties, setProperties] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [input, setInput] = useState("");
  const [noOfPages, setNoOfPages] = useState(1);

  useEffect(() => {
    fetchProperties(currentPage);
  }, [currentPage]);

  const getProfile = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/api/customers/user-profile`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUserProfile(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined" && document.cookie) {
      const token = document.cookie
        .split(";")
        .find((c) => c.includes("token"))
        .split("=")[1];
      setToken(token);
    }
  }, []);

  useEffect(() => {
    if (token) {
      getProfile();
    }
  }, [token]);

  const fetchProperties = async (page) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${BACKEND_URL}/api/properties?limit=9&page=${page}`
      );
      setProperties(response.data.properties);
      setNoOfPages(response.data.noOfPages);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const getData = async (value) => {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/api/properties/s?q=${value}`
      );
      setResults(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (value) => {
    setInput(value);
    getData(value);
  };

  const renderPagination = () => {
    const pages = [];
    const totalPageNumbers = 4;

    if (noOfPages <= totalPageNumbers) {
      for (let i = 1; i <= noOfPages; i++) {
        pages.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={`px-4 py-2 ${
              currentPage === i ? " text-white" : " text-gray-700"
            }`}
          >
            {i}
          </button>
        );
      }
    } else {
      const startPage = Math.max(1, currentPage - 1);
      const endPage = Math.min(noOfPages, currentPage + 2);

      if (startPage > 1) {
        pages.push(
          <button
            key={1}
            onClick={() => handlePageChange(1)}
            className={`px-4 py-2 ${
              currentPage === 1 ? " text-white" : " text-gray-700"
            }`}
          >
            1
          </button>
        );
        if (startPage > 2) {
          pages.push(
            <span key="start-ellipsis" className="text-gray-700">
              ...
            </span>
          );
        }
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={`px-4 py-2 ${
              currentPage === i ? " text-white" : " text-gray-700"
            }`}
          >
            {Math.floor(i)}
          </button>
        );
      }

      if (endPage < noOfPages - 1) {
        pages.push(
          <span key="end-ellipsis" className="text-gray-700">
            ...
          </span>
        );
        pages.push(
          <button
            key={noOfPages}
            onClick={() => handlePageChange(noOfPages)}
            className={`px-4 py-2 ${
              currentPage === noOfPages ? " text-white" : " text-gray-700"
            }`}
          >
            {Math.floor(noOfPages)}
          </button>
        );
      }
    }

    return pages;
  };

  const likedByUser = (property) => {
    return (
      property.favouritedBy && property.favouritedBy.includes(userProfile._id)
    );
  };

  return (
    <>
      
        <div className="container mx-auto lg:mt-[120px] lg:mb-16 px-4 mt-[56px]">
          <Typography
            variant="h1"
            className="text-[#FFFFFF] Anton text-center lg:text-[40px] text-[26px] lg:font-normal md:font-extralight font-extralight md:leading-[60.13px] leading-3 py-4"
          >
            PROPERTIES
          </Typography>

          <div className="relative w-full mt-6 items-center">
            <div className="relative grid h-full w-full rounded-[41px] bg-[#3A0242]">
              <input
                rows="1"
                value={input}
                onChange={(e) => handleChange(e.target.value)}
                placeholder="Search for request"
                className="text-[16px] h-full min-h-full w-full resize-y rounded !border-0 border-t-transparent bg-transparent p-4 Outfit leading-[20.16px] font-normal text-white outline outline-0 transition-all placeholder:text-[#FFFFFF] placeholder-shown:border placeholder-shown:border-white placeholder-shown:border-t-[#FFFFFF]-200 focus:border-2 focus:border-gray-900 focus:border-transparent focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
              />
            </div>
            <PrimaryButton
              title="Search"
              customClassName="absolute top-[4px] right-[6px] lg:w-[180px] w-[120px] items-center text-[16px] py-[9px]"
            />
            <Link href="/#search">
              <Typography className="absolute underline right-2 text-gray-700">
                Advance Search
              </Typography>
            </Link>
          </div>

          <div className="mt-10">
            {input.length === 0 ? (
              <>
                {loading ? (
                  <Loader />
                ) : (
                  <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 ">
                    {properties &&
                      properties.map((property) => (
                        <FavCard
                          key={property._id}
                          favouriteBy={property.favouritedBy}
                          userId={userProfile._id}
                          price={property.price}
                          content={property.details}
                          place={property.location}
                          title={property.name}
                          picture={property.pictures[0]}
                          _id={property._id}
                        />
                      ))}
                    {properties.length === 0 && loading &&  (
                      <div className="text-center text-[#FFFFFF] text-lg lg:mt-[60px] mt-[40px]">
                        No properties found
                      </div>
                    )}
                  </div>
                )}

                <div className="flex justify-center mt-10 ">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1 || loading}
                    className="disabled:text-gray-600 disabled:cursor-not-allowed"
                  >
                    <ChevronLeftIcon className="h-6 w-6 font-bold" />
                  </button>
                  {renderPagination()}
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === noOfPages || loading}
                    className="text-white font-bold disabled:text-gray-600 disabled:cursor-not-allowed"
                  >
                    <ChevronRightIcon className="h-6 w-6 font-bold" />
                  </button>
                </div>
              </>
            ) : (
              <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
                {Array.isArray(results) &&
                  results.map((result) => (
                    <FavCard
                      key={result._id}
                      favouriteBy={result.favouritedBy}
                      userId={userProfile._id}
                      price={result.price}
                      content={result.details}
                      place={result.location}
                      title={result.name}
                      picture={result.pictures}
                      _id={result._id}
                    />
                  ))}
                {results.length === 0 && (
                  <div className="text-center text-[#FFFFFF] text-lg mt-[40px]">
                    No properties found
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
   
    </>
  );
}
