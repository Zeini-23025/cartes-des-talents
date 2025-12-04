import React, { useState } from 'react';
import UserCard from '../components/UserCard';
import api from '../services/api';

const Collaborators = () => {
  const [results, setResults] = useState([]);
  const [filters, setFilters] = useState({
    skill: '',
    language: '',
    passion: '',
    project: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const queryParams = new URLSearchParams();
      Object.keys(filters).forEach(key => {
        if (filters[key]) queryParams.append(key, filters[key]);
      });
      
      const response = await api.get(`/collaborators?${queryParams.toString()}`);
      setResults(response.data);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Find Collaborators</h1>
      
      <div className="card">
        <h2>Search Criteria</h2>
        <form onSubmit={handleSearch}>
          <input
            type="text"
            name="skill"
            placeholder="Required Skill"
            value={filters.skill}
            onChange={handleChange}
          />
          <input
            type="text"
            name="language"
            placeholder="Language"
            value={filters.language}
            onChange={handleChange}
          />
          <input
            type="text"
            name="passion"
            placeholder="Passion"
            value={filters.passion}
            onChange={handleChange}
          />
          <input
            type="text"
            name="project"
            placeholder="Project Type"
            value={filters.project}
            onChange={handleChange}
          />
          <button type="submit" style={{ background: '#667eea', color: 'white', width: '100%' }}>
            Find Collaborators
          </button>
        </form>
      </div>

      {loading && <p>Loading...</p>}
      
      <div className="grid">
        {results.map(user => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>

      {results.length === 0 && !loading && (
        <p style={{ textAlign: 'center', marginTop: '40px', color: '#666' }}>
          No collaborators found. Try different criteria.
        </p>
      )}
    </div>
  );
};

export default Collaborators;