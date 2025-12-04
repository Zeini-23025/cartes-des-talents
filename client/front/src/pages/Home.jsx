import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container" style={styles.container}>
      <div style={styles.hero}>
        <h1 style={styles.title}>Welcome to Carte Talents 🎯</h1>
        <p style={styles.subtitle}>
          Discover talented professionals, find collaborators, and build amazing teams
        </p>
        <div style={styles.buttons}>
          <Link to="/search">
            <button style={styles.primaryButton}>Search Talents</button>
          </Link>
          <Link to="/talent-map">
            <button style={styles.secondaryButton}>View Talent Map</button>
          </Link>
        </div>
      </div>

      <div style={styles.features}>
        <div className="card">
          <div style={styles.featureIcon}>🔍</div>
          <h3>Advanced Search</h3>
          <p>Find professionals by skills, languages, passions, and projects with powerful filtering options</p>
        </div>
        <div className="card">
          <div style={styles.featureIcon}>🤝</div>
          <h3>Find Collaborators</h3>
          <p>Connect with like-minded professionals who share your interests and can contribute to your projects</p>
        </div>
        <div className="card">
          <div style={styles.featureIcon}>📊</div>
          <h3>Talent Analytics</h3>
          <p>Visualize talent distribution and discover trending skills in the community</p>
        </div>
      </div>

      <div style={styles.howItWorks}>
        <h2 style={styles.sectionTitle}>How It Works</h2>
        <div style={styles.steps}>
          <div style={styles.step}>
            <div style={styles.stepNumber}>1</div>
            <h4>Create Your Profile</h4>
            <p>Sign up and add your skills, languages, passions, and projects</p>
          </div>
          <div style={styles.step}>
            <div style={styles.stepNumber}>2</div>
            <h4>Search & Connect</h4>
            <p>Find professionals that match your requirements</p>
          </div>
          <div style={styles.step}>
            <div style={styles.stepNumber}>3</div>
            <h4>Collaborate</h4>
            <p>Build amazing projects together with talented people</p>
          </div>
        </div>
      </div>

      <div className="card" style={styles.cta}>
        <h2>Ready to Get Started?</h2>
        <p>Join our community of talented professionals today</p>
        <Link to="/register">
          <button style={styles.ctaButton}>Create Account</button>
        </Link>
      </div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center'
  },
  hero: {
    padding: '60px 20px',
    background: 'white',
    borderRadius: '15px',
    margin: '40px 0',
    boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
  },
  title: {
    fontSize: '48px',
    marginBottom: '20px',
    color: '#333',
    fontWeight: 'bold'
  },
  subtitle: {
    fontSize: '20px',
    color: '#666',
    marginBottom: '40px',
    maxWidth: '600px',
    margin: '0 auto 40px'
  },
  buttons: {
    display: 'flex',
    gap: '20px',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  primaryButton: {
    background: '#667eea',
    color: 'white',
    padding: '15px 30px',
    fontSize: '18px'
  },
  secondaryButton: {
    background: 'white',
    color: '#667eea',
    border: '2px solid #667eea',
    padding: '15px 30px',
    fontSize: '18px'
  },
  features: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '30px',
    margin: '40px 0'
  },
  featureIcon: {
    fontSize: '48px',
    marginBottom: '15px'
  },
  howItWorks: {
    background: 'white',
    borderRadius: '15px',
    padding: '40px 20px',
    margin: '40px 0'
  },
  sectionTitle: {
    fontSize: '36px',
    marginBottom: '40px',
    color: '#333'
  },
  steps: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '30px'
  },
  step: {
    padding: '20px'
  },
  stepNumber: {
    width: '60px',
    height: '60px',
    background: '#667eea',
    color: 'white',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '28px',
    fontWeight: 'bold',
    margin: '0 auto 20px'
  },
  cta: {
    textAlign: 'center',
    padding: '40px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    margin: '40px 0'
  },
  ctaButton: {
    background: 'white',
    color: '#667eea',
    padding: '15px 40px',
    fontSize: '18px',
    marginTop: '20px'
  }
};

export default Home;