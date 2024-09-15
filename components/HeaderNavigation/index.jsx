import { Typography } from '@material-tailwind/react'
import React from 'react'

export function HeaderNavigation({ title, showBackButton }) {
    return (
        <>
            <div className='flex items-center gap-2 py-2'>
                {showBackButton && (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                    </svg>
                )}
                <Typography className='text-white  lg:text-[32px] text-[24px] font-normal Outfit'>
                    {title}
                </Typography>
            </div>
        </>
    )
}
