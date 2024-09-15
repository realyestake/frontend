import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import BACKEND_URL from '../../../apiUrl';
export default function Search({ placeholder, setQuery, query, id, label }) {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setIsLoading] = useState(false);
  const [firstLoad, setFirstLoad] = useState(true);


  const handleSelectSuggestion = (suggestion) => {
    localStorage.setItem(id, suggestion);
    setQuery(suggestion);
    setSuggestions([]);
  };

  const handleChange = async (event) => {
    const value = event.target.value;
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
    <div className='w-full max-w-[30rem]'>
      <p className='font-normal text-[12px]'>
        {label}
      </p>
      <div className='w-full flex gap-5 flex-row justify-between bg-white/20  focus:outline-white focus:outline-2 border border-white placeholder-white/50 text-white h-[2.88rem] px-5 rounded-[0.5rem]'>
        <input
          type={'text'}
          value={query.id}
          onChange={handleChange}
          placeholder={placeholder}
          className={`bg-transparent w-full focus:outline-none focus:outline-none placeholder-white/50 text-white h-[2.88rem] rounded-[0.5rem]`}
        />
        <FaSearch className='text-white h-full relative right-0 top-50 cursor-pointer' />
      </div>
      <ul className='max-h-[10rem] overflow-auto rounded-md'>
        {
          loading ?
            <div className='w-full flex items-center justify-center mt-2'>
              <p className='text-white text-center flex items-center'>Loading...</p>
            </div> : suggestions.length === 0 && query === '' && !firstLoad ? (
              <div className='w-full flex items-center justify-center mt-2'>
                <p className='text-white text-center flex items-center'>No Data Found...</p>
              </div>
            ) : suggestions.map((suggestion, index) => (
              <>
                <li key={index} onClick={() => handleSelectSuggestion(suggestion)} className={`cursor-pointer bg-white/40 hover:bg-gray-500 text-black p-2  ${index === 0 ? 'rounded-t-md' : ''} ${index === suggestions.length - 1 ? 'rounded-b-md' : ''}`}>
                  <div className='flex-row flex justify-between items-center'>
                    <img src={suggestion.profilePic} className='w-8 h-8 rounded-full' />
                    <span className='ml-2'>{suggestion.name}</span>
                    <span className='ml-2'>{suggestion.id}</span>
                  </div>
                </li>
              </>))
        }
      </ul>
    </div>
  );
};

