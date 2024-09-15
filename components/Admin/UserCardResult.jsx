import BACKEND_URL from '@/apiUrl';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

const UserCardResult = ({custType, _id}) => {

    // get the user data from the backend
    const [users, setUsers] = useState([]);

    const getData = async () => {
      const token = document.cookie
        .split(";")
        .find((c) => c.includes("token"))
        .split("=")[1];
      try{
        const response = await axios.get(
          `${BACKEND_URL}/api/customers/profile/`+_id,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log("ok",response.data);
        setUsers(response.data);
      }
      catch (error) {
        console.log(error);
      }
    };


    useEffect(() => {
      console.log('useEffect');
      getData();
    }, []);

    console.log("user", users);


  return (
    <>
    {/* {users && users.map((user, index) => (
        <UserCard key={index} {...user} />
      ))
    } */}
    </>
  )
}

export default UserCardResult