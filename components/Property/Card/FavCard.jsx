import { useState, useEffect } from "react";
import axios, { Axios } from "axios";
import {
  IconButton,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import Image from "next/image";
import Link from "next/link";
import BACKEND_URL from "@/apiUrl";
import { ToastContainer, toast } from "react-toastify";

export function FavCard({
  _id,
  title,
  place,
  content,
  price,
  isNew,
  picture,
  favouriteBy,
  userId,
}) {

  // console.log("pic", picture);
  // console.log("favouriteBy", favouriteBy.includes(userId))
  const [isLiked, setIsLiked] = useState(false); // Initialize to false
  const [role, setRole] = useState("");


  useEffect(() => {
    // Check if the user is in the favouriteBy array
    setIsLiked(favouriteBy && favouriteBy.includes(userId));
    if (document.cookie && document.cookie.includes("token")) {
      const token = document.cookie
        .split(";")
        .find((c) => c.includes("token"))
        .split("=")[1];
      // if role is in cookie then set role
      if (document.cookie.includes("role")) {
        const rol = document.cookie
          .split(";")
          .find((c) => c.includes("role"))
          .split("=")[1];
        setRole(rol);
        console.log("_app", rol);
      }
     
    }
  }, [favouriteBy, userId]);
  const [token, setToken] = useState("");

  const [open, setOpen] = useState(false);
  const [enquireData, setEnquireData] = useState("Enquire Now");

  const handleOpen = () => {
    console.log("open", open);
    if(role!=="customer"){
      toast.info("Please login to Enquire about Property!", {
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
    setOpen(!open);
  };

  const handleConfirmBtn = async () => {

    if (enquireData === "Enquired") {
      setOpen(!open);
      return;
    }
    console.log("Confirm button clicked");
    // axios post request
    console.log("Token", token);
    const data = {
      propertyId: _id,
    };
    console.log("Data", data);
    console.log("Property ID", _id);
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/requests/enquire`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Response", response);
      if (response.status === 200) {
        toast.success("Enquiry sent successfully", {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setEnquireData("Enquired");
      }
    } catch (error) {
      console.log("Error in posting enquiry", error);
      toast.error(error.response.data.message, {
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
    setOpen(!open);
  };

  const handleFavourites = (_id) => async () => {
    console.log("click")
    if (!token || role !== "customer") {
      setTimeout(() => {
        toast.info("Please login to add to favourites", {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }, 1000);
      return;
    }
    try {
      // Toggle the favorite status
      const res = isLiked
        ? await axios.put(
            `${BACKEND_URL}/api/properties/unfavourite/${_id}`,
            {},
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          )
        : await axios.put(
            `${BACKEND_URL}/api/properties/favourite/${_id}`,
            {},
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );

      if (res.status === 200) {
        // Update the favorite status locally
        setIsLiked(!isLiked);
      }else{
        toast.error("okk")
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  useEffect(() => {
    // Retrieve token from cookie
    if (typeof window !== "undefined" && document.cookie) {
      setToken(
        document.cookie
          .split(";")
          .find((c) => c.includes("token"))
          .split("=")[1]
      );
    }
  }, []);

  return (
    <Card className="mt-6 bg-[#0D0D0D] rounded-[8px]">
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
      <CardHeader
        floated={false}
        className="relative m-0 rounded-none rounded-t-[8px]"
      >
        <Link href={`/properties/${_id}`}>
          {/* <Image
            src={
              picture !== "images[0]"
                ? picture
                : "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvcGVydHl8ZW58MHx8MHx8fDA%3D"
            }
            alt="cardoooo"
            height={100}
            width={600}
            fullWidth={false}
            className="rounded-none rounded-t-[8px]"
          /> */}
          <img
            className="object-cover object-center w-full h-60 max-w-full rounded-t-lg"
            src={
              picture ?
         `${picture}`
                : "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=2560&amp;q=80"
            }
            alt="gallery-photo"
          />
        </Link>
        {isNew && (
          <div className="bg-[#FA238A] absolute top-3 left-3 w-12 text-white flex items-center justify-center rounded-md">
            <Typography variant="small">NEW</Typography>
          </div>
        )}

        <IconButton
          size="sm"
          variant="text"
          onClick={handleFavourites(_id)}
          className="!absolute top-1 right-1 rounded-full "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill={isLiked ? "red" : "transparent"}
            stroke={isLiked ? "red" : "white"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-8 w-8 text-red-500"
          >
            <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
          </svg>
        </IconButton>
      </CardHeader>
      <Link href={`/properties/${_id}`}>
        <CardBody className="px-2">
          <Typography
            variant="h6"
            color="blue-gray"
            className="mb-2 Outfit uppercase text-white text-[16px] font-bold"
          >
            {title}
          </Typography>
          <Typography variant="small" color="white" className="flex mb-2 xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 30 30"
              strokeWidth={1}
              stroke="currentColor"
              className="w-5 h-5 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
              />
            </svg>
            <span className="text-white Outfit font-normal text-[12px] leading-[15.12px]">
              {place}
            </span>
          </Typography>
          <Typography
            variant="small"
            color="white"
            className="mb-2 text-white Outfit font-normal text-[12px] leading-[15.12px]"
          >
            <span className="font-bold text-white">Details: </span>
            {content
              ? content.length > 100
                ? content.substring(0, 100) + "..."
                : content
              : ""}
          </Typography>
        </CardBody>
      </Link>
      <CardFooter className="flex items-center justify-between pt-0 px-2">
        <Link href={`/properties/${_id}`}>
          <Typography
            className="text-[#F64070] text-[21px] font-[600] leading-[28px] Outfit"
            variant="h5"
          >
            Rs. {price}
          </Typography>
        </Link>
        <Button
          onClick={handleOpen}
          className="rounded-[47px] hover:bg-[#F64070] hover:text-white bg-white text-[#F64070] text-[12px] font-normal leading-[17.64px] border border-[#FDACD3] px-10 py-[10px]"
        >
          {enquireData}
        </Button>
        {role==="customer"?
        (
         <>
         <Dialog open={open} handler={handleOpen}>
          <DialogHeader>Enquire about this property</DialogHeader>
          <DialogBody>
            Hey, By confirming you can inquire about this property or request
            more information. We&apos;ll get back to you as soon as possible to
            assist you further. Thank you for your interest!
          </DialogBody>
          <DialogFooter>
            <Button
              variant="text"
              color="red"
              onClick={handleOpen}
              className="mr-1"
            >
              <span>Cancel</span>
            </Button>
            <Button variant="gradient" color="green" onClick={handleConfirmBtn}>
              <span>Confirm</span>
            </Button>
          </DialogFooter>
        </Dialog></> 
        ): 
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
      />}
      </CardFooter>
    </Card>
  );
}
