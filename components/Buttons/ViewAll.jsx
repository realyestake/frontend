import { Button } from '@material-tailwind/react'
import Link from 'next/link'
import React from 'react'

const ViewAll = ({link, title}) => {
  return (
    <Link href={link} >
        <Button
            className="rounded-full lg:w-auto md:w-auto mx-3 w-full xl:w-auto bg-gradient-to-r from-[#2934FE] to-[#BF32EC] pl-12 pr-12 hover:from-[#2934FE] hover:to-[#2934FE] hover:text-white"
            placeholder={"button"}
          >
        {title}
          </Button>
    </Link>
  )
}

export default ViewAll