import { Button } from '@material-tailwind/react'
import React from 'react'



export default function PrimaryButton (props) {
    return (
    <Button className={`w-full normal-case text-[#FFFFFF] rounded-[47px]   bg-gradient-to-r from-[#2934FE] to-[#BF32EC] ${props.customClassName}`}>
      {props.title}
    </Button>
   
  )
}

