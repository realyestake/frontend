import React, { useEffect, useState } from 'react';
import { SingleCard } from './Card/SingleCard';


const Properties = ({data}) => { 
  console.log('data vanshuk', data);
  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4 grid-cols-1">
      {
        data.map((item)=>{
          return(
            <>
            <SingleCard {...item} />
            </>
          )
        })
      }
    </div>
  )
}

export default Properties