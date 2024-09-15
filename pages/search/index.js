// pages/search.js
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { CardDefault } from "@/components/Card/Card";
import BACKEND_URL from "@/apiUrl";
import Searchbar from "../properties/SearchBar/SearchBar";
import Loader from "@/common/Loader";
import { FavCard } from "@/components/Property/Card/FavCard";
import { Typography } from "@material-tailwind/react";

const SearchPage = () => {
  const router = useRouter();
  const { q, lowPrice, highPrice, propType } = router.query;
  console.log("query", q);
  const [loading, setLoading] = useState(false);

  const [results, setResults] = useState([]);

  const getData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${BACKEND_URL}/api/properties/s?q=${q}&lowPrice=${lowPrice}&highPrice=${highPrice}&propertyType=${propType}`
      );
      console.log("mera search res", res.data);

      // Ensure res.data is an array
      if (Array.isArray(res.data)) {
        setResults(res.data);
      } else {
        setResults([]);
      }
    } catch (error) {
      console.log(error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      router.query.q ||
      router.query.lowPrice ||
      router.query.highPrice ||
      router.query.propType
    ) {
      getData();
    }
  }, [router.query]);

  return (
    <div className="lg:mt-[120px] container mx-auto mt-[40px] px-4">
      <Typography
          placeholder={"search"}
          className="text-[#FFFFFF] lg:mx-0 mx-14  Anton text-center md:text-[40px] text-[32px] lg:font-normal md:font-extralight	font-extralight	 md:leading-[60.13px] leading-[48.1px] "
        >
          SEARCH YOUR
          <span className=" text-transparent bg-clip-text bg-gradient-to-r from-[#2934FE] to-[#BF32EC]">
            {" "}
            DIGITAL PROPERTY
          </span>
        </Typography>
      <Searchbar q={q} propType={propType} lowPrice={lowPrice} highPrice={highPrice} />
      <>
        {loading ? (
          <Loader /> // Display loader while fetching
        ) : (
          <>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {results && results.length > 0 ? (
                results.map((property) => (
                  // <Link href={`/properties/${property._id}`} key={property._id}>
                    <FavCard
                      key={property._id}
                      favouriteBy={property.favouritedBy}
                      price={property.price}
                      content={property.details}
                      place={property.location}
                      title={property.name}
                      picture={property.pictures[0]}
                      _id={property._id}
                    />
                  // </Link>
                ))
              ) : (
                <div>No results found</div>
              )}
            </div>
          </>
        )}
      </>
    </div>
  );
};

export default SearchPage;
