import React from 'react'

export default function InputBox ({ className, placeholder, setValue, type, value, id, label }) {

  return (
    <div className='w-full justify-center flex flex-col justify-center items-center'>
      <div className='w-full max-w-[30rem] mt-1 mb-1 ml-2'>
        <p className='font-normal text-[12px]'>
          {label}
        </p>
      </div>
      <input
        type={type ? type : 'text'}
        className={`bg-white/20 ${className} focus:outline-white focus:outline-2 placeholder-white/50 text-white h-[2.88rem] px-5 rounded-[0.5rem]`}
        placeholder={`${placeholder}`}
        onChange={(e) => {
          localStorage.setItem(id, e.target.value);
          setValue(e.target.value)
        }}
        value={value}
      />
    </div>
  );
}
