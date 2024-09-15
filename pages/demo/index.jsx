import { Typography } from "@material-tailwind/react";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import BACKEND_URL from "@/apiUrl";

export default function Home() {
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState();
  const [selectedOption, setSelectedOption] = useState("individual");
  const [company, setCompany] = useState();
  const [industry, setIndustry] = useState();

  const handleChange = (e) => {
    if (e.target.id === "firstName") {
      setfirstName(e.target.value);
    } else if (e.target.id === "lastName") {
      setlastName(e.target.value);
    } else if (e.target.id === "email") {
      setEmail(e.target.value);
    } else if (e.target.id === "phone") {
      setPhone(e.target.value);
    } else if (e.target.id === "option") {
      setSelectedOption(e.target.value);
    } else if (e.target.id === "company") {
      setCompany(e.target.value);
    } else if (e.target.id === "industry") {
      setIndustry(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // any field is empty then return
    if (
      firstName === "" ||
      lastName === "" ||
      email === "" ||
      phone === "" ||
      (selectedOption === "business" && (company === "" || industry === ""))
    ) {
      toast.error("Please fill all the fields", {
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
      firstName: firstName,
      lastName: lastName,
      phoneNo: phone,
      email: email,
      company: company,
      industry: industry,
    };

    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/requests/demo-unreg`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);

      if (response.status === 200) {
        document.cookie = `token=${response.data.token}; expires=${new Date(
          new Date().getTime() + 1000 * 60 * 60 * 24 * 7
        ).toUTCString()}; path=/; sameSite=strict;`;

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
      console.log(error.response.data.message);
      if (error.response.status === 400) {
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
        console.log(error.response.status);
      } else {
        alert(error);
      }
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
      <div className="container  mx-auto md:min-h-screen md:mt-[100px] mt-[46px] lg:w-[640px]">
        <div className=" flex flex-col items-center  justify-center bg-[#160019]   ">
          <div className="mt-5 mb-[1.5rem] px-10 text-center">
            <Typography className="text-white lg:text-[60px] md:text-[47px] text-[30px] Anton">
              LOOKING FOR A
              <span className="bg-gradient-to-r from-[#2934FE] to-[#BF32EC] text-transparent bg-clip-text pl-3">
                DEMO ?
              </span>
            </Typography>
            <Typography className="text-white/50 md:text-[16px] text-[12px] mt-[1rem]">
              More than just walls and floors, we capture the atmosphere. Watch
              how we use <br /> lighting, angles, and movement to highlight your
              property&apos;s essence
            </Typography>
          </div>
        </div>
        <div className="lg:py-8 py-4 items-center px-4">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 md:text-[16px] text-[12px]">
            <div className="flex md:flex-row flex-col lg:gap-3 gap-2 justify-between">
              <div className="flex flex-col w-full">
                <label htmlFor="option" className="text-white">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="firstName"
                  type="text"
                  color="lightBlue"
                  size="regular"
                  placeholder="First Name"
                  onChange={handleChange}
                  className="p-2 md:text-[16px] text-[12px] rounded-md bg-transparent border"
                />
              </div>
              <div className="flex flex-col w-full">
                <label htmlFor="option" className="text-white">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="lastName"
                  type="text"
                  color="lightBlue"
                  size="regular"
                  placeholder="Last Name"
                  onChange={handleChange}
                  className="p-2 md:text-[16px] text-[12px] rounded-md bg-transparent border"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <label htmlFor="email" className="text-white">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                type="email"
                color="lightBlue"
                size="regular"
                placeholder="Email"
                onChange={handleChange}
                className="p-2 md:text-[16px] text-[12px] rounded-md bg-transparent border"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="phone" className="text-white">
                Phone <span className="text-red-500">*</span>
              </label>
              <input
                id="phone"
                type="text"
                color="lightBlue"
                size="regular"
                placeholder="xxx xxx xxxx"
                onChange={handleChange}
                className="p-2 md:text-[16px] text-[12px] rounded-md bg-transparent border"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="option" className="text-white">
                Customer Type
              </label>
              <select
                id="option"
                onChange={handleChange}
                className="p-2  rounded-md bg-transparent border md:text-[16px] text-[12px]"
              >
                <option value="individual" className="md:text-[16px] text-[12px] text-black p-2">
                  Individual
                </option>
                <option value="business" className="md:text-[16px] text-[12px] text-black p-2">
                  Business
                </option>
              </select>
            </div>

            {selectedOption === "business" && (
              <>
                <div className="flex flex-col gap-1">
                  <label htmlFor="company" className="text-white">
                    Company <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="company"
                    type="text"
                    color="lightBlue"
                    size="regular"
                    placeholder="Company"
                    onChange={handleChange}
                    className="p-2  rounded-md bg-transparent border"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="company" className="text-white">
                    Industry <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="industry"
                    type="text"
                    color="lightBlue"
                    size="regular"
                    placeholder="Industry"
                    onChange={handleChange}
                    className="p-2  rounded-md bg-transparent border"
                  />
                </div>
              </>
            )}
            <button
              type="submit"
              className="Outfit font-bold bg-gradient-to-r from-[#2934FE] to-[#BF32EC] text-white/90 p-2 rounded-md md:text-[16px] text-[14px]"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
