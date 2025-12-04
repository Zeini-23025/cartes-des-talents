import React from 'react';

const UserCard = ({ user }) => {
  return (
    <div className="card" style={styles.card}>
      <div style={styles.header}>
        <div style={styles.avatar}>
          {user.firstname?.[0]?.toUpperCase()}{user.lastname?.[0]?.toUpperCase()}
        </div>
        <div>
          <h3 style={styles.name}>{user.firstname} {user.lastname}</h3>
          <p style={styles.email}>✉️ {user.email}</p>
        </div>
      </div>

      {user.skills && user.skills.length > 0 && (
        <div style={styles.section}>
          <strong style={styles.label}>💻 Skills:</strong>
          <div style={styles.tags}>
            {user.skills.map((skill, i) => (
              <span key={i} style={styles.tag}>{skill}</span>
            ))}
          </div>
        </div>
      )}

      {user.languages && user.languages.length > 0 && (
        <div style={styles.section}>
          <strong style={styles.label}>🌍 Languages:</strong>
          <div style={styles.tags}>
            {user.languages.map((lang, i) => (
              <span key={i} style={{...styles.tag, ...styles.languageTag}}>{lang}</span>
            ))}
          </div>
        </div>
      )}

      {user.passions && user.passions.length > 0 && (
        <div style={styles.section}>
          <strong style={styles.label}>❤️ Passions:</strong>
          <div style={styles.tags}>
            {user.passions.map((passion, i) => (
              <span key={i} style={{...styles.tag, ...styles.passionTag}}>{passion}</span>
            ))}
          </div>
        </div>
      )}

      {user.projects && user.projects.length > 0 && (
        <div style={styles.section}>
          <strong style={styles.label}>🚀 Projects:</strong>
          <div style={styles.tags}>
            {user.projects.map((project, i) => (
              <span key={i} style={{...styles.tag, ...styles.projectTag}}>{project}</span>
            ))}
          </div>
        </div>
      )}

      {!user.skills?.length && !user.languages?.length && !user.passions?.length && !user.projects?.length && (
        <div style={styles.emptyState}>
          <p style={styles.emptyText}>No additional information available</p>
        </div>
      )}
    </div>
  );
};

const styles = {
  card: {
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    border: '1px solid transparent'
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    marginBottom: '20px',
    paddingBottom: '15px',
    borderBottom: '2px solid #f0f0f0'
  },
  avatar: {
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '24px',
    fontWeight: 'bold',
    flexShrink: 0,
    boxShadow: '0 4px 10px rgba(102, 126, 234, 0.3)'
  },
  name: {
    fontSize: '20px',
    color: '#333',
    marginBottom: '5px',
    fontWeight: '600'
  },
  email: {
    fontSize: '14px',
    color: '#666',
    margin: 0
  },
  section: {
    marginBottom: '15px'
  },
  label: {
    display: 'block',
    marginBottom: '10px',
    color: '#555',
    fontSize: '14px',
    fontWeight: '600'
  },
  tags: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px'
  },
  tag: {
    background: '#e0e7ff',
    color: '#667eea',
    padding: '6px 14px',
    borderRadius: '20px',
    fontSize: '13px',
    fontWeight: '500',
    transition: 'all 0.3s ease',
    border: '1px solid transparent'
  },
  languageTag: {
    background: '#fef3c7',
    color: '#d97706',
    borderColor: '#fde68a'
  },
  passionTag: {
    background: '#fce7f3',
    color: '#db2777',
    borderColor: '#fbcfe8'
  },
  projectTag: {
    background: '#dbeafe',
    color: '#2563eb',
    borderColor: '#bfdbfe'
  },
  emptyState: {
    textAlign: 'center',
    padding: '20px',
    color: '#999',
    fontStyle: 'italic'
  },
  emptyText: {
    margin: 0,
    fontSize: '14px'
  }
};

export default UserCard;