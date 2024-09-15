import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import axios from "axios";
import BACKEND_URL from '@/apiUrl';
import EditPropertyRequest from '@/components/Admin/RequestCards/RequestPages/Edit/EditProperty';

export async function getServerSideProps(context) {
  const propertyId = context.params.propertyId;
  return {
    props: {
      propertyId: propertyId,
    },
  };
}

const EditProperty = ({ propertyId }) => {
  const [data, setData] = useState(null);

  const getPropertyData = async (propertyId) => {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/api/properties/view/${propertyId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = response.data;
      console.log("Property data:", data);
      setData(data);
    } catch (error) {
      console.error("Error fetching property data:", error);
    }
  }

  useEffect(() => {
    if (propertyId) {
      getPropertyData(propertyId);
    }
  }, [propertyId]);

  return (
    <>
      {data ? <EditPropertyRequest
        data={data}
      /> : <p>Loading...</p>} {/* Conditional rendering */}
    </>
  );
}

export default EditProperty;
