import React from 'react';

const Step = ({ number, isActive }) => (
  <div
    className={`relative flex-shrink-0 w-10 h-10 mx-2 bg-${isActive ? '[#C732FF]' : 'white'}  rounded-full flex items-center justify-center`}
  >
    <span className={`text-${isActive ? 'white' : 'black'}`}>{number}</span>
  </div>
);

const Divider = ({isCompleted}) => (
  <div className='flex-1 relative'>
    <div className={`h-1 absolute inset-0 ${isCompleted ? `bg-[#C732FF]` : `bg-white`}`}></div>
  </div>
);

export default function Stepper({ activeStep, className }) {

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <Step number={1} isActive={activeStep >= 1} />
      <Divider isCompleted={activeStep > 1} />
      <Step number={2} isActive={activeStep >= 2} />
      <Divider isCompleted={activeStep > 2} />
      <Step number={3} isActive={activeStep === 3} />
    </div>
  );
}
