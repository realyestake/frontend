import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
    IconButton
  } from "@material-tailwind/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

  
  export function PropertyCard({_id,  title, place, content, price, isNew, isLiked, picture}) {

    const [liked, setLiked] = useState();
    
    // console.log('liked', liked);

    const handleFavourites = async () => {
      setLiked(isLiked);
      const token = document.cookie.split(';').find(c => c.includes('token')).split('=')[1];
      console.log('token', token);
      console.log('liked', liked);
      let res;
      try {
        // Check if the property is already liked or not
        if (liked) {
          // If already liked, unfavorite the property
          res = await axios.put(`http://localhost:3000/api/properties/unfavourite/${_id}`,  {
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
            }
          });
        } else {
          // If not liked, favorite the property
          res = await axios.put(`http://localhost:3000/api/properties/favourite/${_id}`,  {
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
            }
          });
        }

        console.log(res);
  
        // Update the liked state to reflect the current status
        setLiked(!liked);
      } catch (error) {
        console.error("Error toggling favorite:", error);
      }
    }

  
    return (
      <Card className="mt-6 bg-[#0D0D0D] rounded-[8px]">
        <CardHeader floated={false}  className="relative m-0  rounded-none rounded-t-[8px]">
          <Link href={`/properties/${_id}`}>
          <Image
            src={picture===undefined? "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvcGVydHl8ZW58MHx8MHx8fDA%3D":picture}
            alt="card-image"
            height={241}
            width={507}
            fullWidth={true}
            className="rounded-none rounded-t-[8px]"
          />
          </Link>
          {
            isNew ? (
              <div className='bg-[#FA238A] absolute top-3 left-3 w-12 text-white flex items-center justify-center rounded-md text-[12px] Outfit py-1 px-8'>
                <Typography variant='small'>NEW</Typography>
              </div>
            ) : ''
          }

<IconButton
      size="sm"
      variant="text"
      onClick={handleFavourites}
      className="!absolute top-1 right-1 rounded-full"
    >
      {isLiked!==undefined && isLiked ? (
        <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill={liked ? 'red' : 'transparent'}
        stroke={liked ? 'red' : 'white'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-8 w-8 text-red-500"
      >
        <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />

</svg>) : null
        }
        {/* ... your SVG path */}
        
    </IconButton>
         
        </CardHeader>
        <Link href={`/properties/${_id}`}>
        <CardBody className="px-2">

        
          <Typography variant="h6" color="blue-gray" className="mb-2  Outfit uppercase text-white text-[16px] font-bold">
            {title}
          </Typography>
          <Typography variant="small" color="white" className="flex mb-2 xl">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 30 30" strokeWidth={1} stroke="currentColor" className="w-5 h-5 text-white">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
              <span className=" text-white Outfit font-normal text-[12px] leading-[15.12px]">{place}</span>
          </Typography>
          <Typography variant="small" color="white" className="mb-2 text-white Outfit font-normal text-[12px] leading-[15.12px]">
            <span className="font-bold text-white">Details:  </span>
            {content==undefined ? "": content.length>100? content.substring(0, 100) + '...': content}
          </Typography>
        </CardBody>
        </Link>
        <CardFooter className="w-full  pt-0 px-2">
          <Link href={`/properties/${_id}`}>
          <Button className=" capitalize w-full Outfit text-[16px] rounded-[47px] hover:bg-white hover:text-[#F64070] bg-transparent font-normal leading-[17.64px] border border-white px-10 py-[10px]">View Property</Button>
            </Link>
        </CardFooter>
      </Card>
    );
  }
  