import React, { useState } from 'react';
import UploadButton from '../Buttons/UploadButton'
import { Typography } from '@material-tailwind/react';

function DragAndDropArea({value, setValue}) {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    setValue(e);
    // const files = e.dataTransfer.files[0];
    // setValue(files);
  };

  const handleChange = (file) => {
    setValue(file);
  };

  return (
    <div
      className={`bg-white/10 mb-5 w-full max-w-[30rem] mx-auto flex flex-col gap-5 h-48 border-white/30 border justify-center items-center text-center ${isDragOver ? 'border-[#FB3C98]' : ''}`}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <Typography className='text-white/40'>
        {isDragOver ? 'Release to drop your files' : 'Drag and drop your files anywhere or'}
      </Typography>
      <UploadButton className='px-8 sm:px-4 py-1 text-[#FB3C98] border-[#FB3C98] mt-2 sm:mt-0 border'
        onChange={handleChange}
        value = {value}
      >
        Upload File
      </UploadButton>
    </div>
  );
}

export default DragAndDropArea;
