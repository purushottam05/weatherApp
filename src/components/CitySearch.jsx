import React, { useState, useEffect } from 'react';
import axios from 'axios';
import debounce from 'lodash/debounce';

const CitySearch = ({ setCity }) => {
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (input.length < 3) {
        setSuggestions([]);
        return;
      }
      try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/find?q=${input}&appid=${import.meta.env.VITE_OPENWEATHERMAP_API_KEY}`);
        setSuggestions(response.data.list.map(city => city.name));
      } catch (error) {
        setSuggestions([]);
      }
    };

    const debouncedFetch = debounce(fetchSuggestions, 300);
    debouncedFetch();

    return () => {
      debouncedFetch.cancel();
    };
  }, [input]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (input.trim()) {
      setCity(input);
      setInput('');
      setSuggestions([]);
    }
  };

  return (
    <div className="mb-4 text-center">
  <div className="inline-flex flex-col items-center">
    <form onSubmit={handleSearch}>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter a city name"
        className="p-2 rounded-l-lg border border-gray-300 focus:outline-none"
      />
      <button
        type="submit"
        className="p-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-700 focus:outline-none"
      >
        Search
      </button>
    </form>
    {suggestions.length > 0 && (
      <ul className="bg-white border border-gray-300 rounded-lg w-full">
        {suggestions.map((suggestion, index) => (
          <li
            key={index}
            onClick={() => {
              setCity(suggestion);
              setInput('');
              setSuggestions([]);
            }}
            className="p-2 cursor-pointer hover:bg-gray-200"
          >
            {suggestion}
          </li>
        ))}
      </ul>
    )}
  </div>
</div>

    
  );
};

export default CitySearch;
