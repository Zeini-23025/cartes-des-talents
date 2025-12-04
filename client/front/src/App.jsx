import React, { Component } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Search from './pages/Search';
import Collaborators from './pages/Collaborators';
import TalentMap from './pages/TalentMap';
import ProtectedRoute from './components/ProtectedRoute';

// Error Boundary Component
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={styles.errorContainer}>
          <div style={styles.errorCard}>
            <h1 style={styles.errorTitle}>⚠️ Oops! Something went wrong</h1>
            <p style={styles.errorMessage}>
              We're sorry, but something unexpected happened.
            </p>
            <button 
              onClick={() => window.location.href = '/'} 
              style={styles.errorButton}
            >
              Go to Homepage
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

function App() {
  return (
    <ErrorBoundary>
      <div className="App">
        <Navbar />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/search" element={<Search />} />
          <Route path="/talent-map" element={<TalentMap />} />
          
          {/* Protected Routes */}
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/collaborators" 
            element={
              <ProtectedRoute>
                <Collaborators />
              </ProtectedRoute>
            } 
          />

          {/* Catch-all route - redirect to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        {/* Footer (Optional) */}
        <footer style={styles.footer}>
          <div style={styles.footerContent}>
            <p style={styles.footerText}>
              © 2024 Carte Talents. All rights reserved.
            </p>
            <p style={styles.footerLinks}>
              <a href="https://github.com" style={styles.footerLink}>GitHub</a>
              {' | '}
              <a href="/about" style={styles.footerLink}>About</a>
              {' | '}
              <a href="/contact" style={styles.footerLink}>Contact</a>
            </p>
          </div>
        </footer>
      </div>
    </ErrorBoundary>
  );
}

const styles = {
  errorContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    padding: '20px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
  },
  errorCard: {
    background: 'white',
    padding: '40px',
    borderRadius: '15px',
    textAlign: 'center',
    maxWidth: '500px',
    boxShadow: '0 10px 40px rgba(0,0,0,0.2)'
  },
  errorTitle: {
    fontSize: '32px',
    color: '#333',
    marginBottom: '20px'
  },
  errorMessage: {
    fontSize: '16px',
    color: '#666',
    marginBottom: '30px'
  },
  errorButton: {
    background: '#667eea',
    color: 'white',
    padding: '12px 30px',
    fontSize: '16px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer'
  },
  footer: {
    background: 'rgba(255,255,255,0.95)',
    marginTop: '60px',
    padding: '30px 20px',
    borderTop: '1px solid #e0e0e0'
  },
  footerContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    textAlign: 'center'
  },
  footerText: {
    color: '#666',
    marginBottom: '10px',
    fontSize: '14px'
  },
  footerLinks: {
    color: '#666',
    fontSize: '14px'
  },
  footerLink: {
    color: '#667eea',
    textDecoration: 'none',
    fontWeight: '500',
    transition: 'color 0.3s'
  }
};

export default App;