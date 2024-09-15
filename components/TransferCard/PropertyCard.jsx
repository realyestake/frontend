import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  Input,
  DialogFooter,
} from "@material-tailwind/react";
import SecondaryButton from "../Buttons/SecondaryButton";
import PrimaryButton from "../Buttons/PrimaryButton";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export function PropertyCard({
  firstName,
  lastName,
  pictures,
  _id,
  newOwnerId,
  name,
  newOwnerFirstName,
  newOwnerLastName,
  transferId
}) {

  console.log("newOwnerId", newOwnerId);
  console.log("transferId", transferId);

  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState("");
  const [token, setToken] = useState("");

  const handleOpen = () => {
    console.log("open", open);
    setOpen(!open);
  };

  const handleRejectBtn = () => {
    console.log("Reject button clicked");
    // console.log("Service ID", demoId);
    console.log(token);
    try {
      const response = axios.put(
        `https://api.realyestake.com/api/requests/transfer/${transferId}/decline`,
      {},
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
    // console.log("Service ID", demoId);
    console.log(token);
    console.log("newOwnerId", newOwnerId);
    console.log("idok", transferId)
    try {
      const response = axios.put(
        `https://api.realyestake.com/api/requests/transfer/${transferId}/approve`,
        {
          newOwner: newOwnerId,
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
    if (typeof window !== "undefined" && document.cookie) {
      setToken(
        document.cookie
          .split(";")
          .find((c) => c.includes("token"))
          .split("=")[1]
      );
    }
  }, [token]);


  return (
    <Card className="mt-6 w-full bg-[#160019] text-white py-[2rem]">
      <CardBody className="flex flex-col pl-[1rem] pr-[1rem] items-center text-center justify-center gap-[1.5rem]">
        <div className="flex flex-col gap-[1.5rem] justify-center text-center items-center">
          <img
            src={
              pictures
                ? pictures[0]
                : "https://s3-alpha-sig.figma.com/img/d3f9/c8ba/aad2294ab50858dc44cd71ea1563d75f?Expires=1705276800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=adB6z8Id6KS62HY73C9W307dcasqhI1wyJ7Y05Ao9eQIvZJHxh6yomtlWAs~sUTYdFVifOcMbttZhsDFGfHb6PefQ2fViOk1jVjuW17wGx1BmgsalDRyLc-5IDvTyBw1VSGLY54v453G3MSLrWLDNDHNe3Vc12vylI18mXVvnQOXN59f-0cGIY1sbvVfB3BgSbe5pVkjvW-5mzZI5Xbq9hLwSDckBFBenz0rT7u839pH30RHu~H~VHBCRAEf7m0fEUyYkT6iMhr0od2AyVtHTxwLh4Rvdt29f6OlKV9Uo8ckEY~mAkqefaHnmJQLCTzySsJ0SS8tMaQhpbF0ktOM2g__"
            }
            className="w-[10rem] h-[6rem]"
          />
          <div className="lg:block md:block xl:block 2xl:block hidden">
            <div className="rounded-full bg-white/20 p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-10 h-10"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
                />
              </svg>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 text-start justify-center">
          <Typography
            variant="h2"
            color="gray"
            className="text-md font-normal text-center text-white/90"
          >
            {name}
          </Typography>
          <Typography
            variant="h4"
            color="gray"
            className="text-sm text-center font-normal text-white/90"
          >
            Transfer from
            <span className="font-bold">
              {" "}
              {firstName} {lastName}
            </span>{" "}
            to {newOwnerFirstName} {newOwnerLastName}
          </Typography>
        </div>
      </CardBody>
      <CardFooter className="pt-0 w-full">
        <div className="flex flex-row gap-2  justify-between">
          <div className="w-full" 
          // onClick={handleOpen}
          onClick={handleRejectBtn}
          >
            <SecondaryButton
              title="Reject with Reason"
              customClassName="py-4"
            />
          </div>
          {/* <Dialog open={open} handler={handleOpen}>
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
            </Dialog> */}

          <div onClick={handleApproveBtn} className="w-full">
            <PrimaryButton title="Accept Request" customClassName="py-4" />
          </div>
        </div>
        <Link href={`/properties/${_id}`}>
          <Button className="bg-transparent border-2 rounded-full w-full mt-3 border-white">
            View Property
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
