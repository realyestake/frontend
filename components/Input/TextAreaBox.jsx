export default function TextAreaBox({ value, setValue, placeholder, id, label }) {
    return (
        <div className='w-full justify-center flex flex-col justify-center items-center'>
            <div className='w-full max-w-[30rem] mt-1 mb-1 ml-2'>
                <p className='font-normal text-[12px]'>
                    {label}
                </p>
            </div>
            <textarea
                value={value}
                onChange={(e) => {
                    console.log(id);
                    localStorage.setItem(id, e.target.value);
                    console.log(localStorage.getItem(id));
                    setValue(e.target.value)
                }}
                className="w-full max-w-[30rem] p-2 border rounded pl-5 bg-white/20 text-white"
                placeholder={placeholder}
            />
        </div>
    )
}