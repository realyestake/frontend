import React, { use, useEffect, useState } from "react";
import { Avatar, Typography } from "@material-tailwind/react";
import { EnvelopeOpenIcon } from "@heroicons/react/24/outline";
import Properties from "@/components/User/Properties";
import Notifications from "@/components/User/Notifications";
import Reminders from "@/components/User/Reminders";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import PrimaryButton from "@/components/Buttons/PrimaryButton";
import { PencilIcon } from "@heroicons/react/24/solid";
import Modal from "@/components/EditModal";
import BACKEND_URL from "@/apiUrl";
import { fi, tr } from "date-fns/locale";
import { set } from "date-fns";
import Loader from "@/common/Loader";

export default function Profile() {
  const [value, setValue] = useState(0);
  const [data, setData] = useState([]);
  const [profile, setProfile] = useState([]);
  const [profileImg, setProfileImg] = useState("");
  // const [bio, setBio] = useState("");
  const [name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [token, setToken] = useState(null);

  const getData = async () => {
    try {
      const response = await fetch(BACKEND_URL + "/api/properties");
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.log(error);
      toast.error("Error fetching data");
    }
  };

  const [profData, setProfData] = useState({
    bio: "",
  });
  const [profileImgUrl, setProfileImgUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setToken(
        document.cookie
          .split(";")
          .find((c) => c.includes("token"))
          .split("=")[1]
      );
    }
    getProfile();
    getData();
    getLibrary();
  }, [token]);


  const [library, setLibrary] = useState([]);
  const [loading, setLoading] = useState(false);

  const getLibrary = async () => {
    const token = document.cookie
      .split(";")
      .find((c) => c.includes("token"))
      .split("=")[1];
    setLoading(true);
    try {
      const response = await axios.get(
        `${BACKEND_URL}/api/customers/library`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLibrary(response.data);
      console.log("lii", response.data);
    } catch {
      console.log("error fetching library");
    } finally {
      setLoading(false);
    }
  };

  const getProfile = async () => {
    try {
      const response = await axios.get(
        BACKEND_URL + "/api/customers/user-profile/",
        {
          headers: {
            "Content-Type": "application",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProfile(response.data);
      console.log("piccc", response.data.refUserId.profilePicture)
      setProfileImgUrl(response.data.refUserId.profilePicture);
      // setProfData({
      //   bio: response.data && response.data.bio
      // });
    } catch (error) {
      console.log(error);
      // toast.error('Error fetching profile');
    }
  };

  const onClickPencil = () => {
    setShowModal(true);
  };

  // const handleChangeData = (data) => {
  //   setProfData(data);
  // };

  const handleShowModal = () => {
    setShowModal(!showModal);
  };

  // const [img, setImg] = useState(null);

  const uploadFileToCloud = async (source) => {
    console.log("cloudddd");
    const data = new FormData();
    data.append("file", source);
    data.append("upload_preset", "realyes");
    data.append("cloud_name", "dw5nspymf");
  
    try {
      const response = await fetch("https://api.cloudinary.com/v1_1/dw5nspymf/image/upload", {
        method: "post",
        body: data,
      });
      const result = await response.json();
      console.log("data", result);
      console.log("data.url", result.url);
      setProfileImgUrl(result.url);
      return result.url;
    } catch (err) {
      console.log("err", err);
      throw err; // rethrow the error to handle it in the calling function if needed
    }
  };
  

  const uploadHandler = async (e) => {
    console.log("upload photo");
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      console.log("add");
      try {
        const url = await uploadFileToCloud(file);
        console.log("ok:", url);
  
        const response = await axios.put(
          `${BACKEND_URL}/api/customers/editProfile`,
          {
            profilePicture: url,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Profile image uploaded:", response.data);
        toast.success("Profile image uploaded successfully");
      } catch (error) {
        console.log("error", error);
        toast.error("Error uploading profile image");
      }
    } else {
      toast.error("Only image files are allowed", {
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
  

  // change the text color whichever tab is active
  const activeTab = (index) => {
    if (value === index) {
      return "text-white font-normal Outfit text-[24px]";
    } else {
      return "text-[#ffffff99] font-normal Outfit text-[24px]";
    }
  };

  const PropertiesTabHandler = () => {
    setValue(0);
  };

  const RemindersTabHandler = () => {
    setValue(1);
  };
  const NotificationTabHandler = () => {
    setValue(2);
  };

  //CODE FOR UPLOADING PROFILE IMAGE

  function convertToBase64(file) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  }

  const firstName = profile.refUserId ? profile.refUserId.firstName : "XYZ";
  const lastName = profile.refUserId ? profile.refUserId.lastName : "...";
  const email = profile.refUserId
    ? profile.refUserId.email
    : "No email address";
  const phone = profile.refUserId ? profile.refUserId.phone : "No phone number";
  const custType = profile ? profile.custType : "No customer type";
  const bio = profile ? profile.bio : "No bio";
  const pic = profile.profilePicture;

  console.log("profileeeee", profile)

  const [profBio, setProfBio] = useState(null);
  const [isPhone, setIsPhone] = useState(false);
  const [isDob, setIsDob] = useState(false);
  const [isAddress, setIsAddress] = useState(false);
  const [isPincode, setIsPincode] = useState(false);
  const [isLoading, setIsLoading] = useState({
    phone: false,
    dob: false,
    address: false,
    pincode: false
  });

  React.useEffect(() => {
    setIsPhone(localStorage.getItem("phoneIsVisible") === "true");
    setIsDob(localStorage.getItem("dobIsVisible") === "true");
    setIsAddress(localStorage.getItem("addressIsVisible") === "true");
    setIsPincode(localStorage.getItem("pincodeIsVisible") === "true");
  }, []);

  console.log("token", token);

  const handlePhone = async () => {
    // const response = await axios.put(`${BACKEND_URL}/api/customers/visibility`, {
    //   phoneIsVisible: phone
    // }, {
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${token}`,
    //   }
    // })

    // console.log("phone", response);


    setIsLoading({ ...isLoading, phone: true })
    try {
      const response = await axios.put(
        `${BACKEND_URL}/api/customers/visibility`,
        {
          phoneIsVisible: !isPhone,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("phone", response.status);
      if (response.status === 200) {
        toast.success("Phone visibility updated")
        setIsPhone(!isPhone);
        localStorage.setItem("phoneIsVisible", !isPhone);
      }
    } catch (error) {
      toast.error("Error updating phone visibility")
      console.log("error", error);
    }
    setIsLoading({ ...isLoading, phone: false });
  }

  const handleDob = async () => {
    setIsLoading({ ...isLoading, dob: true });
    try {
      const response = await axios.put(
        `${BACKEND_URL}/api/customers/visibility`,
        {
          dateOfBirthIsVisible: !isDob,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("dob", response.status);
      if (response.status === 200) {
        toast.success("Date of birth visibility updated")
        setIsDob(!isDob);
        localStorage.setItem("dobIsVisible", !isDob);
      }
    } catch (error) {
      toast.error("Error updating date of birth visibility")
      console.log("error", error);
    }
    setIsLoading({ ...isLoading, dob: false });
  }

  const handleAddress = async () => {
    setIsLoading({ ...isLoading, address: true });
    try {
      const response = await axios.put(
        `${BACKEND_URL}/api/customers/visibility`,
        {
          addressIsvisible: !isAddress,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("address", response.status);
      if (response.status === 200) {
        toast.success("Address visibility updated")
        setIsAddress(!isAddress);
        localStorage.setItem("addressIsVisible", !isAddress);
      }
    } catch (error) {
      toast.error("Error updating address visibility")
      console.log("error", error);
    }
    setIsLoading({ ...isLoading, address: false });
  }

  const handlePincode = async () => {
    setIsLoading({ ...isLoading, pincode: true });
    try {
      const response = await axios.put(
        `${BACKEND_URL}/api/customers/visibility`,
        {
          pincodeIsVisible: !isPincode,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("pincode", response);
      if (response.status === 200) {
        toast.success("Pincode visibility updated")
        setIsPincode(!isPincode);
        localStorage.setItem("pincodeIsVisible", !isPincode);
      }
    } catch (error) {
      toast.error("Error updating pincode visibility")
      console.log("error", error);
    }
    setIsLoading({ ...isLoading, pincode: false });
  }

  return (
    <>
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <div className="container mx-auto lg:mt-[140px]  mb-8 px-4 mt-[60px]">
        <div className="flex flex-row text-center lg:items-center ">
          <Typography className="lg:text-[48px]  text-[24px] font-bold Outfit capitalize">
            {firstName} {lastName}
            <span className=" lg:text-[24px] text-[18px] Satoshi capitalize font-normal pl-3 leading-[32.4px] text-[#ffffff99">
              {profile.custType}
            </span>
          </Typography>
          <div className="rounded-full"></div>
        </div>

        <div className="flex lg:flex-row flex-col justify-between pb-12 ">
          <div className="lg:w-[540px] mt-4">
            <div>
              <Avatar
                variant="circular"
                size="sm"
                alt="Profile Image"
                className="border border-white p-0.5 w-[183px] h-[181px]"
                src={profileImgUrl || "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"}
              />
            </div>
            <div className="mt-5 items-center flex ">
              <label
                className={`normal-case w-48 text-center items-center py-2 text-[#FFFFFF] rounded-[47px] bg-gradient-to-r from-[#2934FE] to-[#BF32EC]`}
              >
                Upload Photo
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => {
                    uploadHandler(e);
                  }}
                />
              </label>
            </div>
          </div>
          <div className="flex flex-col justify-end items-end mt-5 w-full ">
            <div className=" flex justify-center">
              <div></div>
              <div>
                <Typography className="lg:text-[30px] text-[20px] font-normal Satoshi">
                  <EnvelopeOpenIcon
                    className="inline-block h-8 w-8 mr-2"
                    aria-hidden="true"
                  />
                  {email}
                </Typography>
              </div>
              <div></div>
            </div>
            <div className="w-full  pt-[20px] ">
              <Typography className="lg:text-[32px] text-[20px] font-normal Outfit">
                Short Bio:{" "}
                {profBio == null && (
                  <span className="lg:text-[24px] text-[16px] text-[#ffffff99] font-light Satoshi">
                    {bio}
                  </span>
                )}
                {profBio != null && (
                  <span className="lg:text-[24px] text-[16px] text-[#ffffff99] font-light Satoshi">
                    {profBio}
                  </span>
                )}{" "}
              </Typography>
              <div className="mt-0">
                <PencilIcon
                  className="h-7 rounded-full w-7  hover:bg-white/50 p-1"
                  onClick={onClickPencil}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-[12rem] md:w-[12rem] xl:w-[12rem] 2xl:w-[12rem]">
          <div className="flex justify-center items-end flex-col gap-4 mb-5">
            <div className="flex items-end gap-4 flex-row w-full justify-around lg:flex-col md:flex-col xl:flex-col 2xl:flex-col">
              <div className="flex items-center gap-2">
                {isLoading.phone && (
                  <div role="status">
                    <svg aria-hidden="true" class="w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                  </div>

                )}
                <span>Phone</span>
                <div
                  onClick={handlePhone}
                  className={`relative w-12 h-6 flex items-center rounded-full p-1 cursor-pointer ${isPhone ? 'bg-gradient-to-r from-[#2934FE] to-[#BF32EC]' : 'bg-gray-300'}`}
                >
                  <div
                    className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${isPhone ? 'translate-x-6' : ''}`}
                  ></div>
                </div>
                <>

                </>
              </div>
              <div className="flex items-center gap-2">
                {isLoading.dob && (
                  <div role="status">
                    <svg aria-hidden="true" class="w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                  </div>

                )}
                <span>Date of birth</span>
                <div
                  onClick={handleDob}
                  className={`relative w-12 h-6 flex items-center rounded-full p-1 cursor-pointer ${isDob ? 'bg-gradient-to-r from-[#2934FE] to-[#BF32EC]' : 'bg-gray-300'}`}
                >
                  <div
                    className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${isDob ? 'translate-x-6' : ''}`}
                  ></div>
                </div>
              </div>
            </div>
            <div className="flex items-end gap-4 flex-row w-full justify-around lg:flex-col md:flex-col xl:flex-col 2xl:flex-col">
              <div className="flex items-center gap-2">
                {isLoading.address && (
                  <div role="status">
                    <svg aria-hidden="true" class="w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                  </div>

                )}
                <span>Address</span>
                <div
                  onClick={handleAddress}
                  className={`relative w-12 h-6 flex items-center rounded-full p-1 cursor-pointer ${isAddress ? 'bg-gradient-to-r from-[#2934FE] to-[#BF32EC]' : 'bg-gray-300'}`}
                >
                  <div
                    className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${isAddress ? 'translate-x-6' : ''}`}
                  ></div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {isLoading.pincode && (
                  <div role="status">
                    <svg aria-hidden="true" class="w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                  </div>

                )}
                <span>Pincode</span>
                <div
                  onClick={handlePincode}
                  className={`relative w-12 h-6 flex items-center rounded-full p-1 cursor-pointer ${isPincode ? 'bg-gradient-to-r from-[#2934FE] to-[#BF32EC]' : 'bg-gray-300'}`}
                >
                  <div
                    className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${isPincode ? 'translate-x-6' : ''}`}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr className="lg:mt-16 mb-8 border-[#ffffff33] border-1" />
        <div className="flex lg:justify-between ">
          <div></div>
          <div className="flex justify-between lg:flex-row flex-col lg:items-center items-start w-6/12 ">
            <div
              onClick={PropertiesTabHandler}
              className={`cursor-pointer lg:text-[28px] text-[20px] ${activeTab(
                0
              )}`}
            >
              PROPERTIES
            </div>
            <div
              onClick={RemindersTabHandler}
              className={`cursor-pointer lg:text-[28px] text-[20px] ${activeTab(
                1
              )}`}
            >
              REMINDERS
            </div>
            <div
              onClick={NotificationTabHandler}
              className={`cursor-pointer lg:text-[28px] text-[20px] ${activeTab(
                2
              )}`}
            >
              NOTIFICATION
            </div>
          </div>
          <div></div>
        </div>

        <div className=" mt-6 mb-10 ">
          <div className="grid md:grid-cols-1 w-full">
            <div className="">
              {value === 0 &&
                <>
                  {loading ?
                    (<Loader />)
                    : (
                      <Properties data={library} />
                    )
                  }
                </>}
              {value === 1 && <Reminders />}
              {value === 2 && <Notifications {...profile} />}
            </div>
          </div>
        </div>
      </div>
      {showModal && (
        <div className="mt-16">
          <Modal
            showModal={showModal}
            setShowModal={handleShowModal}
            profBio={profBio}
            setProfBio={setProfBio}
            token={token}
          />
        </div>
      )}
    </>
  );
}
