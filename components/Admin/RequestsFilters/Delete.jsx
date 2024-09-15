import React, { useEffect, useState } from 'react';
import RequestCardMobile from '../RequestCards/RequestCardMobile';
import axios from "axios";
import BACKEND_URL from '@/apiUrl';
import Link from 'next/link';
import DeleteRequestCard from './DelReqCard';
import Loader from '@/common/Loader';
import RequestCard from '../RequestCards/RequestCard';

const Delete = () => {
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
      const user = await axios.get(
        `${BACKEND_URL}/api/requests/delete`,
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result = user.data;
      setRequests(result);
      console.log("delte", result);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <div>
      {loading ? (
        <Loader /> // Display loader while fetching
      ) : (
        <>
          <div className="my-11 lg:block hidden">
            {requests &&
              requests.length > 0 &&
              requests.slice()
              .reverse().map((data, index) => (
                <Link key={index} href={`/admin/requests/delete/${data._id}`}>
                  <RequestCard
                    key={index}
                    // firstName={data.}
                    userProfileId={data._id}
                    firstName={data.propertyId?.owner?.refUserId.firstName}
                    lastName={data.propertyId?.owner?.refUserId.lastName}
                    profilePicture={data.propertyId?.owner?.refUserId.profilePicture}
                    name="Requesting for a delete of the property"
                    title={data.propertyId?.name || "not specified"}
                    date={data.date.split("T")[0]}
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
              requests.slice()
              .reverse().map((data, index) => (
                <Link key={index} href={`/admin/requests/delete/${data._id}`}>
                <RequestCardMobile
                  key={index}
                  userProfileId={data._id}
                  firstName={data.propertyId?.owner?.refUserId.firstName}
                  lastName={data.propertyId?.owner?.refUserId.lastName}
                  profilePicture={data.propertyId?.owner?.refUserId.profilePicture}
                  name="Requesting for a delete of the property"
                  date={data.date.split("T")[0]}
                  title={data.propertyId?.name || "not specified"}
                  time={new Date(data.date).toLocaleTimeString("en-US", {
                    hour: "numeric",
                    minute: "numeric",
                    hour12: true,
                  })}
                />
                </Link>
              ))}

          </div>
        </>
      )}
    </div>
  );
};

export default Delete;
