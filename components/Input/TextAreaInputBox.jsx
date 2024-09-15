import React from 'react'

export default function TextAreaInputBox ({ className, placeholder, children }) {
  return (
    <textarea
      className={`bg-white/20 ${className} focus:outline-white focus:outline-2 placeholder-white/50 text-white h-[5.88rem] py-2 px-4 sm:px-5 md:px-6 rounded-[0.5rem] sm:w-[200px] md:w-[300px] lg:w-[400px] xl:w-[500px]`}
      placeholder={`${placeholder}`}
    >
      {children}
    </textarea>
  )
}
