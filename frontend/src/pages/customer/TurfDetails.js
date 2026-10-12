import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTurfById } from '../../services/turfService';
import { getAvailableSlots } from '../../services/slotService';
import { createBooking } from '../../services/bookingService';
import './TurfDetails.css';

const getTodayDate = () => {
  const today = new Date();
  return today.toISOString().split('T')[0];
};

const TurfDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [turf, setTurf] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [selectedDate, setSelectedDate] = useState(getTodayDate());
  const [slots, setSlots] = useState([]);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);

  const [booking, setBooking] = useState(false);
  const [bookingError, setBookingError] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(null);

  useEffect(() => {
    const loadTurf = async () => {
      try {
        const data = await getTurfById(id);
        setTurf(data);
      } catch (err) {
        setError('Failed to load turf details.');
      } finally {
        setLoading(false);
      }
    };
    loadTurf();
  }, [id]);

  useEffect(() => {
    if (!turf) return;
    const loadSlots = async () => {
      setSlotsLoading(true);
      setSelectedSlot(null);
      try {
        const data = await getAvailableSlots(id, selectedDate);
        setSlots(data);
      } catch (err) {
        setError('Failed to load slots.');
      } finally {
        setSlotsLoading(false);
      }
    };
    loadSlots();
  }, [id, selectedDate, turf]);

  const handleBook = async () => {
    if (!selectedSlot) return;
    setBooking(true);
    setBookingError('');
    try {
      const response = await createBooking({
        turfId: Number(id),
        bookingDate: selectedDate,
        startTime: selectedSlot.startTime,
        endTime: selectedSlot.endTime,
      });
      setBookingSuccess(response);
    } catch (err) {
      setBookingError(err.response?.data?.message || 'Booking failed. Please try again.');
    } finally {
      setBooking(false);
    }
  };

  if (loading) return <div className="loading-container">Loading turf details...</div>;
  if (error && !turf) return <div className="alert alert-error" style={{ margin: 'var(--space-lg)' }}>{error}</div>;
  if (!turf) return null;

  if (bookingSuccess) {
    return (
      <div className="turf-details-page">
        <div className="card booking-success-card">
          <div className="success-icon">✅</div>
          <h2>Booking Request Sent!</h2>
          <p>Your booking request has been sent to the turf owner for approval.</p>
          <div className="booking-ref-box">
            <span>Booking Reference ID</span>
            <strong>{bookingSuccess.bookingReferenceId}</strong>
          </div>
          <div className="booking-summary">
            <p><strong>Turf:</strong> {bookingSuccess.turfName}</p>
            <p><strong>Date:</strong> {bookingSuccess.bookingDate}</p>
            <p><strong>Time:</strong> {bookingSuccess.startTime?.slice(0,5)} - {bookingSuccess.endTime?.slice(0,5)}</p>
            <p><strong>Price:</strong> ₹{bookingSuccess.price}</p>
            <p><strong>Status:</strong> {bookingSuccess.status}</p>
          </div>
          <div className="success-actions">
            <button className="btn btn-primary" onClick={() => navigate('/customer/bookings')}>
              View My Bookings
            </button>
            <button className="btn btn-outline" onClick={() => navigate('/customer/dashboard')}>
              Browse More Turfs
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="turf-details-page">
      <div className="turf-details-card card">
        <div className="turf-details-header">
          <div>
            <h1>{turf.turfName}</h1>
            <p className="turf-details-location">📍 {turf.location} — {turf.address}</p>
          </div>
          <span className="turf-sport-tag">{turf.sportType}</span>
        </div>

        {turf.description && <p className="turf-details-desc">{turf.description}</p>}

        <div className="turf-details-meta">
          <div><span>Price</span><strong>₹{turf.pricePerSlot} / {turf.slotDuration} min</strong></div>
          <div><span>Hours</span><strong>{turf.openingTime?.slice(0,5)} - {turf.closingTime?.slice(0,5)}</strong></div>
          <div><span>Owner</span><strong>{turf.ownerName}</strong></div>
        </div>
      </div>

      <div className="slot-selection-card card">
        <h2>Select Date & Time</h2>

        <div className="form-group">
          <label className="form-label">Booking Date</label>
          <input
            type="date"
            className="form-input"
            value={selectedDate}
            min={getTodayDate()}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>

        {slotsLoading ? (
          <div className="loading-container">Loading slots...</div>
        ) : slots.length === 0 ? (
          <div className="empty-state">No slots available for this turf.</div>
        ) : (
          <div className="slots-grid">
            {slots.map((slot, idx) => (
              <button
                key={idx}
                className={`slot-btn ${!slot.available ? 'slot-unavailable' : ''} ${
                  selectedSlot?.startTime === slot.startTime ? 'slot-selected' : ''
                }`}
                disabled={!slot.available}
                onClick={() => setSelectedSlot(slot)}
              >
                {slot.startTime.slice(0, 5)} - {slot.endTime.slice(0, 5)}
              </button>
            ))}
          </div>
        )}

        {bookingError && <div className="alert alert-error">{bookingError}</div>}

        <button
          className="btn btn-primary book-slot-btn"
          disabled={!selectedSlot || booking}
          onClick={handleBook}
        >
          {booking ? 'Sending Request...' : 'Book Slot'}
        </button>
      </div>
    </div>
  );
};

export default TurfDetails;