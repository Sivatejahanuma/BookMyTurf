import React from 'react';
import { useNavigate } from 'react-router-dom';
import './TurfCard.css';

const TurfCard = ({ turf }) => {
  const navigate = useNavigate();

  return (
    <div className="turf-card" onClick={() => navigate(`/customer/turf/${turf.id}`)}>
      <div className="turf-card-header">
        <h3>{turf.turfName}</h3>
        <span className="turf-sport-tag">{turf.sportType}</span>
      </div>
      <p className="turf-location">📍 {turf.location}</p>
      <p className="turf-address">{turf.address}</p>
      {turf.description && <p className="turf-description">{turf.description}</p>}
      <div className="turf-card-footer">
        <span className="turf-price">₹{turf.pricePerSlot} / {turf.slotDuration} min</span>
        <span className="turf-hours">
          {turf.openingTime?.slice(0, 5)} - {turf.closingTime?.slice(0, 5)}
        </span>
      </div>
      <button className="btn btn-primary turf-view-btn">View & Book</button>
    </div>
  );
};

export default TurfCard;