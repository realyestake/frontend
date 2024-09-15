import { BellIcon } from '@heroicons/react/24/solid'
import { Avatar, IconButton, Typography } from '@material-tailwind/react'
import Link from 'next/link'
import React, { use, useState } from 'react'

export default function AdminUser({logout}) {
  const [dropdown, setDropdown] = useState(false);

  return (
    <>
          <div onMouseOver={()=>{setDropdown(true)}}
            onMouseLeave={()=>{setDropdown(false)}}>
          {/* {dropdown && (
            <div onMouseOver={()=>{setDropdown(true)}}
            onMouseLeave={()=>{setDropdown(false)}} className="py-2 absolute top-14 right-14 bg-transparent border border-gray-800 text-white rounded-md px-5 w-30">
            <ul className={`flex flex-col gap-y-2`}>
              <li onClick={logout} className="cursor-pointer py-1 text-sm hover:text-[#C732FF]">Logout</li>
            </ul>
          </div>
          )} */}
          {/* <Link href="/"> */}
          {/* <Avatar
            variant="circular"
            size="sm"
            alt="tania andrew"
            className="border border-gray-900 p-0.5 cursor-pointer hover:shadow-lg transition duration-300 ease-in-out h-12 w-12"
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
          /> */}
          <Typography className='cursor-pointer font-medium Raleway md:text-[16px] text-[14px]' onClick={logout} >Logout</Typography>
          {/* </Link> */}
          </div>
    </>
  )
}

