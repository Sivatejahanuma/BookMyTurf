import React from 'react';

import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Home.css';

const Home = () => {
  const { user } = useAuth();

  const dashboardLink =
    user?.role === 'CUSTOMER' ? '/customer/dashboard' : '/owner/dashboard';

  return (
    <div className="home-page">
      <section className="hero">
        <h1>Book Your Perfect Turf, Instantly</h1>
        <p>
          Search sports turfs near you, check real-time slot availability,
          and send booking requests — all in one place.
        </p>
        <div className="hero-actions">
          {user ? (
            <Link to={dashboardLink} className="btn btn-primary hero-btn">
              Go to Dashboard
            </Link>
          ) : (
            <>
              <Link to="/register" className="btn btn-primary hero-btn">
                Get Started
              </Link>
              <Link to="/login" className="btn btn-outline hero-btn">
                Login
              </Link>
            </>
          )}
        </div>
      </section>

      <section className="features">
        <div className="feature-card">
          <div className="feature-icon">🔍</div>
          <h3>Search by Location</h3>
          <p>Find turfs near you by searching turf name or location.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">📅</div>
          <h3>Real-Time Slots</h3>
          <p>Check live slot availability based on date and time.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">✅</div>
          <h3>Instant Requests</h3>
          <p>Send booking requests and get confirmation from turf owners.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🏟️</div>
          <h3>Manage Your Turf</h3>
          <p>Turf owners can list turfs and manage bookings with ease.</p>
        </div>
      </section>
    </div>
  );
};

export default Home;