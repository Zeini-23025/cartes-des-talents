import React, { useContext, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setMobileMenuOpen(false);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const NavLink = ({ to, children }) => (
    <Link 
      to={to} 
      style={{
        ...styles.link,
        ...(isActive(to) ? styles.activeLink : {})
      }}
      onClick={() => setMobileMenuOpen(false)}
    >
      {children}
    </Link>
  );

  return (
    <nav style={styles.nav}>
      <div style={styles.container}>
        <Link to="/" style={styles.logo} onClick={() => setMobileMenuOpen(false)}>
          🎯 Carte Talents
        </Link>

        {/* Mobile Menu Toggle */}
        <button 
          style={styles.mobileToggle}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? '✕' : '☰'}
        </button>

        {/* Desktop Menu */}
        <div style={styles.desktopLinks}>
          <NavLink to="/search">Search</NavLink>
          <NavLink to="/talent-map">Talent Map</NavLink>
          {user ? (
            <>
              <NavLink to="/collaborators">Collaborators</NavLink>
              <NavLink to="/profile">Profile</NavLink>
              <div style={styles.userInfo}>
                <span style={styles.userName}>👤 {user.firstname}</span>
              </div>
              <button onClick={handleLogout} style={styles.logoutButton}>
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login">Login</NavLink>
              <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
                <button style={styles.registerButton}>Register</button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div style={styles.mobileMenu}>
            <NavLink to="/search">Search</NavLink>
            <NavLink to="/talent-map">Talent Map</NavLink>
            {user ? (
              <>
                <NavLink to="/collaborators">Collaborators</NavLink>
                <NavLink to="/profile">Profile</NavLink>
                <div style={styles.mobileUserInfo}>
                  <span>Logged in as: {user.firstname} {user.lastname}</span>
                </div>
                <button onClick={handleLogout} style={styles.mobileLogoutButton}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink to="/login">Login</NavLink>
                <NavLink to="/register">Register</NavLink>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    background: 'rgba(255,255,255,0.98)',
    padding: '15px 0',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    backdropFilter: 'blur(10px)'
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 20px',
    position: 'relative'
  },
  logo: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#667eea',
    textDecoration: 'none',
    transition: 'transform 0.3s ease'
  },
  desktopLinks: {
    display: 'flex',
    gap: '20px',
    alignItems: 'center'
  },
  link: {
    color: '#333',
    textDecoration: 'none',
    fontWeight: '500',
    transition: 'color 0.3s ease',
    padding: '8px 12px',
    borderRadius: '5px'
  },
  activeLink: {
    color: '#667eea',
    background: 'rgba(102, 126, 234, 0.1)'
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: '10px'
  },
  userName: {
    color: '#667eea',
    fontWeight: '600',
    fontSize: '14px'
  },
  logoutButton: {
    background: '#dc3545',
    color: 'white',
    padding: '8px 16px',
    fontSize: '14px'
  },
  registerButton: {
    background: '#667eea',
    color: 'white',
    padding: '8px 16px',
    fontSize: '14px'
  },
  mobileToggle: {
    display: 'none',
    background: 'none',
    border: 'none',
    fontSize: '28px',
    color: '#667eea',
    cursor: 'pointer',
    padding: '5px'
  },
  mobileMenu: {
    display: 'none',
    flexDirection: 'column',
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    background: 'white',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    padding: '20px',
    gap: '15px'
  },
  mobileUserInfo: {
    padding: '10px',
    background: '#f5f5f5',
    borderRadius: '5px',
    fontSize: '14px',
    color: '#666'
  },
  mobileLogoutButton: {
    background: '#dc3545',
    color: 'white',
    padding: '12px',
    width: '100%'
  }
};

// Media query for mobile
if (typeof window !== 'undefined') {
  const mediaQuery = window.matchMedia('(max-width: 768px)');
  
  if (mediaQuery.matches) {
    styles.desktopLinks.display = 'none';
    styles.mobileToggle.display = 'block';
    styles.mobileMenu.display = 'flex';
  }
}

export default Navbar;