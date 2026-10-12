import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCustomerHistory } from '../../services/bookingService';
import BookingCard from '../../components/BookingCard';
import './BookingHistory.css';

const FILTERS = ['ALL', 'PENDING', 'ACCEPTED', 'REJECTED'];

const BookingHistory = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('ALL');

  useEffect(() => {
    const loadBookings = async () => {
      try {
        const data = await getCustomerHistory();
        setBookings(data);
      } catch (err) {
        setError('Failed to load booking history.');
      } finally {
        setLoading(false);
      }
    };
    loadBookings();
  }, []);

  const filteredBookings =
    filter === 'ALL' ? bookings : bookings.filter((b) => b.status === filter);

  return (
    <div className="booking-history-page">
      <div className="dashboard-header">
        <h1>My Booking History</h1>
        <button className="btn btn-outline" onClick={() => navigate('/customer/dashboard')}>
          Browse Turfs
        </button>
      </div>

      <div className="filter-tabs">
        {FILTERS.map((f) => (
          <button
            key={f}
            className={`filter-tab ${filter === f ? 'filter-tab-active' : ''}`}
            onClick={() => setFilter(f)}
          >
            {f.charAt(0) + f.slice(1).toLowerCase()}
          </button>
        ))}
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      {loading ? (
        <div className="loading-container">Loading bookings...</div>
      ) : filteredBookings.length === 0 ? (
        <div className="empty-state">
          <p>No bookings found{filter !== 'ALL' ? ` with status ${filter}` : ''}.</p>
        </div>
      ) : (
        <div className="booking-list">
          {filteredBookings.map((booking) => (
            <BookingCard key={booking.id} booking={booking} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BookingHistory;