import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addTurf } from '../../services/turfService';
import './AddTurf.css';

const AddTurf = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    turfName: '',
    location: '',
    address: '',
    sportType: '',
    description: '',
    pricePerSlot: '',
    slotDuration: '60',
    openingTime: '06:00',
    closingTime: '22:00',
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.turfName.trim()) newErrors.turfName = 'Turf name is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.sportType.trim()) newErrors.sportType = 'Sport type is required';
    if (!formData.pricePerSlot || Number(formData.pricePerSlot) <= 0)
      newErrors.pricePerSlot = 'Enter a valid price';
    if (!formData.slotDuration || Number(formData.slotDuration) <= 0)
      newErrors.slotDuration = 'Enter a valid slot duration';
    if (formData.openingTime >= formData.closingTime)
      newErrors.closingTime = 'Closing time must be after opening time';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');
    if (!validate()) return;

    setLoading(true);
    try {
      await addTurf({
        ...formData,
        pricePerSlot: Number(formData.pricePerSlot),
        slotDuration: Number(formData.slotDuration),
        openingTime: formData.openingTime + ':00',
        closingTime: formData.closingTime + ':00',
      });
      navigate('/owner/my-turfs');
    } catch (err) {
      setServerError(err.response?.data?.message || 'Failed to add turf. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-turf-page">
      <div className="card add-turf-card">
        <h2>Add New Turf</h2>
        <p className="auth-subtitle">Enter your turf details below</p>

        {serverError && <div className="alert alert-error">{serverError}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Turf Name</label>
              <input
                type="text"
                name="turfName"
                className="form-input"
                value={formData.turfName}
                onChange={handleChange}
                placeholder="Green Field Arena"
              />
              {errors.turfName && <div className="form-error">{errors.turfName}</div>}
            </div>

            <div className="form-group">
              <label className="form-label">Sport Type</label>
              <input
                type="text"
                name="sportType"
                className="form-input"
                value={formData.sportType}
                onChange={handleChange}
                placeholder="Football, Cricket, etc."
              />
              {errors.sportType && <div className="form-error">{errors.sportType}</div>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Location</label>
              <input
                type="text"
                name="location"
                className="form-input"
                value={formData.location}
                onChange={handleChange}
                placeholder="Vijayawada"
              />
              {errors.location && <div className="form-error">{errors.location}</div>}
            </div>

            <div className="form-group">
              <label className="form-label">Address</label>
              <input
                type="text"
                name="address"
                className="form-input"
                value={formData.address}
                onChange={handleChange}
                placeholder="Full street address"
              />
              {errors.address && <div className="form-error">{errors.address}</div>}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              name="description"
              className="form-textarea"
              rows="3"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your turf (amenities, surface type, etc.)"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Price Per Slot (₹)</label>
              <input
                type="number"
                name="pricePerSlot"
                className="form-input"
                value={formData.pricePerSlot}
                onChange={handleChange}
                placeholder="500"
                min="1"
              />
              {errors.pricePerSlot && <div className="form-error">{errors.pricePerSlot}</div>}
            </div>

            <div className="form-group">
              <label className="form-label">Slot Duration (minutes)</label>
              <select
                name="slotDuration"
                className="form-select"
                value={formData.slotDuration}
                onChange={handleChange}
              >
                <option value="30">30 minutes</option>
                <option value="60">60 minutes</option>
                <option value="90">90 minutes</option>
                <option value="120">120 minutes</option>
              </select>
              {errors.slotDuration && <div className="form-error">{errors.slotDuration}</div>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Opening Time</label>
              <input
                type="time"
                name="openingTime"
                className="form-input"
                value={formData.openingTime}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Closing Time</label>
              <input
                type="time"
                name="closingTime"
                className="form-input"
                value={formData.closingTime}
                onChange={handleChange}
              />
              {errors.closingTime && <div className="form-error">{errors.closingTime}</div>}
            </div>
          </div>

          <button type="submit" className="btn btn-primary auth-submit-btn" disabled={loading}>
            {loading ? 'Adding Turf...' : 'Add Turf'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTurf;