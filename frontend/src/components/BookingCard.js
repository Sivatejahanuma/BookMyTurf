import React from 'react';
import StatusBadge from './StatusBadge';
import './BookingCard.css';

const BookingCard = ({ booking, showCustomer, showActions, onAccept, onReject, actionLoading }) => {
  return (
    <div className="booking-card">
      <div className="booking-card-header">
        <span className="booking-ref">{booking.bookingReferenceId}</span>
        <StatusBadge status={booking.status} />
      </div>

      <h4 className="booking-turf-name">{booking.turfName}</h4>
      <p className="booking-location">📍 {booking.turfLocation}</p>

      {showCustomer && (
        <p className="booking-detail-line">👤 Customer: {booking.customerName}</p>
      )}

      <div className="booking-details-grid">
        <div>
          <span className="booking-detail-label">Date</span>
          <span className="booking-detail-value">{booking.bookingDate}</span>
        </div>
        <div>
          <span className="booking-detail-label">Time</span>
          <span className="booking-detail-value">
            {booking.startTime?.slice(0, 5)} - {booking.endTime?.slice(0, 5)}
          </span>
        </div>
        <div>
          <span className="booking-detail-label">Price</span>
          <span className="booking-detail-value">₹{booking.price}</span>
        </div>
      </div>

      {showActions && booking.status === 'PENDING' && (
        <div className="booking-actions">
          <button
            className="btn btn-primary"
            disabled={actionLoading}
            onClick={() => onAccept(booking.id)}
          >
            Accept
          </button>
          <button
            className="btn btn-danger"
            disabled={actionLoading}
            onClick={() => onReject(booking.id)}
          >
            Reject
          </button>
        </div>
      )}
    </div>
  );
};

export default BookingCard;