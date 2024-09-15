import PrimaryButton from "@/components/Buttons/PrimaryButton";
import { HeaderNavigation } from "@/components/HeaderNavigation";
import { PropertyCard } from "@/components/TransferCard/PropertyCard";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
  Typography,
} from "@material-tailwind/react";
import { Inter } from "next/font/google";
import Link from "next/link";
import { UserCard } from "../Delete/UserCard";
import { useEffect, useState } from "react";
import axios from "axios";
import BACKEND_URL from "@/apiUrl";
import { ToastContainer, toast } from "react-toastify";
import SecondaryButton from "@/components/Buttons/SecBtn";

const inter = Inter({ subsets: ["latin"] });

export default function DemoRequest({ demoId, ...data }) {
  const custType = data.custType;
  const [token, setToken] = useState("");
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState("");

  const handleOpen = () => {
    console.log("open", open);
    setOpen(!open);
  };

  const handleRejectBtn = () => {
    console.log("Reject button clicked");
    console.log("Service ID", demoId);
    console.log(token);
    try {
      const response = axios.put(
        `${BACKEND_URL}/api/requests/demo/${demoId}/decline`,
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
      const promise = response;
      promise
        .then((result) => {
          // Printing the fulfilled value
          console.log(result);
          toast.error(result.data.message, {
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

  const handleApproveBtn = () => {
    console.log("Approve button clicked");
    console.log("Service ID", demoId);
    console.log(token);
    try {
      const response = axios.put(
        `${BACKEND_URL}/api/requests/demo/${demoId}/approve`,
        {
          reg: true,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Accept", response);
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
      className={`min-h-screen items-center justify-between bg-[#160019] py-20 px-10 ${inter.className}`}
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
            New Demo Request from {data.firstName} {data.lastName}
          </Typography>
        </div>
      </div>
      <div className="flex items-center justify-between mt-2">
        <div></div>
        <div className="w-full max-w-[460px]">
          <UserCard custType={custType} {...data.refUserId} />
        </div>
        <div></div>
      </div>
      <div className="flex items-center justify-between mt-6">
        <div></div>
        <div className="w-full max-w-[460px]">
          <div className="flex justify-around">
            <div onClick={handleOpen}>
              <SecondaryButton
                title="Reject with Reason"
                customClassName="px-[40px] Outfit font-normal text-[16px]"
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
            <div onClick={handleApproveBtn}>
              <PrimaryButton
                title="Accept Request"
                customClassName="px-[40px]  Outfit font-normal text-[16px]"
              />
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </main>
  );
}
