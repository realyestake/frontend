import React from 'react'

import Image from 'next/image';
import YouTube from 'react-youtube';

const PropertyVideoGalleryCard = () => {
    const opts = { 
        height: "159", 
        width: "236.8", 
        playerVars: { 
          autoplay: 1, 
        }, 
      }; 
    
      const _onReady =(event)=>{
            event.target.pauseVideo();  
      }
  return (
    <div className=' mt-4'>
            <Image src="https://img.youtube.com/vi/sTnm5jvjgjM/maxresdefault.jpg"
            width={250}
            height={159}
            className="rounded-[8px] border border-gray-500"
            />
    </div>
  )
}

export default PropertyVideoGalleryCard