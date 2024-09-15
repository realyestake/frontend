import React from 'react'
import PrimaryButton from '../Buttons/PrimaryButton'
export default function UserBookDemo () {
  return (
    <div className="container mx-auto mt-12 mb-8 px-4">
        <div className="lg:text-[32px] tex-[16px] Outfit font-medium leading-[48px]">
          {" "}
          &larr; <span className="text-[#ffffff99] pl-6"></span> Request a demo
          from REALYESTAKE
        </div>

        <div className="mt-10 flex flex-row justify-center">
          <div></div>
          <div className="border  border-gray-800 bg-[#ffffff38] text-[16px] font-normal Outfit leading-[20.16px] p-10 w-1/2 pb-[100px] rounded-[8px]">
            Details: View at Casa Cochi: Where Modern Luxury Meets Colonial
            Charm Step into a haven of modern elegance in the heart of Fort
            Kochi. Casa Cochi, a boutique villa nestled amidst heritage streets,
            unveils its crown jewel...
          </div>
          <div></div>
        </div>
        <div className="mt-10 flex flex-row justify-center">
          <div></div>
          <PrimaryButton
            title="Book a demo"
            customClassName="px-14 text-[16px]"
          />
          <div></div>
        </div>
      </div>
  )
}

