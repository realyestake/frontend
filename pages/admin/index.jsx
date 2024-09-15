import { Inter } from "next/font/google";
import SecondaryButton from "@/components/Buttons/SecondaryButton";
import { UserCard } from "@/components/Card/UserCard";
import PrimaryButton from "@/components/Buttons/PrimaryButton";
import ToggleButton from "@/components/Buttons/ToggleButton";
import { useEffect, useState } from "react";
const inter = Inter({ subsets: ["latin"] });
import axios from "axios";
import Properties from "@/components/Admin/Properties";
import { Typography } from "@material-tailwind/react";
import { Button } from "react-day-picker";
import BACKEND_URL from "@/apiUrl";
import { FavCard } from "@/components/Card/FavCard";
import { AdminUserCard } from "@/components/Admin/UserCard";
import LineLoader from "@/common/LineLoader";
import { CardDefault } from "@/components/Admin/Dashboard/SearchPropCard";
import Loader from "@/common/Loader";

export default function Home() {
  const [users, setUsers] = useState([]);

  const [UserResults, setUserResults] = useState([]);
  const [PropertyResults, setPropertyResults] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    let token = "";
    if (window !== undefined && document.cookie) {
      token =
        document.cookie &&
        document.cookie
          .split(";")
          .find((c) => c.includes("token"))
          .split("=")[1];
    }
    setLoading(true);
    try {
      console.log("pruiiii");
      const response = await axios.get(`${BACKEND_URL}/api/customers`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(`"user": ${response.data}`);
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const [token, setToken] = useState("");
  const getSearchData = async (searchValue) => {
    console.log("token", token);
    // setLoading(true);
    try {
      console.log("value", searchValue);
      setSearchValue(searchValue);
      console.log("selectedTab", selectedTab);
      if (selectedTab === "Users") {
        console.log("ene");
        const response = await axios.get(
          `${BACKEND_URL}/api/properties/s?q=${searchValue}`
          // type word in search bar and see the result
        );
        console.log("responseProperties", response.data);
        setPropertyResults(response.data);
      } else {
        const response = await axios.get(
          `${BACKEND_URL}/api/customers/s?q=${searchValue}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("response okkkkkkkkkkkkkk   users", response.data);
        setUserResults(response.data);
      }
    } catch (error) {
      console.log(error);
    } 
  };
  let role = "";

  useEffect(() => {
    console.log("useEffect");
    if (window !== undefined && document.cookie) {
      setToken(
        document.cookie
          .split(";")
          .find((c) => c.includes("token"))
          .split("=")[1]
      );
      role = document.cookie
        .split(";")
        .find((c) => c.includes("role"))
        .split("=")[1];
    }
    console.log("token", token);
    console.log("role", role);

    getData();
  }, []);

  const [checked, setChecked] = useState(true);
  const [selectedTab, setSelectedTab] = useState("Properties");

  const onChange = (e) => {
    setChecked(e.target.checked);
    setSearchValue("");
    setSelectedTab(e.target.checked ? "Properties" : "Users");
  };

  return (
    <>
      {loading ? (
        <div className="mt-14">
        <Loader/></div>
      ) : (
        <>
          {users.length > 0 ? (
            <main
              className={`container mx-auto flex  mt-[10px]  flex-col bg-[#160019] lg:py-24  py-20 px-4 ${inter.className}`}
            >
              {/* Search bar */}
              <div className="relative w-full mt-6 items-center">
                <div className="relative grid h-full w-full  rounded-[41px] bg-[#3A0242]">
                  <input
                    rows="1"
                    value={searchValue} ///////// NEW CHANGE
                    onChange={(e) => getSearchData(e.target.value)}
                    placeholder="Search for request"
                    className="text-[16px]  h-full  min-h-full w-full resize-y rounded !border-0 border-t-transparent bg-transparent p-4 Outfit leading-[20.16px] font-normal text-white outline outline-0 transition-all placeholder:text-[#FFFFFF] placeholder-shown:border placeholder-shown:border-white placeholder-shown:border-t-[#FFFFFF]-200 focus:border-2 focus:border-gray-900 focus:border-transparent focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
                  />
                  {/* <label className="before:content[' '] after:content[' ']  pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all before:content-none after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all after:content-none peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"></label> */}
                </div>
                <PrimaryButton
                  title="Search"
                  customClassName="absolute top-[4px] right-[6px] lg:w-[180px] w-[120px] items-center text-[16px] py-[9px]"
                />
              </div>

              <div className="justify-between flex flex-row items-end mt-4">
                <ToggleButton
                  title1="Users"
                  title2="Properties"
                  checked={checked}
                  onChange={onChange}
                />
              </div>

              <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 mt-6">
                {selectedTab === "Properties" && (
                  <>
                    {searchValue.length > 0 && (
                      <>
                        {UserResults &&
                          UserResults.map((user, index) => (
                            <>
                              {/* <FavCard key={index} price={property.price} content={property.details} place={property.location} title={property.name} picture={property.pictures[0]} _id={property._id} 
            /> */}
                              <AdminUserCard key={index} {...user} />
                            </>
                          ))}
                        {UserResults.length === 0 && (
                          <div className="text-center text-[#FFFFFF] text-lg">
                            No users found
                          </div>
                        )}
                      </>
                    )}
                    {searchValue.length === 0 && (
                      <>
                        {users.map((user, index) => (
                          <UserCard key={index} {...user} />
                        ))}
                      </>
                    )}
                  </>
                )}
              </div>
              {selectedTab === "Users" && (
                <>
                  {searchValue.length > 0 && (
                    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 mt-6">
                      {PropertyResults &&
                        PropertyResults.map((result, index) => (
                          <CardDefault key={index} {...result} />
                        ))}
                    </div>
                  )}
                  {searchValue.length === 0 && (
                    <>
                      <Properties />
                    </>
                  )}
                </>
              )}
            </main>
          ) : null}
        </>
      )}
    </>
  );
}
