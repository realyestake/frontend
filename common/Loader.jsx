import React from 'react'
import { ThreeDots, Triangle } from 'react-loader-spinner'

const Loader = () => {
  return (
   <div className="flex justify-center items-center py-4">
     <Triangle
  visible={true}
  height="80"
  width="80"
  color="#C732FF"
  ariaLabel="triangle-loading"
  wrapperStyle={{}}
  wrapperClass=""
  />
         </div>
        //  #C732FF
  )
}

export default Loader