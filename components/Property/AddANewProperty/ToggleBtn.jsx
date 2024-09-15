import React from 'react';

const ToggleButton = ({ title1, title2, checked, onChange }) => {
  return (
    <label className='autoSaverSwitch w-full sm:w-[20rem] md:w-[30rem] rounded-full shadow-card relative inline-flex cursor-pointer select-none bg-[#3A0242] p-1'>
      <input
        type='checkbox'
        name='autoSaverSwitch'
        className='sr-only'
        checked={checked}
        onChange={onChange}
      />
      <span className={`slider w-full sm:w-[10rem] md:w-[15rem] flex text-white space-x-2 sm:space-x-6 rounded-full py-2 px-4 sm:px-8 text-sm font-medium transition-all ${!checked ? 'bg-[#C732FF]' : 'text-body-color'}`}>
        {title1}
      </span>
      <span className={`slider w-full sm:w-[10rem] md:w-[15rem] flex text-white items-center space-x-2 sm:space-x-6 rounded-full py-2 px-4 sm:px-8 text-sm font-medium absolute ${checked ? 'right-0' : 'left-0'} ${checked ? 'bg-[#C732FF]' : 'bg-[#3A0242]'}`}>
        {title2}
      </span>
    </label>
  );
};

export default ToggleButton;
