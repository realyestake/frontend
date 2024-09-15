import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
  Select,
  Option,
} from "@material-tailwind/react";
import Image from "next/image";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useRouter } from "next/router";
import { redirect } from "next/navigation";
import BACKEND_URL from "@/apiUrl";
import Link from "next/link";

export default function SignUp() {
  const router = useRouter();
  const [firstName, setFirstName] = useState();
  const [email, setEmail] = useState();
  const [lastName, setLastName] = useState();
  const [password, setPassword] = useState();
  const [phone, setPhone] = useState();
  const [address, setAddress] = useState();
  const [pincode, setPincode] = useState();
  const [dob, setDob] = useState();
  const [username, setUsername] = useState();
  const [selectedOption, setSelectedOption] = useState("individual");
  const [errors, setErrors] = useState({});


  function isValidDate(dob) {
    const dateRegex = /^(\d{4})-(\d{2})-(\d{2})$/;
    const match = dob.match(dateRegex);

    if (!match) {
      return false; // Invalid format
    }

    const year = parseInt(match[1], 10);
    const month = parseInt(match[2], 10);
    const day = parseInt(match[3], 10);
    const currentYear = new Date().getFullYear();

    // Check the ranges of month and day
    if (month < 1 || month > 12 || day < 1 || day > 31) {
      return false;
    }

    // Additional checks for different months
    if (
      (month === 4 || month === 6 || month === 9 || month === 11) &&
      day === 31
    ) {
      return false;
    }
    if (month === 2) {
      // February
      const isLeap = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
      if (day > 29 || (!isLeap && day > 28)) {
        return false;
      }
    }

    // Check year range if necessary, for example: not before 1900 and not in the future
    if (year < 1900 || year > currentYear) {
      return false;
    }

    return true;
  }


  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  function isEmpty(value) {
    return !value || value.trim() === "";
  }




  const handleChange = (e) => {
    if (e.target.id === "firstname") {
      setFirstName(e.target.value);
    } else if (e.target.id === "username") {
      setUsername(e.target.value);
    } else if (e.target.id === "lastname") {
      setLastName(e.target.value);
    } else if (e.target.id === "phone") {
      setPhone(e.target.value);
    } else if (e.target.id === "dob") {
      if (isValidDate(e.target.value)) {
        setDob(e.target.value);
      } else {
        alert("Invalid date. Please enter a valid date.");
        setDob("");
      }
    } else if (e.target.id === "address") {
      setAddress(e.target.value);
    } else if (e.target.id === "pincode") {
      setPincode(e.target.value);
    } else if (e.target.id === "option") {
      console.log(e.target.value);
      setSelectedOption(e.target.value);
    } else if (e.target.id === "email") {
      setEmail(e.target.value);
    } else if (e.target.id === "password") {
      setPassword(e.target.value);
    }
  };



  const validateFields = () => {
    let errors = {};

    if (isEmpty(username)) {
      errors.username = "Username is required.";
    }
    if (isEmpty(firstName)) {
      errors.firstName = "First Name is required.";
    }
   
    if (isEmpty(phone)) {
      errors.phone = "Phone Number is required.";
    }
    if (isEmpty(email)) {
      errors.email = "Email is required.";
    } else if (!isValidEmail(email)) {
      errors.email = "Please enter a valid email address.";
    }
    if (isEmpty(password)) {
      errors.password = "Password is required.";
    }
    if (isEmpty(address)) {
      errors.address = "Address is required.";
    }
    if (isEmpty(pincode)) {
      errors.pincode = "Pincode is required.";
    }
    if (isEmpty(dob)) {
      errors.dob = "Date of Birth is required.";
    }

    return errors;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateFields();
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      toast.error("Please fix the errors in the form.", {
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
      userName: username,
      firstName: firstName,
      lastName: lastName,
      phoneNo: phone,
      email: email,
      password: password,
      dateOfBirth: dob,
      address: address,
      pincode: pincode,
      custType: selectedOption,
    };
    
    try {
      const response = await axios.post(`${BACKEND_URL}/api/signup`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 201) {
        toast.success("Signup Successful!", {
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
          router.push(`/verify?email=${email}`);
        }, 1000);
      } else {
        toast.error("Signup Failed!", {
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
      toast.error(error.response?.data?.message || "Signup Failed!", {
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
      <div className="container mx-auto px-4 lg:mt-[102px]">
        <div className="flex md:flex-row flex-col mt-14 items-center">
          <div className="md:ml-14">
            <Image
              src="/assets/signup.png"
              width={300}
              height={300}
              alt="sign-up Iamge"
              priority={true}
            />
          </div>
          <div className="md:ml-16 ">
            <Card color="transparent" shadow={false}>
              <Typography
                variant="h4"
                color="white"
                className="lg:text-[34px] font-bold"
              >
                Register
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                Nice to meet you! Enter your details to register.
              </Typography>
              <form className="mt-4  mb-2 w-full">
                <div className="mb-1 flex flex-col gap-4">
                  <Typography variant="h6" color="white" className="-mb-3">
                    Username{" "}
                    <span className="font-medium text-red-500">*</span>
                  </Typography>
                  <div>
                    <Input
                      type="text"
                      placeholder="Username"
                      color="white"
                      onChange={handleChange}
                      value={username}
                      id="username"
                      size="lg"
                      className={`!border-t-white focus:!border-t-white ${
                        errors.username ? "border-red-500" : ""
                      }`}
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                    />
                     {errors.username && (
                      <Typography variant="small" color="red">
                        {errors.username}
                      </Typography>
                    )}
                  </div>
                  <Typography variant="h6" color="white" className="-mb-3">
                    First Name{" "}
                    <span className="font-medium text-red-500">*</span>
                  </Typography>
                  <Input
                    type="text"
                    color="white"
                    onChange={handleChange}
                    value={firstName}
                    id="firstname"
                    size="lg"
                    placeholder="ABC"
                    className={`!border-t-white focus:!border-t-white ${
                      errors.firstName ? "border-red-500" : ""
                    }`}
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                  />
                  {errors.firstName && (
                    <Typography variant="small" color="red">
                      {errors.firstName}
                    </Typography>
                  )}
                  <Typography variant="h6" color="white" className="-mb-3">
                    Last Name{" "}
                    {/* <span className="font-medium text-red-500">*</span> */}
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
                    <span className="font-medium text-red-500">*</span>
                  </Typography>
                  <Input
                    onChange={handleChange}
                    value={phone}
                    color="white"
                    id="phone"
                    size="lg"
                    type="phone"
                    placeholder="xxx xxx xxxx"
                    className={`!border-t-white focus:!border-t-white ${
                      errors.phone ? "border-red-500" : ""
                    }`}
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                  />
                  {errors.phone && (
                    <Typography variant="small" color="red">
                      {errors.phone}
                    </Typography>
                  )}
                  <Typography variant="h6" color="white" className="-mb-3">
                    Date of Birth{" "}
                    
                    <span className="font-medium text-[12px]">
                      [ First, Enter Year ]
                    </span>
                    {" "}
                    <span className="font-medium text-red-500">*</span>
                  </Typography>
                  <Input
                    onChange={handleChange}
                    value={dob}
                    color="white"
                    id="dob"
                    size="lg"
                    type="date"
                    placeholder="dd/mm/yyyy"
                    className={`!border-t-white focus:!border-t-white ${
                      errors.dob ? "border-red-500" : ""
                    }`}
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                  />
                  {errors.dob && (
                    <Typography variant="small" color="red">
                      {errors.dob}
                    </Typography>
                  )}
                  <Typography variant="h6" color="white" className="-mb-3">
                    Address{" "}
                    <span className="font-medium text-red-500">*</span>
                  </Typography>
                  <Input
                    onChange={handleChange}
                    color="white"
                    value={address}
                    id="address"
                    size="lg"
                    type="text"
                    placeholder="Street, City, State, Country"
                    className={`!border-t-white focus:!border-t-white ${
                      errors.address ? "border-red-500" : ""
                    }`}
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                  />
                  {errors.address && (
                    <Typography variant="small" color="red">
                      {errors.address}
                    </Typography>
                  )}
                  <Typography variant="h6" color="white" className="-mb-3">
                    Pincode{" "}
                    <span className="font-medium text-red-500">*</span>
                  </Typography>
                  <Input
                    onChange={handleChange}
                    color="white"
                    value={pincode}
                    id="pincode"
                    size="lg"
                    type="pincode"
                    placeholder="xxxxxx"
                    className={`!border-t-white focus:!border-t-white ${
                      errors.pincode ? "border-red-500" : ""
                    }`}
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                  />
                  {errors.pincode && (
                    <Typography variant="small" color="red">
                      {errors.pincode}
                    </Typography>
                  )}
                  {/* select one out of two options */}
                  <Typography variant="h6" color="white" className="-mb-3">
                    Customer Type{" "}
                    <span className="font-medium text-red-500">*</span>
                  </Typography>
                  <select
                    onChange={handleChange}
                    value={selectedOption}
                    id="option"
                    className="!border-t-white focus:!border-t-white py-2  px-1 bg-transparent text-white w-full rounded-lg border"
                    menuProps={{
                      className:
                        "p-2 bg-[#3A0242] border-none Satoshi font-normal text-[14px]",
                    }}
                  >
                    <option
                      value="individual"
                      className="bg-[#3A0242] rounded-none hover:bg-[#3A0242] text-white"
                    >
                      Individual
                    </option>
                    <option
                      value="bussiness"
                      className="bg-[#3A0242] rounded-none hover:bg-[#3A0242] text-white"
                    >
                      Bussiness
                    </option>
                  </select>
                  <Typography variant="h6" color="white" className="-mb-3">
                    Your Email{" "}
                    <span className="font-medium text-red-500">*</span>
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
                
                  <Typography variant="h6" color="white" className="-mb-3">
                    Password{" "}
                    <span className="font-medium text-red-500">*</span>
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
                </div>

                <Button
                  onClick={handleSubmit}
                  className="mt-4 normal-case text-[#FFFFFF] rounded-[47px] bg-gradient-to-r from-[#2934FE] to-[#BF32EC]"
                  fullWidth
                >
                  Sign Up
                </Button>
                <Typography
                  color="gray"
                  className="mt-4 text-center font-normal"
                >
                  Already have an account?{" "}
                  <Link href="/login" className="font-medium text-white">
                    Login
                  </Link>
                </Typography>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
