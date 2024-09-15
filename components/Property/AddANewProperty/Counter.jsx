import { Typography } from "@material-tailwind/react"
import { FaMinus, FaPlus } from "react-icons/fa"
export default function Counter({title, value, setValue, id}) {
    return (
        <div className="w-full pl-5 border rounded items-center border-white p-2 max-w-[30rem] bg-white/20 flex flex-row justify-between">
            <Typography className="text-white">
                {title}
            </Typography>
            <div className="border border-white rounded-2xl flex-row flex bg-white/20 gap-4 px-2 py-1">
                <div className="justify-center text-center flex items-center">
                    <FaMinus className="text-white cursor-pointer" 
                    onClick={() => {
                        if(value > 0) {
                            localStorage.setItem(id, value - 1)
                            setValue(value - 1)
                        }
                    }}
                    />
                </div>
                <div className="justify-center text-center flex items-center border-x border-white/20 px-2">
                    {value < 10 ? `0${value}` : value}
                </div>
                <div className="justify-center text-center flex items-center">
                    <FaPlus className="text-white cursor-pointer"
                    onClick={() => {
                        localStorage.setItem(id, value + 1)
                        setValue(value + 1)
                    }}/>
                </div>
            </div>
        </div>
    )
}