import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllTurfs, searchTurfs, searchByLocation } from '../../services/turfService';
import TurfCard from '../../components/TurfCard';
import './CustomerDashboard.css';

const CustomerDashboard = () => {
  const navigate = useNavigate();
  const [turfs, setTurfs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [locationKeyword, setLocationKeyword] = useState('');

  const loadAllTurfs = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getAllTurfs();
      setTurfs(data);
    } catch (err) {
      setError('Failed to load turfs. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllTurfs();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchKeyword.trim()) {
      loadAllTurfs();
      return;
    }
    setLoading(true);
    setError('');
    try {
      const data = await searchTurfs(searchKeyword.trim());
      setTurfs(data);
    } catch (err) {
      setError('Search failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLocationSearch = async (e) => {
    e.preventDefault();
    if (!locationKeyword.trim()) {
      loadAllTurfs();
      return;
    }
    setLoading(true);
    setError('');
    try {
      const data = await searchByLocation(locationKeyword.trim());
      setTurfs(data);
    } catch (err) {
      setError('Location search failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const clearFilters = () => {
    setSearchKeyword('');
    setLocationKeyword('');
    loadAllTurfs();
  };

  return (
    <div className="customer-dashboard">
      <div className="dashboard-header">
        <h1>Find Your Turf</h1>
        <button className="btn btn-outline" onClick={() => navigate('/customer/bookings')}>
          My Bookings
        </button>
      </div>

      <div className="search-bar-row">
        <form className="search-form" onSubmit={handleSearch}>
          <input
            type="text"
            className="form-input"
            placeholder="Search by turf name..."
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
          <button type="submit" className="btn btn-primary">Search</button>
        </form>

        <form className="search-form" onSubmit={handleLocationSearch}>
          <input
            type="text"
            className="form-input"
            placeholder="Search by location (e.g. Vijayawada)..."
            value={locationKeyword}
            onChange={(e) => setLocationKeyword(e.target.value)}
          />
          <button type="submit" className="btn btn-primary">Search</button>
        </form>

        {(searchKeyword || locationKeyword) && (
          <button className="btn btn-outline" onClick={clearFilters}>Clear</button>
        )}
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      {loading ? (
        <div className="loading-container">Loading turfs...</div>
      ) : turfs.length === 0 ? (
        <div className="empty-state">
          <p>No turfs found. Try a different search.</p>
        </div>
      ) : (
        <div className="turf-grid">
          {turfs.map((turf) => (
            <TurfCard key={turf.id} turf={turf} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomerDashboard;