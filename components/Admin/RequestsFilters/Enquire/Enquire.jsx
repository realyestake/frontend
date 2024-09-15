import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import BACKEND_URL from "@/apiUrl";
import Loader from "@/common/Loader";
import RequestCard from "./ReqCard";
import RequestCardMobile from "./MobReqCard";

const Enquire = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let token = "";
    if (typeof window !== "undefined") {
      token = document.cookie
        .split(";")
        .find((c) => c.includes("token"))
        .split("=")[1];
    }
    // getData(token);
    getDemoData(token);
  }, []);

  // const getData = async (token) => {
  //   try {
  //     const user = await axios.get(
  //       "http://localhost:3000/api/requests/demo",
  //       {
  //         headers: {
  //           "Content-type": "application/json",
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );
  //     const result = user.data;
  //     setRequests(result);
  //     console.log("demo", result);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const getDemoData = async (token) => {
    setLoading(true); // Start loading
    try {
      const user = await axios.get(`${BACKEND_URL}/api/requests/enquire`, {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const result = user.data;
      setRequests(result.requests);
      console.log("enquire", result);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // End loading
    }
  };

  console.log("enquire", requests);

  return (
    <>
      {loading ? (
        <Loader /> // Display loader while fetching
      ) : (
        <div className="my-11">
          <div className="lg:block hidden">
            {requests &&
              requests.length > 0 &&
              requests
              .slice()
                .reverse().map((data, index) => (
                // <Link key={index} href={`/admin/requests/enquire/${data._id}`} className="disable">
                  <RequestCard
                    key={index}
                    profilePicture={data.userId.refUserId.profilePicture}
                    firstName={data.userId.refUserId.firstName}
                    lastName={data.userId.refUserId.lastName}
                    userProfileId={data.userId._id}
                    name="Enquiring for a property"
                    title={data.propertyId && data.propertyId.name}
                    date={data.date.split("T")[0]}
                    time={new Date(data.date).toLocaleTimeString("en-US", {
                      hour: "numeric",
                      minute: "numeric",
                      hour12: true,
                    })}
                  />
                // </Link>
              ))}

            {requests && requests.length === 0 && (
              <div className="text-center text-[#FFFFFF] text-lg">
                No requests found
              </div>
            )}
            {requests === undefined && (
              <div className="text-center text-[#FFFFFF] text-lg">
                Server Error
              </div>
            )}
          </div>

          <div className="lg:hidden block">
            {requests &&
              requests.length > 0 &&
              requests
              .slice()
                .reverse().map((data, index) => (
                // <Link
                //   key={index}
                //   href={`/admin/requests/reg-demo/${data.customer}`}
                // >
                  <RequestCardMobile
                    key={index}
                    profilePicture={data.userId.refUserId.profilePicture}
                    firstName={data.userId.refUserId.firstName}
                    lastName={data.userId.refUserId.lastName}
                    userProfileId={data.userId._id}
                    name="Enquiring for a property"
                    title={data.propertyId && data.propertyId.name}
                    date={data.date.split("T")[0]}
                    time={new Date(data.date).toLocaleTimeString("en-US", {
                      hour: "numeric",
                      minute: "numeric",
                      hour12: true,
                    })}
                  />
                // </Link>
              ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Enquire;
