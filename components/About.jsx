import React from 'react'
import { Typography } from "@material-tailwind/react";

export default function Hero() {
    return (
        <div className='flex justify-center text-center items-center my-24 lg:flex-row xl:flex-row 2xl:flex-row 3xl:flex-row flex-col'>
            <div className='flex justify-center w-11/12 items-center pt-10 md:gap-24 lg:gap-24 xl:gap-24 2xl:gap-24 gap-12 lg:flex-row xl:flex-row 2xl:flex-row 3xl:flex-row flex-col'>
                <div className='text-start lg:w-3/5 md:w-3/5 xl:w-3/5 2xl:w-3/5 w-full'>
                    <Typography variant="h1" className='lg:text-[2.5rem] flex flex-col md:gap-3 lg:gap-3 xl:gap-3 2xl:gap-3 md:text-[36px] text-[34px] font-anton font-normal text-white'>
                        <span>Why Choose Us to</span>
                        <span>Capture and Showcase</span>
                        <span className='text-[#C332E6]'> Your Space in 3D?</span>
                    </Typography>
                </div>
                <div className='md:flex md:flex-col xl:flex xl:flex-col lg:flex lg:flex-col'>
                    <Typography variant="small" className='bg-blackflex items-start justify-start text-start text-white text-base font-normal pl-5 flex flex-col'>
                        Is your property stuck in the flatland of traditional photos? Let&apos;s break free
                        from two dimensional limitations and unleash the full potential of your space with
                        stunning 3D tours.
                    </Typography>
                    <ol className='pl-5 text-[#C332E6] text-base font-normal pt-5'>
                        <li className='text-white flex items-center text-center gap-2'>
                            <svg className='flex justify-center items-center' xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 16 16" fill="none">
                                <mask id="mask0_923_1263" maskUnits="userSpaceOnUse" x="0" y="0" width="16" height="16">
                                    <path d="M16 0H0V16H16V0Z" fill="white" />
                                </mask>
                                <g mask="url(#mask0_923_1263)">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M8.57144 0H7.42857V5.06025L5.53297 0.368466L4.47333 0.796588L6.41804 5.60991L2.74721 1.93908L1.93909 2.74721L5.45742 6.26553L0.897928 4.27345L0.440367 5.32071L5.26484 7.42857H0V8.57144H5.26483L0.440369 10.6793L0.897928 11.7266L5.45741 9.73448L1.93909 13.2528L2.74721 14.0609L6.41804 10.3901L4.47333 15.2034L5.53297 15.6315L7.42857 10.9398V16H8.57144V10.9398L10.467 15.6315L11.5266 15.2034L9.582 10.3901L13.2528 14.0609L14.0609 13.2528L10.5426 9.73448L15.1021 11.7266L15.5596 10.6793L10.7352 8.57144H16V7.42857H10.7351L15.5596 5.32071L15.1021 4.27345L10.5426 6.26553L14.0609 2.7472L13.2528 1.93908L9.582 5.6099L11.5266 0.796588L10.467 0.368466L8.57144 5.06025V0Z" fill="#C332E6" />
                                </g>
                            </svg>
                            <span className='flex md:flex-row text-start lg:flex-row xl:flex-row flex-col'>
                               Seamless listing platform: Upload your tour and reach the right audience
                            </span>

                        </li>
                        <li className='text-white flex items-center text-center gap-2'>
                            <svg className='flex justify-center items-center' xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 16 16" fill="none">
                                <mask id="mask0_923_1263" maskUnits="userSpaceOnUse" x="0" y="0" width="16" height="16">
                                    <path d="M16 0H0V16H16V0Z" fill="white" />
                                </mask>
                                <g mask="url(#mask0_923_1263)">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M8.57144 0H7.42857V5.06025L5.53297 0.368466L4.47333 0.796588L6.41804 5.60991L2.74721 1.93908L1.93909 2.74721L5.45742 6.26553L0.897928 4.27345L0.440367 5.32071L5.26484 7.42857H0V8.57144H5.26483L0.440369 10.6793L0.897928 11.7266L5.45741 9.73448L1.93909 13.2528L2.74721 14.0609L6.41804 10.3901L4.47333 15.2034L5.53297 15.6315L7.42857 10.9398V16H8.57144V10.9398L10.467 15.6315L11.5266 15.2034L9.582 10.3901L13.2528 14.0609L14.0609 13.2528L10.5426 9.73448L15.1021 11.7266L15.5596 10.6793L10.7352 8.57144H16V7.42857H10.7351L15.5596 5.32071L15.1021 4.27345L10.5426 6.26553L14.0609 2.7472L13.2528 1.93908L9.582 5.6099L11.5266 0.796588L10.467 0.368466L8.57144 5.06025V0Z" fill="#C332E6" />
                                </g>
                            </svg>
                            <span className='flex md:flex-row text-start lg:flex-row xl:flex-row flex-col'>
                                State-of-the-art technology: We wield cutting-edge 3D cameras and software
                            </span>
                        </li>
                        <li className='text-white flex items-center text-center gap-2'>
                            <svg className='flex justify-center items-center' xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 16 16" fill="none">
                                <mask id="mask0_923_1263" maskUnits="userSpaceOnUse" x="0" y="0" width="16" height="16">
                                    <path d="M16 0H0V16H16V0Z" fill="white" />
                                </mask>
                                <g mask="url(#mask0_923_1263)">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M8.57144 0H7.42857V5.06025L5.53297 0.368466L4.47333 0.796588L6.41804 5.60991L2.74721 1.93908L1.93909 2.74721L5.45742 6.26553L0.897928 4.27345L0.440367 5.32071L5.26484 7.42857H0V8.57144H5.26483L0.440369 10.6793L0.897928 11.7266L5.45741 9.73448L1.93909 13.2528L2.74721 14.0609L6.41804 10.3901L4.47333 15.2034L5.53297 15.6315L7.42857 10.9398V16H8.57144V10.9398L10.467 15.6315L11.5266 15.2034L9.582 10.3901L13.2528 14.0609L14.0609 13.2528L10.5426 9.73448L15.1021 11.7266L15.5596 10.6793L10.7352 8.57144H16V7.42857H10.7351L15.5596 5.32071L15.1021 4.27345L10.5426 6.26553L14.0609 2.7472L13.2528 1.93908L9.582 5.6099L11.5266 0.796588L10.467 0.368466L8.57144 5.06025V0Z" fill="#C332E6" />
                                </g>
                            </svg>
                            <span className='flex md:flex-row text-start lg:flex-row xl:flex-row flex-col'>
                                Stress-free experience: Relax and let our professionals handle everything.
                            </span>
                        </li>
                    </ol>
                </div>
            </div>
        </div>
    )
}
