import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const TalentCloud = ({ data }) => {
  // Sort data by count in descending order and take top 20
  const sortedData = [...data]
    .sort((a, b) => b.count - a.count)
    .slice(0, 20)
    .map(item => ({
      name: item.talent.charAt(0).toUpperCase() + item.talent.slice(1),
      count: item.count
    }));

  return (
    <div style={{ padding: '20px', background: 'white', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#333' }}>
        Talent Distribution
      </h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={sortedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="name" 
            angle={-45}
            textAnchor="end"
            height={100}
            interval={0}
          />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#667eea" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TalentCloud;
