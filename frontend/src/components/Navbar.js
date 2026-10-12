import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const dashboardLink =
    user?.role === 'CUSTOMER' ? '/customer/dashboard' : '/owner/dashboard';

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <b><i>🥅🏏Book My Turf</i></b>
        </Link>

        <div className="navbar-links">
          {!user && (
            <>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/register" className="nav-btn">Register</Link>
            </>
          )}

          {user && (
            <>
              <Link to={dashboardLink} className="nav-link">Dashboard</Link>
              <span className="nav-user">Hi, {user.name}</span>
              <button className="nav-btn nav-btn-outline" onClick={handleLogout}>
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;