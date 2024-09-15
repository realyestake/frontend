import React, { useEffect, useState } from "react";
import RequestCard from "../RequestCards/RequestCard";
import RequestCardMobile from "../RequestCards/RequestCardMobile";
import axios from "axios";
import BACKEND_URL from "@/apiUrl";
import Link from "next/link";
import Loader from "@/common/Loader";

const Edit = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let token = "";
    if (typeof window !== "undefined") {
      const cookie = document.cookie
        .split(";")
        .find((c) => c.trim().startsWith("token="));
      if (cookie) {
        token = cookie.split("=")[1];
      }
    }
    if (token) {
      getData(token);
    }
  }, []);

  const getData = async (token) => {
    setLoading(true); // Start loading
    try {
      const user = await axios.get(`${BACKEND_URL}/api/requests/edit`, {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const result = user.data;
      setRequests(result);
      console.log("editt", result);
      // set owner name to local storage
      
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // End loading
    }
  };

  console.log("Result:", requests);

  return (
    <>
      {loading ? (
        <Loader /> // Display loader while fetching
      ) : (
        <div>
          <div className="my-11 lg:block hidden">
            {requests && requests.length > 0 ? (
              requests
                .slice()
                .reverse()
                .map((data, index) => (
                  <Link
                    // href={`/admin/requests/edit?propertyId=${data.propertyId?._id || ""}&propertyRequestId=${data._id}`}
                    // href={`/admin/requests/edit/edit-property/${data._id}`}
                    href={ data.propertyId && data.propertyId._id ? `/admin/requests/edit/edit-property/${data.propertyId._id}` : "#" }
                    key={index}
                  >
                    {data.propertyId && data.propertyId.owner && data.propertyId.owner.refUserId ? (
                      <RequestCard
                      key={index}
                      firstName={data.propertyId.owner.refUserId.firstName}
                      profilePicture={data.propertyId.owner.refUserId.profilePicture}
                      lastName={data.propertyId.owner.refUserId.lastName}
                      userProfileId={data.owner}
                      title={data.propertyId?.name || "Unknown Property"}
                      name="Requesting for an edit in the property"
                      date={data.date.split("T")[0]}
                    time={new Date(data.date).toLocaleTimeString("en-US", {
                      hour: "numeric",
                      minute: "numeric",
                      hour12: true,
                    })}
                    />
                    ) : (
                      <RequestCard
                      key={index}
                      userProfileId={data.owner}
                      title={data.propertyId?.name || "Unknown Property"}
                      name="Requesting for an edit in the property"
                      date={data.date.split("T")[0]}
                    time={new Date(data.date).toLocaleTimeString("en-US", {
                      hour: "numeric",
                      minute: "numeric",
                      hour12: true,
                    })}
                    />
                    )}
                  </Link>
                ))
            ) : (
              <div className="text-center text-[#FFFFFF] text-lg">
                {requests === undefined ? "Server Error" : "No requests found"}
              </div>
            )}
          </div>

          <div className="lg:hidden block">
            {requests && requests.length > 0 ? (
              requests
                .slice()
                .reverse()
                .map((data, index) => (
                  <Link
                    href={ data.propertyId && data.propertyId._id ? `/admin/requests/edit/edit-property/${data.propertyId._id}` : "#" }

                    key={index}
                  >
                    {data.propertyId && data.propertyId.owner && data.propertyId.owner.refUserId ? (
                      <RequestCardMobile
                      key={index}
                      firstName={data.propertyId.owner.refUserId.firstName}
                      profilePicture={data.propertyId.owner.refUserId.profilePicture}
                      lastName={data.propertyId.owner.refUserId.lastName}
                      userProfileId={data.owner}
                      title={data.propertyId?.name || "Unknown Property"}
                      name="Requesting for an edit in the property"
                      date={data.date.split("T")[0]}
                    time={new Date(data.date).toLocaleTimeString("en-US", {
                      hour: "numeric",
                      minute: "numeric",
                      hour12: true,
                    })}
                    />
                    ) : (
                      <RequestCardMobile
                      key={index}
                      userProfileId={data.owner}
                      title={data.propertyId?.name || "Unknown Property"}
                      name="Requesting for an edit in the property"
                      date={data.date.split("T")[0]}
                    time={new Date(data.date).toLocaleTimeString("en-US", {
                      hour: "numeric",
                      minute: "numeric",
                      hour12: true,
                    })}
                    />
                    )}
                  </Link>
                ))
            ) : (
              <div className="text-center text-[#FFFFFF] text-lg">
                {requests === undefined ? "Server Error" : "No requests found"}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Edit;
