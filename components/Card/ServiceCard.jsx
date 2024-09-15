import React from 'react'
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Avatar,
    Tooltip,
    IconButton,
    Button,
  } from "@material-tailwind/react";
import Image from 'next/image';
import PrimaryButton from '../Buttons/PrimaryButton';
import Link from 'next/link';

const ServiceCard = ({_id, name, picture, description}) => {
  console.log('service card', _id, name,  description)
  return (
    <Card 
    className="mt-6 w-76 rounded-sm bg-[#160019]">
    <CardHeader floated={false}  className="relative m-0 rounded-sm">
      <img
        src={`${picture}`}
        alt="card-image"
        className="object-cover object-center w-full h-60 max-w-full "
      />
    </CardHeader>
    <CardBody className="px-2 bg-[#000000] py-2">
    <Typography variant="h4" color="white" className="mb-1   text-white items-center">
        {name}
      </Typography>
      <Typography variant="small" color="blue-gray" className="mb-2   text-white/70">
        <span className="font-bold text-white/70">Details:  </span>
        {description.length > 100 ? description.substring(0, 100) + "..." : description}
      </Typography>
    </CardBody>
    <CardFooter className="flex items-center justify-between mt-1">
        <div></div>
        <Link href={`/services/${_id}`}>
        <PrimaryButton title="View Details"  ripple="light" customClassName="px-10 text-[16px]"  />
        </Link>
        
      <div></div>
    </CardFooter>
  </Card>
  )
}

export default ServiceCard