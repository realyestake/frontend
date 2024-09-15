import React, { useEffect, useState } from "react";
import RequestCard from "../RequestCards/RequestCard";
import RequestCardMobile from "../RequestCards/RequestCardMobile";
import axios from "axios";
import UnRequestCard from "../RequestCards/UnRequestCard";
import Link from "next/link";
import BACKEND_URL from "@/apiUrl";
import Loader from "@/common/Loader";
import { useRouter } from "next/router";

const Demo = () => {
  const [requests, setRequests] = useState([]);
  const {push}= useRouter();
  const [demoRequests, setDemoRequests] = useState([]);
  const [unregUsers, setUnregUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let token = "";
    if (typeof window !== "undefined" && document.cookie) {
      token = document.cookie
        .split(";")
        .find((c) => c.includes("token"))
        .split("=")[1];
    }
    else{
      // setTimeout(() => {
      //   // reload the page
        push("/admin");
      // },1/0);
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
      const user = await axios.get(`${BACKEND_URL}/api/requests/demo`, {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const result = user.data;
      setDemoRequests(result.regUsers);
      setUnregUsers(result.unregUsers);
      console.log("demo", result.regUsers);
    } catch (error) {
      console.log(error);
    }
    finally {
      setLoading(false); // End loading
    }
  };

  console.log("Register", demoRequests, "Unreg", unregUsers);

  return (
    <>
      {loading ? (
        <Loader /> // Display loader while fetching
      ) : (
        <div className="my-11">
          <div className="lg:block hidden">
            {demoRequests &&
              demoRequests.length > 0 &&
              demoRequests
              .slice()
                .reverse().map((data, index) => (
                <Link key={index} href={`/admin/requests/reg-demo/${data._id}`}>
                  <RequestCard
                    key={index}
                    firstName={data.customer.refUserId.firstName}
                    lastName={data.customer.refUserId.lastName}
                    profilePicture={data.customer.refUserId.profilePicture}
                    userProfileId={data.customer._id}
                    name="Requesting for a demo"
                    date={data.date.split("T")[0]}
                    time={new Date(data.date).toLocaleTimeString("en-US", {
                      hour: "numeric",
                      minute: "numeric",
                      hour12: true,
                    })}
                  />
                </Link>
              ))}
            {demoRequests && demoRequests.length === 0 && (
              <div className="text-center text-[#FFFFFF] text-lg">
                No requests found
              </div>
            )}
            {demoRequests === undefined && (
              <div className="text-center text-[#FFFFFF] text-lg">
                Server Error
              </div>
            )}
          </div>

          <div className="lg:hidden block">
            {demoRequests &&
              demoRequests.length > 0 &&
              demoRequests
              .slice()
                .reverse().map((data, index) => (
                <Link
                  key={index}
                  href={`/admin/requests/reg-demo/${data.customer}`}
                >
                  <RequestCardMobile
                    key={index}
                    userProfileId={data.customer}
                    name="Requesting for a demo"
                    title={data._id}
                    firstName={data.customer.refUserId.firstName}
                    lastName={data.customer.refUserId.lastName}
                    profilePicture={data.customer.refUserId.profilePicture}
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

          {/* for unregestered users */}
          <div className="lg:block hidden">
            {unregUsers &&
              unregUsers.length > 0 &&
              unregUsers
              .slice()
                .reverse().map((data, index) => (
                <Link
                  key={index}
                  href={`/admin/requests/unreg-demo/${data._id}`}
                >
                  <UnRequestCard
                    key={index}
                    firstName={data.firstName}
                    lastName={data.lastName}
                    profilePicture={data.profilePicture}
                    name="Requesting for a demo"
                    title={data._id}
                  />
                </Link>
              ))}
            {(unregUsers && unregUsers.length === 0) ||
              (demoRequests && demoRequests.length === 0 && (
                <div className="text-center text-[#FFFFFF] text-lg">
                  No requests found
                </div>
              ))}
            {unregUsers === undefined ||
              (demoRequests === undefined && (
                <div className="text-center text-[#FFFFFF] text-lg">
                  Server Error
                </div>
              ))}
          </div>

          {/* for unreq user mobile view */}
          <div className="lg:hidden block">
            {unregUsers &&
              unregUsers.length > 0 &&
              unregUsers
              .slice()
                .reverse().map((data, index) => (
                <Link
                  key={index}
                  href={`/admin/requests/unreg-demo/${data._id}`}
                >
                  <RequestCardMobile
                    key={index}
                    userProfileId={data.customer}
                    name="Requesting for a demo"
                    title={data._id}
                    firstName={data.firstName}
                    lastName={data.lastName}
                    date={data.date.split("T")[0]}
                    time={new Date(data.date).toLocaleTimeString("en-US", {
                      hour: "numeric",
                      minute: "numeric",
                      hour12: true,
                    })}
                  />
                </Link>
              ))}
            {(unregUsers && unregUsers.length === 0) ||
              (demoRequests && demoRequests.length === 0 && (
                <div className="text-center text-[#FFFFFF] text-lg">
                  No requests found
                </div>
              ))}
            {unregUsers === undefined ||
              (demoRequests === undefined && (
                <div className="text-center text-[#FFFFFF] text-lg">
                  Server Error
                </div>
              ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Demo;
