import React, { useEffect, useState } from 'react';
import { getOwnerRequests, acceptBooking, rejectBooking } from '../../services/bookingService';
import BookingCard from '../../components/BookingCard';
import './BookingRequests.css';

const FILTERS = ['ALL', 'PENDING', 'ACCEPTED', 'REJECTED'];

const BookingRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('PENDING');
  const [actionLoading, setActionLoading] = useState(false);
  const [actionError, setActionError] = useState('');

  const loadRequests = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getOwnerRequests();
      setRequests(data);
    } catch (err) {
      setError('Failed to load booking requests.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRequests();
  }, []);

  const handleAccept = async (bookingId) => {
    setActionLoading(true);
    setActionError('');
    try {
      await acceptBooking(bookingId);
      await loadRequests();
    } catch (err) {
      setActionError(err.response?.data?.message || 'Failed to accept booking.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleReject = async (bookingId) => {
    setActionLoading(true);
    setActionError('');
    try {
      await rejectBooking(bookingId);
      await loadRequests();
    } catch (err) {
      setActionError(err.response?.data?.message || 'Failed to reject booking.');
    } finally {
      setActionLoading(false);
    }
  };

  const filteredRequests =
    filter === 'ALL' ? requests : requests.filter((r) => r.status === filter);

  return (
    <div className="booking-requests-page">
      <div className="dashboard-header">
        <h1>Booking Requests</h1>
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
      {actionError && <div className="alert alert-error">{actionError}</div>}

      {loading ? (
        <div className="loading-container">Loading requests...</div>
      ) : filteredRequests.length === 0 ? (
        <div className="empty-state">
          <p>No booking requests found{filter !== 'ALL' ? ` with status ${filter}` : ''}.</p>
        </div>
      ) : (
        <div className="booking-list">
          {filteredRequests.map((booking) => (
            <BookingCard
              key={booking.id}
              booking={booking}
              showCustomer
              showActions
              onAccept={handleAccept}
              onReject={handleReject}
              actionLoading={actionLoading}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default BookingRequests;