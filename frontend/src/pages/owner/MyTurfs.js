import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getOwnerTurfs } from '../../services/turfService';
import './MyTurfs.css';

const MyTurfs = () => {
  const navigate = useNavigate();
  const [turfs, setTurfs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadTurfs = async () => {
      try {
        const data = await getOwnerTurfs();
        setTurfs(data);
      } catch (err) {
        setError('Failed to load your turfs.');
      } finally {
        setLoading(false);
      }
    };
    loadTurfs();
  }, []);

  return (
    <div className="my-turfs-page">
      <div className="dashboard-header">
        <h1>My Turfs</h1>
        <button className="btn btn-primary" onClick={() => navigate('/owner/add-turf')}>
          + Add Turf
        </button>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      {loading ? (
        <div className="loading-container">Loading your turfs...</div>
      ) : turfs.length === 0 ? (
        <div className="empty-state">
          <p>You haven't added any turfs yet.</p>
          <button className="btn btn-primary" style={{ marginTop: 'var(--space-md)' }} onClick={() => navigate('/owner/add-turf')}>
            Add Your First Turf
          </button>
        </div>
      ) : (
        <div className="my-turfs-grid">
          {turfs.map((turf) => (
            <div className="card my-turf-card" key={turf.id}>
              <div className="turf-card-header">
                <h3>{turf.turfName}</h3>
                <span className="turf-sport-tag">{turf.sportType}</span>
              </div>
              <p className="turf-location">📍 {turf.location}</p>
              <p className="turf-address">{turf.address}</p>
             <div className="turf-card-footer">
  <span className="turf-price">₹{turf.pricePerSlot} / {turf.slotDuration} min</span>
  <span className="turf-hours">
    {turf.openingTime?.slice(0, 5)} - {turf.closingTime?.slice(0, 5)}
  </span>
</div>
<button
  className="btn btn-outline my-turf-edit-btn"
  onClick={() => navigate(`/owner/edit-turf/${turf.id}`)}
>
  Edit Turf
</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyTurfs;