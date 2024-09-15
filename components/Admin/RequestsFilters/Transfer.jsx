import React, { useEffect, useState } from "react";
import RequestCard from "../RequestCards/RequestCard";
import RequestCardMobile from "../RequestCards/RequestCardMobile";
import axios from "axios";
import BACKEND_URL from "@/apiUrl";
import Loader from "@/common/Loader";
import Link from "next/link";

const RequestData = [
  {
    name: "Tania Andrew",
    title: "Requesting Transfer of the Property",
    property: "4140 Parker Rd. Allentown, New Mexico 31134",
    to: "Hanry Porter",
    time: "15 May 2020 9:00 am",
  },
];

const Transfer = () => {
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
    getData(token);
  }, []);

  const getData = async (token) => {
    setLoading(true); // Start loading
    try {
      const user = await axios.get(`${BACKEND_URL}/api/requests/transfer`, {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const result = user.data;
      setRequests(result);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // End loading
    }
  };

  console.log("transfer", requests);

  return (
    <>
      {loading ? (
        <Loader /> // Display loader while fetching
      ) : (
        <div>
          <div className="my-11 lg:block hidden">
            {requests &&
              requests.length > 0 &&
              requests
                .slice()
                .reverse()
                .map((data, index) => (
                  <Link key={index} href={`requests/transfer/${data._id}`}>
                    <RequestCard
                      userProfileId={data.newOwner}
                      title={data.propertyId && data.propertyId.name}
                      name="Requesting for a transfer of the property"
                      date={data.date.split("T")[0]}
                      firstName={data.currentOwner.refUserId.firstName}
                      lastName={data.currentOwner.refUserId.lastName}
                      profilePicture={
                        data.currentOwner.refUserId.profilePicture
                      }
                      time={new Date(data.date).toLocaleTimeString("en-US", {
                        hour: "numeric",
                        minute: "numeric",
                        hour12: true,
                      })}
                    />
                  </Link>
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
                .reverse()
                .map((data, index) => (
                  <Link key={index} href={`requests/transfer/${data._id}`}>
                    <RequestCardMobile
                    title={data.propertyId && data.propertyId.name}
                      name="Requesting for a transfer of the property"
                      userProfileId={data.newOwner}
                      firstName={data.currentOwner.refUserId.firstName}
                      lastName={data.currentOwner.refUserId.lastName}
                      profilePicture={
                        data.currentOwner.refUserId.profilePicture
                      }
                      date={data.date.split("T")[0]}
                      time={new Date(data.date).toLocaleTimeString("en-US", {
                        hour: "numeric",
                        minute: "numeric",
                        hour12: true,
                      })}
                    />
                  </Link>
                ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Transfer;
