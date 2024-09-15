import PrimaryButton from "@/components/Buttons/PrimaryButton";
import { Button } from "@material-tailwind/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import BACKEND_URL from "@/apiUrl";

const ForgotPassword = () => {
  const { push } = useRouter();
  const [email, setEmail] = useState("");

  const handleChange = (e) => {
    if (e.target.id === "email") {
      setEmail(e.target.value);
    }
  };

  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    console.log("submit");
    console.log(email);
    // console all data
    e.preventDefault();
    const data = {
      email: email,
    };
    const response = await axios.post(
      `${BACKEND_URL}/api/forgot-password`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200) {
      toast.success("Check your Mail", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setSent(true);
    } else {
      toast.error("Email not found!", {
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
      <div className="relative flex lg:min-h-[500px] min-h-[300px] flex-col justify-center overflow-hidden bg-[#160019] py-2">
        <div className="relative bg-transparent px-6 lg:pt-8 pt-2 pb-0 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
          <div className="mx-auto flex w-full max-w-md flex-col lg:space-y-6 space-y-2">
            {!sent && (
              <div>
                <div className="flex flex-col items-center justify-center text-center space-y-2">
                  <div className="font-semibold lg:text-3xl text-[20px]">
                    <p>Forgot your password?</p>
                  </div>
                  <div className="flex flex-row lg:text-sm text-[12px] font-medium text-gray-400">
                    <p>
                      Don&apos;t fret! Just type in your email and we will send you a
                      code to reset your password!
                    </p>
                  </div>
                </div>

                <div>
                  <form action="" method="post" onSubmit={handleSubmit}>
                    <div className="flex flex-col space-y-6 ">
                      <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                        <div className="w-full lg:h-10 h-10">
                          {/* <label className="">Your email</label> */}
                          <input
                            onChange={handleChange}
                            value={email}
                            type="email"
                            id="email"
                            className="text-[14px] mt-2 w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border text-white border-white lg:text-lg  bg-transparent focus:bg-transparent focus:ring-1 ring-white"
                            placeholder="Enter Email Address"
                          />
                        </div>
                      </div>

                      <div className="flex flex-col space-y-10 ">
                        <div className="flex justify-center ">
                          <div className="items-center">
                            <div></div>
                            <Button
                              type="submit"
                              className="normal-case text-[#FFFFFF] rounded-[47px]   bg-gradient-to-r from-[#2934FE] to-[#BF32EC] lg:px-16 px-12 text-[12px]"
                            >
                              Reset Password
                            </Button>
                            <div></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {sent && (
              <div className="flex flex-col items-center justify-center text-center space-y-2">
                <div>
                  <div className="font-light  text-[12px] mb-4">
                    <p>Forgot your password</p>
                  </div>
                </div>
                <div className="font-semibold text-3xl">
                  <p>Check your email</p>
                </div>
                <div className="flex flex-row text-sm font-medium text-gray-400">
                  <p>We have sent you a code to reset your password!</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
