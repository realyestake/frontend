import { Typography } from '@material-tailwind/react';
import React from 'react';
import Head from 'next/head';

export default function HeaderTitle() {
  return (
    <>
      <Typography className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-[60px] Anton">
        ADD A NEW
        <span className="bg-gradient-to-r from-[#2934FE] to-[#BF32EC] text-transparent bg-clip-text pl-3">
          PROPERTY
        </span>
      </Typography>
    </>
  );
}
