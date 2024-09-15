import React, { use, useEffect, useState } from "react";
import axios from "axios";
import BACKEND_URL from "@/apiUrl";
import { toast } from "react-toastify";

const PropCard = ({ title1, title2, _id }) => {
  console.log("id", _id);
  const [isChecked, setIsChecked] = useState(false);
  // console.log(_id)
  const [token, setToken] = useState("");

  const handleCheckboxChange = async () => {
    // Toggle the isChecked state

    setIsChecked(!isChecked);

    // Your API endpoint URLs for list and unlist actions
    const listApiUrl = `${BACKEND_URL}/api/properties/showcase/${_id}`;
    const unlistApiUrl = `${BACKEND_URL}/api/properties/private/${_id}`;
    try {
      // Determine which API endpoint to use based on the checkbox state
      const apiUrl = isChecked ? unlistApiUrl : listApiUrl;

      // Make the Axios POST request
      console.log("token", token);
      const response = await axios.put(
        apiUrl,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Handle the response data if needed
      console.log("Request successful:", response);
      if (response.status === 200) {
        console.log("hurrrr");
        toast.success(response.data.message, {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        toast.error(error, {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      // Handle errors here
      console.error("Error during request:", error.message);
      console.error("Error:", error);
      toast.error("An error occurred. Please try again.", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  useEffect(() => {
    if (window !== undefined && document.cookie) {
      setToken(
        document.cookie
          .split(";")
          .find((c) => c.includes("token"))
          .split("=")[1]
      );
    }
  }, [token]);

  return (
    <>
      <label className="autoSaverSwitch w-full  rounded-full shadow-card relative inline-flex cursor-pointer select-none bg-[#3A0242] p-2">
        <input
          type="checkbox"
          name="autoSaverSwitch"
          className="sr-only"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        <span
          className={`dot w-full sm:w-[10rem] md:w-[15rem] duration-200 flex text-[14px] text-white items-center space-x-2 sm:space-x-6 rounded-full py-2 px-4 sm:px-8 text-sm font-medium ${
            isChecked ? "text-primary bg-[#C732FF]" : "text-body-color"
          }`}
        >
          {title1}
        </span>
        <span
          className={`slider w-full sm:w-[10rem] md:w-[15rem] flex text-[14px] text-white space-x-2 sm:space-x-6 rounded-full py-2 px-4 sm:px-8 text-sm font-medium ${
            !isChecked ? "text-primary bg-[#C732FF]" : "text-body-color"
          } duration-200`}
        >
          {title2}
        </span>
      </label>
    </>
  );
};

export default PropCard;
