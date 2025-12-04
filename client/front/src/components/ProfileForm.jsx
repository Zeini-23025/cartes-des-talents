import React, { useState } from 'react';

const ProfileForm = ({ initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    skills: initialData?.skills?.join(', ') || '',
    languages: initialData?.languages?.join(', ') || '',
    passions: initialData?.passions?.join(', ') || '',
    projects: initialData?.projects?.join(', ') || ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataToSend = {
      skills: formData.skills.split(',').map(s => s.trim()).filter(Boolean),
      languages: formData.languages.split(',').map(s => s.trim()).filter(Boolean),
      passions: formData.passions.split(',').map(s => s.trim()).filter(Boolean),
      projects: formData.projects.split(',').map(s => s.trim()).filter(Boolean)
    };
    onSubmit(dataToSend);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Skills (comma-separated):</label>
      <input
        type="text"
        name="skills"
        value={formData.skills}
        onChange={handleChange}
        placeholder="React, Node.js, Python"
      />

      <label>Languages (comma-separated):</label>
      <input
        type="text"
        name="languages"
        value={formData.languages}
        onChange={handleChange}
        placeholder="English, French, Spanish"
      />

      <label>Passions (comma-separated):</label>
      <input
        type="text"
        name="passions"
        value={formData.passions}
        onChange={handleChange}
        placeholder="AI, Design, Music"
      />

      <label>Projects (comma-separated):</label>
      <input
        type="text"
        name="projects"
        value={formData.projects}
        onChange={handleChange}
        placeholder="E-commerce App, Portfolio Website"
      />

      <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
        <button type="submit" style={styles.saveButton}>
          Save Changes
        </button>
        <button type="button" onClick={onCancel} style={styles.cancelButton}>
          Cancel
        </button>
      </div>
    </form>
  );
};

const styles = {
  saveButton: {
    background: '#667eea',
    color: 'white',
    flex: 1
  },
  cancelButton: {
    background: '#ccc',
    color: '#333',
    flex: 1
  }
};

export default ProfileForm;