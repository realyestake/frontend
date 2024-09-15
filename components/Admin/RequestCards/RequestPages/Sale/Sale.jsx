import PrimaryButton from "@/components/Buttons/PrimaryButton";
import SecondaryButton from "@/components/Buttons/SecondaryButton";
import { HeaderNavigation } from "@/components/HeaderNavigation";
// import { UserCard } from "@/components/TransferCard/UserCard";
import { Button, Dialog, DialogBody, DialogFooter, DialogHeader, Input, Typography } from "@material-tailwind/react";
import { Inter } from "next/font/google";
import { PropertyCard } from "./PropertyCard";
import axios from "axios";
import BACKEND_URL from "@/apiUrl";
import Link from "next/link";
import { useEffect, useState } from "react";
import { UserCard } from "./UserCard";
import { ToastContainer, toast } from "react-toastify";

const inter = Inter({ subsets: ["latin"] });

export default function SaleRequest({ saleId, ...data }) {
  console.log("datasale", data);
  // console.log("picture", data.propertyId.pictures[0])
  const propertyName = data.name === undefined ? "Pine Apt" : data.name;
  const price = data.price === undefined ? "₹15,00,000" : data.price;
  const address =
    data.address === undefined
      ? "Pine Apt, 1234, Pine St, Pineville"
      : data.address;
  const details =
    data.details === undefined
      ? "i fault it and you are not fool oka i i fault it and you are not fool okay fault it and you are not fool okayy?"
      : data.details;
  const picture =
    data.propertyId.pictures[0] === undefined
      ? "https://images.unsplash.com/photo-1612838320302-3b3b3f1b3b3b"
      : data.propertyId.pictures[0];
  const userData = data.propertyId.owner.refUserId;
  console.log("User", userData);

  const custType = data.propertyId.owner.custType;
  const bio = data.propertyId.owner.bio;

  const [token, setToken] = useState("");
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState("");

  const handleOpen = () => {
    console.log("open", open);
    setOpen(!open);
  };

  const handleRejectBtn = () => {
    console.log("Reject button clicked");
    console.log("Service ID", saleId);
    console.log(token);
    try {
      const response = axios.put(
        `${BACKEND_URL}/api/requests/sale/${saleId}/decline`,
        {
          reg: true,
          reason: reason,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Reject", response);
      setOpen(false);
      const promise = response;
      promise
        .then((result) => {
          // Printing the fulfilled value
          console.log(result);
          setOpen(false);
          toast.success(result.data.message, {
            position: "bottom-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        })
        .catch((error) => {
          // Handling errors if any
          console.error("An error occurred:", error);
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
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleApproveBtn = () => {
    console.log("Approve button clicked");
    console.log("Service ID", saleId);
    console.log(token);
    try {
      const response = axios.put(
        `${BACKEND_URL}/api/requests/sale/${saleId}/approve`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Approve", response);
      const promise = response;
      promise
        .then((result) => {
          // Printing the fulfilled value
          console.log(result);
          toast.success(result.data.message, {
            position: "bottom-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        })
        .catch((error) => {
          // Handling errors if any
          console.error("An error occurred:", error);
        });
    } catch (error) {
      console.log(error);
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
  }, []);

  return (
    <main
      className={` container mx-auto min-h-screen items-center justify-between bg-[#160019] py-24 px-10 ${inter.className}`}
    >
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
      <div className="flex flex-col text-start w-full h-full rounded-2xl">
        {/* <HeaderNavigation
          title={"New Transfer Request from John Doe for PineApt"}
          showBackButton={true}
        /> */}
        <div className="flex items-center gap-2 py-2">
          <Link
            href="/admin/requests"
            className="hover:border p-2 rounded-full"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="white"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
              />
            </svg>
          </Link>

          <Typography className="text-white  lg:text-[32px] text-[24px] font-normal Outfit">
            New Sale verification from {userData.firstName} {userData.lastName}{" "}
            for {propertyName}
          </Typography>
        </div>
      </div>
      <div className="flex lg:flex-row flex-col justify-start gap-8 items-center mt-4">
        <div className="w-full max-w-[440px]">
          <UserCard custType={custType} data={userData} bio={bio} />
        </div>
        <div className="w-full max-w-[440px]">
          <PropertyCard
            _id={data._id}
            title={propertyName}
            place={address}
            content={details}
            price={price}
            picture={picture}
          />
        </div>
        <div className="flex flex-col items-start  lg:mt-6 mt-0 gap-4">
          <div className="flex flex-col">
            <Typography className="text-white  lg:text-[24px] text-[24px] font-normal Outfit">
              Price:
            </Typography>
            <Typography className=" text-[#C732FF]  lg:text-[32px] text-[32px] font-medium Outfit">
              {price}
            </Typography>
          </div>
          <div>
            <Typography className="text-white  lg:text-[12px] text-[12px] font-normal Outfit">
              John Doe is requesting for his property {propertyName} to be
              removed from the website
            </Typography>
          </div>
          {/* two button accept and reject */}
          <div className="flex flex-col justify-around gap-3  w-full">
            <div onClick={handleApproveBtn}>
              <PrimaryButton
                title="Approve"
                customClassName="px-[54px] Outfit font-normal text-[16px]"
              />
            </div>
            <div onClick={handleOpen}>
              <SecondaryButton
                title="Reject with Reason"
                customClassName="px-[50px] Outfit font-normal text-[16px]"
              />
            </div>
            <Dialog open={open} handler={handleOpen}>
              <DialogHeader>Reason of Declining a Request:</DialogHeader>
              <DialogBody>
                <Input
                  label="Enter your reason"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
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
                  onClick={handleRejectBtn}
                  className="bg-gradient-to-r from-[#2934FE] to-[#BF32EC]"
                >
                  <span>Send</span>
                </Button>
              </DialogFooter>
            </Dialog>
          </div>
        </div>
      </div>
    </main>
  );
}
