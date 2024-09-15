import PrimaryButton from "@/components/Buttons/PrimaryButton";
import { Button, Typography } from "@material-tailwind/react";
import Image from "next/image";
import React from "react";
import axios from "axios";
import { useRouter } from "next/router";
import BACKEND_URL from "@/apiUrl";
import { ToastContainer, toast } from "react-toastify";

export const getStaticPaths = async () => {
  const result = await axios.get(`${BACKEND_URL}/api/requests/services`);
  const paths = result.data.map((property) => {
    return {
      params: { id: property._id.toString() },
    };
  });
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const id = context.params.id;
  const result = await axios.get(`${BACKEND_URL}/api/requests/services/${id}`);
  return {
    props: {
      services: result.data,
    },
  };
};

const ServiceSingle = ({ services }) => {
  // const router = useRouter()
  const { push } = useRouter();
  const [isBooked, setIsBooked] = React.useState("Book a Slot");

  const handleBookSlotBtn = async () => {
    if (isBooked === "Slot Booked") {
      // DONT CHANGE THE STATE AND DONT ALLOW TO BOOK AGAIN AND GIVE A MESSAGE SLOT IS ALREADY BOOKED
      alert("Slot Booked Already");
      return;
    }
    const serviceId = services[0]._id;
    try {
      if (document.cookie) {
        const token = document.cookie
          .split(";")
          .find((c) => c.includes("token"))
          .split("=")[1];
        const res = await axios.post(
          `${BACKEND_URL}/api/requests/service-requests`,
          {
            serviceId,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("res", res);
        if (res.status === 200) {
          alert("Slot Booked Successfully");
          setIsBooked("Slot Booked");
        }
      } else {
        // router.push("/login")
        toast.error("Login to Book a Slot", {
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
          push("/login");
        }, 1000);
      }
    } catch (error) {
      console.log(error);
      toast.error("Login to Book a Slot", {
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
        push("/login");
      }, 1000);
    }
  };
  const adjustImageUrl = (url) => {
    if (url.startsWith("http://")) {
      return url.replace("http://", "https://");
    }
    return url;
  };

  console.log("services", services[0].picture);
  return (
    <>
      {services && (
        <div className="container mx-auto px-6 lg:mt-[100px] mt-[50px] lg:pb-12">
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
          <div className="md:mt-4 mt-8">
            <Typography
              variant="h1"
              className="text-[#FFFFFF] Anton text-center lg:text-[60px] md:text-[40px] text-[30px] lg:font-normal md:font-extralight	font-extralight	 md:leading-[88.8px] leading-3"
            >
              SERVICES
            </Typography>
          </div>
          <div className="lg:mt-4 mt-8 py-6">
            <Typography
              variant="h1"
              className="text-[#FFFFFF] Anton text-left lg:text-[40px] md:text-[30px] text-[20px] lg:font-normal md:font-extralight	font-extralight	 md:leading-[60.21px] leading-3"
            >
              {services[0].name}
            </Typography>
          </div>
          <div className="flex md:flex-row flex-col justify-between gap-6 lg:mt-3 mt-5 mb-8">
            <div className="w-full h-full ">
              <Image
                src={
                  adjustImageUrl(services[0].picture) ||
                  "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvcGVydHl8ZW58MHx8MHx8fDA%3D"
                }
                alt="card-image"
                height={457}
                width={487}
              />
            </div>
            <div className="flex flex-col justify-start w-full">
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-2   text-white/70"
              >
                <span className="font-bold text-white/90">Details: </span>
                {/* A paragraph is defined as “a group of sentences or a single sentence that forms a unit” (Lunsford and Connors 116). Length and appearance do not determine whether a section in a paper is a paragraph. For instance, in some styles of writing, particularly journalistic styles, a paragraph can be just one sentence long. */}
                {services[0].description}
              </Typography>
              <div className="lg:mt-4 mt-6 flex  justify-between items-end">
                <div>
                  <Typography
                    variant="h3"
                    color="white"
                    className="mb-2  text-white lg:text-[16px] text-[14px]"
                  >
                    Expected Price₹ 15.55 L
                  </Typography>
                </div>
                <Button onClick={handleBookSlotBtn}  className="text-[#FFFFFF] rounded-[47px] lg:text-[14px] text-[12px] normal-case  bg-gradient-to-r from-[#2934FE] to-[#BF32EC]">
                  {isBooked}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ServiceSingle;
