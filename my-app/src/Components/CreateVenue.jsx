import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './createVenue.css';
//import { FaUpload } from 'react-icons/fa';

const CreateVenue = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    description: '',
    address: '',
    capacity: '',
    image: null,
  });
  const [imageName, setImageName] = useState('');

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = e => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      
      reader.onloadend = () => {
        setForm(prev => ({ ...prev, image: reader.result }));
      };
      
      reader.readAsDataURL(file);
      setImageName(file.name);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    // Get existing venues or empty array
    const venues = JSON.parse(localStorage.getItem('venues')) || [];
    // Add new venue
    venues.push({
      name: form.name,
      description: form.description,
      address: form.address,
      capacity: form.capacity,
      image: form.image,
      imageName: imageName,
    });
    // Save back to localStorage
    localStorage.setItem('venues', JSON.stringify(venues));
    // Navigate back to venue list
    navigate('/dashboard/venue');
  };

  return (
    <div className="create-venue-container">
      <div className="venue-image-placeholder">
        {form.image && <img src={form.image} alt="Preview" style={{ maxWidth: '100%', maxHeight: '100%' }} />}
      </div>
      <div className="venue-form-section">
        <h2 className="venue-form-title">LIST OUT VENUES</h2>
        <form className="venue-form" onSubmit={handleSubmit}>
          <label className="venue-label">VENUE NAME</label>
          <input
            className="venue-input"
            name="name"
            placeholder="Venue Name Goes Here"
            value={form.name}
            onChange={handleChange}
            required
          />
          <label className="venue-label">VENUE DESCRIPTION</label>
          <input
            className="venue-input"
            name="description"
            placeholder="Short Description goes here"
            value={form.description}
            onChange={handleChange}
            required
          />
          <label className="venue-label">Venue Address</label>
          <input
            className="venue-input"
            name="address"
            placeholder="Venue City"
            value={form.address}
            onChange={handleChange}
            required
          />
          <label className="venue-label">Venue Capacity</label>
          <input
            className="venue-input"
            name="capacity"
            placeholder="Venue Capacity"
            value={form.capacity}
            onChange={handleChange}
            required
          />
          <label className="venue-label">Image</label>
          <div className="venue-image-upload-wrapper">
            <input
              className="venue-input"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: 'none' }}
              id="venue-image-upload"
            />
            <label htmlFor="venue-image-upload" className="venue-image-label">
              {imageName || 'Pick an image'} <i className="fa fa-upload"></i>
            </label>
          </div>
          <button type="submit" className="venue-submit-btn">SUBMIT</button>
        </form>
      </div>
    </div>
  );
};

export default CreateVenue; 