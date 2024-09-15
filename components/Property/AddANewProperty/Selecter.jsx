// export default function Selecter({ value, setValue, options }) {
//   <>
//   <h1></h1>
//     <select value={value}
//         onChange={(e) => {
//           setValue(e.target.value);
//         }} className="w-full bg-white/20 max-w-[30rem] p-2 border rounded bg-transparent">
//         {
//             options.map((option, index) => (
//                 <option key={index} value={option.value} className="text-black hover:bg-[#160019] hover:text-white">{option.name}</option>
//             ))
//         }
//       </select>
//       </>
// }

export default function Selecter({ value, setValue, options, id, label }) {
  return (
    <div className='w-full justify-center flex flex-col justify-center items-center'>
      <div className='w-full max-w-[30rem] mt-1 mb-1 ml-2'>
        <p className='font-normal text-[12px]'>
          {label}
        </p>
      </div>
      <select value={value}
        className="w-full bg-white/20 pl-5 max-w-[30rem] p-2 border rounded bg-transparent"
        onChange={(e) => {
          localStorage.setItem(id, e.target.value);
          setValue(e.target.value);
        }}>
        {
          options.map((option, index) => (
            <option
              key={index}
              value={option}
              className="text-black hover:text-white"
            >
              {option}
            </option>
          ))
        }
      </select>
    </div>
  )
}