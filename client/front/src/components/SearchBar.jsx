import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [filters, setFilters] = useState({
    skill: '',
    language: '',
    passion: '',
    project: '',
    name: ''
  });

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(filters);
  };

  const handleClear = () => {
    const clearedFilters = {
      skill: '',
      language: '',
      passion: '',
      project: '',
      name: ''
    };
    setFilters(clearedFilters);
    onSearch(clearedFilters);
  };

  const hasActiveFilters = Object.values(filters).some(value => value !== '');

  return (
    <div className="card">
      <h2 style={styles.title}>🔍 Search Talents</h2>
      <p style={styles.description}>
        Use the filters below to find professionals that match your criteria
      </p>
      
      <form onSubmit={handleSubmit}>
        <div style={styles.formGrid}>
          <div style={styles.inputGroup}>
            <label htmlFor="name">👤 Name</label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder="Search by first or last name"
              value={filters.name}
              onChange={handleChange}
            />
          </div>

          <div style={styles.inputGroup}>
            <label htmlFor="skill">💻 Skill</label>
            <input
              id="skill"
              type="text"
              name="skill"
              placeholder="e.g., React, Python, Design"
              value={filters.skill}
              onChange={handleChange}
            />
          </div>

          <div style={styles.inputGroup}>
            <label htmlFor="language">🌍 Language</label>
            <input
              id="language"
              type="text"
              name="language"
              placeholder="e.g., English, French, Arabic"
              value={filters.language}
              onChange={handleChange}
            />
          </div>

          <div style={styles.inputGroup}>
            <label htmlFor="passion">❤️ Passion</label>
            <input
              id="passion"
              type="text"
              name="passion"
              placeholder="e.g., AI, Music, Photography"
              value={filters.passion}
              onChange={handleChange}
            />
          </div>

          <div style={styles.inputGroup}>
            <label htmlFor="project">🚀 Project</label>
            <input
              id="project"
              type="text"
              name="project"
              placeholder="e.g., E-commerce, Mobile App"
              value={filters.project}
              onChange={handleChange}
            />
          </div>
        </div>

        <div style={styles.buttonGroup}>
          <button type="submit" style={styles.searchButton}>
            Search
          </button>
          {hasActiveFilters && (
            <button type="button" onClick={handleClear} style={styles.clearButton}>
              Clear Filters
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

const styles = {
  title: {
    fontSize: '24px',
    marginBottom: '10px',
    color: '#333'
  },
  description: {
    color: '#666',
    marginBottom: '25px',
    fontSize: '14px'
  },
  formGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
    marginBottom: '20px'
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column'
  },
  buttonGroup: {
    display: 'flex',
    gap: '15px',
    marginTop: '25px'
  },
  searchButton: {
    background: '#667eea',
    color: 'white',
    flex: 1,
    padding: '15px',
    fontSize: '16px',
    fontWeight: 'bold'
  },
  clearButton: {
    background: '#e0e0e0',
    color: '#333',
    padding: '15px 30px',
    fontSize: '16px'
  }
};

export default SearchBar;