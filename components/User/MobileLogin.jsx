import { BellIcon } from '@heroicons/react/24/solid'
import { Avatar, IconButton, Typography } from '@material-tailwind/react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import BACKEND_URL from '@/apiUrl'

const MobileLoginUser = ({logout}) => {
  const [dropdown, setDropdown] = useState(false);
  const [token, setToken] = useState(null);

  const [profile, setProfile] = useState({});
  const [profilePicUrl, setProfilePicUrl] = useState(null);

  const getProfile = async () => {
    console.log('get profile');
    try {
      console.log('token', token  )
      const response = await axios.get(BACKEND_URL + '/api/customers/user-profile/', {
        headers: {
          'Content-Type': 'application',
          Authorization: `Bearer ${token}`
        }
      });
      setProfile(response.data);
      setProfilePicUrl(response.data.refUserId.profilePicture);
    }
    catch (error) {
      console.log(error);
      // toast.error('Error fetching profile');
    }

  }

  
  useEffect(() => {
    if (typeof window !== 'undefined' && document.cookie) {
      setToken(document.cookie.split(';').find(c => c.includes('token')).split('=')[1]);
    }
    getProfile();
    
  }, [token]);

  return (
    <>
        {/* <IconButton variant="text" color="white">
            <BellIcon className="h-7 w-7" />
          </IconButton> */}
          <div onMouseOver={()=>{setDropdown(true)}}
            onMouseLeave={()=>{setDropdown(false)}}>
          {dropdown && (
            <div onMouseOver={()=>{setDropdown(true)}}
            onMouseLeave={()=>{setDropdown(false)}} className="py-1 absolute top-0 right-20  border border-gray-800 text-white rounded-md px-5 w-30">
            <div className={`flex flex-col gap-y-2`}>
              {/* <Link href={"/user/profile"}><li className="cursor-pointer py-1 text-sm hover:text-[#C732FF]">Profile</li></Link> */}
              <Typography onClick={logout} className="cursor-pointer py-1 text-sm hover:text-[#C732FF]">Logout</Typography>
            </div>
          </div>
          )}
          <Link href="/user/profile">
          <Avatar
            variant="circular"
            size="sm"
            alt="tania andrew"
            className="border border-gray-900 p-0.5 cursor-pointer hover:shadow-lg transition duration-300 ease-in-out h-14 w-14"
            src= {profilePicUrl ||
              "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
             }
             />
          </Link>
          </div>
    </>
  )
}

export default MobileLoginUser