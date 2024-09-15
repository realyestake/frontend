import { Button } from '@material-tailwind/react'
import Link from 'next/link'
import React from 'react'

const LogoutUser = () => {
  return (
    <>
        <Link href="/login">
        <Button variant="text" size="sm" className="hidden lg:inline-block text-white normal-case px-6 Outfit hover:border rounded-[47px] text-[16px]">
            <span>Log In</span>
          </Button>
        </Link>
          
           <Link href="/signup">
           <Button
            variant="gradient"
            size="sm"
            className="hidden lg:inline-block normal-case text-[#FFFFFF] rounded-[47px]  bg-gradient-to-r from-[#2934FE] to-[#BF32EC] px-12 Outfit text-[16px]"
          >
            <span>Sign Up</span>
          </Button>
            </Link>
    </>
  )
}

export default LogoutUser