import React, { useState, useEffect } from 'react';
import TalentCloud from '../components/TalentCloud';
import api from '../services/api';

const TalentMap = () => {
  const [talentData, setTalentData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTalentMap();
  }, []);

  const fetchTalentMap = async () => {
    try {
      const response = await api.get('/talents/map');
      setTalentData(response.data);
    } catch (error) {
      console.error('Failed to fetch talent map:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Talent Distribution Map</h1>
      <p style={{ textAlign: 'center', marginBottom: '30px', color: '#666' }}>
        Visualize the distribution of skills across all users
      </p>

      {loading ? (
        <div className="card">
          <p>Loading talent data...</p>
        </div>
      ) : talentData.length > 0 ? (
        <TalentCloud data={talentData} />
      ) : (
        <div className="card">
          <p>No talent data available yet.</p>
        </div>
      )}

      <div className="card" style={{ marginTop: '30px' }}>
        <h3>About Talent Map</h3>
        <p>
          This visualization shows the most common skills across all registered users. 
          The height of each bar represents how many users have that particular skill.
        </p>
      </div>
    </div>
  );
};

export default TalentMap;