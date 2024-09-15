import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Card,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import BACKEND_URL from "@/apiUrl";
import Link from "next/link";

export default function ResetPassword() {
  const router = useRouter();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    const { token } = router.query;
    if (token) {
      setToken(token);
    }
  }, [router.query]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id === "newPassword") {
      setNewPassword(value);
    } else if (id === "confirmPassword") {
      setConfirmPassword(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    const data = {
      newPassword: newPassword,
      passToken: token,
    };
    console.log("Data:", data);
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/reset-password`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Response:", response);
      if (response.status === 200) {
        toast.success("Password reset successful!", {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setTimeout(() => {
          router.push('/login');
      }, 1000); // Redirect to login after successful reset
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      toast.error("Error resetting password. Please try again later.", {
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
      <div className="container mx-auto px-4 lg:mt-[140px] mt-[40px]">
        <div className="flex md:flex-row flex-col lg:my-14 items-center justify-between">
          <div className=""></div>
          <div className="lg:px-0 px-10">
            <Card color="transparent" shadow={false}>
              <Typography variant="h4" color="white">
                Change Password
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                Your new password must be different from previously used passwords.
              </Typography>
              <form
                className="mt-4  mb-2 w-80 max-w-screen-lg sm:w-96"
                onSubmit={handleSubmit}
              >
                <div className="mb-1 flex flex-col gap-4">
                  <Typography variant="h6" color="white" className="-mb-3">
                    New Password
                  </Typography>
                  <Input
                    onChange={handleChange}
                    value={newPassword}
                    type="password"
                    id="newPassword"
                    size="lg"
                    color="white"
                    placeholder="Enter new password"
                    className=" !border-t-white focus:!border-t-white"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                  />
                  <Typography variant="h6" color="white" className="-mb-3">
                    Confirm Password
                  </Typography>
                  <Input
                    onChange={handleChange}
                    value={confirmPassword}
                    type="password"
                    id="confirmPassword"
                    size="lg"
                    color="white"
                    placeholder="Confirm new password"
                    className=" !border-t-white focus:!border-t-white"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                  />
                </div>

                <Button
                  type="submit"
                  className="mt-6 normal-case text-[14px] text-[#FFFFFF] rounded-[47px] bg-gradient-to-r from-[#2934FE] to-[#BF32EC]"
                  fullWidth
                >
                  Submit
                </Button>
                <Typography
                  color="gray"
                  className="mt-2 text-center font-normal"
                >
                  Return to{" "}
                  <Link href="/login" className="font-medium text-white">
                    Login
                  </Link>
                </Typography>
              </form>
            </Card>
          </div>
          <div className=""></div>
        </div>
      </div>
    </>
  );
}
