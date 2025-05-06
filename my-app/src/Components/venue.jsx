import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './venue.css';

const Venue = () => {
  const [venues, setVenues] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedVenues = JSON.parse(localStorage.getItem('venues')) || [];
    setVenues(storedVenues);
    // Listen for storage changes in other tabs
    const handleStorage = () => {
      setVenues(JSON.parse(localStorage.getItem('venues')) || []);
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const handleCreateVenue = () => {
    console.log('Create Venue button clicked');
    console.log('Current path:', window.location.pathname);
    navigate('/dashboard/venue/create');
    console.log('Navigation attempted');
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredVenues = venues.filter(venue => 
    venue.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const [displayVenue, setDisplayVenue] = useState(false);
  const [currentVenue, setCurrentVenue] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  const showVenueDetails = (venue) => {
   setDisplayVenue(true);
   setCurrentVenue(venue);
  };
  const closeVenu=()=>{
    setDisplayVenue(false);
  }

  const handleMoreClick = () => {
    setShowFilters((prev) => !prev);
  };

  const handleDeleteVenue = () => {
    if (!currentVenue) return;
    // Remove the current venue from the venues array
    const updatedVenues = venues.filter(v => {
      // Compare all fields to ensure uniqueness
      return !(
        v.name === currentVenue.name &&
        v.description === currentVenue.description &&
        v.address === currentVenue.address &&
        v.capacity === currentVenue.capacity &&
        v.image === currentVenue.image
      );
    });
    // Update localStorage and state
    localStorage.setItem('venues', JSON.stringify(updatedVenues));
    setVenues(updatedVenues);
    setDisplayVenue(false);
    setCurrentVenue(null);
  };

  const handleCancelFilters = () => {
    setShowFilters(false);
  };

  return (
    <div className="venue-container">
      <div className="dashboard-filters">
        <div className="search-group">
          <input 
            className="search-input" 
            placeholder="Search Area" 
            value={searchQuery}
            onChange={handleSearch}
          />
          <button className="search-btn"><i className="fas fa-search"></i></button>
        </div>
        <input className="capacity-select" placeholder="Capacity" />
        <button className="more-btn" onClick={handleMoreClick}>More</button>
        <button className="create-venue-btn" onClick={handleCreateVenue}>Create Venue</button>
      </div>
      {showFilters && (
        <div className="venue-advanced-filters">
          <div className="venue-advanced-row">
            <select className="venue-adv-select"><option>Occasion</option></select>
            <select className="venue-adv-select"><option>Layout</option></select>
            <select className="venue-adv-select"><option>Luxury Level</option></select>
          </div>
          <div className="venue-advanced-row">
            <select className="venue-adv-select"><option>Vibe</option></select>
            <input className="venue-adv-input" placeholder="Min Budget" />
            <span style={{margin: '0 8px'}}>-</span>
            <input className="venue-adv-input" placeholder="Max Budget" />
          </div>
          <div className="venue-advanced-actions">
            <button className="venue-adv-cancel" onClick={handleCancelFilters}>Cancel</button>
            <button className="venue-adv-save">Save</button>
          </div>
        </div>
      )}
      <h3 className="explore-title">Explore All {filteredVenues.length} Venues</h3>
      <div className="venue-list">
        {filteredVenues.map((venue, idx) => (
          <div className="venue-card" key={idx} onClick={() => showVenueDetails(venue)}>
            <div className="venue-image">
              {venue.image ? (
                <img 
                  src={venue.image} 
                  alt={venue.name}
                  className="venue-img"
                />
              ) : (
                <div className="venue-image-placeholder">
                  <i className="fas fa-image"></i>
                </div>
              )}
              <div className="venue-dots">
                <span className="dot" />
                <span className="dot" />
                <span className="dot" />
              </div>
              <button className="venue-fav"><i className="far fa-heart"></i></button>
            </div>
            <div className="venue-info">
              <div className="venue-name">{venue.name}</div>
              <div className="venue-min">{venue.description}</div>
              <div className="venue-type">{venue.capacity}</div>
              <div className="venue-address">{venue.address}</div>
            </div>
          </div>
        ))}
      </div>
      {displayVenue && (
        <div className="venue-details">
            <div className="current-venue-card">
                <div className="venue-menu-wrapper">
                  <button className="venue-menu-btn">
                    <i className="fas fa-ellipsis-h"></i>
                  </button>
                  <div className="venue-menu-actions">
                    <button className="venue-action-btn" title="Delete" onClick={handleDeleteVenue}><i className="fas fa-trash"></i></button>
                    <button className="venue-action-btn" title="Edit"><i className="fas fa-edit"></i></button>
                    <button className="venue-action-btn" title="Close" onClick={closeVenu}><i className="fas fa-times"></i></button>
                  </div>
                </div>
                <div className="current-venue-image">
                    <img src={currentVenue.image} alt={currentVenue.name} />
                </div>
                <div className="current-venue-info">
                    <h2>{currentVenue.name}</h2>
                    <p>{currentVenue.description}</p>
                    <p>{currentVenue.capacity}</p>
                    <p>{currentVenue.address}</p>
                </div>
            </div>
        </div>
      )}

    </div>
  );
};

export default Venue;