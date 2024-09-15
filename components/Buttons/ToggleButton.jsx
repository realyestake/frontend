import React, { useState } from 'react';

const ToggleButton = ({ title1, title2, checked, onChange }) => {
  

  return (
    <>
      <label className='autoSaverSwitch w-full sm:w-[20rem] md:w-[30rem] rounded-full shadow-card relative inline-flex cursor-pointer select-none bg-[#3A0242] p-1'>

        <input
          type='checkbox'
          name='autoSaverSwitch'
          className='sr-only'
          checked={checked}
          onChange={onChange}
        />
        <span

          className={`slider w-full sm:w-[10rem] md:w-[15rem] flex text-white space-x-2 sm:space-x-6 rounded-full py-2 px-4 sm:px-8 text-sm font-medium ${
            checked ? 'text-primary bg-[#C732FF]' : 'text-body-color'
          } duration-200`}
        >
          {title1}
        </span>
        <span
          className={`dot w-full sm:w-[10rem] md:w-[15rem] duration-200 flex text-white items-center space-x-2 sm:space-x-6 rounded-full py-2 px-4 sm:px-8 text-sm font-medium ${
            !checked ? 'text-primary bg-[#C732FF]' : 'text-body-color'
          }`}
        >
          {title2}
        </span>
      </label>
    </>
  );
};

export default ToggleButton;

