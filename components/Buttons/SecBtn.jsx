import { Button } from '@material-tailwind/react'
import Link from 'next/link'
import React from 'react'


const SecondaryButton = (props) => {
  return (
   
      <Button className={`normal-case  text-[#FB3C98] border-1 border-[#FB3C98] rounded-[47px] bg-white ${props.customClassName}`}>{props.title}</Button>
   
  )
}

export default SecondaryButton
