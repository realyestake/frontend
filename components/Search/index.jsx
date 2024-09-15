import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import BACKEND_URL from '../../apiUrl';
export default function Search({ placeholder, setQuery, query, id, label }) {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setIsLoading] = useState(false);
  const [firstLoad, setFirstLoad] = useState(true);
  const [value, setValue] = useState('');


  const handleSelectSuggestion = (suggestion) => {
    console.log(suggestion);
    setQuery(suggestion);
    setValue(suggestion.name);
    setSuggestions([]);
  };

  const handleChange = async (event) => {
    const value = event.target.value;
    setValue(value);
    setQuery(value);
    setFirstLoad(false);
    setIsLoading(true);
    let result;
    try {
      let token = "";
      if (window !== undefined && document.cookie) {
        token = document.cookie && document.cookie.split(";")
          .find((c) => c.includes("token"))
          .split("=")[1];
      }
      const response = await fetch(`${BACKEND_URL}/api/customers/s?q=${query}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      )

      result = await response.json();
    } catch (err) {
      console.log(err);
    }

    console.log(result);
    const dataSet = [];

    if (result && result.length != 0) {
      result.map((data) => {
        if (data.subCredentials) {
          dataSet.push({
            id: data.subCredentials._id,
            name: data.user.firstName + ' ' + data.user.lastName,
            profilePic: data.user.profilePicture,
          });
        }
      });
    }

    setIsLoading(false);
    setSuggestions(dataSet);
  }
  return (
    <div className='w-full max-w-[25rem] mt-10'>
      <div className='w-full flex gap-5 flex-row justify-between bg-[#3a0242]  focus:outline-white focus:outline-2 placeholder-white/50 text-white h-[3rem] pl-5 rounded-[0.5rem] rounded-full'>
        <input
          type={'text'}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          className={`bg-transparent w-full focus:outline-none focus:outline-none placeholder-white/50 text-white h-[2.88rem] rounded-[0.5rem]`}
        />
        <div className='px-3 rounded-full justify-center flex items-center bg-gradient-to-r from-[#2934FE] to-[#BF32EC] m-1' >
          {
            loading ? (
              <div role="status">
                <svg aria-hidden="true" class="w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                </svg>
              </div>

            ) : (
              <FaSearch className='text-white h-full relative right-0 top-50 cursor-pointer' />
            )
          }
        </div>
      </div>
      <ul className='max-h-[10rem] overflow-auto rounded-md'>
        {
          suggestions.map((suggestion, index) => (
            <>
              <li key={index} onClick={() => handleSelectSuggestion(suggestion)} className={`cursor-pointer bg-white/40 hover:bg-gray-500 text-black p-2  ${index === 0 ? 'rounded-t-md' : ''} ${index === suggestions.length - 1 ? 'rounded-b-md' : ''}`}>
                <div className='flex-row flex justify-center items-center'>
                  <img src={suggestion.profilePic} className='w-8 h-8 rounded-full' />
                  <span className='ml-2'>{suggestion.name}</span>
                </div>
              </li>
            </>))
        }
      </ul>
    </div>
  );
};

