import { NavigationBar } from "@/components/Admin/AdminNavigation";
import React, { useEffect, useState } from "react";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import SecondaryButton from "@/components/Buttons/SecondaryButton";
import axios from "axios";
import BACKEND_URL from "@/apiUrl";
import { ToastContainer, toast } from "react-toastify";
import { set } from "date-fns";

const AddService = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [estimatedPrice, setEstimatedPrice] = useState();
  const [fileInput, setFileInput] = useState("");
  const [source, setSource] = useState("");
  const [submitting, setSubmitting] = useState(false); // State to manage form submission status
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

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      previewFile(file);
      uploadFileToCloud(file);
      
    } else {
      toast.error("Only image files are allowed", {
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

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setSource(reader.result);
    };
  };

  const [imgUrl, setImgUrl] = useState(null);


  const uploadFileToCloud=(source)=>{
    const data = new FormData();
    data.append("file", source);
    data.append("upload_preset", "realyes");
    data.append("cloud_name", "dw5nspymf");
    fetch("https://api.cloudinary.com/v1_1/dw5nspymf/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("data", data);
        console.log("data.url", data.url);
        setImgUrl(data.url);
      })
      .catch((err) => {
        console.log("err", err);
      }
    )
  }

  const handleFileSubmit = async (e) => {
    e.preventDefault();

    // Prevent multiple submissions while the form is being processed
    if (submitting) return;
    // uploadFileToCloud(source);

    if (!imgUrl || !title || !description || !estimatedPrice) return;

    setSubmitting(true); // Start form submission process

    

    const data = {
      name: title,
      description: description,
      price: estimatedPrice,
      picture: imgUrl,
    };

    console.log("dataaa", data);

    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/requests/services`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Service added successfully:", response.data);
      toast.success("Service Added!", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setTitle("");
      setDescription("");
      setEstimatedPrice("");
      setSource(null);

    } catch (error) {
      console.error("Error adding service:", error);
    } finally {
      setSubmitting(false); // Reset form submission status after completion
    }
  };

  const handlePriceChange = (e) => {
    const input = e.target.value;
    // Validate if the input is a number or empty
    if (input === "" || /^\d+$/.test(input)) {
      setEstimatedPrice(input);
      // Remove the red border if it exists
    } else {
      // Add red border for invalid input
      alert("Please enter a valid number");
      setEstimatedPrice("");
      // Optionally, you can display an error message or handle invalid input here
    }
  };

  const handleRemoveImage = () => {
    setSource(null);
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
      <div className="mt-[100px] container mx-auto px-4">
        <div className="">
          <Typography
            variant="h1"
            className="text-[#FFFFFF] Anton text-center lg:text-[60px] md:text-[40px] text-[26px] lg:font-normal md:font-extralight	font-extralight	 md:leading-[88.8px] leading-3"
          >
            ADD A NEW{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2934FE] to-[#BF32EC]">
              SERVICE
            </span>
          </Typography>
        </div>
        <div className="flex flex-row justify-center">
          <form className="mt-8 mb-2 lg:w-3/6 w-full mx-3">
            <div className="mb-1 flex flex-col gap-6">
              <Typography variant="h6" color="white" className="-mb-3">
                Add Title
              </Typography>

              <Input
                type="text"
                color="white"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                id="title"
                size="lg"
                placeholder="Title"
                className=" !border-t-white focus:!border-t-white"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
            </div>
            <div className="mb-1 flex flex-col gap-6 justify-center">
              <div class="pt-4">
                <label class="mb-4 block  font-semibold text-[#FFFFFF]">
                  Upload File
                </label>

                <div class="">
                  <input
                    type="file"
                    name="file"
                    id="file"
                    color="white"
                    class="sr-only"
                    onChange={handleFileInput}
                    value={fileInput}
                  />
                  <label
                    for="file"
                    class="relative flex min-h-[200px] items-center justify-center rounded-md border border-dashed border-[#e0e0e0] p-12 text-center"
                  >
                    <div>
                      <span class="mb-3 block text-[14px]  font-normal text-[#FFFFFF] leading-[17.64px]">
                        Drag and drop your files anywhere or
                      </span>
                      {/* <span class="mb-2 block text-base font-medium text-[#FFF]">
                        Or
                      </span> */}
                      <span className="inline-flex border border-[#FB3C98] text-[#FB3C98] py-2 px-5 rounded-[47px] bg-[white]">
                        Upload a file
                      </span>
                    </div>
                  </label>
                </div>
              </div>
              <div class="flex flex-row justify-center">
                {source && (
                  <div className="relative w-full max-w-xs sm:max-w-sm  xl:max-w-md h-auto shadow-2xl shadow-black py-2 ">
                    <img
                      className="w-full h-auto rounded-lg"
                      src={source}
                      alt="image"
                    />
                    <div
                      onClick={handleRemoveImage}
                      className="absolute top-1 right-1 border px-2 py-[2px] border-[#FB3C98] text-[#FB3C98] bg-white  cursor-pointer rounded-[100%]"
                    >
                      X
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="mb-1 flex flex-col gap-4 mt-4">
              <Typography variant="h6" color="white" className="mb-1">
                Add Description
              </Typography>
              <textarea
                className="resize rounded-md border-white border focus:!border-t-gray-900 bg-transparent items-center p-2"
                placeholder="Describe"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={{ height: "200px", width: "100%" }}
              ></textarea>
            </div>
            <div className="mb-1 flex flex-col gap-6 mt-6">
              <Typography variant="h6" color="white" className="-mb-3">
                Add Estimated Price
              </Typography>

              <Input
                size="lg"
                placeholder="Price"
                color="white"
                value={estimatedPrice}
                onChange={handlePriceChange}
                className=" !border-t-white focus:!border-t-white"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
            </div>
            <div className="flex flex-row justify-between my-10">
              <div></div>
              <div></div>
              <Button
                className="px-12 bg-white text-black"
                onClick={handleFileSubmit}
              >
                {submitting ? "Adding..." : "Add Service"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddService;
