import { Card, Input, Button, Typography } from "@material-tailwind/react";
import Image from "next/image";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";
import BACKEND_URL from "@/apiUrl";

export default function Manager() {
  const [token, setToken] = useState("");
  useEffect(() => {
    if (typeof window !== "undefined") {
      setToken(
        document.cookie
          .split(";")
          .find((c) => c.includes("token"))
          .split("=")[1]
      );
    }
  }, []);

  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState();
  const [lastName, setLastName] = useState();
  const [phone, setPhone] = useState();
  const [dob, setDob] = useState();

  const handleChange = (e) => {
    if (e.target.id === "firstname") {
      setFirstName(e.target.value);
    } else if (e.target.id === "lastname") {
      setLastName(e.target.value);
    } else if (e.target.id === "phone") {
      setPhone(e.target.value);
    } else if (e.target.id === "dob") {
      setDob(e.target.value);
    } else if (e.target.id === "email") {
      setEmail(e.target.value);
    }
  };
  console.log(firstName, lastName, email, phone, dob);

  const handleSubmit = async (e) => {
    console.log("submit");
    console.log(firstName, lastName, email, phone, dob);
    // e.preventDefault();
    const data = {
    firstName: firstName,
      lastName: lastName,
      phoneNo: phone,
     email: email,
      dateOfBirth: dob,
    };

    console.log(data);
    console.log(token);

    try {
      // Make a POST request to your API endpoint
      const response = await axios.post(`${BACKEND_URL}/api/admins`, 
     data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Admin Added!", response.data);
      // toast.success("Admin Added Successfully");
      toast.success("Admin Added Successfully!", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      console.error("Error adding service:", error);
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
      <div className="container mx-auto px-4 lg:mt-[120px] mt-[120px]">
        <Typography
          variant="h3"
          color="white"
          className="text-center text-white text-4xl sm:text-5xl md:text-6xl lg:text-[60px] Anton uppercase"
        >
          Add A Admin
        </Typography>
        <div className="flex md:flex-row flex-col mt-10 items-center">
          <div className="ml-14 lg:px-16">
            <Image
              src="/assets/signup.png"
              width={300}
              height={300}
              alt="sign-up Iamge"
              priority={true}
              className="lg:block hidden"
            />
          </div>
          <div className="lg:ml-12">
            <Card color="transparent" shadow={false}>
              <form className="lg:mt-12  mb-2 w-full max-w-screen-lg lg:w-80 justify-start ">
                <div className="mb-1 flex flex-col gap-4">
                  <Typography variant="h6" color="white" className="-mb-3">
                    First Name
                  </Typography>
                  <Input
                    type="text"
                    color="white"
                    onChange={handleChange}
                    value={firstName}
                    id="firstname"
                    size="lg"
                    placeholder="ABC"
                    className=" !border-t-white focus:!border-t-white"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                  />
                  <Typography variant="h6" color="white" className="-mb-3">
                    Last Name
                  </Typography>
                  <Input
                    type="text"
                    color="white"
                    onChange={handleChange}
                    value={lastName}
                    id="lastname"
                    size="lg"
                    placeholder="XYZ"
                    className=" !border-t-white focus:!border-t-white"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                  />
                  <Typography variant="h6" color="white" className="-mb-3">
                    Phone Number{" "}
                    <span className="text-[#ffffff99] text-sm font-normal">
                      (10 digit number only)
                    </span>
                  </Typography>
                  <Input
                    onChange={handleChange}
                    value={phone}
                    color="white"
                    id="phone"
                    size="lg"
                    type="phone"
                    placeholder="xxx xxx xxxx"
                    className=" !border-t-white focus:!border-t-white"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                  />
                  <Typography variant="h6" color="white" className="-mb-3">
                    Date of Birth
                  </Typography>
                  <Input
                    onChange={handleChange}
                    value={dob}
                    color="white"
                    id="dob"
                    size="lg"
                    type="date"
                    placeholder="dd/mm/yyyy"
                    className=" !border-t-white focus:!border-t-white"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                  />

                  <Typography variant="h6" color="white" className="-mb-3">
                    Your Email
                  </Typography>
                  <Input
                    onChange={handleChange}
                    value={email}
                    type="email"
                    id="email"
                    size="lg"
                    color="white"
                    placeholder="name@mail.com"
                    className=" !border-t-white focus:!border-t-white"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                  />
                </div>

                <Button
                  onClick={handleSubmit}
                  className="mt-8 normal-case text-[#FFFFFF] rounded-[47px] bg-gradient-to-r from-[#2934FE] to-[#BF32EC] lg:py-3 lg:text-[16px] text-[12px]"
                  fullWidth
                >
                  Add Admin
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
