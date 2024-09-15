import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Typography } from '@material-tailwind/react';
import BACKEND_URL from '@/apiUrl';
import Loader from '@/common/Loader';
import { FavCard } from './Dashboard/PropertyCard';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

const PAGE_SIZE = 10;

export default function Properties() {
  const [loading, setLoading] = useState(false);
  const [properties, setProperties] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const getData = async (page = 1) => {
    setLoading(true);
    try {
      const response = await axios.get(`${BACKEND_URL}/api/properties?page=${page}`);
      setProperties(response.data.properties);
      setTotalPages(Math.ceil(response.data.count / PAGE_SIZE)); // Calculate total pages
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData(currentPage);
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const renderPagination = () => {
    const pages = [];
    const totalPageNumbers = 4;

    if (totalPages <= totalPageNumbers) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={`px-4 py-2 ${currentPage === i ? " text-white" : " text-gray-700"}`}
          >
            {i}
          </button>
        );
      }
    } else {
      const startPage = Math.max(1, currentPage - 1);
      const endPage = Math.min(totalPages, currentPage + 2);

      if (startPage > 1) {
        pages.push(
          <button
            key={1}
            onClick={() => handlePageChange(1)}
            className={`px-4 py-2 ${currentPage === 1 ? " text-white" : " text-gray-700"}`}
          >
            1
          </button>
        );
        if (startPage > 2) {
          pages.push(<span key="start-ellipsis">...</span>);
        }
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={`px-4 py-2 ${currentPage === i ? " text-white" : " text-gray-700"}`}
          >
            {i}
          </button>
        );
      }

      if (endPage < totalPages - 1) {
        pages.push(<span key="end-ellipsis">...</span>);
        pages.push(
          <button
            key={totalPages}
            onClick={() => handlePageChange(totalPages)}
            className={`px-4 py-2 ${currentPage === totalPages ? " text-white" : " text-gray-700"}`}
          >
            {totalPages}
          </button>
        );
      }
    }

    return pages;
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="container mx-auto px-4 mt-4">
          <Typography
            variant="h1"
            className="text-[#FFFFFF] Anton text-center lg:text-[40px] text-[26px] lg:font-normal md:font-extralight font-extralight md:leading-[60.13px] leading-3 py-4"
          >
            PROPERTIES
          </Typography>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
            {properties && properties.map((property) => (
              <FavCard
                key={property._id}
                price={property.price}
                content={property.details}
                place={property.location}
                title={property.name}
                picture={property.pictures[0]}
                _id={property._id}
              />
            ))}
            {properties && properties.length === 0 && (
              <div className="text-center text-[#FFFFFF] text-lg">No properties found</div>
            )}
            {properties === undefined && (
              <div className="text-center text-[#FFFFFF] text-lg">Server Error</div>
            )}
          </div>
          <div className="flex justify-center mt-4">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="disabled:text-gray-600 disabled:cursor-not-allowed"
            >
              <ChevronLeftIcon className="h-6 w-6 font-bold" />
            </button>
            {renderPagination()}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="text-white font-bold disabled:text-gray-600 disabled:cursor-not-allowed"
            >
              <ChevronRightIcon className="h-6 w-6 font-bold" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
