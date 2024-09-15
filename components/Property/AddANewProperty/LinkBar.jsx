import { Button, Typography } from "@material-tailwind/react";
import Viewer from "./Viewer";
import InputBox from "@/components/Input/InputBox";
import React from "react";

export default function LinkBar({ onClick, title, list, setList }) {
    const [value, setValue] = React.useState('');
    const handleClick = () => {
        if (value) {
            onClick(value);
            setValue('');
        }
    }
    return (
        <>
            <div className='flex flex-col gap-4 sm:gap-8'>
                <div className='flex gap-4 text-white'>
                    <Typography className=''>{title}</Typography>
                </div>
                <div className='flex flex-col sm:flex-row gap-4'>
                    <InputBox
                        value={value}
                        setValue={(value) => setValue(value)}
                        className='w-full sm:w-[20rem] h-[2.5rem]' placeholder='Add 3d Link' />
                    <Button
                        onClick={handleClick}
                        className='px-8 sm:px-12  mt-2 sm:mt-0 border normal-case  text-[#FB3C98] border-1 border-[#FB3C98] rounded-[47px] bg-white'>
                        Add
                    </Button>
                </div>
            </div>
            <Viewer link={value} list={list} setList={setList} />   
        </>

    )
}