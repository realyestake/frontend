import BACKEND_URL from "@/apiUrl";
import Loader from "@/common/Loader";
import TransferRequest from "@/components/Admin/RequestCards/TransferRequest/TransferReq";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const DemoSingle = () => {
  const router = useRouter();
  const { id } = router.query;
  console.log("id", id);

  const [token, setToken] = useState("");
  const [propertyOwner, setPropertyOwner] = useState([]);
  const [transferDetails, setTransferDetails] = useState([]);
  const { push } = useRouter();
  const [loading, setLoading] = useState(false);

  const getDetails = async (id) => {
    const token =
      document.cookie &&
      document.cookie
        .split(";")
        .find((c) => c.includes("token"))
        .split("=")[1];
    console.log("token", token);
    if (!token) {
      push("/admin");
    }
    setLoading(true);
    try {
      const response = await axios.get(
        `${BACKEND_URL}/api/requests/transfer/${id}`,
        {
          headers: {
            "Content-Type": "application",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("data", response.data);
      setTransferDetails(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDetails(id);
  }, [id]);

  return (
    <div className="lg:mt-10 mt-4">
      {loading ? (
        <Loader />
      ) : (
        <TransferRequest transferData={transferDetails} />
      )}
    </div>
  );
};

export default DemoSingle;
