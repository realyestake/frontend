import PrimaryButton from '@/components/Buttons/PrimaryButton'
import React from 'react'

export function SearchBox() {
    return (
        <div className='w-full bg-[#3A0242] rounded-full flex flex-row pr-2 py-2'>
            <input placeholder='Search for Users' className='w-full focus:outline-none px-5 bg-[#3A0242] justify-center h-[35px] rounded-full text-white' />
            <PrimaryButton>
                Search
            </PrimaryButton>
        </div>
    )
}
