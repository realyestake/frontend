import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { Typography } from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/solid";

// Components
import SearchResults from "./SearchResults";
import SecondaryButton from "@/components/Buttons/SecondaryButton";
import PrimaryButton from "@/components/Buttons/PrimaryButton";
import BACKEND_URL from "@/apiUrl";
import { ToastContainer, toast } from "react-toastify";

const EditPropertyRequest = ({ data }) => {
  // State definitions
  console.log("data", data);
  const [ownerName, setOwnerName] = useState("");
  const [propName, setPropName] = useState("");
  const [business, setBusiness] = useState("");
  const [estimatedPrice, setEstimatedPrice] = useState("");
  const [showcase, setShowcase] = useState("");
  const [address, setAddress] = useState("");
  const [sale, setSale] = useState("");
  const [results, setResults] = useState([]);
  const [propDetails, setPropDetails] = useState("");
  const [description, setDescription] = useState("");
  const [source, setSource] = useState("/assets/image.png");
  const [submitting, setSubmitting] = useState(false);
  const [token, setToken] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const [videoLinks, setVideoLinks] = useState([]);
  const [dLink, setDLink] = useState("");
  const [pincode, setPincode] = useState("");
  const [showVideo, setShowVideo] = useState(false);
  const [images, setImages] = useState([]); // for general property images
  const [floorPlanImages, setFloorPlanImages] = useState([]); // for floor plan images
  const [fileInput, setFileInput] = useState("");
  const [streetViewLink, setStreetViewLink] = useState(""); // New state for Street View link

  // Effect for setting the token from cookies
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

  React.useEffect(() => {
    setPropName(data.name);
    setEstimatedPrice(data.price);
    setSale(data.sale);
    setPropDetails(data.details);
    setSource(data.source);
    setAddress(data.address);
    setPincode(data.pincode);
    setVideoLinks(data.videos);
    setImages(data.pictures);
    setDLink(data.threeDView);
    setShowVideo(true);
    setFloorPlanImages(data.floorPlan);

  }, [data]);

  // Handlers
  const handlePincodeChange = (e) => {
    const input = e.target.value;
    if (input === "" || /^\d+$/.test(input)) {
      setPincode(input);
    } else {
      alert("Please enter a valid number");
      setPincode("");
    }
  };

  const handleStreetViewChange = (e) => {
    setStreetViewLink(e.target.value);
  };

  const handleAddLink = () => {
    if (videoLink.trim() !== "") {
      setVideoLinks([...videoLinks, videoLink]);
      setVideoLink("");
    }
  };

  const handleAdd3dLink = () => {
    if (dLink.trim() !== "") {
      setShowVideo(true);
      setDLink("");
    }
  };

  const getData = async (value) => {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/api/customers/s?q=${value}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setResults(response.data);
    } catch (error) {
      console.error(error);
    }
  };


  const handleOptionChange = (e) => {
    setSale(e.target.value);

  };

  const handlePriceChange = (e) => {
    const input = e.target.value;
    if (input === "" || /^\d+$/.test(input)) {
      setEstimatedPrice(input);
    } else {
      alert("Please enter a valid number");
      setEstimatedPrice("");
    }
  };

  const handleCancelBtn = (index) => {
    const updatedLinks = [...videoLinks];
    updatedLinks.splice(index, 1);
    setVideoLinks(updatedLinks);
  };

  const handleFileInput = (e) => {
    const files = Array.from(e.target.files);
    const imageFiles = files.filter((file) => file.type.startsWith("image/"));
    const imagePreviews = imageFiles.map((file) => URL.createObjectURL(file));
    setImages([...images, ...imagePreviews]);
  };

  const [url, setUrl] = useState("");
  const [embedUrl, setEmbedUrl] = useState("");

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
    updateEmbedUrl(e.target.value);
  };

  const updateEmbedUrl = (url) => {
    const apiKey =
      "https://www.google.com/maps/place/Greets+Public+School/@9.9996182,76.2932396,3a,75y,254.2h,90t/data=!3m7!1e1!3m5!1so7I8bSl3_h5mfFwScOUNFQ!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fpanoid%3Do7I8bSl3_h5mfFwScOUNFQ%26cb_client%3Dsearch.gws-prod.gps%26w%3D211%26h%3D120%26yaw%3D254.19803%26pitch%3D0%26thumbfov%3D100!7i13312!8i6656!4m16!1m8!3m7!1s0x3b080d6b15fcf3db:0xeb86e2e27cdaae1a!2sGreets+Public+School!8m2!3d9.9995353!4d76.2929429!10e5!16s%2Fg%2F1td40y4b!3m6!1s0x3b080d6b15fcf3db:0xeb86e2e27cdaae1a!8m2!3d9.9995353!4d76.2929429!10e5!16s%2Fg%2F1td40y4b?coh=205409&entry=ttu";
    const match = url.match(
      /@([-.\d]+),([-.\d]+),(\d+)a,(\d+)y,([-\d.]+)h,([-\d.]+)t/
    );
    if (match) {
      const [, lat, lng, , , heading, pitch] = match;
      const embedBase = "https://www.google.com/maps/embed/v1/";
      const params = `streetview?key=${apiKey}&location=${lat},${lng}&heading=${heading}&pitch=${pitch}`;
      setEmbedUrl(`${embedBase}${params}`);
    }
  };



  const handleFloorFileInput = (e) => {
    const files = Array.from(e.target.files);
    const floorPlanFiles = files.filter((file) =>
      file.type.startsWith("image/")
    );
    const floorPlanPreviews = floorPlanFiles.map((file) =>
      URL.createObjectURL(file)
    );
    setFloorPlanImages([...floorPlanImages, ...floorPlanPreviews]);
  };

  const handleRemoveImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const handleRemoveFloorPlanImage = (index) => {
    const newFloorPlanImages = [...floorPlanImages];
    newFloorPlanImages.splice(index, 1);
    setFloorPlanImages(newFloorPlanImages);
  };

  const handleUpdateProperty = async (e) => {
    e.preventDefault();
    if (submitting) return;

    // const propertyData = {
    //   ownerName,
    //   propName,
    //   estimatedPrice,
    //   videoLinks,
    //   description,
    //   sale,
    //   source,
    // };


    const propertyData = {
      name: propName,
      price: estimatedPrice,
      address: address,
      details: propDetails,
      floorPlan: floorPlanImages,
      listingType: sale,
      pictures: images,
      pincode: pincode,
      videos: videoLinks,
      threeDView: dLink,
      propertyType: sale,
      mapView: streetViewLink,
    }

    console.log("Prop Data", propertyData);

    setSubmitting(true);

    try {
      const response = await axios.put(
        `${BACKEND_URL}/api/properties/edit/${data._id}`,
        propertyData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Property updated successfully:", response.data);
      if (response && response.data && response.data.message === 'Property Updated') {
        toast.success('Property updated successfully');
      }
      else {
        toast.error('Error updating property');
      }
    } catch (error) {
      console.error("Error updating property:", error);
      toast.error('Error updating property');
    } finally {
      setSubmitting(false);
    }
  };

  function getYouTubeVideoId(url) {
    const regex =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  }
  
  if(!data) return (
    <div className="flex justify-center items-center h-screen">
      <Typography className="text-white">Loading...</Typography>
    </div>
  )

  return (
    <>
      <div
        className={` container mx-auto min-h-screen items-center justify-between bg-[#160019] py-24 px-10 `}
      >
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

            <Typography className="text-gray-500  lg:text-[32px] text-[24px] font-normal Outfit">
              Property Details / <span className="text-white">Edit</span>
            </Typography>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <div className="w-full max-w-[45rem] mt-10">
            <label className="text-white ">
              Change Property Name
            </label>
            <input
              type="text"
              value={propName} // Add value attribute to reflect the state
              onChange={(e) => setPropName(e.target.value)} // Add onChange to update the state
              className="w-full p-2 border rounded bg-transparent text-white mt-1"
              placeholder="Property Name"
            />
          </div>
          <div className="w-full max-w-[45rem] mt-5">
            <label className="text-white ">Property Type</label>
            <div>
              <select
                onChange={handleOptionChange}
                value={sale} // Add value attribute to reflect the state
                id="option"
                className="!border-t-white rounded p-3 focus:!border-t-white mt-2 py-3 px-1 bg-transparent text-white w-full  border"
                menuProps={{
                  className:
                    "p-2 bg-[#3A0242] border-none Satoshi font-normal text-[14px]",
                }}
              >
                <option
                  value="Sale"
                  className="bg-black rounded-none hover:bg-[#3A0242] text-white"
                >
                  Sale
                </option>
                <option
                  value="Lease"
                  className="bg-black rounded-none hover:bg-[#3A0242] text-white"
                >
                  Lease
                </option>
                <option
                  value="Rent"
                  className="bg-black rounded-none hover:bg-[#3A0242] text-white"
                >
                  Rent
                </option>
              </select>
            </div>
          </div>

          <div className="w-full max-w-[45rem] mt-6">
           
            {/* <div>
              <select
                onChange={handleOptionChange}
                value={business} // Add value attribute to reflect the state
                id="option"
                className="!border-t-white rounded p-3 focus:!border-t-white mt-2 py-3 px-1 bg-transparent text-white w-full  border"
                menuProps={{
                  className:
                    "p-2 bg-[#3A0242] border-none Satoshi font-normal text-[14px]",
                }}
              >
                <option
                  value="bussiness"
                  className="bg-black rounded-none hover:bg-[#3A0242] text-white"
                >
                  Bussiness
                </option>
                <option
                  value="individual"
                  className="bg-black rounded-none hover:bg-[#3A0242] text-white"
                >
                  Individual
                </option>

              </select>
            </div> */}
          </div>
{/* 
          <div className="w-full max-w-[45rem] mt-6">
            <label className="text-white ">Listing Type
              {" [ "}
              <span className="text-gray-500 font-bold Outfit normal-case">
                {data.listingType}
              </span>{" "}
              {" ]"}
            </label>
            <div>
              <select
                onChange={handleOptionChange}
                value={showcase} // Add value attribute to reflect the state
                id="option"
                className="!border-t-white rounded p-3 focus:!border-t-white mt-2 py-3 px-1 bg-transparent text-white w-full  border"
                menuProps={{
                  className:
                    "p-2 bg-[#3A0242] border-none Satoshi font-normal text-[14px]",
                }}
              >
                <option
                  value="showcase"
                  className="bg-black rounded-none hover:bg-[#3A0242] text-white"
                >
                  Showcase
                </option>
              </select>
            </div>
          </div> */}

          <div className="w-full max-w-[45rem] mt-5">
            <div className="w-full  flex flex-row border py-1 rounded mt-1">
              <input
                size="lg"
                placeholder="Price"
                color="white"
                value={estimatedPrice} // Add value attribute to reflect the state
                onChange={handlePriceChange} // Add onChange to update the state
                className=" w-full focus:outline-none p-2  bg-transparent  justify-center h-[35px]  text-white"
              />
            </div>
          </div>
          <div className="w-full max-w-[45rem] mt-6">
            <label className="text-white ">
              Change Address {"[ "}
              <span className="text-gray-500 font-bold Outfit">
                {data.name}
              </span>{" "}
              {" ]"}
            </label>
            <textarea
              type="text"
              onChange={(e) => setAddress(e.target.value)}
              value={address}
              className="w-full p-2 border rounded bg-transparent text-white mt-1"
              placeholder="Add Address"
            />
          </div>
          <div className="w-full max-w-[45rem] mt-5">
            <label className="text-white ">Change Pincode [ ]</label>
            <div className="w-full  flex flex-row border py-1 rounded mt-1">
              <input
                size="lg"
                placeholder="Enter Pincode"
                color="white"
                value={pincode}
                onChange={handlePincodeChange}
                className=" w-full focus:outline-none p-2  bg-transparent  justify-center h-[35px]  text-white"
              />
            </div>
          </div>
          <div className="w-full max-w-[45rem] mt-6">
            <label className="text-white ">
              Change Property Details {"[ "}
              <span className="text-gray-500 font-bold Outfit">
                {data.name}
              </span>{" "}
              {" ]"}
            </label>
            <textarea
              type="text"
              value={propDetails}
              onChange={(e) => setPropDetails(e.target.value)}
              className="w-full p-2 border rounded bg-transparent text-white mt-1"
              placeholder="Add Property Details"
            />
          </div>

          <div className="w-full max-w-[45rem] mt-5">
            <label className="text-white ">Add Youtube Video Links</label>
            <div className="flex flex-row mt-1 gap-2">
              <div className="w-full  flex flex-row border py-1 justify-between rounded ">
                <input
                  size="lg"
                  placeholder="Enter Video Link"
                  value={videoLink}
                  onChange={(e) => setVideoLink(e.target.value)}
                  className="w-full focus:outline-none p-2 bg-transparent justify-center h-[35px] text-white"
                />
              </div>
              <div onClick={handleAddLink}>
                <SecondaryButton
                  title="Add"
                  customClassName="py-[10px] px-[60px] text-[16px]"
                />
              </div>
            </div>

            <div className="w-full max-w-[45rem] mt-4">
              {videoLink && videoLinks.length > 0 && (
                <div className="mt-6 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-2">
                  {videoLinks.map((link, index) => (

                    <div key={index} className="">
                      <div className="">
                        <Image
                          src={`https://img.youtube.com/vi/${getYouTubeVideoId(
                            link
                          )}/maxresdefault.jpg`}
                          width={250}
                          height={159}
                          className="rounded-[8px] border border-gray-500 "
                        />
                      </div>
                      <XMarkIcon
                        className="relative h-4 w-4 border rounded-full bottom-[125px] right-[-210px] bg-white text-black "
                        onClick={() => handleCancelBtn(index)}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="w-full max-w-[45rem] mt-0 mb-1 flex flex-col gap-6 justify-center">
            <div class="pt-4">
              <label class="mb-4 block  font-semibold text-[#FFFFFF]">
                Upload Photos
              </label>

              <div class="">
                <input
                  type="file"
                  name="file"
                  color="white"
                  class="sr-only"
                  onChange={handleFileInput}
                  value={fileInput}
                  multiple
                  id="generalPhotosInput"
                />
                <label
                  for="generalPhotosInput"
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
                      Upload Photos
                    </span>
                  </div>
                </label>
              </div>
            </div>
            <div class="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 justify-center gap-2">
              {images && images.map((imageUrl, index) => (
                <div key={index} class="relative h-48 overflow-hidden">
                  <Image
                    src={imageUrl}
                    alt={`Image ${index + 1}`}
                    width={250}
                    height={150}
                    className="object-cover min-w-full min-h-full"
                  />
                  <button
                    onClick={() => handleRemoveImage(index)}
                    class="absolute top-1 right-1 bg-red-500  rounded-full text-white font-medium px-2 py-0"
                  >
                    X
                  </button>
                </div>
              ))}
            </div>

            <div className="w-full max-w-[45rem] mt-5">
              <label className="text-white ">Add 3D Link [ ]</label>
              <div className="flex flex-row mt-1 gap-2">
                <div className="w-full  flex flex-row border py-1 justify-between rounded ">
                  <input
                    size="lg"
                    placeholder="Enter Video Link"
                    value={dLink}
                    onChange={(e) => setDLink(e.target.value)}
                    className="w-full focus:outline-none p-2 bg-transparent justify-center h-[35px] text-white"
                  />
                </div>
                <div onClick={handleAdd3dLink}>
                  <SecondaryButton
                    title="Add"
                    customClassName="py-[10px] px-[60px] text-[16px]"
                  />
                </div>
              </div>

              <div className="w-full max-w-[45rem] mt-4">
                {showVideo && (
                  <div className="">
                    <iframe
                      src={dLink}
                      title="3D Video"
                      allowFullScreen
                      className="w-full h-[320px] rounded-[16px]"
                    ></iframe>
                  </div>
                )}
              </div>
            </div>

            <div class="pt-4">
              <label class="mb-4 block  font-semibold text-[#FFFFFF]">
                Upload Images of Floor Plan
              </label>

              <div class="">
                <input
                  type="file"
                  name="file"
                  color="white"
                  class="sr-only"
                  className="file-input sr-only"
                  accept="image/*"
                  multiple
                  onChange={handleFloorFileInput}
                  id="floorPlanInput"
                />
                <label
                  for="floorPlanInput"
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
                      Upload Images
                    </span>
                  </div>
                </label>
              </div>
            </div>
            <div class="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 justify-center gap-2">
              {/* show floor images */}
              {floorPlanImages && floorPlanImages.map((imageUrl, index) => (
                <div key={index} class="relative h-48 overflow-hidden">
                  <Image
                    src={imageUrl}
                    alt={`Floor Plan Image ${index + 1}`}
                    width={250}
                    height={150}
                    className="object-cover min-w-full min-h-full"
                  />
                  <button
                    onClick={() => handleRemoveFloorPlanImage(index)}
                    class="absolute top-1 right-1 bg-red-500  rounded-full text-white font-medium px-2 py-0"
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* <label className="text-white ">Add Street Video Link [ ]</label>
            <div className="flex flex-row mt-1 gap-2">
              <div className="w-full  flex flex-row border py-1 justify-between rounded ">
                <input
                  size="lg"
                  className="w-full focus:outline-none p-2 bg-transparent justify-center h-[35px] text-white"
                  // placeholder="Enter Street View Link"
                  value={url}
                  onChange={handleUrlChange}
                  placeholder="Paste Google Maps URL here"
                />
              </div>
              <div onClick={handleAddLink}>
                <SecondaryButton
                  title="Add"
                  customClassName="py-[10px] px-[60px] text-[16px]"
                />
              </div>
            </div> */}

          <div className="w-full max-w-[45rem] mt-4">
            {embedUrl && (
              <iframe
                src={embedUrl}
                width="600"
                height="450"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            )}
            {/* use carsoul*/}
          </div>

          <div className="w-full max-w-[45rem] mt-6 ">
            <Typography className="text-white">
              <span>
                <input
                  type="checkbox"
                  onChange={(e) => setPropName(e.target.value)}
                  className="p-2 border rounded bg-transparent text-white mt-1"
                  placeholder="Add Property Details"
                />
              </span>{" "}
              Mark Property as Premium
            </Typography>
          </div>
        </div>
        <div className="mt-10 flex flex-row w-full justify-between max-w-[45rem]">
          <div></div>
          <div></div>
          <div className="flex flex-row justify-between gap-2">
            <SecondaryButton title="Cancel" />
            <div onClick={handleUpdateProperty}>
              <PrimaryButton title={submitting ? "Saving..." : "Save Changes"} />
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default EditPropertyRequest;
