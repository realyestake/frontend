import {
  Card,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import BACKEND_URL from "@/apiUrl";

export default function AdminLogin() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleChange = (e) => {
    if (e.target.id === "email") {
      setEmail(e.target.value);
    } else if (e.target.id === "password") {
      setPassword(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    console.log("submit");
    // console all data
    e.preventDefault();
    const data = {
      emailUsername: email,
      password: password,
    };
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/login`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data.user.role);
      if (response.data.user.role === "customer") {
        toast.error("You are not authorized to access this page!", {
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

      setEmail("");
      setPassword("");
      console.log(response);
      if (response.status === 200) {
        document.cookie = `token=${response.data.token}; expires=${new Date(
          new Date().getTime() + 1000 * 60 * 60 * 24 * 7
        ).toUTCString()}; path=/; sameSite=strict;`;
        document.cookie = `role=${response.data.user.role}; expires=${new Date(
          new Date().getTime() + 1000 * 60 * 60 * 24 * 7
        ).toUTCString()}; path=/; sameSite=strict;`;

        toast.success("Login Successful!", {
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
          // reload the page
          window.location.reload();
          
        }, 1000);
      } else {
        toast.error("Login Failed!", {
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
      let res = error.response;
      console.log(res);
      if(res===undefined){
        toast.error("Server is down!", {
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
      toast.error(`${error.response.data.message}`, {
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


  const handleResendBtn = async () => {
    const data = {
      email: email,
    };
    const response = await axios.post(`${BACKEND_URL}/api/resendOtp`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response);
    if (response.status === 200) {
      toast.success("Otp Sent!", {
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
      toast.error("Failed to send Otp!", {
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
      <div className="container mx-auto px-4">
        <div className="flex md:flex-row flex-col mt-14 items-center">
          <div className="lg:ml-14 ">
            <Image
              src="/assets/signup.png"
              width={300}
              height={300}
              alt="sign-up Iamge"
              priority={true}
            />
          </div>
          <div className="lg:ml-16 ">
            <Card color="transparent" shadow={false}>
              <Typography variant="h4" color="white" className="py-4">
                Admin Login
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                Nice to meet you! Enter your details to register.
              </Typography>
              <form
                className="mt-4  mb-2 md:w-80 max-w-screen-lg "
                onSubmit={handleSubmit}
              >
                <div className="mb-1 flex flex-col gap-4">
                  <Typography variant="h6" color="white" className="-mb-3">
                    Your Email
                  </Typography>
                  <Input
                    onChange={handleChange}
                    value={email}
                    id="email"
                    size="lg"
                    color="white"
                    placeholder="name@mail.com"
                    className=" !border-t-white focus:!border-t-white"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                  />
                  <Typography variant="h6" color="white" className="-mb-3">
                    Password
                  </Typography>
                  <Input
                    onChange={handleChange}
                    value={password}
                    id="password"
                    type="password"
                    size="lg"
                    color="white"
                    placeholder="********"
                    className=" !border-t-white focus:!border-t-white"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                  />
                  <div className="flex items-between justify-end gap-0 text-gray-400">
                    <Link
                      href="/forgot-password"
                      className="font-medium text-[12px]"
                    >
                      {" "}
                      Forgot passsword?
                    </Link>
                    <Link
                      href="/forgot-password"
                      onClick={handleResendBtn}
                      className="font-medium text-[12px]"
                    >
                      {" "}
                     Reset passsword?
                    </Link>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="mt-4 normal-case text-[#FFFFFF] rounded-[47px] bg-gradient-to-r from-[#2934FE] to-[#BF32EC]"
                  fullWidth
                >
                  Sign In
                </Button>
                {/* <Typography
                  color="gray"
                  className="mt-4 text-center font-normal"
                >
                  Already have an account?{" "}
                  <a href="#" className="font-medium text-white">
                    Register
                  </a>
                </Typography> */}
              </form>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
