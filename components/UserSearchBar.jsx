// components/UserSearchBar.js

import React, { useState } from 'react';
import axios from 'axios';
import BACKEND_URL from '@/apiUrl';

const UserSearchBar = ({ onSelectUser }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleSearch = async (e) => {
    setQuery(e.target.value);
    if (e.target.value.length > 2) {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/users/search`, {
          params: { query: e.target.value },
        });
        setSuggestions(response.data);
      } catch (error) {
        console.error(error);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSelectUser = (user) => {
    setQuery('');
    setSuggestions([]);
    onSelectUser(user);
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Search for a user..."
      />
      {suggestions.length > 0 && (
        <ul>
          {suggestions.map((user) => (
            <li key={user.id} onClick={() => handleSelectUser(user)}>
              {user.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserSearchBar;
