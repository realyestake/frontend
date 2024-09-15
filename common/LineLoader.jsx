import React from 'react'
import { ThreeDots } from 'react-loader-spinner'

const LineLoader = () => {
  return (
    <div className="flex justify-center items-center py-4">
        <ThreeDots
  visible={true}
  height="80"
  width="80"
  color="#C732FF"
  radius="9"
  ariaLabel="three-dots-loading"
  wrapperStyle={{}}
  wrapperClass=""
  />
    </div>
  )
}

export default LineLoader