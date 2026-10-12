import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getOwnerTurfs } from '../../services/turfService';
import { getOwnerRequests } from '../../services/bookingService';
import './OwnerDashboard.css';

const OwnerDashboard = () => {
  const navigate = useNavigate();
  const [turfs, setTurfs] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        const [turfData, requestData] = await Promise.all([
          getOwnerTurfs(),
          getOwnerRequests(),
        ]);
        setTurfs(turfData);
        setRequests(requestData);
      } catch (err) {
        setError('Failed to load dashboard data.');
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const pendingCount = requests.filter((r) => r.status === 'PENDING').length;
  const acceptedCount = requests.filter((r) => r.status === 'ACCEPTED').length;

  return (
    <div className="owner-dashboard">
      <div className="dashboard-header">
        <h1>Turf Owner Dashboard</h1>
        <button className="btn btn-primary" onClick={() => navigate('/owner/add-turf')}>
          + Add Turf
        </button>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      {loading ? (
        <div className="loading-container">Loading dashboard...</div>
      ) : (
        <>
          <div className="stats-grid">
            <div className="stat-card">
              <span className="stat-value">{turfs.length}</span>
              <span className="stat-label">My Turfs</span>
            </div>
            <div className="stat-card">
              <span className="stat-value">{pendingCount}</span>
              <span className="stat-label">Pending Requests</span>
            </div>
            <div className="stat-card">
              <span className="stat-value">{acceptedCount}</span>
              <span className="stat-label">Confirmed Bookings</span>
            </div>
          </div>

          <div className="dashboard-actions-grid">
            <div className="card action-card" onClick={() => navigate('/owner/my-turfs')}>
              <h3>🏟️ Manage My Turfs</h3>
              <p>View and update your listed turfs</p>
            </div>
            <div className="card action-card" onClick={() => navigate('/owner/booking-requests')}>
              <h3>📋 Booking Requests</h3>
              <p>Accept or reject incoming booking requests</p>
              {pendingCount > 0 && <span className="badge badge-pending">{pendingCount} pending</span>}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default OwnerDashboard;