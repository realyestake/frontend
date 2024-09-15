import { Typography } from '@material-tailwind/react'
import React from 'react'
import InputBox from '../Input/InputBox'

const BookDemo = () => {
  return (
    <main className="flex flex-col items-center pb-32 justify-center bg-[#160019] min-h-screen mt-[2rem] mb-[5rem]">
        <div className="mt-5 mb-[1.5rem] px-10 text-center">
          <Typography className="text-white text-[60px] Anton">LOOKING FOR A
            <span className="bg-gradient-to-r from-[#2934FE] to-[#BF32EC] text-transparent bg-clip-text pl-3">
              DEMO ?
            </span>
          </Typography>
          <Typography className="text-white/50 text-[16px] mt-[1rem]">More than just walls and floors, we capture the atmosphere.
            Watch how we use <br /> lighting, angles, and movement to highlight your property&apos;s essence</Typography>
        </div>
        <div className="w-[20.7rem] h-[26.4375rem] mt-[2rem]">
          <div className="absolute z-0 rounded-full bg-gradient-to-r from-[#3634FD] to-[#C332EC] blur-[150px] w-64 h-64 flex justify-center items-center">
          </div>
          <div className="relative z-10 flex lg:flex-row md:flex-row xl:flex-row 2xl:flex-row flex-col w-full justify-center gap-5">
            <InputBox className='lg:w-1/2 md:w-1/2 xl:w-1/2 2xl:w-1/2 w-full' placeholder='First Name' />
            <InputBox className='lg:w-1/2 md:w-1/2 xl:w-1/2 2xl:w-1/2 w-full' placeholder='Last Name' />
          </div>
          <div className="relative z-10">
            <InputBox className='w-full mt-[1.5rem]' placeholder='Your Email' />
            <InputBox className='w-full mt-[1.5rem]' placeholder='Phone No' />
            <InputBox className='w-full mt-[1.5rem]' placeholder='Individual/Business' />
            <InputBox className='w-full mt-[1.5rem]' placeholder='Add Your Company Name' />
            <InputBox className='w-full mt-[1.5rem]' placeholder='Select Industry' />
          </div>
          <div className="flex lg:flex-row md:flex-row xl:flex-row 2xl:flex-row flex-col-reverse">
            <button className='w-full h-[2.88rem] mt-[1.5rem] text-white text-center lg:text-end md:text-end xl:text-end 2xl:text-end pr-5 rounded-[5rem]'>Cancel</button>
            <button className='w-full h-[2.88rem] mt-[1.5rem] Anton text-white rounded-[5rem] bg-gradient-to-r from-[#2934FE] to-[#BF32EC] hover:from-[#2934FE] hover:to-[#2934FE]'>
              BOOK A DEMO
            </button>
          </div>
        </div>
      </main>
  )
}

export default BookDemo