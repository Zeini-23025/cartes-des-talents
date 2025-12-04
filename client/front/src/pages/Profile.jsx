import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    skills: '',
    languages: '',
    passions: '',
    projects: ''
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (user) {
      setFormData({
        skills: user.skills?.join(', ') || '',
        languages: user.languages?.join(', ') || '',
        passions: user.passions?.join(', ') || '',
        projects: user.projects?.join(', ') || ''
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToSend = {
        skills: formData.skills.split(',').map(s => s.trim()).filter(Boolean),
        languages: formData.languages.split(',').map(s => s.trim()).filter(Boolean),
        passions: formData.passions.split(',').map(s => s.trim()).filter(Boolean),
        projects: formData.projects.split(',').map(s => s.trim()).filter(Boolean)
      };
      
      await api.patch(`/users/${user.id}`, dataToSend);
      setEditing(false);
      setMessage('Profile updated successfully!');
      setTimeout(() => setMessage(''), 3000);
      window.location.reload();
    } catch (err) {
      console.error('Update failed:', err);
      setMessage('Failed to update profile');
    }
  };

  if (!user) return <div className="container"><p>Loading...</p></div>;

  return (
    <div className="container">
      <div className="card">
        <h1>My Profile</h1>
        
        {message && (
          <div style={styles.message}>
            {message}
          </div>
        )}

        <div style={styles.header}>
          <div>
            <h2>{user.firstname} {user.lastname}</h2>
            <p style={styles.email}><strong>Email:</strong> {user.email}</p>
          </div>
        </div>

        {!editing ? (
          <>
            <div style={styles.section}>
              <h3>Skills</h3>
              <div style={styles.tags}>
                {user.skills && user.skills.length > 0 ? (
                  user.skills.map((skill, i) => (
                    <span key={i} style={styles.tag}>{skill}</span>
                  ))
                ) : (
                  <span style={styles.empty}>No skills added yet</span>
                )}
              </div>
            </div>

            <div style={styles.section}>
              <h3>Languages</h3>
              <div style={styles.tags}>
                {user.languages && user.languages.length > 0 ? (
                  user.languages.map((lang, i) => (
                    <span key={i} style={styles.tag}>{lang}</span>
                  ))
                ) : (
                  <span style={styles.empty}>No languages added yet</span>
                )}
              </div>
            </div>

            <div style={styles.section}>
              <h3>Passions</h3>
              <div style={styles.tags}>
                {user.passions && user.passions.length > 0 ? (
                  user.passions.map((passion, i) => (
                    <span key={i} style={styles.tag}>{passion}</span>
                  ))
                ) : (
                  <span style={styles.empty}>No passions added yet</span>
                )}
              </div>
            </div>

            <div style={styles.section}>
              <h3>Projects</h3>
              <div style={styles.tags}>
                {user.projects && user.projects.length > 0 ? (
                  user.projects.map((project, i) => (
                    <span key={i} style={styles.tag}>{project}</span>
                  ))
                ) : (
                  <span style={styles.empty}>No projects added yet</span>
                )}
              </div>
            </div>

            <button onClick={() => setEditing(true)} style={styles.editButton}>
              Edit Profile
            </button>
          </>
        ) : (
          <form onSubmit={handleSubmit}>
            <label><strong>Skills</strong> (comma-separated):</label>
            <input
              type="text"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              placeholder="React, Node.js, Python"
            />

            <label><strong>Languages</strong> (comma-separated):</label>
            <input
              type="text"
              name="languages"
              value={formData.languages}
              onChange={handleChange}
              placeholder="English, French, Spanish"
            />

            <label><strong>Passions</strong> (comma-separated):</label>
            <input
              type="text"
              name="passions"
              value={formData.passions}
              onChange={handleChange}
              placeholder="AI, Design, Music"
            />

            <label><strong>Projects</strong> (comma-separated):</label>
            <input
              type="text"
              name="projects"
              value={formData.projects}
              onChange={handleChange}
              placeholder="E-commerce App, Portfolio Website"
            />

            <div style={styles.buttonGroup}>
              <button type="submit" style={styles.saveButton}>
                Save Changes
              </button>
              <button 
                type="button" 
                onClick={() => setEditing(false)} 
                style={styles.cancelButton}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px',
    paddingBottom: '20px',
    borderBottom: '2px solid #e0e0e0'
  },
  email: {
    color: '#666',
    marginTop: '5px'
  },
  section: {
    margin: '25px 0',
    padding: '20px',
    background: '#f9f9f9',
    borderRadius: '8px'
  },
  tags: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    marginTop: '10px'
  },
  tag: {
    background: '#e0e7ff',
    color: '#667eea',
    padding: '6px 16px',
    borderRadius: '20px',
    fontSize: '14px',
    fontWeight: '500'
  },
  empty: {
    color: '#999',
    fontStyle: 'italic'
  },
  editButton: {
    background: '#667eea',
    color: 'white',
    marginTop: '30px',
    width: '100%'
  },
  buttonGroup: {
    display: 'flex',
    gap: '15px',
    marginTop: '25px'
  },
  saveButton: {
    background: '#667eea',
    color: 'white',
    flex: 1
  },
  cancelButton: {
    background: '#e0e0e0',
    color: '#333',
    flex: 1
  },
  message: {
    background: '#d4edda',
    color: '#155724',
    padding: '12px',
    borderRadius: '5px',
    marginBottom: '20px',
    textAlign: 'center'
  }
};

export default Profile;