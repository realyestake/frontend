import React from 'react'
import Image from 'next/image';

export default function FloorGalleryCards  ({imgSrc})  {
  return (
    <div className=' mt-4'>
        <Image
          src={imgSrc}
          alt="card-image"
          className='rounded-[8px] border border-gray-500 '
          width={250}
          height={159}
        />
    </div>
  )
}

