import BottomSection from './BottomSection';
import Footer from '../components/Footer';
import { CarouselCustom } from '../components/Carousel';
import Hero from '../components/About';
import React from 'react';

const titles = [{
  title: 'TRENDING',
  gradientTitle: 'PROPERTIES'
}, {
  title: 'RESIDENTIAL',
  gradientTitle: 'PROPERTIES'
}, {
  title: 'COMMERCIAL',
  gradientTitle: 'PROPERTIES'
}];

export default function HomePage() {
  return (
    <>
      <div className='bg-[#120014]'>
        <div className='flex justify-center items-center absolute w-full z-0 bg-[#120014] bg-cover bg-no-repeat bg-gradient-to-r from-lightgray via-transparent to-transparent bg-blend-screen opacity-20'>
          <img src="/assets/bglines.png" alt="logo" className='h-[50rem]' />
        </div>
        <div className='relative z-10'>
        <BottomSection />
        </div>
      </div>
      <Hero />
      <CarouselCustom />
      {/* <Footer /> */}
    </>
  )
}
