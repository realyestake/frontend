import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  IconButton,
  DialogFooter,
  Dialog,
  DialogHeader,
  DialogBody,
  Input,
} from "@material-tailwind/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import ToggleButton from "@/components/Buttons/ToggleButton";
import PropCard from "./PropCard";
import { ToastContainer, toast } from "react-toastify";
import BACKEND_URL from "@/apiUrl";
// import axios from "axios";

export function SingleCard({
  name,
  location,
  details,
  price,
  isNew,
  isLiked,
  pictures,
  _id,
}) {
  // console.log(_id);

  const [transfer, setTransfer] = useState("Request for a transfer Request");
  const [sale, setSale] = useState("Sale Request");
  const [deleteProp, setDeleteProp] = useState("Request for a Delete Property");
  const [edit, setEdit] = useState("Edit Property");
  const [open, setOpen] = useState(false);
  const [salePrice, setSalePrice] = useState("");

  const [liked, setLiked] = useState(isLiked);

  const handleOpen = () => {
    console.log("open", open);
    setOpen(!open);
  };

  const handleFavourites = async () => {
    const token = document.cookie
      .split(";")
      .find((c) => c.includes("token"))
      .split("=")[1];

    try {
      if (liked) {
        // If already liked, unfavorite the property
        await axios.put(
          `${BACKEND_URL}/api/properties/unfavourite/${_id}`,
          {},
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        // If not liked, favorite the property
        const res = await axios.put(
          `http://localhost:3000/api/properties/favourite/${_id}`,
          {},
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      console.log(res);

      // Update the liked state to reflect the current status
      setLiked(!liked);
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  const [token, setToken] = useState("");
  useEffect(() => {
    if (typeof window !== "undefined" && document.cookie) {
      setToken(
        document.cookie
          .split(";")
          .find((c) => c.includes("token"))
          .split("=")[1]
      );
    }
  }, []);

  const handleEditBtn = async () => {
    if (edit === "Edit Request Sent!") {
      return;
    }
    console.log(token);
    console.log("iddddddd", _id);
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/requests/edit`,
        {
          propertyId: _id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      if (response.status === 200) {
        toast.success("Request Sent!", {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setEdit("Edit Request Sent!");
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
      console.error("Error:", error);
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
  };

  const handleTransferBtn = async () => {
    if (transfer === "Transfer Request Sent!") {
      return;
    }
    console.log(token);
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/requests/transfer`,
        {
          propertyId: _id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      if (response.status === 200) {
        toast.success("Request Sent!", {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setTransfer("Transfer Request Sent!");
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

  const handleSaleBtn = async () => {
    if (salePrice === "Sale Request Sent!") {
      return;
    }
    console.log(token);
    if (isNaN(salePrice) || salePrice.trim() === "") {
      toast.error("Please enter a valid number for the sale price.", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setOpen(false);
      return;
    }
    const data ={
      propertyId: _id,
      price: salePrice,
    };
    console.log("dataa", data)
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/requests/sale`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("salee", response.data);
      if (response.status === 200) {
        toast.success("Request Sent!", {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setSalePrice("Sale Request Sent!");
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
      console.error("Error:", error.response.data);
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
    setOpen(false);
  };

  const handleDeleteBtn = async () => {
    if (deleteProp === "Delete Request Sent!") {
      return;
    }
    console.log(token);
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/requests/delete`,
        {
          propertyId: _id,
        },
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Success:", response);

      if (response.status === 200) {
        toast.success("Request Sent!", {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setDeleteProp("Delete Request Sent!");
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
      console.error("Error:", error);
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
  };

  return (

    <>
      <Card className="mt-6 bg-[#0D0D0D] rounded-[8px]">
        <CardHeader
          floated={false}
          className="relative m-0  rounded-none rounded-t-[8px]"
        >
          <Link href={`/properties/${_id}`}>
            {/* <Image
          src={pictures[0]}
          alt="card-image"
          height={241}
          width={507}
          fullWidth={true}
          className="rounded-none rounded-t-[8px]"
        /> */}
            <img
              src={
                pictures[0] !== "images[0]"
                  ? pictures[0]
                  : "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvcGVydHl8ZW58MHx8MHx8fDA%3D"
              }
              alt="card-image"
              className="object-cover object-center w-full h-60 max-w-full rounded-none rounded-t-[8px]"
            />
          </Link>
          {isNew ? (
            <div className="bg-[#FA238A] absolute top-3 left-3 w-12 text-white flex items-center justify-center rounded-md text-[12px] Outfit py-1 px-8">
              <Typography variant="small">NEW</Typography>
            </div>
          ) : (
            ""
          )}

          <IconButton
            size="sm"
            variant="text"
            onClick={handleFavourites}
            className="!absolute top-1 right-1 rounded-full"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill={liked ? "red" : "transparent"}
              stroke={liked ? "red" : "white"}
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6 text-red-500"
            >
              {/* ... your SVG path */}
              <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
            </svg>
          </IconButton>
        </CardHeader>
        {/* <Link href={`/properties/${_id}`}> */}
        <CardBody className="px-2">
        <Link href={`/properties/${_id}`}>
          <Typography
            variant="h6"
            color="blue-gray"
            className="mb-2 font-medium Outfit uppercase text-white text-[16px]"
          >
            {name}
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
            <span className=" text-white Outfit font-normal text-[12px] leading-[15.12px]">
              {location}
            </span>
          </Typography>
          <Typography
            variant="small"
            color="white"
            className="mb-2 text-white Outfit font-normal text-[12px] leading-[15.12px]"
          >
            <span className="font-bold text-white">Details: </span>
            {details.split(" ").slice(0, 8).join(" ") + "..."}
          </Typography>
          </Link>
          <div className="flex items-center justify-between pt-2 px-2">
            <Link href={`/properties/${_id}`}>
              <Typography
                className="text-[#F64070] text-[21px] font-[600] leading-[28px] Outfit"
                variant="h5"
              >
                Rs. {price}
              </Typography>
            </Link>
            <Button
              onClick={handleEditBtn}
              className="rounded-[47px] Outfit hover:bg-[#F64070] hover:text-white bg-white text-[#F64070] text-[14px] font-normal capitalize leading-[17.64px] border border-[#FDACD3] px-10 py-[10px]"
            >
              {edit}
            </Button>
          </div>
        </CardBody>
        {/* </Link> */}
        <CardFooter className="flex flex-col gap-4 justify-between pt-0 px-2">
          <PropCard title1={"List for Sale"} title2={"Unlist"} _id={_id} />

          <Button
            onClick={handleTransferBtn}
            className="rounded-[47px] font-normal Outfit hover:bg-[#F64070] hover:text-white bg-white text-[#F64070] capitalize text-[14px]  leading-[17.64px] border border-[#FDACD3] px-10 py-[10px]"
          >
            {transfer}
          </Button>
          <Button
            onClick={handleOpen}
            className="rounded-[47px] font-normal Outfit hover:bg-[#F64070] hover:text-white bg-white text-[#F64070] capitalize text-[14px]  leading-[17.64px] border border-[#FDACD3] px-10 py-[10px]"
          >
            {sale}
          </Button>
          <Dialog open={open} handler={handleOpen}>
              <DialogHeader>Reason of Declining a Request:</DialogHeader>
              <DialogBody>
                <Input
                  label="Add the money"
                  value={salePrice}
                  onChange={(e) => setSalePrice(e.target.value)}
                />
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
                <Button
                  variant="gradient"
                  color="purple"
                  onClick={handleSaleBtn}
                  className="bg-gradient-to-r from-[#2934FE] to-[#BF32EC]"
                >
                  <span>Send</span>
                </Button>
              </DialogFooter>
            </Dialog>
          <Button
            onClick={handleDeleteBtn}
            className="rounded-[47px] font-normal Outfit bg-[#F64070] text-white hover:bg-white hover:text-[#F64070] capitalize text-[14px]  leading-[17.64px] border border-[#FDACD3] px-10 py-[10px]"
          >
            {deleteProp}
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}
