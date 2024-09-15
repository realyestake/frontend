import React, { useEffect, useState } from "react";
import RequestCard from "../RequestCards/RequestCard";
import RequestCardMobile from "../RequestCards/RequestCardMobile";
import axios from "axios";
import BACKEND_URL from "@/apiUrl";
import Link from "next/link";
import Loader from "@/common/Loader";

const RequestData = [
  {
    name: "Tania Andrew",
    title: "Requesting Transfer of the Property",
    property: "4140 Parker Rd. Allentown, New Mexico 31134",
    to: "Hanry Porter",
    time: "15 May 2020 9:00 am",
  },
];

const Service = () => {
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
        `${BACKEND_URL}/api/requests/service-requests`,
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result = user.data;
      setRequests(result);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // End loading
    }
  };

  console.log("service", requests);

  return (
    <>
      {loading ? (
        <Loader /> // Display loader while fetching
      ) : (
        <div>
          <div className="my-11 lg:block hidden">
            {requests &&
              requests.length > 0 &&
              requests.slice()
              .reverse().map((data, index) => (
                <Link
                  href={`/admin/requests/service/${
                    data.customerId.refUserId._id
                  }?serviceName=${data.serviceId?.name}`}
                  key={index}
                >
                  <RequestCard
                    key={index}
                    serviceName={"not specified"}
                    userProfileId={data.customerId._id}
                    title={data.serviceId?.name || "not specified"}
                    firstName={data.customerId.refUserId.firstName}
                    lastName={data.customerId.refUserId.lastName}
                    profilePicture={data.customerId.refUserId.profilePicture}
                    name="Requesting for a service"
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
                <Link
                  href={`/admin/requests/service/${
                    data.customerId.refUserId._id
                  }?serviceName=${data.serviceId?.name}`}
                  key={index}
                >
                <RequestCardMobile
                  key={index}
                  title={data.serviceId?.name || "not specified"}
                  serviceName={"not specified"}
                  userProfileId={data.customerId._id}
                  firstName={data.customerId.refUserId.firstName}
                  lastName={data.customerId.refUserId.lastName}
                  profilePicture={data.customerId.refUserId.profilePicture}
                  name="Requesting for a service"
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

export default Service;
