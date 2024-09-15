import { Button } from '@material-tailwind/react'
import Link from 'next/link'
import React from 'react'



const FilterButton = (props) => {
  return (
    <Button className={`normal-case Satoshi text-[16px] Satoshi leading-[21.6px] font-medium  text-[#FFFFFF] rounded-[47px] ${props.customClassName}  bg-[#3A0242]`}>
        <Link href={props.href}>{props.title}</Link>
    </Button>
  )
}

export default FilterButton