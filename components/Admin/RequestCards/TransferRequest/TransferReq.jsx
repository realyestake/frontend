import BACKEND_URL from "@/apiUrl";
import { HeaderNavigation } from "@/components/HeaderNavigation";
import { PropertyCard } from "@/components/TransferCard/PropertyCard";
import { UserCard } from "@/components/TransferCard/UserCard";
import { XMarkIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import SearchResults from "./SearchResults";
import Link from "next/link";
import { Typography } from "@material-tailwind/react";
import Loader from "@/common/Loader";
import { ToastContainer } from "react-toastify";

const inter = Inter({ subsets: ["latin"] });

export default function TransferRequest({ transferData }) {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [token, setToken] = useState("");
  const [profile, setProfile] = useState([]);

  const getData = async (value) => {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/api/customers/s?q=${value}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("new", response.data);
      setResults(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (value) => {
    setSearch(value);
    getData(value);
  };

  useEffect(() => {
    if (typeof window !== "undefined" && document.cookie) {
      setToken(
        document.cookie
          .split(";")
          .find((c) => c.includes("token"))
          .split("=")[1]
      );
    }
  }, [token]);

  const clearInput = () => {
    console.log("clearing input");
    setSearch("");
    setResults([]);
  };
  const [userCard, setUserCard] = useState(false);
  const [otherInfo, setOtherInfo] = useState([]);

  const handleSelectUser = (user) => () => {
    console.log("newwww", user.user);
    setProfile(user.user);
    setOtherInfo(user.subCredentials);
    setResults([]);
    setSearch("");
    setUserCard(true);
  };

  return (
    <>
    <ToastContainer />
      {transferData.propertyId ? (
        <main
          className={`min-h-screen items-center justify-between bg-[#160019] py-16  px-10 ${inter.className}`}
        >
          <div className="flex flex-col text-start w-full h-full rounded-2xl">
            <Link href="/admin/requests">
              <div className="flex items-center gap-2 py-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="white"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                  />
                </svg>

                <Typography className="text-white  lg:text-[32px] text-[24px] font-normal Outfit">
                  New Transfer Request from{" "}
                  {transferData?.currentOwner?.refUserId.firstName}{" "}
                  {transferData?.currentOwner?.refUserId.lastName} for property:{" "}
                  {transferData?.propertyId?.name}
                </Typography>
              </div>
            </Link>
          </div>

          <div className="flex md:justify-end justify-start items-center px-4 rounded-full mt-4">
            <div className="relative">
              <input
                type="text"
                value={search}
                placeholder="Search..."
                onChange={(e) => handleChange(e.target.value)}
                className="pl-10 pr-4 py-2 text-white rounded-full bg-transparent border border-gray-300 focus:outline-none focus:border-white w-full"
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <FaSearch className="text-gray-500" />
              </div>
              {search && (
                <div
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                  onClick={clearInput}
                >
                  <XMarkIcon className="h-6 w-6 text-white" />
                </div>
              )}
              {results.length > 0 && (
                <div className="absolute left-0 right-0 mt-2 bg-black rounded-md shadow-lg z-20">
                  <div className=" mt-1 shadow-1 bg-black  resuts-lists overflow-y-auto mb-4">
                    {results.map((result, index) => {
                      return (
                        <div
                          key={index}
                          className="py-2 px-2   hover:bg-[#3A0242]   hover:text-white cursor-pointer Satoshi font-normal md:text-[16px] text-[12px] "
                        >
                          <h1 onClick={handleSelectUser(result)}>
                            {result.user.firstName} {result.user.lastName}
                            <br />
                            <span className="md:text-[12px] text-[10px]">
                              {"["} {result.user.email} {"]"}{" "}
                            </span>
                          </h1>

                          <p>{result.location}</p>
                          {/* <p>Rs. {result.price}</p> */}
                        </div>
                      );
                    })}
                    {results.length === 0 && (
                      <div className="py-2 px-2   hover:bg-[#3A0242]   hover:text-white cursor-pointer Satoshi font-normal md:text-[16px] text-[12px] ">
                        <h1>No Results Found</h1>
                      </div>
                    )}
                  </div>
                </div>
              )}
              {search && results.length === 0 && (
                <div className="absolute left-0 right-0 mt-2 bg-black rounded-md shadow-lg z-20 py-2 px-2 hover:bg-[#3A0242] hover:text-white cursor-pointer Satoshi font-normal md:text-[16px] text-[12px]">
                  <h1>No Results Found</h1>
                </div>
              )}
            </div>
          </div>

          <div className="flex  flex-col  lg:flex-row  xl:flex-row 2xl:flex-row lg:items-start items-center justify-center w-full h-full  rounded-2xl lg:mt-8 md:mt-4 mt-3 ">
            <div className="w-full hidden md:block lg:block xl:block 2xl:block">
              {transferData.currentOwner &&
                transferData.currentOwner.refUserId && (
                  <UserCard
                    {...transferData.currentOwner.refUserId}
                    custType={transferData.currentOwner.custType}
                    bio={transferData.currentOwner.bio}
                  />
                )}
            </div>
            <PropertyCard
              firstName={transferData.currentOwner.refUserId.firstName}
              lastName={transferData.currentOwner.refUserId.lastName}
              {...transferData.propertyId}
              transferId={transferData._id}
              newOwnerId = {otherInfo._id}
              newOwnerFirstName={profile.firstName}
              newOwnerLastName={profile.lastName}
            />
            <div className="w-full hidden md:block lg:block xl:block 2xl:block">
              {userCard && (
                <UserCard
                  {...profile}
                  bio={otherInfo.bio}
                  custType={otherInfo.custType}
                />
              )}
            </div>

            <div className=" flex flex-col">
              <div className="w-full block md:hidden lg:hidden xl:hidden 2xl:hidden">
                {transferData.currentOwner &&
                  transferData.currentOwner.refUserId && (
                    <UserCard {...transferData.currentOwner.refUserId} />
                  )}
              </div>
              <div className="lg:hidden xl:hidden 2xl:hidden md:hidden block mb-0 my-5 items-center ">
                <div className="flex flex-row justify-between my-2">
                <div></div>
                <div className="rounded-full bg-white/20 p-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="white"
                    className="w-10 h-10"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5M16.5 3L21 7.5m0 0L16.5 12M21 7.5H7.5"
                    />
                  </svg>
                </div>
                <div></div>
                </div>
              </div>
              <div className="w-full block md:hidden lg:hidden xl:hidden 2xl:hidden">
                {userCard && (
                  <UserCard
                    {...profile}
                    bio={otherInfo.bio}
                    custType={otherInfo.custType}
                  />
                )}
              </div>
            </div>

          </div>
        </main>
      ) : (
        <div className="flex flex-col items-center justify-center h-screen">
          <Typography variant="heading" color="white">
            No Data Found; Maybe Property is Null
          </Typography>
          <br />
          <Typography variant="paragraph" color="gray">
            <Link href="/admin/requests">Go Back</Link>
          </Typography>
        </div>
      )}
    </>
  );
}
