import React, { useEffect, useState } from 'react';
import './dashboard.css';
//import { FaUser, FaSearch, FaRegHeart } from 'react-icons/fa';

const Dashboard = ({ onCreateVenue, onLogout }) => {
  const [venues, setVenues] = useState([]);
  const [activeSection, setActiveSection] = useState('Venue');

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

  const currentUser = localStorage.getItem('currentUser') 
    ? JSON.parse(localStorage.getItem('currentUser')).email.split('@')[0]
    : 'Guest';

  return (
    <div className="dashboard-container">
      <aside className="dashboard-sidebar">
        <div className="dashboard-logo">
          <div className="logo-square" />
          <span>CubeQ Anlytica</span>
        </div>
        <nav className="dashboard-nav">
          <a href="#" className={`nav-link${activeSection === 'Home' ? ' active' : ''}`} onClick={() => setActiveSection('Home')}>Home</a>
          <a href="#" className={`nav-link${activeSection === 'Events' ? ' active' : ''}`} onClick={() => setActiveSection('Events')}>Events</a>
          <a href="#" className={`nav-link${activeSection === 'Orders' ? ' active' : ''}`} onClick={() => setActiveSection('Orders')}>Orders</a>
          <a href="#" className={`nav-link${activeSection === 'Marketing' ? ' active' : ''}`} onClick={() => setActiveSection('Marketing')}>Marketing</a>
          <a href="#" className={`nav-link${activeSection === 'Venue' ? ' selected' : ''}`} onClick={() => setActiveSection('Venue')}>Venue</a>
          <a href="#" className="nav-link" onClick={() => { localStorage.removeItem('currentUser'); if (onLogout) onLogout(); }}>Logout</a>
        </nav>
      </aside>
      <main className="dashboard-main">
        <header className="dashboard-header">
          <div className="dashboard-user">
            <span className="user-icon"><i className="far fa-user"></i></span>
            <span className="user-name">{currentUser}</span>
          </div>
        </header>
        <section className="dashboard-content">
          {['Home', 'Events', 'Orders', 'Marketing'].includes(activeSection) ? (
            <h2 style={{textAlign: 'center', marginTop: '40px'}}>{`Welcome to ${activeSection}`}</h2>
          ) : (
            <>
              <div className="dashboard-filters">
                <div className="search-group">
                  <input className="search-input" placeholder="Search Area" />
                  <button className="search-btn"><i className="fas fa-search"></i></button>
                </div>
                <select className="capacity-select">
                  <option>Capacity</option>
                </select>
                <button className="more-btn">More</button>
                <button className="create-venue-btn" onClick={onCreateVenue}>Create Venue</button>
              </div>
              <h3 className="explore-title">Explore All {venues.length} Venues</h3>
              <div className="venue-list">
                {venues.map((venue, idx) => (
                  <div className="venue-card" key={idx}>
                    <div className="venue-image">
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
            </>
          )}
        </section>
      </main>
    </div>
  );
};

export default Dashboard; 