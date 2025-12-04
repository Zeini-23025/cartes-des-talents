
import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import UserCard from '../components/UserCard';
import api from '../services/api';

const Search = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (filters) => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams();
      Object.keys(filters).forEach(key => {
        if (filters[key]) queryParams.append(key, filters[key]);
      });
      
      const response = await api.get(`/search?${queryParams.toString()}`);
      setResults(response.data);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    
      Search Talents
      
      
      {loading && Loading...}
 
      
        {results.map(user => (
          
        ))}
      

      {results.length === 0 && !loading && (
        
          No results found. Try different search criteria.
        
      )}
    
  );
};

export default Search;